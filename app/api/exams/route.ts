import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
    const limit = Math.max(1, Number.parseInt(searchParams.get('limit') || '9', 10) || 9);
    const search = (searchParams.get('search') || '').trim();
    const categoryId = Number.parseInt(searchParams.get('categoryId') || '', 10) || undefined;
    const classId = Number.parseInt(searchParams.get('classId') || '', 10) || undefined;
    const levelId = Number.parseInt(searchParams.get('levelId') || '', 10) || undefined;
    const language = (searchParams.get('language') || '').trim() || undefined;

    const where: Prisma.ExamWhereInput = {
      isPublished: true,
    };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { reference: { contains: search } },
      ];
    }

    if (categoryId) where.categoryId = categoryId;
    if (classId) where.classId = classId;
    if (language) where.language = { equals: language };
    if (levelId) where.class = { is: { skillLevelId: levelId } };

    const skip = (page - 1) * limit;

    const [exams, total] = await Promise.all([
      prisma.exam.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          class: {
            include: {
              skillLevel: true,
            },
          },
          user: {
            include: {
              person: true,
            },
          },
        },
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      prisma.exam.count({ where }),
    ]);

    const data = exams.map((exam) => ({
      id: exam.id,
      reference: exam.reference,
      title: exam.title,
      description: exam.description,
      duration: exam.duration,
      imageFile: exam.imageFile,
      language: exam.language,
      publishedAt: exam.publishedAt,
      category: exam.category
        ? {
            id: exam.category.id,
            name: exam.category.name,
            slug: exam.category.slug,
          }
        : null,
      class: exam.class
        ? {
            id: exam.class.id,
            name: exam.class.name,
            slug: exam.class.slug,
            skillLevel: exam.class.skillLevel
              ? {
                  id: exam.class.skillLevel.id,
                  name: exam.class.skillLevel.name,
                }
              : null,
          }
        : null,
      author: exam.user
        ? {
            id: exam.user.id,
            pseudo: exam.user.person?.pseudo || null,
          }
        : null,
      hasSubject: Boolean(exam.subject),
      hasCorrection: Boolean(exam.correction),
    }));

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
