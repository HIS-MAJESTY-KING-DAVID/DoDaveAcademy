import { Quiz } from './Quiz';

export interface Proposition {
  id: number | null;
  quiz: Quiz | null;
  content: string | null;
  isTrue: boolean | null;
  answers: any[];
}
