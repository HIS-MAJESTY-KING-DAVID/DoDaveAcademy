import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.exam.update({
    where: { id: parseInt(id, 10) },
    data: { isValidated: true },
  });

  return NextResponse.redirect(new URL('/admin/exams', _req.url));
}
