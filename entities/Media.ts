import { Course } from './Course';

export interface Media {
  id: number | null;
  videoUrl: string | null;
  mp4File: string | null;
  webMFile: string | null;
  oggFile: string | null;
  imageFile: string | null;
  course: Course | null;
}
