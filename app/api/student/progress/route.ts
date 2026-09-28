import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { progressSchema } from '@/lib/validations/student';
import { handleApiError } from '@/lib/exceptions';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { lessonId, courseId, chapterId, isFinished } = progressSchema.parse(await req.json());
    const student = await prisma.student.findUnique({ where: { userId: session.userId }, select: { id: true } });
    if (!student) return NextResponse.json({ message: 'Student profile not found' }, { status: 404 });

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId }, include: { chapter: { include: { course: true } } } });
    if (!lesson || !lesson.chapter?.courseId || !lesson.chapter.course) return NextResponse.json({ message: 'Lesson not found' }, { status: 404 });
    if (courseId && lesson.chapter.courseId !== courseId) return NextResponse.json({ message: 'Lesson does not belong to this course' }, { status: 400 });
    if (chapterId && lesson.chapterId !== chapterId) return NextResponse.json({ message: 'Lesson does not belong to this chapter' }, { status: 400 });

    const enrollment = await prisma.studentCourse.findUnique({ where: { studentId_courseId: { studentId: student.id, courseId: lesson.chapter.courseId } } });
    if (!enrollment) return NextResponse.json({ message: 'Enroll in this course first' }, { status: 403 });

    const finished = isFinished === true;
    const lecture = await prisma.lecture.findFirst({ where: { studentId: student.id, lessonId, courseId: lesson.chapter.courseId } });
    if (lecture) {
      await prisma.lecture.update({ where: { id: lecture.id }, data: { isFinished: finished || lecture.isFinished, endAt: finished ? new Date() : lecture.endAt, chapterId: lesson.chapterId, courseId: lesson.chapter.courseId } });
    } else {
      await prisma.lecture.create({ data: { studentId: student.id, lessonId, chapterId: lesson.chapterId, courseId: lesson.chapter.courseId, startAt: new Date(), isFinished: finished, endAt: finished ? new Date() : null, reference: `LECT-${Date.now().toString(36)}` } });
    }

    let nextUrl: string | null = null;
    if (finished) {
      const nextLesson = await prisma.lesson.findFirst({ where: { chapterId: lesson.chapterId, number: { gt: lesson.number ?? -1 } }, orderBy: { number: 'asc' } });
      if (nextLesson) nextUrl = `/learn/${lesson.chapter.course.slug}/${nextLesson.slug}`;
      else {
        const nextChapter = await prisma.chapter.findFirst({ where: { courseId: lesson.chapter.courseId, number: { gt: lesson.chapter.number ?? -1 } }, orderBy: { number: 'asc' }, include: { lessons: { orderBy: { number: 'asc' }, take: 1 }, quizzes: { select: { id: true }, take: 1 } } });
        if (nextChapter?.lessons[0]) nextUrl = `/learn/${lesson.chapter.course.slug}/${nextChapter.lessons[0].slug}`;
        else if (nextChapter?.quizzes.length) nextUrl = `/learn/${lesson.chapter.course.slug}/quiz/${nextChapter.id}`;
        else nextUrl = `/learn/${lesson.chapter.course.slug}`;
      }
    }

    return NextResponse.json({ message: 'Progress updated', nextUrl }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
