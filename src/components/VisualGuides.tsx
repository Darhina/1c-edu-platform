import React, { useState } from 'react';
import { 
  MousePointer, Check, ArrowRight, Eye, Play, 
  Settings, Folder, FileText, Database, Layers, Sparkles
} from 'lucide-react';

interface GuideScreen {
  id: string;
  title: string;
  targetLesson: string;
  badge: string;
  description: string;
  elements: {
    label: string;
    action: string;
    highlight: string;
  }[];
  mockupContent: React.ReactNode;
}

export const VisualGuides: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const guides: GuideScreen[] = [
    {
      id: 'launcher',
      title: '1. Окно запуска 1С:Предприятие',
      targetLesson: 'Лекция 2',
      badge: 'Первый запуск',
      description: 'Здесь выбирается информационная база и режим работы: для пользователей («1С:Предприятие») или для программиста («Конфигуратор»).',
      elements: [
        { label: '1. Список информационных баз', action: 'Выберите базу «Практикум 1С (Учебная)»', highlight: 'В левом списке' },
        { label: '2. Кнопка «1С:Предприятие»', action: 'Запуск для ввода документов и работы пользователей (F5)', highlight: 'Верхняя желтая кнопка' },
        { label: '3. Кнопка «Конфигуратор»', action: 'Режим разработчика: здесь создаются метаданные и пишется код!', highlight: 'Вторая кнопка справа' }
      ],
      mockupContent: (
        <div className="bg-[#ECE9D8] text-slate-800 p-4 rounded-xl border border-slate-400 font-sans text-xs shadow-inner select-none">
          <div className="bg-[#0055EA] text-white px-2 py-1 font-bold text-xs rounded-t flex justify-between items-center mb-2">
            <span>Запуск 1С:Предприятия</span>
            <span>✕</span>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-8 bg-white border border-slate-400 p-2 rounded h-40">
              <div className="font-semibold text-slate-500 text-[10px] uppercase mb-1">Информационные базы:</div>
              <div className="bg-[#316AC5] text-white p-1 rounded font-medium flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
                <span>★ Практикум 1С: Первые шаги (АлтГПУ)</span>
              </div>
              <div className="p-1 text-slate-700 flex items-center gap-1.5 hover:bg-slate-100">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block" />
                <span>Бухгалтерия предприятия (демо)</span>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-2">
              <div className="p-2 rounded bg-gradient-to-b from-[#FFF2B2] to-[#FFCC00] border-2 border-amber-600 font-bold text-center text-slate-900 shadow cursor-pointer ring-2 ring-amber-400">
                1С:Предприятие
                <span className="block text-[10px] font-normal text-slate-700 font-mono">Клавиша F5</span>
              </div>
              <div className="p-2 rounded bg-gradient-to-b from-slate-100 to-slate-200 border-2 border-blue-600 font-bold text-center text-slate-900 shadow cursor-pointer ring-2 ring-blue-400">
                Конфигуратор
                <span className="block text-[10px] font-normal text-blue-800">Режим разработчика ⚙️</span>
              </div>
              <div className="p-1 text-center text-[11px] text-slate-500">Добавить...</div>
              <div className="p-1 text-center text-[11px] text-slate-500">Настройка...</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'catalog-add',
      title: '2. Создание справочника и добавление реквизита',
      targetLesson: 'Лекция 3',
      badge: 'Справочники',
      description: 'Как добавить новый справочник («Клиенты») и настроить типы реквизитов (Строка, Число, Ссылка).',
      elements: [
        { label: '1. Меню «Справочники → Добавить»', action: 'Правый клик по ветке «Справочники» в Конфигураторе', highlight: 'В дереве метаданных' },
        { label: '2. Вкладка «Данные»', action: 'Кликните на вкладку «Данные» в мастере справочника', highlight: 'Вверху окна справочника' },
        { label: '3. Добавить реквизит «Телефон»', action: 'Нажмите зеленый плюс в блоке «Реквизиты» и выберите тип Строка(20)', highlight: 'Кнопка «+»' }
      ],
      mockupContent: (
        <div className="bg-[#1E293B] text-slate-200 p-4 rounded-xl border border-slate-700 font-sans text-xs shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-amber-400" />
              <span>Справочник: Клиенты [Редактирование объекта]</span>
            </div>
            <div className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Вкладка: Данные</div>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-5 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Реквизиты справочника:</span>
              <div className="space-y-1">
                <div className="p-1.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-between">
                  <span>• Телефон</span>
                  <span className="text-[10px] font-mono opacity-80">Строка (20)</span>
                </div>
                <div className="p-1.5 rounded bg-slate-800 text-slate-300 flex items-center justify-between">
                  <span>• Email</span>
                  <span className="text-[10px] font-mono opacity-80">Строка (50)</span>
                </div>
                <div className="p-1.5 rounded bg-slate-800 text-slate-300 flex items-center justify-between">
                  <span>• ЮрАдрес</span>
                  <span className="text-[10px] font-mono opacity-80">Строка (150)</span>
                </div>
              </div>
            </div>
            <div className="col-span-7 bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Свойства реквизита «Телефон»:</span>
              <div className="text-[11px] grid grid-cols-2 gap-1 border-b border-slate-800 pb-1">
                <span className="text-slate-400">Тип:</span>
                <span className="text-emerald-400 font-mono font-bold">Строка</span>
              </div>
              <div className="text-[11px] grid grid-cols-2 gap-1 border-b border-slate-800 pb-1">
                <span className="text-slate-400">Длина:</span>
                <span className="text-sky-300 font-mono font-bold">20</span>
              </div>
              <div className="text-[11px] grid grid-cols-2 gap-1">
                <span className="text-slate-400">Проверка заполнения:</span>
                <span className="text-amber-300">Выдавать ошибку</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'doc-events',
      title: '3. Создание обработчика «ПриИзменении» в форме',
      targetLesson: 'Лекция 4',
      badge: 'События формы',
      description: 'Как привязать автоматический расчет суммы к событию изменения цены или количества в форме документа.',
      elements: [
        { label: '1. Выделите поле «Количество»', action: 'В редакторе формы в дереве элементов выберите УслугиКоличество', highlight: 'В элементах формы' },
        { label: '2. Откройте Палитру свойств', action: 'В правом нижнем углу найдите блок «События»', highlight: 'Свойства (F4)' },
        { label: '3. Нажмите лупу у события «ПриИзменении»', action: 'Выберите «Создать на клиенте» — 1С сама создаст процедуру в модуле!', highlight: 'Значок лупы 🔍' }
      ],
      mockupContent: (
        <div className="bg-[#0F172A] text-slate-200 p-4 rounded-xl border border-slate-800 font-mono text-xs">
          <div className="text-slate-400 text-[10px] pb-1 mb-2 border-b border-slate-800 flex justify-between font-sans">
            <span>Модуль управляемой формы документа «Оказание услуг»</span>
            <span className="text-purple-400 font-bold">&НаКлиенте</span>
          </div>
          <div className="space-y-1 text-slate-300">
            <div><span className="text-purple-400 font-bold">&НаКлиенте</span></div>
            <div>
              <span className="text-rose-400 font-bold">Процедура </span>
              <span className="text-amber-300 font-bold">УслугиКоличествоПриИзменении</span>
              <span>(Элемент)</span>
            </div>
            <div className="pl-6 text-slate-400 italic">// 1. Получаем строку, где стоит курсор</div>
            <div className="pl-6">
              <span>ТекущаяСтрока = Элементы.Услуги.ТекущиеДанные;</span>
            </div>
            <div className="pl-6 text-slate-400 italic">// 2. Автоматический пересчет суммы!</div>
            <div className="pl-6 bg-amber-500/10 p-1 rounded border border-amber-500/30">
              <span className="text-amber-300 font-bold">ТекущаяСтрока.Сумма = ТекущаяСтрока.Количество * ТекущаяСтрока.Цена;</span>
            </div>
            <div><span className="text-rose-400 font-bold">КонецПроцедуры</span></div>
          </div>
        </div>
      )
    },
    {
      id: 'skd-report',
      title: '4. Конструктор схемы компоновки данных (СКД)',
      targetLesson: 'Лекция 6',
      badge: 'Отчеты СКД',
      description: 'Пошаговый визуальный конструктор отчетов без ручного написания SQL-запросов.',
      elements: [
        { label: '1. Наборы данных → Добавить Запрос', action: 'Выберите поля Клиент, Номенклатура, ВыручкаОборот', highlight: 'Вкладка 1' },
        { label: '2. Ресурсы → Сумма(ВыручкаОборот)', action: 'Пометьте числовые поля для итогового суммирования', highlight: 'Вкладка 3' },
        { label: '3. Настройки → Добавить группировку', action: 'Сгруппируйте по Клиенту и нажмите «Сформировать» в 1С!', highlight: 'Вкладка 6' }
      ],
      mockupContent: (
        <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 rounded-xl border border-slate-300 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 font-bold text-indigo-600 dark:text-indigo-400 text-xs">
            <Layers className="w-4 h-4" />
            <span>Конструктор отчета СКД: ПродажиУслугПоКлиентам</span>
          </div>
          <div className="flex gap-1.5 border-b border-slate-200 dark:border-slate-700 pb-1 mb-2 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">1. Наборы данных</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">2. Связи</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">3. Поля</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">4. Параметры</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500 text-white font-bold">5. Настройки</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Иерархия вывода отчета:</div>
            <div className="pl-2 border-l-2 border-indigo-400 space-y-1 text-[11px]">
              <div className="font-semibold text-indigo-700 dark:text-indigo-300">📁 Группировка: Клиент (Иванов, ООО Ромашка)</div>
              <div className="pl-4 text-slate-600 dark:text-slate-400">└ 📄 Детальные записи: Номенклатура, Количество, Выручка</div>
            </div>
            <div className="mt-2 pt-1 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-[10px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Ресурсы: Сумма(ВыручкаОборот)</span>
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">Готово к запуску F5</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const current = guides[activeTab];

  return (
    <div className="my-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Наглядный пошаговый гид по интерфейсу
          </span>
          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-amber-500" />
            Куда нажимать в 1С:Предприятие 8.3
          </h4>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold w-fit">
          {current.badge}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {guides.map((g, idx) => (
          <button
            key={g.id}
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === idx
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        {current.description}
      </p>

      {/* Visual Screen Mockup */}
      <div className="mb-4">
        {current.mockupContent}
      </div>

      {/* Step Click targets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {current.elements.map((el, i) => (
          <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
            <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center justify-between">
              <span>{el.label}</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded">
                {el.highlight}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-snug">{el.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
