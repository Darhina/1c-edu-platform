import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, BarChart3, Database, Filter, Layers, PieChart } from 'lucide-react';

export const SKDPipelineAnimation: React.FC = () => {
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
  // Фазы СКД конвейера:
  // 1: Источник данных (Запрос к СУБД) -> сырые строки
  // 2: Компоновщик настроек (Группировки, Отборы, Параметры периода)
  // 3: Процессор компоновки (Агрегация ресурсов Сумма(Выручка))
  // 4: Процессор вывода (Отрисовка красивой таблицы и круговой диаграммы)
  const phase = f < 150 ? 1 : f < 300 ? 2 : f < 450 ? 3 : 4;

  return (
    <div className="my-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full text-indigo-100">
            Лекция 5: Интерактивная архитектурная анимация
          </span>
          <h3 className="text-lg sm:text-xl font-black mt-1">
            Конвейер СКД: от SQL-таблицы к интерактивной диаграмме руководителя
          </h3>
          <p className="text-xs text-indigo-100 mt-0.5">
            Как Система Компоновки Данных без ручного кода строит аналитические отчеты
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/20 text-xs font-bold text-center">
          {phase === 1 && '1. SQL Запрос к базе данных'}
          {phase === 2 && '2. Фильтрация и группировки'}
          {phase === 3 && '3. Агрегация ресурсов (Сумма)'}
          {phase === 4 && '4. Вывод: Таблица + Диаграмма'}
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] max-h-[500px] bg-slate-950 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 1000 560" className="w-full h-full select-none font-sans">
          <defs>
            <linearGradient id="skdNodeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <filter id="skdGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 4 Шага конвейера */}
          {[
            { x: 50, title: '1. Источник данных', sub: 'Запрос к регистру', tag: 'НаборДанных1', active: phase >= 1, color: '#38BDF8' },
            { x: 285, title: '2. Настройки СКД', sub: 'Период, Отборы', tag: 'КомпоновщикНастроек', active: phase >= 2, color: '#818CF8' },
            { x: 520, title: '3. Процессор СКД', sub: 'Сумма(Выручка)', tag: 'ПроцессорКомпоновки', active: phase >= 3, color: '#C084FC' },
            { x: 755, title: '4. Результат', sub: 'Таблица + График', tag: 'ПроцессорВывода', active: phase >= 4, color: '#34D399' }
          ].map((step, idx) => (
            <g key={idx} transform={`translate(${step.x}, 90)`}>
              <rect
                x="0"
                y="0"
                width="200"
                height="170"
                rx="16"
                fill="url(#skdNodeGrad)"
                stroke={step.active ? step.color : '#334155'}
                strokeWidth={step.active ? 2.5 : 1}
              />
              <rect x="0" y="0" width="200" height="34" rx="16" fill={step.active ? `${step.color}22` : 'transparent'} />
              <text x="14" y="22" fill={step.active ? '#F8FAFC' : '#64748B'} fontSize="11" fontWeight="bold">
                {step.title}
              </text>
              <text x="14" y="58" fill="#94A3B8" fontSize="10">{step.sub}</text>
              
              <rect x="14" y="70" width="172" height="24" rx="6" fill="#1E293B" />
              <text x="22" y="86" fill={step.active ? step.color : '#64748B'} fontSize="9" fontFamily="monospace">
                {step.tag}
              </text>

              {/* Визуальная иллюстрация внутри шага */}
              {idx === 0 && (
                <text x="14" y="125" fill="#38BDF8" fontSize="10" fontFamily="monospace">
                  ВЫБРАТЬ Номенклатура, Сумма ИЗ Продажи
                </text>
              )}
              {idx === 1 && (
                <text x="14" y="125" fill="#818CF8" fontSize="10">
                  Отбор: Город = "Барнаул"
                </text>
              )}
              {idx === 2 && (
                <text x="14" y="125" fill="#C084FC" fontSize="10" fontFamily="monospace">
                  ИТОГИ СУММА(Выручка)
                </text>
              )}
              {idx === 3 && (
                <text x="14" y="125" fill="#34D399" fontSize="10" fontWeight="bold">
                  ✓ ДокументРезультат готов
                </text>
              )}
            </g>
          ))}

          {/* Стрелки связи */}
          <line x1="250" y1="175" x2="285" y2="175" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="485" y1="175" x2="520" y2="175" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="720" y1="175" x2="755" y2="175" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />

          {/* Интерактивный предпросмотр результата внизу */}
          <g transform="translate(60, 300)">
            <rect x="0" y="0" width="880" height="230" rx="18" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            <rect x="0" y="0" width="880" height="40" rx="18" fill="#1E293B" />
            <text x="20" y="25" fill="#F8FAFC" fontSize="13" fontWeight="bold">
              Сформированный отчет «Анализ продаж и оказания услуг» (Режим «1С:Предприятие»)
            </text>

            {/* Таблица */}
            <g transform="translate(20, 55)">
              <rect x="0" y="0" width="480" height="26" fill="#1E1B4B" />
              <text x="12" y="17" fill="#C7D2FE" fontSize="10" fontWeight="bold">Услуга / Товар (Группировка)</text>
              <text x="260" y="17" fill="#C7D2FE" fontSize="10" fontWeight="bold">Количество</text>
              <text x="370" y="17" fill="#C7D2FE" fontSize="10" fontWeight="bold">Выручка, ₽</text>

              {/* Строка 1 */}
              <text x="12" y="45" fill="#F1F5F9" fontSize="10">📁 Услуги автосервиса</text>
              <text x="260" y="45" fill="#94A3B8" fontSize="10">48</text>
              <text x="370" y="45" fill="#34D399" fontSize="10" fontWeight="bold">216 000 ₽</text>

              {/* Строка 2 */}
              <text x="24" y="70" fill="#94A3B8" fontSize="10">↳ Замена моторного масла</text>
              <text x="260" y="70" fill="#94A3B8" fontSize="10">32</text>
              <text x="370" y="70" fill="#F1F5F9" fontSize="10">144 000 ₽</text>

              {/* Строка 3 */}
              <text x="24" y="95" fill="#94A3B8" fontSize="10">↳ Компьютерная диагностика</text>
              <text x="260" y="95" fill="#94A3B8" fontSize="10">16</text>
              <text x="370" y="95" fill="#F1F5F9" fontSize="10">72 000 ₽</text>

              {/* Итог */}
              <line x1="0" y1="110" x2="480" y2="110" stroke="#334155" />
              <text x="12" y="128" fill="#FCD34D" fontSize="11" fontWeight="bold">ИТОГО ПО ВСЕМ ОТДЕЛЕНИЯМ:</text>
              <text x="370" y="128" fill="#FCD34D" fontSize="11" fontWeight="bold">216 000 ₽</text>
            </g>

            {/* Визуальная диаграмма справа */}
            <g transform="translate(560, 55)">
              <text x="60" y="15" fill="#A5B4FC" fontSize="11" fontWeight="bold">Доля направлений в выручке</text>
              
              {/* Круговая диаграмма (SVG Path сегменты) */}
              <circle cx="140" cy="85" r="50" fill="none" stroke="#818CF8" strokeWidth="26" strokeDasharray="210 105" />
              <circle cx="140" cy="85" r="50" fill="none" stroke="#34D399" strokeWidth="26" strokeDasharray="104 210" strokeDashoffset="-210" />
              
              <text x="210" y="75" fill="#818CF8" fontSize="10">■ Услуги (67%)</text>
              <text x="210" y="95" fill="#34D399" fontSize="10">■ Запчасти (33%)</text>
            </g>
          </g>
        </svg>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800/90 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all"
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
                    ? 'bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 border border-purple-300'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          <span>Шаг конвейера: {phase} из 4</span>
          <span>{(frame / 30).toFixed(1)}с / 20.0с</span>
          <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-75"
              style={{ width: `${(frame / totalFrames) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
