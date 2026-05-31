import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const courseId = parseInt(id);
    await prisma.course.update({
      where: { id: courseId },
      data: { isValidated: true, isPublished: true },
    });
    return NextResponse.redirect(new URL('/admin/courses', req.url));
  } catch {
    return NextResponse.json({ message: 'Failed to validate course' }, { status: 500 });
  }
}
