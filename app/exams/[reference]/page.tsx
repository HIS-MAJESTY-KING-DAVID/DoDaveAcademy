import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ reference: string }> }): Promise<Metadata> {
  const { reference } = await params;
  const exam = await prisma.exam.findFirst({
    where: { reference, isPublished: true },
    select: { title: true, reference: true },
  });

  if (!exam) return { title: 'Exam Not Found' };

  return {
    title: `${exam.title} (${exam.reference})`,
    description: `Official exam paper and corrections for ${exam.title}. Reference: ${exam.reference}. Prepare for your certifications with DoDave Academy.`,
  };
}

function isPrivilegedRole(roles: string) {
  return roles.includes('ROLE_ADMIN') || roles.includes('ROLE_INSTRUCTOR');
}

export default async function ExamDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { reference } = await params;
  const resolvedSearchParams = await searchParams;
  const display =
    typeof resolvedSearchParams.display === 'string' &&
    resolvedSearchParams.display === 'correction'
      ? 'correction'
      : 'subject';

  const exam = await prisma.exam.findFirst({
    where: { reference, isPublished: true },
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
    return (
      <div className="container py-5">
        <div className="alert alert-danger mb-0">Exam not found.</div>
      </div>
    );
  }

  const privilegedUser = isPrivilegedRole(session.roles) || exam.userId === session.userId;
  let hasPremiumAccess = privilegedUser;

  if (!hasPremiumAccess) {
    const student = await prisma.student.findUnique({
      where: { userId: session.userId },
      select: { isPremium: true },
    });
    hasPremiumAccess = student?.isPremium === true;
  }

  const selectedFile = display === 'correction' ? exam.correction : exam.subject;

  return (
    <main className="py-4">
      <section>
        <div className="container">
          <div className="bg-light p-4 rounded-3 mb-4">
            <div className="d-flex justify-content-between flex-wrap gap-2">
              <div>
                <h1 className="h3 mb-1">{exam.title}</h1>
                <p className="text-muted mb-0">{exam.description}</p>
              </div>
              <div className="text-md-end">
                <div className="small text-muted">Reference: {exam.reference}</div>
                <div className="small text-muted">
                  Published: {new Date(exam.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {exam.category?.name && (
                <span className="badge bg-primary bg-opacity-10 text-primary">
                  {exam.category.name}
                </span>
              )}
              {exam.class?.name && (
                <span className="badge bg-light text-dark border">{exam.class.name}</span>
              )}
              {exam.class?.skillLevel?.name && (
                <span className="badge bg-light text-dark border">
                  {exam.class.skillLevel.name}
                </span>
              )}
              <span className="badge bg-light text-dark border">{exam.language}</span>
              {exam.duration && (
                <span className="badge bg-light text-dark border">{exam.duration}</span>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-3">
              <div className="small text-muted">
                Author: {exam.user?.person?.pseudo || exam.user?.email || 'Unknown'}
              </div>
              <div className="btn-group" role="group" aria-label="Display mode">
                <Link
                  href={`/exams/${exam.reference}?display=subject`}
                  className={`btn btn-sm ${display === 'subject' ? 'btn-primary' : 'btn-outline-primary'}`}
                >
                  Subject
                </Link>
                <Link
                  href={`/exams/${exam.reference}?display=correction`}
                  className={`btn btn-sm ${display === 'correction' ? 'btn-primary' : 'btn-outline-primary'}`}
                >
                  Correction
                </Link>
              </div>
            </div>
          </div>

          {!hasPremiumAccess ? (
            <div className="alert alert-warning">
              Premium access is required to view this exam.
              <Link href="/plan" className="ms-2 alert-link">
                Upgrade your plan
              </Link>
            </div>
          ) : !selectedFile ? (
            <div className="alert alert-info">
              No {display === 'subject' ? 'subject' : 'correction'} file is available for this exam.
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body">
                <iframe
                  title={`${exam.title} ${display}`}
                  src={`/api/exams/file/${encodeURIComponent(selectedFile)}`}
                  className="w-100 rounded border"
                  style={{ minHeight: '75vh' }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
