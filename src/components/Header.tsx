import React from 'react';
import { 
  Terminal, BookOpen, Trophy, Info, 
  Menu, Sun, Moon, Home, Sparkles, ShieldCheck
} from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

interface HeaderProps {
  completedHours: number;
  totalHours: number;
  progressPercent: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onGoHome: () => void;
  onOpenSyntax: () => void;
  onOpenPlayground: () => void;
  onOpenProjects: () => void;
  onOpenAbout: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedHours,
  totalHours,
  progressPercent,
  isDark,
  onToggleTheme,
  onGoHome,
  onOpenSyntax,
  onOpenPlayground,
  onOpenProjects,
  onOpenAbout,
  onToggleSidebar
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Left: Brand & Home Link */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                aria-label="Открыть меню лекций"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div 
              onClick={onGoHome}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="Перейти на главную страницу курса"
            >
              {/* 1C Signature Yellow & Red Pill */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFE033] to-[#FFB700] p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105 flex-shrink-0">
                <div className="w-full h-full bg-[#FFCC00] rounded-[14px] flex items-center justify-center font-black text-[#B91C1C] text-lg tracking-tighter">
                  1С
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white leading-none group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    1С:Старт <span className="text-amber-500 font-extrabold">•</span> Практикум
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                    24 часа
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[210px] sm:max-w-xs mt-0.5">
                  АлтГПУ • Цифровые образовательные практики
                </p>
              </div>
            </div>
          </div>

          {/* Center: Hours & Progress Gauge */}
          <div className="hidden md:flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {completedHours} из {totalHours} ч освоено
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                {progressPercent}% программы
              </div>
            </div>
            
            <div className="w-24 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Offline status indicator */}
            <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-700 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap" title="Все данные сохраняются в LocalStorage браузера">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden lg:inline">Офлайн-режим</span>
            </div>
          </div>

          {/* Right: Actions & Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors border border-slate-200 dark:border-slate-700"
              title="На главную страницу"
            >
              <Home className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden xl:inline">Главная</span>
            </button>

            <button
              onClick={onOpenPlayground}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm active:scale-95"
              title="Открыть симулятор кода 1С"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Песочница</span>
            </button>

            <button
              onClick={onOpenSyntax}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors border border-slate-200 dark:border-slate-700"
              title="Открыть Синтакс-помощник (F1)"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Синтакс (F1)</span>
            </button>

            <button
              onClick={onOpenProjects}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors border border-slate-200 dark:border-slate-700"
              title="Темы проектов для итоговой защиты"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden lg:inline">Темы проектов</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
              title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
              aria-label="Переключатель темы"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={onOpenAbout}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 transition-colors"
              title="Паспорт программы и авторы"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
