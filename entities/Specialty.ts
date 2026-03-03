import { Major } from './Major';

export interface Specialty {
  id: number | null;
  major: Major | null;
  name: string | null;
  slug: string | null;
  classes: any[];
}
