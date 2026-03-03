import Link from 'next/link';
import Image from 'next/image';

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  lessons: number;
  rating: number;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="card shadow h-100">
      {/* Lien global */}
      <Link href={`/courses/${course.slug}`} className="text-decoration-none text-dark">
        {/* Image */}
        <div className="position-relative" style={{ height: '200px', width: '100%' }}>
            <Image 
                src={course.image} 
                className="card-img-top" 
                alt={course.title} 
                fill
                style={{ objectFit: 'cover' }}
            />
        </div>
        
        {/* Card body */}
        <div className="card-body pb-0">
          {/* Badge and favorite */}
          <div className="d-flex justify-content-between mb-2">
            <span className="badge bg-purple bg-opacity-10 text-purple">{course.level}</span>
            <i className="far fa-heart h6 mb-0"></i>
          </div>
          {/* Title */}
          <h5 className="card-title fw-normal">{course.title}</h5>
          <p className="mb-2 text-truncate-2">{course.description}</p>
          {/* Rating star */}
          <ul className="list-inline mb-0">
            {[...Array(5)].map((_, i) => (
                <li key={i} className="list-inline-item me-0 small">
                    <i className={`fas fa-star ${i < Math.floor(course.rating) ? 'text-warning' : 'text-muted'}`}></i>
                </li>
            ))}
            <li className="list-inline-item ms-2 h6 fw-light mb-0">{course.rating.toFixed(1)}/5.0</li>
          </ul>
        </div>
      </Link>
      {/* Card footer */}
      <div className="card-footer pt-0 pb-3">
        <hr />
        <div className="d-flex justify-content-between">
          <span className="h6 fw-light mb-0">
            <i className="far fa-clock text-danger me-2"></i>{course.duration}
          </span>
          <span className="h6 fw-light mb-0">
            <i className="fas fa-table text-orange me-2"></i>
            {course.lessons >= 10 ? course.lessons : `0${course.lessons}`} Lessons
          </span>
        </div>
      </div>
    </div>
  );
}
