import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/exceptions';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    const exam = await prisma.exam.findFirst({
      where: {
        reference,
        isPublished: true,
      },
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
    });

    if (!exam) {
      return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
    }

    return NextResponse.json({
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
    });
  } catch (error) {
    return handleApiError(error);
  }
}
