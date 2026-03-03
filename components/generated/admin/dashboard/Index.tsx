import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends "admin/base.html.twig" %}

{% block pageTitle %}Dashboard{% endblock %}

{% block mainContent %}
    
    <!-- Counter boxes START -->
    <div className="row g-4 mb-4">
        <!-- Counter item -->
        <div className="col-md-6 col-xxl-3">
            <div className="card card-body bg-warning bg-opacity-15 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{completedCourses|length}" data-purecounter-delay="200">0</h2>
                        <span className="mb-0 h6 fw-light">Completed Courses</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-warning text-white mb-0"><i className="fas fa-tv fa-fw"></i></div>
                </div>
            </div>
        </div>

        <!-- Counter item -->
        <div className="col-md-6 col-xxl-3">
            <div className="card card-body bg-purple bg-opacity-10 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{courseInProgress|length}"	data-purecounter-delay="200">0</h2>
                        <span className="mb-0 h6 fw-light">Courses In Progress</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-purple text-white mb-0"><i className="fas fa-book-open fa-fw"></i></div>
                </div>
            </div>
        </div>

        <!-- Counter item -->
        <div className="col-md-6 col-xxl-3">
            <div className="card card-body bg-primary bg-opacity-10 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{eleves|length}"	data-purecounter-delay="200">0</h2>
                        <span className="mb-0 h6 fw-light">Students</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-primary text-white mb-0"><i className="fas fa-user-graduate fa-fw"></i></div>
                </div>
            </div>
        </div>

        <!-- Counter item -->
        <div className="col-md-6 col-xxl-3">
            <div className="card card-body bg-success bg-opacity-10 p-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <!-- Digit -->
                    <div>
                        <div className="d-flex">
                            <h2 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="{enseignants|length}"	data-purecounter-delay="200">0</h2>
                            
                        </div>
                        <span className="mb-0 h6 fw-light">Instructors</span>
                    </div>
                    <!-- Icon -->
                    <div className="icon-lg rounded-circle bg-success text-white mb-0"><i className="bi bi-stopwatch-fill fa-fw"></i></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Counter boxes END -->

    <!-- Chart and Ticket START -->
    <div className="row g-4 mb-4">

        <!-- Chart START -->
        <div className="col-xxl-12">
            <div className="card shadow h-100">

                <!-- Card header -->
                <div className="card-header p-4 border-bottom">
                    <h5 className="card-header-title">Earnings</h5>
                </div>

                <!-- Card body -->
                <div className="card-body">
                    <!-- Apex chart -->
                    <div id="ChartPayout" data-earnings-uri="{url('app_admin_earnings')}"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Chart and Ticket END -->

    <!-- Top listed Cards START -->
    <div className="row g-4">

        <!-- Top instructors START -->
        <div className="col-lg-6 col-xxl-4">
            <div className="card shadow h-100">

                <!-- Card header -->
                <div className="card-header border-bottom d-flex justify-content-between align-items-center p-4">
                    <h5 className="card-header-title">Top Instructors</h5>
                    <a href="{path('app_admin_enseignant_index')}" className="btn btn-link p-0 mb-0">View all</a>
                </div>

                <!-- Card body START -->
                <div className="card-body p-4">

                    {topInstructors.map(enseignant => (

                        <!-- Instructor item START -->
                        <div className="d-sm-flex justify-content-between align-items-center">
                            <!-- Avatar and info -->
                            <div className="d-sm-flex align-items-center mb-1 mb-sm-0">
                                <!-- Avatar -->
                                <div className="avatar avatar-md flex-shrink-0">
                                    <img className="avatar-img rounded-circle" src="{asset(enseignant.utilisateur.personne.avatarPath)}" alt="avatar" />
                                </div>
                                <!-- Info -->
                                <div className="ms-0 ms-sm-2 mt-2 mt-sm-0">
                                    <h6 className="mb-1">{enseignant.utilisateur.personne.nomComplet}<i className="bi bi-patch-check-fill text-info small ms-1"></i></h6>
                                    <ul className="list-inline mb-0 small">
                                        <li className="list-inline-item fw-light me-2 mb-1 mb-sm-0"><i className="fas fa-book text-purple me-1"></i>{enseignant.cours|length < 10 ? '0' ~ enseignant.cours|length : enseignant.cours|length} Courses</li>
                                        <li className="list-inline-item fw-light me-2 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-1"></i>{enseignant.review}/5.0</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Button -->
                            <a href="{path('app_admin_enseignant_show', {reference: enseignant.reference})}" className="btn btn-sm btn-light mb-0">View</a>
                        </div>
                        <!-- Instructor item END -->

                        {not loop.last && (

                            <hr /><!-- Divider -->
                        
)}
                    
))}
                    
                </div>
                <!-- Card body END -->
            </div>
        </div>
        <!-- Top instructors END -->

        <!-- Notice Board START -->
        <div className="col-lg-6 col-xxl-4">
            <div className="card shadow h-100">
                <!-- Card header -->
                <div className="card-header border-bottom p-4">
                    <h5 className="card-header-title">Notice board</h5>
                </div>

                <!-- Card body START -->
                <div className="card-body p-4">
                    <div className="custom-scrollbar h-300px">
                        {notifications.map(notification => (

                            <!-- Notice Board item START -->
                            <div className="d-flex justify-content-between position-relative">
                                <div className="d-sm-flex">
                                    {notification.type is same as 1 && (

                                        {% set text = 'text-orange bg-orange'  %}
                                        {% set icon = 'fa-book-open' %}
                                    {% elseif notification.type is same as 2 %}
                                        {% set text = 'text-purple bg-purple ' %}
                                        {% set icon = 'fa-user-tie' %}
                                    
) || (

                                        {% set text = 'text-danger bg-danger' %}
                                        {% set icon = 'fa-globe' %}
                                    
)}
                                    <div className="icon-lg bg-opacity-10 {text}rounded-2 flex-shrink-0">
                                        <i className="fas {icon} fs-5"></i>
                                    </div>
                                    <!-- Info -->
                                    <div className="ms-0 ms-sm-3 mt-2 mt-sm-0">
                                        <h6 className="mb-0"><a href="#" className="stretched-link">{notification.title}</a></h6>
                                        <p className="mb-0">{notification.message}</p>
                                        <span className="small">{notification.createdAt|date('d/m/Y at H:i:s')}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Notice Board item END -->

                            {not loop.last && (

                                <hr /><!-- Divider -->
                            
)}
                        
) || (

                            <h6>Empty</h6>
                        
))}
                        
                    </div>
                </div>
                <!-- Card body END -->

                <!-- Card footer START -->
                <div className="card-footer border-top">
                    {allNotifications|length > 0 && (

                        <div className="alert alert-success d-flex align-items-center mb-0 py-2">
                            <div>
                                <small className="mb-0">45 more notices listed</small>
                            </div>
                            <div className="ms-auto">
                                <a className="btn btn-sm btn-success-soft mb-0" href=""> View all </a>
                            </div>
                        </div>
                    
)}
                </div>
                <!-- Card footer START -->
            </div>
        </div>
        <!-- Notice Board END -->

        <!-- Traffic sources START -->
        <div className="col-lg-6 col-xxl-4">
            <div className="card shadow h-100">

                <!-- Card header -->
                <div className="card-header border-bottom d-flex justify-content-between align-items-center p-4">
                    <h5 className="card-header-title">Most View Courses</h5>
                </div>

                <!-- Card body START -->
                <div className="card-body p-4">
                    <!-- Chart -->
                    <div className="col-sm-6 mx-auto">
                        <div id="ChartTrafficViews"></div>
                    </div>

                </div>
            </div>
            <!-- Card body END -->
        </div>
        <!-- Traffic sources END -->

    </div>
    <!-- Top listed Cards END -->

{% endblock %}

    </>
  );
}
