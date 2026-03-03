import { Course } from './Course';

export interface FAQ {
  id: number | null;
  course: Course | null;
  question: string | null;
  answer: string | null;
}
