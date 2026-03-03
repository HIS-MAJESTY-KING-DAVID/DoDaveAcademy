import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Forum{% endblock %}

{% block mainBarnner %}

{% endblock %}

{% block mainContent %}

    <section className="bg-light py-5">
        <div className="container">
            <div className="row g-4 g-md-5 position-relative">
                <!-- SVG decoration -->
                <figure className="position-absolute top-0 start-0 d-none d-sm-block">
                    <svg width="22px" height="22px" viewBox="0 0 22 22">
                        <polygon className="fill-purple" points="22,8.3 13.7,8.3 13.7,0 8.3,0 8.3,8.3 0,8.3 0,13.7 8.3,13.7 8.3,22 13.7,22 13.7,13.7 22,13.7 "></polygon>
                    </svg>
                </figure>

                <!-- Title and Search -->
                <div className="col-lg-10 mx-auto text-center position-relative">
                    <!-- SVG decoration -->
                    <figure className="position-absolute top-50 end-0 translate-middle-y">
                        <svg width="27px" height="27px">
                            <path className="fill-orange" d="M13.122,5.946 L17.679,-0.001 L17.404,7.528 L24.661,5.946 L19.683,11.533 L26.244,15.056 L18.891,16.089 L21.686,23.068 L15.400,19.062 L13.122,26.232 L10.843,19.062 L4.557,23.068 L7.352,16.089 L-0.000,15.056 L6.561,11.533 L1.582,5.946 L8.839,7.528 L8.565,-0.001 L13.122,5.946 Z"></path>
                        </svg>
                    </figure>
                    <!-- Title -->
                    <h1 className="display-6">{% trans %}HELLOHELP_KEY{% endtrans %}</h1>
                    <!-- Search bar -->
                    <div className="col-lg-8 mx-auto text-center mt-4">
                        <form action="{url('app_front_forum_index')}" method="get" className="bg-body shadow rounded p-2">
                            <div className="input-group">
                                <input className="form-control border-0 me-1" type="text" name="search" value="{search|default('')}" placeholder="{% trans %}SEARCH_KEY{% endtrans %}..." />
                                <button type="submit" className="btn btn-blue mb-0 rounded">{% trans %}SUBMIT_KEY{% endtrans %}</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Category START -->
                <div className="col-12">
                    <div className="row g-4 text-center">
                        <p className="mb-0">{% trans %}CHOOSECATEGORYHELP_KEY{% endtrans %}</p>
                        <!-- Category item -->
                        <div className="col-sm-6 col-md-3">
                            <div className="card card-body card-border-hover p-0">
                                <a href="{url('app_terms')}" className="p-3">
                                    <h2><i className="fas fa-street-view transition-base"></i></h2>
                                    <h6 className="mb-0">{% trans %}TERMSANDCONDITIONS_KEY{% endtrans %}</h6>
                                </a>
                            </div>
                        </div>

                        <!-- Category item -->
                        <div className="col-sm-6 col-md-3">
                            <div className="card card-body card-border-hover p-0">
                                <a href="{url('app_front_contact')}" className="p-3">
                                    <h2><i className="fas fa-hands-helping transition-base"></i></h2>
                                    <h6 className="mb-0">{% trans %}ASSISTANCE_KEY{% endtrans %}</h6>
                                </a>
                            </div>
                        </div>

                        <!-- Category item -->
                        <div className="col-sm-6 col-md-3">
                            <div className="card card-body card-border-hover p-0">
                                <a href="{url('app_terms')}" className="p-3">
                                    <h2><i className="fas fa-exclamation-circle transition-base"></i></h2>
                                    <h6 className="mb-0">{% trans %}GENERAL_GUIDE_KEY{% endtrans %}</h6>
                                </a>
                            </div>
                        </div>

                        <!-- Category item -->
                        <div className="col-sm-6 col-md-3">
                            <div className="card card-body card-border-hover p-0">
                                <a href="{url('app_front_courses')}" className="p-3">
                                    <h2><i className="fas fa-flag transition-base"></i></h2>
                                    <h6 className="mb-0">{% trans %}GETINGSTARTED_KEY{% endtrans %}</h6>
                                </a>
                            </div>
                        </div>
                    </div> <!-- Row END -->
                </div>
                <!-- Category END -->
            </div>
        </div>
    </section>

    <!-- =======================
    Page content START -->
    <section className="pt-5 pb-0 pb-lg-5">
        <div className="container">

            <div className="row g-4 g-md-5">
                <!-- Main content START -->
                <div className="col-lg-8">
                    <!-- Title -->
                    <h3 className="mb-4">{% trans %}TOPICSLIST_KEY{% endtrans %}</h3>

                    <!-- FAQ START -->
                    <ul className="list-unstyled">
                        {subjects.map(sujet => (

                            <li>
                                <a href="{url("app_front_course_forum_subject_message", {slug: sujet.forum.cours.slug, reference: sujet.reference})}" className="d-flex mb-4 mt-3">
                                    <div className="avatar avatar-xl flex-shrink-0 me-2">
                                        <img className="avatar-img rounded-circle" src="{asset(sujet.membre.utilisateur.personne.avatarPath)}" alt="" />
                                    </div>

                                    <div className="w-100 d-flex">
                                        <p>
                                            {sujet.content|raw}
                                            <br />
                                            <span className="badge {sujet.isSolved ? "btn-success-soft" : 'btn-danger-soft'}">{sujet.isSolved ? "Resolved" : "Unresolved"}</span> |
                                            <i className="badge btn-info-soft">{sujet.createdAt|date('d M, Y - H:i:s')}</i>
                                            | <span className="badge btn-warning-soft">{sujet.forumMessages|length} comments</span>
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <hr />
                        
) || (

                            <li>{% trans %}NOTOPICFOUND_KEY{% endtrans %}</li>
                        
))}

                    </ul>
                    <!-- FAQ END -->
                    <div className="col-12">
                        <div className="pagination-container">
                            {knp_pagination_render(subjects)}
                        </div>
                    </div>
                </div>
                <!-- Main content END -->

                <!-- Right sidebar START -->
                <div className="col-lg-4">
                    <div className="row mb-5 mb-lg-0">
                        <div className="col-12 col-sm-6 col-lg-12">

                            <!-- Related Topic START -->
                            <div className="card card-body shadow p-4 mb-4">
                                <!-- Title -->
                                <h4 className="mb-3">{% trans %}RELATEDTOPIC_KEY{% endtrans %}</h4>
                                {categories.map(category => (

                                    <!-- Item -->
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <a href="{url('app_front_forum_index_category', {slug: category.slug})}" className="h6 fw-light"><i className="fas fa-caret-right text-orange me-2"></i>{category.name}</a>
                                        {% set nb = 0 %}
                                        {% for cours in category.cours %}
                                            {cours.isValidated and cours.forum is not same as null && (

                                                {% set nb = nb + cours.forum.sujets|length %}
                                            
)}
                                        
))}
                                        <span className="small">({nb})</span>
                                    </div>
                                
))}
                            </div>
                            <!-- Related Topic END -->
                        </div>
                    </div><!-- Row End -->
                </div>
                <!-- Right sidebar END -->
            </div><!-- Row END -->
        </div>
    </section>
    <!-- =======================
    Page content END -->

{% endblock %}
    </>
  );
}
