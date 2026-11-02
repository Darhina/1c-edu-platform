import React, { useState } from 'react';
import { 
  Clock, BookOpen, CheckCircle, AlertTriangle, Lightbulb, 
  Copy, Check, ChevronRight, ChevronLeft, ArrowRight, Award,
  Edit3, HelpCircle, Sparkles, FileCode, CheckSquare, Square
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, LessonId } from '../types';
import { 
  ClientServerDiagram, DocLifecycleDiagram, 
  RegisterSliceDiagram, SKDSchemeDiagram 
} from './InteractiveDiagrams';
import { ConfiguratorMockup } from './ConfiguratorMockup';

interface LessonViewProps {
  lesson: Lesson;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  completedSteps: number[];
  onToggleStep: (stepIndex: number) => void;
  quizScore?: number;
  onSaveQuizScore: (score: number) => void;
  notes: string;
  onSaveNotes: (notes: string) => void;
  onOpenProjects: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onNextLesson,
  onPrevLesson,
  isCompleted,
  onToggleComplete,
  completedSteps,
  onToggleStep,
  quizScore,
  onSaveQuizScore,
  notes,
  onSaveNotes,
  onOpenProjects
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);
  const [currentNotes, setCurrentNotes] = useState<string>(notes || '');

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    if (showQuizResults) return; // locked after submission
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    lesson.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setShowQuizResults(true);
    onSaveQuizScore(score);

    if (score === lesson.quiz.length) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowQuizResults(false);
  };

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      
      {/* Lesson Header Banner */}
      <header className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/40 dark:border-amber-500/20 p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm">
              {lesson.numberTitle}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {lesson.hoursTotal} ч 
                {lesson.hoursLecture > 0 && ` • Лекция: ${lesson.hoursLecture}ч`}
                {lesson.hoursPractice > 0 && ` • Практика: ${lesson.hoursPractice}ч`}
                {lesson.hoursConsultation && ` • Консультация: ${lesson.hoursConsultation}ч`}
              </span>
            </span>
          </div>

          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isCompleted
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? 'Тема освоена ✓' : 'Отметить как пройденную'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
          {lesson.title}
        </h1>

        <p className="text-sm sm:text-base text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
          {lesson.tagline}
        </p>
      </header>

      {/* Academic Competencies Box */}
      <section className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-amber-500" />
          Формируемые компетенции и результаты занятия:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {lesson.keyCompetencies.map((comp, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
              <span>{comp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Theoretical Sections */}
      <section className="space-y-8">
        {lesson.sections.map((sec) => (
          <div key={sec.id} className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-amber-500 font-black">#</span>
              <span>{sec.title}</span>
            </h2>

            {/* Formatted Content */}
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
              {sec.content}
            </div>

            {/* Embedded Interactive Diagrams based on topic */}
            {sec.interactiveType === 'client-server-diagram' && <ClientServerDiagram />}
            {sec.interactiveType === 'metadata-tree' && <ConfiguratorMockup />}
            {sec.interactiveType === 'doc-lifecycle' && <DocLifecycleDiagram />}
            {sec.interactiveType === 'register-slice' && <RegisterSliceDiagram />}
            {sec.interactiveType === 'skd-scheme' && <SKDSchemeDiagram />}

            {/* Code snippets */}
            {sec.codeSnippets && sec.codeSnippets.map((cs, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-sm my-4">
                <div className="bg-[#1E293B] px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-xs text-slate-200">{cs.title}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(cs.code, `cs-${sec.id}-${idx}`)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    {copiedSnippet === `cs-${sec.id}-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Копировать код</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 font-mono text-xs text-slate-100 overflow-x-auto leading-relaxed">
                  <pre>{cs.code}</pre>
                </div>
                {cs.explanation && (
                  <div className="bg-slate-950/60 p-3 text-[11px] text-slate-400 border-t border-slate-800">
                    💡 <strong>Пояснение:</strong> {cs.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Practical Laboratory Section (if available) */}
      {lesson.practicalSteps && lesson.practicalSteps.length > 0 && (
        <section className="rounded-3xl border-2 border-amber-400/60 bg-white dark:bg-slate-850 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Лабораторный практикум ({lesson.hoursPractice} академических часа)
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Пошаговые инструкции для выполнения на учебной платформе
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Выполнено: {completedSteps.length} из {lesson.practicalSteps.length}
            </div>
          </div>

          <div className="space-y-4">
            {lesson.practicalSteps.map((step, idx) => {
              const isStepDone = completedSteps.includes(idx);
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isStepDone
                      ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleStep(idx)}
                      className="mt-0.5 text-amber-500 hover:text-amber-600 focus:outline-none flex-shrink-0"
                    >
                      {isStepDone ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 hover:text-amber-500" />
                      )}
                    </button>

                    <div className="flex-1 space-y-2">
                      <h4 className={`text-sm font-bold ${isStepDone ? 'text-emerald-900 dark:text-emerald-200 line-through' : 'text-slate-900 dark:text-white'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {step.description}
                      </p>

                      {step.codeSnippet && (
                        <div className="rounded-xl bg-slate-900 p-3 font-mono text-xs text-slate-100 overflow-x-auto my-2">
                          <pre>{step.codeSnippet}</pre>
                        </div>
                      )}

                      {step.tip && (
                        <p className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900/40 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          <span>Совет: {step.tip}</span>
                        </p>
                      )}

                      {step.actionNote && (
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-300 flex items-center gap-1 font-semibold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Контроль результата: {step.actionNote}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Common Mistakes ("Грабли начинающих") */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <section className="p-6 rounded-3xl bg-red-50/40 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-700 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            «Грабли» начинающих: частые ошибки и как их исправить
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.commonMistakes.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-red-100 dark:border-red-900/30 text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">⚠️ {m.title}</p>
                <p className="text-slate-600 dark:text-slate-400"><strong>Причина:</strong> {m.cause}</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-medium"><strong>Решение:</strong> {m.solution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Special Final Exam Projects Banner */}
      {lesson.id === 'final-exam' && (
        <section className="rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black">
              Готовы выбрать тему итогового проекта?
            </h3>
            <p className="text-xs sm:text-sm font-medium opacity-90 max-w-xl">
              В банке тем представлено 6 практических отраслевых конфигураций (Фитнес-клуб, СТО, Библиотека, Интернет-магазин, Техподдержка, Курсы) с готовыми схемами метаданных и сценариями защиты.
            </p>
          </div>
          <button
            onClick={onOpenProjects}
            className="px-6 py-3 rounded-2xl bg-slate-950 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-slate-800 transition-all active:scale-95 whitespace-nowrap"
          >
            Открыть банк тем проектов →
          </button>
        </section>
      )}

      {/* Interactive Self-Assessment Quiz */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Контроль усвоения материала
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Интерактивный экспресс-тест (самопроверка)
              </h3>
            </div>
            {showQuizResults && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                Балл: {quizScore || 0} из {lesson.quiz.length}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {lesson.quiz.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2">
                    <span className="text-amber-500">{qIdx + 1}.</span>
                    <span>{q.question}</span>
                  </h4>

                  <div className="space-y-1.5 pl-4">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                      
                      if (showQuizResults) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'border-red-400 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200';
                        }
                      } else if (isChosen) {
                        btnStyle = 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showQuizResults}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showQuizResults && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="pl-4 pt-1">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                        💡 <strong>Разбор:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center gap-3">
            {!showQuizResults ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Проверить ответы
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-semibold"
              >
                Пройти тест заново
              </button>
            )}
          </div>
        </section>
      )}

      {/* Student Personal Notes (Auto-saved to LocalStorage) */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Edit3 className="w-4 h-4 text-amber-500" />
            Мои личные заметки к занятию (сохраняются автоматически):
          </h3>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Синхронизировано в LocalStorage
          </span>
        </div>
        <textarea
          value={currentNotes}
          onChange={(e) => {
            setCurrentNotes(e.target.value);
            onSaveNotes(e.target.value);
          }}
          placeholder="Напишите здесь свои мысли, вопросы преподавателю или полезные формулы..."
          className="w-full h-24 p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
        />
      </section>

      {/* Navigation Buttons */}
      <nav className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
        {onPrevLesson ? (
          <button
            onClick={onPrevLesson}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Предыдущее занятие</span>
          </button>
        ) : <div />}

        {onNextLesson && (
          <button
            onClick={onNextLesson}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <span>Следующее занятие</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </nav>

    </article>
  );
};
