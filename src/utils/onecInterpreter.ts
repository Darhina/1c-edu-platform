export interface RunResult {
  output: string[];
  hasError: boolean;
  errorMessage?: string;
}

export function executeOneCCode(code: string): RunResult {
  const output: string[] = [];

  // 1C standard functions environment in JS
  const env = {
    Сообщить: (msg: any) => {
      const formatted = msg === null || msg === undefined ? 'Неопределено' : String(msg);
      output.push(formatted);
    },
    ТекущаяДата: () => new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU'),
    Год: (d: any) => new Date().getFullYear(),
    Месяц: (d: any) => new Date().getMonth() + 1,
    День: (d: any) => new Date().getDate(),
    СтрДлина: (s: any) => (s ? String(s).length : 0),
    СокрЛП: (s: any) => (s ? String(s).trim() : ''),
    ЗначениеЗаполнено: (v: any) => {
      if (v === null || v === undefined) return false;
      if (typeof v === 'string') return v.trim().length > 0;
      if (typeof v === 'number') return v !== 0;
      if (Array.isArray(v)) return v.length > 0;
      return true;
    },
    Формат: (val: any, fmt: string) => {
      if (typeof val === 'number') {
        return val.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      return String(val);
    },
    Новый: (type: string, ...args: any[]) => {
      if (type.toLowerCase() === 'массив') return [];
      if (type.toLowerCase() === 'структура') {
        const obj: Record<string, any> = {};
        if (args.length > 0 && typeof args[0] === 'string') {
          const keys = args[0].split(',').map(k => k.trim());
          keys.forEach((k, idx) => {
            if (args[idx + 1] !== undefined) obj[k] = args[idx + 1];
          });
        }
        return obj;
      }
      return {};
    },
    // Mock document object with services table
    Объект: {
      Номер: '000000001',
      Дата: new Date().toLocaleDateString('ru-RU'),
      Клиент: 'ООО "Алтай-Технологии"',
      СуммаДокумента: 0,
      Услуги: [
        { Номенклатура: 'Установка и настройка 1С', Количество: 1, Цена: 3500, Сумма: 3500 },
        { Номенклатура: 'Обучение персонала (1 час)', Количество: 3, Цена: 1200, Сумма: 3600 },
        { Номенклатура: 'Обновление типовой конфигурации', Количество: 2, Цена: 2000, Сумма: 4000 }
      ]
    }
  };

  try {
    // Transform 1C syntax to runnable JavaScript
    let jsCode = code;

    // Remove single line comments //
    // Handle 1C keywords
    jsCode = jsCode
      // Directives
      .replace(/&НаКлиенте/gi, '// &НаКлиенте')
      .replace(/&НаСервере/gi, '// &НаСервере')
      .replace(/&НаСервереБезКонтекста/gi, '// &НаСервереБезКонтекста')
      // Procedures
      .replace(/Процедура\s+([A-Za-zА-Яа-я0-9_]+)\s*\((.*?)\)/gi, 'function $1($2) {')
      .replace(/КонецПроцедуры/gi, '}')
      .replace(/Функция\s+([A-Za-zА-Яа-я0-9_]+)\s*\((.*?)\)/gi, 'function $1($2) {')
      .replace(/КонецФункции/gi, '}')
      .replace(/Возврат\b/gi, 'return')
      // Conditionals
      .replace(/ИначеЕсли\s+(.*?)\s+Тогда/gi, '} else if ($1) {')
      .replace(/Если\s+(.*?)\s+Тогда/gi, 'if ($1) {')
      .replace(/Иначе\b/gi, '} else {')
      .replace(/КонецЕсли;?/gi, '}')
      // Loop: Для Каждого X Из Y Цикл ... КонецЦикла;
      .replace(/Для\s+Каждого\s+([A-Za-zА-Яа-я0-9_]+)\s+Из\s+(.*?)\s+Цикл/gi, 'for (const $1 of ($2)) {')
      // Loop: Для И = 1 По N Цикл ... КонецЦикла;
      .replace(/Для\s+([A-Za-zА-Яа-я0-9_]+)\s*=\s*(.*?)\s+По\s+(.*?)\s+Цикл/gi, 'for (let $1 = $2; $1 <= $3; $1++) {')
      .replace(/Пока\s+(.*?)\s+Цикл/gi, 'while ($1) {')
      .replace(/КонецЦикла;?/gi, '}')
      // Logical operators
      .replace(/\bИстина\b/gi, 'true')
      .replace(/\bЛожь\b/gi, 'false')
      .replace(/\bИ\b/gi, '&&')
      .replace(/\bИЛИ\b/gi, '||')
      .replace(/\bНЕ\b/gi, '!')
      .replace(/<>/g, '!==')
      // Equality replacement in if/while expressions
      .replace(/==+/g, '===');

    // Simple assignments & equality fix
    // In 1C: "Если A = B Тогда" -> handled by regex
    // Let's ensure single '=' inside if conditions is converted to '==='
    jsCode = jsCode.replace(/if\s*\((.*?)\)\s*\{/g, (match, condition) => {
      const fixedCond = condition
        .replace(/([^=!<>])=([^=])/g, '$1===$2')
        .replace(/!===/g, '!==');
      return `if (${fixedCond}) {`;
    });
    jsCode = jsCode.replace(/else\s+if\s*\((.*?)\)\s*\{/g, (match, condition) => {
      const fixedCond = condition
        .replace(/([^=!<>])=([^=])/g, '$1===$2')
        .replace(/!===/g, '!==');
      return `else if (${fixedCond}) {`;
    });

    // Provide default variables scope
    const wrappedCode = `
      with (env) {
        ${jsCode}
      }
    `;

    // Execute with Function constructor passing env
    const runner = new Function('env', wrappedCode);
    runner(env);

    if (output.length === 0) {
      output.push('✅ Код выполнен без ошибок. (Для вывода информации используйте Сообщить("..."))');
    }

    return {
      output,
      hasError: false
    };
  } catch (err: any) {
    return {
      output,
      hasError: true,
      errorMessage: err.message || String(err)
    };
  }
}
