import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        person: true,
        student: true,
        instructor: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, pseudo, phoneNumber, address, gender, aboutMe } = body;

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { person: true, instructor: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.person) {
      await prisma.person.update({
        where: { id: user.person.id },
        data: {
          ...(firstName !== undefined && { firstName }),
          ...(lastName !== undefined && { lastName }),
          ...(pseudo !== undefined && { pseudo }),
          ...(phoneNumber !== undefined && { phoneNumber }),
          ...(address !== undefined && { address }),
          ...(gender !== undefined && { gender }),
          updateAt: new Date(),
        },
      });
    }

    if (aboutMe !== undefined && user.instructor) {
      await prisma.instructor.update({
        where: { id: user.instructor.id },
        data: { aboutMe },
      });
    }

    return NextResponse.json({ message: 'Profile updated' });
  } catch (error) {
    return handleApiError(error);
  }
}
