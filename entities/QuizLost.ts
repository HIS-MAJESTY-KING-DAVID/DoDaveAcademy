import { Course } from './Course';
import { Chapter } from './Chapter';
import { Student } from './Student';

export interface QuizLost {
  id: number | null;
  course: Course | null;
  chapter: Chapter | null;
  student: Student | null;
  attempt: number | null;
  lastAt: string | null;
  nextAt: string | null;
  isOk: boolean | null;
}
