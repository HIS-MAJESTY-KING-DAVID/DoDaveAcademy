import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { z } from 'zod';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: { recipientId: session.userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const unreadCount = await prisma.notification.count({
      where: { recipientId: session.userId, isRead: false },
    });

    return NextResponse.json({ data: notifications, unreadCount });
  } catch (error) {
    return handleApiError(error);
  }
}

const createNotificationSchema = z.object({
  recipientId: z.number(),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(2000),
  type: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const data = createNotificationSchema.parse(body);

    const notification = await prisma.notification.create({
      data: {
        recipientId: data.recipientId,
        title: data.title,
        content: data.content,
        type: data.type || 0,
        isRead: false,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ data: notification }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
