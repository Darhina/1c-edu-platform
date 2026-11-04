import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FolderTree, Database, Layers, CheckSquare } from 'lucide-react';

export const MetadataTreeAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [frame, setFrame] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const animRef = useRef<number | null>(null);
  const totalFrames = 600;

  useEffect(() => {
    let lastTime = performance.now();
    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (isPlaying) {
        setFrame((prev) => {
          const next = prev + dt * 30 * speed;
          return next >= totalFrames ? 0 : next;
        });
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, speed]);

  const f = Math.floor(frame);
  const phase = f < 150 ? 1 : f < 300 ? 2 : f < 450 ? 3 : 4;

  return (
    <div className="my-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full text-amber-100">
            Лекция 2: Интерактивная архитектурная анимация
          </span>
          <h3 className="text-lg sm:text-xl font-black mt-1">
            Дерево Метаданных: Как конфигуратор генерирует таблицы СУБД
          </h3>
          <p className="text-xs text-amber-100 mt-0.5">
            Создаем ветку «Справочники» в Конфигураторе — 1С автоматически создает физические таблицы в SQL
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/20 text-xs font-bold text-center">
          {phase === 1 && '1. Конфигуратор: Добавление объекта'}
          {phase === 2 && '2. Настройка реквизитов и типов'}
          {phase === 3 && '3. Реструктуризация БД (F7)'}
          {phase === 4 && '4. СУБД: Готовая таблица SQL'}
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] max-h-[500px] bg-slate-950 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 1000 560" className="w-full h-full select-none font-sans">
          <defs>
            <linearGradient id="treeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="dbGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="100%" stopColor="#022C22" />
            </linearGradient>
          </defs>

          {/* Левый блок: Дерево метаданных Конфигуратора */}
          <g transform="translate(60, 70)">
            <rect x="0" y="0" width="380" height="390" rx="18" fill="url(#treeGrad)" stroke="#EAB308" strokeWidth={phase <= 2 ? 3 : 1} />
            <rect x="0" y="0" width="380" height="40" rx="18" fill="rgba(234,179,8,0.2)" />
            <text x="20" y="26" fill="#FEF08A" fontSize="13" fontWeight="bold">
              📁 Дерево конфигурации (Конфигуратор)
            </text>

            <g transform="translate(20, 55)">
              <text x="0" y="20" fill="#94A3B8" fontSize="12">⚙️ Конфигурация: УчетУслуг</text>
              <text x="16" y="45" fill="#94A3B8" fontSize="12">├── 📁 Подсистемы (Сервис, Главное)</text>
              
              {/* Ветка Справочники */}
              <text x="16" y="70" fill="#FCD34D" fontSize="12" fontWeight="bold">└── 📁 Справочники</text>
              
              <g transform="translate(40, 85)">
                <rect 
                  x="-8" 
                  y="-14" 
                  width="280" 
                  height="26" 
                  rx="6" 
                  fill={phase >= 1 ? '#CA8A04' : '#1E293B'} 
                />
                <text x="0" y="4" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                  📘 Клиенты (Справочник)
                </text>
              </g>

              {/* Реквизиты */}
              <g transform="translate(48, 125)">
                <text x="0" y="0" fill={phase >= 2 ? '#93C5FD' : '#475569'} fontSize="11">├── 🏷️ Код (Число, 9 знаков)</text>
                <text x="0" y="22" fill={phase >= 2 ? '#93C5FD' : '#475569'} fontSize="11">├── 🏷️ Наименование (Строка, 100)</text>
                <text x="0" y="44" fill={phase >= 2 ? '#34D399' : '#475569'} fontSize="11" fontWeight="bold">├── 🏷️ Телефон (Строка, 20)</text>
                <text x="0" y="66" fill={phase >= 2 ? '#34D399' : '#475569'} fontSize="11" fontWeight="bold">└── 🏷️ СкидкаКлиента (Число, 5.2)</text>
              </g>

              <g transform="translate(16, 230)">
                <text x="0" y="0" fill="#94A3B8" fontSize="12">├── 📄 Документы (ОказаниеУслуги)</text>
                <text x="0" y="25" fill="#94A3B8" fontSize="12">└── 📊 РегистрыНакопления (Остатки)</text>
              </g>
            </g>
          </g>

          {/* Правый блок: Таблицы в СУБД SQL */}
          <g transform="translate(560, 70)">
            <rect x="0" y="0" width="380" height="390" rx="18" fill="url(#dbGrad)" stroke={phase >= 3 ? '#10B981' : '#334155'} strokeWidth={phase >= 3 ? 3 : 1} />
            <rect x="0" y="0" width="380" height="40" rx="18" fill="rgba(16,185,129,0.2)" />
            <text x="20" y="26" fill="#A7F3D0" fontSize="13" fontWeight="bold">
              🗄️ Физическая СУБД (PostgreSQL / 1Cv8.1CD)
            </text>

            <g transform="translate(20, 55)">
              <text x="0" y="20" fill="#6EE7B7" fontSize="11" fontWeight="bold">
                Таблица: _Reference12 (Справочник.Клиенты)
              </text>
              
              <rect x="0" y="32" width="340" height="26" fill="#065F46" />
              <text x="10" y="49" fill="#ECFDF5" fontSize="10" fontWeight="bold">Колонка SQL</text>
              <text x="140" y="49" fill="#ECFDF5" fontSize="10" fontWeight="bold">Тип данных SQL</text>
              <text x="260" y="49" fill="#ECFDF5" fontSize="10" fontWeight="bold">Индекс</text>

              {/* Строки таблицы SQL */}
              {[
                { col: '_IDRRef', type: 'BYTEA (UUID, 16)', idx: 'PRIMARY KEY' },
                { col: '_Code', type: 'NUMERIC(9,0)', idx: 'INDEX' },
                { col: '_Description', type: 'VARCHAR(100)', idx: 'INDEX' },
                { col: '_Fld45_Phone', type: 'VARCHAR(20)', idx: 'NULL' },
                { col: '_Fld46_Discount', type: 'NUMERIC(5,2)', idx: 'NULL' },
                { col: '_Marked', type: 'BOOLEAN', idx: 'ПометкаУдал' }
              ].map((row, idx) => (
                <g key={idx} transform={`translate(0, ${64 + idx * 30})`}>
                  <rect x="0" y="0" width="340" height="26" fill={idx % 2 === 0 ? '#064E3B' : '#047857'} opacity={phase >= 3 ? 1 : 0.2} />
                  <text x="10" y="17" fill={phase >= 3 ? '#F1F5F9' : '#475569'} fontSize="10" fontFamily="monospace">{row.col}</text>
                  <text x="140" y="17" fill={phase >= 3 ? '#A7F3D0' : '#475569'} fontSize="10">{row.type}</text>
                  <text x="260" y="17" fill={phase >= 3 ? '#FCD34D' : '#475569'} fontSize="9" fontWeight="bold">{row.idx}</text>
                </g>
              ))}

              <text x="0" y="270" fill="#34D399" fontSize="11">
                {phase >= 3 ? '✓ Автоматически сгенерированы индексы и триггеры' : 'Таблица еще не реструктуризирована'}
              </text>
            </g>
          </g>

          {/* Стрелка генерации по центру */}
          <g transform="translate(440, 240)">
            <rect x="0" y="-20" width="120" height="40" rx="8" fill="#B45309" />
            <text x="60" y="5" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
              {phase === 3 ? 'F7 (Синхронизация)' : 'Генерация SQL ➔'}
            </text>
          </g>

          {/* Текстовая строка внизу */}
          <rect x="120" y="480" width="760" height="42" rx="10" fill="#1E293B" stroke="#334155" />
          <text x="500" y="506" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle">
            {phase === 1 && '1. В Конфигураторе разработчик создает объект метаданных «Справочник: Клиенты».'}
            {phase === 2 && '2. Добавляются реквизиты: Телефон и Скидка с указанием типов данных.'}
            {phase === 3 && '3. При нажатии F7 платформа 1С выполняет реструктуризацию и создает физические таблицы в СУБД.'}
            {phase === 4 && '4. Разработчику не нужно писать CREATE TABLE вручную: 1С берет на себя всю СУБД-рутину!'}
          </text>
        </svg>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800/90 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all"
          >
            {isPlaying ? <><Pause className="w-3.5 h-3.5" /> Пауза</> : <><Play className="w-3.5 h-3.5" /> Запуск</>}
          </button>

          <button
            onClick={() => setFrame(0)}
            className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-colors"
            title="Сначала"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 border-l border-slate-300 dark:border-slate-700 pl-2">
            {[1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  speed === s
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          <span>Шаг: {phase} из 4</span>
          <span>{(frame / 30).toFixed(1)}с / 20.0с</span>
          <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div 
              className="h-full bg-amber-500 transition-all duration-75"
              style={{ width: `${(frame / totalFrames) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
