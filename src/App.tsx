import React, { useState, useEffect } from 'react';
import { LESSONS, COURSE_INFO } from './data/courseData';
import { LessonId, UserProgress } from './types';
import { loadProgress, saveProgress } from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { SyntaxModal } from './components/SyntaxModal';
import { PlaygroundModal } from './components/PlaygroundModal';
import { ProjectsModal } from './components/ProjectsModal';
import { CertificateModal } from './components/CertificateModal';
import { AboutModal } from './components/AboutModal';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [activeLessonId, setActiveLessonId] = useState<LessonId>('lecture-1');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Modals state
  const [isSyntaxOpen, setIsSyntaxOpen] = useState<boolean>(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState<boolean>(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Save to localStorage on any progress change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Global F1 key listener for 1C Syntax Assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        setIsSyntaxOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentLessonIndex = LESSONS.findIndex(l => l.id === activeLessonId);
  const currentLesson = LESSONS[currentLessonIndex] || LESSONS[0];

  // Calculate completed hours
  const completedHours = LESSONS.reduce((acc, lesson) => {
    return progress.completedLessons.includes(lesson.id) ? acc + lesson.hoursTotal : acc;
  }, 0);

  const progressPercent = Math.min(100, Math.round((completedHours / COURSE_INFO.totalHours) * 100));

  // Lesson handlers
  const handleToggleComplete = (lessonId: string) => {
    setProgress(prev => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated = exists
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: updated };
    });
  };

  const handleToggleStep = (lessonId: string, stepIdx: number) => {
    setProgress(prev => {
      const steps = prev.completedSteps[lessonId] || [];
      const updatedSteps = steps.includes(stepIdx)
        ? steps.filter(idx => idx !== stepIdx)
        : [...steps, stepIdx];
      return {
        ...prev,
        completedSteps: { ...prev.completedSteps, [lessonId]: updatedSteps }
      };
    });
  };

  const handleSaveQuizScore = (lessonId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [lessonId]: score }
    }));
  };

  const handleSaveNotes = (lessonId: string, notes: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [lessonId]: notes }
    }));
  };

  const handleSelectProject = (projectId: string) => {
    setProgress(prev => ({ ...prev, selectedProject: projectId }));
  };

  const handleSaveStudentName = (name: string) => {
    setProgress(prev => ({ ...prev, studentName: name }));
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < LESSONS.length - 1) {
      setActiveLessonId(LESSONS[currentLessonIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveLessonId(LESSONS[currentLessonIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      
      {/* Top Navigation */}
      <Header
        completedHours={completedHours}
        totalHours={COURSE_INFO.totalHours}
        progressPercent={progressPercent}
        onOpenSyntax={() => setIsSyntaxOpen(true)}
        onOpenPlayground={() => setIsPlaygroundOpen(true)}
        onOpenProjects={() => setIsProjectsOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* Main Learning Workspace */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          lessons={LESSONS}
          activeLessonId={activeLessonId}
          onSelectLesson={(id) => {
            setActiveLessonId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          completedLessons={progress.completedLessons}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-x-hidden">
          <LessonView
            lesson={currentLesson}
            onNextLesson={currentLessonIndex < LESSONS.length - 1 ? handleNextLesson : undefined}
            onPrevLesson={currentLessonIndex > 0 ? handlePrevLesson : undefined}
            isCompleted={progress.completedLessons.includes(currentLesson.id)}
            onToggleComplete={() => handleToggleComplete(currentLesson.id)}
            completedSteps={progress.completedSteps[currentLesson.id] || []}
            onToggleStep={(stepIdx) => handleToggleStep(currentLesson.id, stepIdx)}
            quizScore={progress.quizScores[currentLesson.id]}
            onSaveQuizScore={(score) => handleSaveQuizScore(currentLesson.id, score)}
            notes={progress.notes[currentLesson.id] || ''}
            onSaveNotes={(notes) => handleSaveNotes(currentLesson.id, notes)}
            onOpenProjects={() => setIsProjectsOpen(true)}
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <span className="w-4 h-4 rounded bg-[#FFCC00] text-[#B91C1C] flex items-center justify-center font-black text-[10px]">
              1С
            </span>
            <span>«{COURSE_INFO.title}»</span>
          </div>
          <p>
            {COURSE_INFO.institution} • {COURSE_INFO.department}
          </p>
          <p className="text-[11px] text-slate-400">
            Разработчики: Тумбаева Н.В. (к.п.н., доцент), Евдокимова Д.И. (магистрант АлтГПУ) • Барнаул – 2026
          </p>
          <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-center gap-3">
            <span>🟢 Автономный режим активен</span>
            <span>•</span>
            <span>Поддерживается запуск локально и на Vercel</span>
            <span>•</span>
            <span>Синтакс-помощник: F1</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SyntaxModal
        isOpen={isSyntaxOpen}
        onClose={() => setIsSyntaxOpen(false)}
      />

      <PlaygroundModal
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
      />

      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        selectedProjectId={progress.selectedProject}
        onSelectProject={handleSelectProject}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={progress.studentName || ''}
        onSaveName={handleSaveStudentName}
        completedHours={completedHours}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

    </div>
  );
};

export default App;
