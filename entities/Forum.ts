import { Course } from './Course';

export interface Forum {
  id: number | null;
  course: Course | null;
  members: any[];
  subjects: any[];
}
