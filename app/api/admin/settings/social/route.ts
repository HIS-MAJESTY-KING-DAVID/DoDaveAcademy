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
  const name = formData.get('name') as string;
  const link = formData.get('link') as string;
  const icon = formData.get('icon') as string;

  await prisma.socialSetting.create({ data: { name, link, icon } });

  return NextResponse.redirect(new URL('/admin/settings', req.url));
}
