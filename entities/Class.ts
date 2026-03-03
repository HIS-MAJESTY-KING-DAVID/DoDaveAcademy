import { Specialty } from './Specialty';
import { SkillLevel } from './SkillLevel';
import { SubSystem } from './SubSystem';

export interface Class {
  id: number | null;
  specialty: Specialty | null;
  name: string | null;
  slug: string | null;
  courses: any[];
  students: any[];
  exams: any[];
  skillLevel: SkillLevel | null;
  subSystem: SubSystem | null;
  evaluations: any[];
}
