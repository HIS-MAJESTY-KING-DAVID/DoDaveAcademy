import { Member } from './Member';
import { Forum } from './Forum';

export interface Subject {
  id: number | null;
  forumMessages: any[];
  member: Member | null;
  forum: Forum | null;
  content: string | null;
  isSolved: boolean | null;
  createdAt: string | null;
  reference: string | null;
}
