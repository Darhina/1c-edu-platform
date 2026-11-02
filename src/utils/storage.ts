import { UserProgress } from '../types';

const STORAGE_KEY = 'onec_course_progress_v1';

const defaultProgress: UserProgress = {
  completedLessons: [],
  completedSteps: {},
  quizScores: {},
  notes: {},
  selectedProject: 'fitness-club',
  studentName: ''
};

export const loadProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
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
