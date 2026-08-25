import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { signSupabaseToken } from '@/lib/supabase-admin';
import { handleApiError } from '@/lib/exceptions';
import { getSubjectChatForUser } from '@/lib/subject-chat';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const subjectChatId = Number.parseInt((await params).id, 10);
    if (!Number.isInteger(subjectChatId) || subjectChatId <= 0) {
      return NextResponse.json({ message: 'Invalid subject chat ID' }, { status: 400 });
    }

    const { principal, room } = await getSubjectChatForUser(subjectChatId, session.userId);
    if (!principal.canUseSubjectChat) {
      return NextResponse.json({ message: 'Subject chat requires an active premium entitlement', requiresPremium: true }, { status: 403 });
    }
    if (!room) return NextResponse.json({ message: 'Subject chat not found' }, { status: 404 });

    return NextResponse.json({
      token: signSupabaseToken({ id: session.userId, email: session.email, role: session.roles }),
      subjectChatId: room.id,
      expiresIn: 3600,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
