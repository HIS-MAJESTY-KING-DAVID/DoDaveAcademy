export interface Category {
  id: number | null;
  name: string | null;
  slug: string | null;
  courses: any[];
  imageFile: string | null;
  isSubCategory: boolean | null;
  category: Category | null;
  subCategories: any[];
  instructors: any[];
  exams: any[];
  evaluations: any[];
  subjectCycles: any[];
  subjectChats: any[];
}
