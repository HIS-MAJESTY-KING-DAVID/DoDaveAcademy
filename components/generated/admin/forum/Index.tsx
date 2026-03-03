import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Forum{% endblock %}

{% block mainContent %}

    <div className="row">
        <!-- Main content START -->
        <div className="col-lg-12">
            <div className="card shadow rounded-2 p-0">

                <!-- Tab contents START -->
                <div className="card-body p-4">
                    <h5>Questions Asked</h5>
                    <hr />
                    <div className="h-500px overflow-hidden custom-scroolbar">
                        <ul className="list-unstyled">
                            {% for sujet in forums|sort((a, b) => b.createdAt <=> a.createdAt) %}
                                
                                <li>
                                    <h6 className="{sujet.isSolved ? 'text-success' : 'text-danger'}">{sujet.forum.cours.intitule}</h6>
                                    <div  className="d-flex mb-4 mt-3">
                                        <div className="avatar avatar-sm flex-shrink-0 me-2">
                                            <a href="#"> <img className="avatar-img rounded-circle" src="{asset(sujet.membre.utilisateur.personne.avatarPath)}" alt="" /> </a>
                                        </div>

                                        <div className="w-100 d-flex">
                                            <p>
                                                {sujet.content|raw}
                                                <br />
                                                <span className="badge {sujet.isSolved ? "btn-success-soft" : 'btn-danger-soft'}">{sujet.isSolved ? "Resolved" : "Unresolved"}</span> |
                                                <i className="badge btn-info-soft">{sujet.createdAt|date('d M, Y - H:i:s')}</i>
                                                | <span className="badge btn-warning-soft">{sujet.forumMessages|length} comments</span>
                                                | <a href="{url("app_forum_message_index", {reference: sujet.reference})}" className="btn btn-primary-soft">Show comment</a>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <hr />
                            
) || (

                                <h3 className="text-danger">No topics found! Be the first to ask a problem</h3>
                            
))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main content END -->

    </div>

{% endblock %}
    </>
  );
}
