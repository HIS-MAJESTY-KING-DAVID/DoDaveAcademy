import React from 'react';
import Link from 'next/link';

export default function Show(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Student details{% endblock %}

{% block mainContent %}
	{% set student = eleve %}
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
						<div className="d-flex">
							<div className="avatar mb-3" style="min-width: 14rem;height: 14rem;">
								<img className="avatar-img border border-white border-3 shadow" src="{asset(eleve.utilisateur.personne.avatarPath)}" alt="" />
							</div>
							<div className="p-4 pt-2">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Title:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.sexe|upper is same as 'MASCULIN' ? 'Mr' : 'Miss'}</span>
									</li>

									<li className="list-group-item">
										<span>Full Name:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.nomComplet}</span>
									</li>

									<li className="list-group-item">
										<span>User Name:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.pseudo}</span>
									</li>

									<li className="list-group-item">
										<span>Mobile Number:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.telephone}</span>
									</li>
									<li className="list-group-item">
										<span>Email ID:</span>
										<span className="h6 mb-0">{eleve.utilisateur.email}</span>
									</li>

									<li className="list-group-item">
										<span>Location:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.adresse}</span>
									</li>

								</ul>
							</div>
						</div>

						<!-- Information START -->
						<div className="row">

							<!-- Information item -->
							<div className="col-md-6">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Sous system:</span>
										<span className="h6 mb-0">{eleve.classe.sousSystme.name|default('Undefined')}</span>
									</li>
									<li className="list-group-item">
										<span>Type of :</span>
										<span className="h6 mb-0">{eleve.classe.specialite.filiere.typeEnseignement.name|default('Undefined')}</span>
									</li>
									<li className="list-group-item">
										<span>Filière</span>
										<span className="h6 mb-0">{eleve.classe.specialite.filiere.name|default('Undefined')}</span>
									</li>
									<li className="list-group-item">
										<span>Joining Date:</span>
										<span className="h6 mb-0">{eleve.joinAt|date('d/m/Y')|default('')}</span>
									</li>
								</ul>
							</div>

							<div className="col-md-6">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Spécialité:</span>
										<span className="h6 mb-0">{eleve.classe.specialite.name|default('Undefined')}</span>
									</li>
									<li className="list-group-item">
										<span>Classe:</span>
										<span className="h6 mb-0">{eleve.classe.name|default('Undefined')}</span>
									</li>
									<li className="list-group-item">
										<span>Ecole:</span>
										<span className="h6 mb-0">{eleve.etablissement.name|default('Undefined')}</span>
									</li>
								</ul>
							</div>

                            <div className="col-md-4">
                                <ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Birthday:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.bornAt|date('d/m/Y')}</span>
									</li>
								</ul>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Born at:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.lieuNaissance}</span>
									</li>
								</ul>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Country:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.pays.name}</span>
									</li>
								</ul>
                            </div>

							<!-- Information item -->
							<div className="col-12">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Code & link:</span>
										<span className="h6 mb-0">{eleve.utilisateur.personne.invitationCode}</span>
									</li>
								</ul>
							</div>
                            <div className="col-12">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Link for instructors:</span> 
										<span className="h6 mb-0">{eleve.utilisateur.personne.invitationLink.trainer}</span>
									</li>
								</ul>
							</div>

                            <div className="col-12">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item">
										<span>Link for students:</span> 
										<span className="h6 mb-0">{eleve.utilisateur.personne.invitationLink.student}</span>
									</li>
								</ul>
							</div>

							<!-- Information item -->
							<div className="col-12">
								<ul className="list-group list-group-borderless">
									<li className="list-group-item d-flex">
										<span>Description:</span>
										<p className="h6 mb-0">{eleve.details|default('')}</p>
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
								<h5 className="card-header-title mb-0">Payments</h5>
							</div>
							<!-- Card body -->
							<div className="card-body p-0">
								<div className="d-sm-flex justify-content-between p-4">
									{% set totalAmount = 0 %}
									{% for p in eleve.payments %}
										{% set totalAmount = totalAmount + p.amount %}
									
))}
									<h4 className="text-blue mb-0">{totalAmount|number_format(2)} XAF</h4>
								</div>
								<div className="table-responsive border-0" style="max-height: 250px;overflow: auto;">
										<table className="table table-dark-gray align-middle p-4 mb-0 table-hover">

											<!-- Table head -->
											<thead>
												<tr>
													<th scope="col">Date</th>
													<th>Type</th>
													<th>Amount</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{% for payment in eleve.payments %}
													<tr>
														<td>{payment.paidAt|date('d/m/Y')}</td>
														<td>{payment.cours ? 'Buy Course' : 'Plan'}</td>
														<td>{payment.amount|number_format(2)} XAF</td>
														<td>

														</td>
													</tr>
												
) || (

													<tr>
														<td colspan="3">Empty</td>
													</tr>
												
))}
											</tbody>
										</table>
									</div>
							</div>
						</div>
					</div>
					<!-- Active student END -->

					<!-- Enrolled START -->
					<div className="col-md-6 col-xxl-12">
						<div className="card bg-transparent border overflow-hidden">
							<!-- Card header -->
							<div className="card-header bg-light border-bottom">
								<h5 className="card-header-title mb-0">Network</h5>
							</div>
							<!-- Card body -->
							<div className="card-body p-0">
								<div className="d-sm-flex justify-content-between p-4">
									<h4 className="text-blue mb-0">{eleve.utilisateur.personne.invites|length < 10 ? '0' ~ eleve.utilisateur.personne.invites|length : eleve.utilisateur.personne.invites|length}</h4>
								</div>
								<div>
									<div className="table-responsive border-0" style="max-height: 250px;overflow: auto;">
										<table className="table table-dark-gray align-middle p-4 mb-0 table-hover">

											<!-- Table head -->
											<thead>
												<tr>
													<th scope="col">Name</th>
													<th>Joining date</th>
													<th>Network</th>
												</tr>
											</thead>
											<tbody>
												{% for inv in eleve.utilisateur.personne.invites %}
													<tr>
														<td>
															<div className="d-flex align-items-center">
																<!-- Image -->
																<div className="w-50px">
																	<img src="{asset(inv.avatarPath)}" className="rounded" alt="" />
																</div>
																<div className="mb-0 ms-2">
																	<!-- Title -->
																	<h6><a href="#">{inv.nomComplet}</a></h6>
																</div>
															</div>
														</td>
														<td>
															{inv.joinAt|date('d/m/Y')}
														</td>
														<td>{inv.invites|length}</td>
													</tr>
												
) || (

													<tr>
														<td colspan="3">Empty</td>
													</tr>
												
))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Enrolled END -->

				</div>
			</div>
			<!-- Student status chart END -->
		
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
						<div className="table-responsive border-0" style="max-height: 500px;overflow: auto;">
							<table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
								<!-- Table head -->
								<thead>
									<tr>
										<th scope="col" className="border-0 rounded-start">Course Title</th>
										<th scope="col" className="border-0">Total Lectures</th>
										<th scope="col" className="border-0">Completed Lecture</th>
										<th scope="col" className="border-0 rounded-end">Action</th>
									</tr>
								</thead>

								<!-- Table body START -->
								<tbody>
									{% for course in student.cours %}
										{% set leconTerminees = 0 %}
										{% for l in student.lectures %}
											{l.isFinished and l.lesson is not same as null and l.lesson.chapitre.cours is same as course && (

												{% set leconTerminees = leconTerminees + 1 %}
											
)}
										
))}
										{% set numberOfLessons = course.numberOfLessons > 0 ? course.numberOfLessons : 1 %}
										{% set percent = (leconTerminees * 100 ) / numberOfLessons %}
										<tr>
											<!-- Table data -->
											<td>
												<div className="d-flex align-items-center">
													<!-- Image -->
													<div className="w-100px">
														<img src="{asset('uploads/media/courses/' ~ course.media.imageFile)}" className="rounded" alt="" />
													</div>
													<div className="mb-0 ms-2">
														<!-- Title -->
														<h6><a href="{url("app_front_course_start", {slug: course.slug}, "http", false)}">{course.intitule}</a></h6>
														<!-- Info -->
														<div className="overflow-hidden">
															<h6 className="mb-0 text-end">{percent|number_format(0)}%</h6>
															<div className="progress progress-sm bg-primary bg-opacity-10">
																<div className="progress-bar bg-primary aos" role="progressbar" data-aos="slide-right" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: {percent|number_format(0)}%" aria-valuenow="{percent|number_format(0)}" aria-valuemin="0" aria-valuemax="100">
																</div>
															</div>
														</div>
													</div>
												</div>
											</td>

											<!-- Table data -->
											<td>{course.numberOfLessons}</td>

											<!-- Table data -->
											<td>{leconTerminees}</td>

											<!-- Table data -->
											<td>
												{leconTerminees is same as course.numberOfLessons && (

													<button className="btn btn-sm btn-success me-1 mb-1 mb-x"><i className="bi bi-check me-1"></i>Complete</button>
													<a href="#" className="btn btn-sm btn-light me-1"><i className="bi bi-arrow-repeat me-1"></i>Restart</a>
												
) || (

													<a title="Continue" href="{url("app_front_course_start", {slug: course.slug}, "http", false)}" className="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0"><i className="bi bi-play-circle me-1"></i></a>
												
)}
												
												{course.isFree && (

													<a onclick="return confirm('Etes-vous sure de vouloir supprimer ce cours de votre liste de lecture')" href="{url("app_front_course_start", {id: student.reference, slug: course.slug}, "http", false)}" className="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0"><i className="bi bi-trash me-1"></i></a>
												
)}
											</td>
										</tr>
										
									
) || (

										<tr>
											<td colspan="4">No Courses found</td>
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

		</div> 

{% endblock %}

    </>
  );
}
