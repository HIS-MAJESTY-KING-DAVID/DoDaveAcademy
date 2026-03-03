import { User } from './User';
import { Class } from './Class';
import { Category } from './Category';

export interface Exam {
  id: number | null;
  subject: string | null;
  correction: string | null;
  title: string | null;
  description: string | null;
  publishedAt: string | null;
  isPublished: boolean | null;
  user: User | null;
  reference: string | null;
  isValidated: boolean | null;
  duration: string | null;
  class: Class | null;
  category: Category | null;
  imageFile: string | null;
  language: string | null;
}
