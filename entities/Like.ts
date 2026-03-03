import { User } from './User';
import { Course } from './Course';

export interface Like {
  id: number | null;
  author: User | null;
  isLike: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  course: Course | null;
}
