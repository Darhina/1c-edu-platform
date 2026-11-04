export type LessonId = 'intro' | 'lecture-1' | 'lecture-2' | 'lecture-3' | 'lecture-4' | 'lecture-5' | 'lecture-6' | 'final-exam';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticalStep {
  title: string;
  description: string;
  codeSnippet?: string;
  codeDescription?: string;
  tip?: string;
  actionNote?: string;
}

export interface CommonMistake {
  title: string;
  cause: string;
  solution: string;
  code?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Markdown / formatted HTML paragraphs
  codeSnippets?: {
    title: string;
    code: string;
    language: string;
    explanation?: string;
  }[];
  interactiveType?: 
    | 'metadata-tree' 
    | 'client-server-diagram' 
    | 'thin-vs-thick-animation' 
    | 'doc-lifecycle' 
    | 'doc-lifecycle-animation'
    | 'register-slice' 
    | 'register-accumulation-animation'
    | 'skd-scheme'
    | 'skd-pipeline-animation'
    | 'code-flow-animation'
    | 'metadata-hierarchy-animation';
}

export interface Lesson {
  id: LessonId;
  order: number;
  numberTitle: string;
  title: string;
  shortTitle: string;
  hoursTotal: number;
  hoursLecture: number;
  hoursPractice: number;
  hoursConsultation?: number;
  tagline: string;
  description: string;
  keyCompetencies: string[];
  sections: LessonSection[];
  practicalSteps?: PracticalStep[];
  commonMistakes?: CommonMistake[];
  quiz: QuizQuestion[];
  resources: {
    title: string;
    url?: string;
    type: 'doc' | 'link' | 'video' | 'book';
  }[];
}

export interface ProjectTopic {
  id: string;
  title: string;
  subtitle: string;
  targetDomain: string;
  businessGoals: string[];
  metadataSchema: {
    subsystems: string[];
    catalogs: { name: string; purpose: string; attributes: string[] }[];
    documents: { name: string; purpose: string; headerAttributes: string[]; tableParts: string[] }[];
    registers: { name: string; type: string; dimensions: string[]; resources: string[] }[];
    reports: { name: string; purpose: string }[];
  };
  sampleBusinessProcess: string[];
  defenseCriteria: string[];
}

export interface UserProgress {
  completedLessons: string[]; // lesson ids
  completedSteps: Record<string, number[]>; // lessonId -> step indexes completed
  quizScores: Record<string, number>; // lessonId -> highest score
  notes: Record<string, string>; // lessonId -> user notes
  selectedProject?: string;
  studentName?: string;
}
