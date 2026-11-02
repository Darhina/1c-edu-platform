import React, { useState } from 'react';
import { X, Search, BookOpen, Code, Copy, Check, Lightbulb } from 'lucide-react';
import { SYNTAX_ITEMS, SyntaxItem } from '../data/syntaxHelpData';

interface SyntaxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyntaxModal: React.FC<SyntaxModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Все разделы' },
    { id: 'operators', label: 'Операторы' },
    { id: 'functions', label: 'Функции' },
    { id: 'strings', label: 'Строки' },
    { id: 'dates', label: 'Даты' },
    { id: 'collections', label: 'Коллекции' },
    { id: 'database', label: 'База и Регистры' }
  ];

  const filtered = SYNTAX_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.signature.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleCopy = (item: SyntaxItem) => {
    navigator.clipboard.writeText(item.example);
    setCopiedName(item.name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1E293B] text-white border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-[#B91C1C] text-xs">
              F1
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">
                Синтакс-помощник встроенного языка «1С:Предприятие 8.3»
              </h3>
              <p className="text-[11px] text-slate-400">
                Быстрый интерактивный справочник по операторам, функциям и регистрам
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по имени метода или описанию (например: СрезПоследних, Сообщить, Если, Формат)..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <p className="text-sm">Ничего не найдено по запросу «{search}»</p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-amber-400 dark:hover:border-amber-500/50 transition-all shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(item)}
                    className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {copiedName === item.name ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedName === item.name ? 'Скопировано!' : 'Копировать пример'}</span>
                  </button>
                </div>

                <div className="font-mono text-xs text-amber-700 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900/40 mb-2">
                  {item.signature}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Example code */}
                <div className="bg-slate-900 rounded-xl p-3 font-mono text-xs text-slate-100 overflow-x-auto mb-2">
                  <pre>{item.example}</pre>
                </div>

                {item.tip && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>Совет: {item.tip}</span>
                  </p>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
