export interface Subscription {
  id: number | null;
  label: string | null;
  slug: string | null;
  amount: number | null;
  duration: number | null;
  payments: any[];
  isRecommended: boolean | null;
  items: any[];
  paymentMethods: any[];
  pointsCount: number | null;
}
