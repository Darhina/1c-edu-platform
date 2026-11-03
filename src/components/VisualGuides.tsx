import React, { useState } from 'react';
import { 
  MousePointer, Check, ArrowRight, Eye, Play, 
  Settings, Folder, FileText, Database, Layers, Sparkles, ZoomIn, X
} from 'lucide-react';

interface GuideScreen {
  id: string;
  title: string;
  targetLesson: string;
  badge: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  elements: {
    label: string;
    action: string;
    highlight: string;
  }[];
}

export const VisualGuides: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const guides: GuideScreen[] = [
    {
      id: 'launcher',
      title: '1. Окно запуска 1С: выбор базы и режима',
      targetLesson: 'Лекция 2',
      badge: 'Первый запуск',
      description: 'Стартовое окно «Запуск 1С:Предприятия». Здесь выбирается информационная база и режим работы: пользовательский сеанс («1С:Предприятие») или режим разработчика («Конфигуратор»).',
      imageSrc: '/screenshots/01_launcher_window.png',
      imageAlt: 'Окно запуска «1С:Предприятие 8.3» со списком информационных баз и кнопками режимов',
      elements: [
        { label: '1. Список информационных баз', action: 'Выберите базу «Практикум 1С (Оказание услуг)»', highlight: 'В левом списке' },
        { label: '2. Кнопка «1С:Предприятие»', action: 'Запуск сеанса пользователя для ввода документов (F5)', highlight: 'Верхняя кнопка' },
        { label: '3. Кнопка «Конфигуратор»', action: 'Режим разработчика: редактирование метаданных и программных модулей', highlight: 'Вторая кнопка' }
      ]
    },
    {
      id: 'enterprise-taxi',
      title: '2. Интерфейс «Такси» в режиме 1С:Предприятие',
      targetLesson: 'Лекция 1 и 2',
      badge: 'Пользовательский интерфейс',
      description: 'Реальный вид запущенной конфигурации по учету услуг в интерфейсе «Такси». Слева расположена панель разделов («Главное», «Оперативный учет», «Сервис»), вверху — открытые вкладки, по центру — журнал документов.',
      imageSrc: '/screenshots/03_enterprise_taxi_interface.png',
      imageAlt: 'Рабочее окно «1С:Предприятие 8.3» — конфигурация оперативного учета услуг в интерфейсе «Такси»',
      elements: [
        { label: '1. Панель разделов (Подсистемы)', action: 'Быстрый переход к подсистемам: «Оперативный учет», «Главное», «Сервис»', highlight: 'Желтая панель слева' },
        { label: '2. Панель открытых окон', action: 'Переключение между активными формами документов и справочников без их закрытия', highlight: 'Вкладки вверху' },
        { label: '3. Журнал «Оказание услуг»', action: 'Список зарегистрированных актов с суммами, клиентами и статусом проведения', highlight: 'Центральная таблица' }
      ]
    },
    {
      id: 'constants-options',
      title: '3. Конфигуратор: Форма констант и опции',
      targetLesson: 'Лекция 2 и 3',
      badge: 'Настройки учета',
      description: 'Реальный скриншот Конфигуратора: создание общей формы констант в ветке «Общие» → «Общие формы» и настройка вывода системных флагов (например, «УчетПоСкладам») в командный интерфейс.',
      imageSrc: '/screenshots/04_configurator_constants_form.png',
      imageAlt: 'Конфигуратор 1С: редактор формы констант и дерево метаданных конфигурации',
      elements: [
        { label: '1. Дерево метаданных', action: 'Ветка «Общие» → «Общие формы» → добавление ФормыКонстант', highlight: 'Слева в окне' },
        { label: '2. Состав констант', action: 'Выбор флажками тех констант, которые должны редактироваться в этой форме', highlight: 'Окно выбора' },
        { label: '3. Сохранение конфигурации', action: 'Нажмите клавишу F7 (Обновить конфигурацию БД), чтобы изменения вступили в силу', highlight: 'Клавиша F7' }
      ]
    },
    {
      id: 'subordinate-catalogs',
      title: '4. Подчиненные справочники и связи параметров',
      targetLesson: 'Лекция 3',
      badge: 'Связи справочников',
      description: 'Реальный скриншот настройки подчиненности: справочник «Помещения» подчинен справочнику «Склады» (вкладка «Владельцы»). В документах применяется механизм «Связи параметров выбора», фильтрующий помещения по выбранному складу.',
      imageSrc: '/screenshots/07_subordinate_catalog_owners.png',
      imageAlt: 'Конфигуратор 1С: вкладка «Владельцы» справочника Помещения, владелец — Склады',
      elements: [
        { label: '1. Вкладка «Владельцы»', action: 'В окне редактирования справочника «Помещения» перейдите на вкладку «Владельцы»', highlight: 'Вкладка 3' },
        { label: '2. Назначение владельца', action: 'Добавьте справочник «Склады» как владельца текущего справочника', highlight: 'Список владельцев' },
        { label: '3. Связи параметров выбора', action: 'В документе настройте фильтрацию: Отбор.Владелец(Склад)', highlight: 'Свойства реквизита' }
      ]
    },
    {
      id: 'hierarchy-tree',
      title: '5. Иерархия справочников: группы и дерево',
      targetLesson: 'Лекция 3 и 4',
      badge: 'Иерархия данных',
      description: 'Реальный скриншот 1С:Предприятия: справочник номенклатуры и услуг, сгруппированный по папкам («Услуги мастера», «Запчасти», «Материалы»). Пользователь видит удобное дерево категорий с быстрым поиском.',
      imageSrc: '/screenshots/13_hierarchy_tree_client_view.png',
      imageAlt: '1С:Предприятие: иерархический список справочника в виде раскрывающегося дерева папок',
      elements: [
        { label: '1. Флаг «Иерархический справочник»', action: 'В Конфигураторе на вкладке «Иерархия» включите иерархию групп и элементов', highlight: 'Вкладка Иерархия' },
        { label: '2. Просмотр в виде дерева', action: 'В клиентском сеансе переключите режим отображения списка на «Дерево»', highlight: 'Кнопка «Еще» → Вид' },
        { label: '3. Использование реквизита', action: 'Для цены и артикула задайте свойство «Использование: Для элемента»', highlight: 'Палитра свойств' }
      ]
    },
    {
      id: 'report-analytics',
      title: '6. Табличный отчет: ведомость взаиморасчетов',
      targetLesson: 'Лекция 5 и 6',
      badge: 'Отчетность и СКД',
      description: 'Реальный скриншот отчета «Состояние взаиморасчетов с контрагентами»: двухуровневая группировка (Клиент → Документ расчетов), расчет долга, поступивших оплат и итогового сальдо.',
      imageSrc: '/screenshots/15_report_vzaimoraschety.png',
      imageAlt: '1С:Предприятие: табличный отчет взаиморасчетов с группировкой по клиентам и суммам',
      elements: [
        { label: '1. Группировка строк', action: 'Группировка по контрагентам с раскрывающимися плюсиками детальных документов', highlight: 'Левая колонка' },
        { label: '2. Числовые ресурсы', action: 'Суммирование колонок «Сумма долга», «Оплачено», «Остаток» через СКД', highlight: 'Колонки с суммами' },
        { label: '3. Быстрые отборы', action: 'Возможность сформировать отчет по одному конкретному клиенту или за период', highlight: 'Шапка отчета' }
      ]
    }
  ];

  const current = guides[activeTab];

  return (
    <div className="my-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Фотогалерея и визуальный атлас конфигурации 1С
          </span>
          <h4 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-amber-500" />
            Реальные скриншоты: Конфигуратор и 1С:Предприятие
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
            {current.badge}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
            {current.targetLesson}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 border-b border-slate-100 dark:border-slate-800">
        {guides.map((g, idx) => (
          <button
            key={g.id}
            onClick={() => setActiveTab(idx)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === idx
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold scale-[1.02]'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
        {current.description}
      </p>

      {/* Real High-Resolution Screenshot with Zoom */}
      <div className="mb-6 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950 shadow-lg relative group">
        <div className="bg-slate-800/90 px-3 py-2 flex items-center justify-between text-xs text-slate-300 border-b border-slate-700">
          <span className="font-semibold text-amber-400 flex items-center gap-1.5 truncate">
            📷 {current.imageAlt}
          </span>
          <button
            onClick={() => setIsZoomed(true)}
            className="flex items-center gap-1 text-[11px] bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 px-2.5 py-1 rounded-lg font-bold transition-colors ml-2 flex-shrink-0"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>В полный размер</span>
          </button>
        </div>

        <div 
          className="cursor-pointer overflow-hidden max-h-[460px] flex items-center justify-center bg-slate-900"
          onClick={() => setIsZoomed(true)}
        >
          <img
            src={current.imageSrc}
            alt={current.imageAlt}
            className="w-full h-auto max-h-[460px] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>

        <div className="p-2.5 bg-slate-900/95 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
          <span>Кликните на изображение, чтобы рассмотреть все кнопки, меню и дерево объектов</span>
          <span className="text-amber-400 font-mono text-[10px]">Масштаб 1:1</span>
        </div>
      </div>

      {/* Step Click targets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {current.elements.map((el, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
            <div className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-between">
              <span>{el.label}</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 rounded font-bold">
                {el.highlight}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-snug">{el.action}</p>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div 
            className="relative max-w-6xl max-h-[94vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
              <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                📷 {current.imageAlt}
              </span>
              <button 
                onClick={() => setIsZoomed(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(94vh-80px)] p-3 bg-slate-950 flex items-center justify-center">
              <img 
                src={current.imageSrc} 
                alt={current.imageAlt} 
                className="max-w-full max-h-[84vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
