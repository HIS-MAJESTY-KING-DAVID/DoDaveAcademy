import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const course = await prisma.course.findFirst({
      where: {
        slug: slug,
        isPublished: true,
      },
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
        media: true,
        chapters: {
          include: {
            lessons: true,
          },
          orderBy: {
            number: 'asc',
          },
        },
        reviews: {
          include: {
            student: {
              include: {
                user: {
                  include: {
                    person: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
        faqs: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { message: 'Error fetching course' },
      { status: 500 }
    );
  }
}
