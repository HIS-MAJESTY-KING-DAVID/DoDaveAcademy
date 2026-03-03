import { User } from './User';

export interface Member {
  id: number | null;
  forums: any[];
  forumMessages: any[];
  subjects: any[];
  user: User | null;
  likeMessageForums: any[];
}
