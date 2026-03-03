import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/entities/Course';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Helper to format image path
  const getImagePath = (imageFile: string | undefined | null) => {
    if (!imageFile) return '/assets/images/courses/404.jpg'; // Default placeholder if needed
    if (imageFile.startsWith('http')) return imageFile;
    // Assuming uploads are served from /uploads/media/courses/ in public folder
    return `/uploads/media/courses/${imageFile}`;
  };

  return (
    <div className="card shadow h-100">
      {/* Image */}
      <Link href={`/courses/${course.slug}`}>
        <div className="position-relative" style={{ height: '200px', width: '100%' }}>
            {/* Using standard img tag for now if Image component has domain config issues, 
                but Image is better. Assuming local images or configured domains. */}
            <Image 
                src={getImagePath(course.media?.imageFile)} 
                alt={course.title || 'Course Image'} 
                className="card-img-top"
                fill
                style={{ objectFit: 'cover' }}
            />
        </div>
      </Link>
      
      {/* Card body */}
      <div className="card-body pb-0">
        {/* Badge and favorite */}
        <div className="d-flex justify-content-between mb-2">
          <span className="badge bg-purple bg-opacity-10 text-purple">{course.difficultyLevel}</span>
          <button className="btn btn-sm btn-link p-0 text-dark">
             <i className="far fa-heart h6 mb-0"></i>
          </button>
        </div>
        
        {/* Title */}
        <h5 className="card-title fw-normal">
          <Link href={`/courses/${course.slug}`} className="text-decoration-none text-dark">
             {course.title}
          </Link>
        </h5>
        {/* Description truncated */}
        <div className="mb-2 text-truncate-2" dangerouslySetInnerHTML={{ __html: course.description || '' }}></div>
        
        {/* Rating star */}
        <ul className="list-inline mb-0">
          {[...Array(5)].map((_, i) => (
             <li key={i} className="list-inline-item me-0 small">
                <i className={`fas fa-star ${i < Math.round(course.review || 0) ? 'text-warning' : 'text-secondary'}`}></i>
             </li>
          ))}
          <li className="list-inline-item ms-2 h6 fw-light mb-0">{course.review || 0}/5.0</li>
        </ul>
      </div>
      
      {/* Card footer */}
      <div className="card-footer pt-0 pb-3">
        <hr />
        <div className="d-flex justify-content-between">
          <span className="h6 fw-light mb-0">
            <i className="far fa-clock text-danger me-2"></i>{course.duration}
          </span>
          <span className="h6 fw-light mb-0">
            <i className="fas fa-table text-orange me-2"></i>
            {course.numberOfLessons} Lessons
          </span>
        </div>
      </div>
    </div>
  );
}
