import React from 'react';
import Link from 'next/link';

export default function Read.html (Copie).twig(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Course détails{% endblock %}

{% block mainContent %}

    <!-- =======================
    Page intro START -->
    <section className="bg-light py-0 py-sm-5">
        <div className="container">
            <div className="row py-5">
                <div className="col-lg-8">
                    <!-- Badge -->
                    <h6 className="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">{lesson.chapitre.cours.intitule}</h6>
                    <!-- Title -->
                    <h1>{% trans %}CHAPTER_KEY{% endtrans %} {lesson.chapitre.numero} - {lesson.chapitre.title}</h1>
                    <p>{lesson.chapitre.description}</p>
                    <!-- Content -->
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"></i>{'0' ~ lesson.chapitre.cours.review / nbReviews}/5.0</li>
                        <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>{lesson.chapitre.cours.eleves|length} Enrolled</li>
                        <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-signal text-success me-2"></i>{lesson.chapitre.cours.niveauDifficulte}</li>
                        <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="bi bi-patch-exclamation-fill text-danger me-2"></i>Last updated {lesson.chapitre.cours.updatedAt|date('d/m/Y')}</li>
                        <li className="list-inline-item h6 mb-0"><i className="fas fa-globe text-info me-2"></i>{lesson.chapitre.cours.language}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <!-- =======================
    Page intro END -->

    <!-- =======================
    Page content START -->
    <section className="pb-0 py-lg-5">
        <div className="container">
            <div className="row">
                <!-- Main content START -->
                <div className="col-lg-8">
                    <div className="card shadow rounded-2 p-0">

                        <!-- Tab contents START -->
                        <div className="card-body p-4">
                            <div className="tab-content pt-2" id="course-pills-tabContent">
                                <!-- Content START -->
                                <div className="tab-pane fade show active" id="course-pills-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                                    
                                    {lesson.videoLink is not same as null && (

                                        <div className="row g-3 mb-5">
                                                <!-- Course video START -->
                                                <div className="col-12">
                                                    <div className="video-player rounded-3">
                                                        <video style="max-height: 400px;width: 100%;" controls crossorigin="anonymous" playsinline poster="{asset(lesson.poster)}">
                                                            <source src="{asset('uploads/media/courses/lessons/videos/' ~ lesson.videoLink)}" type="video/mp4">
                                                            <!-- Caption files -->
                                                            <track kind="captions" label="English" srclang="en" src="assets/images/videos/en.vtt" default>
                                                            <track kind="captions" label="French" srclang="fr" src="assets/images/videos/fr.vtt">
                                                        </video>
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
                                    
)}
                                    <h3>{% trans %}LESSON_KEY{% endtrans %} {lesson.numero} : {lesson.title}</h3>
                                    <hr />
                                    <!-- Course detail START -->
                                    {lesson.content|raw}

                                </div>
                                <!-- Content END -->

                            </div>
                        </div>
                        <!-- Tab contents END -->
                        {lecture and lecture.lesson is not same as null && (

                            <div className="card-footer p-4">
                                {/* {not lecture.isFinished && (
 */}
                                    <a href="{url("app_front_course_lecture_finished", {reference: lecture.reference})}" className="btn btn-success">Leçon suivante !</a>
                                {# 
) || (

                                    #<a href="{url("app_front_course_start", {'slug': lecture.lesson.chapitre.cours.slug})}" className="btn btn-success">Poursuivre la lecture !</a>
                                
)} #}
                            </div>
                        
)}
                        
                    </div>
                </div>
                <!-- Main content END -->

                <!-- Right sidebar START -->
                <div className="col-lg-4 pt-5 pt-lg-0">
                    <div className="row mb-5 mb-lg-0">
                        <div className="col-md-6 col-lg-12">
                            <!-- Video START -->
                            <div className="card shadow p-2 mb-4 z-index-9">
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
                                               {% for chapter in lesson.chapitre.cours.chapitres|sort((a, b) => a.numero <=> b.numero) %}
                                                    <div className="accordion-item">
                                                        <h6 className="accordion-header" id="heading-{loop.index}">
                                                            <a className="accordion-button fw-bold rounded collapsed d-block" href="#collapse-{loop.index}" data-bs-toggle="collapse" data-bs-target="#collapse-{loop.index}" aria-expanded="false" aria-controls="collapse-{loop.index}">
                                                                <span className="mb-0">{chapter.title}</span> 
                                                                <span className="small d-block mt-1">({chapter.lessons|length} Leçon(s) )</span>
                                                            </a>
                                                        </h6>
                                                        <div id="collapse-{loop.index}" className="accordion-collapse collapse">
                                                            <div className="accordion-body">
                                                                {% for les in chapter.lessons|sort((c, d) => c.numero <=> d.numero) %}
                                        
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="position-relative d-flex align-items-center">
                                                                                    <a href="{url("app_front_read_lesson", {slug: les.slug})}" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                        <i className="fas fa-play me-0"></i>
                                                                                    </a>
                                                                                    <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-200px">{les.title}</span>
                                                                                </div>
                                                                            <p className="mb-0 text-truncate"></p>
                                                                        </div>
                                                                 
))}
                                                                  <div className="d-flex justify-content-between align-items-center">
                                                                        <div className="position-relative d-flex align-items-center">
                                                                            <a href="{url("app_front_course_chapitre_quizzes", {slugChapitre: chapter.slug, slugCours: chapter.cours.slug})}" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i className="fas fa-play me-0"></i>
                                                                            </a>
                                                                            <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-200px">Quiz</span>
                                                                        </div>
                                                                        <p className="mb-0 text-truncate"></p>
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
                            </div>
                            
                        </div>

                    </div><!-- Row End -->
                </div>
                <!-- Right sidebar END -->

            </div><!-- Row END -->
        </div>
    </section>
    <!-- =======================
    Page content END -->

{% endblock %}
    </>
  );
}
