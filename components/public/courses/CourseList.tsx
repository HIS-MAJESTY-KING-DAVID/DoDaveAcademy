import React from 'react';
import { Course } from '@/entities/Course';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <section className="pt-0">
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            {/* Course Grid START */}
            <div className="row g-4">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course.id} className="col-sm-6 col-lg-4 col-xl-3">
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div className="text-center p-4 mb-5 mt-5">
                  <h2>No courses found</h2>
                </div>
              )}
            </div>
            {/* Course Grid END */}
          </div>
        </div>
      </div>
    </section>
  );
}
