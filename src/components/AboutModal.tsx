import React from 'react';
import { X, BookOpen, GraduationCap, Users, Clock, Award, ShieldCheck, ExternalLink } from 'lucide-react';
import { COURSE_INFO } from '../data/courseData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1E293B] text-white border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-[#B91C1C] text-xs">
              1С
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">
                О дополнительной общеобразовательной программе
              </h3>
              <p className="text-[11px] text-slate-400">
                {COURSE_INFO.institution}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Main Title Badge */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Дополнительная общеобразовательная программа (техническая направленность)
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
              «{COURSE_INFO.title}»
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Целевая аудитория: {COURSE_INFO.targetAge}. Срок освоения: {COURSE_INFO.totalHours} часа.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <div className="text-lg font-black text-slate-900 dark:text-white">24 ч</div>
              <div className="text-[11px] text-slate-500">Всего часов</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <BookOpen className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <div className="text-lg font-black text-slate-900 dark:text-white">6 ч</div>
              <div className="text-[11px] text-slate-500">Лекции</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <GraduationCap className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-lg font-black text-slate-900 dark:text-white">16 ч</div>
              <div className="text-[11px] text-slate-500">Лабораторные</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Award className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <div className="text-lg font-black text-slate-900 dark:text-white">2 ч</div>
              <div className="text-[11px] text-slate-500">Защита проекта</div>
            </div>
          </div>

          {/* Developers Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-500" />
              Разработчики программы:
            </h4>
            <div className="space-y-3">
              {COURSE_INFO.authors.map((author, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                    {author.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">{author.name}</h5>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">{author.role}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{author.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Goals */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Цель и ключевые задачи:
            </h4>
            <p className="leading-relaxed">
              <strong>Цель:</strong> развитие компетенций студентов, необходимых для создания и реализации прикладных решений на платформе «1С:Предприятие 8.3». Обучающиеся без предварительной подготовки осваивают программирование через создание работающих конфигураций, решающих реальные учетные и бизнес-задачи.
            </p>
          </div>

          {/* Technical Setup */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Технические условия и автономный режим:
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Платформа специально спроектирована так, чтобы студенты могли заниматься в учебных классах даже при отсутствии интернета: весь прогресс, заметки, чек-листы практических работ и симулятор кода работают полностью автономно локально в браузере (LocalStorage).
            </p>
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            Практический курс • 2026
          </div>
        </div>

      </div>
    </div>
  );
};
