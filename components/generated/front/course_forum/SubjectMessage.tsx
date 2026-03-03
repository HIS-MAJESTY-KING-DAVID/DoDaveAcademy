import React from 'react';
import Link from 'next/link';

export default function SubjectMessage(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Forum, {course.intitule}{% endblock %}

{% block mainContent %}


    <!-- =======================
    Page content START -->
    <section className="pb-0 py-lg-5">
        <div className="container">
            <div className="row">
                <!-- Main content START -->
                <div className="col-lg-12">
                    {include('front/course_forum/_messages.html.twig')}
                </div>

                <div className="col-lg-12 mt-5">
                    <div className="card shadow rounded-2 p-0">

                        <!-- Tab contents START -->
                        <div className="card-body p-4">
                            <h3>{% trans %}OTHERSTOPICS_KEY{% endtrans %}</h3>
                            <hr />

                            <div>
                                <ul className="list-unstyled">
                                    {% for subject in course.forum.sujets|sort((a, b) => b.createdAt <=> a.createdAt) %}
                                        {subject is not same as sujet && (

                                            <li>
                                                <div  className="d-flex mb-4 mt-3">
                                                    <div className="avatar avatar-sm flex-shrink-0 me-2">
                                                        <a href="#"> <img className="avatar-img rounded-circle" src="{asset(subject.membre.utilisateur.personne.avatarPath)}" alt="" /> </a>
                                                    </div>

                                                    <div className="w-100 d-flex">
                                                        <p>
                                                            {subject.content|raw}
                                                            <br />
                                                            <span className="badge {subject.isSolved ? "btn-success-soft" : 'btn-danger-soft'}">{subject.isSolved ? "{% trans %}RESOLVED_KEY{% endtrans %}" : "{% trans %}UNRESOLVED_KEY{% endtrans %}"}</span> |
                                                            <i className="badge btn-info-soft">{subject.createdAt|date('d/m/Y - H:i:s')}</i>
                                                            | <span className="badge btn-warning-soft">{subject.forumMessages|length} {% trans %}COMMENTS_KEY{% endtrans %}</span>
                                                            | <a href="{url("app_front_course_forum_subject_message", {slug: subject.forum.cours.slug, reference: subject.reference}, "http", false)}" className="btn btn-primary-soft">{% trans %}SHOWCOMMENT_KEY{% endtrans %}</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                            <hr />
                                        
)}
                                    
))}
                                </ul>
                            </div>

                        </div>
                        <!-- Tab contents END -->

                        <div className="card-footer p-4">
                            
                        </div>
                    </div>
                </div>

                <!-- Main content END -->

            </div><!-- Row END -->
        </div>
    </section>
    <!-- =======================
    Page content END -->

{% endblock %}

    </>
  );
}
