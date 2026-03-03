import React from 'react';
import Link from 'next/link';

interface ForumSubject {
  reference: string;
  content: string;
  isSolved: boolean;
  createdAt: string;
  messagesCount: number;
  member: {
    avatar: string;
  };
}

interface SubjectsProps {
  courseSlug: string;
  subjects: ForumSubject[];
  isInstructor?: boolean;
  isMember?: boolean;
  currentUserAvatar?: string;
  onPostQuestion?: (content: string) => void;
}

export default function Subjects({ 
  courseSlug, 
  subjects, 
  isInstructor = false, 
  isMember = false, 
  currentUserAvatar,
  onPostQuestion 
}: SubjectsProps) {
  
  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const content = (e.target as any).elements.content.value;
    if (onPostQuestion) {
      onPostQuestion(content);
    }
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card shadow rounded-2 p-0">
          <div className="card-body p-4">
            <h5>Questions Asked</h5>
            <hr />
            <div className="h-500px overflow-hidden custom-scrollbar">
              <ul className="list-unstyled">
                {subjects && subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <li key={subject.reference}>
                      <div className="d-flex mb-4 mt-3">
                        <div className="avatar avatar-sm flex-shrink-0 me-2">
                          <img 
                            className="avatar-img rounded-circle" 
                            src={subject.member.avatar || '/assets/images/avatar/placeholder.jpg'} 
                            alt="" 
                          />
                        </div>
                        <div className="w-100 d-flex">
                          <div className="w-100">
                            <div dangerouslySetInnerHTML={{ __html: subject.content }} />
                            <br />
                            <div className="mt-2">
                              <span className={`badge ${subject.isSolved ? "btn-success-soft" : 'btn-danger-soft'}`}>
                                {subject.isSolved ? "Resolved" : "Unresolved"}
                              </span>
                              <i className="badge btn-info-soft ms-1">
                                {new Date(subject.createdAt).toLocaleString()}
                              </i>
                              <span className="badge btn-warning-soft ms-1">
                                {subject.messagesCount} Comments
                              </span>
                              <Link 
                                href={isInstructor 
                                  ? `/instructor/course_forum/${courseSlug}/${subject.reference}` 
                                  : `/course/forum/${courseSlug}/${subject.reference}`
                                } 
                                className="btn btn-primary-soft ms-1"
                              >
                                Show Comment
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </li>
                  ))
                ) : (
                  <h3 className="text-danger">No Topics Found</h3>
                )}
              </ul>
            </div>
          </div>

          <div className="card-footer p-4">
            {isMember && (
              <>
                <h5 className="mb-4">Ask Question</h5>
                <div className="d-flex mb-4">
                  <div className="avatar avatar-sm flex-shrink-0 me-2">
                    <img 
                      className="avatar-img rounded-circle" 
                      src={currentUserAvatar || '/assets/images/avatar/placeholder.jpg'} 
                      alt="" 
                    />
                  </div>
                  <form onSubmit={handlePost} className="w-100 d-flex">
                    <textarea 
                      name="content" 
                      className="form-control" 
                      placeholder="Ask a question..." 
                      rows={1}
                    ></textarea>
                    <button className="btn btn-primary ms-2 mb-0" type="submit">Post</button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
