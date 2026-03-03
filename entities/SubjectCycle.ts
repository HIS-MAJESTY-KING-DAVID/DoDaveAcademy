import { Category } from './Category';

export interface SubjectCycle {
  id: number | null;
  category: Category | null;
  cycle: number | null;
  name: string | null;
}
