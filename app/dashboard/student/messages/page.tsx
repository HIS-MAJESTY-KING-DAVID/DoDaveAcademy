
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
      <div className="alert alert-info mb-4">
        <i className="fas fa-info-circle me-2"></i>
        Real-time chat is currently simulated via polling. Full real-time capabilities will be enabled once Supabase/Pusher keys are configured.
      </div>
      <ChatWindow />
    </div>
  );
}
