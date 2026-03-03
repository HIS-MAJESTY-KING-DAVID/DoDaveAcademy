import { prisma } from '@/lib/prisma';
import QuizRunner from '@/components/quiz/QuizRunner';
import { notFound } from 'next/navigation';

export default async function QuizPage({
  params
}: {
  params: Promise<{ courseSlug: string; chapterId: string }>;
}) {
  const { courseSlug, chapterId } = await params;

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
  const questions = chapter.quizzes.map(q => ({
    id: q.id,
    question: q.question,
    propositions: [
        q.proposition1,
        q.proposition2,
        q.proposition3,
        q.proposition4
    ].filter(Boolean) as string[],
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
        />
    </div>
  );
}
