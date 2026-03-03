import { Evaluation } from './Evaluation';
import { Student } from './Student';

export interface EvaluationResult {
  id: number | null;
  evaluation: Evaluation | null;
  student: Student | null;
  contents: any[];
  score: number | null;
  evaluatedAt: string | null;
}
