import { Category } from './Category';
import { Instructor } from './Instructor';

export interface EvaluationDto {
  id: number | null;
  title: string | null;
  description: string | null;
  category: Category | null;
  startAt: string;
  endAt: string;
  duration: number;
  isGeneratedRandomQuestions: boolean | null;
  classes: any[];
  evaluationQuestions: any[];
  slug: string | null;
  isPassed: boolean | null;
  students: any[];
  results: any[];
  instructor: Instructor | null;
  isPublished: boolean | null;
}
