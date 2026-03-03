import React from 'react';
import Link from 'next/link';

export default function Forum(props: any) {
  return (
    <>
{heIsMembre && (

<h5 className="mb-4">Ask Your Question</h5>
<!-- Comment box -->
<div className="d-flex mb-4">
    <!-- Avatar -->
    <div className="avatar avatar-sm flex-shrink-0 me-2">
        <a href="#"> <img className="avatar-img rounded-circle" src="{asset(membre.utilisateur.personne.avatarPath)}" alt="" /> </a>
    </div>

    {form_start(sujetForm)}
        {form_widget(sujetForm.content)}
        <button className="btn btn-primary ms-2 mb-0" type="submit">Post</button>
    {form_end(sujetForm)}
</div>

)} 
 
<div className="accordion accordion-icon accordion-bg-light" id="accordionExample3">
    
    {% for sujet in course.forum.sujets|default([]) %}
        
        <div className="accordion-item mb-3">
            <h6 className="accordion-header font-base" id="heading-forum-{sujet.id}">
                <a className="accordion-button fw-bold rounded d-block" href="#collapse-forum-{sujet.id}" data-bs-toggle="collapse" data-bs-target="#collapse-forum-{sujet.id}" aria-expanded="true" aria-controls="collapse-forum-{sujet.id}">
                    <span className="mb-0">{sujet.content|raw}</span> 
                    <hr />
                    <span className="d-block mt-1">{sujet.forumMessages|length} Messages</span> 
                    {sujet.isSolved && (

                        <span className="d-block badge badge-lg text-success">SOLVED</span>
                    
) || (

                        <span className="d-block badge badge-lg text-danger">NOT SOLVED</span>
                    
)}
                </a>
            </h6>
            <div id="collapse-forum-{sujet.id}" className="accordion-collapse collapse" aria-labelledby="heading-forum-{sujet.id}" data-bs-parent="#accordionExample3">
                <div className="accordion-body mt-0 p-0">
                    <div className="vstack gap-0">
                        <!-- Comment item START -->
                        <div className="border p-2 p-sm-4 rounded-3 mb-4">
                            <div className="custom-scrollbar" style="max-height: 300px;overflow: auto;">
                                <ul className="list-unstyled mb-0">
                                    {% for message in sujet.forumMessages %}
                                        {not message.isAnswer && (

                                            <li className="comment-item" id="item-comment-{message.id}">
                                                <div className="d-flex mb-3">
                                                    <!-- Avatar -->
                                                    <div className="avatar avatar-sm flex-shrink-0">
                                                        <a href="#"><img className="avatar-img rounded-circle" src="{asset(message.membre.utilisateur.personne.avatarPath)}" alt="" /></a>
                                                    </div>
                                                    <div className="ms-2">
                                                        <!-- Comment by -->
                                                        <div className="bg-light p-3 rounded">
                                                            <div className="d-flex justify-content-center">
                                                                <div className="me-2">
                                                                    <h6 className="mb-1 lead fw-bold"> <a href="#!"> {message.membre.utilisateur.personne.pseudo}</a></h6>
                                                                    <p className="h6 mb-0">{message.content}</p>
                                                                </div>
                                                                <small>{message.createdAt|date('d/m/Y - H:i:s')}</small>
                                                            </div>
                                                        </div>
                                                        <!-- Comment react -->
                                                        <ul className="nav nav-divider py-2 small">
                                                            <li className="nav-item"> <a className="text-primary-hover {heIsMembre and not sujet.isSolved ? 'like-forum-message' : ''}" href="{heIsMembre and not sujet.isSolved ? url("app_course_like_forum_message", {id: message.id}) : '#item-comment-' ~ message.id}"><i className="fas fa-thumbs-up"></i> Like (<span className="nb-likes">{message.likes}</span>)</a> </li>
                                                            {not sujet.isSolved and membre is not same as null && (

                                                                <li className="nav-item"> <a className="text-primary-hover {heIsMembre and not sujet.isSolved ? 'reply-forum-message' : ''}" data-forum-message="{message.id}" data-membre="{membre.id}" data-append-response="#reply-forum-message-{message.id}" {heIsMembre and not sujet.isSolved ? 'data-bs-toggle="modal" data-bs-target="#replyForumMessage"' : ''} href="#"><i className="fas fa-reply"></i> Reply</a> </li>
                                                                {membre is same as sujet.membre && (

                                                                    <li className="nav-item"> <a onclick="return confirm('Are you sure that you want to set these response as the top response that solved your problem ?')" className="text-primary-hover text-success" href="{url("app_course_solve_forum_message", {id: message.id})}"><i className="fas fa-check"></i> Resolved by these post</a> </li>
                                                                
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
                                                                    <div className="d-flex">
                                                                        <!-- Avatar -->
                                                                        <div className="avatar avatar-xs flex-shrink-0">
                                                                            <a href="#"><img className="avatar-img rounded-circle" src="{asset(fm.membre.utilisateur.personne.avatarPath)}" alt="" /></a>
                                                                        </div>
                                                                        <!-- Comment by -->
                                                                        <div className="ms-2">
                                                                            <div className="bg-light p-3 rounded">
                                                                                <div className="d-flex justify-content-center">
                                                                                    <div className="me-2">
                                                                                        <h6 className="mb-1  lead fw-bold"> <a href="#"> {fm.membre.utilisateur.personne.pseudo} </a> </h6>
                                                                                        <p className=" mb-0">{fm.content}</p>
                                                                                    </div>
                                                                                    <small>{fm.createdAt|date('d/m/Y - H:i:s')}</small>
                                                                                </div>
                                                                            </div>
                                                                            <!-- Comment react -->
                                                                            <ul className="nav nav-divider py-2 small">
                                                                                <li className="nav-item"> <a className="text-primary-hover {heIsMembre and not sujet.isSolved ? 'like-forum-message' : ''}" href="{heIsMembre and not sujet.isSolved ? url("app_course_like_forum_message", {id: fm.id}) : '#item-comment-' ~ fm.id}"><i className="fas fa-thumbs-up"></i> Like (<span className="nb-likes">{fm.likes}</span>)</a> </li>
                                                                                {not sujet.isSolved and membre is same as sujet.membre && (

                                                                                    <li className="nav-item"> <a onclick="return confirm('Are you sure that you want to set these response as the top response that solved your problem ?')" className="text-primary-hover text-success" href="{url("app_course_solve_forum_message", {id: fm.id})}"><i className="fas fa-check"></i> Resolved by these post</a> </li>
                                                                                
                                                                                
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
                                <!-- Comment item nested END -->
                            </div>
                            <hr />
                            {heIsMembre and not sujet.isSolved && (

                                <div className="d-flex mb-4 mt-3">
                                    <!-- Avatar -->
                                    <div className="avatar avatar-sm flex-shrink-0 me-2">
                                        <a href="#"> <img className="avatar-img rounded-circle" src="{asset(app.user.personne.avatarPath)}" alt="" /> </a>
                                    </div>

                                    <form method="POST" action="{url("app_front_course_new_forum_message", {referenceSujet: sujet.reference, membreId: membre.id})}" className="w-100 d-flex">
                                        <textarea name="message" className="one form-control pe-4 bg-light" placeholder="Add a comment..." rows="1"></textarea>
                                        <button className="btn btn-primary ms-2 mb-0" type="submit"><i className="fas fa-paper-plane"></i></button>
                                    </form>
                                </div>
                            
)}
                        </div>
                        <!-- Comment item END -->
                        

                    </div>
                </div>
            </div>
        </div>
        
    
))}

 </div>
    </>
  );
}
