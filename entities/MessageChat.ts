export interface MessageChat {
  id: number | null;
  subjectChat: SubjectChat | null;
  content: string | null;
  sender: User | null;
  isFromAI: boolean | null;
  isRead: boolean | null;
  createAt: string | null;
  expiresAt: string | null;
  teacherPersona: Enseignant | null;
  isModerated: boolean | null;
  isDeleted: boolean | null;
}
