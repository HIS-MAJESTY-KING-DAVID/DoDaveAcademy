import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, getSession } from '@/lib/auth';
import CourseEnrollmentClient from './CourseEnrollmentClient';

export default async function CourseEnrollmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession();
  if (!session) redirect('/login');
  const { slug } = await params;

  const [course, user] = await Promise.all([
    prisma.course.findFirst({ where: { slug, isPublished: true, isValidated: true }, include: { media: true, skillLevel: true } }),
    getCurrentUser(),
  ]);
  if (!course) notFound();

  const customerName = `${user?.person?.firstName || ''} ${user?.person?.lastName || ''}`.trim() || user?.email || '';
  const amount = course.subscriptionPrice || 0;

  return (
    <main className="container py-5">
      <div className="mb-4">
        <Link href={`/courses/${course.slug}`} className="text-decoration-none">← Back to course</Link>
        <h1 className="mt-3 mb-1">Enroll in {course.title}</h1>
        <p className="text-muted">Complete enrollment to start learning at DoDave Academy.</p>
      </div>
      <CourseEnrollmentClient
        courseId={course.id}
        courseSlug={course.slug}
        courseTitle={course.title}
        isFree={course.isFree}
        amount={amount}
        customerName={customerName}
        customerEmail={user?.email || ''}
      />
    </main>
  );
}
