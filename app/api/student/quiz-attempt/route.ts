import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { quizAttemptSchema } from '@/lib/validations/student';
import { handleApiError } from '@/lib/exceptions';

function normalizeAnswer(value: string | string[] | undefined) {
  const values = Array.isArray(value) ? value : value === undefined ? [] : [value];
  return [...new Set(values.map(String).map((item) => item.trim()).filter(Boolean))].sort();
}

function correctIndexes(quiz: { correctPropositions: string; propositions: { content: string; isTrue: boolean }[] }) {
  const configured = quiz.correctPropositions
    .split(',')
    .map((value) => value.trim())
    .filter((value) => ['1', '2', '3', '4'].includes(value));
  if (configured.length) return configured.sort();
  return quiz.propositions.map((proposition, index) => proposition.isTrue ? String(index + 1) : '').filter(Boolean).sort();
}

function answerIndexes(quiz: { proposition1: string | null; proposition2: string | null; proposition3: string | null; proposition4: string | null }, answer: string | string[] | undefined) {
  const values = normalizeAnswer(answer);
  const labels = [quiz.proposition1, quiz.proposition2, quiz.proposition3, quiz.proposition4];
  return values.map((value) => {
    if (/^[1-4]$/.test(value)) return value;
    const index = labels.findIndex((label) => label === value);
    return index >= 0 ? String(index + 1) : value;
  }).sort();
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { chapterId, answers } = quizAttemptSchema.parse(await req.json());
    const student = await prisma.student.findUnique({ where: { userId: session.userId } });
    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { quizzes: { include: { propositions: true } }, course: true },
    });
    if (!chapter) return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });
    if (!chapter.courseId) return NextResponse.json({ message: 'Quiz course is not configured' }, { status: 409 });

    const enrollment = await prisma.studentCourse.findUnique({ where: { studentId_courseId: { studentId: student.id, courseId: chapter.courseId } } });
    if (!enrollment) return NextResponse.json({ message: 'Enroll in this course before taking its quiz' }, { status: 403 });

    const existingAttempt = await prisma.quizLost.findFirst({ where: { studentId: student.id, chapterId } });
    if (existingAttempt && !existingAttempt.isOk && existingAttempt.nextAt > new Date()) {
      const waitSeconds = Math.max(1, Math.ceil((existingAttempt.nextAt.getTime() - Date.now()) / 1000));
      return NextResponse.json({ message: `Please wait ${waitSeconds}s before retrying`, cooldown: true, retryAfter: existingAttempt.nextAt }, { status: 429 });
    }

    const results = chapter.quizzes.map((quiz) => {
      const submitted = answerIndexes(quiz, answers[String(quiz.id)]);
      const expected = correctIndexes(quiz);
      const isCorrect = submitted.length === expected.length && submitted.every((value, index) => value === expected[index]);
      return { quizId: quiz.id, studentId: student.id, result: submitted.join(','), isCorrect, score: isCorrect ? 1 : 0, createdAt: new Date(), updatedAt: new Date() };
    });

    const correctCount = results.filter((result) => result.isCorrect).length;
    const total = results.length;
    const percentage = total ? (correctCount / total) * 100 : 0;
    const isPassed = percentage >= 50;
    const nextAt = new Date(Date.now() + (isPassed ? 0 : 10_000));

    await prisma.$transaction(async (tx) => {
      if (results.length) await Promise.all(results.map((result) => tx.quizResult.create({ data: result })));
      if (existingAttempt) {
        await tx.quizLost.update({ where: { id: existingAttempt.id }, data: { attempt: { increment: 1 }, lastAt: new Date(), nextAt, isOk: isPassed } });
      } else {
        await tx.quizLost.create({ data: { studentId: student.id, chapterId, courseId: chapter.courseId, attempt: 1, lastAt: new Date(), nextAt, isOk: isPassed } });
      }
      if (isPassed) {
        const lecture = await tx.lecture.findFirst({ where: { studentId: student.id, chapterId, lessonId: null } });
        if (lecture) await tx.lecture.update({ where: { id: lecture.id }, data: { isFinished: true, endAt: new Date(), note: percentage } });
        else await tx.lecture.create({ data: { studentId: student.id, chapterId, courseId: chapter.courseId, startAt: new Date(), endAt: new Date(), isFinished: true, note: percentage } });
      }
    });

    return NextResponse.json({ score: correctCount, total, percentage, isPassed, retryAfter: isPassed ? null : nextAt, results: results.map((result) => ({ quizId: result.quizId, result: result.result, isCorrect: result.isCorrect })) });
  } catch (error) {
    return handleApiError(error);
  }
}
