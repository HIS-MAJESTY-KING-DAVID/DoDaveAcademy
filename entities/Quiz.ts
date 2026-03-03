import { Chapter } from './Chapter';
import { Course } from './Course';

export interface Quiz {
  id: number | null;
  chapter: Chapter | null;
  question: string | null;
  reference: string | null;
  propositions: any[];
  proposition1: string | null;
  proposition2: string | null;
  proposition3: string | null;
  proposition4: string | null;
  correctPropositions: any[];
  quizResults: any[];
  course: Course | null;
}
