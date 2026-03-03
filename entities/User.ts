import { Student } from './Student';
import { Instructor } from './Instructor';
import { Person } from './Person';

export interface User {
  id: number | null;
  email: string | null;
  username: string | null;
  phoneNumber: string | null;
  roles: any[];
  password: string | null;
  notifications: any[];
  student: Student | null;
  instructor: Instructor | null;
  likes: any[];
  isVerified: boolean | null;
  person: Person | null;
  isBlocked: boolean | null;
  isAdmin: boolean | null;
  exams: any[];
  notificationSettings: any[];
  majors: any[];
  points: number | null;
  withdrawals: any[];
  cash: number | null;
  devices: any[];
  contacts: any[];
  messageChats: any[];
  webSocketConnections: any[];
}
