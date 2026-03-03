import React from 'react';
import CourseDetailsContent from '../../includes/CourseDetails';
import InstructorLayout from '../InstructorLayout';

export default function CourseDetails(props: any) {
  // Mock user if not provided, to ensure Layout doesn't crash during preview/dev
  const user = props.user || {
      personne: { pseudo: 'Instructor', avatarPath: 'assets/images/avatar/01.jpg' },
      enseignant: { review: 4.5, cours: [] }
  };

  return (
    <InstructorLayout user={user}>
        <CourseDetailsContent course={props.course} isTeacher={props.isTeacher} />
    </InstructorLayout>
  );
}
