import { SubSystem } from './SubSystem';
import { TeachingType } from './TeachingType';

export interface Major {
  id: number | null;
  subSystems: any[];
  teachingType: TeachingType | null;
  name: string | null;
  slug: string | null;
  specialties: any[];
  users: any[];
}
