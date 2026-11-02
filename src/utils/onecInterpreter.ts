export interface RunResult {
  output: string[];
  hasError: boolean;
  errorMessage?: string;
}

export function executeOneCCode(code: string): RunResult {
  const output: string[] = [];

  // 1C standard execution context
  const rawEnv: Record<string, any> = {
    Сообщить: (msg: any) => {
      const formatted = msg === null || msg === undefined ? 'Неопределено' : String(msg);
      output.push(formatted);
    },
    Предупреждение: (msg: any) => {
      output.push('⚠️ Предупреждение: ' + String(msg));
    },
    ТекущаяДата: () => {
      const now = new Date();
      return now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU');
    },
    Год: (d: any) => new Date().getFullYear(),
    Месяц: (d: any) => new Date().getMonth() + 1,
    День: (d: any) => new Date().getDate(),
    СтрДлина: (s: any) => (s ? String(s).length : 0),
    СокрЛП: (s: any) => (s ? String(s).trim() : ''),
    Лев: (s: any, n: number) => String(s).substring(0, n),
    Прав: (s: any, n: number) => String(s).substring(String(s).length - n),
    ЗначениеЗаполнено: (v: any) => {
      if (v === null || v === undefined) return false;
      if (typeof v === 'string') return v.trim().length > 0;
      if (typeof v === 'number') return v !== 0;
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'boolean') return true;
      return true;
    },
    Формат: (val: any, fmt: string) => {
      if (typeof val === 'number') {
        return val.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      return String(val);
    },
    ТипЗнч: (val: any) => {
      if (typeof val === 'number') return 'Число';
      if (typeof val === 'string') return 'Строка';
      if (typeof val === 'boolean') return 'Булево';
      if (Array.isArray(val)) return 'Массив';
      return 'Объект';
    },
    Новый: (type: string, ...args: any[]) => {
      const t = String(type).toLowerCase();
      if (t === 'массив') return [];
      if (t === 'структура') {
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
    // Mock document object with realistic services table
    Объект: {
      Номер: '000000001',
      Дата: new Date().toLocaleDateString('ru-RU'),
      Клиент: 'ООО "Алтай-Технологии"',
      Специалист: 'Иванов И.И.',
      СуммаДокумента: 0,
      Услуги: [
        { Номенклатура: 'Установка и настройка 1С', Количество: 1, Цена: 3500, Сумма: 3500 },
        { Номенклатура: 'Обучение персонала (1 час)', Количество: 3, Цена: 1200, Сумма: 3600 },
        { Номенклатура: 'Обновление типовой конфигурации', Количество: 2, Цена: 2000, Сумма: 4000 }
      ]
    }
  };

  // Proxy environment that dynamically intercepts any read and write!
  // This solves ReferenceError: <variable> is not defined for ANY 1C variable!
  const proxyEnv = new Proxy(rawEnv, {
    has() {
      return true;
    },
    get(target, key: string) {
      if (key in target) return target[key];
      return undefined;
    },
    set(target, key: string, value: any) {
      target[key] = value;
      return true;
    }
  });

  try {
    let jsCode = code;

    // 1. Replace 1C ternary operator: ?(condition, expr1, expr2)
    // Matches nested ternary as well with loop
    for (let i = 0; i < 5; i++) {
      jsCode = jsCode.replace(/\?\s*\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/g, '(( $1 ) ? ( $2 ) : ( $3 ))');
    }

    // 2. Directives
    jsCode = jsCode
      .replace(/&НаКлиенте/gi, '// &НаКлиенте')
      .replace(/&НаСервереБезКонтекста/gi, '// &НаСервереБезКонтекста')
      .replace(/&НаСервере/gi, '// &НаСервере');

    // 3. Procedures & Functions
    jsCode = jsCode
      .replace(/Процедура\s+([A-Za-zА-Яа-я0-9_]+)\s*\((.*?)\)/gi, 'function $1($2) {')
      .replace(/КонецПроцедуры;?/gi, '}')
      .replace(/Функция\s+([A-Za-zА-Яа-я0-9_]+)\s*\((.*?)\)/gi, 'function $1($2) {')
      .replace(/КонецФункции;?/gi, '}')
      .replace(/Возврат\b/gi, 'return');

    // 4. Conditionals: Если ... Тогда ... ИначеЕсли ... Иначе ... КонецЕсли
    jsCode = jsCode
      .replace(/ИначеЕсли\s+(.*?)\s+Тогда/gi, '} else if ($1) {')
      .replace(/Если\s+(.*?)\s+Тогда/gi, 'if ($1) {')
      .replace(/Иначе\b/gi, '} else {')
      .replace(/КонецЕсли;?/gi, '}');

    // 5. Loops: Для Каждого Стр Из Коллекция Цикл / Для И = 1 По N Цикл
    jsCode = jsCode
      .replace(/Для\s+Каждого\s+([A-Za-zА-Яа-я0-9_]+)\s+Из\s+(.*?)\s+Цикл/gi, 'for (const $1 of ($2)) {')
      .replace(/Для\s+([A-Za-zА-Яа-я0-9_]+)\s*=\s*(.*?)\s+По\s+(.*?)\s+Цикл/gi, 'for (let $1 = $2; $1 <= $3; $1++) {')
      .replace(/Пока\s+(.*?)\s+Цикл/gi, 'while ($1) {')
      .replace(/КонецЦикла;?/gi, '}');

    // 6. Logical operators & literals
    jsCode = jsCode
      .replace(/\bИстина\b/gi, 'true')
      .replace(/\bЛожь\b/gi, 'false')
      .replace(/\bНеопределено\b/gi, 'undefined')
      .replace(/\bNull\b/gi, 'null')
      .replace(/\bИ\b/gi, '&&')
      .replace(/\bИЛИ\b/gi, '||')
      .replace(/\bНЕ\b/gi, '!')
      .replace(/<>/g, '!==');

    // 7. Fix equality in if / while conditions: single '=' to '==='
    jsCode = jsCode.replace(/if\s*\((.*?)\)\s*\{/g, (match, condition) => {
      const fixed = condition
        .replace(/([^=!<>])=([^=])/g, '$1===$2')
        .replace(/!===/g, '!==');
      return `if (${fixed}) {`;
    });
    jsCode = jsCode.replace(/else\s+if\s*\((.*?)\)\s*\{/g, (match, condition) => {
      const fixed = condition
        .replace(/([^=!<>])=([^=])/g, '$1===$2')
        .replace(/!===/g, '!==');
      return `else if (${fixed}) {`;
    });

    // 8. Wrap and execute with proxy environment
    const runner = new Function('env', `
      with (env) {
        ${jsCode}
      }
    `);

    runner(proxyEnv);

    if (output.length === 0) {
      output.push('✅ Алгоритм успешно отработал без сообщений. (Используйте Сообщить("..."), чтобы вывести данные на экран)');
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
