
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import ReplyForm from '@/components/forum/ReplyForm';
import Link from 'next/link';

export default async function ForumThreadPage({
  params
}: {
  params: Promise<{ courseSlug: string; subjectId: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { courseSlug, subjectId } = await params;
  const sId = parseInt(subjectId);

  if (isNaN(sId)) notFound();

  const subject = await prisma.subject.findUnique({
    where: { id: sId },
    include: {
      forum: {
        include: {
          course: true
        }
      },
      member: {
        include: {
          user: {
            include: {
              person: true
            }
          }
        }
      },
      forumMessages: {
        include: {
          member: {
            include: {
              user: {
                include: {
                  person: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!subject || subject.forum?.course?.slug !== courseSlug) {
    notFound();
  }

  return (
    <div className="container-fluid px-0 pb-5">
      <div className="mb-4">
        <Link href={`/learn/${courseSlug}/forum`} className="text-decoration-none text-muted">
          <i className="fas fa-arrow-left me-2"></i> Back to Forum
        </Link>
      </div>

      {/* Subject (Original Post) */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-header bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-center">
                <div className="avatar rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, fontSize: '1.2rem' }}>
                    {subject.member?.user?.person?.pseudo?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                    <h5 className="mb-0 text-dark fw-bold">{subject.member?.user?.person?.pseudo || 'Unknown User'}</h5>
                    <small className="text-muted">
                        Started {new Date(subject.createdAt).toLocaleDateString()} at {new Date(subject.createdAt).toLocaleTimeString()}
                    </small>
                </div>
            </div>
            {subject.isSolved && <span className="badge bg-success">Solved</span>}
        </div>
        <div className="card-body px-4 pb-4">
            <div className="fs-5 text-dark" style={{ whiteSpace: 'pre-wrap' }}>
                {subject.content}
            </div>
        </div>
      </div>

      {/* Replies */}
      <h5 className="mb-3 ps-2 text-muted text-uppercase small fw-bold">Replies ({subject.forumMessages.length})</h5>
      
      {subject.forumMessages.map((msg) => (
        <div key={msg.id} className="card mb-3 border-0 shadow-sm">
            <div className="card-body p-4">
                <div className="d-flex mb-3 align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="avatar rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                            {msg.member?.user?.person?.pseudo?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <div className="fw-bold text-dark">{msg.member?.user?.person?.pseudo || 'Unknown User'}</div>
                            <small className="text-muted">
                                {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
                            </small>
                        </div>
                    </div>
                    {/* Like button could go here */}
                </div>
                <div className="text-dark" style={{ whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                </div>
            </div>
        </div>
      ))}

      <ReplyForm courseSlug={courseSlug} subjectId={subject.id} />
    </div>
  );
}
