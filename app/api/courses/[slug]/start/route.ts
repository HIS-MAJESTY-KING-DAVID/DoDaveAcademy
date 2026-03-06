import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized', redirect: '/login' }, { status: 401 });
    }

    const { slug } = await params;

    // 1. Get Course with minimal data to find first lesson
    const course = await prisma.course.findFirst({
      where: { slug },
      include: {
        chapters: {
          orderBy: { number: 'asc' },
          include: {
            lessons: {
              orderBy: { number: 'asc' },
              take: 1
            }
          },
          take: 1
        }
      }
    });

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // 2. Check Enrollment
    const student = await prisma.student.findUnique({
      where: { userId: session.userId }
    });

    if (!student) {
       // Should theoretically not happen if user is logged in and we auto-create student profile on enroll, 
       // but strictly speaking, they might not be a student yet.
       return NextResponse.json({ message: 'Student profile not found' }, { status: 403 });
    }

    const enrollment = await prisma.studentCourse.findUnique({
      where: {
        studentId_courseId: {
          studentId: student.id,
          courseId: course.id
        }
      }
    });

    if (!enrollment) {
      return NextResponse.json({ 
        message: 'Not enrolled', 
        redirect: `/courses/${slug}` 
      }, { status: 403 });
    }

    // 3. Find Last Accessed Lesson
    const lastLecture = await prisma.lecture.findFirst({
      where: {
        studentId: student.id,
        courseId: course.id,
        lessonId: { not: null }
      },
      orderBy: { startAt: 'desc' },
      include: {
        lesson: true
      }
    });

    let redirectUrl = '';

    if (lastLecture && lastLecture.lesson) {
      redirectUrl = `/learn/${course.slug}/${lastLecture.lesson.slug}`;
    } else {
      // 4. Default to first lesson
      const firstChapter = course.chapters[0];
      const firstLesson = firstChapter?.lessons[0];

      if (firstLesson) {
        redirectUrl = `/learn/${course.slug}/${firstLesson.slug}`;
      } else {
        return NextResponse.json({ message: 'Course has no content yet' }, { status: 404 });
      }
    }

    return NextResponse.json({ redirect: redirectUrl });

  } catch (error) {
    console.error('Start course error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
