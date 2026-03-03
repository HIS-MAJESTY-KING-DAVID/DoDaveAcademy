import { User } from './User';

export interface Notification {
  id: number | null;
  createdAt: string | null;
  content: string | null;
  isRead: boolean | null;
  recipient: User | null;
  type: number | null;
  title: string | null;
}
