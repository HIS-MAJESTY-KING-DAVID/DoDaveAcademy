import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Sous-systèmes scolaire{% endblock %}

{% block actionBtn %}
	<a data-bs-toggle="modal" data-bs-target="#addModal" href="#" className="btn btn-sm btn-primary mb-0">Add School</a>
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
							<th scope="col" className="border-0 rounded-start">Category Name</th>
							<th scope="col" className="border-0">Town</th>
                            <th scope="col" className="border-0">Country</th>
                            <th scope="col" className="border-0">Students</th>
                            <th scope="col" className="border-0">Trainers</th>
							<th scope="col" className="border-0 rounded-end">Action</th>
						</tr>
					</thead>
					
					<!-- Table body START -->
					<tbody>
						{etablissements.map(etablissement => (

							<tr>
								<!-- Table data -->
								<td>
									<div className="d-flex align-items-center position-relative">
										
										<!-- Title -->
										<h6 className="table-responsive-title mb-0 ms-2">	
											<a href="" className="stretched-link">{etablissement.name}</a>
										</h6>
									</div>
								</td>

								<!-- Table data -->
								<td>
                                    {etablissement.ville}
								</td>
                                <td>{etablissement.pays.name}</td>
                                <td>{etablissement.eleves|length}</td>
                                <td> {etablissement.enseignants|length}</td>
                                
								<!-- Table data -->
								<td>
									<a data-url="{path('app_admin_etablissement_edit', {id: etablissement.id})}" href="#" className="btn btn-sm btn-success-soft edit_with_modal_btn me-1 mb-1 mb-md-0">Edit</a>
                                    {include('admin/etablissement/_delete_form.html.twig')}
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
                            {form_row(form)}
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
