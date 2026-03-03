import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Forum
{% endblock %}

{% block mainContent %}

	<div
		className="card shadow rounded-2 p-0">
		<!-- Tab contents START -->
		<div className="card-body p-4">
			<div className="d-flex mb-4 mt-3">
				<div className="avatar avatar-lg flex-shrink-0 me-2">
					<a href="#">
						<img className="avatar-img rounded-circle" src="{asset(sujet.membre.utilisateur.personne.avatarPath)}" alt="" />
					</a>
				</div>

				<div className="w-100 d-flex">
					<div>
						<h6>
							By
							{sujet.membre.utilisateur.personne.pseudo}
							<span className="badge btn-info-soft">{sujet.createdAt|date('d/m/Y - H:i:s')}</span>
							<span className="badge {sujet.isSolved ? " btn-success-soft" : 'btn-danger-soft'}">{sujet.isSolved ? "Resolved" : "Unresolved"}</span>

						</h6>
						{sujet.content|raw}
					</div>
				</div>
			</div>
			<hr />

			<div className="custom-scrollbar h-500px overflow-hidden">

				<ul className="list-unstyled mb-0">
					{% for message in sujet.forumMessages %}
						{not message.isAnswer && (

							<li className="comment-item" id="item-comment-{message.id}">
								<div
									className="d-flex mb-3">
									<!-- Avatar -->
									<div className="avatar avatar-sm flex-shrink-0">
										<a href="#"><img className="avatar-img rounded-circle" src="{asset(message.membre.utilisateur.personne.avatarPath)}" alt="" /></a>
									</div>
									<div
										className="ms-2">
										<!-- Comment by -->
										<div className="bg-light p-3 rounded">
											<div className="d-flex justify-content-center">
												<div className="me-2">
													<h6 className="mb-1 lead fw-bold">
														<a href="#!">
															{message.membre.utilisateur.personne.pseudo}</a>
													</h6>
													<p className="h6 mb-0">{message.content}</p>
												</div>
												<small>{message.createdAt|date('d/m/Y - H:i:s')}</small>
											</div>
										</div>
										<!-- Comment react -->
										<ul className="nav nav-divider py-2 small">
											<li className="nav-item">
												<a className="text-primary-hover {heIsMembre and not sujet.isSolved ? 'like-forum-message' : ''}" href="{heIsMembre and not sujet.isSolved ? url("app_course_like_forum_message", {id: message.id}) : '#item-comment-' ~ message.id}">
													<i className="fas fa-thumbs-up"></i>
													Like (<span className="nb-likes">{message.likes}</span>)</a>
											</li>
											{not sujet.isSolved and membre is not same as null && (

												<li className="nav-item">
													<a className="text-primary-hover {heIsMembre and not sujet.isSolved ? 'reply-forum-message' : ''}" data-forum-message="{message.id}" data-membre="{membre.id}" data-append-response="#reply-forum-message-{message.id}" {heIsMembre and not sujet.isSolved ? 'data-bs-toggle="modal" data-bs-target="#replyForumMessage"' : ''} href="#">
														<i className="fas fa-reply"></i>
														Reply</a>
												</li>
												{membre is same as sujet.membre && (

													<li className="nav-item">
														<a onclick="return confirm('Are you sure that you want to set these response as the top response that solved your problem ?')" data-bs-toggle="tooltip" title="Resolved by these post" className="text-primary-hover text-success" href="{url("app_course_solve_forum_message", {id: message.id})}">
															<i className="fas fa-check"></i>
															Resolved</a>
													</li>
												
)}
												{heIsMembre and not sujet.isSolved and  (membre.utilisateur.eleve is same as null or message.membre is same as membre) && (

													<li className="nav-item">
														<a onclick="return confirm('Are you sure you want to remov this item?')" className="text-primary-hover text-danger" href="{url("app_instructor_course_forum_subject_delete_message", {id: message.id, _token: csrf_token('delete' ~ message.id)})}">
															<i className="fas fa-trash"></i>
															Remove</a>
													</li>
												
)}
											
)}
										</ul>
									</div>
								</div>
								<!-- Comment item nested START -->
								<ul className="list-unstyled ms-4" id="reply-forum-message-{message.id}">
									{message.forumMessages|length > 0 && (

										<!-- Comment item START -->
										{% for fm in message.forumMessages %}
											<li className="comment-item" id="item-comment-{fm.id}">
												<div
													className="d-flex">
													<!-- Avatar -->
													<div className="avatar avatar-xs flex-shrink-0">
														<a href="#"><img className="avatar-img rounded-circle" src="{asset(fm.membre.utilisateur.personne.avatarPath)}" alt="" /></a>
													</div>
													<!-- Comment by -->
													<div className="ms-2">
														<div className="bg-light p-3 rounded">
															<div className="d-flex justify-content-center">
																<div className="me-2">
																	<h6 className="mb-1  lead fw-bold">
																		<a href="#">
																			{fm.membre.utilisateur.personne.pseudo}
																		</a>
																	</h6>
																	<p className=" mb-0">{fm.content}</p>
																</div>
																<small>{fm.createdAt|date('d/m/Y - H:i:s')}</small>
															</div>
														</div>
														<!-- Comment react -->
														<ul className="nav nav-divider py-2 small">
															<li className="nav-item">
																<a className="text-primary-hover {heIsMembre and not sujet.isSolved ? 'like-forum-message' : ''}" href="{heIsMembre and not sujet.isSolved ? url("app_course_like_forum_message", {id: fm.id}) : '#item-comment-' ~ fm.id}">
																	<i className="fas fa-thumbs-up"></i>
																	Like (<span className="nb-likes">{fm.likes}</span>)</a>
															</li>
															{not sujet.isSolved and membre is same as sujet.membre && (

																<li className="nav-item">
																	<a onclick="return confirm('Are you sure that you want to set these response as the top response that solved your problem ?')" className="text-primary-hover text-success" href="{url("app_course_solve_forum_message", {id: fm.id})}">
																		<i className="fas fa-check"></i>
																		Resolved by these post</a>
																</li>

															
)}
														</ul>
													</div>
												</div>
											</li>
										
))}
										<!-- Comment item END -->
									
)}
								</ul>
							</li>
						
)}
					
) || (

						<h5 className="mt-2 text-danger">No answer found</h5>
					
))}
				</ul>

			</div>

		</div>
		<!-- Tab contents END -->

		<div className="card-footer p-4">
			{not sujet.isSolved && (

				<div
					className="d-flex mb-4 mt-3">
					<!-- Avatar -->
					<div className="avatar avatar-sm flex-shrink-0 me-2">
						<a href="#">
							<img className="avatar-img rounded-circle" src="{asset(app.user.personne.avatarPath)}" alt="" />
						</a>
					</div>

					<form id="newForumMessageForm" method="POST" action="{path("app_front_course_new_forum_message_adminer", {referenceSujet: sujet.reference})}" className="w-100 d-flex">

						<textarea name="message" className="one form-control pe-4 bg-light" placeholder="Add a comment..." rows="5"></textarea>
						<button className="btn btn-primary ms-2 mb-0" type="submit">
							<i className="fas fa-paper-plane"></i>
						</button>
					</form>
				</div>
			
)}
		</div>
	</div>

{% endblock %}

    </>
  );
}
