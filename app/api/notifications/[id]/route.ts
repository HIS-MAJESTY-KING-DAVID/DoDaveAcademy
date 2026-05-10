import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const notifId = parseInt(id);
    if (isNaN(notifId)) {
      return NextResponse.json({ message: 'Invalid notification ID' }, { status: 400 });
    }

    const { isRead } = await req.json();

    const notification = await prisma.notification.findUnique({
      where: { id: notifId },
    });

    if (!notification || notification.recipientId !== session.userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const updated = await prisma.notification.update({
      where: { id: notifId },
      data: { isRead },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const notifId = parseInt(id);
    if (isNaN(notifId)) {
      return NextResponse.json({ message: 'Invalid notification ID' }, { status: 400 });
    }

    const notification = await prisma.notification.findUnique({
      where: { id: notifId },
    });

    if (!notification || notification.recipientId !== session.userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await prisma.notification.delete({ where: { id: notifId } });

    return NextResponse.json({ message: 'Notification deleted' });
  } catch (error) {
    return handleApiError(error);
  }
}
