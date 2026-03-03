import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Instructor details{% endblock %}

{% block script %}
    <script>
		$('#admin_filter_select_courses').on('change', (e) => {
			window.location.href = $(e.currentTarget).val()
		})
	</script>
{% endblock %}

{% block actionBtn %}
	<p className="text-right">
        {not enseignant.isValidated && (

            {include("admin/enseignant/_accept.html.twig", {e: enseignant})}
        
)}
        {not enseignant.isRejected && (

            <a href="{path('app_admin_enseignant_reject_request', {reference: enseignant.reference})}" className="btn btn-secondary-soft btn-sm me-1 mb-1 mb-lg-0" data-bs-toggle="modal" data-bs-target="#modal-reject-request-{enseignant.id}">Reject</a>
        
)}
    </p>
{% endblock %}

{% block mainContent %}

    <div className="row g-4">

			<!-- Personal information START -->
			<div className="col-xxl-7">
				<div className="card bg-transparent border rounded-3 h-100">

					<!-- Card header -->
					<div className="card-header bg-light border-bottom">
						<h5 className="card-header-title mb-0">Personal Information</h5>
					</div>

					<!-- Card body START -->
					<div className="card-body">
						<!-- Profile picture -->
						<div className="avatar avatar-xl mb-3">
							<img className="avatar-img rounded-circle border border-white border-3 shadow" src="{asset('uploads/images/enseignants/kyc/' ~ enseignant.utilisateur.personne.avatar)}" alt="" />
						</div>

						<!-- Information START -->
						<div className="row">

							<!-- Information item -->
							<div className="col-md-6">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Title:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.sexe|upper is same as 'MASCULIN' ? 'Mr' : 'Miss'}</span>
									</li>

									<li className="list-group-item">
										<span>Full Name:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.nomComplet}</span>
									</li>

									<li className="list-group-item">
										<span>User Name:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.pseudo}</span>
									</li>

									<li className="list-group-item">
										<span>Mobile Number:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.telephone}</span>
									</li>
								</ul>
							</div>

							<!-- Information item -->
							<div className="col-md-6">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Email ID:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.email}</span>
									</li>

									<li className="list-group-item">
										<span>Location:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.adresse}</span>
									</li>

									<li className="list-group-item">
										<span>Joining Date:</span>
										<span className="h6 mb-0">{enseignant.joinAt|date('d/m/Y')|default('')}</span>
									</li>
								</ul>
							</div>

                            <div className="col-md-4">
                                <ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Birthday:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.bornAt|date('d/m/Y')}</span>
									</li>
								</ul>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Born at:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.lieuNaissance}</span>
									</li>
								</ul>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Country:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.pays.name}</span>
									</li>
								</ul>
                            </div>

							<!-- Information item -->
							<div className="col-12">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Code & link:</span>
										<span className="h6 mb-0">{enseignant.utilisateur.personne.invitationCode}</span>
									</li>
								</ul>
							</div>
                            <div className="col-12">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Link for instructors:</span> 
										<span className="h6 mb-0">{enseignant.utilisateur.personne.invitationLink.trainer}</span>
									</li>
								</ul>
							</div>

                            <div className="col-12">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Link for students:</span> 
										<span className="h6 mb-0">{enseignant.utilisateur.personne.invitationLink.student}</span>
									</li>
								</ul>
							</div>

							<!-- Information item -->
							<div className="col-12">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item d-flex">
										<span>Description:</span>
										<p className="h6 mb-0">{enseignant.details}</p>
									</li>
								</ul>
							</div>
						</div>
						<!-- Information END -->
					</div>
					<!-- Card body END -->
				</div>
			</div>
			<!-- Personal information END -->

			<!-- Student status chart START -->
			<div className="col-xxl-5">
				<div className="row g-4">
					<!-- Active student START -->
					<div className="col-md-6 col-xxl-12">
						<div className="card bg-transparent border overflow-hidden">
							<!-- Card header -->
							<div className="card-header bg-light border-bottom">
								<h5 className="card-header-title mb-0">Active Students</h5>
							</div>
							<!-- Card body -->
							<div className="card-body p-0">
								<div className="d-sm-flex justify-content-between p-4">
									<h4 className="text-blue mb-0">984</h4>
									<p className="mb-0"><span className="text-success me-1">0.20%<i className="bi bi-arrow-up"></i></span>vs last Week</p>
								</div>
								<!-- Apex chart -->
								<div id="activeChartstudent"></div>
							</div>
						</div>
					</div>
					<!-- Active student END -->

					<!-- Enrolled START -->
					<div className="col-md-6 col-xxl-12">
						<div className="card bg-transparent border overflow-hidden">
							<!-- Card header -->
							<div className="card-header bg-light border-bottom">
								<h5 className="card-header-title mb-0">New Enrollment</h5>
							</div>
							<!-- Card body -->
							<div className="card-body p-0">
								<div className="d-sm-flex justify-content-between p-4">
									<h4 className="text-blue mb-0">140</h4>
									<p className="mb-0"><span className="text-success me-1">0.35%<i className="bi bi-arrow-up"></i></span>vs last Week</p>
								</div>
								<!-- Apex chart -->
								<div id="activeChartstudent2"></div>
							</div>
						</div>
					</div>
					<!-- Enrolled END -->

				</div>
			</div>
			<!-- Student status chart END -->

            <!-- Instructor Files list START -->
			<div className="col-12">
				<div className="card bg-transparent border h-100">

					<!-- Card header -->
					<div className="card-header bg-light border-bottom">
						<h5 className="mb-0">KYC</h5>
					</div>

					<!-- Card body START -->
					<div className="card-body pb-0">
                        <!-- Image START -->
						<div className="row g-4 mt-4">
							<div className="col-sm-6 col-md-6">
								<a href="{asset('uploads/images/enseignants/kyc/' ~ enseignant.diplome)}" data-glightbox data-gallery="image-popup">
									<img src="{asset('uploads/images/enseignants/kyc/' ~ enseignant.diplome)}" className="rounded-3" alt="" />
								</a>
							</div>

							<div className="col-sm-6 col-md-6">
								<a href="{asset('uploads/images/enseignants/kyc/' ~ enseignant.emploiDuTemps)}" data-glightbox data-gallery="image-popup">
									<img src="{asset('uploads/images/enseignants/kyc/' ~ enseignant.emploiDuTemps)}" className="rounded-3" alt="" />
								</a>
							</div>

							<div className="col-sm-6 col-md-4">
								<a href="{asset('uploads/images/enseignants/kyc/' ~ enseignant.selfieCNI)}" data-glightbox data-gallery="image-popup">
									<img src="{asset('uploads/images/enseignants/kyc/' ~ enseignant.selfieCNI)}" className="rounded-3" alt="" />
								</a>
							</div>

							<div className="col-sm-6 col-md-4">
								<a href="{asset('uploads/images/enseignants/kyc/' ~ enseignant.rectoCNI)}" data-glightbox data-gallery="image-popup">
									<img src="{asset('uploads/images/enseignants/kyc/' ~ enseignant.rectoCNI)}" className="rounded-3" alt="" />
								</a>
							</div>

							<div className="col-sm-6 col-md-4">
								<a href="{asset('uploads/images/enseignants/kyc/' ~ enseignant.versoCNI)}" data-glightbox data-gallery="image-popup">
									<img src="{asset('uploads/images/enseignants/kyc/' ~ enseignant.versoCNI)}" className="rounded-3" alt="" />
								</a>
							</div>
						</div>	
						<!-- Image END -->
                    </div>
                </div>
            </div>
		
			<!-- Instructor course list START -->
			<div className="col-12">
				<div className="card bg-transparent border h-100">

					<!-- Card header -->
					<div className="card-header bg-light border-bottom">
						<h5 className="mb-0">Courses List</h5>
					</div>

					<!-- Card body START -->
					<div className="card-body pb-0">
						<!-- Table START -->
						<div className="table-responsive border-0" style="max-height: 600px;overflow: auto;">
							<table className="table table-dark-gray align-middle p-4 mb-0 table-hover">

								<!-- Table head -->
								<thead>
									<tr>
										<th scope="col" className="border-0 rounded-start">Course Name</th>
										<th scope="col" className="border-0">Enrolled</th>
										<th scope="col" className="border-0">Status</th>
										<th scope="col" className="border-0 rounded-end">Action</th>
									</tr>
								</thead>

								<!-- Table body START -->
								<tbody>
									{courses.map(course => (

                                        
                                        <tr>
                                            <!-- Table data -->
                                            <td className="d-flex align-items-center position-relative">
                                                <div className="w-60px"><img src="{asset('uploads/media/courses/' ~ course.media.imageFile)}" className="rounded" alt="" /></div>
                                                <h6 className="table-responsive-title mb-0 ms-2"><a target="_blank" href="{path('app_front_course_details', {slug: course.slug})}" className="stretched-link">{course.intitule}</a></h6>
                                            </td>

                                            <!-- Table data -->
                                            <td>{course.eleves|length < 10 ? '0' ~ course.eleves|length : course.eleves|length}</td>

                                            <!-- Table data -->
                                            <td>
                                                {course.isValidated && (

                                                    <span className="badge bg-success bg-opacity-15 text-success">Live</span>
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
                                                <a href="{path('app_front_course_details', {slug: course.slug})}" target="_blank" className="btn btn-sm btn-info-soft mb-0">View</a>
                                            </td>
                                        </tr>

                                    
))}
								</tbody>
								<!-- Table body END -->
							</table>
						</div>
						<!-- Table END -->
					</div>
					<!-- Card body END -->

					<!-- Card footer START -->
					<div className="card-footer bg-transparent">
						<!-- Pagination START -->
						<div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                            
						</div>
						<!-- Pagination END -->
					</div>
					<!-- Card footer END -->
				</div>
			</div>


			<!-- Instructor course list END -->

			<!-- Student review START -->
			<div className="col-12">
				<div className="card bg-transparent border">

					<!-- Card header START -->
					<div className="card-header border-bottom bg-light">
						<h5 className="mb-0">All Reviews</h5>
					</div>
					<!-- Card header END -->
		
					<!-- Card body START -->
					<div className="card-body pb-0">
						<!-- Table START -->
						<div className="table-responsive border-0">
							<table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
								<!-- Table head -->
								<thead>
									<tr>
										<th scope="col" className="border-0 rounded-start">Student Name</th>
										<th scope="col" className="border-0">Course Name</th>
										<th scope="col" className="border-0">Rating</th>
										<th scope="col" className="border-0 rounded-end">Action</th>
									</tr>
								</thead>
		
								<!-- Table body START -->
								<tbody>
									{reviews.map(review => (

                                        <!-- Table row -->
                                        <tr>
                                            <!-- Table data -->
                                            <td>
                                                <div className="d-flex align-items-center position-relative">
                                                    <!-- Image -->
                                                    <div className="avatar avatar-xs mb-2 mb-md-0">
                                                        <img src="{asset('uploads/images/eleves/' ~ review.eleve.utilisateur.personne.avatar)}" className="rounded-circle" alt="" />
                                                    </div>
                                                    <div className="mb-0 ms-2">
                                                        <!-- Title -->
                                                        <h6 className="mb-0"><a href="#" className="stretched-link">{review.eleve.utilisateur.personne.nomComplet}</a></h6>
                                                    </div>
                                                </div>
                                            </td>
            
                                            <!-- Table data -->
                                            <td>
                                                <h6 className="table-responsive-title mb-0"><a href="#">{review.cours.intitule}</a></h6>
                                            </td>
            
                                            <!-- Table data -->
                                            <td>
                                                <ul className="list-inline mb-0">
                                                    {% for i in 1..review.rating %}
                                                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                    
))}
                                                    {review.rating < 5 && (

                                                        {% for i in review.rating..4 %}
                                                            <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                                                        
))}
                                                    
)}
                                                </ul>
                                            </td>
            
                                            <!-- Table data -->
                                            <td>
                                                <a href="#" className="btn btn-sm btn-info-soft mb-0" data-bs-toggle="modal" data-bs-target="#viewReview{review.id}">View</a>
                                            </td>
                                        </tr>
                                    
))}

								</tbody>
								<!-- Table body END -->
							</table>
						</div>
						<!-- Table END -->
					</div>
					<!-- Card body END -->
		
					<!-- Card footer START -->
					<div className="card-footer bg-transparent">
						<!-- Pagination START -->
						<div className="d-sm-flex justify-content-sm-between align-items-sm-center">
							
						</div>
						<!-- Pagination END -->
					</div>
					<!-- Card footer END -->
				</div>
			</div>
			<!-- Student review END -->

		</div> 


    {reviews.map(review => (

        <!-- Popup modal for reviwe START -->
        <div className="modal fade" id="viewReview{review.id}" tabindex="-1" aria-labelledby="viewReviewLabel{review.id}" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <!-- Modal header -->
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title text-white" id="viewReviewLabel">Review</h5>
                        <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
                    </div>
                    <!-- Modal body -->
                    <div className="modal-body">
                        <div className="d-md-flex">
                            <!-- Avatar -->
                            <div className="avatar avatar-md me-4 flex-shrink-0">
                                <img className="avatar-img rounded-circle" src="{asset('uploads/images/eleves/' ~ review.eleve.utilisateur.personne.avatar)}" alt="avatar" />
                            </div>
                            <!-- Text -->
                            <div>
                                <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                                    <h5 className="me-3 mb-0">{review.eleve.utilisateur.personne.nomComplet}</h5>
                                    <!-- Review star -->
                                    <ul className="list-inline mb-0">
                                        {% for i in 1..review.rating %}
                                            <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                        
))}
                                        {review.rating < 5 && (

                                            {% for i in review.rating..4 %}
                                                <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                                            
))}
                                        
)}
                                    </ul>
                                </div>
                                <!-- Info -->
                                <p className="small mb-2">{review.createdAt|date('d/m/Y')}</p>
                                <p className="mb-2">{review.message}</p>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Popup modal for reviwe END -->
    
))}
    
	{include("admin/enseignant/_reject_modal.html.twig", {e: enseignant})}

{% endblock %}

    </>
  );
}
