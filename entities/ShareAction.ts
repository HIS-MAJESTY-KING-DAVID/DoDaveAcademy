import { Investor } from './Investor';

export interface ShareAction {
  id: number | null;
  count: string | null;
  relation: string | null;
  type: string | null;
  investor: Investor | null;
}
