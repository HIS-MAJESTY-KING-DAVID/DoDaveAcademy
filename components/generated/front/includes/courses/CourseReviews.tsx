import React from 'react';
import Link from 'next/link';

export default function CourseReviews(props: any) {
  return (
    <>
<!-- Review START -->
<div className="row mb-4">
    <h5 className="mb-4">Our Student Reviews</h5>

    <!-- Rating info -->
    <div className="col-md-4 mb-3 mb-md-0">
        <div className="text-center">
            <!-- Info -->
            <h2 className="mb-0">{course.review / nbReviews}</h2>
            <!-- Star -->
            <ul className="list-inline mb-0">
                {% for cmp in 1..(course.review / nbReviews) %}
                    <li className="list-inline-item me-0"><i className="fas fa-star text-warning"></i></li>
                
))}
                {course.review / nbReviews  < 5 && (

                    {% for cmp in (course.review / nbReviews)..4 %}
                        <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                    
))}
                
)}
            </ul>
            <p className="mb-0">(Based on todays review)</p>
        </div>
    </div>

    <!-- Progress-bar and star -->
    <div className="col-md-8">
        <div className="row align-items-center text-center">
            <!-- Progress bar and Rating -->
            <div className="col-6 col-sm-8">
                <!-- Progress item -->
                <div className="progress progress-sm bg-warning bg-opacity-15">
                    <div className="progress-bar bg-warning" role="progressbar" style="width: {(fiveStarsReviews|length / nbReviews) * 100}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>

            <div className="col-6 col-sm-4">
                <!-- Star item -->
                <ul className="list-inline mb-0">
                    {% for i in 1..5 %}
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    
))}
                </ul>
            </div>

            <!-- Progress bar and Rating -->
            <div className="col-6 col-sm-8">
                <!-- Progress item -->
                <div className="progress progress-sm bg-warning bg-opacity-15">
                    <div className="progress-bar bg-warning" role="progressbar" style="width: {(fourStarsReviews|length / nbReviews) * 100}%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>

            <div className="col-6 col-sm-4">
                <!-- Star item -->
                <ul className="list-inline mb-0">
                    {% for i in 1..4 %}
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    
))}
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                </ul>
            </div>

            <!-- Progress bar and Rating -->
            <div className="col-6 col-sm-8">
                <!-- Progress item -->
                <div className="progress progress-sm bg-warning bg-opacity-15">
                    <div className="progress-bar bg-warning" role="progressbar" style="width: {(treeStarsReviews|length / nbReviews) * 100}%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>

            <div className="col-6 col-sm-4">
                <!-- Star item -->
                <ul className="list-inline mb-0">
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                </ul>
            </div>

            <!-- Progress bar and Rating -->
            <div className="col-6 col-sm-8">
                <!-- Progress item -->
                <div className="progress progress-sm bg-warning bg-opacity-15">
                    <div className="progress-bar bg-warning" role="progressbar" style="width: {(twoStarsReviews|length / nbReviews) * 100}%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>

            <div className="col-6 col-sm-4">
                <!-- Star item -->
                <ul className="list-inline mb-0">
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                </ul>
            </div>

            <!-- Progress bar and Rating -->
            <div className="col-6 col-sm-8">
                <!-- Progress item -->
                <div className="progress progress-sm bg-warning bg-opacity-15">
                    <div className="progress-bar bg-warning" role="progressbar" style="width: {(oneStarReviews|length / nbReviews) * 100}%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>

            <div className="col-6 col-sm-4">
                <!-- Star item -->
                <ul className="list-inline mb-0">
                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                    <li className="list-inline-item me-0 small"><i className="far fa-star text-warning"></i></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- Review END -->

<!-- Student review START -->
<div className="row">
    {% for review in course.reviews %} 
        <!-- Review item START -->
        <div className="d-md-flex my-4">
            <!-- Avatar -->
            <div className="avatar avatar-xl me-4 flex-shrink-0">   
                <img className="avatar-img rounded-circle" src="{asset('uploads/images/eleves/' ~ review.eleve.utilisateur.personne.avatar)}" alt="avatar" />
            </div>
            <!-- Text -->
            <div>
                <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                    <h5 className="me-3 mb-0">{review.eleve.utilisateur.personne.nomComplet}</h5>
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
                <!-- Info -->
                <p className="small mb-2">{review.createdAt|date('d/m/Y - H:i:s')}</p>
                <p className="mb-2">{review.message}</p>

            </div>
        </div>
        <!-- Divider -->
        <hr />
    
))}
</div>
<!-- Student review END -->
{app.user and app.user.eleve is not same as null and course in app.user.eleve.cours && (

    <!-- Leave Review START -->
    <div className="mt-2">
        <h5 className="mb-4">Leave a Review</h5>
        {/* <form className="row g-3"> */}
        {form_start(fromReview, {'attr': {'class': 'row g-3'}) }}
            <!-- Rating -->
            <div className="col-12">
                {form_widget(fromReview.rating)}
            </div>
            <!-- Message -->
            <div className="col-12">
                {form_widget(fromReview.message)}
            </div>
            <!-- Button -->
            <div className="col-12">
                <button type="submit" className="btn btn-primary mb-0">Post Review</button>
            </div>
        {form_end(fromReview)}
    </div>
    <!-- Leave Review END -->

)}
    </>
  );
}
