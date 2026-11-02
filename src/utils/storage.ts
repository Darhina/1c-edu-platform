import { UserProgress } from '../types';

const STORAGE_KEY = 'onec_course_progress_v2';

const defaultProgress: UserProgress = {
  completedLessons: [],
  completedSteps: {},
  quizScores: {},
  notes: {},
  selectedProject: undefined, // No project selected by default!
  studentName: ''
};

export const loadProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return { 
      ...defaultProgress, 
      ...parsed,
      // If legacy had 'fitness-club' auto-selected without user explicitly choosing, keep it clean
      selectedProject: parsed.selectedProject || undefined 
    };
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};
