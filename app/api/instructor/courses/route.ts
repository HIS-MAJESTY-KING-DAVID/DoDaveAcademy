import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { handleApiError } from '@/lib/exceptions';
import { z } from 'zod';

const createCourseSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  content: z.string().optional(),
  categoryId: z.number().optional(),
  skillLevelId: z.number().optional(),
  isFree: z.boolean().optional(),
  difficultyLevel: z.string().optional(),
  language: z.string().optional().default('fr'),
  tags: z.string().optional(),
  subscriptionPrice: z.number().optional(),
});

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const instructor = await prisma.instructor.findUnique({
      where: { userId: session.userId },
      include: {
        courses: {
          include: {
            category: true,
            skillLevel: true,
            media: true,
            _count: { select: { studentCourses: true, chapters: true, reviews: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!instructor) {
      return NextResponse.json({ message: 'Instructor not found' }, { status: 404 });
    }

    return NextResponse.json({ data: instructor.courses });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const instructor = await prisma.instructor.findUnique({
      where: { userId: session.userId },
    });

    if (!instructor) {
      return NextResponse.json({ message: 'Instructor not found' }, { status: 404 });
    }

    const body = await req.json();
    const data = createCourseSchema.parse(body);

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();

    const course = await prisma.course.create({
      data: {
        instructorId: instructor.id,
        title: data.title,
        slug,
        description: data.description,
        content: data.content || data.description,
        categoryId: data.categoryId,
        skillLevelId: data.skillLevelId,
        isFree: data.isFree ?? false,
        isPublished: false,
        isValidated: false,
        difficultyLevel: data.difficultyLevel || 'beginner',
        language: data.language,
        tags: data.tags,
        subscriptionPrice: data.subscriptionPrice,
        duration: '0h',
        views: 0,
        numberOfLessons: 0,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ data: course }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
