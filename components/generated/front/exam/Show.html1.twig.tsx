import React from 'react';
import Link from 'next/link';

export default function Show.html1.twig(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Courses{% endblock %}

{% block script %}
	
{% endblock %}

{% block mainContent %}

    <!-- Main Content START -->
    <section className="pb-0 pt-4 pb-md-5">
        <div className="container">
            <div className="row">
                <div className="col-12">

                    <!-- Title and Info START -->
                    <div className="row">
                        <!-- Avatar and Share -->
                        <div className="col-lg-3 align-items-center mt-4 mt-lg-5 order-2 order-lg-1">
                            <div className="text-lg-center">
                                <!-- Author info -->
                                <div className="position-relative">
                                    <!-- Avatar -->
                                    <div className="avatar avatar-xxl">
                                        <img className="avatar-img rounded-circle" src="{asset(exam.user.personne.avatarPath)}" alt="avatar" />
                                    </div>
                                    <a href="#" className="h5 stretched-link mt-2 mb-0 d-block">{exam.user.personne.nomComplet}</a>
                                    <p className="mb-2">Editor at kulmapeck</p>
                                </div>
                                <!-- Info -->
                                <ul className="list-inline list-unstyled">
                                    <li className="list-inline-item d-lg-block my-lg-2">{exam.publishedAt|date("d/m/Y - H:i:s")}</li>
                                    {display is not same as 'correction' && (

                                        <li className="list-inline-item d-lg-block my-lg-2"><a href="{url("app_front_exam_show", {reference: exam.reference, display: 'correction'})}" className="btn btn-success-soft">{% trans %}SHOWANSWER_KEY{% endtrans %}</a></li>
                                    
) || (

                                        <li className="list-inline-item d-lg-block my-lg-2"><a href="{url("app_front_exam_show", {reference: exam.reference, display: 'subject'})}" className="btn btn-primary-soft">{% trans %}BACKTOSUBJECT_KEY{% endtrans %}</a></li>
                                    
)}
                                </ul>
                            </div>
                        </div>

                        <!-- Content -->
                        <div className="col-lg-9 order-1">
                            <!-- Pre title -->
                            <span className="badge text-bg-primary">{exam.classe.name}</span><span className="mx-2">|</span><div className="badge text-bg-success">{exam.category.name}</div>
                            <!-- Title -->
                            <h1 className="mt-2 mb-0 display-5">{exam.title}</h1>
                            <!-- Info -->
                            <p className="mt-2">{exam.description}</p>
                            
                        </div>
                    </div>
                    <!-- Title and Info END -->
                    
                    <!-- Video START -->
                    <div className="row mt-4">
                        <div className="col-xl-10 mx-auto">
                            <!-- Card item START -->
                             <div className="card overflow-hidden h-700px rounded-3 text-center" style="background-image:url(assets/images/event/10.jpg); background-position: center left; background-size: cover;">
                                <!-- Card Image overlay -->
                                <div className="bg-overlay bg-dark opacity-4"></div>
                                <div className="card-img-overlay d-flex align-items-center p-2 p-sm-4"> 
                                    <div className="w-100 my-auto">
                                        <div className="row justify-content-center">
                                            <iframe src="{asset('uploads/media/exams/files/' ~ data)}#toolbar=0&navpanes=0" height="800px" frameborder="0" style="pointer-events: auto; overflow: scroll;" oncontextmenu="return false;"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Card item END -->
                        </div>
                    </div>
                    <!-- Video END -->
                    
                </div>
            </div> <!-- Row END -->
        </div>
    </section>
    <!-- Main Content END -->
    
    {include('front/includes/_newsletterorange.html.twig')}
    
    {courses is defined and courses is not empty && (

        <!-- Related blog START -->
        <section className="pt-0">
            <div className="container">
            <!-- Title -->
                <div className="row mb-4">
                    <div className="col-12">
                    <h2 className="mb-0">{% trans %}MOSTPOPULAR_KEY{% endtrans %}</h2>
                    </div>
                </div>
                
                <!-- Slider START -->
                <div className="tiny-slider arrow-round arrow-hover arrow-dark">
                    <div className="tiny-slider-inner" data-autoplay="false" data-arrow="true" data-edge="2" data-dots="false" data-items="3" data-items-lg="2" data-items-sm="1">
                        {courses.map(course => (

                            <!-- Slider item -->
                            <div className="card bg-transparent">
                                <div className="row g-0">
                                    <!-- Image -->
                                    <div className="col-md-4">
                                        <img src="{asset('uploads/media/courses/' ~ course.media.imageFile)}" className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <!-- Card body -->
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <!-- Title -->
                                            <h6 className="card-title"><a href="{url("app_front_course_details", {slug: course.slug})}">{course.intitule}</a></h6>
                                            <span className="small">{course.createdAt|date('d/m/Y')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
))}
                    </div>
                </div>
                <!-- Slider END -->
            </div>
        </section>
        <!-- Related blog END -->
    
)}

{% endblock %}

    </>
  );
}
