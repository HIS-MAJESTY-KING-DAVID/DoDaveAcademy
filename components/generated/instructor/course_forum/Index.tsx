import React from 'react';
import Link from 'next/link';
import Subjects from '../../front/course_forum/Subjects';

interface IndexProps {
  course: any;
  subjects: any[];
}

export default function Index({ course, subjects }: IndexProps) {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Link href={`/instructor/courses/${course.slug}/preview`} className="btn btn-secondary-soft ml-2">
            Back to course details
          </Link>
        </div>
      </div>
      
      <Subjects 
        courseSlug={course.slug} 
        subjects={subjects} 
        isInstructor={true}
      />
    </>
  );
}
