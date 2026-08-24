import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';
import { contacts } from '@/lib/contacts';
import { sendEmail } from '@/lib/email';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] || character);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (name.length > 120 || email.length > 254 || message.length > 5000 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid contact details' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    const content = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    if (user) {
      await prisma.contact.create({
        data: {
          userId: user.id,
          object: `Contact from ${name}`,
          content,
          createAt: new Date(),
        },
      });
    } else {
      await sendEmail({
        to: contacts.email,
        subject: `Website contact from ${name}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
      });
    }

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
