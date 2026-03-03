export interface WebSocketConnection {
  id: number | null;
  user: User | null;
  subjectChat: SubjectChat | null;
  isTyping: boolean | null;
  lastActivity: DateTimeInterface | null;
}
