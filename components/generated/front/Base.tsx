import React from 'react';
import Link from 'next/link';

export default function Base(props: any) {
  return (
    <>
<!DOCTYPE html>
<html lang="en">

	<head>
		{% set siteSettings = app.session.get('siteSettings') %}
		{% set socialsSettings = app.session.get('socialsSettings') %}
		<title>{siteSettings.siteName|default("Kulmapeck.com")}
			{% block title %}{% endblock %}
		</title>

		<!-- Meta Tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="author" content="Webestica.com">
		<meta name="current-user-id" content="{app.user ? app.user.id : ''}">


		<meta
		name="description" content="Kulmapeck - The Best E-learning platform">

		<!-- Webpack Encore -->
		{encore_entry_link_tags('app')}
		{% block stylesheets %}{% endblock %}

		<!-- Dark mode -->
		<script>
			const storedTheme = localStorage.getItem('theme')

const getPreferredTheme = () => {
if (storedTheme) {
return storedTheme
}
return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = function (theme) {
if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
document.documentElement.setAttribute('data-bs-theme', 'dark')
} else {
document.documentElement.setAttribute('data-bs-theme', theme)
}
}

setTheme(getPreferredTheme())

window.addEventListener('DOMContentLoaded', () => {
var el = document.querySelector('.theme-icon-active');
if (el != 'undefined' && el != null) {
const showActiveTheme = theme => {
const activeThemeIcon = document.querySelector('.theme-icon-active use')
const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
const svgOfActiveBtn = btnToActive.querySelector('.mode-switch use').getAttribute('href')

document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
element.classList.remove('active')
})

btnToActive.classList.add('active')
activeThemeIcon.setAttribute('href', svgOfActiveBtn)
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
if (storedTheme !== 'light' || storedTheme !== 'dark') {
setTheme(getPreferredTheme())
}
})

showActiveTheme(getPreferredTheme())

document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
toggle.addEventListener('click', () => {
const theme = toggle.getAttribute('data-bs-theme-value')
localStorage.setItem('theme', theme)
setTheme(theme)
showActiveTheme(theme)
})
})

}
})
		</script>

		<!-- Favicon -->
		<link
		rel="shortcut icon" href="{asset('assets/images/favicon.ico')}">

		<!-- Google Font -->
		<link rel="preconnect" href="{asset('fonts.googleapis.com/index.html')}">
		<link rel="preconnect" href="{asset('fonts.gstatic.com/index.html')}" crossorigin>
		<link
		rel="stylesheet" href="{asset('fonts.googleapis.com/css23ab4.css?family=Heebo:wght@400;500;700&amp;family=Roboto:wght@400;500;700&amp;display=swap')}">

		<!-- Plugins CSS -->
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/font-awesome/css/all.min.css')}">
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/bootstrap-icons/bootstrap-icons.css')}">
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/apexcharts/css/apexcharts.css')}">
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/overlay-scrollbar/css/overlayscrollbars.min.css')}">
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/tiny-slider/tiny-slider.css')}">
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/glightbox/css/glightbox.css')}">
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/choices/css/choices.min.css')}">
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/aos/aos.css')}">
		<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/plyr/plyr.css')}"/> {% block stylesheet %}{% endblock %}
		<style>
			#quizNotification {
				display: none;
				position: fixed;
				top: 10px;
				left: 50%;
				transform: translateX(-50%);
				padding: 10px;
				color: white;
				border-radius: 5px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
				z-index: 999;
			}

			.whatsapp-icon {
				position: fixed;
				bottom: 190px;
				right: 20px;
				width: 70px;
				height: auto;
			}
			
        /* Start secton barner */
			.banner-with-background {
				position: relative;
				background-image: url("{asset('assets/images/about/barner2.png')}");
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				height: 100vh; /* Occupe toute la hauteur de la fenêtre */
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
			}

			.main-message {
				font-size: 50px; /* Taille par défaut pour PC */
				margin-bottom: 1.5rem;
				font-weight: bold;
			}

			.sub-message {
				font-size: 35px; /* Taille par défaut pour PC */
				margin-bottom: 1.5rem;
				font-weight: bold;
				color: #fd7e14;
			}

			@media (max-width: 1024) {
				.hide-login,
				.hide-btn {
					display: none;
				}
			}	

			@media (min-width: 768px) {
				.hide-login {
					display: none;
				}

			}

			/* Styles spécifiques pour mobile et tablette (écrans max 1024px) */
			@media (max-width: 1024px) {
				.banner-with-background {
					background-image: none; /* Retire l'image en arrière-plan */
					background-color: #066ac9 !important; /* Bleu du site */
					height: 500px;
				}

				.main-message {
					font-size: 35px; /* Taille réduite pour mobile */
				}

				.sub-message {
					font-size: 25px; /* Taille réduite pour mobile */
				}

				.btn-custom {
					padding: 0.5rem 1rem; /* Ajuste la taille interne */
					font-size: 10px; /* Taille du texte */
					width: 150px; /* Adapte la largeur au texte */
				}
	
				.barnner,
				.image-barner,
				.counter-block { 
					display: none;
			
				}
				
				.counter-box {
					display: none;
				}
			}

			.banner-with-background::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5); /* Couche semi-transparente noire */
				backdrop-filter: blur(2px); /* Applique un effet de flou */
				z-index: 1;
			}

			.banner-with-background .container {
				position: relative;
				z-index: 2; /* Assure que le texte est visible au-dessus de la couche floue */
			}
			

		/* End secton barner */
		</style>
		<!-- Theme CSS -->
		<link
		rel="stylesheet" type="text/css" href="{asset('assets/css/style.css')}">

		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-7N7LGGGWT1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
