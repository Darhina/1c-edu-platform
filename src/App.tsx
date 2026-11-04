import React, { useState, useEffect } from 'react';
import { LESSONS, COURSE_INFO } from './data/courseData';
import { LessonId, UserProgress } from './types';
import { loadProgress, saveProgress } from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { LessonView } from './components/LessonView';
import { SyntaxModal } from './components/SyntaxModal';
import { PlaygroundModal } from './components/PlaygroundModal';
import { ProjectsModal } from './components/ProjectsModal';
import { AboutModal } from './components/AboutModal';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [activeView, setActiveView] = useState<LessonId | 'home'>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('onec_theme_mode');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('onec_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('onec_theme_mode', 'light');
    }
  }, [isDark]);

  // Modals state
  const [isSyntaxOpen, setIsSyntaxOpen] = useState<boolean>(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState<boolean>(false);
  const [playgroundInitialCode, setPlaygroundInitialCode] = useState<string | undefined>(undefined);
  const [isProjectsOpen, setIsProjectsOpen] = useState<boolean>(false);
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

  const currentLessonIndex = activeView !== 'home' ? LESSONS.findIndex(l => l.id === activeView) : 0;
  const currentLesson = LESSONS[currentLessonIndex] || LESSONS[0];

  // Calculate completed hours
  const completedHours = LESSONS.reduce((acc, lesson) => {
    return progress.completedLessons.includes(lesson.id) ? acc + lesson.hoursTotal : acc;
  }, 0);

  const progressPercent = Math.min(100, Math.round((completedHours / COURSE_INFO.totalHours) * 100));

  // Handlers
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

  const handleSaveNotes = (lessonId: string, notesText: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [lessonId]: notesText }
    }));
  };

  const handleSelectProject = (projectId: string | undefined) => {
    setProgress(prev => ({ ...prev, selectedProject: projectId }));
  };

  const handleOpenPlaygroundWithCode = (code: string) => {
    setPlaygroundInitialCode(code);
    setIsPlaygroundOpen(true);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < LESSONS.length - 1) {
      setActiveView(LESSONS[currentLessonIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveView(LESSONS[currentLessonIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Header */}
      <Header
        completedHours={completedHours}
        totalHours={COURSE_INFO.totalHours}
        progressPercent={progressPercent}
        isDark={isDark}
        onToggleTheme={() => setIsDark(prev => !prev)}
        onGoHome={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSyntax={() => setIsSyntaxOpen(true)}
        onOpenPlayground={() => {
          setPlaygroundInitialCode(undefined);
          setIsPlaygroundOpen(true);
        }}
        onOpenProjects={() => setIsProjectsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          lessons={LESSONS}
          activeLessonId={activeView}
          onSelectLesson={(id) => {
            setActiveView(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoHome={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          completedLessons={progress.completedLessons}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-x-hidden min-h-[80vh]">
          {activeView === 'home' ? (
            <HomePage
              onStartCourse={() => {
                setActiveView('lecture-1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectLesson={(id) => {
                setActiveView(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              completedLessons={progress.completedLessons}
              onOpenPlayground={() => {
                setPlaygroundInitialCode(undefined);
                setIsPlaygroundOpen(true);
              }}
              onOpenProjects={() => setIsProjectsOpen(true)}
              onOpenSyntax={() => setIsSyntaxOpen(true)}
              onOpenAbout={() => setIsAboutOpen(true)}
            />
          ) : (
            <LessonView
              lesson={currentLesson}
              onNextLesson={currentLessonIndex < LESSONS.length - 1 ? handleNextLesson : undefined}
              onPrevLesson={currentLessonIndex > 0 ? handlePrevLesson : undefined}
              onGoHome={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isCompleted={progress.completedLessons.includes(currentLesson.id)}
              onToggleComplete={() => handleToggleComplete(currentLesson.id)}
              completedSteps={progress.completedSteps[currentLesson.id] || []}
              onToggleStep={(stepIdx) => handleToggleStep(currentLesson.id, stepIdx)}
              quizScore={progress.quizScores[currentLesson.id]}
              onSaveQuizScore={(score) => handleSaveQuizScore(currentLesson.id, score)}
              notes={progress.notes[currentLesson.id] || ''}
              onSaveNotes={(notesText) => handleSaveNotes(currentLesson.id, notesText)}
              onOpenProjects={() => setIsProjectsOpen(true)}
              onOpenPlaygroundWithCode={handleOpenPlaygroundWithCode}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <span className="w-5 h-5 rounded bg-[#FFCC00] text-[#B91C1C] flex items-center justify-center font-black text-xs">
              1С
            </span>
            <span>«{COURSE_INFO.title}»</span>
          </div>
          <p>
            {COURSE_INFO.institution} • {COURSE_INFO.department}
          </p>
          <p className="text-[11px] text-slate-400">
            Учебно-методический комплекс «1С:Предприятие 8.3» • 2026
          </p>
          <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-center gap-3">
            <span>🟢 Автономный режим активен</span>
            <span>•</span>
            <span>Локальный и онлайн-доступ</span>
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
        initialCode={playgroundInitialCode}
      />

      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        selectedProjectId={progress.selectedProject}
        onSelectProject={handleSelectProject}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

    </div>
  );
};

export default App;
