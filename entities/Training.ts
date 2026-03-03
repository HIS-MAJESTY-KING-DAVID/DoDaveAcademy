export interface Training {
  id: number | null;
  name: string | null;
  slug: string | null;
  description: string | null;
  duration: string | null;
  difficultyLevel: string | null;
  isFree: boolean | null;
  courses: any[];
  students: any[];
  createdAt: string | null;
  isPublished: boolean | null;
  image: string | null;
}
