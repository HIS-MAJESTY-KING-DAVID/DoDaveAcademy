import React from 'react';
import Subjects from './Subjects';

interface IndexProps {
  course: {
    intitule: string;
    slug: string;
  };
  subjects: any[];
  isInstructor?: boolean;
  isMember?: boolean;
  currentUserAvatar?: string;
  onPostQuestion?: (content: string) => void;
}

export default function Index({ 
  course, 
  subjects, 
  isInstructor, 
  isMember, 
  currentUserAvatar, 
  onPostQuestion 
}: IndexProps) {
  return (
    <>
      {/* =======================
      Page content START */}
      <section className="pb-0 py-lg-5">
        <div className="container">
          <Subjects 
            courseSlug={course.slug} 
            subjects={subjects} 
            isInstructor={isInstructor} 
            isMember={isMember} 
            currentUserAvatar={currentUserAvatar} 
            onPostQuestion={onPostQuestion} 
          />
        </div>
      </section>
      {/* =======================
      Page content END */}
    </>
  );
}
