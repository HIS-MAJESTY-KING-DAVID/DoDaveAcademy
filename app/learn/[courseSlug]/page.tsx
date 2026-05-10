import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';

export default async function LearnCoursePage({
  params
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { courseSlug } = await params;

  const course = await prisma.course.findFirst({
    where: { slug: courseSlug },
    include: {
      chapters: {
        include: {
          lessons: { orderBy: { number: 'asc' } },
          quizzes: true,
        },
        orderBy: { number: 'asc' },
      },
      instructor: {
        include: { user: { include: { person: true } } },
      },
      media: true,
    },
  });

  if (!course) redirect('/dashboard/student');

  const firstLesson = course.chapters[0]?.lessons[0];

  if (firstLesson) {
    redirect(`/learn/${courseSlug}/${firstLesson.slug}`);
  }

  return (
    <div className="container-fluid px-0">
      <div className="text-center py-5">
        <h2>{course.title}</h2>
        <p className="text-muted">{course.description}</p>
        <div className="alert alert-warning">
          <i className="fas fa-info-circle me-2"></i>
          This course has no lessons yet.
        </div>
        <Link href="/dashboard/student" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
