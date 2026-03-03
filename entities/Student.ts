import { Course } from './Course';
import { User } from './User';
import { Institution } from './Institution';

export interface Student {
  id: number | null;
  class: any | null; // To be renamed Class
  courses: any[];
  trainings: any[];
  answers: any[];
  user: User | null;
  institution: Institution | null;
  reference: string | null;
  reviews: any[];
  joinAt: string | null;
  payments: any[];
  isPremium: boolean | null;
  lectures: any[];
  quizResults: any[];
  quizLosts: any[];
  evaluations: any[];
  evaluationResults: any[];
  subjectChats: any[];
}
