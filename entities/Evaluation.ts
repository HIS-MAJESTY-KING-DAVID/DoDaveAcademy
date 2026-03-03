import { Category } from './Category';
import { Instructor } from './Instructor';

export interface Evaluation {
  id: number | null;
  title: string | null;
  description: string | null;
  category: Category | null;
  classes: any[];
  startAt: string | null;
  endAt: string | null;
  duration: number | null;
  isGeneratedRandomQuestions: boolean | null;
  evaluationQuestions: any[];
  slug: string | null;
  isPassed: boolean | null;
  students: any[];
  results: any[];
  instructor: Instructor | null;
  isPublished: boolean | null;
}
