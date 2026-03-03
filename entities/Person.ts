import { User } from './User';
import { Country } from './Country';

export interface Person {
  id: number | null;
  lastName: string | null;
  firstName: string | null;
  pseudo: string | null;
  bornAt: string | null;
  placeOfBirth: string | null;
  gender: string | null;
  avatar: string | null;
  address: string | null;
  phoneNumber: string | null;
  user: User | null;
  invitationCode: string | null;
  invitationLink: string | null;
  parent: Person | null;
  invites: any[];
  country: Country | null;
  contentUrl: string | null;
  joinAt: string | null;
  updatedAt: string | null;
}
