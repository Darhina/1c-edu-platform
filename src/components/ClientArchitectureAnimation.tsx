import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Maximize2, Minimize2, Cpu, Zap, HardDrive } from 'lucide-react';

const COLORS = {
  bg: '#FFFDF9',
  card: '#FFFFFF',
  cardLight: '#F1F5F9',
  ink: '#1E293B',
  muted: '#64748B',
  yellow: '#FFD23F',
  yellowDark: '#E5B820',
  orange: '#FF7A00',
  red: '#EF4444',
  redGlow: 'rgba(239, 68, 68, 0.25)',
  redSoft: '#FEE2E2',
  blue: '#3B82F6',
  blueGlow: 'rgba(59, 130, 246, 0.25)',
  blueSoft: '#DBEAFE',
  green: '#10B981',
  greenSoft: '#D1FAE5',
  purple: '#8B5CF6',
  purpleSoft: '#EDE9FE',
  serverDark: '#1E1B4B',
  border: '#E2E8F0',
};

const interpolate = (
  val: number,
  inRange: [number, number],
  outRange: [number, number]
): number => {
  const [inMin, inMax] = inRange;
  const [outMin, outMax] = outRange;
  if (inMax === inMin) return outMin;
  const clamped = Math.max(inMin, Math.min(inMax, val));
  const t = (clamped - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
};

// ============================================================================
// ПЕРСОНАЖ: БОГАТЫРЬ-ТЯЖЕЛОВЕС «ТОЛСТЫЙ КЛИЕНТ»
// ============================================================================
const HeavyHero = ({ frame, x, y }: { frame: number; x: number; y: number }) => {
  const breath = Math.sin(frame / 10) * 5;
  const shake = Math.sin(frame * 1.5) * 2; // дрожит от тяжести

  return (
    <g transform={`translate(${x}, ${y + breath})`}>
      {/* Тень */}
      <ellipse cx={0} cy={160} rx={90} ry={16} fill="rgba(0,0,0,0.10)" />

      {/* ОГРОМНАЯ ШТАНГА / ГРУЗ ДАННЫХ НАД ГОЛОВОЙ */}
      <g transform={`translate(${shake}, -140)`}>
        {/* Гриф */}
        <line x1={-160} y1={0} x2={160} y2={0} stroke="#94A3B8" strokeWidth={12} strokeLinecap="round" />

        {/* Левые диски штанги (База данных) */}
        <rect x={-150} y={-45} width={30} height={90} rx={8} fill={COLORS.red} stroke="#FFF" strokeWidth={3} />
        <rect x={-115} y={-35} width={25} height={70} rx={6} fill="#DC2626" stroke="#FFF" strokeWidth={2} />
        <text x={-135} y={5} fontSize={14} fontWeight={900} fill="#FFF" textAnchor="middle" transform="rotate(-90 -135 5)">
          100 ГБ
        </text>

        {/* Правые диски штанги (Вся логика программы) */}
        <rect x={120} y={-45} width={30} height={90} rx={8} fill={COLORS.red} stroke="#FFF" strokeWidth={3} />
        <rect x={90} y={-35} width={25} height={70} rx={6} fill="#DC2626" stroke="#FFF" strokeWidth={2} />
        <text x={135} y={5} fontSize={14} fontWeight={900} fill="#FFF" textAnchor="middle" transform="rotate(90 135 5)">
          ОТЧЁТЫ
        </text>

        {/* Надпись по центру грифа */}
        <rect x={-55} y={-16} width={110} height={32} rx={8} fill="#FFFFFF" stroke={COLORS.red} strokeWidth={2} />
        <text x={0} y={6} textAnchor="middle" fontSize={15} fontWeight={900} fill={COLORS.red}>
          ВСЯ ЛОГИКА
        </text>
      </g>

      {/* Мощные руки, поднимающие штангу */}
      <path
        d="M -60 20 L -80 -70 L -100 -130"
        stroke={COLORS.yellowDark}
        strokeWidth={18}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 60 20 L 80 -70 L 100 -130"
        stroke={COLORS.yellowDark}
        strokeWidth={18}
        strokeLinecap="round"
        fill="none"
      />

      {/* Большое круглое богатырское тело */}
      <ellipse cx={0} cy={60} rx={80} ry={70} fill={COLORS.yellow} stroke={COLORS.ink} strokeWidth={6} />
      {/* Красный богатырский пояс */}
      <rect x={-75} y={70} width={150} height={28} rx={6} fill={COLORS.red} stroke="#FFF" strokeWidth={2} />
      <circle cx={0} cy={84} r={18} fill={COLORS.yellow} stroke="#FFF" strokeWidth={3} />
      <text x={0} y={90} textAnchor="middle" fontSize={14} fontWeight={900} fill={COLORS.ink}>
        1С
      </text>

      {/* Ноги-тумбы в ботинках */}
      <rect x={-55} y={120} width={36} height={35} rx={10} fill={COLORS.red} stroke={COLORS.ink} strokeWidth={4} />
      <rect x={19} y={120} width={36} height={35} rx={10} fill={COLORS.red} stroke={COLORS.ink} strokeWidth={4} />

      {/* Голова богатыря */}
      <circle cx={0} cy={-25} r={46} fill={COLORS.yellow} stroke={COLORS.ink} strokeWidth={5} />

      {/* Спортивная повязка на лбу */}
      <rect x={-46} y={-50} width={92} height={16} rx={8} fill={COLORS.red} />

      {/* Напряжённое лицо с прищуром и каплями пота */}
      <ellipse cx={-18} cy={-22} rx={6} ry={4} fill={COLORS.ink} />
      <ellipse cx={18} cy={-22} rx={6} ry={4} fill={COLORS.ink} />
      {/* Насупленные брови */}
      <line x1={-30} y1={-36} x2={-8} y2={-28} stroke={COLORS.ink} strokeWidth={5} strokeLinecap="round" />
      <line x1={30} y1={-36} x2={8} y2={-28} stroke={COLORS.ink} strokeWidth={5} strokeLinecap="round" />
      {/* Открытый рот с зубами «Ы-ы-ых!» */}
      <rect x={-18} y={-8} width={36} height={14} rx={6} fill="#7F1D1D" stroke={COLORS.ink} strokeWidth={2} />
      <line x1={-14} y1={-1} x2={14} y2={-1} stroke="#FFF" strokeWidth={4} strokeLinecap="round" />

      {/* Капли пота летят в стороны */}
      <circle cx={-52} cy={-25 + ((frame * 4) % 30)} r={5} fill="#60A5FA" />
      <circle cx={54} cy={-35 + ((frame * 3) % 30)} r={6} fill="#60A5FA" />
    </g>
  );
};

// ============================================================================
// ПЕРСОНАЖ: ЛОВКИЙ СПРИНТЕР «ТОНКИЙ КЛИЕНТ»
// ============================================================================
const AgileHero = ({ frame, x, y }: { frame: number; x: number; y: number }) => {
  const jump = Math.abs(Math.sin(frame / 6)) * 25;

  return (
    <g transform={`translate(${x}, ${y - jump})`}>
      {/* Тень меняется от высоты прыжка */}
      <ellipse
        cx={0}
        cy={160 + jump}
        rx={interpolate(jump, [0, 25], [75, 45])}
        ry={interpolate(jump, [0, 25], [14, 8])}
        fill="rgba(59, 130, 246, 0.18)"
      />

      {/* Светящийся ховерборд / скейт под ногами */}
      <g transform="translate(0, 130)">
        <ellipse cx={0} cy={0} rx={75} ry={14} fill="#BFDBFE" stroke={COLORS.blue} strokeWidth={4} />
        <ellipse cx={0} cy={-2} rx={60} ry={8} fill={COLORS.blue} />
        {/* Турбо-струи */}
        <circle cx={-40} cy={14} r={8} fill={COLORS.yellow} />
        <circle cx={40} cy={14} r={8} fill={COLORS.yellow} />
      </g>

      {/* Стройное тело в супергеройском киберкостюме */}
      <rect x={-26} y={20} width={52} height={85} rx={22} fill={COLORS.blue} stroke={COLORS.ink} strokeWidth={4} />
      <path d="M 0 35 L -14 65 L 0 65 L -4 85 L 14 55 L 0 55 Z" fill={COLORS.yellow} />

      {/* Ноги в динамичной позе сёрфера */}
      <line x1={-15} y1={95} x2={-30} y2={125} stroke={COLORS.ink} strokeWidth={8} strokeLinecap="round" />
      <line x1={15} y1={95} x2={30} y2={125} stroke={COLORS.ink} strokeWidth={8} strokeLinecap="round" />

      {/* Голова в футуристичном шлеме */}
      <circle cx={0} cy={-20} r={42} fill={COLORS.yellow} stroke={COLORS.ink} strokeWidth={4} />
      {/* Кибер-визор с бегущей волной данных */}
      <rect x={-32} y={-30} width={64} height={20} rx={10} fill={COLORS.ink} stroke={COLORS.blue} strokeWidth={3} />
      <circle cx={-12} cy={-20} r={5} fill={COLORS.green} />
      <circle cx={12} cy={-20} r={5} fill={COLORS.green} />

      {/* Веселая улыбка */}
      <path d="M -12 -2 Q 0 10 12 -2" stroke={COLORS.ink} strokeWidth={4} fill="none" strokeLinecap="round" />

      {/* В одной руке супер-пульт/смартфон */}
      <g transform="translate(42, 10) rotate(-15)">
        <rect x={0} y={0} width={34} height={50} rx={8} fill={COLORS.ink} stroke={COLORS.green} strokeWidth={3} />
        <rect x={4} y={5} width={26} height={34} rx={4} fill={COLORS.greenSoft} />
        <circle cx={17} cy={44} r={3} fill="#FFF" />
        {/* Антенна с сигналом */}
        <line x1={17} y1={0} x2={17} y2={-15} stroke={COLORS.green} strokeWidth={3} />
        <circle cx={17} cy={-16} r={4} fill={COLORS.green} />
      </g>

      {/* Другая рука показывает жест класс 👍 */}
      <path d="M -26 40 Q -55 25 -50 -5" stroke={COLORS.yellowDark} strokeWidth={12} strokeLinecap="round" fill="none" />
      <circle cx={-50} cy={-8} r={10} fill={COLORS.yellowDark} />
    </g>
  );
};

// ============================================================================
// ГИГАНТСКИЙ СУПЕРКОМПЬЮТЕР (ЦОД СЕРВЕР)
// ============================================================================
const MegaServer = ({ x, y, frame }: { x: number; y: number; frame: number }) => {
  const gearRot = (frame * 4) % 360;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Корпус стойки */}
      <rect
        x={-85}
        y={-140}
        width={170}
        height={280}
        rx={16}
        fill={COLORS.serverDark}
        stroke={COLORS.purple}
        strokeWidth={4}
      />
      {/* Голографический шар мощности */}
      <circle cx={0} cy={-70} r={36} fill="rgba(139, 92, 246, 0.25)" stroke={COLORS.purple} strokeWidth={3} />
      <circle cx={0} cy={-70} r={18} fill={COLORS.purple} />
      <text x={0} y={-64} textAnchor="middle" fontSize={13} fontWeight={900} fill="#FFF">
        ЦПУ
      </text>

      {/* Крутящаяся шестерёнка логики */}
      <g transform={`translate(0, -18) rotate(${gearRot})`}>
        <circle cx={0} cy={0} r={14} fill="#4338CA" stroke="#818CF8" strokeWidth={3} />
        <rect x={-3} y={-19} width={6} height={38} fill="#818CF8" />
        <rect x={-19} y={-3} width={38} height={6} fill="#818CF8" />
        <circle cx={0} cy={0} r={5} fill={COLORS.yellow} />
      </g>

      {/* Полки серверов с зелеными огоньками */}
      {[30, 70, 110].map((posY, i) => (
        <g key={i} transform={`translate(-70, ${posY})`}>
          <rect width={140} height={26} rx={6} fill="#312E81" stroke="#4338CA" strokeWidth={2} />
          <circle cx={20} cy={13} r={5} fill={frame % (10 + i * 5) > 5 ? COLORS.green : '#064E3B'} />
          <circle cx={40} cy={13} r={5} fill={frame % 8 > 4 ? COLORS.yellow : '#78350F'} />
          <line x1={65} y1={13} x2={125} y2={13} stroke="#38BDF8" strokeWidth={4} strokeDasharray="6 4" />
        </g>
      ))}

      {/* Табличка */}
      <rect x={-70} y={114} width={140} height={18} rx={4} fill={COLORS.purple} />
      <text x={0} y={127} textAnchor="middle" fontSize={11} fontWeight={900} fill="#FFF">
        КЛАСТЕР 1С 64-BIT
      </text>
    </g>
  );
};

