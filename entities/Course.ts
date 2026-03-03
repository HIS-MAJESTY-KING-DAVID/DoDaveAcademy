import { Instructor } from './Instructor';
import { Category } from './Category';
import { Media } from './Media';
import { Forum } from './Forum';
import { SkillLevel } from './SkillLevel';

export interface Course {
  id: number | null;
  classe: any[]; // To be renamed Class
  title: string | null;
  slug: string | null;
  content: string | null;
  description: string | null;
  isPublished: boolean | null;
  isFree: boolean | null;
  chapters: any[];
  instructor: Instructor | null;
  students: any[];
  formations: any[]; // To be renamed Training
  difficultyLevel: string | null;
  duration: string | null;
  createdAt: string | null;
  views: number | null;
  isValidated: boolean | null;
  likes: any[];
  subscriptionPrice: number | null;
  category: Category | null;
  media: Media | null;
  forum: Forum | null;
  faqs: any[];
  language: string | null;
  numberOfLessons: number | null;
  tags: string | null;
  isRejected: boolean | null;
  reviews: any[];
  review: number | null;
  updatedAt: string | null;
  payments: any[];
  paymentMethods: any[];
  lectures: any[];
  quizzes: any[];
  publishedAt: string | null;
  quizLosts: any[];
  skillLevel: SkillLevel | null;
}
