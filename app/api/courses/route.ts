import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId');
  const levelId = searchParams.get('levelId');
  const isFree = searchParams.get('isFree');
  
  const skip = (page - 1) * limit;

  const where: Prisma.CourseWhereInput = {
    isPublished: true,
    isValidated: true,
    isRejected: false, // Assuming null or false means not rejected
  };

  if (search) {
    where.OR = [
      { title: { contains: search } }, // Case insensitive by default in MySQL mostly, but Prisma depends on collation
      { description: { contains: search } },
    ];
  }

  if (categoryId) {
    where.categoryId = parseInt(categoryId);
  }

  if (levelId) {
    where.skillLevelId = parseInt(levelId);
  }

  if (isFree !== null && isFree !== undefined) {
    where.isFree = isFree === 'true';
  }

  try {
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        include: {
          instructor: {
            include: {
              user: {
                include: {
                  person: true,
                },
              },
            },
          },
          category: true,
          skillLevel: true,
          chapters: {
            include: {
              lessons: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { message: 'Error fetching courses' },
      { status: 500 }
    );
  }
}
