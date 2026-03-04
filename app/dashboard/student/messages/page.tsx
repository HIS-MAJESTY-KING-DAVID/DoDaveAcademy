
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ChatWindow from '@/components/chat/ChatWindow';

export default async function MessagesPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Messages</h2>
      <div className="alert alert-success mb-4">
        <i className="fas fa-check-circle me-2"></i>
        Real-time chat enabled via Supabase.
      </div>
      <ChatWindow />
    </div>
  );
}
