
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CreateSubjectModal from '@/components/forum/CreateSubjectModal';
import Link from 'next/link';

export default async function ForumPage({
  params
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { courseSlug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      forum: {
        include: {
          subjects: {
            include: {
              member: {
                include: {
                  user: {
                    include: {
                      person: true
                    }
                  }
                }
              },
              _count: {
                select: { forumMessages: true }
              }
            },
            orderBy: { createdAt: 'desc' }
          }
        }
      }
    }
  });

  if (!course) redirect('/dashboard/student');

  // Verify enrollment (optional, but good practice if not checked in layout)
  // Layout handles basic access, but double check doesn't hurt.
  // Actually, layout redirects if not enrolled. So we are safe here.

  const subjects = course.forum?.subjects || [];

  return (
    <div className="container-fluid px-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 className="h3 mb-0">Discussion Forum</h2>
            <p className="text-muted small mb-0">Ask questions and discuss with your peers and instructor.</p>
        </div>
        <CreateSubjectModal courseSlug={courseSlug} />
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-5 bg-light rounded">
          <i className="fas fa-comments fa-3x text-muted mb-3"></i>
          <p className="lead text-muted">No discussions yet.</p>
          <p>Be the first to start a conversation!</p>
        </div>
      ) : (
        <div className="list-group shadow-sm">
          {subjects.map((subject) => (
            <Link 
                href={`/learn/${courseSlug}/forum/${subject.id}`} 
                key={subject.id}
                className="list-group-item list-group-item-action p-4 border-0 border-bottom"
            >
              <div className="d-flex w-100 justify-content-between mb-2">
                <h5 className="mb-1 text-primary">{subject.content.length > 100 ? subject.content.substring(0, 100) + '...' : subject.content}</h5>
                <small className="text-muted">
                    {new Date(subject.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                      <div className="avatar rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" style={{ width: 32, height: 32 }}>
                          {subject.member?.user?.person?.pseudo?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <small className="text-muted">
                          By {subject.member?.user?.person?.pseudo || 'Unknown User'}
                          {subject.isSolved && <span className="badge bg-success ms-2">Solved</span>}
                      </small>
                  </div>
                  <div>
                      <span className="badge bg-light text-dark border me-2">
                          <i className="fas fa-comment me-1"></i> {subject._count.forumMessages} Replies
                      </span>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
