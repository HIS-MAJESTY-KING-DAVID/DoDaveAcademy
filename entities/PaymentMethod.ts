export interface PaymentMethod {
  id: number | null;
  label: string | null;
  code: string | null;
  slug: string | null;
  payments: any[];
  courses: any[];
  subscriptions: any[];
  withdrawals: any[];
}
