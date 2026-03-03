import React from 'react';
import Link from 'next/link';

export default function TrendingCourse(props: any) {
  return (
    <>
<!-- Card item START -->
<div>
    <div className="card action-trigger-hover border bg-transparent">
        <!-- Image -->
        <img src="{asset('uploads/media/courses/' ~ course.media.imageFile)}" className="card-img-top" alt="{course.intitule}" />
        <!-- Ribbon -->
        <div className="ribbon mt-3"><span>{course.isFree ? 'Free' : 'Premium'}</span></div>
        <!-- Card body -->
        <div className="card-body pb-0">
            <!-- Badge and favorite -->
            <div className="d-flex justify-content-between mb-3">
                <span className="hstack gap-2">
                    <span className="badge bg-primary bg-opacity-10 text-primary">{course.niveauDifficulte}</span>
                </span>
                <a href="#" className="h6 fw-light mb-0"><i className="far fa-bookmark"></i></a>
            </div>
            <!-- Title -->
            <h5 className="card-title"><a href="{url("app_front_course_details", {slug: course.slug})}">{course.intitule|u.truncate(60, '...')}</a></h5>
            <!-- Rating -->
            <div className="d-flex justify-content-between mb-2">
                <div className="hstack gap-2">
                    <p className="text-warning m-0">{course.review}<i className="fas fa-star text-warning ms-1"></i></p>
                    <span className="small">({course.reviews|length})</span>
                </div>
                <div className="hstack gap-2">
                    <p className="h6 fw-light mb-0 m-0">{course.eleves|length}</p>
                    <span className="small">({% trans %}STUDENT_KEY{% endtrans %})</span>
                </div>
            </div>
            <!-- Time -->
            <div className="hstack gap-3">
                <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2"></i>{course.dureeApprentissage}</span>
                <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2"></i>{course.numberOfLessons} {% trans %}LESSONS_KEY{% endtrans %}</span>
            </div>
        </div>
        <!-- Card footer -->
        <div className="card-footer pt-0 bg-transparent">
            <hr />
            <!-- Avatar and Price -->
            <div className="d-flex justify-content-between align-items-center">
                <!-- Avatar -->
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-sm">
                        <img className="avatar-img rounded-1" src="{asset(course.enseignant.utilisateur.personne.avatarPath)}" alt="avatar" />
                    </div>
                    <p className="mb-0 ms-2"><a href="#" className="h6 fw-light mb-0">{course.enseignant.utilisateur.personne.firstName}</a></p>
                </div>
                <!-- Price -->
                <div>
                    <h4 className="text-success mb-0 item-show">{course.isFree ? 'Free' : course.montantAbonnement ~ 'XAF'}</h4>
                    <a href="{url("app_front_course_details", {slug: course.slug})}" className="btn btn-sm btn-success-soft item-show-hover"><i className="fas fa-eye me-2"></i>{% trans %}DETAILS_KEY{% endtrans %}</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Card item END -->
    </>
  );
}