function gtag() {
dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-7N7LGGGWT1');
		</script>
		{% block headJS %}{% endblock %}


	</head>

	<body 
        data-user-id="{app.user ? app.user.id : ''}"
		{/* data-auth-token="{app.user ? app.user.chatToken : ''}" */}
        data-chat-type="{app.request.attributes.get('_route') starts with 'student_' ? 'student' : 'general'}"
        className="">
		{% block header %}
			<!-- Header START -->
			<header className="navbar-light navbar-sticky header-static">
				
				<!-- Nav START -->
				<nav className="navbar navbar-expand-xl">
					<div
						className="container-fluid px-3 px-xl-5">
						<!-- Logo START -->
						<a className="navbar-brand" href="{path('app_front')}">
							<img className="light-mode-item navbar-brand-item" src="{asset('assets/images/logo.svg')}" alt="logo" />
							<img className="dark-mode-item navbar-brand-item" src="{asset('assets/images/logo-light.svg')}" alt="logo" />
						</a>
						<!-- Logo END -->

						<!-- Responsive navbar toggler -->
						<button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-animation">
								<span></span>
								<span></span>
								<span></span>
							</span>
						</button>

						<!-- Main navbar START -->
						<div
							className="navbar-collapse w-100 collapse" id="navbarCollapse">

							<!-- Nav category menu START -->
							<ul
								className="navbar-nav navbar-nav-scroll me-auto">
								<!-- Nav item 1 Demos -->
								<li className="nav-item dropdown dropdown-menu-shadow-stacked">
									<a className="nav-link bg-primary bg-opacity-10 rounded-3 text-primary px-3 py-3 py-xl-0" href="#" id="categoryMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<i className="bi bi-ui-radios-grid me-2"></i>
										<span>Categories</span>
									</a>
									{render(url("app_front_header_categories"))}
								</li>
							</ul>
							<!-- Nav category menu END -->

							<!-- Nav Main menu START -->
							<ul
								className="navbar-nav navbar-nav-scroll me-auto">
								<!-- Nav item 1 Demos -->
								<li className="nav-item">
									<a className="nav-link {isHomePage is defined ? 'active' : ''}" href="{path('app_front')}" id="demoMenu" aria-haspopup="true" aria-expanded="false">
										{% trans %}HOME_KEY{% endtrans %}
									</a>
								</li>

								<!-- Nav item 2 Pages -->
								{# <li className="nav-item dropdown">
																																								                            <a className="nav-link" href="" id="pagesMenu" aria-haspopup="true" aria-expanded="false">Courses</a>
																																								                        </li> #}

								<!-- Nav item 4 Megamenu-->
									<li className="nav-item dropdown dropdown-fullwidth"> <a className="nav-link dropdown-toggle {isCoursePage is defined ? 'active' : ''}" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{% trans %}COURSESFORMATION_KEY{% endtrans %}</a>
									<div className="dropdown-menu dropdown-menu-end" data-bs-popper="none">
										{render(url("app_front_header_courses_and_formations"))}
									</div>
								</li>

								<li className="nav-item">
									<a className="nav-link {isExamPage is defined ? 'active' : ''}" href="{path('app_front_exam_index')}" aria-haspopup="true" aria-expanded="false">{% trans %}EXAM_KEY{% endtrans %}</a>
								</li>


								<!-- Nav item 3 Account -->
								<li className="nav-item">
									<a className="nav-link {isForumMainPage is defined ? 'active' : ''}" href="{url('app_front_forum_index')}" aria-haspopup="true" aria-expanded="false">{% trans %}FORUM_KEY{% endtrans %}</a>
								</li>

								<!-- Nav item 3 Account -->
								{not app.user or (app.user.eleve and not app.user.eleve.isPremium) && (

									<li className="nav-item">
										<a className="nav-link" href="{path('app_plan')}" aria-haspopup="true" aria-expanded="false">
											<b className="badge bg-success">{% trans %}BECOME_PREMIUM_KEY{% endtrans %}</b>
										</a>
									</li>
								
)}

                               <!-- Nav item 3 Account -->
								{not app.user && (

									<li className="nav-item">
										<a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#coursePremium" aria-haspopup="true" aria-expanded="false">
											<b className="badge bg-success">Créer un compte</b>
										</a>
									</li>
								
)}

								<!-- Nav item 3 Account -->
								{not app.user && (

									<li className="nav-item  hide-login">
										<a className="nav-link" href="{path('app_login')}" aria-haspopup="true" aria-expanded="false">
										   <b className="badge bg-success">{% trans %}SIGNIN_KEY{% endtrans %}</b>
										</a>
									</li>
								
)}


							</ul>
							<!-- Nav Main menu END -->

							<!-- Nav Search START -->
							<div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
								<div className="nav-item w-100">
									<form className="position-relative" action="{url("app_front_courses")}">
										<input className="form-control pe-5 bg-transparent" type="search" placeholder="{% trans %}SEARCH_KEY{% endtrans %}" name="search" required aria-label="Search" />
										<button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
											<i className="fas fa-search fs-6 "></i>
										</button>
									</form>
								</div>
							</div>
							<!-- Nav Search END -->
						</div>
						<!-- Main navbar END -->

						<div className="dropdown mt-0 text-center text-sm-end">
							<a className="dropdown-toggle nav-link" style="padding-right: 15px" href="#" role="button" id="languageSwitcher" data-bs-toggle="dropdown" aria-expanded="false">
								<i className="fas fa-globe me-2"></i>
								{app.session.get('_locale') == 'en' && (

									{% trans %}ENGLISH_KEY{% endtrans %}
								
) || (

									{% trans %}FRENCH_KEY{% endtrans %}
								
)}
							</a>
							<ul className="dropdown-menu min-w-auto" aria-labelledby="languageSwitcher">
								<li>
									<a className="dropdown-item me-4 {app.session.get('_locale') is same as 'en' ? 'active' : ''}" href="{url('app_security_change_language', {lang: 'en'})}"><img className="fa-fw me-2" src="{asset('assets/images/flags/uk.svg')}" alt="" />{% trans %}ENGLISH_KEY{% endtrans %}</a>
								</li>
								<li>
									<a className="dropdown-item me-4 {app.session.get('_locale') is same as 'fr' ? 'active' : ''}" href="{url('app_security_change_language', {lang: 'fr'})}"><img className="fa-fw me-2" src="{asset('assets/images/flags/sp.svg')}" alt="" />{% trans %}FRENCH_KEY{% endtrans %}</a>
								</li>
							</ul>
						</div>

						<!-- Profile START -->
						{app.user && (

							<div className="dropdown ms-1 ms-lg-0">
								<a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
									<img className="avatar-img rounded-circle" src="{asset(app.user.personne.avatarPath)}" alt="avatar" />
								</a>
								<ul
									className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
									<!-- Profile info -->
									<li className="px-3 mb-3">
										<div
											className="d-flex align-items-center">
											<!-- Avatar -->
											<div className="avatar me-3">
												<img className="avatar-img rounded-circle shadow" src="{asset(app.user.personne.avatarPath)}" alt="avatar" />
											</div>
											<div>
												<a className="h6" href="#">{app.user.personne.pseudo}</a>
												<p className="small m-0">{app.user.userIdentifier}</p>
											</div>
										</div>
									</li>
									<li>
										<hr className="dropdown-divider" /></li>
									<!-- Links -->
									<li>
										<a className="dropdown-item" href="{url("app_home")}">
											<i className="bi bi-person fa-fw me-2"></i>
											{% trans %}DASHBOARD_KEY{% endtrans %}</a>
									</li>
									{is_granted('ROLE_INSTRUCTOR') && (

										<li>
											<a className="dropdown-item" href="{url("app_instructor_profile")}">
												<i className="bi bi-gear fa-fw me-2"></i>
												{% trans %}EDIT_PROFILE_KEY{% endtrans %}</a>
										</li>
									{% elseif is_granted('ROLE_STUDENT') %}
										<li>
											<a className="dropdown-item" href="">
												<i className="bi bi-gear fa-fw me-2"></i>
												{% trans %}EDIT_PROFILE_KEY{% endtrans %}</a>
										</li>
									
)}

									<li>
										<a className="dropdown-item" href="#">
											<i className="bi bi-info-circle fa-fw me-2"></i>
											{% trans %}HELP_KEY{% endtrans %}</a>
									</li>
									<li>
										<a className="dropdown-item bg-danger-soft-hover" href="{url("app_logout")}">
											<i className="bi bi-power fa-fw me-2"></i>
											{% trans %}SIGNOUT_KEY{% endtrans %}</a>
									</li>
									<li>
										<hr className="dropdown-divider" /></li>
									<!-- Dark mode options START -->
									<li>
										<div className="bg-light dark-mode-switch theme-icon-active d-flex align-items-center p-1 rounded mt-2">
											<button type="button" className="btn btn-sm mb-0" data-bs-theme-value="light">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun fa-fw mode-switch" viewbox="0 0 16 16">
													<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
													<use href="#"></use>
												</svg>
												{% trans %}LIGHT_KEY{% endtrans %}
											</button>
											<button type="button" className="btn btn-sm mb-0" data-bs-theme-value="dark">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-stars fa-fw mode-switch" viewbox="0 0 16 16">
													<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
													<path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
													<use href="#"></use>
												</svg>
												{% trans %}DARK_KEY{% endtrans %}
											</button>
											<button type="button" className="btn btn-sm mb-0 active" data-bs-theme-value="auto">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-half fa-fw mode-switch" viewbox="0 0 16 16">
													<path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
													<use href="#"></use>
												</svg>
												{% trans %}AUTO_KEY{% endtrans %}
											</button>
										</div>
									</li>
									<!-- Dark mode options END-->
								</ul>
							</div>
						
) || (

							<div className="navbar-nav d-none d-md-inline">
								<a href="{path('app_login')}" className="btn btn-sm btn-dark mb-0">
									<i className="bi bi-power me-2"></i>
									{% trans %}SIGNIN_KEY{% endtrans %}</a>
							</div>
						
)}

						<!-- Profile START -->
					</div>
				</nav>
				<!-- Nav END -->
			</header>
			<!-- Header END -->
		{% endblock %}

		<!-- **************** MAIN CONTENT START **************** -->
		<main>

			<!-- =======================
															        Main Banner START -->
			{% block mainBarnner %}{% endblock %}
			<!-- =======================
															        Main Banner END -->

			{% block mainContent %}{% endblock %}

		</main>
		<!-- **************** MAIN CONTENT END **************** -->

		{% block footer %}
			<!-- =======================
															    Footer START -->
			<footer className="pt-5">
				<div
					className="container">
					<!-- Row START -->
					<div
						className="row g-4">

						<!-- Widget 1 START -->
						<div
							className="col-lg-3">
							<!-- logo -->
							<a className="me-0" href="{path('app_home')}">
								<img className="light-mode-item h-40px" src="{asset('assets/images/logo.svg')}" alt="logo" />
								<img className="dark-mode-item h-40px" src="{asset('assets/images/logo-light.svg')}" alt="logo" />
							</a>

							<a href="https://wa.me/+237698809093" title="Nous rejoindre sur Whatsapp" target="_blank" className="whatsapp-icon">
								<img src="{asset('assets/images/icone-whatsapp.png')}" alt="WhatsApp"/>
							</a>

							<p className="my-3">{siteSettings.siteDescription|default('')}</p>
							<!-- Social media icon -->
							<ul className="list-inline mb-0 mt-3">
								{socialsSettings.map(item => (

									{item.icon|lower is same as 'fa-facebook-f' && (

										<li className="list-inline-item">
											<a target="_blank" className="btn btn-white btn-sm shadow px-2 text-facebook" href="{item.link}">
												<i className="fab fa-fw fa-facebook-f"></i>
											</a>
										</li>
									{% elseif item.icon|lower is same as 'fa-instagram' %}
										<li className="list-inline-item">
											<a target="_blank" className="btn btn-white btn-sm shadow px-2 text-instagram" href="{item.link}">
												<i className="fab fa-fw fa-instagram"></i>
											</a>
										</li>
									{% elseif item.icon|lower is same as 'fa-fw fa-twitter' %}
										<li className="list-inline-item">
											<a target="_blank" className="btn btn-white btn-sm shadow px-2 text-twitter" href="{item.link}">
												<i className="fab fa-fw fa-twitter"></i>
											</a>
										</li>
									{% elseif item.icon|lower is same as 'fa-linkedin-in' %}
										<li className="list-inline-item">
											<a target="_blank" className="btn btn-white btn-sm shadow px-2 text-linkedin" href="{item.link}">
												<i className="fab fa-fw fa-linkedin-in"></i>
											</a>
										</li>
									{% elseif item.icon|lower is same as 'fa-youtube' %}
										<li className="list-inline-item">
											<a target="_blank" className="btn btn-white btn-sm shadow px-2 text-danger" href="{item.link}">
												<i className="fab fa-fw fa-youtube"></i>
											</a>
										</li>
									
)}
								
))}
							</ul>
						</div>
						<!-- Widget 1 END -->

						<!-- Widget 2 START -->
						<div className="col-lg-6">
							<div
								className="row g-4">
								<!-- Link block -->
								<div className="col-6 col-md-4">
									<h5 className="mb-2 mb-md-4">{% trans %}COMPANY_KEY{% endtrans %}</h5>
									<ul className="nav flex-column">
										<li className="nav-item">
											<a className="nav-link" href="{path('app_front_courses')}">{% trans %}COURSES_KEY{% endtrans %}</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="{path('app_front_exam_index')}">{% trans %}EXAM_KEY{% endtrans %}</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="{path('app_front_about')}">{% trans %}ABOUTUS_KEY{% endtrans %}</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="{path('app_front_contact')}">{% trans %}CONTACTUS_KEY{% endtrans %}</a>
										</li>
									</ul>
								</div>

								<!-- Link block -->
								<div className="col-6 col-md-4">
									<h5 className="mb-2 mb-md-4">{% trans %}COMMUNITY_KEY{% endtrans %}</h5>
									<ul className="nav flex-column">
										<li className="nav-item">
											<a className="nav-link" href="{url('app_front_faq')}">{% trans %}FAQ_KEY{% endtrans %}</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="{url('app_front_forum_index')}">{% trans %}FORUM_KEY{% endtrans %}</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="#">{% trans %}SITEMAP_KEY{% endtrans %}</a>
										</li>
									</ul>
								</div>

								<!-- Link block -->
								<div className="col-6 col-md-4">
									<h5 className="mb-2 mb-md-4">{% trans %}TEACHING_KEY{% endtrans %}</h5>
									<ul className="nav flex-column">
										<li className="nav-item">
											<a className="nav-link" href="{url('app_become_teacher')}">{% trans %}BECOMEATEACKER_KEY{% endtrans %}</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="{url('app_become_teacher')}#contactTitle">{% trans %}HOWTOGUIDE_KEY{% endtrans %}</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="{url('app_terms')}">{% trans %}TERMSANDCONDITIONS_KEY{% endtrans %}</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<!-- Widget 2 END -->

						<!-- Widget 3 START -->
						<div className="col-lg-3">
							<h5 className="mb-2 mb-md-4">{% trans %}CONTACT_KEY{% endtrans %}</h5>
							<!-- Time -->
							<p className="mb-2">
								{% trans %}TOLLFREE_KEY{% endtrans %}:<span className="h6 fw-light ms-2">{siteSettings.contactPhone|default('+237650967064')}</span>
								<span className="d-block small">(9:AM to 8:PM IST)</span>
							</p>

							<p className="mb-0">{% trans %}EMAIL_KEY{% endtrans %}:<span className="h6 fw-light ms-2">{siteSettings.supportEmail|default('akouma.net@gmail.com')}</span>
							</p>

							<div
								className="row g-2 mt-2">
								<!-- Google play store button -->
								<div className="col-6 col-sm-4 col-md-3 col-lg-6">
									<a href="https://play.google.com/store/apps/details?id=com.thealphamerc.kulmapeck&pcampaignid=web_share">
										<img src="{asset('assets/images/client/google-play.svg')}" alt="" />
									</a>
								</div>
								<!-- App store button -->
								<div className="col-6 col-sm-4 col-md-3 col-lg-6">
									<a href="https://play.google.com/store/apps/details?id=com.thealphamerc.kulmapeck&pcampaignid=web_share">
										<img src="{asset('assets/images/client/app-store.svg')}" alt="app-store" />
									</a>
								</div>
							</div>
							<!-- Row END -->
						</div>
						<!-- Widget 3 END -->
					</div>
					<!-- Row END -->

					<!-- Divider -->
					<hr
					className="mt-4 mb-0" />

					<!-- Bottom footer -->
					<div className="py-3">
						<div className="container px-0">
							<div
								className="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
								<!-- copyright text -->
								<div className="text-primary-hover">{siteSettings.siteCopyrights|default('Copyrights 2023 Sensei237. All rights reserved')}</div>
								<!-- copyright links-->
								<div className="justify-content-center mt-3 mt-lg-0">
									<ul className="nav list-inline justify-content-center mb-0">
										<li
											className="list-inline-item">
											<!-- Language selector -->
											<div className="dropup mt-0 text-center text-sm-end">
												<a className="dropdown-toggle nav-link" href="#" role="button" id="languageSwitcher" data-bs-toggle="dropdown" aria-expanded="false">
													<i className="fas fa-globe me-2"></i>
													{% trans %}LANGUAGE_KEY{% endtrans %}
												</a>
												<ul className="dropdown-menu min-w-auto" aria-labelledby="languageSwitcher">
													<li>
														<a className="dropdown-item me-4" href="#"><img className="fa-fw me-2" src="{asset('assets/images/flags/uk.svg')}" alt="" />{% trans %}ENGLISH_KEY{% endtrans %}</a>
													</li>
													<li>
														<a className="dropdown-item me-4" href="#"><img className="fa-fw me-2" src="{asset('assets/images/flags/sp.svg')}" alt="" />{% trans %}FRENCH_KEY{% endtrans %}</a>
													</li>
												</ul>
											</div>
										</li>
										<li className="list-inline-item">
											<div className="dropup mt-0 text-center text-sm-end">
												<a className="dropdown-toggle nav-link" href="#" role="button" id="languageSwitcher" data-bs-toggle="dropdown" aria-expanded="false">
													<i className="fas fa-globe me-2"></i>
													{% trans %}APPARANCE_KEY{% endtrans %}
												</a>
												<ul className="dropdown-menu min-w-auto bg-light dark-mode-switch theme-icon-active">
													<li>
														<a href="#" className="dropdown-item me-4" data-bs-theme-value="light">
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun fa-fw mode-switch" viewbox="0 0 16 16">
																<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
																<use href="#"></use>
															</svg>
															{% trans %}LIGHT_KEY{% endtrans %}
														</a>
													</li>
													<li>
														<a href="#" className="dropdown-item me-4" data-bs-theme-value="dark">
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-stars fa-fw mode-switch" viewbox="0 0 16 16">
																<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
																<path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
																<use href="#"></use>
															</svg>
															{% trans %}DARK_KEY{% endtrans %}
														</a>
													</li>
													<li>
														<a href="#" className="dropdown-item me-4 active" data-bs-theme-value="auto">
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-half fa-fw mode-switch" viewbox="0 0 16 16">
																<path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
																<use href="#"></use>
															</svg>
															{% trans %}AUTO_KEY{% endtrans %}
														</a>
													</li>
												</ul>
											</div>
										</li>
										<li className="list-inline-item">
											<a className="nav-link" href="{url('app_terms')}">{% trans %}TERMSOFUSE_KEY{% endtrans %}</a>
										</li>
										<li className="list-inline-item">
											<a className="nav-link pe-0" href="{url('app_terms')}">{% trans %}PRIVACYPOLICY_KEY{% endtrans %}</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<!-- =======================
															    Footer END -->
		{% endblock %}

		{app.session.get('annonce') and app.session.get('showAnnonces') and dontShowAnnonces is not defined && (

			{include('front/evaluation/_annonces.html.twig', {'annonce': app.session.get('annonce'), 'isForPrommedTest': true})}
		
)}
		{app.session.get('currentEvaluation') and dontShowAnnonces is not defined && (

			{include('front/evaluation/_annonces.html.twig', {'annonce': app.session.get('currentEvaluation'), 'isForCurrentTest': true})}
		
)}

		{app.flashes('notification') && (

			<div id="bottom-notification" style="position: fixed;bottom: 5px;right: 15px; min-height: 0px;z-index: 200;min-width: 400px;">
				<div className="card">
					<div className="card-header"></div>
					<div className="card-body">
						{% for message in app.flashes('notification') %}
							<div className="alert alert-danger alert-dismissible">
								<p>{message}</p>
							</div>
						
))}
					</div>
				</div>
			</div>
		
)}

		<!-- Back to top -->
		<div className="back-top">
			<i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i>
		</div>

		{isReadLessonPage is defined and isReadLessonPage && (

			<a href="{url("app_front_course_forum_index", {slug: course.slug})}" className="text-primary-hover" title="{% trans %}GOTOFORUM_KEY{% endtrans %}" data-bs-toggle="tooltip" style="color: var(--bs-danger);position: fixed;bottom: 50%; left: 40px;z-index: 100;width: 52px;height: 52px;line-height: 52px;text-align: center;display: block;cursor: pointer;visibility: visible; transition: all 0.3s ease-in-out;background: rgba(var(--bs-danger-rgb), 0.1);">
				<i className="bi bi-chat-right-text-fill position-absolute top-50 start-50 translate-middle"></i>
			</a>
		
)}

		{isForumPage is defined and isForumPage && (

			<a href="{url("app_front_course_details", {slug: course.slug})}" className="text-primary-hover" title="{% trans %}BACKTOCOURSEDETAILS_KEY{% endtrans %}" data-bs-toggle="tooltip" style="color: var(--bs-danger);position: fixed;bottom: 50%; left: 40px;z-index: 100;width: 52px;height: 52px;line-height: 52px;text-align: center;display: block;cursor: pointer;visibility: visible; transition: all 0.3s ease-in-out;background: rgba(var(--bs-danger-rgb), 0.1);">
				<i className="bi bi-arrow-left-square-fill position-absolute top-50 start-50 translate-middle"></i>
			</a>
		
)}

		<!-- Modal START -->
		<div className="modal fade" id="coursePremium" tabindex="-1" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">
					<div
						className="modal-header border-0 bg-transparent">
						<!-- Close button -->
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<!-- Modal body -->
					<div
						className="modal-body px-5 pb-5 position-relative overflow-hidden">

						<!-- Element -->
						<figure className="position-absolute bottom-0 end-0 mb-n4 me-n4 d-none d-sm-block">
							<img src="assets/images/element/01.svg" alt="element" />
						</figure>
						<figure className="position-absolute top-0 end-0 z-index-n1 opacity-2">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="818.6px" height="235.1px" viewbox="0 0 818.6 235.1">
								<path className="fill-info" d="M735,226.3c-5.7,0.6-11.5,1.1-17.2,1.7c-66.2,6.8-134.7,13.7-192.6-16.6c-34.6-18.1-61.4-47.9-87.3-76.7 c-21.4-23.8-43.6-48.5-70.2-66.7c-53.2-36.4-121.6-44.8-175.1-48c-13.6-0.8-27.5-1.4-40.9-1.9c-46.9-1.9-95.4-3.9-141.2-16.5 C8.3,1.2,6.2,0.6,4.2,0H0c3.3,1,6.6,2,10,3c46,12.5,94.5,14.6,141.5,16.5c13.4,0.6,27.3,1.1,40.8,1.9 c53.4,3.2,121.5,11.5,174.5,47.7c26.5,18.1,48.6,42.7,70,66.5c26,28.9,52.9,58.8,87.7,76.9c58.3,30.5,127,23.5,193.3,16.7 c5.8-0.6,11.5-1.2,17.2-1.7c26.2-2.6,55-4.2,83.5-2.2v-1.2C790,222,761.2,223.7,735,226.3z"></path>
							</svg>
						</figure>
						<!-- Title -->
						<h2>{% trans %}CHOOSETYPEUSERACCOUNT_KEY{% endtrans %}</span>
					</h2>
					<p>{% trans %}ACCOUNTMODALDESCRIPTION_KEY{% endtrans %}</p>
					<!-- Content -->
					<div className="row mb-3 item-collapse">
						<div className="col-sm-6">
							<a href="{path('app_front_register', {type: 'trainer'})}">
								<img src="{asset('assets/images/avatar/prof-avatar.jpg')}" className="rounded-3 mb-3" alt="..." />
								<caption className="text-center mt-3">{% trans %}TEACHER_KEY{% endtrans %}</caption>
							</a>
						</div>
						<div className="col-sm-6">
							<a href="{path('app_front_register', {type: 'student'})}">
								<img src="{asset('assets/images/avatar/eleve-avatar.jpg')}" className="rounded-3 mb-3" alt="..." />
								<caption className="text-center mt-3">{% trans %}STUDENT_KEY{% endtrans %}</caption>
							</a>
						</div>
					</div>
				</div>

			</div>
		</div>
	</body>
