import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Database, TrendingUp, TrendingDown, Layers, Calculator } from 'lucide-react';

export const RegisterAccumulationAnimation: React.FC = () => {
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
  // Фазы:
  // 1 (0-150): Поступление товаров (+Приход 50 шт по 100 руб)
  // 2 (150-300): Таблица движений регистра пополняется
  // 3 (300-450): Оказание услуги (-Расход 20 шт)
  // 4 (450-600): Автоматический пересчет итоговой таблицы итогов остатка = 30 шт мгновенно без сканирования истории
  const phase = f < 150 ? 1 : f < 300 ? 2 : f < 450 ? 3 : 4;

  const currentStock = phase < 3 ? (phase === 1 ? 0 : 50) : 30;

  return (
    <div className="my-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full text-teal-100">
            Лекция 6: Интерактивная архитектурная анимация
          </span>
          <h3 className="text-lg sm:text-xl font-black mt-1">
            Магия Таблицы Итогов Регистра Накопления: Мгновенные остатки
          </h3>
          <p className="text-xs text-teal-100 mt-0.5">
            Почему 1С не считает миллионы документов заново, а хранит агрегированные итоги на каждый месяц
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/20 text-xs font-bold text-center">
          {phase === 1 && '1. Документ «Приходная накладная»'}
          {phase === 2 && '2. Запись в таблицу движений (+Приход)'}
          {phase === 3 && '3. Документ «Оказание услуги» (-Расход)'}
          {phase === 4 && '4. Мгновенный остаток из таблицы итогов'}
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] max-h-[500px] bg-slate-950 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 1000 560" className="w-full h-full select-none font-sans">
          <defs>
            <linearGradient id="regGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#134E4A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Левый блок: Таблица Движений (Каждый документ пишет строку) */}
          <g transform="translate(60, 80)">
            <rect x="0" y="0" width="460" height="380" rx="18" fill="url(#regGrad2)" stroke="#14B8A6" strokeWidth="2" />
            <rect x="0" y="0" width="460" height="40" rx="18" fill="rgba(20,184,166,0.25)" />
            <text x="20" y="26" fill="#CCFBF1" fontSize="13" fontWeight="bold">
              📝 Физическая таблица движений: РегистрНакопления.ОстаткиМатериалов
            </text>

            <g transform="translate(16, 55)">
              <rect x="0" y="0" width="428" height="26" fill="#042F2E" />
              <text x="8" y="17" fill="#5EEAD4" fontSize="10" fontWeight="bold">Период</text>
              <text x="75" y="17" fill="#5EEAD4" fontSize="10" fontWeight="bold">Регистратор</text>
              <text x="180" y="17" fill="#5EEAD4" fontSize="10" fontWeight="bold">Вид</text>
              <text x="240" y="17" fill="#5EEAD4" fontSize="10" fontWeight="bold">Номенклатура</text>
              <text x="365" y="17" fill="#5EEAD4" fontSize="10" fontWeight="bold">Кол-во</text>

              {/* Запись 1: Приход */}
              {phase >= 2 && (
                <g transform="translate(0, 32)">
                  <rect x="0" y="0" width="428" height="34" rx="4" fill="#115E59" />
                  <text x="8" y="21" fill="#E2E8F0" fontSize="10" fontFamily="monospace">01.05 10:00</text>
                  <text x="75" y="21" fill="#99F6E4" fontSize="10">Поступление №1</text>
                  <text x="180" y="21" fill="#34D399" fontSize="11" fontWeight="bold">+ Приход</text>
                  <text x="240" y="21" fill="#FFFFFF" fontSize="10">Масло 5W40</text>
                  <text x="375" y="21" fill="#34D399" fontSize="11" fontWeight="bold">+50 л</text>
                </g>
              )}

              {/* Запись 2: Расход */}
              {phase >= 3 && (
                <g transform="translate(0, 72)">
                  <rect x="0" y="0" width="428" height="34" rx="4" fill="#134E4A" />
                  <text x="8" y="21" fill="#E2E8F0" fontSize="10" fontFamily="monospace">05.05 14:30</text>
                  <text x="75" y="21" fill="#99F6E4" fontSize="10">ОказаниеУслуги №1</text>
                  <text x="180" y="21" fill="#F87171" fontSize="11" fontWeight="bold">- Расход</text>
                  <text x="240" y="21" fill="#FFFFFF" fontSize="10">Масло 5W40</text>
                  <text x="375" y="21" fill="#F87171" fontSize="11" fontWeight="bold">-20 л</text>
                </g>
              )}

              {phase < 2 && (
                <text x="20" y="50" fill="#64748B" fontSize="11">Ожидание проведения документов...</text>
              )}

              <rect x="0" y="260" width="428" height="40" rx="8" fill="#042F2E" />
              <text x="14" y="285" fill="#5EEAD4" fontSize="11">
                Каждый документ просто дописывает строки (Insert Only, быстро!)
              </text>
            </g>
          </g>

          {/* Правый блок: Таблица Итогов (Умный кэш 1С) */}
          <g transform="translate(560, 80)">
            <rect x="0" y="0" width="380" height="380" rx="18" fill="#0A0F1D" stroke="#38BDF8" strokeWidth="2" />
            <rect x="0" y="0" width="380" height="40" rx="18" fill="rgba(56,189,248,0.2)" />
            <text x="20" y="26" fill="#BAE6FD" fontSize="13" fontWeight="bold">
              ⚡ Таблица Итогов (Автоматический срез)
            </text>

            <g transform="translate(20, 60)">
              <text x="0" y="20" fill="#94A3B8" fontSize="11">
                Хранит рассчитанные остатки на границах месяцев:
              </text>

              <rect x="0" y="38" width="340" height="130" rx="12" fill="#1E293B" stroke="#334155" />
              <text x="16" y="65" fill="#94A3B8" fontSize="11">Номенклатура: <tspan fill="#FFFFFF" fontWeight="bold">Масло 5W40</tspan></text>
              <text x="16" y="90" fill="#94A3B8" fontSize="11">Склад: <tspan fill="#FFFFFF" fontWeight="bold">Основной склад</tspan></text>
              
              <line x1="16" y1="105" x2="324" y2="105" stroke="#334155" />
              
              <text x="16" y="130" fill="#38BDF8" fontSize="12" fontWeight="bold">
                ТЕКУЩИЙ ОСТАТОК:
              </text>
              <text x="220" y="135" fill={currentStock > 0 ? '#34D399' : '#94A3B8'} fontSize="20" fontWeight="black">
                {currentStock} л
              </text>

              <g transform="translate(0, 190)">
                <rect x="0" y="0" width="340" height="85" rx="10" fill="#172554" stroke="#1E40AF" />
                <text x="14" y="24" fill="#93C5FD" fontSize="11" fontWeight="bold">
                  Запрос 1С: РегистрыНакопления.Остатки()
                </text>
                <text x="14" y="46" fill="#E2E8F0" fontSize="10">
                  Время выборки: <tspan fill="#34D399" fontWeight="bold">~0.001 секунды</tspan>
                </text>
                <text x="14" y="66" fill="#94A3B8" fontSize="9.5">
                  База не сканирует 1 000 000 документов прошлого!
                </text>
              </g>
            </g>
          </g>

          {/* Стрелка обновления итогов */}
          {phase >= 2 && (
            <g transform="translate(520, 240)">
              <circle cx="20" cy="0" r="16" fill="#38BDF8" />
              <text x="20" y="4" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="middle">➔</text>
            </g>
          )}

          {/* Текстовая подсказка */}
          <rect x="120" y="480" width="760" height="42" rx="10" fill="#1E293B" stroke="#334155" />
          <text x="500" y="506" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle">
            {phase === 1 && '1. Поступает товар от поставщика — создается документ «Поступление товаров».'}
            {phase === 2 && '2. Документ записывает строку движения (+Приход 50 л) в регистр.'}
            {phase === 3 && '3. Оказывается услуга — списывается 20 л (-Расход 20 л).'}
            {phase === 4 && '4. Платформа 1С мгновенно возвращает остаток 30 л из готовой таблицы итогов!'}
          </text>
        </svg>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800/90 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all"
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
                    ? 'bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-300 border border-teal-300'
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
              className="h-full bg-teal-600 transition-all duration-75"
              style={{ width: `${(frame / totalFrames) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
