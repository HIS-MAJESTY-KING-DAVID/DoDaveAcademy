import { Course } from './Course';
import { Student } from './Student';

export interface Review {
  id: number | null;
  course: Course | null;
  student: Student | null;
  rating: number | null;
  createdAt: string | null;
  message: string | null;
}
