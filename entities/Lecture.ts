export interface Lecture {
  id: number | null;
  eleve: Eleve | null;
  lesson: Lesson | null;
  startAt: string | null;
  endAt: string | null;
  isFinished: boolean | null;
  reference: string | null;
  chapitre: Chapitre | null;
  cours: Cours | null;
  note: number | null;
}
