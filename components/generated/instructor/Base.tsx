import React from 'react';
import Link from 'next/link';

export default function Base(props: any) {
  return (
    <>
{% extends "front/base.html.twig" %}

{% block title %} - Instructor {% block subTitle %}{% endblock %}  {% endblock %}

{% block footer %}
    
    <footer className="bg-dark p-3">
        <div className="container">
            <div className="row align-items-center">
                <!-- Widget -->
                <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                    <!-- Logo START -->
                    <a href="{path('app_front')}"> <img className="h-20px" src="{asset('assets/images/logo-light.svg')}" alt="logo" /> </a>
                </div>
                
                <!-- Widget -->
                <div className="col-md-4 mb-3 mb-md-0">
                    <div className="text-center text-white">
                        Copyrights ©2023 <a href="" target="_blank" className="text-reset btn-link">kulmapeck.com</a>. All rights reserved.
                    </div>
                </div>
                <!-- Widget -->
                <div className="col-md-4">
                    <!-- Rating -->
                    <ul className="list-inline mb-0 text-center text-md-end">
                        <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-facebook"></i></a></li>
                        <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-instagram"></i></a></li>
                        <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-linkedin-in"></i></a></li>
                        <li className="list-inline-item ms-2"><a href="#"><i className="text-white fab fa-twitter"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

{% endblock %}

{% block headJS %}
{% endblock %}

{% block script %}
    <script>
( function() {
    var mathElements = [
        'math',
        'maction',
        'maligngroup',
        'malignmark',
        'menclose',
        'merror',
        'mfenced',
        'mfrac',
        'mglyph',
        'mi',
        'mlabeledtr',
        'mlongdiv',
        'mmultiscripts',
        'mn',
        'mo',
        'mover',
        'mpadded',
        'mphantom',
        'mroot',
        'mrow',
        'ms',
        'mscarries',
        'mscarry',
        'msgroup',
        'msline',
        'mspace',
        'msqrt',
        'msrow',
        'mstack',
        'mstyle',
        'msub',
        'msup',
        'msubsup',
        'mtable',
        'mtd',
        'mtext',
        'mtr',
        'munder',
        'munderover',
        'semantics',
        'annotation',
        'annotation-xml',
        'mprescripts',
        'none'
    ];

    CKEDITOR.replace( 'lesson_content', {
        extraPlugins: 'ckeditor_wiris',
        // For now, MathType is incompatible with CKEditor 4 file upload plugins.
        removePlugins: 'filetools,uploadimage,uploadwidget,uploadfile,filebrowser,easyimage',
        height: 320,
        // Update the ACF configuration with MathML syntax.
        extraAllowedContent: mathElements.join( ' ' ) + '(*)[*]{*};img[data-mathml,data-custom-editor,role](Wirisformula)'
    } );
}() );
</script>
    <script>
        $('#newForumMessageForm, #replyForumMessage form, #newForumSubjectFormContainer form').on('submit', function(e){
            e.preventDefault();
            const form = $(this);
            $.ajax({
                url: $(form).attr('action'),
                type: $(form).attr('method'),
                data: $(form).serialize(),
                success: (response) => {
                    window.location.reload();
                }
            })
        })

    </script>

{% endblock %}

{% block mainContent %}

    {% block instructorBanner %}
        <!-- =======================
        Page Banner START -->
        <section className="pt-0">
            <!-- Main banner background image -->
            <div className="container-fluid px-0">
                <div className="bg-blue h-100px h-md-200px rounded-0" style="background:url({asset('assets/images/pattern/04.png')}) no-repeat center center; background-size:cover;">
                </div>
            </div>
            {% block profileBlock %}
                <div className="container mt-n4">
                    <div className="row">
                        <!-- Profile banner START -->
                        <div className="col-12">
                            <div className="card bg-transparent card-body p-0">
                                <div className="row d-flex justify-content-between">
                                    <!-- Avatar -->
                                    <div className="col-auto mt-4 mt-md-0">
                                        <div className="avatar avatar-xxl mt-n3">
                                            <img className="avatar-img rounded-circle border border-white border-3 shadow" src="{asset(app.user.personne.avatarPath)}" alt="" />
                                        </div>
                                    </div>
                                    <!-- Profile info -->
                                    <div className="col d-md-flex justify-content-between align-items-center mt-4">
                                        <div>
                                            <h1 className="my-1 fs-4">{app.user.personne.pseudo} <i className="bi bi-patch-check-fill text-info small"></i></h1>
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"></i>{app.user.enseignant.review}/5.0</li>
                                                {% set nbStudents = 0 %}
                                                {% for course in app.user.enseignant.cours %}
                                                    {% set nbStudents = nbStudents + course.eleves|length %}
                                                
))}
                                                <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>{nbStudents} Enrolled Students</li>
                                                <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-book text-purple me-2"></i>{app.user.enseignant.cours|length} Courses</li>
                                            </ul>
                                        </div>
                                        <!-- Button -->
                                        <div className="d-flex align-items-center mt-2 mt-md-0">
                                            {% block btnAction %}
                                                {/* <a href="{path('app_instructor_courses_new')}" target="_blank" className="btn btn-success mb-0">Create a course</a> */}
                                                <a href="{path('app_instructor_cours_new')}" className="btn btn-success mb-0">Create a course</a>
                                            {% endblock %}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Profile banner END -->

                            <!-- Advanced filter responsive toggler START -->
                            <!-- Divider -->
                            <hr className="d-xl-none" />
                            <div className="col-12 col-xl-3 d-flex justify-content-between align-items-center">
                                <a className="h6 mb-0 fw-bold d-xl-none" href="#">Menu</a>
                                <button className="btn btn-primary d-xl-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                                    <i className="fas fa-sliders-h"></i>
                                </button>
                            </div>
                            <!-- Advanced filter responsive toggler END -->
                        </div>
                    </div>
                </div>
            {% endblock %}
        </section>
        <!-- =======================
        Page Banner END -->
    {% endblock %}
    <!-- =======================
    Page content START -->
    <section className="pt-0">
        <div className="container">
            <div className="row">
                {% block instructorSidebar %}
                    <!-- Left sidebar START -->
                    <div className="col-xl-3">
                        <!-- Responsive offcanvas body START -->
                        <div className="offcanvas-xl offcanvas-end" tabindex="-1" id="offcanvasSidebar">
                            <!-- Offcanvas header -->
                            <div className="offcanvas-header bg-light">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                                <button  type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
                            </div>
                            <!-- Offcanvas body -->
                            <div className="offcanvas-body p-3 p-xl-0">
                                <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                                    <!-- Dashboard menu -->
                                    <div className="list-group list-group-dark list-group-borderless">
                                        <a className="list-group-item {instructorHome is defined ? 'active' : ''}" href="{path('app_instructor_home')}"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                                        <a className="list-group-item {instructorCourses is defined ? 'active' : ''}" href="{path('app_instructor_courses')}"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                                        <a className="list-group-item {isNetwork is defined ? 'active' : ''}" href="{url("app_instructor_network")}"><i className="bi bi-people fa-fw me-2"></i>My Network</a>
                                        <a className="list-group-item {isOrders is defined ? 'active' : ''}" href="{url("app_instructor_orders_index")}"><i className="bi bi-folder-check fa-fw me-2"></i>Orders</a>
                                        <a className="list-group-item {isExam is defined ? 'active' : ''}" href="{url("app_instructor_exam_index")}"><i className="bi bi-pencil-square fa-fw me-2"></i>Exam</a>
                                        <a className="list-group-item {evc is defined ? 'active' : ''}" href="{url("app_admin_evaluation_index")}">Evaluations</a>
                                        <a className="list-group-item {isReview is defined ? 'active' : ''}" href="{url("app_instructor_reviews")}"><i className="bi bi-star fa-fw me-2"></i>Reviews</a>
                                        <a className="list-group-item {isProfile is defined ? 'active' : ''}" href="{url("app_instructor_profile")}"><i className="far fa-user fa-fw me-2"></i>Profile</a>
                                        <a className="list-group-item text-danger bg-danger-soft-hover" href="{path('app_logout')}"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Responsive offcanvas body END -->
                    </div>
                    <!-- Left sidebar END -->
                {% endblock %}
                <!-- Main content START -->
                <div className="{mainContentClass|default('col-xl-9')}">
                    {% for message in app.flashes('errors') %}
                        <div className="alert alert-danger alert-dismissible">
                            <p>{message|raw}</p>
                        </div>
                    
))}
                    {% for message in app.flashes('danger') %}
                        <div className="alert alert-danger alert-dismissible">
                            <p>{message|raw}</p>
                        </div>
                    
))}
                    {% for message in app.flashes('success') %}
                        <div className="alert alert-success alert-dismissible">
                            <p>{message|raw}</p>
                        </div>
                    
))}
                    {% for message in app.flashes('warning') %}
                        <div className="alert alert-warning alert-dismissible">
                            <p>{message|raw}</p>
                        </div>
                    
))}
                    {% for message in app.flashes('infos') %}
                        <div className="alert alert-info alert-dismissible">
                            <p>{message|raw}</p>
                        </div>
                    
))}
                    {% block pageContent %}{% endblock %}
                    
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
