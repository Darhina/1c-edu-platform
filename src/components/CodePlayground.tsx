import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, BookOpen } from 'lucide-react';
import { executeOneCCode, RunResult } from '../utils/onecInterpreter';

const PRESET_SNIPPETS = [
  {
    title: '1. Расчет скидки и суммы (Условия)',
    code: `// Расчет скидки для клиента сервисного центра
СуммаЗаказа = 45000;
СкидкаПроцент = 0;

Если СуммаЗаказа >= 50000 Тогда
    СкидкаПроцент = 15;
ИначеЕсли СуммаЗаказа >= 30000 Тогда
    СкидкаПроцент = 10;
Иначе
    СкидкаПроцент = 0;
КонецЕсли;

СуммаСкидки = СуммаЗаказа * (СкидкаПроцент / 100);
ИтогоКВозмещению = СуммаЗаказа - СуммаСкидки;

Сообщить("Сумма заказа: " + СуммаЗаказа + " руб.");
Сообщить("Предоставлена скидка: " + СкидкаПроцент + "% (" + СуммаСкидки + " руб.)");
Сообщить("Итого к оплате: " + ИтогоКВозмещению + " руб.");`
  },
  {
    title: '2. Обход строк табличной части документа (Цикл)',
    code: `// Обход строк документа «Оказание услуг» и подсчет общей выручки
Сообщить("Документ № " + Объект.Номер + " от " + Объект.Дата);
Сообщить("Клиент: " + Объект.Клиент);
Сообщить("--- Список оказанных услуг ---");

ОбщийИтог = 0;

Для Каждого Стр Из Объект.Услуги Цикл
    // Расчет суммы строки: Количество * Цена
    Стр.Сумма = Стр.Количество * Стр.Цена;
    ОбщийИтог = ОбщийИтог + Стр.Сумма;
    
    Сообщить("• " + Стр.Номенклатура + " | " + Стр.Количество + " шт. x " + Стр.Цена + " ₽ = " + Стр.Сумма + " ₽");
КонецЦикла;

Сообщить("-------------------------------");
Сообщить("ИТОГО ПО ДОКУМЕНТУ: " + Формат(ОбщийИтог, "") + " руб.");`
  },
  {
    title: '3. Валидация реквизитов (Контроль заполнения)',
    code: `// Проверка заполненности перед проведением
Клиент = Объект.Клиент;
Специалист = ""; // Мастер не указан!
Отказ = Ложь;

Если НЕ ЗначениеЗаполнено(Клиент) Тогда
    Сообщить("ОШИБКА: Не заполнено поле 'Клиент'!");
    Отказ = Истина;
КонецЕсли;

Если НЕ ЗначениеЗаполнено(Специалист) Тогда
    Сообщить("ОШИБКА: Не назначен мастер-исполнитель!");
    Отказ = Истина;
КонецЕсли;

Если Отказ Тогда
    Сообщить("Документ НЕ может быть проведен из-за незаполненных полей.");
Иначе
    Сообщить("Все поля заполнены корректно. Документ успешно проведен!");
КонецЕсли;`
  },
  {
    title: '4. Работа со структурами и датой',
    code: `// Передача параметров через объект «Структура»
ПараметрыЗаказа = Новый("Структура", "Клиент, Статус, Срочность", "ООО Алтай-Сервис", "В работе", Истина);

Сообщить("Контрагент: " + ПараметрыЗаказа.Клиент);
Сообщить("Текущее состояние: " + ПараметрыЗаказа.Статус);
Сообщить("Срочный заказ: " + ?(ПараметрыЗаказа.Срочность, "ДА (+30% к тарифу)", "НЕТ"));
Сообщить("Системная дата: " + ТекущаяДата());`
  }
];

export const CodePlayground: React.FC = () => {
  const [code, setCode] = useState<string>(PRESET_SNIPPETS[0].code);
  const [result, setResult] = useState<RunResult | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleRun = () => {
    const res = executeOneCCode(code);
    setResult(res);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
      {/* Playground Header */}
      <div className="bg-[#1E293B] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-[#B91C1C] text-xs shadow-sm">
            1С
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Песочница кода встроенного языка 1С
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-400/30">
                Live Simulator
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Пишите или выбирайте готовые алгоритмы и запускайте без установки платформы!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors border border-slate-700"
            title="Скопировать код"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Скопировано!' : 'Копировать'}</span>
          </button>
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Выполнить код (F5)</span>
          </button>
        </div>
      </div>

      {/* Preset switcher */}
      <div className="bg-slate-100 dark:bg-slate-850 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-500 font-semibold whitespace-nowrap flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Готовые примеры:
        </span>
        {PRESET_SNIPPETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCode(preset.code);
              setResult(null);
            }}
            className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors text-xs font-medium ${
              code === preset.code
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Code Area & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 min-h-[320px]">
        {/* Editor */}
        <div className="lg:col-span-7 p-4 bg-slate-900 text-slate-100 font-mono text-xs flex flex-col">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 pb-1 border-b border-slate-800">
            <span>Редактор программного модуля 1С</span>
            <span className="text-slate-500">Поддерживает русский синтаксис 1С</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full flex-1 bg-transparent text-slate-100 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-amber-500 selection:text-black min-h-[220px]"
            spellCheck={false}
          />
        </div>

        {/* Console Output */}
        <div className="lg:col-span-5 p-4 bg-slate-950 text-slate-200 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-850">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                <Terminal className="w-3.5 h-3.5" />
                Окно служебных сообщений 1С
              </span>
              {result && (
                <button
                  onClick={() => setResult(null)}
                  className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Очистить
                </button>
              )}
            </div>

            {result ? (
              <div className="space-y-1.5 overflow-y-auto max-h-[260px] pr-1">
                {result.hasError ? (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300">
                    <p className="font-bold text-xs mb-1">Ошибка времени выполнения:</p>
                    <p className="text-[11px] font-mono">{result.errorMessage}</p>
                  </div>
                ) : (
                  result.output.map((line, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 px-2.5 rounded bg-slate-900 border border-slate-800/80 text-emerald-400 text-xs leading-normal font-mono"
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-center text-slate-500 px-4">
                <Terminal className="w-8 h-8 mb-2 text-slate-700" />
                <p className="text-xs">Нажмите «Выполнить код (F5)», чтобы увидеть вывод сообщений оператора Сообщить(...)</p>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Эмулятор встроенного языка</span>
            <span className="text-amber-500/80 font-sans">АлтГПУ • 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
