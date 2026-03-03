import React from 'react';
import Link from 'next/link';

export default function Request(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Instructors request{% endblock %}

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

                <!-- Select option -->
                <div className="col-md-3">
                    <!-- Short by filter -->
                    <form>
                        <select id="admin_filter_select_courses" className="form-select js-choice border-0 z-index-9" aria-label=".form-select-sm">
                            <option  value="{path('app_admin_enseignant_request')}">All</option>
                            <option {filter is same as 'accepted' ? 'selected' : ''} value="{path('app_admin_enseignant_request', {filter: 'accepted'})}">Accepted</option>
                            <option {filter is same as 'rejected' ? 'selected' : ''} value="{path('app_admin_enseignant_request', {filter: 'rejected'})}">Rejected</option>
                        </select>
                    </form>
                </div>
            </div>
            <!-- Search and select END -->
        </div>
        <!-- Card header END -->

        <!-- Card body START -->
        <div className="card-body">
            <!-- Course table START -->
            <div className="table-responsive border-0 rounded-3">
                <!-- Table START -->
                <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    <!-- Table head -->
                    <thead>
                        <tr>
                            <th scope="col" className="border-0 rounded-start">Instructor Name</th>
                            <th scope="col" className="border-0">Birthday</th>
                            <th scope="col" className="border-0">Gender</th>
                            <th scope="col" className="border-0">Country</th>
                            <th scope="col" className="border-0">Phone</th>
                            <th scope="col" className="border-0">Email</th>
                            <th scope="col" className="border-0 rounded-end">Action</th>
                        </tr>
                    </thead>
                    
                    <!-- Table body START -->
                    <tbody>
                        {enseignants.map(e => (

                            <tr>
                                <!-- Table data -->
                                <td>
                                    <div className="d-flex align-items-center position-relative">
                                        <!-- Image -->
                                        <div className="w-60px">
                                            <img src="{asset('uploads/images/enseignants/kyc/' ~ e.utilisateur.personne.avatar)}" className="rounded" alt="" />
                                        </div>
                                        <!-- Title -->
                                        <h6 className="table-responsive-title mb-0 ms-2">	
                                            <a href="{path('app_admin_enseignant_show', {reference: e.reference})}" className="stretched-link">{e.utilisateur.personne.nomComplet}</a>
                                        </h6>
                                    </div>
                                </td>

                                <!-- Table data -->
                                <td>{e.utilisateur.personne.bornAt|date('d/m/Y')}</td>

                                <!-- Table data -->
                                <td>{e.utilisateur.personne.sexe}</td>

                                <!-- Table data -->
                                <td>{e.utilisateur.personne.pays.name}</td>

                                <!-- Table data -->
                                <td>{e.utilisateur.personne.telephone}</td>

                                <!-- Table data -->
                                <td> <span className="badge text-bg-primary">{e.utilisateur.email}</span> </td>
                                <!-- Table data -->
                                <td>
                                    {e.isValidated && (

                                        <a href="#" className="btn btn-success me-1 mb-1 mb-md-0 disabled">{e.isCertified ? "Certifié" : "Junior"}</a>
                                        {e.isCertified && (

                                            <a title="Définir comme enseignant junior" href="{path('app_admin_enseignant_accept_request', {reference: e.reference, type: 'junior'})}" className="btn btn-success me-1 mb-1 mb-md-0 btn-sm">Changer</a>
                                        
) || (

                                            <a title="Définir comme enseignant certifié" href="{path('app_admin_enseignant_accept_request', {reference: e.reference, type: 'confirmed'})}" className="btn btn-success me-1 mb-1 mb-md-0 btn-sm">Changer</a>
                                        
)}
                                    {% elseif e.isRejected %}
                                        
                                        {include("admin/enseignant/_accept.html.twig")}
                                        
                                        <a href="#" className="btn btn-secondary btn-sm me-1 mb-1 mb-md-0 disabled">Rejected</a>
                                    
) || (

                                        {include("admin/enseignant/_accept.html.twig")}
                                        <a href="{path('app_admin_enseignant_reject_request', {reference: e.reference})}" className="btn btn-secondary-soft btn-sm me-1 mb-1 mb-lg-0" data-bs-toggle="modal" data-bs-target="#modal-reject-request-{e.id}">Reject</a>
                                    
)}
                                    <a href="{path('app_admin_enseignant_show', {reference: e.reference})}" className="btn btn-primary-soft btn-sm me-1 mb-0">View App</a>
                                </td>
                            </tr>
                        
) || (

                            <tr><td colspan="7">No data found</td></tr>
                        
))}
                    </tbody>
                    <!-- Table body END -->
                </table>
                <!-- Table END -->
            </div>
            <!-- Course table END -->
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
    
    
    {enseignants.map(e => (

        {include("admin/enseignant/_reject_modal.html.twig")}
    
))}

{% endblock %}

    </>
  );
}
