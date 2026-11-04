import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';

export const DocPostingAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [frame, setFrame] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const animRef = useRef<number | null>(null);
  const totalFrames = 600; // 20 секунд при 30fps

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

  // Фазы проведения:
  // 0 - 150: Заполнение и валидация шапки/табличной части (клиент)
  // 150 - 300: Начало транзакции &НаСервере: проверка остатков по регистру
  // 300 - 450: Запись движений в Регистр Накопления (+ Приход / - Расход)
  // 450 - 600: Фиксация транзакции, документ зеленеет (Проведен), статус «Истина»
  const phase = f < 150 ? 1 : f < 300 ? 2 : f < 300 ? 2 : f < 450 ? 3 : 4;

  const docY = 160;
  const registerY = 380;

  // Движение пакета транзакции
  const packetProgress = f < 150 ? 0 : f < 300 ? (f - 150) / 150 : f < 450 ? (f - 300) / 150 : 1;

  return (
    <div className="my-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full text-emerald-100">
            Лекция 4: Интерактивная архитектурная анимация
          </span>
          <h3 className="text-lg sm:text-xl font-black mt-1">
            Анатомия проведения документа: Транзакция и Движения регистров
          </h3>
          <p className="text-xs text-emerald-100 mt-0.5">
            Как «Оказание услуги» проверяет остатки и одновременно меняет склад и кассу
          </p>
        </div>

        {/* Фаза бейдж */}
        <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/20 text-xs font-bold text-center">
          {phase === 1 && '1. Заполнение & Валидация'}
          {phase === 2 && '2. Старт транзакции & Контроль'}
          {phase === 3 && '3. Запись движений в регистры'}
          {phase === 4 && '4. Успех: Документ проведен!'}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[16/9] max-h-[500px] bg-slate-950 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 1000 560" className="w-full h-full select-none font-sans">
          <defs>
            <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="regGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Фон: сетка */}
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <rect width="1000" height="560" fill="url(#gridPattern)" />

          {/* 1. БЛОК ДОКУМЕНТА (Слева вверху) */}
          <g transform={`translate(100, ${docY})`}>
            {/* Тень */}
            <rect x="0" y="0" width="340" height="180" rx="16" fill="rgba(0,0,0,0.5)" />
            {/* Карточка */}
            <rect 
              x="0" 
              y="0" 
              width="340" 
              height="180" 
              rx="16" 
              fill="url(#docGrad)" 
              stroke={phase === 4 ? '#10B981' : '#38BDF8'} 
              strokeWidth={phase === 4 ? 3 : 2}
            />
            {/* Заголовок документа */}
            <rect x="0" y="0" width="340" height="38" rx="16" fill={phase === 4 ? 'rgba(16,185,129,0.2)' : 'rgba(56,189,248,0.15)'} />
            <text x="18" y="24" fill="#F8FAFC" fontSize="13" fontWeight="bold">
              Документ «Оказание услуги №001»
            </text>
            <circle cx="315" cy="20" r="7" fill={phase === 4 ? '#10B981' : '#F59E0B'} />

            {/* Содержимое документа */}
            <text x="18" y="65" fill="#94A3B8" fontSize="11">Клиент: <tspan fill="#F1F5F9" fontWeight="bold">ООO «Альфа-Сервис»</tspan></text>
            <text x="18" y="85" fill="#94A3B8" fontSize="11">Склад: <tspan fill="#F1F5F9" fontWeight="bold">Основной склад</tspan></text>
            <text x="18" y="105" fill="#94A3B8" fontSize="11">Услуга: <tspan fill="#38BDF8" fontWeight="bold">Замена масла и фильтра</tspan></text>
            <text x="18" y="125" fill="#94A3B8" fontSize="11">Сумма документа: <tspan fill="#FCD34D" fontWeight="bold">4 500.00 ₽</tspan></text>

            {/* Статус проведения в углу */}
            <rect x="18" y="142" width="160" height="24" rx="6" fill={phase === 4 ? '#065F46' : '#334155'} />
            <text x="26" y="158" fill={phase === 4 ? '#34D399' : '#94A3B8'} fontSize="11" fontWeight="bold">
              {phase === 4 ? '✓ Проведен = Истина' : '○ Черновик (Не проведен)'}
            </text>
          </g>

          {/* 2. ТРАНЗАКЦИОННЫЙ СЕРВЕРНЫЙ КОНТРОЛЛЕР (По центру) */}
          <g transform="translate(500, 150)">
            <rect x="-90" y="0" width="180" height="180" rx="20" fill="#0F172A" stroke="#818CF8" strokeWidth="2" />
            <text x="0" y="28" fill="#C7D2FE" fontSize="12" fontWeight="bold" textAnchor="middle">
              Транзакция 1С
            </text>
            <text x="0" y="44" fill="#6366F1" fontSize="10" textAnchor="middle">
              ОбработкаПроведения()
            </text>

            {/* Иконка шестерни / ядра */}
            <circle cx="0" cy="85" r="28" fill="#1E1B4B" stroke="#A5B4FC" strokeWidth="2" strokeDasharray="6 3" />
            <text x="0" y="90" fill="#A5B4FC" fontSize="10" fontWeight="bold" textAnchor="middle">
              {phase === 2 ? 'КОНТРОЛЬ' : phase === 3 ? 'ЗАПИСЬ' : 'READY'}
            </text>

            <rect x="-75" y="125" width="150" height="22" rx="6" fill="#1E293B" />
            <text x="0" y="140" fill={phase >= 2 ? '#34D399' : '#94A3B8'} fontSize="9.5" textAnchor="middle">
              Блокировка остатков
            </text>

            <rect x="-75" y="150" width="150" height="22" rx="6" fill="#1E293B" />
            <text x="0" y="165" fill={phase >= 3 ? '#38BDF8' : '#64748B'} fontSize="9.5" textAnchor="middle">
              Атомарность ACID
            </text>
          </g>

          {/* 3. РЕГИСТР НАКОПЛЕНИЯ «ОСТАТКИ МАТЕРИАЛОВ» (Внизу справа) */}
          <g transform={`translate(670, ${registerY})`}>
            <rect x="0" y="0" width="280" height="150" rx="14" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
            <rect x="0" y="0" width="280" height="32" rx="14" fill="#047857" />
            <text x="16" y="21" fill="#ECFDF5" fontSize="12" fontWeight="bold">
              РегистрНакопления: Остатки
            </text>

            {/* Строки регистра */}
            <rect x="12" y="42" width="256" height="30" rx="6" fill="#065F46" />
            <text x="20" y="58" fill="#D1FAE5" fontSize="10">Масло моторное 5W40</text>
            <text x="210" y="58" fill={phase >= 3 ? '#F87171' : '#34D399'} fontSize="11" fontWeight="bold">
              {phase >= 3 ? '-4 л (Расход)' : '120 л в наличии'}
            </text>

            <rect x="12" y="78" width="256" height="30" rx="6" fill="#065F46" />
            <text x="20" y="94" fill="#D1FAE5" fontSize="10">Фильтр масляный W712</text>
            <text x="210" y="94" fill={phase >= 3 ? '#F87171' : '#34D399'} fontSize="11" fontWeight="bold">
              {phase >= 3 ? '-1 шт (Расход)' : '15 шт в наличии'}
            </text>

            {/* Итог после проведения */}
            <text x="16" y="132" fill="#A7F3D0" fontSize="10">
              {phase >= 3 ? '✓ Движения сформированы и зафиксированы' : 'Ожидание фиксации движений...'}
            </text>
          </g>

          {/* 4. РЕГИСТР НАКОПЛЕНИЯ «ПРОДАЖИ / ВЫРУЧКА» (Внизу слева) */}
          <g transform={`translate(100, ${registerY})`}>
            <rect x="0" y="0" width="280" height="150" rx="14" fill="#1E1B4B" stroke="#818CF8" strokeWidth="2" />
            <rect x="0" y="0" width="280" height="32" rx="14" fill="#312E81" />
            <text x="16" y="21" fill="#EEF2FF" fontSize="12" fontWeight="bold">
              РегистрНакопления: Продажи
            </text>

            <rect x="12" y="42" width="256" height="30" rx="6" fill="#2E1065" />
            <text x="20" y="58" fill="#E0E7FF" fontSize="10">Клиент: ООО «Альфа-Сервис»</text>
            <text x="205" y="58" fill="#FDE047" fontSize="11" fontWeight="bold">
              {phase >= 3 ? '+4 500 ₽' : '0.00 ₽'}
            </text>

            <rect x="12" y="78" width="256" height="30" rx="6" fill="#2E1065" />
            <text x="20" y="94" fill="#E0E7FF" fontSize="10">Себестоимость услуги</text>
            <text x="205" y="94" fill="#93C5FD" fontSize="11" fontWeight="bold">
              {phase >= 3 ? '+1 800 ₽' : '0.00 ₽'}
            </text>

            <text x="16" y="132" fill="#C7D2FE" fontSize="10">
              {phase >= 3 ? '✓ Прибыль: +2 700 ₽ зафиксирована' : 'Ожидание записи выручки...'}
            </text>
          </g>

          {/* СТРЕЛКИ И ЛЕТАЮЩИЕ ПАКЕТЫ */}
          {/* От документа к транзакции */}
          <line x1="440" y1="240" x2="500" y2="240" stroke="#38BDF8" strokeWidth="3" strokeDasharray="5 5" />
          {/* От транзакции к регистрам */}
          <path d="M 500 330 L 240 380" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M 590 330 L 810 380" fill="none" stroke="#34D399" strokeWidth="2.5" strokeDasharray="4 4" />

          {/* Летающий световой пакет */}
          {phase >= 2 && phase <= 3 && (
            <circle 
              cx={440 + (500 - 440) * packetProgress} 
              cy={240} 
              r="8" 
              fill="#FDE047" 
              filter="url(#neonGlow)" 
            />
          )}

          {phase === 3 && (
            <>
              <circle 
                cx={500 + (240 - 500) * ((f - 300) / 150)} 
                cy={330 + (380 - 330) * ((f - 300) / 150)} 
                r="7" 
                fill="#818CF8" 
                filter="url(#neonGlow)" 
              />
              <circle 
                cx={590 + (810 - 590) * ((f - 300) / 150)} 
                cy={330 + (380 - 330) * ((f - 300) / 150)} 
                r="7" 
                fill="#34D399" 
                filter="url(#neonGlow)" 
              />
            </>
          )}

          {/* Информационный баннер внизу */}
          <rect x="180" y="20" width="640" height="34" rx="10" fill="rgba(30,41,59,0.9)" stroke="#475569" />
          <text x="500" y="42" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle">
            {phase === 1 && '📝 Студент нажимает «Провести и закрыть». Документ проверяет заполненность реквизитов.'}
            {phase === 2 && '⚡ Сервер 1С открывает транзакцию: блокирует строки регистра, проверяет наличие остатков.'}
            {phase === 3 && '🔥 Формируются движения: списание материалов со склада и начисление выручки компании.'}
            {phase === 4 && '🎉 Транзакция успешно зафиксирована (Commit). Остатки списаны, документ стал зеленым!'}
          </text>
        </svg>
      </div>

      {/* ПАНЕЛЬ УПРАВЛЕНИЯ ПЛЕЕРОМ */}
      <div className="bg-slate-100 dark:bg-slate-800/90 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all"
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
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          <span>Фаза {phase} из 4</span>
          <span>{(frame / 30).toFixed(1)}с / 20.0с</span>
          <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-75"
              style={{ width: `${(frame / totalFrames) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
