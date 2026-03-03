import React from 'react';
import Link from 'next/link';
import Messages from '../../front/course_forum/Messages';

interface SubjectMessageProps {
  sujet: any;
}

export default function SubjectMessage({ sujet }: SubjectMessageProps) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      console.log('Delete subject', sujet.id);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Link href={`/instructor/courses/${sujet.forum.cours.slug}/preview`} className="btn btn-secondary-soft ml-2">
            Back to course details
          </Link>
        </div>
        <div>
          <Link href={`/instructor/course_forum/${sujet.forum.cours.slug}`} className="btn btn-primary-soft ml-2">
            Back to Subjects List
          </Link>
        </div>
        <div>
           <button className="btn btn-danger-soft" onClick={handleDelete}>Delete Subject</button>
        </div>
      </div>

      <Messages subject={sujet} isInstructor={true} />
    </>
  );
}
