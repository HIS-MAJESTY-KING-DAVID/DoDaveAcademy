import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, phone, expertise, bio } = body;

    if (!email || !fullName || !expertise || !bio) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const user = email ? await prisma.user.findUnique({ where: { email } }) : null;
    if (!user) {
      return NextResponse.json({ message: 'No account found with this email. Please register first.' }, { status: 404 });
    }

    await prisma.contact.create({
      data: {
        userId: user.id,
        object: `Instructor Application - ${expertise}`,
        content: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nExpertise: ${expertise}\nBio: ${bio}`,
        createAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Application submitted successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
