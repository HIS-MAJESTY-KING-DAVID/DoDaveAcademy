import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Instructors{% endblock %}

{% block script %}
    <script>
		$('#admin_filter_select_courses').on('change', (e) => {
			window.location.href = $(e.currentTarget).val()
		})
	</script>
{% endblock %}

{% block mainContent %}

    <!-- Card START -->
    <div className="card bg-transparent border">

        <!-- Card header START -->
        <div className="card-header bg-light border-bottom">
            <!-- Search and select START -->
            <div className="row g-3 align-items-center justify-content-between">
                <!-- Search bar -->
                <div className="col-md-8">
                    <form className="rounded position-relative" method="get">
                        <input value="{search}" className="form-control bg-body" type="search" name="search" placeholder="Search" aria-label="Search" />
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

                {enseignants.map(e => (

                    
                    <!-- Card item START -->
                    <div className="col-md-6 col-xxl-4">
                        <div className="card bg-transparent border h-100"> 
                            <!-- Card header -->
                            <div className="card-header bg-transparent border-bottom d-flex align-items-sm-center justify-content-between">
                                <div className="d-sm-flex align-items-center">
                                    <!-- Avatar -->
                                    <div className="avatar avatar-md flex-shrink-0">
                                        <img className="avatar-img rounded-circle" src="{asset(e.utilisateur.personne.avatarPath)}" alt="avatar" />
                                    </div>
                                    <!-- Info -->
                                    <div className="ms-0 ms-sm-2 mt-2 mt-sm-0">
                                        <h5 className="mb-0"><a href="{path('app_admin_enseignant_show', {reference: e.reference})}">{e.utilisateur.personne.nomComplet}</a></h5>
                                        <p className="mb-0 small">{e.discipline.name|default('')}</p>
                                    </div>
                                </div>

                                <!-- Edit dropdown -->
                                <div className="dropdown">
                                    <a href="#" className="btn btn-sm btn-light btn-round small mb-0" role="button" id="dropdownShare1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots fa-fw"></i>
                                    </a>
                                    <!-- dropdown button -->
                                    <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare1">
                                        <li><a className="dropdown-item" href="{path('app_admin_enseignant_show', {reference: e.reference})}"><i className="bi bi-pencil-square fa-fw me-2"></i>Show</a></li>
                                        <li>
                                            {include('admin/enseignant/_delete_form.html.twig', {enseignant: e, classes: 'dropdown-item', icon: "<i class='fas fa-trash fa-fw'></i>"})}
                                        </li>
                                        {not e.isValidated && (

                                            <li><a className="dropdown-item" href="{path('app_admin_enseignant_accept_request', {reference: e.reference})}"><i className="bi bi-pencil-square fa-fw me-2"></i>Accept</a></li>
                                        {% elseif not e.isRejected %}
                                            <li><a className="dropdown-item" href="{path('app_admin_enseignant_reject_request', {reference: e.reference})}"><i className="bi bi-pencil-square fa-fw me-2"></i>Reject</a></li>
                                        
)}
                                    </ul>
                                </div>
                            </div>

                            <div className="card-body">
                                <!-- Total students -->
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle flex-shrink-0"><i className="fas fa-users fa-fw"></i></div>
                                        <h6 className="mb-0 ms-2 fw-light">Networks</h6>
                                    </div>
                                    <span className="mb-0 fw-bold">{e.utilisateur.personne.invites|length > 10 ? e.utilisateur.personne.invites|length : '0' ~ e.utilisateur.personne.invites|length}</span>
                                </div>

                                <!-- Total courses -->
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-md bg-purple bg-opacity-10 text-purple rounded-circle flex-shrink-0"><i className="fas fa-book fa-fw"></i></div>
                                        <h6 className="mb-0 ms-2 fw-light">Total Courses</h6>
                                    </div>
                                    <span className="mb-0 fw-bold">{e.cours|length > 10 ? e.cours|length : '0' ~ e.cours|length}</span>
                                </div>
                            </div>

                            <!-- Card footer -->
                            <div className="card-footer bg-transparent border-top">
                                <div className="d-flex justify-content-between align-items-center">
                                    <!-- Rating star -->
                                    <ul className="list-inline mb-0">
                                        {% for i in 1..e.review %}
                                            <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                        
))}
                                        {e.review < 5 && (

                                            {% for i in e.review..5 %}
                                                <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                                            
))}
                                        
)}
                                    </ul>
                                    <!-- Message button -->
                                    <a href="#" className="btn btn-link text-body p-0 mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Message" aria-label="Message">
                                        <i className="bi bi-envelope-fill"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Card item END -->
                
) || (

                    <div className="text-center">
                        <h3>Liste vide</h3>
                    </div>
                
))}

            </div>
        </div>
        <!-- Card body END -->

        <!-- Card footer START -->
        <div className="card-footer bg-transparent pt-0">
            <!-- Pagination START -->
            <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                <p className="mb-0 text-center text-sm-start"></p>
                {knp_pagination_render(enseignants)}
            </div>
            <!-- Pagination END -->
        </div>
        <!-- Card footer END -->
    </div>
    <!-- Card END -->  
    
    
    <!-- Modal START -->
    <div className="modal fade" id="appDetail" tabindex="-1" aria-labelledby="appDetaillabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                
                <!-- Modal header -->
                <div className="modal-header bg-dark">
                    <h5 className="modal-title text-white" id="appDetaillabel">Applicant details</h5>
                    <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                </div>

                <!-- Modal body -->
                <div className="modal-body p-5">
                    <!-- Name -->
                    <span className="small">Applicant Name:</span>
                    <h6 className="mb-3 applicant-name">Jacqueline Miller</h6>

                    <!-- Email -->
                    <span className="small">Applicant Email id:</span>
                    <h6 className="mb-3 applicant-email">example@gmail.com</h6>

                    <!-- Phone number -->
                    <span className="small">Applicant Phone number:</span>
                    <h6 className="mb-3 applicant-phone">+123 456 789 10</h6>

                    <!-- Summary -->
                    <span className="small">Summary:</span>
                    <div className="applicant-detail"></div>    
                </div>

                <!-- Modal footer -->
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>   
    <!-- Modal END -->

{% endblock %}

    </>
  );
}
