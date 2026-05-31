import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const label = formData.get('label') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const duration = parseInt(formData.get('duration') as string, 10);
  const isRecommended = formData.get('isRecommended') === '1';

  const slug = slugify(label);

  await prisma.subscription.create({
    data: { label, slug, amount, duration, isRecommended },
  });

  return NextResponse.redirect(new URL('/admin/subscription-plans', req.url));
}
