import { prisma } from '@/lib/prisma';
import QuizRunner from '@/components/quiz/QuizRunner';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function QuizPage({
  params
}: {
  params: Promise<{ courseSlug: string; chapterId: string }>;
}) {
  const { courseSlug, chapterId } = await params;
  const session = await getSession();
  if (!session) redirect('/login');

  const chapter = await prisma.chapter.findUnique({
    where: { id: Number(chapterId) },
    include: {
        quizzes: true,
        course: {
            select: { slug: true }
        }
    }
  });

  if (!chapter || chapter.course?.slug !== courseSlug) notFound();

  // Map quizzes to client format
  const student = await prisma.student.findUnique({ where: { userId: session.userId }, select: { id: true } });
  if (!student || !chapter.courseId) redirect('/dashboard/student');
  const enrollment = await prisma.studentCourse.findUnique({ where: { studentId_courseId: { studentId: student.id, courseId: chapter.courseId } } });
  if (!enrollment) redirect(`/courses/${courseSlug}/enroll`);

  const attempt = await prisma.quizLost.findFirst({ where: { studentId: student.id, chapterId: chapter.id } });
  const questions = chapter.quizzes.map(q => ({
    id: q.id,
    question: q.question,
    multi: q.correctPropositions.split(',').filter(Boolean).length > 1,
    propositions: [q.proposition1, q.proposition2, q.proposition3, q.proposition4]
      .map((content, index) => content ? { index: String(index + 1), content } : null)
      .filter((value): value is { index: string; content: string } => Boolean(value)),
  }));

  if (questions.length === 0) {
      return <div className="alert alert-info">No questions in this quiz.</div>;
  }

  return (
    <div className="container">
        <h2 className="mb-4">Quiz: {chapter.title}</h2>
        <QuizRunner 
            questions={questions}
            chapterId={chapter.id}
            initialCooldownUntil={attempt && !attempt.isOk ? attempt.nextAt.toISOString() : null}
        />
    </div>
  );
}
