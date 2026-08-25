import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { ensureSubjectChatRooms, getSubjectChatPrincipal } from '@/lib/subject-chat';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const principal = await getSubjectChatPrincipal(session.userId);
    if (!principal.studentId) {
      return NextResponse.json({ message: 'A student profile is required for subject chat' }, { status: 403 });
    }
    if (!principal.canUseSubjectChat) {
      return NextResponse.json({ message: 'Subject chat requires an active premium entitlement', requiresPremium: true }, { status: 403 });
    }

    const rooms = await ensureSubjectChatRooms(principal.studentId);
    return NextResponse.json({
      data: rooms.map((room) => ({
        id: room.id,
        name: room.name,
        cycle: room.cycle,
        createdAt: room.createdAt,
        category: room.category,
        messageCount: room._count.messages,
        unreadCount: room.messages.length,
      })),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
