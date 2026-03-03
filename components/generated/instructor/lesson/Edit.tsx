import React from 'react';
import Link from 'next/link';
import Form from './Form';

interface EditProps {
  chapitre: {
    slug: string;
  };
  lesson: any;
}

export default function Edit({ chapitre, lesson }: EditProps) {
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link href={`/instructor/lesson/index/${chapitre?.slug}`} className="btn btn-secondary">
          back to list
        </Link>
      </div>

      <div className="card border bg-transparent rounded-3">
         <div className="card-header bg-transparent border-bottom">
            <h3 className="mb-0">Edit Lesson</h3>
         </div>
         <div className="card-body">
            <Form initialData={lesson} buttonLabel="Update Lesson" />
         </div>
      </div>
    </>
  );
}
