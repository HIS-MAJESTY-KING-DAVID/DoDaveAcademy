import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, phone, expertise, bio } = body;

    if (!email || !fullName || !expertise || !bio) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Store the application in a contact record for now
    await prisma.contact.create({
      data: {
        userId: 0,
        object: `Instructor Application - ${expertise}`,
        content: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nExpertise: ${expertise}\nBio: ${bio}`,
        createAt: new Date(),
      },
    });

    return NextResponse.json({ message: 'Application submitted successfully' });
  } catch {
    return NextResponse.json({ message: 'Failed to submit application' }, { status: 500 });
  }
}
