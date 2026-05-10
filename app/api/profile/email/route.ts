import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { person: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { compare } = await import('bcryptjs');
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.id !== session.userId) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
    }

    await prisma.user.update({
      where: { id: session.userId },
      data: { email },
    });

    const name = user.person?.firstName || user.email;
    await sendEmail({
      to: email,
      ...emailTemplates.changeEmail(name, `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/profile`),
    });

    return NextResponse.json({ message: 'Email updated successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
