import { Chapter } from './Chapter';

export interface Lesson {
  id: number | null;
  chapter: Chapter | null;
  title: string | null;
  slug: string | null;
  content: string | null;
  videoLink: string | null;
  lectures: any[];
  number: number | null;
  poster: string | null;
  updatedAt: string | null;
}
