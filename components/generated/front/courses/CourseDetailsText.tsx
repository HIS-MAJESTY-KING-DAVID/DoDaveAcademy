import React from 'react';
import Link from 'next/link';

export default function CourseDetailsText(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Course détails{% endblock %}

{% block mainContent %}

    <section className="bg-blue py-7">
        <div className="container">
            <div className="row justify-content-lg-between">

                <div className="col-lg-8">
                    <!-- Title -->
                    <h1 className="text-white">{course.intitule}</h1>
                    <!-- p className="text-white">{course.description}</p -->
                    <!-- Content -->
                    <ul className="list-inline mb-5">
                        <li className="list-inline-item h6 me-4 mb-1 mb-sm-0 text-white"><span className="fw-light">{% trans %}BY_KEY{% endtrans %}</span> {course.enseignant.utilisateur.personne.nomComplet}</li>
                        <li className="list-inline-item me-4 mb-1 mb-sm-0">
                            <!-- ul className="list-inline mb-0">
                                <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning"></i></li>
                                <li className="list-inline-item ms-2 h6 text-white">4.5/5.0</li>
                                <!-- li className="list-inline-item text-white">(1,586 reviews)</li -->
                            </ul -->
                        </li>
                        <!-- li className="list-inline-item h6 mb-0 text-white"><i className="fas fa-globe text-info me-2"></i>{course.language}</li -->
                    </ul>
                </div>

                <div className="col-lg-3">
                    <!-- h6 className="text-white lead fw-light mb-3"><i className="fas fa-user-graduate text-orange me-2"></i>{course.eleves|length} {% trans %}ALLREADYENROLLED_KEY{% endtrans %}</h6 -->
                    
                    <!-- Button -->
                    <a href="{url("app_front_course_start", {slug: course.slug}, "http", false)}" className="btn btn-warning mb-3 w-100">
                        {not exist && (

                            {% trans %}ENROLLANDSTART_KEY{% endtrans %}
                        
) || (

                            {% trans %}CONTINUE_READING_KEY{% endtrans %} 
                        
)} 
                    </a>
                    {not app.user or (app.user.eleve and not app.user.eleve.isPremium) && (

                         <a href="{path('app_plan')}" className="btn btn-warning mb-3 w-100">S'abonner et accéder à tous les cours</a>
                    
)}
                    
                    <!-- Progress item -->
                    <div className="overflow-hidden mb-4">
                        <h6 className="text-white">{% trans %}YOURPROGRESS_KEY{% endtrans %}</h6>
                        {% set percent = lessons|length > 0 ? 100 * lectures|length / lessons|length : 0 %}
                        <div className="progress progress-sm bg-white bg-opacity-10 mb-1">
                            <div className="progress-bar bg-white aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: {percent}%;" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <small className="text-white">{lectures|length} sur {lessons|length} {% trans %}COMPLETED_KEY{% endtrans %}</small>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- =======================
    Page content START -->
    <section className="pt-0">
        <div className="container">
            <div className="row">
                <!-- Main content START -->
                <div className="col-12">
                    <div className="card shadow rounded-2 p-0 mt-n5">
                        <!-- Tabs START -->
                        <div className="card-header border-bottom px-4 pt-3 pb-0">
                            <ul className="nav nav-bottom-line py-0" id="course-pills-tab" role="tablist">
                                <!-- Tab item -->
                                <li className="nav-item me-2 me-sm-4" role="presentation">
                                    <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-2" type="button" role="tab" aria-controls="course-pills-2" aria-selected="false">{% trans %}CHAPTERS_KEY{% endtrans %}</button>
                                </li>
                            </ul>
                        </div>
                        <!-- Tabs END -->

                        <!-- Tab contents START -->
                        <div className="card-body p-sm-4">
                            <div className="tab-content" id="course-pills-tabContent">
                                <!-- Content START -->
                                <div className="tab-pane fade show active" id="course-pills-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                                    <div className="card">
                                        <!-- Card header -->
                                        <div className="card-header border-bottom p-0 pb-3">
                                            <!-- Title and select -->
                                            <div className="d-sm-flex justify-content-between align-items-center">
                                                <h4 className="mb-0">{% trans %}ALLCHAPTERS_KEY{% endtrans %}</h4>
                                            </div>
                                        </div>

                                        <!-- Card body -->
                                        <div className="card-body p-0 pt-3">
                                            {% for chap in course.chapitres|sort((a, b) => a.numero <=> b.numero) %}
                                                <!-- Note item -->
                                                <div className="row g-4">
                                                    <!-- Content -->
                                                    <div className="col-sm-12 col-xl-12">
                                                        <h5>{chap.title}</h5>
                                                        <p>{chap.description|raw}</p>
                                                        <!-- Buttons -->
                                                        <div className="hstack gap-3 flex-wrap">
                                                            <a href="{url("app_front_course_start", {slug: course.slug}, "http", false)}" className="btn btn-sm btn-primary mb-0"><i className="bi bi-play-fill me-2"></i> 
                                                            {not exist && (

                                                                {% trans %}STARTREADING_KEY{% endtrans %}
                                                            
) || (

                                                                {% trans %}CONTINUE_KEY{% endtrans %}
                                                            
)}
                                                        </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {not loop.last && (

                                                    <hr /> <!-- Divider -->
                                                
)}
                                            
))}
                                        </div>
                                    </div>
                                </div>
                                <!-- Content END -->

                                

                            </div>
                        </div>
                        <!-- Tab contents END -->
                    </div>
                </div>
                <!-- Main content END -->
            </div><!-- Row END -->
        </div>
    </section>
    <!-- =======================
    Page content END -->


    <!-- =======================
    Listed courses START -->
    <section className="pt-0 mt-5 mb-3">
        <div className="container">
            <!-- Title -->
            <div className="row mb-4">
                <h2 className="mb-0">{% trans %}TOPLISTED_KEY{% endtrans %}</h2>
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
