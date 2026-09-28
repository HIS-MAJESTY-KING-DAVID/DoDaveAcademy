import { randomBytes } from 'crypto';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { userRegisterSchema } from '@/lib/validations/auth';
import { contacts } from '@/lib/contacts';
import { handleApiError } from '@/lib/exceptions';
import { rateLimit, rateLimitResponse, getClientIp } from '@/lib/rate-limit';
import { sendEmail, emailTemplates } from '@/lib/email';

async function generateInvitationCode() {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = randomBytes(4).toString('base64url').replace(/[^A-Z0-9]/gi, '').slice(0, 6).toUpperCase();
    if (code.length < 6) continue;

    const existing = await prisma.person.findUnique({
      where: { invitationCode: code },
      select: { id: true },
    });
    if (!existing) return code;
  }

  throw new Error('Unable to generate a unique invitation code');
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rl = rateLimit(`register:${ip}`, { max: 3, windowMs: 15 * 60 * 1000 });
    if (!rl.success) return rateLimitResponse(rl.headers);

    const body = await req.json();
    const { name, email, password, referralCode } = userRegisterSchema.parse(body);
    const normalizedReferralCode = referralCode || undefined;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    let parentId: number | undefined;
    if (normalizedReferralCode) {
      const parent = await prisma.person.findUnique({
        where: { invitationCode: normalizedReferralCode },
        select: { id: true },
      });
      if (!parent) {
        return NextResponse.json({ message: 'Invalid referral code' }, { status: 400 });
      }
      parentId = parent.id;
    }

    const hashedPassword = await hash(password, 12);
    const invitationCode = await generateInvitationCode();
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || name;
    const lastName = nameParts.slice(1).join(' ') || firstName;
    const joinAt = new Date();

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: 'ROLE_USER',
        isVerified: false,
        cash: 0,
        points: 0,
        person: {
          create: {
            firstName,
            lastName,
            pseudo: firstName,
            bornAt: joinAt,
            gender: 'M',
            invitationCode,
            invitationLink: `${contacts.domain}/register?ref=${invitationCode}`,
            joinAt,
            ...(parentId ? { parent: { connect: { id: parentId } } } : {}),
          },
        },
      },
    });

    sendEmail({
      to: email,
      ...emailTemplates.welcome(firstName),
    }).catch((err) => console.error('[WELCOME EMAIL FAILED]', err));

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: { id: user.id, email: user.email },
        referral: normalizedReferralCode ? { accepted: true } : { accepted: false },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
