import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function GET() {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.roles?.includes('ROLE_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const name = formData.get('name') as string;
  const categoryId = formData.get('categoryId') as string;
  const imageFile = formData.get('imageFile') as string;

  const slug = slugify(name);
  const isSubCategory = !!categoryId;

  await prisma.category.create({
    data: {
      name,
      slug,
      categoryId: categoryId ? parseInt(categoryId, 10) : null,
      imageFile: imageFile || null,
      isSubCategory,
    },
  });

  return NextResponse.redirect(new URL('/admin/categories', req.url));
}
