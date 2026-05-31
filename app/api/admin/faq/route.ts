import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const courseId = parseInt(formData.get('courseId') as string, 10);
  const question = formData.get('question') as string;
  const answer = formData.get('answer') as string;

  await prisma.faq.create({ data: { courseId, question, answer } });
  return NextResponse.redirect(new URL('/admin/faq', req.url));
}
