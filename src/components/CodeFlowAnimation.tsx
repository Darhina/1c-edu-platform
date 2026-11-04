import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Monitor, Server, Cpu, Database, Network } from 'lucide-react';

export const CodeFlowAnimation: React.FC = () => {
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
  // Фазы контекстного вызова:
  // 1 (0-150): &НаКлиенте: нажатие кнопки формы, чтение реквизитов интерфейса
  // 2 (150-300): Контекстный серверный вызов: передача всей формы через сеть на сервер
  // 3 (300-450): &НаСервере: выполнение запроса к СУБД, получение данных
  // 4 (450-600): Возврат результата в форму клиента, обновление UI
  const phase = f < 150 ? 1 : f < 300 ? 2 : f < 450 ? 3 : 4;

  return (
    <div className="my-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full text-blue-100">
            Лекция 3: Интерактивная архитектурная анимация
          </span>
          <h3 className="text-lg sm:text-xl font-black mt-1">
            Контекст исполнения кода: &НаКлиенте vs &НаСервере
          </h3>
          <p className="text-xs text-blue-100 mt-0.5">
            Как директивы компиляции управляют передачей данных между браузером и сервером 1С
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/20 text-xs font-bold text-center">
          {phase === 1 && '1. &НаКлиенте: Клик по кнопке'}
          {phase === 2 && '2. Сетевой контекстный вызов'}
          {phase === 3 && '3. &НаСервере: Запрос к СУБД'}
          {phase === 4 && '4. Возврат структуры в UI'}
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] max-h-[500px] bg-slate-950 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 1000 560" className="w-full h-full select-none font-sans">
          <defs>
            <linearGradient id="clientGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="servGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Левая зона: КЛИЕНТ */}
          <g transform="translate(60, 80)">
            <rect 
              x="0" 
              y="0" 
              width="380" 
              height="380" 
              rx="20" 
              fill="url(#clientGrad)" 
              stroke={phase === 1 || phase === 4 ? '#60A5FA' : '#334155'} 
              strokeWidth={phase === 1 || phase === 4 ? 3 : 1}
            />
            <rect x="0" y="0" width="380" height="42" rx="20" fill="rgba(37,99,235,0.25)" />
            <text x="24" y="27" fill="#BFDBFE" fontSize="14" fontWeight="bold">
              💻 КЛИЕНТСКИЙ СЕАНС (&НаКлиенте)
            </text>

            <g transform="translate(24, 60)">
              <rect x="0" y="0" width="332" height="110" rx="12" fill="#1E293B" stroke="#475569" />
              <text x="14" y="24" fill="#94A3B8" fontSize="11" fontWeight="bold">Форма документа «Счет на оплату»</text>
              <rect x="14" y="38" width="140" height="24" rx="6" fill="#334155" />
              <text x="22" y="54" fill="#F8FAFC" fontSize="10">Клиент: ООО Альфа</text>
              
              <rect 
                x="14" 
                y="70" 
                width="140" 
                height="28" 
                rx="6" 
                fill={phase === 1 ? '#3B82F6' : '#2563EB'} 
                className="cursor-pointer"
              />
              <text x="32" y="88" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                ▶ РассчитатьИтоги()
              </text>
            </g>

            {/* Код модуля формы */}
            <g transform="translate(24, 190)">
              <rect x="0" y="0" width="332" height="160" rx="12" fill="#0A0F1D" stroke="#1E293B" />
              <text x="14" y="24" fill="#60A5FA" fontSize="11" fontFamily="monospace" fontWeight="bold">&НаКлиенте</text>
              <text x="14" y="44" fill="#E2E8F0" fontSize="10" fontFamily="monospace">Процедура РассчитатьИтоги(Команда)</text>
              <text x="30" y="66" fill="#93C5FD" fontSize="10" fontFamily="monospace">// 1. Вызов сервера</text>
              <text x="30" y="86" fill={phase >= 2 ? '#FCD34D' : '#64748B'} fontSize="10" fontFamily="monospace" fontWeight="bold">
                Итог = ПосчитатьНаСервере(Объект);
              </text>
              <text x="30" y="108" fill="#E2E8F0" fontSize="10" fontFamily="monospace">ЭтаФорма.Всего = Итог;</text>
              <text x="14" y="130" fill="#E2E8F0" fontSize="10" fontFamily="monospace">КонецПроцедуры</text>
            </g>
          </g>

          {/* Правая зона: СЕРВЕР 1С */}
          <g transform="translate(560, 80)">
            <rect 
              x="0" 
              y="0" 
              width="380" 
              height="380" 
              rx="20" 
              fill="url(#servGrad)" 
              stroke={phase === 3 ? '#F59E0B' : '#334155'} 
              strokeWidth={phase === 3 ? 3 : 1}
            />
            <rect x="0" y="0" width="380" height="42" rx="20" fill="rgba(245,158,11,0.25)" />
            <text x="24" y="27" fill="#FDE68A" fontSize="14" fontWeight="bold">
              ⚡ КЛАСТЕР СЕРВЕРОВ (&НаСервере)
            </text>

            <g transform="translate(24, 60)">
              <rect x="0" y="0" width="332" height="110" rx="12" fill="#1E293B" stroke="#475569" />
              <text x="14" y="24" fill="#FCD34D" fontSize="11" fontWeight="bold">Прямой доступ к СУБД PostgreSQL</text>
              <text x="14" y="46" fill="#A7F3D0" fontSize="10">✓ Запросы (ВЫБРАТЬ ... ИЗ ...)</text>
              <text x="14" y="66" fill="#A7F3D0" fontSize="10">✓ Блокировки транзакций</text>
              <text x="14" y="86" fill="#F87171" fontSize="10">✕ Нет прямого доступа к экрану!</text>
            </g>

            <g transform="translate(24, 190)">
              <rect x="0" y="0" width="332" height="160" rx="12" fill="#0A0F1D" stroke="#1E293B" />
              <text x="14" y="24" fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold">&НаСервереБезКонтекста</text>
              <text x="14" y="44" fill="#E2E8F0" fontSize="10" fontFamily="monospace">Функция ПосчитатьНаСервере(Данные)</text>
              <text x="30" y="66" fill="#A7F3D0" fontSize="10" fontFamily="monospace">Запрос = Новый Запрос;</text>
              <text x="30" y="86" fill="#A7F3D0" fontSize="10" fontFamily="monospace">Запрос.Текст = "ВЫБРАТЬ...";</text>
              <text x="30" y="108" fill={phase === 3 ? '#34D399' : '#94A3B8'} fontSize="10" fontFamily="monospace" fontWeight="bold">
                Возврат Запрос.Выполнить()...;
              </text>
              <text x="14" y="130" fill="#E2E8F0" fontSize="10" fontFamily="monospace">КонецФункции</text>
            </g>
          </g>

          {/* Канал связи посередине */}
          <line x1="440" y1="270" x2="560" y2="270" stroke="#64748B" strokeWidth="4" strokeDasharray="6 6" />

          {/* Летающий сетевой пакет (туда-обратно) */}
          {phase === 2 && (
            <g transform={`translate(${440 + (120 * ((f - 150) / 150))}, 270)`}>
              <circle cx="0" cy="0" r="14" fill="#3B82F6" />
              <text x="0" y="4" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">RPC</text>
            </g>
          )}

          {phase === 4 && (
            <g transform={`translate(${560 - (120 * ((f - 450) / 150))}, 270)`}>
              <circle cx="0" cy="0" r="14" fill="#10B981" />
              <text x="0" y="4" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">DATA</text>
            </g>
          )}

          {/* Текстовая подсказка внизу */}
          <rect x="150" y="480" width="700" height="40" rx="10" fill="#1E293B" stroke="#334155" />
          <text x="500" y="505" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle">
            {phase === 1 && '1. Пользователь взаимодействует с формой в Тонком клиенте (&НаКлиенте).'}
            {phase === 2 && '2. Платформа 1С запаковывает вызов и через сеть отправляет на Сервер.'}
            {phase === 3 && '3. Сервер 1С исполняет тяжелый SQL-запрос к СУБД на максимальной скорости.'}
            {phase === 4 && '4. Сервер возвращает только легкий результат расчета обратно на форму клиента.'}
          </text>
        </svg>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800/90 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
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
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 border border-blue-300'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          <span>Этап: {phase} из 4</span>
          <span>{(frame / 30).toFixed(1)}с / 20.0с</span>
          <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-75"
              style={{ width: `${(frame / totalFrames) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
