import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { signSupabaseToken } from '@/lib/supabase-admin';
import SubjectChatWindow from '@/components/chat/SubjectChatWindow';

export default async function SubjectChatPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const supabaseToken = signSupabaseToken({
    id: session.userId,
    email: session.email,
    role: session.roles,
  });

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Subject Chat</h2>
          <p className="text-muted mb-0">Discuss your enrolled subjects in dedicated rooms.</p>
        </div>
        <a className="btn btn-outline-secondary" href="/dashboard/student/messages">Direct messages</a>
      </div>
      <SubjectChatWindow accessToken={supabaseToken} currentUserId={session.userId} />
    </div>
  );
}
