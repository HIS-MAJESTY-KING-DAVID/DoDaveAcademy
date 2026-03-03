export interface Investor {
  id: number | null;
  name: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  createAt: string | null;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  companyName: string | null;
  companyAddress: string | null;
  desiredInvestmentType: string | null;
  actions: any[];
  investmentAmount: string | null;
  cniNumber: string | null;
  expirationDate: string | null;
}
