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

  const existing = await prisma.siteSetting.findFirst();

  const data = {
    siteName: formData.get('siteName') as string || null,
    siteCopyrights: formData.get('siteCopyrights') as string || null,
    siteEmail: formData.get('siteEmail') as string || null,
    siteDescription: formData.get('siteDescription') as string || null,
    contactPhone: formData.get('contactPhone') as string || null,
    supportEmail: formData.get('supportEmail') as string || null,
    contactAddress: formData.get('contactAddress') as string || null,
    mainSiteUrl: formData.get('mainSiteUrl') as string || null,
    isMaintenanceMode: formData.get('isMaintenanceMode') === 'true',
    maintenanceText: formData.get('maintenanceText') as string || null,
  };

  if (existing) {
    await prisma.siteSetting.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteSetting.create({ data });
  }

  return NextResponse.redirect(new URL('/admin/settings', req.url));
}
