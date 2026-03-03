import React from 'react';
import Link from 'next/link';

export default function CourseItem(props: any) {
  return (
    <>
  <div className="card shadow h-100">
            <!-- Lien global -->
            <a href="{path('app_front_course_details', {slug: course.slug})}" className="text-decoration-none text-dark">
                <!-- Image -->
                <img src="{asset('uploads/media/courses/' ~ course.media.imageFile)}" className="card-img-top" alt="course image" />
                <!-- Card body -->
                <div className="card-body pb-0">
                    <!-- Badge and favorite -->
                    <div className="d-flex justify-content-between mb-2">
                        <span className="badge bg-purple bg-opacity-10 text-purple">{course.niveauDifficulte}</span>
                        <i className="far fa-heart h6 mb-0"></i>
                    </div>
                    <!-- Title -->
                    <h5 className="card-title fw-normal">{course.intitule|u.truncate(48, '...')}</h5>
                    <p className="mb-2 text-truncate-2">{course.description|raw|u.truncate(100)}</p>
                    <!-- Rating star -->
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                        <li className="list-inline-item ms-2 h6 fw-light mb-0">4.0/5.0</li>
                    </ul>
                </div>
            </a>
            <!-- Card footer -->
            <div className="card-footer pt-0 pb-3">
                <hr />
                <div className="d-flex justify-content-between">
                    <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2"></i>{course.dureeApprentissage}</span>
                    <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2"></i>{course.numberOfLessons >= 10 ? course.numberOfLessons : '0' ~ course.numberOfLessons} {% trans %}LESSONS_KEY{% endtrans %}</span>
                </div>
            </div>
        </div>
    </>
  );
}
