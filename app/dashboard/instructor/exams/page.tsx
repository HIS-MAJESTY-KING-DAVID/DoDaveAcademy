import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function InstructorExamsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const instructor = await prisma.instructor.findUnique({
    where: { userId: session.userId },
    include: {
      user: {
        include: {
          exams: {
            include: { category: true, class: true },
            orderBy: { publishedAt: 'desc' },
          },
        },
      },
    },
  });

  if (!instructor) {
    return (
      <div className="container py-4">
        <h2 className="mb-4">Exam</h2>
        <div className="alert alert-info">No instructor profile found.</div>
      </div>
    );
  }

  const exams = instructor.user?.exams || [];

  return (
    <div className="container py-4">
      <h2 className="mb-4">Exam</h2>

      {exams.length === 0 ? (
        <div className="alert alert-info">No exams found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Class</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id}>
                  <td>
                    <Link href={`/exams/${exam.reference}`} className="text-decoration-none">
                      {exam.title}
                    </Link>
                  </td>
                  <td>{exam.subject}</td>
                  <td>{exam.category?.name || 'N/A'}</td>
                  <td>{exam.class?.name || 'N/A'}</td>
                  <td>{exam.duration}</td>
                  <td>
                    {exam.isPublished ? (
                      exam.isValidated ? (
                        <span className="badge bg-success">Published</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Pending</span>
                      )
                    ) : (
                      <span className="badge bg-secondary">Draft</span>
                    )}
                  </td>
                  <td>{new Date(exam.publishedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