</html></div><!-- Modal END -->{app.user and membre is defined and membre is not null && (

<!-- Modal START -->
<div className="modal fade" id="replyForumMessage" tabindex="-1" aria-hidden="true">
	<div className="modal-dialog modal-lg">
		<div className="modal-content">
			<div
				className="modal-header border-0 bg-transparent">
				<!-- Close button -->
				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<!-- Modal body -->
			<div className="modal-body px-5 pb-5 position-relative overflow-hidden">
				<div
					className="d-flex mb-4 mt-3">
					<!-- Avatar -->
					<div className="avatar avatar-sm flex-shrink-0 me-2">
						<a href="#">
							<img className="avatar-img rounded-circle" src="{asset(app.user.personne.avatarPath)}" alt="" />
						</a>
					</div>

					<form className="w-100 d-flex" method="POST" action="{path("app_course_reply_forum_message")}">
						<input type="hidden" name="reply" id="reply" />
						<input type="hidden" name="membre" id="membre" />
						<input type="hidden" name="response_container" id="response_container" />
						<textarea name="replyMessage" required id="replyTexarea" className="one form-control pe-4 bg-light" placeholder="{% trans %}ADDCOMMENT_KEY{% endtrans %}" rows="3"></textarea>
						<button className="btn btn-primary ms-2 mb-0" type="submit">
							<i className="fas fa-paper-plane"></i>
						</button>
					</form>
				</div>
			</div>

		</div>
	</div>
</div>
<!-- Modal END -->
)}<!-- Vendors -->{% block jquery %}
<script src="{asset('assets/vendor/jquery/jquery-3.6.4.min.js')}"></script>{% endblock %}<!-- Bootstrap JS --><script src="{asset('assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js')}"></script>{% block script1 %}
<!-- Vendors -->
<script src="{asset('assets/vendor/tiny-slider/tiny-slider.js')}"></script>
<script src="{asset('assets/vendor/glightbox/js/glightbox.js')}"></script>
<script src="{asset('assets/vendor/purecounterjs/dist/purecounter_vanilla.js')}"></script>
<script src="{asset('assets/vendor/apexcharts/js/apexcharts.min.js')}"></script>
<script src="{asset('assets/vendor/overlay-scrollbar/js/overlayscrollbars.min.js')}"></script>
<script src="{asset('assets/vendor/choices/js/choices.min.js')}"></script>
<script src="{asset('assets/vendor/aos/aos.js')}"></script>
<script>
	$('.pagination-container nav').addClass('mt-4 d-flex justify-content-center')
