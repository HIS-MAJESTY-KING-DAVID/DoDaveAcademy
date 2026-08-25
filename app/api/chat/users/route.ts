import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const users = await prisma.user.findMany({
      where: {
        id: { not: session.userId },
        OR: [{ isBlocked: false }, { isBlocked: null }],
      },
      select: {
        id: true,
        roles: true,
        person: {
          select: {
            pseudo: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { id: 'asc' },
      take: 50,
    });

    return NextResponse.json({ data: users });
  } catch (error) {
    return handleApiError(error);
  }
}
