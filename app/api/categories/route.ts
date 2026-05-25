import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        categoryId: null, // Fetch root categories
      },
      include: {
        categories: true, // Fetch subcategories
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    return handleApiError(error);
  }
}
