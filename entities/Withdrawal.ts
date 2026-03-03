import { User } from './User';
import { PaymentMethod } from './PaymentMethod';

export interface Withdrawal {
  id: number | null;
  user: User | null;
  amount: number | null;
  isDone: boolean | null;
  phoneNumber: string | null;
  paymentMethod: PaymentMethod | null;
  createdAt: string | null;
  status: string | null;
  transactionReference: string | null;
}
