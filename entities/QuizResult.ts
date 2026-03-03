import { Quiz } from './Quiz';
import { Student } from './Student';

export interface QuizResult {
  id: number | null;
  quiz: Quiz | null;
  student: Student | null;
  result: any[];
  createdAt: string | null;
  isCorrect: boolean | null;
  score: number | null;
  updatedAt: string | null;
}
