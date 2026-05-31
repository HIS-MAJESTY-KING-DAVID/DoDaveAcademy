import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Learning Programs',
  description: 'Explore our comprehensive learning programs designed for deep mastery of specific fields. Start your career journey with DoDave Academy.',
};

export default async function ProgramsPage() {
  const programs = await prisma.training.findMany({
    where: { isPublished: true },
    include: {
      trainingCourses: {
        include: { course: { select: { title: true, slug: true } } },
      },
      _count: { select: { trainingStudents: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main>
      <section className="py-4">
        <div className="container">
          <div className="bg-light p-4 text-center rounded-3">
            <h1 className="m-0">Programs</h1>
            <p className="mb-0 mt-2">Explore our comprehensive learning programs</p>
            <div className="d-flex justify-content-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-dots mb-0">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Programs</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          {programs.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-graduation-cap fa-3x text-muted mb-3"></i>
              <p className="lead text-muted">No programs available yet. Check back soon!</p>
              <Link href="/courses" className="btn btn-primary">Browse Courses</Link>
            </div>
          ) : (
            <div className="row g-4">
              {programs.map((program) => (
                <div className="col-lg-6 col-xl-4" key={program.id}>
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body d-flex flex-column p-4">
                      <h5 className="card-title">{program.name}</h5>
                      <p className="card-text text-muted small flex-grow-1">{program.description}</p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary">{program.difficultyLevel}</span>
                        <small className="text-muted">
                          <i className="fas fa-clock me-1"></i> {program.duration}
                        </small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                          <i className="fas fa-book me-1"></i> {program.trainingCourses.length} courses
                        </small>
                        <small className="text-muted">
                          <i className="fas fa-user-graduate me-1"></i> {program._count.trainingStudents} students
                        </small>
                      </div>
                      {program.trainingCourses.length > 0 && (
                        <div className="mb-3">
                          <small className="text-muted fw-bold">Courses:</small>
                          <ul className="list-unstyled small mt-1">
                            {program.trainingCourses.map((tc) => (
                              <li key={tc.courseId}>
                                <i className="fas fa-check-circle text-success me-1"></i>
                                <Link href={`/courses/${tc.course?.slug}`} className="text-decoration-none">
                                  {tc.course?.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="d-grid mt-auto">
                        <Link href="/register" className="btn btn-outline-primary">Enroll in Program</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
