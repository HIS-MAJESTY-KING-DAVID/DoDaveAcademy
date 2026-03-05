import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { userRegisterSchema } from '@/lib/validations/auth';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = userRegisterSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Generate random invitation code
    const invitationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: 'ROLE_USER',
        isVerified: false,
        cash: 0.0,
        person: {
          create: {
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || name.split(' ')[0],
            pseudo: name.split(' ')[0],
            bornAt: new Date(), // Default date, should be required from frontend
            gender: 'M', // Default, should be required from frontend
            invitationCode: invitationCode,
            invitationLink: `https://dodaveacademy.com/register?ref=${invitationCode}`,
          }
        }
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
