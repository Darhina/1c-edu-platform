import React, { useState } from 'react';
import { Copy, Check, Play, FileCode } from 'lucide-react';

interface OneCCodeBlockProps {
  code: string;
  title?: string;
  explanation?: string;
  onOpenInPlayground?: (code: string) => void;
}

export const OneCCodeBlock: React.FC<OneCCodeBlockProps> = ({
  code,
  title,
  explanation,
  onOpenInPlayground
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1C Syntax Highlighter
  const highlight1C = (rawCode: string) => {
    const lines = rawCode.split('\n');

    return lines.map((line, lineIdx) => {
      // Check if whole line is comment
      const trimmed = line.trim();
      if (trimmed.startsWith('//')) {
        return (
          <div key={lineIdx} className="table-row">
            <span className="table-cell pr-4 text-slate-600 select-none text-right font-mono text-[11px] w-8">
              {lineIdx + 1}
            </span>
            <span className="table-cell text-slate-400 italic">
              {line}
            </span>
          </div>
        );
      }

      // Tokenize line with regex preserving tokens
      // Tokens: strings, comments, directives, keywords, methods, numbers
      const tokenRegex = /(\/\/.*$|"(?:[^"\\]|\\.)*"|&[А-Яа-яA-Za-z0-9_]+|\b(?:Процедура|КонецПроцедуры|Функция|КонецФункции|Если|Тогда|ИначеЕсли|Иначе|КонецЕсли|Для|Каждого|Из|По|Цикл|КонецЦикла|Пока|Возврат|Новый|Попытка|Исключение|КонецПопытки|Истина|Ложь|Неопределено|Null|И|ИЛИ|НЕ)\b|\b(?:Сообщить|Предупреждение|ЗначениеЗаполнено|ТекущаяДата|Год|Месяц|День|СтрДлина|Формат|СрезПоследних|Добавить|Вставить|Очистить|Количество)\b|\b\d+(?:\.\d+)?\b)/g;

      const elements: React.ReactNode[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = tokenRegex.exec(line)) !== null) {
        // Text before match
        if (match.index > lastIndex) {
          elements.push(line.substring(lastIndex, match.index));
        }

        const token = match[0];
        lastIndex = match.index + token.length;

        if (token.startsWith('//')) {
          // Comment
          elements.push(
            <span key={match.index} className="text-slate-400 italic font-mono">
              {token}
            </span>
          );
        } else if (token.startsWith('"')) {
          // String
          elements.push(
            <span key={match.index} className="text-emerald-400 font-mono">
              {token}
            </span>
          );
        } else if (token.startsWith('&')) {
          // Compilation Directive
          elements.push(
            <span key={match.index} className="text-purple-400 font-bold font-mono">
              {token}
            </span>
          );
        } else if (/^(?:Процедура|КонецПроцедуры|Функция|КонецФункции|Если|Тогда|ИначеЕсли|Иначе|КонецЕсли|Для|Каждого|Из|По|Цикл|КонецЦикла|Пока|Возврат|Новый|Попытка|Исключение|КонецПопытки|Истина|Ложь|Неопределено|Null|И|ИЛИ|НЕ)$/i.test(token)) {
          // Keywords (Red/Crimson 1C Style)
          elements.push(
            <span key={match.index} className="text-rose-400 font-bold font-mono">
              {token}
            </span>
          );
        } else if (/^(?:Сообщить|Предупреждение|ЗначениеЗаполнено|ТекущаяДата|Год|Месяц|День|СтрДлина|Формат|СрезПоследних|Добавить|Вставить|Очистить|Количество)$/i.test(token)) {
          // Built-in Methods (Amber)
          elements.push(
            <span key={match.index} className="text-amber-300 font-semibold font-mono">
              {token}
            </span>
          );
        } else if (/^\d+(?:\.\d+)?$/.test(token)) {
          // Numbers (Cyan/Blue)
          elements.push(
            <span key={match.index} className="text-sky-300 font-mono">
              {token}
            </span>
          );
        } else {
          elements.push(token);
        }
      }

      // Remaining trailing characters
      if (lastIndex < line.length) {
        elements.push(line.substring(lastIndex));
      }

      return (
        <div key={lineIdx} className="table-row hover:bg-slate-800/40 transition-colors">
          <span className="table-cell pr-4 text-slate-600 select-none text-right font-mono text-[11px] w-8">
            {lineIdx + 1}
          </span>
          <span className="table-cell text-slate-200">
            {elements.length > 0 ? elements : '\u00A0'}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-lg my-5">
      {/* Header bar */}
      <div className="bg-[#151D2C] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-amber-400 flex items-center justify-center font-black text-[#B91C1C] text-[10px]">
            1С
          </div>
          <span className="font-semibold text-xs text-slate-200 tracking-wide">
            {title || 'Листинг модуля 1С'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenInPlayground && (
            <button
              onClick={() => onOpenInPlayground(code)}
              className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 px-2.5 py-1 rounded bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 transition-colors"
              title="Открыть этот код в интерактивной песочнице"
            >
              <Play className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline font-medium">Запустить</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Копировать</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body with line numbers */}
      <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-200">
        <div className="table w-full">
          {highlight1C(code)}
        </div>
      </div>

      {/* Explanation note if present */}
      {explanation && (
        <div className="bg-[#0F172A] p-3 text-xs text-slate-400 border-t border-slate-800 flex items-start gap-2">
          <span className="text-amber-400 font-bold flex-shrink-0">💡 Пояснение:</span>
          <span>{explanation}</span>
        </div>
      )}
    </div>
  );
};
