import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Users{% endblock %}

{% block actionBtn %}
	<a data-bs-toggle="modal" data-bs-target="#addModal" href="{path('app_admin_registration_register')}" className="btn btn-sm btn-primary mb-0">Add New User</a>
{% endblock %}

{% block script %}
    
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
						<input value="{search|default('')}" className="form-control bg-body" type="search" name="search" placeholder="Search" aria-label="Search" />
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
		<div className="card-body">
			<!-- Course table START -->
			<div className="table-responsive border-0 rounded-3">
				<!-- Table START -->
				<table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
					<!-- Table head -->
					<thead>
						<tr>
							<th scope="col" className="border-0 rounded-start">Name</th>
							<th scope="col" className="border-0">Email</th>
                            <th scope="col" className="border-0">Phone</th>
                            <th scope="col" className="border-0">Pseudo</th>
							<th scope="col" className="border-0 rounded-end">Action</th>
						</tr>
					</thead>
					
					<!-- Table body START -->
					<tbody>
						{users.map(user => (

							<tr>
								<!-- Table data -->
								<td>
									<div className="d-flex align-items-center position-relative">
										<!-- Image -->
										<div className="w-60px">
											<img src="{asset(user.personne.avatarPath)}" className="rounded" alt="" />
										</div>
										<!-- Title -->
										<h6 className="table-responsive-title mb-0 ms-2">	
											<a href="" className="stretched-link">{user.personne.nomComplet}</a>
										</h6>
									</div>
								</td>

								<!-- Table data -->
								<td>
                                    {user.email}
								</td>
                                <!-- Table data -->
								<td>
                                    {user.personne.telephone}
								</td>
                                <!-- Table data -->
								<td>
                                    {user.personne.pseudo}
								</td>
                                
								<!-- Table data -->
								<td>
									<a href="{path('app_admin_registration_edit_register', {id: user.id})}" className="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0">Edit</a>
									{not user.isVerified && (

										{% set token = csrf_token('active' ~ user.id) %}
										<a href="{path('app_admin_registration_active_user', {id: user.id, _token: token})}" className="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0">activer</a>
									
) || (

										{not user.isBlocked && (

											<a href="{path('app_admin_registration_block', {id: user.id})}" className="btn btn-sm btn-warning-soft me-1 mb-1 mb-md-0">Block</a>
										
) || (

											<a href="{path('app_admin_registration_unblock', {id: user.id})}" className="btn btn-sm btn-warning-soft me-1 mb-1 mb-md-0">Open</a>    
										
)}
									
)}
                                    
                                    {include('admin/includes/_delete_form.html.twig', {path: path('app_admin_registration_delete', {id: user.id}) , token: csrf_token('delete' ~ user.id), classes: 'btn btn-danger-soft btn-sm'})}
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

			</div>
			<!-- Pagination END -->
		</div>
		<!-- Card footer END -->
	</div>
    <!-- Card END -->
 

    <!-- Popup modal for reviwe START -->
    <div className="modal fade" id="addModal" tabindex="-1" aria-labelledby="viewReviewLabel" aria-hidden="true">
        <div className="modal-dialog">
            {form_start(form)}
                <div className="modal-content">
                    <!-- Modal header -->
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title text-white" id="viewReviewLabel">Add</h5>
                        <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    </div>
                    <!-- Modal body -->
                    <div className="modal-body">
                        {include('admin/registration/_form.html.twig', {registrationForm: form})}
                    </div>
                    <!-- Modal footer -->
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-success-soft my-0">Add</button>
                    </div>
                </div>
            {form_end(form)}
        </div>
    </div>
    <!-- Popup modal for reviwe END --> 

{% endblock %}
    </>
  );
}
