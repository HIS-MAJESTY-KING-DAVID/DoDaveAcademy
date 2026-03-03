import React from 'react';
import Link from 'next/link';

export default function VideoPlayer(props: any) {
  return (
    <>
<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from eduport.webestica.com/course-video-player.html by HTTrack Website Copier/3.x [XR&CO'2014], Sun, 12 Mar 2023 00:44:17 GMT -->
<head>
	<title>Kulmapeck | Lecture</title>

	<!-- Meta Tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="author" content="Webestica.com">
	<meta name="description" content="Kulmapeck">

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
			if(el != 'undefined' && el != null) {
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

			document.querySelectorAll('[data-bs-theme-value]')
				.forEach(toggle => {
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
	<link rel="shortcut icon" href="{asset('assets/images/favicon.ico')}">

	<!-- Google Font -->
	<link rel="preconnect" href="../fonts.googleapis.com/index.html">
	<link rel="preconnect" href="../fonts.gstatic.com/index.html" crossorigin>
	<link rel="stylesheet" href="../fonts.googleapis.com/css23ab4.css?family=Heebo:wght@400;500;700&amp;family=Roboto:wght@400;500;700&amp;display=swap">

	<!-- Plugins CSS -->
	<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/font-awesome/css/all.min.css')}">
	<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/bootstrap-icons/bootstrap-icons.css')}">
	<link rel="stylesheet" type="text/css" href="{asset('assets/vendor/plyr/plyr.css')}" />

	<!-- Theme CSS -->
	<link rel="stylesheet" type="text/css" href="{asset('assets/css/style.css')}">

</head>

<body>

<!-- **************** MAIN CONTENT START **************** -->
<main>

<section className="py-0 bg-dark position-relative">

	<div className="row g-0">
		<div className="d-flex">
			<div className="overflow-hidden fullscreen-video w-100">
				<!-- Full screen video START -->
				<div className="video-player rounded-3">
					<video controls crossorigin="anonymous" autoplay playsinline poster="{asset(lesson.poster)}">
						<source src="{asset('uploads/media/courses/lessons/videos/' ~ lesson.videoLink)}" type="video/mp4">
						<!-- Caption files -->
						<track kind="captions" label="English" srclang="en" src="assets/images/videos/en.vtt" default>
						<track kind="captions" label="French" srclang="fr" src="assets/images/videos/fr.vtt">
					</video>
				</div>
				<!-- Full screen video END -->
		
				<!-- Plyr resources and browser polyfills are specified in the pen settings -->
			</div>

			<!-- Page content START -->
			<div className="justify-content-end position-relative">
				<!-- Collapse button START -->
				<button className="navbar-toggler btn btn-white mt-4 plyr-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
					<span className="navbar-toggler-animation">
						<span></span>
						<span></span>
						<span></span>
					</span>	
				</button>
				<!-- Collapse button END -->

				<!-- Collapse body START -->
				<div className="collapse collapse-horizontal" id="collapseWidthExample">
					<div className="card vh-100 overflow-auto rounded-0 w-280px w-sm-400px">
						<!-- Title -->
						<div className="card-header bg-light rounded-0">
							<h1 className="mt-2 fs-5">{lesson.chapitre.cours.intitule}</h1>
							<h6 className="mb-0 fw-normal"><a href="#">{% trans %}BY_KEY{% endtrans %} {lesson.chapitre.cours.enseignant.utilisateur.personne.nomComplet}</a></h6>
						</div>

						<!-- Course content START -->
						<div className="card-body">
							<div className="d-sm-flex justify-content-sm-between">
								<h5>Course content</h5>
							</div>
							<hr /> <!-- Divider -->
							<!-- Course START -->
								<div className="row">
									<div className="col-12">
										<!-- Accordion START -->
										<div className="accordion accordion-flush-light accordion-flush" id="accordionExample">
											{% for chap in lesson.chapitre.cours.chapitres|sort((a, b) => a.numero <=> b.numero) %}
                                                <!-- Item -->
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="heading{loop.index}">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{loop.index}" aria-expanded="true" aria-controls="collapse{loop.index}">
                                                            <span className="mb-0 fw-bold">{chap.title}</span> 
                                                        </button>
                                                    </h2>
                                                    <div id="collapse{loop.index}" className="accordion-collapse collapse show" aria-labelledby="heading{loop.index}" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body px-3">
                                                            <div className="vstack gap-3">
                                                                {% for less in chap.lessons|sort((c, d) => c.numero <=> d.numero) %}
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <div className="position-relative d-flex align-items-center">
                                                                            <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                                                                                <i className="fas {less.videoLink is not same as null ? 'fa-play' : 'fa-file-pdf'} me-0"></i>
                                                                            </a>
                                                                            <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px">{less.title}</span>
                                                                        </div>
                                                                        <p className="mb-0 text-truncate">
                                                                            {% set isReaded = false %}
                                                                            {eleve is not same as null && (

                                                                                {% for l in eleve.lectures %}
                                                                                    {l.lesson is same as less and l.isFinished && (

                                                                                        {% set isReaded = true %}
                                                                                    
)}
                                                                                
))}
                                                                            
)}
                                                                            <!-- Actions Mark button -->
                                                                            <span className="p-2 mb-0 {isReaded ? 'text-success' : 'text-secondary'}" data-bs-toggle="tooltip" data-bs-placement="top" title="{isReaded ? '{% trans %}COMPLETED_KEY{% endtrans %}' : '{% trans %}NOTCOMPLETED_KEY{% endtrans %}'}">
                                                                                <i className="bi bi-check-circle-fill"></i>
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                
))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
))}

										</div>
										<!-- Accordion END -->
									</div>
								</div>
							<!-- Course END -->
						</div>
						<!-- Course content END -->

						<div className="card-footer">
							<div className="d-grid">
								<a href="{url("app_front_read_lesson", {slug: lesson.slug, view: 'normal'})}" className="btn btn-primary-soft mb-0">{% trans %}BACKTOCOURSE_KEY{% endtrans %}</a>
							</div>
						</div>
					</div>
				</div>
				<!-- Collapse body END -->
			</div>
			<!-- Page content END -->
		</div>
	</div>

</section>
</main>
<!-- **************** MAIN CONTENT END **************** -->

<!-- Modal body START -->
<div className="modal fade" id="Notemodal" tabindex="-1" aria-labelledby="NotemodalLabel" aria-hidden="true">
	<div className="modal-dialog">
		<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="NotemodalLabel">Add New Note</h5>
				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">
				<!-- Note input -->
				<div className="col-12">
					<label className="form-label">Type your note <span className="text-danger">*</span></label>
					<input type="text" className="form-control" placeholder="Type your note" />
				</div>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" className="btn btn-primary">Save Note</button>
			</div>
		</div>
	</div>
</div>
<!-- Modal body END -->

<!-- Back to top -->
<div className="back-top"><i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle"></i></div>

<!-- Bootstrap JS -->
<script src="{asset('assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js')}"></script>

<!-- Vendors -->
<script src="{asset('assets/vendor/plyr/plyr.js')}"></script>

<!-- Template Functions -->
<script src="{asset('assets/js/functions.js')}"></script>

</body>

<!-- Mirrored from eduport.webestica.com/course-video-player.html by HTTrack Website Copier/3.x [XR&CO'2014], Sun, 12 Mar 2023 00:44:17 GMT -->
</html>
    </>
  );
}
