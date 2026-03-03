import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Cours{% endblock %}

{% block script %}
    <script>
		const showRejectedFormModal = (e) => {
			const action = e.currentTarget.dataset.uri;
			$('#RejectedCourseForumMessage form').attr('action', action)
			$('#RejectedCourseForumMessage form').attr('method', 'POST')

			$('#RejectedCourseForumMessage').modal("show")
		}

		$('#admin_filter_select_courses').on('change', (e) => {
			window.location.href = $(e.currentTarget).val()
		})

		document.querySelectorAll('.reject-course-btn').forEach(btn => {
			btn.addEventListener("click", showRejectedFormModal)
		})

	</script>
{% endblock %}

{% block mainContent %}

    <!-- Course boxes START -->
	<div className="row g-4 mb-4">
		<!-- Course item -->
		<div className="col-sm-6 col-lg-4">
			<div className="text-center p-4 bg-primary bg-opacity-10 border border-primary rounded-3">
				<h6>Total Courses</h6>
				<h2 className="mb-0 fs-1 text-primary">{cours|length}</h2>
			</div>
		</div>

		<!-- Course item -->
		<div className="col-sm-6 col-lg-4">
			<div className="text-center p-4 bg-success bg-opacity-10 border border-success rounded-3">
				<h6>Activated Courses</h6>
				<h2 className="mb-0 fs-1 text-success">{activatedCourses|length}</h2>
			</div>
		</div>

		<!-- Course item -->
		<div className="col-sm-6 col-lg-4">
			<div className="text-center p-4  bg-warning bg-opacity-15 border border-warning rounded-3">
				<h6>Pending Courses</h6>
				<h2 className="mb-0 fs-1 text-warning">{pendingCourses|length}</h2>
			</div>
		</div>
	</div>
	<!-- Course boxes END -->

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
							<option  value="{path('app_admin_cours_index')}">Sort by</option>
							<option {filter is same as 'newest' ? 'selected' : ''} value="{path('app_admin_cours_index', {filter: 'newest'})}">Newest</option>
							<option {filter is same as 'oldest' ? 'selected' : ''} value="{path('app_admin_cours_index', {filter: 'oldest'})}">Oldest</option>
							<option {filter is same as 'accepted' ? 'selected' : ''} value="{path('app_admin_cours_index', {filter: 'accepted'})}">Accepted</option>
							<option {filter is same as 'rejected' ? 'selected' : ''} value="{path('app_admin_cours_index', {filter: 'rejected'})}">Rejected</option>
							<option {filter is same as 'free' ? 'selected' : ''} value="{path('app_admin_cours_index', {filter: 'free'})}">Free</option>
							<option {filter is same as 'premium' ? 'selected' : ''} value="{path('app_admin_cours_index', {filter: 'premium'})}">Premium</option>
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
							<th scope="col" className="border-0 rounded-start">Course Name</th>
							<th scope="col" className="border-0">Instructor</th>
							<th scope="col" className="border-0">Added Date</th>
							<th scope="col" className="border-0">Type</th>
							<th scope="col" className="border-0">Price</th>
							<th scope="col" className="border-0">Status</th>
							<th scope="col" className="border-0 rounded-end">Action</th>
						</tr>
					</thead>
					
					<!-- Table body START -->
					<tbody>
						{courses.map(course => (

							<tr className="text-center">
								<!-- Table data -->
								<td>
									<div className="d-flex align-items-center position-relative">
										<!-- Image -->
										<div className="w-60px">
											<img src="{asset('uploads/media/courses/' ~ course.media.imageFile)}" className="rounded" alt="" />
										</div>
										<!-- Title -->
										<h6 className="table-responsive-title mb-0 ms-2">	
											<a href="{path('app_admin_cours_show', {slug: course.slug})}" className="stretched-link">{course.intitule|u.truncate(40, '...')}</a>
										</h6>
									</div>
								</td>

								<!-- Table data -->
								<td>
									<div className="d-flex align-items-center mb-3">
										<!-- Avatar -->
										<div className="avatar avatar-xs flex-shrink-0">
											<img className="avatar-img rounded-circle" src="{asset(course.enseignant.utilisateur.personne.avatarPath)}" alt="avatar" />
										</div>
										<!-- Info -->
										<div className="ms-2">
											<h6 className="mb-0 fw-light">{course.enseignant.utilisateur.personne.nomComplet|u.truncate(15, '...')}</h6>
										</div>
									</div>
								</td>

								<!-- Table data -->
								<td>{course.createdAt|date('d/m/Y')}</td>

								<!-- Table data -->
								<td> <span className="badge text-bg-primary">{course.niveauDifficulte}</span> </td>

								<!-- Table data -->
								<td>{course.isFree ? 'Free' : course.montantAbonnement}</td>

								<!-- Table data -->
								<td>
									{course.isValidated && (

										<span className="badge bg-success bg-opacity-15 text-success">Pulished</span>
									{% elseif course.isRejected %}
										<span className="badge bg-danger bg-opacity-15 text-danger">Rejected</span>
									{% elseif course.isPublished %}
										<span className="badge bg-warning bg-opacity-15 text-warning">Pending</span>
									
) || (

										<span className="badge bg-primary bg-opacity-15 text-primary">Creating</span>
									
)}
								</td>

								<!-- Table data -->
								<td>
									<a className="btn btn-round btn-primary-soft btn-sm" target="_blank" data-bs-toggle="tooltip" title="Preview" href="{url("app_front_course_details", {slug: course.slug})}"><i className="fas fa-eye"></i></a>
									{not course.isValidated && (

										{course.isPublished && (

											<a href="{url("app_admin_cours_approve", {slug: course.slug})}" onclick="return confirm('You are going to approve this course. Are you sure that you want to continue ?')" data-bs-toggle="tooltip" title="Approve" className="btn btn-sm btn-round btn-success-soft"><i className="fas fa-check-circle"></i></a>
											<button data-bs-toggle="tooltip" data-uri="{url("app_admin_cours_rejected", {slug: course.slug})}" className="btn btn-sm btn-danger-soft btn-round reject-course-btn" title="Rejected"><i className="fas fa-times"></i></button>
										
										
)}
									
) || (

										<a href="{url("app_admin_cours_send_to_update", {slug: course.slug})}" onclick="return confirm('Etes-vous sure de vouloir renvoyer ce cours ?')" title="Retirer du site pour une mise à jour" className="btn btn-sm btn-round btn-warning-soft"><i className="fas fa-edit"></i></a>
									
)}
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
			<div className="d-sm-flex justify-content-sm-between align-items-sm-center pagination-container">
				<p className="mb-0 text-center text-sm-start"></p>
				{knp_pagination_render(courses)}
			</div>
			<!-- Pagination END -->
		</div>
		<!-- Card footer END -->
	</div>
	<!-- Card END --> 
	

	<!-- Modal START -->
	<div className="modal fade" id="RejectedCourseForumMessage" tabindex="-1" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header border-0">
					<!-- Close button -->
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<!-- Modal body -->
				<div className="modal-body px-5 pb-5 position-relative overflow-hidden">
                    <div className="d-flex mb-4 mt-3">
                        <form onsubmit="return confirm('Confirm the reject of this course')" className="w-100 d-flex" method="POST" action="">
                            <textarea name="message" required className="one form-control pe-4 bg-light" placeholder="Add a comment..." rows="4"></textarea>
                            <button className="btn btn-primary ms-2 mb-0" type="submit"><i className="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
				</div>
				
			</div>
		</div>
	</div>  
	<!-- Modal END -->

{% endblock %}

    </>
  );
}
