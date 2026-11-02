import React, { useState } from 'react';
import { 
  Server, Monitor, Database, Layers, FileText, ArrowRight, 
  CheckCircle, Table, BarChart2, ShieldCheck, Cpu, HardDrive, RefreshCw
} from 'lucide-react';

export const ClientServerDiagram: React.FC = () => {
  const [activeTier, setActiveTier] = useState<number>(1);

  const tiers = [
    {
      id: 0,
      title: 'Клиентский уровень (Тонкий / Веб-клиент)',
      icon: Monitor,
      color: 'border-blue-400 bg-blue-50/70 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200',
      tag: '&НаКлиенте',
      description: 'Пользовательский интерфейс: Google Chrome, Тонкий клиент 1С на Windows/Linux. Не обращается к файлам базы напрямую! Отправляет действия пользователя на Сервер.'
    },
    {
      id: 1,
      title: 'Кластер серверов «1С:Предприятие 8.3»',
      icon: Cpu,
      color: 'border-amber-400 bg-amber-50/80 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100 ring-2 ring-amber-400',
      tag: '&НаСервере',
      description: 'Сердце системы. Исполняет бизнес-логику, проверяет права доступа, формирует отчеты СКД, управляет транзакциями проведения документов и кэширует данные.'
    },
    {
      id: 2,
      title: 'Сервер баз данных (СУБД)',
      icon: HardDrive,
      color: 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200',
      tag: 'SQL / 1Cv8.1CD',
      description: 'Физическое хранилище таблиц. В корпоративной среде: PostgreSQL, MS SQL Server, Oracle. В учебной версии: ультракомпактная файловая база данных (1Cv8.1CD).'
    }
  ];

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-500" />
          Интерактивная трехуровневая модель 1С (Кликните на уровень)
        </h4>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold">
          Архитектура 8.3
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = activeTier === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isSelected 
                  ? 'border-amber-500 bg-amber-50/90 dark:bg-amber-950/40 shadow-md scale-[1.02]' 
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  {tier.tag}
                </span>
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-white leading-tight mb-1">
                {tier.title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          Подробности выбранного уровня:
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {tiers[activeTier].description}
        </p>
      </div>
    </div>
  );
};

export const DocLifecycleDiagram: React.FC = () => {
  const steps = [
    { title: '1. Создание и редактирование', desc: 'Менеджер открывает форму, заполняет клиента и табличную часть. Срабатывают клиентские процедуры пересчета сумм (&НаКлиенте).' },
    { title: '2. Нажатие «Провести и закрыть»', desc: 'Платформа проверяет заполнение обязательных реквизитов (Контроль заполнения) и инициирует транзакцию на сервере.' },
    { title: '3. ОбработкаПроведения (Модуль)', desc: 'Серверная процедура. Проверяет остатки по регистрам. Если чего-то не хватает — Отказ = Истина и откат назад.' },
    { title: '4. Запись движений в регистры', desc: 'Документ делает проводки в Регистры накопления («Продажи») и Регистры сведений. Данные готовы для отчетов СКД!' }
  ];

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-red-500 animate-spin-slow" />
        Жизненный цикл документа в 1С: от черновика до движений
      </h4>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-xs border border-red-200 dark:border-red-800">
              {idx + 1}
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">{step.title}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RegisterSliceDiagram: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<'01.01' | '15.05' | '01.10'>('15.05');

  const history = [
    { date: '01.01.2026', item: 'Установка 1С', price: '2 500 ₽', activeAt: ['01.01', '15.05', '01.10'] },
    { date: '10.04.2026', item: 'Установка 1С', price: '3 000 ₽', activeAt: ['15.05', '01.10'] },
    { date: '01.09.2026', item: 'Установка 1С', price: '3 800 ₽', activeAt: ['01.10'] }
  ];

  const currentPrice = selectedDate === '01.01' ? '2 500 ₽' : selectedDate === '15.05' ? '3 000 ₽' : '3 800 ₽';

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Table className="w-5 h-5 text-amber-500" />
            Интерактивная демонстрация «СрезаПоследних»
          </h4>
          <p className="text-xs text-slate-500">Выберите дату документа и посмотрите, какую цену вернет 1С</p>
        </div>
        <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setSelectedDate('01.01')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${selectedDate === '01.01' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}
          >
            01 Янв 2026
          </button>
          <button
            onClick={() => setSelectedDate('15.05')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${selectedDate === '15.05' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}
          >
            15 Мая 2026
          </button>
          <button
            onClick={() => setSelectedDate('01.10')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${selectedDate === '01.10' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}
          >
            01 Окт 2026
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3">Период (Дата записи)</th>
              <th className="p-3">Номенклатура (Измерение)</th>
              <th className="p-3">Цена (Ресурс)</th>
              <th className="p-3">Попадает в Срез?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.map((row, i) => {
              const inScope = row.activeAt.includes(selectedDate);
              const isLatest = (selectedDate === '01.01' && i === 0) || (selectedDate === '15.05' && i === 1) || (selectedDate === '01.10' && i === 2);
              return (
                <tr key={i} className={isLatest ? 'bg-amber-50 dark:bg-amber-950/30 font-medium' : ''}>
                  <td className="p-3 font-mono">{row.date}</td>
                  <td className="p-3">{row.item}</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{row.price}</td>
                  <td className="p-3">
                    {isLatest ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle className="w-4 h-4" /> Актуально на дату
                      </span>
                    ) : inScope ? (
                      <span className="text-slate-400">Предыдущая история</span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">Еще не наступила</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
        <span className="text-xs font-mono text-amber-900 dark:text-amber-200">
          СрезПоследних('{selectedDate}.2026', Отбор).Цена
        </span>
        <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
          Результат: {currentPrice}
        </span>
      </div>
    </div>
  );
};

export const SKDSchemeDiagram: React.FC = () => {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-indigo-500" />
        Архитектура Системы Компоновки Данных (СКД) в 4 шага
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30">
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">Шаг 1: Набор данных</div>
          <p className="text-xs text-slate-600 dark:text-slate-300">Запрос к регистру накопления «ПродажиОбороты» за период.</p>
        </div>
        <div className="p-3.5 rounded-xl border border-purple-100 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/30">
          <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">Шаг 2: Ресурсы</div>
          <p className="text-xs text-slate-600 dark:text-slate-300">Назначение полей для суммирования: Сумма(Выручка), Сумма(Количество).</p>
        </div>
        <div className="p-3.5 rounded-xl border border-amber-100 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/30">
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">Шаг 3: Настройки</div>
          <p className="text-xs text-slate-600 dark:text-slate-300">Иерархические группировки: Клиент → Номенклатура + Круговая диаграмма.</p>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30">
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Шаг 4: Отчет в 1С</div>
          <p className="text-xs text-slate-600 dark:text-slate-300">Интерактивный сводный отчет с фильтрами без единой строчки кода!</p>
        </div>
      </div>
    </div>
  );
};
