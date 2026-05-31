import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Community Forum',
  description: 'Join the discussion with other students and instructors. Ask questions, share knowledge, and learn together.',
};

export default async function ForumPage() {
  const recentSubjects = await prisma.subject.findMany({
    include: {
      forum: { include: { course: { select: { title: true, slug: true } } } },
      member: { include: { user: { include: { person: true } } } },
      _count: { select: { forumMessages: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 30,
  });

  return (
    <main>
      <section className="py-4">
        <div className="container">
          <div className="bg-light p-4 text-center rounded-3">
            <h1 className="m-0">Community Forum</h1>
            <p className="mb-0 mt-2">Join the discussion with other students and instructors</p>
            <div className="d-flex justify-content-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-dots mb-0">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Forum</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          {recentSubjects.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-comments fa-3x text-muted mb-3"></i>
              <p className="lead text-muted">No discussions yet. Be the first to start a conversation!</p>
              <Link href="/courses" className="btn btn-primary">Browse Courses</Link>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Recent Discussions</h4>
                <span className="text-muted small">{recentSubjects.length} discussions</span>
              </div>
              <div className="list-group shadow-sm">
                {recentSubjects.map((subject) => (
                  <div key={subject.id} className="list-group-item list-group-item-action p-4 border-0 border-bottom">
                    <div className="d-flex w-100 justify-content-between mb-2">
                      <h5 className="mb-1">
                        {subject.forum?.course ? (
                          <Link href={`/learn/${subject.forum.course.slug}/forum/${subject.id}`} className="text-primary text-decoration-none">
                            {subject.content.length > 100 ? subject.content.substring(0, 100) + '...' : subject.content}
                          </Link>
                        ) : (
                          <span>{subject.content.length > 100 ? subject.content.substring(0, 100) + '...' : subject.content}</span>
                        )}
                      </h5>
                      <small className="text-muted">{new Date(subject.createdAt).toLocaleDateString()}</small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <small className="text-muted me-2">
                          By {subject.member?.user?.person?.pseudo || 'Unknown'}
                        </small>
                        {subject.forum?.course && (
                          <small className="text-muted">
                            in <Link href={`/courses/${subject.forum.course.slug}`} className="text-decoration-none">{subject.forum.course.title}</Link>
                          </small>
                        )}
                        {subject.isSolved && <span className="badge bg-success ms-2">Solved</span>}
                      </div>
                      <span className="badge bg-light text-dark border">
                        <i className="fas fa-comment me-1"></i> {subject._count.forumMessages} replies
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
