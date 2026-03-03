import { Student } from './Student';
import { Proposition } from './Proposition';

export interface Answer {
  id: number | null;
  student: Student | null;
  proposition: Proposition | null;
  createdAt: string | null;
}
