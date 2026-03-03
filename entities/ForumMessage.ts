export interface ForumMessage {
  id: number | null;
  membre: Membre | null;
  sujet: Sujet | null;
  createdAt: string | null;
  content: string | null;
  likes: number | null;
  isAnswer: boolean | null;
  forumMessage: self | null;
  forumMessages: any[];
  isResponse: boolean | null;
  likeMessageForums: any[];
}
