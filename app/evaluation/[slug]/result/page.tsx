import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EvaluationResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { slug } = await params;

  const student = await prisma.student.findUnique({ where: { userId: session.userId } });
  if (!student) redirect('/dashboard/student');

  const evaluation = await prisma.evaluation.findFirst({
    where: { slug },
    include: { category: true },
  });

  if (!evaluation) redirect('/dashboard/student');

  const result = await prisma.evaluationResult.findFirst({
    where: { evaluationId: evaluation.id, studentId: student.id },
  });

  if (!result) {
    redirect(`/evaluation/${slug}/begin`);
  }

  const passed = result.score >= 70;
  const questionCount = await prisma.evaluationQuestion.count({
    where: { evaluationId: evaluation.id },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
            {passed ? (
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <h1 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-700' : 'text-red-700'}`}>
            {passed ? 'Congratulations!' : 'Not Passed'}
          </h1>

          <p className="text-gray-600 mb-6">{evaluation.title}</p>

          <div className="text-5xl font-bold text-gray-800 mb-2">
            {Math.round(result.score)}%
          </div>
          <p className="text-sm text-gray-500 mb-6">
            {questionCount} questions
          </p>

          <div className="bg-gray-50 rounded p-4 mb-6 text-left text-sm text-gray-600">
            <p><strong>Category:</strong> {evaluation.category?.name || '-'}</p>
            <p><strong>Submitted:</strong> {result.evaluatedAt.toLocaleString()}</p>
            <p><strong>Pass mark:</strong> 70%</p>
          </div>

          <a
            href="/dashboard/student"
            className="inline-block px-6 py-3 bg-[var(--brand-primary)] text-white rounded-lg hover:opacity-90"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
