import { Evaluation } from './Evaluation';

export interface EvaluationQuestion {
  id: number | null;
  question: string | null;
  proposition1: string | null;
  proposition2: string | null;
  proposition3: string | null;
  proposition4: string | null;
  correctPropositions: any[];
  evaluation: Evaluation | null;
}
