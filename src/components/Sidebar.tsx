import React from 'react';
import { 
  CheckCircle2, Circle, Clock, BookOpen, Layers, 
  FileText, Database, ShieldCheck, ChevronRight, X, Sparkles, Home,
  Cpu, Wrench, Code2, ScrollText, TableProperties, BarChart3, Award
} from 'lucide-react';
import { Lesson, LessonId } from '../types';

interface SidebarProps {
  lessons: Lesson[];
  activeLessonId: LessonId | 'home';
  onSelectLesson: (id: LessonId) => void;
  onGoHome: () => void;
  completedLessons: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  lessons,
  activeLessonId,
  onSelectLesson,
  onGoHome,
  completedLessons,
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-72 sm:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          
          {/* Home Link */}
          <button
            onClick={() => {
              onGoHome();
              onClose();
            }}
            className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between mb-2 ${
              activeLessonId === 'home'
                ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 shadow-sm font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-amber-50/50 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold">Главная страница курса</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Модули курса (24 ч)
            </span>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {lessons.map((lesson) => {
            const isActive = activeLessonId === lesson.id;
            const isCompleted = completedLessons.includes(lesson.id);

            // Тематическая иконка и цветовая гамма для каждой лекции
            const getLessonVisuals = (id: LessonId) => {
              switch (id) {
                case 'lecture-1':
                  return {
                    icon: Cpu,
                    bg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                  };
                case 'lecture-2':
                  return {
                    icon: Wrench,
                    bg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                  };
                case 'lecture-3':
                  return {
                    icon: Code2,
                    bg: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  };
                case 'lecture-4':
                  return {
                    icon: ScrollText,
                    bg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                  };
                case 'lecture-5':
                  return {
                    icon: BarChart3,
                    bg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                  };
                case 'lecture-6':
                  return {
                    icon: TableProperties,
                    bg: 'bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800'
                  };
                case 'final-exam':
                  return {
                    icon: Award,
                    bg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                  };
                default:
                  return {
                    icon: BookOpen,
                    bg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  };
              }
            };

            const visuals = getLessonVisuals(lesson.id);
            const VisualIcon = visuals.icon;

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-2xl border transition-all relative flex items-start gap-3 ${
                  isActive
                    ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 shadow-sm'
                    : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300'
                }`}
              >
                {/* Тематическая иконка модуля */}
                <div className={`p-2 rounded-xl border flex-shrink-0 transition-transform ${visuals.bg} ${isActive ? 'scale-105 ring-2 ring-amber-400/50' : ''}`}>
                  <VisualIcon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold">
                        {lesson.numberTitle}
                      </span>
                      {lesson.hoursPractice > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300">
                          {lesson.hoursPractice}ч лаб
                        </span>
                      )}
                    </div>

                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 dark:text-slate-700 flex-shrink-0" />
                    )}
                  </div>

                  <h4 className="text-xs font-bold leading-snug line-clamp-2">
                    {lesson.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>
                        {lesson.hoursTotal} ч 
                        {lesson.hoursLecture > 0 && ` (${lesson.hoursLecture} л`}
                        {lesson.hoursPractice > 0 && ` + ${lesson.hoursPractice} пр)`}
                        {lesson.hoursLecture === 0 && lesson.hoursPractice === 0 && ' (аттестация)'}
                      </span>
                    </span>
                  </div>
                </div>

                {isActive && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-500">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info box */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Учебный комплекс</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Практикум разработан специально для быстрого старта с нуля в 1С:Предприятие 8.3.
          </p>
        </div>
      </aside>
    </>
  );
};
