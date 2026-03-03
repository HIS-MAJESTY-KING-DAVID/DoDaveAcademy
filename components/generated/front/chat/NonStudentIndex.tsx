import React from 'react';
import Link from 'next/link';

interface NonStudentIndexProps {
  user?: any;
}

export default function NonStudentIndex({ user }: NonStudentIndexProps) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="alert alert-info">
            <h4 className="alert-heading">Student Only Feature</h4>
            <p>This chat feature is available only for students.</p>
            <hr />
            <p className="mb-0">
              {!user && (
                <Link href="/login" className="btn btn-primary">Login as Student</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
