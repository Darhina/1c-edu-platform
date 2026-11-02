import React, { useState } from 'react';
import { 
  Folder, FileText, Database, BookOpen, Layers, 
  Settings, ChevronRight, ChevronDown, Check, HelpCircle, Sparkles
} from 'lucide-react';

interface MetadataItem {
  id: string;
  name: string;
  type: 'catalog' | 'document' | 'infoRegister' | 'accumRegister' | 'report' | 'subsystem';
  icon: any;
  attributes?: string[];
  tableParts?: string[];
  description: string;
  properties: { label: string; value: string }[];
}

export const ConfiguratorMockup: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('cat-clients');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    subsystems: true,
    catalogs: true,
    documents: true,
    infoRegisters: true,
    accumRegisters: true,
    reports: true
  });

  const toggleFolder = (key: string) => {
    setOpenFolders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const metadata: Record<string, MetadataItem> = {
    'sub-services': {
      id: 'sub-services',
      name: 'УчетУслуг',
      type: 'subsystem',
      icon: Layers,
      description: 'Тематический раздел управляемого интерфейса для работы операторов и менеджеров.',
      properties: [
        { label: 'Имя', value: 'УчетУслуг' },
        { label: 'Синоним', value: 'Учет услуг и ремонтов' },
        { label: 'Включать в командный интерфейс', value: 'Истина' },
        { label: 'Состав объектов', value: 'Справочник.Клиенты, Документ.ОказаниеУслуг' }
      ]
    },
    'cat-clients': {
      id: 'cat-clients',
      name: 'Клиенты',
      type: 'catalog',
      icon: BookOpen,
      attributes: ['Телефон (Строка 20)', 'Email (Строка 50)', 'ЮридическийАдрес (Строка 150)'],
      description: 'Справочник для хранения карточек контрагентов, реквизитов и контактных данных.',
      properties: [
        { label: 'Имя', value: 'Клиенты' },
        { label: 'Синоним', value: 'Клиенты и заказчики' },
        { label: 'Длина кода', value: '9 (автонумерация)' },
        { label: 'Длина наименования', value: '100' },
        { label: 'Иерархический', value: 'Ложь' },
        { label: 'Основное представление', value: 'В виде наименования' }
      ]
    },
    'cat-nomenclature': {
      id: 'cat-nomenclature',
      name: 'Номенклатура',
      type: 'catalog',
      icon: BookOpen,
      attributes: ['ТипНоменклатуры (Перечисление: Товар / Услуга)', 'Артикул (Строка 25)'],
      description: 'Единый классификатор продаваемых услуг и материальных ценностей.',
      properties: [
        { label: 'Имя', value: 'Номенклатура' },
        { label: 'Синоним', value: 'Номенклатура' },
        { label: 'Длина наименования', value: '150' },
        { label: 'Иерархический', value: 'Истина (Группы и элементы)' }
      ]
    },
    'doc-service': {
      id: 'doc-service',
      name: 'ОказаниеУслуг',
      type: 'document',
      icon: FileText,
      attributes: ['Клиент (СправочникСсылка.Клиенты)', 'Специалист (СправочникСсылка.Сотрудники)', 'СуммаДокумента (Число 15,2)'],
      tableParts: ['Услуги: Номенклатура, Количество, Цена, Сумма'],
      description: 'Первичный учетный документ, отражающий факт выполнения работ и формирующий проводки выручки.',
      properties: [
        { label: 'Имя', value: 'ОказаниеУслуг' },
        { label: 'Синоним', value: 'Оказание услуг' },
        { label: 'Длина номера', value: '9' },
        { label: 'Периодичность номера', value: 'В пределах года' },
        { label: 'Проведение', value: 'Разрешить' },
        { label: 'Движения по регистрам', value: 'РегистрНакопления.Продажи' }
      ]
    },
    'reg-prices': {
      id: 'reg-prices',
      name: 'ЦеныНоменклатуры',
      type: 'infoRegister',
      icon: Database,
      attributes: ['Измерение: Номенклатура (СправочникСсылка)', 'Ресурс: Цена (Число 15,2)'],
      description: 'Периодический регистр сведений для хранения прейскуранта цен с возможностью среза на любую дату.',
      properties: [
        { label: 'Имя', value: 'ЦеныНоменклатуры' },
        { label: 'Периодичность', value: 'В пределах дня' },
        { label: 'Режим записи', value: 'Независимый' },
        { label: 'Ведущее измерение', value: 'Номенклатура' }
      ]
    },
    'rep-sales': {
      id: 'rep-sales',
      name: 'ПродажиУслуг',
      type: 'report',
      icon: Settings,
      description: 'Аналитический отчет на базе СКД с диаграммой структуры выручки и группировкой по клиентам.',
      properties: [
        { label: 'Имя', value: 'ПродажиУслуг' },
        { label: 'Основная схема компоновки', value: 'ОсновнаяСхемаКомпоновкиДанных' },
        { label: 'Ресурсы отчета', value: 'ВыручкаОборот, КоличествоОборот' }
      ]
    }
  };

  const selectedItem = metadata[selectedId] || metadata['cat-clients'];

  return (
    <div className="my-6 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
      {/* 1C Configurator window title bar */}
      <div className="bg-[#1E293B] text-slate-200 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-amber-400 flex items-center justify-center font-black text-[#B91C1C] text-xs">
            1С
          </div>
          <span className="text-xs font-semibold tracking-wide">
            Конфигуратор — Учебная база «Первый шаг в 1С» (АлтГПУ)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="hidden sm:inline">Интерактивный симулятор окна конфигурации</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">F5: Отладка</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
        {/* Left: Metadata Tree */}
        <div className="md:col-span-5 bg-slate-50 dark:bg-slate-850 p-3 border-r border-slate-200 dark:border-slate-800 font-sans text-xs select-none overflow-y-auto max-h-[420px]">
          <div className="font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 px-1">
            <Folder className="w-4 h-4 text-amber-500" />
            <span>Конфигурация (Дерево метаданных)</span>
          </div>

          <div className="space-y-1">
            {/* Subsystems */}
            <div>
              <div 
                onClick={() => toggleFolder('subsystems')}
                className="flex items-center gap-1 py-1 px-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 font-medium"
              >
                {openFolders.subsystems ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Подсистемы</span>
              </div>
              {openFolders.subsystems && (
                <div className="pl-6 space-y-0.5 mt-0.5">
                  <div 
                    onClick={() => setSelectedId('sub-services')}
                    className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer ${selectedId === 'sub-services' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold border-l-2 border-amber-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <span>УчетУслуг</span>
                  </div>
                </div>
              )}
            </div>

            {/* Catalogs */}
            <div>
              <div 
                onClick={() => toggleFolder('catalogs')}
                className="flex items-center gap-1 py-1 px-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 font-medium"
              >
                {openFolders.catalogs ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                <span>Справочники</span>
              </div>
              {openFolders.catalogs && (
                <div className="pl-6 space-y-0.5 mt-0.5">
                  <div 
                    onClick={() => setSelectedId('cat-clients')}
                    className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer ${selectedId === 'cat-clients' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold border-l-2 border-amber-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <span>Клиенты</span>
                  </div>
                  <div 
                    onClick={() => setSelectedId('cat-nomenclature')}
                    className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer ${selectedId === 'cat-nomenclature' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold border-l-2 border-amber-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <span>Номенклатура</span>
                  </div>
                </div>
              )}
            </div>

            {/* Documents */}
            <div>
              <div 
                onClick={() => toggleFolder('documents')}
                className="flex items-center gap-1 py-1 px-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 font-medium"
              >
                {openFolders.documents ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                <FileText className="w-3.5 h-3.5 text-red-500" />
                <span>Документы</span>
              </div>
              {openFolders.documents && (
                <div className="pl-6 space-y-0.5 mt-0.5">
                  <div 
                    onClick={() => setSelectedId('doc-service')}
                    className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer ${selectedId === 'doc-service' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold border-l-2 border-amber-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <span>ОказаниеУслуг</span>
                  </div>
                </div>
              )}
            </div>

            {/* Info Registers */}
            <div>
              <div 
                onClick={() => toggleFolder('infoRegisters')}
                className="flex items-center gap-1 py-1 px-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 font-medium"
              >
                {openFolders.infoRegisters ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                <span>Регистры сведений</span>
              </div>
              {openFolders.infoRegisters && (
                <div className="pl-6 space-y-0.5 mt-0.5">
                  <div 
                    onClick={() => setSelectedId('reg-prices')}
                    className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer ${selectedId === 'reg-prices' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold border-l-2 border-amber-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <span>ЦеныНоменклатуры</span>
                  </div>
                </div>
              )}
            </div>

            {/* Reports */}
            <div>
              <div 
                onClick={() => toggleFolder('reports')}
                className="flex items-center gap-1 py-1 px-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-300 font-medium"
              >
                {openFolders.reports ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                <Settings className="w-3.5 h-3.5 text-purple-500" />
                <span>Отчеты</span>
              </div>
              {openFolders.reports && (
                <div className="pl-6 space-y-0.5 mt-0.5">
                  <div 
                    onClick={() => setSelectedId('rep-sales')}
                    className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer ${selectedId === 'rep-sales' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold border-l-2 border-amber-500' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <span>ПродажиУслуг</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Properties Palette & Structure Preview */}
        <div className="md:col-span-7 p-4 bg-white dark:bg-slate-900 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                  Палитра свойств объекта
                </span>
                <h5 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                  <selectedItem.icon className="w-4 h-4 text-amber-500" />
                  {selectedItem.name}
                </h5>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {selectedItem.type}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-xs mb-3 leading-relaxed">
              {selectedItem.description}
            </p>

            {/* Properties Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden mb-3">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2 w-1/3">Свойство</th>
                    <th className="p-2">Значение</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                  {selectedItem.properties.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                      <td className="p-2 text-slate-500 dark:text-slate-400 font-sans">{p.label}</td>
                      <td className="p-2 font-bold text-slate-800 dark:text-slate-200">{p.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Attributes & Table parts if any */}
            {selectedItem.attributes && (
              <div className="mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Реквизиты объекта:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.attributes.map((attr, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px]">
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedItem.tableParts && (
              <div className="mt-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Табличные части:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.tableParts.map((tp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px]">
                      {tp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              Подсказка: нажимайте на любые узлы в левом дереве метаданных!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