$('.pagination-container nav ul.pagination li').addClass('mb-0')
$('.pagination-container nav ul.pagination').addClass('pagination-primary-soft d-inline-block d-md-flex rounded mb-0')

$('.delete-item').on('click', (e) => {
return confirm('Are you sure you want to purchasse ?');
})
</script>

{% block custumJS %}

	<script>
		setTimeout(function () {
$("#bottom-notification").addClass('d-none');
}, 10000)
	</script>

	<div id="quizNotification" className="btn btn-primary">Dès Décembre prochain, les évaluations vous seront programmées !</div>

	<script>
		document.addEventListener("DOMContentLoaded", function () {
function showQuizNotification() {
var notification = document.getElementById("quizNotification");
notification.style.display = "block";
setTimeout(function () {
notification.style.display = "none";
}, 1000); // 5000 milliseconds = 5 seconds
}

// Call the function to show the notification after page load
showQuizNotification();

// Optionally, you can set up the notification to show every 5 seconds
setInterval(showQuizNotification, 5000);
});
	</script>

	<script>
		const likeForumMessage = (e) => {
e.preventDefault();
const elt = $(e.currentTarget)
if (confirm("Confirm that you like these answer ?")) {
$.ajax({
url: elt.attr('href'),
type: "POST",
dataType: "JSON",
success: (response) => {
if (response.hasDone) {
elt.find('.nb-likes').text(response.likes)
}
}
})
}
return false;
}

