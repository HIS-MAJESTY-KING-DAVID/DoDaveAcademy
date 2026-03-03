import { Country } from './Country';

export interface Institution {
  id: number | null;
  name: string | null;
  city: string | null;
  country: Country | null;
  students: any[];
  instructors: any[];
}
