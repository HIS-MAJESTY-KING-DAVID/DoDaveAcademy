import { Course } from './Course';
import { User } from './User';
import { Institution } from './Institution';
import { Category } from './Category';

export interface Instructor {
  id: number | null;
  courses: any[];
  user: User | null;
  institution: Institution | null;
  reference: string | null;
  diploma: string | null;
  rectoCNI: string | null;
  versoCNI: string | null;
  selfieCNI: string | null;
  timeTable: string | null;
  isValidated: boolean | null;
  details: string | null;
  isRejected: boolean | null;
  review: number | null;
  joinAt: string | null;
  discipline: Category | null;
  aboutMe: string | null;
  isCertified: boolean | null;
  evaluations: any[];
  subjectChats: any[];
  messageChats: any[];
}
