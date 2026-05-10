import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    const existing = await prisma.device.findFirst({
      where: { deviceTokenId: session.userId },
    });

    const device = existing
      ? await prisma.device.update({
          where: { id: existing.id },
          data: { token, updatedAt: new Date() },
        })
      : await prisma.device.create({
          data: {
            deviceTokenId: session.userId,
            token,
            createdAt: new Date(),
          },
        });

    return NextResponse.json({ data: device });
  } catch (error) {
    return handleApiError(error);
  }
}
