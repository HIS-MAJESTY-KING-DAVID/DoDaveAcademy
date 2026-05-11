import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Find user by email if exists, otherwise store with userId 0
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });

    await prisma.contact.create({
      data: {
        userId: user?.id || 0,
        object: `Contact from ${name}`,
        content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        createAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch {
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
}
