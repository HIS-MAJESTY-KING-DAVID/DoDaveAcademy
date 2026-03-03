import React from 'react';
import Link from 'next/link';

export default function ChapitreDetails(props: any) {
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
                    <h6 className="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">{chapitre.cours.categorie.name}</h6>
                    <!-- Title -->
                    <h1>{chapitre.title}</h1>
                    <p>{chapitre.description}</p>
                    <!-- Content -->
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"></i>{'0' ~ chapitre.cours.review}/5.0</li>
                        <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>{chapitre.cours.eleves|length} Enrolled</li>
                        <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="fas fa-signal text-success me-2"></i>{chapitre.cours.niveauDifficulte}</li>
                        <li className="list-inline-item h6 me-3 mb-1 mb-sm-0"><i className="bi bi-patch-exclamation-fill text-danger me-2"></i>Last updated {chapitre.cours.updatedAt|date('d/m/Y')}</li>
                        <li className="list-inline-item h6 mb-0"><i className="fas fa-globe text-info me-2"></i>{chapitre.cours.language}</li>
                    </ul>
                    <hr />
                    <h1>{chapitre.title}</h1>
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
                                                        <video style="max-height: 400px;width: 100%;" controls crossorigin="anonymous" playsinline poster="{asset('uploads/media/courses/' ~ lesson.chapitre.cours.media.imageFile)}">
                                                            <source src="{lesson.videoLink}" type="video/mp4" size="720">
                                                        </video>
                                                    </div>
                                                </div>
                                                <!-- Course video END -->
                                            <!-- Playlist responsive toggler START -->
                                            <div className="col-12 d-lg-none">
                                                <button className="btn btn-primary mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                                                    <i className="bi bi-camera-video me-1"></i> Playlist
                                                </button>
                                            </div>
                                            <!-- Playlist responsive toggler END -->
                                        </div>
                                    
)}
                                    <!-- Course detail START -->
                                    {lesson.content|raw}

                                </div>
                                <!-- Content END -->

                            </div>
                        </div>
                        <!-- Tab contents END -->

                        <div className="card-footer p-4">
                            <a href="" className="btn btn-success">{% trans %}I_HAVE_FINISHED_KEY{% endtrans %}</a>
                        </div>
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
                                        <h5 className="offcanvas-title text-white" id="offcanvasSidebarLabel">{% trans %}COURSE_PLAYLIST_KEY{% endtrans %}</h5>
                                        <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                                    </div>
                                    <div className="offcanvas-body p-3 p-lg-0">
                                        <div className="col-12">
                                            <!-- Accordion START -->
                                            <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                                                {% for chapter in lesson.chapitre.cours.chapitres %}
                                                    <!-- Item -->
                                                    <div className="accordion-item mb-3">
                                                        <h6 className="accordion-header font-base" id="heading-{loop.index}">
                                                            <a className="accordion-button fw-bold rounded collapsed d-block" href="#collapse-{loop.index}" data-bs-toggle="collapse" data-bs-target="#collapse-{loop.index}" aria-expanded="{loop.index is same as 1 ? 'true' : 'false'}" aria-controls="collapse-{loop.index}">
                                                                <span className="mb-0">{chapter.title}</span> 
                                                                <span className="small d-block mt-1">(3 Lectures)</span> 
                                                            </a>
                                                        </h6>
                                                        <div id="collapse-{loop.index}" className="accordion-collapse collapse {loop.index is same as 1 ? 'show' : ''}" aria-labelledby="heading-{loop.index}" data-bs-parent="#accordionExample2">
                                                            <div className="accordion-body mt-3">
                                                                <div className="vstack gap-3">

                                                                    <!-- Progress bar -->
                                                                    <div className="overflow-hidden">
                                                                        <div className="d-flex justify-content-between">
                                                                            <p className="mb-1 h6">0/{chapter.lessons|length} Completed</p>
                                                                            <h6 className="mb-1 text-end">{0 * 100 / chapter.lessons|length}</h6>
                                                                        </div>
                                                                        <div className="progress progress-sm bg-primary bg-opacity-10">
                                                                            <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {% for les in chapter.lessons %}
                                                                        <!-- Course lecture -->
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="position-relative d-flex align-items-center">
                                                                                <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                    <i className="fas fa-play me-0"></i>
                                                                                </a>
                                                                                <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-200px">{les.title}</span>
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
