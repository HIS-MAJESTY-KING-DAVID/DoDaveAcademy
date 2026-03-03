export interface Contact {
  id: number | null;
  object: string | null;
  content: string | null;
  createAt: string | null;
  user: User | null;
}
