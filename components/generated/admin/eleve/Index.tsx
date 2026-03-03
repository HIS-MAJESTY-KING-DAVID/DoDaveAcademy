import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Students {search ? ("<br /><small>Search Results for key : <b>" ~ search ~ "</b></small>")|raw : ''}{% endblock %}

{% block mainContent %}

    <div className="card bg-transparent">
        <!-- Card header START -->
        <div className="card-header bg-transparent border-bottom px-0">
            <!-- Search and select START -->
            <div className="row g-3 align-items-center justify-content-between">

                <!-- Search bar -->
                <div className="col-md-8">
                    <form method="get" action="{url("app_admin_eleve_index")}" className="rounded position-relative">
                        <input value="{search}" className="form-control bg-transparent" name="search" required type="search" placeholder="Search" aria-label="Search" />
                        <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                            <i className="fas fa-search fs-6 "></i>
                        </button>
                    </form>
                </div>
            </div>
            <!-- Search and select END -->
        </div>
        <!-- Card header END -->

        <!-- Card body START -->
        <div className="card-body px-0">
            <div className="row g-4">
                {eleves.map(eleve => (

                    
                    <!-- Card item START -->
                    <div className="col-md-6 col-xxl-4">
                        <div className="card bg-transparent border h-100"> 
                            <!-- Card header -->
                            <div className="card-header bg-transparent border-bottom d-flex justify-content-between">
                                <div className="d-sm-flex align-items-center">
                                    <!-- Avatar -->
                                    <div className="avatar avatar-md flex-shrink-0">
                                        <img className="avatar-img rounded-circle" src="{asset('uploads/images/eleves/' ~ eleve.utilisateur.personne.avatar)}" alt="avatar" />
                                    </div>
                                    <!-- Info -->
                                    <div className="ms-0 ms-sm-2 mt-2 mt-sm-0">
                                        <h5 className="mb-0"><a href="{path('app_admin_eleve_show', {reference: eleve.reference})}">{eleve.utilisateur.personne.nomComplet|u.truncate(15)}</a></h5>
                                        <span className="text-body small"><i className="fas fa-fw fa-map-marker-alt me-1 mt-1"></i>{eleve.utilisateur.personne.adresse}</span>
                                    </div>
                                </div>

                                <!-- Edit dropdown -->
                                <div className="dropdown text-end">
                                    <a href="#" className="btn btn-sm btn-light btn-round small mb-0" role="button" id="dropdownShare2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots fa-fw"></i>
                                    </a>
                                    <!-- dropdown button -->
                                    <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare2">
                                        <li><a className="dropdown-item" href="{path('app_admin_eleve_show', {reference: eleve.reference})}"><i className="bi bi-eye fa-fw me-2"></i>Profile</a></li>
                                        <li>
                                            {include('admin/eleve/_delete_form.html.twig')}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card-body">
                                <!-- Payments -->
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-md bg-success bg-opacity-10 text-success rounded-circle flex-shrink-0"><i className="bi bi-currency-dollar fa-fw"></i></div>
                                        <h6 className="mb-0 ms-2 fw-light">Payments</h6>
                                    </div>
                                    {% set totalAmount = 0 %}
									{% for p in eleve.payments %}
										{% set totalAmount = totalAmount + p.amount %}
									
))}
                                    <span className="mb-0 fw-bold">{totalAmount|number_format(2)} XAF</span>
                                </div>

                                <!-- Total courses -->
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-md bg-purple bg-opacity-10 text-purple rounded-circle flex-shrink-0"><i className="fas fa-book fa-fw"></i></div>
                                        <h6 className="mb-0 ms-2 fw-light">Total Course</h6>
                                    </div>
                                    <span className="mb-0 fw-bold">{eleve.cours|length}</span>
                                </div>

                                <!-- Total courses -->
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-md bg-purple bg-opacity-10 text-primary rounded-circle flex-shrink-0"><i className="fas fa-book-open fa-fw"></i></div>
                                        <h6 className="mb-0 ms-2 fw-light">Total Formations</h6>
                                    </div>
                                    <span className="mb-0 fw-bold">{eleve.formations|length}</span>
                                </div>
                                
                                <!-- Progress -->
                                <div className="overflow-hidden">
                                    {% set nbCourses = eleve.cours|length > 0 ? eleve.cours|length : 1 %}
                                    {% set nbCoursesFinished = 0 %}
                                    {% for l in eleve.lectures %}
                                        {l.cours and l.isFinished && (

                                            {% set nbCoursesFinished = nbCoursesFinished + 1 %}
                                        
)}
                                    
))}
                                    {% set percent = (nbCoursesFinished * 100) / nbCourses %}
                                    <h6 className="mb-0">{percent|number_format(2)}%</h6>
                                    <div className="progress progress-sm bg-primary bg-opacity-10">
                                        <div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: {percent|number_format(2)}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card footer -->
                            <div className="card-footer bg-transparent border-top">
                                <div className="d-sm-flex justify-content-between align-items-center">
                                    <!-- Rating star -->
                                    <h6 className="mb-2 mb-sm-0">
                                        <i className="bi bi-calendar fa-fw text-orange me-2"></i><span className="text-body">Join at:</span> {eleve.joinAt|date('d/m/Y')}
                                    </h6>
                                    <!-- Buttons -->
                                    <div className="text-end text-primary-hover">
                                        <a href="#" className="btn btn-link text-body p-0 mb-0 me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Message" aria-label="Message">
                                            <i className="bi bi-bell"></i>
                                        </a>
                                        <a href="{path('app_admin_eleve_block', {reference: eleve.reference})}" onclick="return confirm('Are you sure ?')" className="btn btn-link {eleve.utilisateur.isBlocked ? 'text-danger' : 'text-success'} p-0 mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="{eleve.utilisateur.isBlocked ? 'UnBlock' : 'Block'}" aria-label="{eleve.utilisateur.isBlocked ? 'UnBlock' : 'Block'}">
                                            <i className="fas {eleve.utilisateur.isBlocked ? 'fa-lock' : 'fa-unlock'}"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Card item END -->

                
))}
            </div>
        </div>
        <!-- Card footer START -->
        <div className="card-footer bg-transparent pt-0 px-0">
            <!-- Pagination START -->
            <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                <p className="mb-0 text-center text-sm-start"></p>
                {knp_pagination_render(eleves)}
            </div>
            <!-- Pagination END -->
        </div>
        <!-- Card footer END -->
    </div>
    
{% endblock %}

    </>
  );
}
