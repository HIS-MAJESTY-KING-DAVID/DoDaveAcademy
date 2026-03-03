import { Category } from './Category';
import { Student } from './Student';
import { Instructor } from './Instructor';

export interface SubjectChat {
  id: number | null;
  category: Category | null;
  cycle: number | null;
  name: string | null;
  messageChats: any[];
  createdAt: string | null;
  webSocketConnections: any[];
  student: Student | null;
  instructor: Instructor | null;
}