// ============================================================================
// ЛЕТЯЩИЕ ПАКЕТЫ ДАННЫХ (КБ и МБ)
// ============================================================================
const FlyingPackets = ({ frame }: { frame: number }) => {
  // Толстый клиент <-> сервер: тяжёлые пакеты МБ
  const thickTraffic = Array.from({ length: 4 }).map((_, i) => {
    const t = ((frame / 90 + i / 4) % 1);
    const fromServer = t < 0.5;
    const tt = fromServer ? t / 0.5 : (1 - t) / 0.5;
    const x = interpolate(tt, [0, 1], [300, 960]);
    const y = 560 + Math.sin(tt * Math.PI) * -60 + (i % 2 === 0 ? 12 : -12);
    return { x, y, key: `mb-${i}` };
  });

  // Тонкий клиент <-> сервер: лёгкие пакеты КБ
  const thinTraffic = Array.from({ length: 12 }).map((_, i) => {
    const t = ((frame / 55 + i / 12) % 1);
    const fromServer = t < 0.5;
    const tt = fromServer ? t / 0.5 : (1 - t) / 0.5;
    const x = interpolate(tt, [0, 1], [960, 1650]);
    const y = 560 + Math.sin(tt * Math.PI) * -70 + ((i % 3) - 1) * 14;
    return { x, y, key: `kb-${i}`, fromServer };
  });

  return (
    <g>
      {/* Трассы */}
      <path d="M 300 560 Q 630 500 960 560" fill="none" stroke={COLORS.red} strokeWidth={4} strokeDasharray="12 8" opacity={0.5} />
      <path d="M 960 560 Q 1300 500 1650 560" fill="none" stroke={COLORS.blue} strokeWidth={4} strokeDasharray="8 6" opacity={0.6} />

      {/* Тяжёлые МБ (к толстому клиенту) */}
      {thickTraffic.map((p) => (
        <g key={p.key} transform={`translate(${p.x}, ${p.y})`}>
          <rect x={-22} y={-16} width={44} height={32} rx={6} fill={COLORS.red} stroke={COLORS.ink} strokeWidth={2.5} />
          <text x={0} y={5} textAnchor="middle" fontSize={13} fontWeight={900} fill="#FFF">
            МБ
          </text>
        </g>
      ))}

      {/* Лёгкие КБ (к тонкому клиенту) */}
      {thinTraffic.map((p) => (
        <circle key={p.key} cx={p.x} cy={p.y} r={11} fill={COLORS.blue} stroke="#FFF" strokeWidth={2.5} />
      ))}
      {thinTraffic.map((p) => (
        <text
          key={p.key + '-label'}
          x={p.x}
          y={p.y + 4}
          textAnchor="middle"
          fontSize={9}
          fontWeight={900}
          fill="#FFF"
        >
          КБ
        </text>
      ))}
    </g>
  );
};

