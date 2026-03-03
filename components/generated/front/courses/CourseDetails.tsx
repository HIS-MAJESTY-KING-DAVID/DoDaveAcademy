import React from 'react';
import Link from 'next/link';

export default function CourseDetails(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Course détails{% endblock %}

{% block mainContent %}

    <section className="py-0 pb-lg-5">
        <div className="container">
            <div className="row g-3">
                <!-- Course video START -->
                <div className="col-12">
                    <div className="video-player rounded-3">
                        {course.media.videoUrl is not same as null or course.media.mp4File is not same as null or course.media.webMFile is not same  as null or course.media.oggFile is not same as null && (

                            <video style="max-height: 600px;overflow: hidden;" controls crossorigin="anonymous" playsinline poster="{asset('uploads/media/courses/' ~ course.media.imageFile)}">
                                {course.media.videoUrl is not same as null && (

                                    <source src="{course.media.videoUrl}" type="video/mp4" size="720">
                                
)}
                                {course.media.mp4File is not same as null && (

                                    <source src="{asset('uploads/media/courses/' ~ course.media.mp4File)}" type="video/mp4" size="720">
                                
)}
                                {course.media.webMFile is not same as null && (

                                    <source src="{asset('uploads/media/courses/' ~ course.media.webMFile)}" type="video/webm" size="720">
                                
)}
                                {course.media.oggFile is not same as null && (

                                    <source src="{asset('uploads/media/courses/' ~ course.media.oggFile)}" type="video/ogg" size="720">
                                
)}
                            </video>
                        
) || (

                            <img style="width: 100%;max-height: 400px;" src="{asset('uploads/media/courses/' ~ course.media.imageFile)}" alt="" />
                        
)}
                    </div>
                </div>
                <!-- Course video END -->

                <!-- Playlist responsive toggler START -->
                <div className="col-12 d-lg-none">
                    <button className="btn btn-primary mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                        <i className="bi bi-camera-video me-1"></i> {% trans %}PLAYLIST_KEY{% endtrans %}
                    </button>
                </div>
                <!-- Playlist responsive toggler END -->
            </div>
        </div>
    </section>

    <section className="pt-0">
        <div className="container">
            <div className="row g-lg-5">

                <!-- Main content START -->
                <div className="col-lg-8">
                    <div className="row g-4">
                                
                        <!-- Course title START -->
                        <div className="col-12">
                            <!-- Title -->
                            <h1>{course.intitule}</h1>
                            <!-- Content -->
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"></i>{course.review}/5.0</li>
                                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>{course.eleves|length} Enrolled</li>
                                <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-signal text-success me-2"></i>{course.niveauDifficulte}</li>
                            </ul>
                        </div>
                        <!-- Course title END -->

                        <!-- Instructor detail START -->
                        <div className="col-12">
                            <div className="d-sm-flex justify-content-sm-between align-items-center">
                                <!-- Avatar detail -->
                                <div className="d-flex align-items-center">
                                    <!-- Avatar image -->
                                    <div className="avatar avatar-lg">
                                        <img className="avatar-img rounded-circle" src="{asset(course.enseignant.avatar)}" alt="avatar" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-0"><a href="#">{% trans %}BY_KEY{% endtrans %} {course.enseignant.utilisateur.personne.nomComplet}</a></h6>
                                        <p className="mb-0 small">{% trans %}TRAINER_KEY{% endtrans %}</p>
                                    </div>
                                </div>

                                <!-- Button -->
                                <div className="d-flex mt-2 mt-sm-0">
                                    <a className="btn btn-danger-soft btn-sm mb-0" href="#">Follow</a>
                                    <!-- Share button with dropdown -->
                                    <div className="dropdown ms-2">
                                        <a href="#" className="btn btn-sm mb-0 btn-info-soft small" role="button" id="dropdownShare" data-bs-toggle="dropdown" aria-expanded="false">
                                            {% trans %}SHARE_KEY{% endtrans %}
                                        </a>
                                        <!-- dropdown button -->
                                        <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare">
                                            <li><a  className="dropdown-item" href="#"><i className="fab fa-twitter-square me-2"></i>Twitter</a></li>
                                            <li><a className="dropdown-item" href="#"><i className="fab fa-facebook-square me-2"></i>Facebook</a></li>
                                            <li><a className="dropdown-item" href="#"><i className="fab fa-linkedin me-2"></i>LinkedIn</a></li>
                                            <li><a className="dropdown-item" href="#"><i className="fas fa-copy me-2"></i>Copy link</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Instructor detail END -->

                        <!-- Course detail START -->
                        <div className="col-12">
                            <!-- Tabs START -->
                            <ul className="nav nav-pills nav-pills-bg-soft px-3" id="course-pills-tab" role="tablist">
                                <!-- Tab item -->
                                <li className="nav-item me-2 me-sm-4" role="presentation">
                                    <button className="nav-link mb-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">{% trans %}COURSEOVERVIEW_KEY{% endtrans %}</button>
                                </li>
                                <!-- Tab item -->
                                <li className="nav-item me-2 me-sm-4" role="presentation">
                                    <button className="nav-link mb-0" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-2" type="button" role="tab" aria-controls="course-pills-2" aria-selected="false">{% trans %}COURSE_REVIEWS_KEY{% endtrans %}</button>
                                </li>
                                <!-- Tab item -->
                                <li className="nav-item me-2 me-sm-4" role="presentation">
                                    <button className="nav-link mb-0" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-3" type="button" role="tab" aria-controls="course-pills-3" aria-selected="false">FAQs </button>
                                </li>
                                <!-- Tab item -->
                                <li className="nav-item me-2 me-sm-4" role="presentation">
                                    <button className="nav-link mb-0" id="course-pills-tab-4" data-bs-toggle="pill" data-bs-target="#course-pills-4" type="button" role="tab" aria-controls="course-pills-4" aria-selected="false">Forum</button>
                                </li>
                            </ul>
                            <!-- Tabs END -->

                            <!-- Tab contents START -->
                            <div className="tab-content pt-4 px-3" id="course-pills-tabContent">
                                <!-- Content START -->
                                <div className="tab-pane fade show active" id="course-pills-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                                    <!-- Course detail START -->
                                    <h5 className="mb-3">Course Description</h5>
                                    {course.content|raw}
                                </div>
                                <!-- Content END -->

                                <!-- Content START -->
                                <div className="tab-pane fade" id="course-pills-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
                                    {include('front/includes/courses/_course_reviews.html.twig')}
                                </div>
                                <!-- Content END -->

                                <!-- Content START -->
                                <div className="tab-pane fade" id="course-pills-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
                                    <!-- Title -->
                                    <h5 className="mb-3">Frequently Asked Questions</h5>
                                    {% for faq in course.faqs %}
                                        <!-- FAQ item -->
                                        <div className="mt-4">
                                            <h6>{faq.question}</h6>
                                            <p className="mb-0">{faq.answer}</p>
                                        </div>
                                    
))}
                        
                                </div>
                                <!-- Content END -->

                                <!-- Content START -->
                                <div className="tab-pane fade" id="course-pills-4" role="tabpanel" aria-labelledby="course-pills-tab-4">
                                    {include('front/includes/courses/forum.html.twig')}
                                </div>

                                <div className="mt-5 text-right">
                                    {lastReadLesson is not same as null && (

                                        <a className="btn btn-success-soft" href="{url("app_front_read_lesson", {slug: lastReadLesson.slug})}">Poursuivre la lecture</a>
                                    
) || (

                                        <a href="{path('app_front_course_start', {slug: course.slug})}" className="btn btn-primary-soft">Commencer la lecture</a>
                                    
)}
                                    
                                    
                                </div>
                                <!-- Content END -->
                            </div>
                            <!-- Tab contents END -->
                        </div>
                        <!-- Course detail END -->
                    </div>
                </div>
                <!-- Main content END -->

                <!-- Right sidebar START -->
                <div className="col-lg-4">
                    <!-- Responsive offcanvas body START -->
                    <div className="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
                        <div className="offcanvas-header bg-dark">
                            <h5 className="offcanvas-title text-white" id="offcanvasSidebarLabel">Course playlist</h5>
                            <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                        </div>
                        <div className="offcanvas-body p-3 p-lg-0">
                            <div className="col-12">
                                <!-- Accordion START -->
                                <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                                    {% for chapter in course.chapitres %}
                                        <!-- Item -->
                                        <div className="accordion-item mb-3">
                                            <h6 className="accordion-header font-base" id="heading-{chapter.id}">
                                                <a className="accordion-button fw-bold rounded {loop.index > 1 ? 'collapsed' : ''} d-block" href="#collapse-{chapter.id}" data-bs-toggle="collapse" data-bs-target="#collapse-{chapter.id}" aria-expanded="{loop.index > 1 ? 'false' : 'true'}" aria-controls="collapse-{chapter.id}">
                                                    <span className="mb-0">{chapter.title}</span> 
                                                    <span className="small d-block mt-1">({chapter.lessons|length} Lectures)</span> 
                                                </a>
                                            </h6>
                                            <div id="collapse-{chapter.id}" className="accordion-collapse collapse {loop.index is same as 1 ? 'show' : ''}" aria-labelledby="heading-{chapter.id}" data-bs-parent="#accordionExample2">
                                                <div className="accordion-body mt-3">
                                                    <div className="vstack gap-3">

                                                        <!-- Progress bar -->
                                                        <div className="overflow-hidden">
                                                            <div className="d-flex justify-content-between">
                                                                <p className="mb-1 h6">0/{chapter.lessons|length} Completed</p>
                                                                <h6 className="mb-1 text-end">0%</h6>
                                                            </div>
                                                            <div className="progress progress-sm bg-primary bg-opacity-10">
                                                                <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {% for lesson in chapter.lessons %}
                                                            <!-- Course lecture -->
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="position-relative d-flex align-items-center">
                                                                    {is_granted('ROLE_INSTRUCTOR') or is_granted('ROLE_ADMIN') && (

                                                                        <a href="{not app.user and not is_granted('ROLE_INSTRUCTOR')}" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                            <i className="fas fa-play me-0"></i>
                                                                        </a>
                                                                    
) || (

                                                                        <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                            <i className="fas fa-play me-0"></i>
                                                                        </a>    
                                                                    
)}
                                                                    
                                                                    <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-200px">{lesson.title}</span>
                                                                </div>
                                                                <p className="mb-0 text-truncate">2m 10s</p>
                                                            </div>
                                                        
))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
))}
                                </div>
                                <!-- Accordion END -->
                            </div>
                        </div>
                    </div>
                    <!-- Responsive offcanvas body END -->

                    <!-- Tags START -->
                    <div className="mt-4">
                        <h4 className="mb-3">Tags</h4>
                        <ul className="list-inline mb-0">
                            {% for tag in course.tags|split(',') %}
                                <li className="list-inline-item"> <a className="btn btn-outline-light btn-sm" href="#">{tag}</a> </li>
                            
))}
                        </ul>
                    </div>
                    <!-- Tags END -->
                </div>
                <!-- Right sidebar END -->

            </div><!-- Row END -->
        </div>
    </section>


    <!-- =======================
    Listed courses START -->
    <section className="pt-0">
        <div className="container">
            <!-- Title -->
            <div className="row mb-4">
                <h2 className="mb-0">Top Listed Courses</h2>
            </div>

            <div className="row">
                <!-- Slider START -->
                <div className="tiny-slider arrow-round arrow-blur arrow-hover">
                    <div className="tiny-slider-inner" data-autoplay="false" data-arrow="true" data-edge="2" data-dots="false" data-items="3" data-items-lg="2" data-items-sm="1">
                        {topCourses.map(cours => (

                            {cours is not same as course && (

                                {include('front/includes/courses/_trending_course.html.twig', {course: cours})}
                            
)}
                        
))}

                    </div>
                </div>
                <!-- Slider END -->		
            </div>
        </div>
    </section>
    <!-- =======================
    Listed courses END -->

{% endblock %}

    </>
  );
}
