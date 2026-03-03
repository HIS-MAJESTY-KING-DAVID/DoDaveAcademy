import { Course } from './Course';

export interface Chapter {
  id: number | null;
  course: Course | null;
  title: string | null;
  slug: string | null;
  description: string | null;
  lessons: any[];
  quizzes: any[];
  number: number | null;
  lectures: any[];
  quizLosts: any[];
}
