export interface ChatMessage {
  id: number | null;
  student: Eleve | null;
  content: string | null;
  isFromAI: boolean | null;
  createdAt: string | null;
  subject: Categorie | null;
  isRead: boolean;
}
