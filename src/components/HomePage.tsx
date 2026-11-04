import React from 'react';
import { 
  Play, BookOpen, Clock, Award, Terminal, CheckCircle2, 
  Layers, Users, ArrowRight, Sparkles, ShieldCheck, Heart, Database, Laptop
} from 'lucide-react';
import { LESSONS, COURSE_INFO } from '../data/courseData';
import { LessonId } from '../types';
import { PROJECT_TOPICS } from '../data/projectsData';
import { VisualGuides } from './VisualGuides';
import { MascotCat } from './MascotCat';

interface HomePageProps {
  onStartCourse: () => void;
  onSelectLesson: (id: LessonId) => void;
  completedLessons: string[];
  onOpenPlayground: () => void;
  onOpenProjects: () => void;
  onOpenSyntax: () => void;
  onOpenAbout: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartCourse,
  onSelectLesson,
  completedLessons,
  onOpenPlayground,
  onOpenProjects,
  onOpenSyntax,
  onOpenAbout
}) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-12">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-amber-400/20 via-yellow-400/10 to-amber-500/10 border-2 border-amber-400/50 dark:border-amber-500/30 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>Практикум 2026 • 24 академических часа</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Первый шаг в <span className="text-[#B91C1C] underline decoration-amber-400 underline-offset-8">1С-разработку</span>:
              <br />
              практикум для начинающих
            </h1>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
              Современная интерактивная образовательная платформа по разработке прикладных решений на платформе <strong>«1С:Предприятие 8.3»</strong> с нуля. Создавайте свои первые справочники, документы, регистры и отчеты на СКД без сложного порога входа!
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <button
                onClick={onStartCourse}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Начать обучение (Лекция 1)</span>
              </button>

              <button
                onClick={onOpenPlayground}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm border border-slate-300 dark:border-slate-700 shadow-sm transition-all"
              >
                <Terminal className="w-4 h-4 text-amber-500" />
                <span>Песочница кода 1С</span>
              </button>
            </div>

            {/* Offline badge */}
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                100% готов к работе офлайн в аудитории
              </span>
              <span>•</span>
              <span>Интерактивный тренажер</span>
            </div>
          </div>

          {/* Mascot Cat Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-amber-200 relative">
                <img
                  src="/mascot.jpg"
                  alt="Кот Барсик — официальный маскот курса 1С"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating 1C Badge */}
              <div className="absolute -top-3 -left-3 px-3 py-1.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-[#B91C1C] text-white flex items-center justify-center text-[10px] font-black">
                  1С
                </div>
                <span>Маскот Барсик</span>
              </div>

              {/* Speech bubble */}
              <div className="absolute -bottom-4 right-0 sm:-right-4 bg-white dark:bg-slate-850 p-3 rounded-2xl shadow-xl border border-amber-300 dark:border-slate-700 text-xs font-semibold max-w-[220px] text-slate-800 dark:text-slate-200">
                🐾 «Привет! Я помогу тебе разобраться с 1С без занудства и стресса!»
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Mascot Advice Banner */}
      <MascotCat lessonId="home" />

      {/* Key Metrics Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
          <Clock className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">24 ч</div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Трудоемкость курса</div>
          <div className="text-[11px] text-slate-500">6 ч лекций + 16 ч лаб + 2 ч зачет</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
          <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">0</div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Порог входа</div>
          <div className="text-[11px] text-slate-500">С нуля для студентов любого профиля</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
          <Award className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">6 тем</div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Отраслевых проектов</div>
          <div className="text-[11px] text-slate-500">Для итоговой презентации и защиты</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
          <Terminal className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Live</div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Песочница кода</div>
          <div className="text-[11px] text-slate-500">Запуск алгоритмов 1С прямо в браузере</div>
        </div>
      </section>

      {/* Visual UI Click Guide */}
      <VisualGuides />

      {/* Course Roadmap (All 7 Units) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Учебный план программы
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              7 шагов к созданию работающей конфигурации
            </h2>
          </div>
          <div className="text-xs font-medium text-slate-500">
            Освоено тем: {completedLessons.length} из {LESSONS.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LESSONS.map((lesson) => {
            const isDone = completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-amber-400 dark:hover:border-amber-500/60 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-mono">
                      {lesson.numberTitle}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {lesson.hoursTotal} ч {lesson.hoursPractice > 0 ? `(${lesson.hoursPractice}ч лаб)` : ''}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1.5 leading-snug">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                    {isDone ? 'Освоено ✓' : 'Не начато'}
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Перейти к материалам →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capstone Projects Section */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#1E293B] text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Итоговая аттестация • Сквозные проекты
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Банк из 6 отраслевых прикладных решений
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              Каждый студент выбирает тему по душе для защиты своей первой работающей конфигурации 1С.
            </p>
          </div>

          <button
            onClick={onOpenProjects}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            Смотреть банк тем с ТЗ →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {PROJECT_TOPICS.map((proj, i) => (
            <div key={proj.id} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold">Проект {i + 1}</span>
              <h4 className="font-bold text-white leading-tight">{proj.title}</h4>
              <p className="text-slate-400 text-[11px] line-clamp-2">{proj.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Authors & Institutional Section */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Команда проекта
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Разработчики образовательной программы
            </h3>
          </div>
          <button
            onClick={onOpenAbout}
            className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            Паспорт программы →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {COURSE_INFO.authors.map((a, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{a.name}</h4>
              <p className="text-amber-600 dark:text-amber-400 font-semibold">{a.role}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{a.position}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
