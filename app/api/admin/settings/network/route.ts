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

  const existing = await prisma.networkConfig.findFirst();

  const data = {
    pointsPerInvitation: parseInt(formData.get('pointsPerInvitation') as string, 10) || 0,
    instructorDistributionPercentage: parseFloat(formData.get('instructorDistributionPercentage') as string) || 0,
    studentDistributionPercentage: parseFloat(formData.get('studentDistributionPercentage') as string) || 0,
    exchangeRate: parseFloat(formData.get('exchangeRate') as string) || 0,
    minimumWithdrawable: parseFloat(formData.get('minimumWithdrawable') as string) || 0,
  };

  if (existing) {
    await prisma.networkConfig.update({ where: { id: existing.id }, data });
  } else {
    await prisma.networkConfig.create({ data });
  }

  return NextResponse.redirect(new URL('/admin/settings', req.url));
}
