import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends "instructor/base.html.twig" %}


{% block pageContent %}

    <div className="card bg-transparent border rounded-3">
		<!-- Card header START -->
		<div className="card-header bg-transparent border-bottom">
			<h3 className="mb-0">Students Reviews</h3>
		</div>
		<!-- Card header END -->

		<!-- Card body START -->
		<div className="card-body mt-2 mt-sm-4">
			
            {reviews.map(review => (

                <!-- Review item START -->
                <div className="d-sm-flex">
                    <!-- Avatar image -->
                    <img className="avatar avatar-lg rounded-circle float-start me-3" src="{asset(review.eleve.utilisateur.personne.avatarPath)}" alt="avatar" />
                    <div>
                        <div className="mb-3 d-sm-flex justify-content-sm-between align-items-center">
                            <!-- Title -->
                            <div>
                                <h5 className="m-0">{review.eleve.utilisateur.personne.nomComplet}</h5>
                                <span className="me-3 small">{review.createdAt|date('d/m/Y - H:i:s')}</span>
                            </div>
                            <!-- Review star -->
                            <ul className="list-inline mb-0">
                                {% for i in 1..review.rating %}
                                    <li className="list-inline-item me-0"><i className="fas fa-star text-warning"></i></li>
                                
))}
                                {review.rating < 5 && (

                                    {% for i in review.rating..4 %}
                                        <li className="list-inline-item me-0"><i className="far fa-star text-warning"></i></li>
                                    
))}
                                
)}
                            </ul>	
                        </div>
                        <!-- Content -->
                        <h6><span className="text-body fw-light">Review on:</span> {review.cours.intitule}</h6>
                        <p>{review.message}</p>
                        <!-- Button -->
                        <div className="text-end">
                            <a className="btn btn-sm btn-light mb-0" data-bs-toggle="collapse" href="#collapseComment{loop.index}" role="button" aria-expanded="false" aria-controls="collapseComment">
                                Reply
                            </a>
                            <!-- collapse textarea -->
                            <div className="collapse {loop.first ? 'show' : ''}" id="collapseComment{loop.index}">
                                <form method="POST" action="{url("app_instructor_reply_review", {id: review.id})}" className="d-flex mt-3" onsubmit="return confirm('Are you sure that you want to send this message ?')">
                                    <input type="hidden" name="_token" value="{csrf_token('reply' ~ review.id)}" />
                                    <textarea required name="message" className="form-control mb-0" placeholder="Add a comment..." rows="1" spellcheck="false"></textarea>
                                    <input type="hidden" name="page" value="{currentPage is defined ? currentPage : 1}" />
                                    <button type="submit" className="btn btn-sm btn-primary-soft ms-2 px-4 mb-0 flex-shrink-0"><i className="fas fa-paper-plane fs-5"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Divider -->
                <hr />
                <!-- Review item END -->
            
))}

			<!-- Pagination START -->
			<div className="d-sm-flex justify-content-sm-between pagination-container align-items-sm-center mt-4 mt-sm-3">
                <p className="mb-0 text-center text-sm-start">Showing {((reviews.getCurrentPageNumber - 1) * reviews.getItemNumberPerPage) + 1} to {reviews.getItemNumberPerPage * reviews.getCurrentPageNumber} of {reviews.getTotalItemCount} entries</p>
				{knp_pagination_render(reviews)}
			</div>
			<!-- Pagination END -->
		</div>
		<!-- Card body START -->
	</div>

{% endblock %}



    </>
  );
}