export const ClientArchitectureAnimation: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();
    const fps = 30 * speed;
    const interval = 1000 / fps;

    const loop = (now: number) => {
      const delta = now - lastTime;
      if (delta >= interval) {
        setFrame((prev) => (prev + 1) % 900); // 30 секундный цикл (900 кадров)
        lastTime = now - (delta % interval);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, speed]);

  const handleReset = () => {
    setFrame(0);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      ref={containerRef}
      className={`my-8 rounded-3xl border-2 border-amber-400/80 bg-white dark:bg-slate-900 shadow-xl overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 overflow-auto bg-white dark:bg-slate-900 flex flex-col justify-between' : ''
      }`}
    >
      {/* Top Banner with Badges and Controls */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-blue-500/15 border-b border-amber-300/40 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#FFCC00] text-[#B91C1C] flex items-center justify-center font-black text-xs shadow-sm">
            1С
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Битва Архитектур: Толстый vs Тонкий клиент
              </h4>
              <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                VidTSX • Анимация как код
              </span>
            </div>
          </div>
        </div>

        {/* Educational badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-purple-300 dark:border-purple-800 shadow-sm text-xs">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[11px] text-slate-600 dark:text-slate-300">
              Архитектурный интерактивный симулятор
            </span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title={isFullscreen ? 'Свернуть' : 'Во весь экран'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Canvas / SVG Interactive Visual Scene */}
      <div className="relative w-full aspect-[16/9] max-h-[640px] bg-[#FFFDF9] dark:bg-slate-950 select-none overflow-hidden">
        
        {/* SVG ViewBox 1920x1080 containing the full animated artwork */}
        <svg
          viewBox="0 0 1920 1080"
          className="w-full h-full block"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Header text inside SVG */}
          <g transform="translate(64, 75)">
            <rect x="0" y="-32" width="230" height="36" rx="18" fill="rgba(255, 210, 63, 0.3)" stroke={COLORS.yellowDark} strokeWidth="2" />
            <text x="115" y="-8" textAnchor="middle" fontSize="16" fontWeight="900" fill="#92400E">
              ⚡ 1С: ПРЕДПРИЯТИЕ 8.3
            </text>
            <text x="0" y="38" fontSize="42" fontWeight="900" fill={COLORS.ink} letterSpacing="-1">
              Битва Архитектур: <tspan fill={COLORS.red}>Толстый</tspan> против <tspan fill={COLORS.blue}>Тонкого</tspan> клиента
            </text>
          </g>

          {/* Flying Packets (Network data packets) */}
          <FlyingPackets frame={frame} />

          {/* ========================================================= */}
          {/* 1. LEFT CARD: ТОЛСТЫЙ КЛИЕНТ                              */}
          {/* ========================================================= */}
          <g transform="translate(64, 160)">
            {/* Card Background */}
            <rect
              x="0"
              y="0"
              width="540"
              height="750"
              rx="28"
              fill={COLORS.card}
              stroke={COLORS.red}
              strokeWidth="4"
              filter="drop-shadow(0 16px 24px rgba(239, 68, 68, 0.15))"
            />

            {/* Header */}
            <text x="32" y="55" fontSize="26" fontWeight="900" fill={COLORS.red}>
              🏋️ ТОЛСТЫЙ КЛИЕНТ
            </text>
            <rect x="360" y="28" width="148" height="34" rx="8" fill={COLORS.redSoft} />
            <text x="434" y="51" textAnchor="middle" fontSize="14" fontWeight="800" fill={COLORS.red}>
              Сам себе сервер
            </text>

            {/* Character */}
            <g transform="translate(270, 310)">
              <HeavyHero frame={frame} x={0} y={0} />
            </g>

            {/* Metrics */}
            <g transform="translate(32, 490)">
              <text x="0" y="0" fontSize="16" fontWeight="700" fill={COLORS.ink}>
                Нагрузка на твой компьютер:
              </text>
              <text x="476" y="0" textAnchor="end" fontSize="16" fontWeight="900" fill={COLORS.red}>
                95% (Греется!)
              </text>
              <rect x="0" y="10" width="476" height="12" rx="6" fill="#E2E8F0" />
              <rect x="0" y="10" width="452" height="12" rx="6" fill={COLORS.red} />

              <text x="0" y="55" fontSize="16" fontWeight="700" fill={COLORS.ink}>
                Передача данных по сети:
              </text>
              <text x="476" y="55" textAnchor="end" fontSize="16" fontWeight="900" fill={COLORS.red}>
                Огромная (мегабайты)
              </text>
              <rect x="0" y="65" width="476" height="12" rx="6" fill="#E2E8F0" />
              <rect x="0" y="65" width="428" height="12" rx="6" fill={COLORS.orange} />
            </g>

            {/* Explanation Note */}
            <g transform="translate(32, 630)">
              <rect x="0" y="0" width="476" height="85" rx="10" fill={COLORS.redSoft} />
              <rect x="0" y="0" width="8" height="85" rx="4" fill={COLORS.red} />
              <text x="22" y="35" fontSize="16" fontWeight="700" fill="#7F1D1D">
                Вся программа 1С выполняется прямо на ПК.
              </text>
              <text x="22" y="60" fontSize="15" fontWeight="600" fill="#991B1B">
                Без мощного процессора и памяти будет тормозить!
              </text>
            </g>
          </g>

          {/* ========================================================= */}
          {/* 2. CENTER CARD: ЦЕНТР 1С (СЕРВЕР ЦОД)                    */}
          {/* ========================================================= */}
          <g transform="translate(680, 160)">
            {/* Card Background */}
            <rect
              x="0"
              y="0"
              width="560"
              height="750"
              rx="28"
              fill={COLORS.card}
              stroke={COLORS.purple}
              strokeWidth="3"
              filter="drop-shadow(0 16px 24px rgba(139, 92, 246, 0.12))"
            />

            <text x="280" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill={COLORS.purple} letterSpacing="1">
              ЦЕНТР 1С • КЛАСТЕР СЕРВЕРОВ
            </text>

            {/* MegaServer Animated Graphic */}
            <g transform="translate(280, 310)">
              <MegaServer x={0} y={0} frame={frame} />
            </g>

            <g transform="translate(40, 520)">
              <rect x="0" y="0" width="480" height="90" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
              <text x="240" y="38" textAnchor="middle" fontSize="16" fontWeight="800" fill={COLORS.purple}>
                «Мозг» современной системы 1С:
              </text>
              <text x="240" y="65" textAnchor="middle" fontSize="14" fontWeight="600" fill={COLORS.muted}>
                Выполняет сложные запросы СКД и расчеты
              </text>
            </g>

            <g transform="translate(40, 630)">
              <rect x="0" y="0" width="480" height="85" rx="14" fill="#EEF2FF" stroke={COLORS.purple} strokeWidth="1.5" />
              <text x="240" y="38" textAnchor="middle" fontSize="16" fontWeight="900" fill="#312E81">
                СУБД: PostgreSQL / MS SQL / 1CD
              </text>
              <text x="240" y="64" textAnchor="middle" fontSize="14" fontWeight="600" fill="#4338CA">
                Сервер обрабатывает миллионы документов за миллисекунды!
              </text>
            </g>
          </g>

          {/* ========================================================= */}
          {/* 3. RIGHT CARD: ТОНКИЙ КЛИЕНТ                              */}
          {/* ========================================================= */}
          <g transform="translate(1316, 160)">
            {/* Card Background */}
            <rect
              x="0"
              y="0"
              width="540"
              height="750"
              rx="28"
              fill={COLORS.card}
              stroke={COLORS.blue}
              strokeWidth="4"
              filter="drop-shadow(0 16px 24px rgba(59, 130, 246, 0.15))"
            />

            {/* Header */}
            <text x="32" y="55" fontSize="26" fontWeight="900" fill={COLORS.blue}>
              ⚡ ТОНКИЙ КЛИЕНТ
            </text>
            <rect x="360" y="28" width="148" height="34" rx="8" fill={COLORS.blueSoft} />
            <text x="434" y="51" textAnchor="middle" fontSize="14" fontWeight="800" fill={COLORS.blue}>
              Суперскорость
            </text>

            {/* Character */}
            <g transform="translate(270, 310)">
              <AgileHero frame={frame} x={0} y={0} />
            </g>

            {/* Metrics */}
            <g transform="translate(32, 490)">
              <text x="0" y="0" fontSize="16" fontWeight="700" fill={COLORS.ink}>
                Нагрузка на твой компьютер:
              </text>
              <text x="476" y="0" textAnchor="end" fontSize="16" fontWeight="900" fill={COLORS.green}>
                5% (Холодный и тихий!)
              </text>
              <rect x="0" y="10" width="476" height="12" rx="6" fill="#E2E8F0" />
              <rect x="0" y="10" width="48" height="12" rx="6" fill={COLORS.green} />

              <text x="0" y="55" fontSize="16" fontWeight="700" fill={COLORS.ink}>
                Передача данных по сети:
              </text>
              <text x="476" y="55" textAnchor="end" fontSize="16" fontWeight="900" fill={COLORS.green}>
                Крошечная (килобайты)
              </text>
              <rect x="0" y="65" width="476" height="12" rx="6" fill="#E2E8F0" />
              <rect x="0" y="65" width="72" height="12" rx="6" fill={COLORS.green} />
            </g>

            {/* Explanation Note */}
            <g transform="translate(32, 630)">
              <rect x="0" y="0" width="476" height="85" rx="10" fill={COLORS.blueSoft} />
              <rect x="0" y="0" width="8" height="85" rx="4" fill={COLORS.blue} />
              <text x="22" y="35" fontSize="16" fontWeight="700" fill="#1E3A8A">
                На компьютере только экран и кнопки.
              </text>
              <text x="22" y="60" fontSize="15" fontWeight="600" fill="#1D4ED8">
                Работает даже в Google Chrome, на смартфонах и планшетах!
              </text>
            </g>
          </g>

          {/* ========================================================= */}
          {/* BOTTOM SUMMARY FOOTER BANNER                              */}
          {/* ========================================================= */}
          <g transform="translate(64, 940)">
            <rect
              x="0"
              y="0"
              width="1792"
              height="80"
              rx="20"
              fill={COLORS.cardLight}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <text x="36" y="48" fontSize="22" fontWeight="800" fill={COLORS.ink}>
              💡 <tspan fill={COLORS.orange}>Шпаргалка разработчика:</tspan> Если нажимаешь кнопку — запрос улетает на Сервер <tspan fill={COLORS.blue} fontWeight="900">(&amp;НаСервере)</tspan>, а экран рисуется на клиенте <tspan fill={COLORS.green} fontWeight="900">(&amp;НаКлиенте)</tspan>!
            </text>
            <rect x="1510" y="18" width="250" height="44" rx="12" fill={COLORS.green} />
            <text x="1635" y="46" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FFFFFF">
              СОВРЕМЕННЫЙ СТАНДАРТ 1С
            </text>
          </g>
        </svg>

      </div>

      {/* Playback Controls & Frame Timeline */}
      <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-sm transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Пауза</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Воспроизвести</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-colors"
            title="Перезапустить анимацию"
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

        {/* Timeline Frame Counter */}
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          <span>Кадр: {frame} / 900</span>
          <span>Время: {(frame / 30).toFixed(1)}с / 30.0с</span>
          <div className="w-24 sm:w-36 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div 
              className="h-full bg-amber-500 transition-all duration-75"
              style={{ width: `${(frame / 900) * 100}%` }}
            />
          </div>
        </div>

        {/* Info pills */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
            <HardDrive className="w-3.5 h-3.5" /> Толстый: 100 ГБ на ПК
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
            <Cpu className="w-3.5 h-3.5" /> Сервер: ЦПУ + СУБД
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
            <Zap className="w-3.5 h-3.5" /> Тонкий: легкие КБ
          </span>
        </div>
      </div>
    </div>
  );
};
