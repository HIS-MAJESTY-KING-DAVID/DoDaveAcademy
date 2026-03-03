import { Student } from './Student';
import { Subscription } from './Subscription';
import { Course } from './Course';
import { PaymentMethod } from './PaymentMethod';

export interface Payment {
  id: number | null;
  student: Student | null;
  subscription: Subscription | null;
  course: Course | null;
  paidAt: string | null;
  isExpired: boolean | null;
  expiredAt: string | null;
  paymentMethod: PaymentMethod | null;
  reference: string | null;
  amount: number | null;
  status: string | null;
  transactionReference: string | null;
}