const showReplyMessageForumModal = (e) => {
e.preventDefault();
$('#replyForumMessage #reply').val(e.currentTarget.dataset.forumMessage)
$('#replyForumMessage #membre').val(e.currentTarget.dataset.membre)
$('#replyForumMessage #response_container').val(e.currentTarget.dataset.appendResponse)

}

$('#replyForumMessage for').on('submit', (e) => {
e.preventDefault();
const form = $(this);
const replyMessage = $('#replyTexarea').val()
const reply = $('#replyForumMessage #reply').val()
const membre = $('#replyForumMessage #membre').val()
$.ajax({
url: $(form).attr('action'),
type: "POST",
dataType: "JSON",
data: {
'replyMessage': replyMessage,
'membre': membre,
'reply': reply
},
success: (response) => {
if (respone.hasDone) {
$('#replyForumMessage').modal('hide')
}
}
})
})

$('.delete-item').on('click', (e) => {
return confirm('Are you sure you want to delete this item?');
})
document.querySelectorAll('.reply-forum-message').forEach(btn => {
btn.addEventListener("click", showReplyMessageForumModal)
})
document.querySelectorAll('.like-forum-message').forEach(btn => {
btn.addEventListener("click", likeForumMessage)
})
	</script>
{% endblock %}{% endblock %}{% block script %}{% endblock %}<!-- Template Functions --><script src="{asset('assets/js/functions.js')}"></script>
<script>
    // Global translations for JavaScript
    window.translations = {
        'chat.typing.single': "{'chat.typing.single'|trans}",
        'chat.typing.multiple': "{'chat.typing.multiple'|trans}",
        'chat.errors.connection': "{'chat.errors.connection'|trans}",
        'chat.errors.message': "{'chat.errors.message'|trans}",
        'chat.errors.group': "{'chat.errors.group'|trans}"
    };
</script>

<!-- Webpack Encore -->
{encore_entry_script_tags('app')}
{% block javascripts %}{% endblock %}

    </>
  );
}
