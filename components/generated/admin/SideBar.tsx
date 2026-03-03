import React from 'react';
import Link from 'next/link';

export default function SideBar(props: any) {
  return (
    <>
<!-- Sidebar START -->
    <nav className="navbar sidebar navbar-expand-xl navbar-dark bg-dark">

        <!-- Navbar brand for xl START -->
        <div className="d-flex align-items-center">
            <a className="navbar-brand" href="{path('app_front')}">
                <img className="navbar-brand-item" src="{asset('assets/images/logo-light.svg')}" alt="" />
            </a>
        </div>
        <!-- Navbar brand for xl END -->
        
        <div className="offcanvas offcanvas-start flex-row custom-scrollbar h-100" data-bs-backdrop="true" tabindex="-1" id="offcanvasSidebar">
            <div className="offcanvas-body sidebar-content d-flex flex-column bg-dark">

                <!-- Sidebar menu START -->
                <ul className="navbar-nav flex-column" id="navbar-sidebar">
                    
                    <!-- Menu item 1 -->
                    <li className="nav-item">
                        <a href="{path('app_admin_dashboard')}" className="nav-link {isHome is defined ? 'active' : ''}"><i className="bi bi-house fa-fw me-2"></i>Dashboard</a>
                    </li>
                    
                    <!-- menu item 2 -->
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#collapsepage" role="button" aria-expanded="{isCourses is defined ? 'true' : 'false'}" aria-controls="collapsepage">
                            <i className="bi bi-basket fa-fw me-2"></i>Courses
                        </a>
                        <!-- Submenu -->
                        <ul className="nav collapse flex-column {isCourses is defined ? 'show' : ''}" id="collapsepage" data-bs-parent="#navbar-sidebar">
                            <li className="nav-item"> <a className="nav-link {coc is defined ? 'active' : ''}" href="{path('app_admin_cours_index')}">All Courses</a></li>
                            <li className="nav-item"> <a className="nav-link {cac is defined ? 'active' : ''}" href="{path('app_admin_categorie_index')}">Course Category</a></li>
                            <li className="nav-item"> <a className="nav-link {exc is defined ? 'active' : ''}" href="{url("app_admin_exam")}">Anciens sujets</a></li>
                            <li className="nav-item"> <a className="nav-link {evc is defined ? 'active' : ''}" href="{url("app_admin_evaluation_index")}">Evaluations</a></li>
                            <li className="nav-item"> <a className="nav-link {isFormationController is defined ? 'active' : ''}" href="{url("app_admin_formation_index")}">Formations</a></li>
                            <li className="nav-item"> <a className="nav-link {isForumController is defined ? 'active' : ''}" href="{url("app_forum_index")}">Forum</a></li>
                        </ul>
                    </li>

                    <!-- Menu item 3 -->
                    <li className="nav-item"> 
                        <a className="nav-link {elc is defined ? 'active' : ''}" href="{path('app_admin_eleve_index')}">
                            <i className="fas fa-user-graduate fa-fw me-2"></i>Students
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#collapsepageIN" role="button" aria-expanded="{isEnseignants is defined ? 'true' : 'false'}" aria-controls="collapsepageIN">
                            <i className="bi bi-basket fa-fw me-2"></i>Instructors
                        </a>
                        <!-- Submenu -->
                        <ul className="nav collapse flex-column {isEnseignants is defined ? 'show' : ''}" id="collapsepageIN" data-bs-parent="#navbar-sidebar">
                            <li className="nav-item"> <a className="nav-link {eni is defined ? 'active' : ''}" href="{path('app_admin_enseignant_index')}">Instructors list</a></li>
                            <li className="nav-item"> <a className="nav-link {enr is defined ? 'active' : ''}" href="{path('app_admin_enseignant_request')}">Instructors request</a></li>
                        </ul>
                    </li>


                    <!-- Title -->
                    <li className="nav-item ms-2 my-2">Settings</li>

                    <!-- Menu item 4 -->
                    <li className="nav-item">
                        <a className="nav-link {isAbonnementController is defined ? 'active' : ''}" href="{path('app_admin_abonnement_index')}" role="button" aria-expanded="false">
                            <i className="fas fa-user-cog fa-fw me-2"></i>Abonnements
                        </a>
                    </li> 

                    <li className="nav-item">
                        <a className="nav-link {isSettingController is defined ? 'active' : ''}" href="{path('app_admin_setting')}" role="button" aria-expanded="false">
                            <i className="fas fa-user-cog fa-fw me-2"></i>Admin Settings
                        </a>
                    </li> 

                    <!-- menu item 2 -->
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#collapsepageI" role="button" aria-expanded="{isInstitution is defined ? 'true' : 'false'}" aria-controls="collapsepageI">
                            <i className="bi bi-basket fa-fw me-2"></i>Institution
                        </a>
                        <!-- Submenu -->
                        <ul className="nav collapse flex-column {isInstitution is defined ? 'show' : ''}" id="collapsepageI" data-bs-parent="#navbar-sidebar">
                            <li className="nav-item"> 
                                <a className="nav-link {sss is defined ? 'active' : ''}" href="{path('app_admin_sous_systeme_index')}">Sous-système</a>
                            </li>
                            <li className="nav-item"> <a className="nav-link {tec is defined ? 'active' : ''}" href="{path('app_admin_type_enseignement_index')}">Type Enseignement</a></li>
                            <li className="nav-item"> <a className="nav-link {etc is defined ? 'active' : ''}" href="{path('app_admin_etablissement_index')}">Etablissements</a></li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#collapsepageCI" role="button" aria-expanded="{isClasses is defined ? 'true' : 'false'}" aria-controls="collapsepageCI">
                            <i className="bi bi-basket fa-fw me-2"></i>Manage Classes
                        </a>
                        <!-- Submenu -->
                        <ul className="nav collapse flex-column {isClasses is defined ? 'show' : ''}" id="collapsepageCI" data-bs-parent="#navbar-sidebar">
                            <li className="nav-item"> <a className="nav-link {fic is defined ? 'active' : ''}" href="{path('app_admin_filiere_index')}">Filières</a></li>
                            <li className="nav-item"> <a className="nav-link {spc is defined ? 'active' : ''}" href="{path('app_admin_specialite_index')}">Spécialités</a></li>
                            <li className="nav-item"> <a className="nav-link {clc is defined ? 'active' : ''}" href="{path('app_admin_classe_index')}">Classes</a></li>
                        </ul>
                    </li>

                    <!-- Title -->
                    <li className="nav-item ms-2 my-2">Autres</li>
                    
                    <!-- Menu item - Message Analytics -->
                    <li className="nav-item">
                        <a className="nav-link {isMessageAnalytics is defined ? 'active' : ''}" href="{path('app_admin_message_analytics')}" role="button" aria-expanded="false">
                            <i className="fas fa-chart-bar fa-fw me-2"></i>Message Analytics
                        </a>
                    </li>
                    
                    <li className="nav-item">
                    <a className="nav-link {rec is defined ? 'active' : ''}" href="{path('app_contact_index')}" role="button" aria-expanded="false">
                        <i className="fas fa-user-tie fa-fw me-2"></i>Message Contact
                    </a>
                   </li>

                    <li className="nav-item">
                    <a className="nav-link {rec is defined ? 'active' : ''}" href="{path('app_push_notification_new')}" role="button" aria-expanded="false">
                        <i className="fas fa-user-tie fa-fw me-2"></i>Push Notif
                    </a>
                   </li>
                   

                    <!-- Menu item 4 -->
                    <li className="nav-item">
                        <a className="nav-link {rec is defined ? 'active' : ''}" href="{path('app_admin_registration')}" role="button" aria-expanded="false">
                            <i className="fas fa-user-tie fa-fw me-2"></i>Users
                        </a>
                    </li>                    

                    <!-- Menu item 4 -->
                    <li className="nav-item">
                        <a className="nav-link {pac is defined ? 'active' : ''}" href="{path('app_admin_pays_index')}" role="button" aria-expanded="false">
                            <i className="fas fa-user-tie fa-fw me-2"></i>Countries
                        </a>
                    </li>

                    <!-- Menu item 4 -->
                    <li className="nav-item">
                        <a className="nav-link {tcc is defined ? 'active' : ''}" href="{path('app_admin_term_index')}" role="button" aria-expanded="false">
                            <i className="far fa-clipboard fa-fw me-2"></i>Terms & Conditions
                        </a>
                    </li>

                </ul>
                <!-- Sidebar menu end -->

                <!-- Sidebar footer START -->
                <div className="px-3 mt-auto pt-3">
                    <div className="d-flex align-items-center justify-content-between text-primary-hover">
                        <a className="h5 mb-0 text-body" href="admin-setting.html" data-bs-toggle="tooltip" data-bs-placement="top" title="Settings">
                            <i className="bi bi-gear-fill"></i>
                        </a>
                        <a className="h5 mb-0 text-body" href="{path('app_front')}" data-bs-toggle="tooltip" data-bs-placement="top" title="Home">
                            <i className="bi bi-globe"></i>
                        </a>
                        <a className="h5 mb-0 text-body" href="{path('app_logout')}" data-bs-toggle="tooltip" data-bs-placement="top" title="Sign out">
                            <i className="bi bi-power"></i>
                        </a>
                    </div>
                </div>
                <!-- Sidebar footer END -->
                
            </div>
        </div>
    </nav>
    <!-- Sidebar END -->
    </>
  );
}
