import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}
	Home page!
{% endblock %}

{% block body %}
	<div className="container-fluid px-0">
		<div id="carouselId" className="carousel slide" data-bs-ride="carousel">
			<ol className="carousel-indicators">
				<li data-bs-target="#carouselId" data-bs-slide-to="0" className="active" aria-current="true" aria-label="First slide"></li>
				<li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
			</ol>
			<div className="carousel-inner" role="listbox">
				<div className="carousel-item active">
					<img src="{asset('assets/img/carousel-1.jpg')}" className="img-fluid" alt="First slide" />
					<div className="carousel-caption">
						<div className="container carousel-content">
							<h6 className="text-secondary h4 animated fadeInUp">Ici, recevez les informations de bases pour devenir Actionnaire chez KULMAPECK.</h6>


							<h2 className="text-white display-1 mb-4 animated fadeInRight">
								'' KULMAPECK, la solution éducative innovante et digitalisée adaptée au contexte Africain. ''</h2S>


							<p className="mb-4 text-white fs-5 animated fadeInDown">Contribuez à l'éducation et à la formation des jeunes et même ceux des zones en crises et enclavées.</p>


							<a href="{path('app_investisseur_new')}" className="me-2">

								<button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Acheter les Actions</button>

							</a>
							<a href="https://kulmapeck.com" className="ms-2">

								<button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Visiter KULMAPECK</button>

							</a>


						</div>
					</div>
				</div>
				<div className="carousel-item">
					<img src="{asset('assets/img/carousel-2.jpg')}" className="img-fluid" alt="Second slide" />
					<div className="carousel-caption">
						<div className="container carousel-content">
							<h6 className="text-secondary h4 animated fadeInUp">Meilleure Solution Digitale</h6>
							<h1 className="text-white display-1 mb-4 animated fadeInLeft">Pour une education de qualite au apprenants!</h1>
							<p className="mb-4 text-white fs-5 animated fadeInDown">
								Le Nouvel et Gigantesque Lycée Polyvalent Digital au
																																																																																																																																																																																																																																																																																																																																																																																																								 Service des Différents Acteurs de l`Education..</p>

							<a href="{path('app_investisseur_new')}" className="me-2">

								<button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Devenir Investisseur</button>
							</a>
							<a href="https://kulmapeck.com" className="ms-2">

								<button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Se former</button>
							</a>
						</div>
					</div>
				</div>
			</div>
			<button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	</div>
	<!-- Carousel End -->


	<!-- Fact Start -->
	<div className="container-fluid bg-secondary py-5">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 wow fadeIn" data-wow-delay=".1s">
					<div className="d-flex counter">
						<h1 className="me-3 text-primary counter-value">99</h1>
						<h5 className="text-white mt-1">Certification a venir</h5>
					</div>
				</div>
				<div className="col-lg-3 wow fadeIn" data-wow-delay=".3s">
					<div className="d-flex counter">
						<h1 className="me-3 text-primary counter-value">25</h1>
						<h5 className="text-white mt-1">Temoignages</h5>
					</div>
				</div>
				<div className="col-lg-3 wow fadeIn" data-wow-delay=".5s">
					<div className="d-flex counter">
						<h1 className="me-3 text-primary counter-value">120</h1>
						<h5 className="text-white mt-1">Enseignants</h5>
					</div>
				</div>
				<div className="col-lg-3 wow fadeIn" data-wow-delay=".7s">
					<div className="d-flex counter">
						<h1 className="me-3 text-primary counter-value">250</h1>
						<h5 className="text-white mt-1">
							Cours</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Fact End -->


	<!-- About Start -->
	<div className="container-fluid py-5 my-5">
		<div className="container pt-5">
			<div className="row g-5">
				<div className="col-lg-5 col-md-6 col-sm-12 wow fadeIn" data-wow-delay=".3s">
					<div className="h-100 position-relative">
						<img src="{asset('assets/img/about-1.jpg')}" className="img-fluid w-75 rounded" alt="" style="margin-bottom: 25%;" />
						<div className="position-absolute w-75" style="top: 25%; left: 25%;">
							<img src="{asset('assets/img/about-2.jpg')}" className="img-fluid w-100 rounded" alt="" />
						</div>
					</div>


				</div>
				<div className="col-lg-7 col-md-6 col-sm-12 wow fadeIn" data-wow-delay=".5s">
					<h5 className="text-primary">A propos de nous</h5>
					<h1 className="mb-4">Des solutions éducatives innovantes basees sur le digital</h1>

					<p>Suites aux récents bouleversements causés par la pandémie à Covid 19, les crises sécuritaires, les
																																																																																																																																																																																																																																																																																																																								revendications des Enseignants, le Ministère de L`Enseignement Secondaire a infructueusement
																																																																																																																																																																																																																																																																																																																								instauré depuis 2020 , le Distance Education comme approche pédagogique complémentaire qui
																																																																																																																																																																																																																																																																																																																								résorbera l`effet négatif des multiformes crises actuelles et avenirs sur l`éducation ; dans l`espérance de
																																																																																																																																																																																																																																																																																																																								garantir une éducation de qualité aux plus de 2 millions de lycéens et collégiens que compte le
																																																																																																																																																																																																																																																																																																																								Cameroun ; ce, en conformité avec la politique mondiale de l’UNESCO pour l’éducation.</p>
					<p className="mb-4">Au terme d`un diagnostic minutieux et rigoureux des carences et insuffisances aussi bien de l`approche
																																																																																																																																																																																																																																																																																																																									gouvernementale de l`éducation à distance que celle de l’environnement concurrentiel, l`Entreprise
																																																																																																																																																																																																																																																																																																																									KULMAPECK met à la disposition des différents acteurs de l`éducation une Application Web et Mobile
																																																																																																																																																																																																																																																																																																																									produisant un contenu pédagogique sur mesure épousant la philosophie ministérielle pour l’éducation et
																																																																																																																																																																																																																																																																																																																									reparti par classe, filière, matière de l’enseignement général à l’ enseignement technique, dans les soussystèmes d`enseignement Francophone et Anglophone afin d`accroitre véritablement le niveau et la qualité
																																																																																																																																																																																																																																																																																																																									de l`éducation au Cameroun.</p>

					<a href="{path('app_about')}" className="btn btn-secondary rounded-pill px-5 py-3 text-white">More Details</a>

				</div>
			</div>
		</div>
	</div>
	<!-- About End -->


	<!-- Services Start -->
	<div className="container-fluid services py-5 mb-5">
		<div className="container">
			<div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
				<h5 className="text-primary">Nos Services</h5>
				<h1>Des services de qualite pour tous</h1>
			</div>
			<div className="row g-5 services-inner">
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
					<div className="services-item bg-light">
						<div className="p-4 text-center services-content">
							<div className="services-content-icon">
								<i className="fa fa-code fa-7x mb-4 text-primary"></i>
								<h4 className="mb-3">Formation Classique</h4>
								<p className="mb-4">
									Marché d'apprentissage et d'enseignement en ligne avec plus de 5 000 cours et 10 millions d'étudiants.
																																																																																																																																																																																																																																																																																																																																													 Enseigné par des experts pour vous aider à acquérir de nouvelles compétences.</p>

								<a href="" className="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
					<div className="services-item bg-light">
						<div className="p-4 text-center services-content">
							<div className="services-content-icon">
								<i className="fa fa-file-code fa-7x mb-4 text-primary"></i>
								<h4 className="mb-3">Web Development</h4>
								<p className="mb-4">Le développement web est une fusion d'art et
																																																																																																																																																																																																																																																																																																																	 de science, où la créativité 
																																																																																																																																																																																																																																																																																																																																				rencontre la logique pour créer des expériences en ligne captivantes.
																																																																																																																																																																																																																																																																																																																																				 Des langages comme HTML, CSS et JavaScript façonnent l'apparence et le
																																																																																																																																																																																																																																																																																																																																				  comportement des sites.</p>

								<a href="" className="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
					<div className="services-item bg-light">
						<div className="p-4 text-center services-content">
							<div className="services-content-icon">
								<i className="fa fa-external-link-alt fa-7x mb-4 text-primary"></i>
								<h4 className="mb-3">UI/UX Design</h4>
								<p className="mb-4">Le design UI/UX donne vie à la fonctionnalité. En harmonisant l'esthétique et l'utilité, il crée des expériences mémorables et intuitives pour les utilisateurs. Chaque pixel raconte une histoire, chaque interaction captive..</p>

								<a href="" className="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
					<div className="services-item bg-light">
						<div className="p-4 text-center services-content">
							<div className="services-content-icon">
								<i className="fas fa-user-secret fa-7x mb-4 text-primary"></i>
								<h4 className="mb-3">Suivi des eleves</h4>
								<p className="mb-4">Assurez-vous de suivre régulièrement la progression de vos élèves. Le suivi attentif permet 
																																																																																																																																																																																																																																																																																																																																				d'identifier rapidement les besoins et d'adapter l'enseignement pour favoriser leur réussite. Ensemble, nous construisons un avenir prometteur pour chaque élève.</p>

								<a href="" className="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a>
							</div>

						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
					<div className="services-item bg-light">
						<div className="p-4 text-center services-content">
							<div className="services-content-icon">
								<i className="fa fa-envelope-open fa-7x mb-4 text-primary"></i>
								<h4 className="mb-3">Formations Professionnelles</h4>
								<p className="mb-4">Explorez de nouvelles opportunités avec nos formations professionnelles
																																																																																																																																																																																																																																																																																																																																				 sur mesure. Boostez votre carrière dès aujourd'hui avec des programmes adaptés à vos besoins et encadrés par des experts du domaine..</p>

								<a href="" className="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
					<div className="services-item bg-light">
						<div className="p-4 text-center services-content">
							<div className="services-content-icon">
								<i className="fas fa-laptop fa-7x mb-4 text-primary"></i>
								<h4 className="mb-3">Systemes educatifs</h4>
								<p className="mb-4">
									Les systèmes éducatifs sont les fondements de la société, façonnant les esprits et préparant les individus à affronter les défis de demain. Ils sont le creuset de la connaissance, de l'apprentissage et de l'innovation. Investir dans l'éducation, 
																																																																																																																																																																																																																																																																																																																												c'est investir dans l'avenir de notre monde.</p>
								<a href="" className="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Services End -->


	<!-- Project Start -->
	<div className="container-fluid project py-5 mb-5">
		<div className="container">
			<div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
				<h5 className="text-primary">Our Project</h5>
				<h1>Nos projets recents
				</h1>
			</div>
			<div className="row g-5">
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
					<div className="project-item">
						<div className="project-img">
							<img src="{asset('assets/img/project-1.jpg')}" className="img-fluid w-100 rounded" alt="" />
							<div className="project-content">
								<a href="#" className="text-center">
									<h4 className="text-secondary">Web design</h4>
									<p className="m-0 text-white">Web Analysis</p>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
					<div className="project-item">
						<div className="project-img">
							<img src="{asset('assets/img/project-2.jpg')}" className="img-fluid w-100 rounded" alt="" />
							<div className="project-content">
								<a href="#" className="text-center">
									<h4 className="text-secondary">Cyber Security</h4>
									<p className="m-0 text-white">Cyber Security Core</p>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
					<div className="project-item">
						<div className="project-img">
							<img src="{asset('assets/img/project-3.jpg')}" className="img-fluid w-100 rounded" alt="" />
							<div className="project-content">
								<a href="#" className="text-center">
									<h4 className="text-secondary">Mobile Info</h4>
									<p className="m-0 text-white">Upcomming Phone</p>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
					<div className="project-item">
						<div className="project-img">
							<img src="{asset('assets/img/project-4.jpg')}" className="img-fluid w-100 rounded" alt="" />

							<div className="project-content">
								<a href="#" className="text-center">
									<h4 className="text-secondary">Web Development</h4>
									<p className="m-0 text-white">Web Analysis</p>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
					<div className="project-item">
						<div className="project-img">
							<img src="{asset('assets/img/project-5.jpg')}" className="img-fluid w-100 rounded" alt="" />

							<div className="project-content">
								<a href="#" className="text-center">
									<h4 className="text-secondary">Digital Marketing</h4>
									<p className="m-0 text-white">Marketing Analysis</p>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
					<div className="project-item">
						<div className="project-img">
							<img src="{asset('assets/img/project-6.jpg')}" className="img-fluid w-100 rounded" alt="" />

							<div className="project-content">
								<a href="#" className="text-center">
									<h4 className="text-secondary">keyword Research</h4>
									<p className="m-0 text-white">keyword Analysis</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Project End -->


	<!-- Blog Start -->
	<div className="container-fluid blog py-5 mb-5">
		<div className="container">
			<div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
				<h5 className="text-primary">Our Blog</h5>
				<h1>Dernieres infos et Blog</h1>
			</div>
			<div className="row g-5 justify-content-center">
				<div className="col-lg-6 col-xl-4 wow fadeIn" data-wow-delay=".3s">
					<div className="blog-item position-relative bg-light rounded">
						<img src="{asset('assets/img/blog-1.jpg')}" className="img-fluid w-100 rounded-top" alt="" />

						<span className="position-absolute px-4 py-3 bg-primary text-white rounded" style="top: -28px; right: 20px;">Contact Parent</span>
						<div className="blog-btn d-flex justify-content-between position-relative px-3" style="margin-top: -75px;">
							<div className="blog-icon btn btn-secondary px-3 rounded-pill my-auto">
								<a href="" className="btn text-white">Read More</a>
							</div>
							<div className="blog-btn-icon btn btn-secondary px-4 py-3 rounded-pill ">
								<div className="blog-icon-1">
									<p className="text-white px-2">Share<i className="fa fa-arrow-right ms-3"></i>
									</p>
								</div>
								<div className="blog-icon-2">
									<a href="" className="btn me-1">
										<i className="fab fa-facebook-f text-white"></i>
									</a>
									<a href="" className="btn me-1">
										<i className="fab fa-twitter text-white"></i>
									</a>
									<a href="" className="btn me-1">
										<i className="fab fa-instagram text-white"></i>
									</a>
								</div>
							</div>
						</div>
						<div className="blog-content text-center position-relative px-3" style="margin-top: -25px;">
							<img src="{asset('assets/img/admin.jpg')}" className="img-fluid rounded-circle border border-4 border-white mb-3" alt="" />

							<h5 className="">Rene BISSAYA</h5>
							<span className="text-secondary">24 Mars 2024</span>
							<p className="py-2">
								En tant qu'éducateurs, nous partageons tous la même passion pour le développement et le bien-être de nos enfants, et votre soutien est crucial pour leur réussite.
																																																																																																																																																																	
																																																																																																																																																																	L'éducation n'est pas seulement 
																																																																																																																																																																	l'affaire de l'école, mais aussi un partenariat entre 
																																																																																																																																																																	l'école, les enseignants et les parents.
																																																																																																																																																																	 Nous croyons fermement que lorsque nous travaillons
																																																																																																																																																																	  ensemble...:</p>

						</div>
						<div className="blog-coment d-flex justify-content-between px-4 py-2 border bg-primary rounded-bottom">
							<a href="" className="text-white">
								<small>
									<i className="fas fa-share me-2 text-secondary"></i>24 Share</small>
							</a>
							<a href="" className="text-white">
								<small>
									<i className="fa fa-comments me-2 text-secondary"></i>15 Comments</small>
							</a>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-xl-4 wow fadeIn" data-wow-delay=".5s">
					<div className="blog-item position-relative bg-light rounded">
						<img src="{asset('assets/img/blog-2.jpg')}" className="img-fluid w-100 rounded-top" alt="" />

						<span className="position-absolute px-4 py-3 bg-primary text-white rounded" style="top: -28px; right: 20px;">Development</span>
						<div className="blog-btn d-flex justify-content-between position-relative px-3" style="margin-top: -75px;">
							<div className="blog-icon btn btn-secondary px-3 rounded-pill my-auto">
								<a href="" className="btn text-white ">Read More</a>
							</div>
							<div className="blog-btn-icon btn btn-secondary px-4 py-3 rounded-pill ">
								<div className="blog-icon-1">
									<p className="text-white px-2">Share<i className="fa fa-arrow-right ms-3"></i>
									</p>
								</div>
								<div className="blog-icon-2">
									<a href="" className="btn me-1">
										<i className="fab fa-facebook-f text-white"></i>
									</a>
									<a href="" className="btn me-1">
										<i className="fab fa-twitter text-white"></i>
									</a>
									<a href="" className="btn me-1">
										<i className="fab fa-instagram text-white"></i>
									</a>
								</div>
							</div>
						</div>
						<div className="blog-content text-center position-relative px-3" style="margin-top: -25px;">
							<img src="{asset('assets/img/admin.jpg')}" className="img-fluid rounded-circle border border-4 border-white mb-3" alt="" />

							<h5 className="">Cyrille ONDOUA</h5>
							<span className="text-secondary">23 Avril 2024</span>
							<p className="py-2">La formation, conçue pour les débutants et les 
																																																																																																																																																																																								développeurs expérimentés, couvrira divers aspects du développement logiciel Traitement Images,
																																																																																																																																																																																								 y compris les langages de programmation populaires tels que Python, Php, C, C++, Matlab,Arduino, Java, JavaScript, ainsi que les frameworks et les outils de développement modernes...</p>

						</div>
						<div className="blog-coment d-flex justify-content-between px-4 py-2 border bg-primary rounded-bottom">
							<a href="" className="text-white">
								<small>
									<i className="fas fa-share me-2 text-secondary"></i>
									Share</small>
							</a>
							<a href="" className="text-white">
								<small>
									<i className="fa fa-comments me-2 text-secondary"></i>2 Comments</small>
							</a>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-xl-4 wow fadeIn" data-wow-delay=".7s">
					<div className="blog-item position-relative bg-light rounded">
						<img src="{asset('assets/img/blog-3.jpg')}" className="img-fluid w-100 rounded-top" alt="" />
						<span className="position-absolute px-4 py-3 bg-primary text-white rounded" style="top: -28px; right: 20px;">Rencontre Enseignant</span>
						<div className="blog-btn d-flex justify-content-between position-relative px-3" style="margin-top: -75px;">
							<div className="blog-icon btn btn-secondary px-3 rounded-pill my-auto">
								<a href="" className="btn text-white ">Read More</a>
							</div>
							<div className="blog-btn-icon btn btn-secondary px-4 py-3 rounded-pill ">
								<div className="blog-icon-1">
									<p className="text-white px-2">Share<i className="fa fa-arrow-right ms-3"></i>
									</p>
								</div>
								<div className="blog-icon-2">
									<a href="" className="btn me-1">
										<i className="fab fa-facebook-f text-white"></i>
									</a>
									<a href="" className="btn me-1">
										<i className="fab fa-twitter text-white"></i>
									</a>
									<a href="" className="btn me-1">
										<i className="fab fa-instagram text-white"></i>
									</a>
								</div>
							</div>
						</div>
						<div className="blog-content text-center position-relative px-3" style="margin-top: -25px;">
							<img src="{asset('assets/img/admin.jpg')}" className="img-fluid rounded-circle border border-4 border-white mb-3" alt="" />
							<h5 className="">Alain KENBOU</h5>
							<span className="text-secondary">30 jan 2024</span>
							<p className="py-2">Chers collègues enseignants,
																																																																																																																																																																									
																																																																																																																																																																									Nous vous convions à une importante assemblée générale qui s'est tenue le 30 jan. et nous avons besoin de la participation de chacun d'entre vous.
																																																																																																																																																																									
																																																																																																																																																																									Ordre du jour :
																																																																																																																																																																									
																																																																																																																																																																									Bilan de l'année scolaire en cours.
																																																																																																																																																																									Points sur les projets en cours et à venir.
																																																																																																																																																																									Discussions sur les défis et les opportunités pour l'année à venir. Cordialement
							</p>

						</div>
						<div className="blog-coments d-flex justify-content-between px-4 py-2 border bg-primary rounded-bottom">
							<a href="" className="text-white">
								<small>
									<i className="fas fa-share me-2 text-secondary"></i>3 Share</small>
							</a>
							<a href="" className="text-white">
								<small>
									<i className="fa fa-comments me-2 text-secondary"></i>31 Comments</small>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Blog End -->


	<!-- Team Start -->
	<div className="container-fluid py-5 mb-5 team">
		<div className="container">
			<div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
				<h5 className="text-primary">Notre Equipe</h5>
				<h1>Rencontrer Nos experts</h1>
			</div>
			<div className="owl-carousel team-carousel wow fadeIn" data-wow-delay=".5s">
				<div className="rounded team-item">
					<div className="team-content">
						<div className="team-img-icon">
							<div className="team-img rounded-circle">
								<img src="{asset('assets/img/team-1.jpg')}" className="img-fluid w-100 rounded-circle" alt="" />
							</div>
							<div className="team-name text-center py-3">
								<h4 className="">Cyrille NGAZOA ONDOUA</h4>
								<p className="m-0">Ingenieur developpeur
								</p>
							</div>
							<div className="team-icon d-flex justify-content-center pb-4">
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-facebook-f"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-twitter"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-instagram"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-linkedin-in"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded team-item">
					<div className="team-content">
						<div className="team-img-icon">
							<div className="team-img rounded-circle">
								<img src="{asset('assets/img/team-2.jpg')}" className="img-fluid w-100 rounded-circle" alt="" />
							</div>
							<div className="team-name text-center py-3">
								<h4 className="">Rene BISSAYA</h4>
								<p className="m-0">Ingenieur BTP/ ENSEIGNANT</p>
							</div>
							<div className="team-icon d-flex justify-content-center pb-4">
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-facebook-f"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-twitter"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-instagram"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-linkedin-in"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded team-item">
					<div className="team-content">
						<div className="team-img-icon">
							<div className="team-img rounded-circle">
								<img src="{asset('assets/img/team-3.jpg')}" className="img-fluid w-100 rounded-circle" alt="" />
							</div>
							<div className="team-name text-center py-3">
								<h4 className="">KENBOU Alain</h4>
								<p className="m-0">Directeur de la pedagogie</p>
							</div>
							<div className="team-icon d-flex justify-content-center pb-4">
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-facebook-f"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-twitter"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-instagram"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-linkedin-in"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded team-item">
					<div className="team-content">
						<div className="team-img-icon">
							<div className="team-img rounded-circle">
								<img src="{asset('assets/img/team-4.jpg')}" className="img-fluid w-100 rounded-circle" alt="" />
							</div>
							<div className="team-name text-center py-3">
								<h4 className="">KOLLO Françoise Diela</h4>

								<p className="m-0">Directrice Marketing</p>
							</div>
							<div className="team-icon d-flex justify-content-center pb-4">
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-facebook-f"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-twitter"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-instagram"></i>
								</a>
								<a className="btn btn-square btn-secondary text-white rounded-circle m-1" href="">
									<i className="fab fa-linkedin-in"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- Team End -->

	<!-- Testimonial Start -->
	<div className="container-fluid testimonial py-5 mb-5">
		<div className="container">
			<div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
				<h5 className="text-primary">Nos temoignages</h5>
				<h1>Retour des apprenants !</h1>
			</div>
			<div className="owl-carousel testimonial-carousel wow fadeIn" data-wow-delay=".5s">
				<div className="testimonial-item border p-4">
					<div className="d-flex align-items-center">
						<div className="">
							<img src="img/testimonial-1.jpg" alt="" />
						</div>
						<div className="ms-4">
							<h4 className="text-secondary">Gregoire MBIDA</h4>
							<p className="m-0 pb-3">Eleve</p>
							<div className="d-flex pe-5">
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
							</div>
						</div>
					</div>
					<div className="border-top mt-4 pt-3">
						<p className="mb-0">
							Merci beaucoup beaucoup  beaucoup pour cette plateforme éducative incroyable ! Grâce à vous,
																																																																																																																																																																																																																																																																																																												
																																																																																																																																																																																																																																																																																																												
																																																																																																																																																																																																																																																																																																												
																																																																																																																																																																																																																																																																																																																			j'ai pu approfondir mes connaissances et réussir mes examens avec succès.
																																																																																																																																																																																																																																																																																																																			 Votre dévouement envers notre éducation est vraiment inspirant. Merci encore !</p>

					</div>
				</div>
				<div className="testimonial-item border p-4">
					<div className=" d-flex align-items-center">
						<div className="">
							<img src="img/testimonial-2.jpg" alt="" />
						</div>
						<div className="ms-4">
							<h4 className="text-secondary">Oumaru YAYA</h4>
							<p className="m-0 pb-3">Eleve</p>
							<div className="d-flex pe-5">
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
							</div>
						</div>
					</div>
					<div className="border-top mt-4 pt-3">
						<p className="mb-0">
							Je  vous remercie du fond du cœur pour cette plateforme éducative exceptionnelle. Grâce à elle, j'ai pu apprendre de 
																																																																																																																																																																																																																																																																																																																										manière interactive et stimulante. Vos enseignants sont vraiment formidables et votre engagement envers notre réussite est palpable. Merci infiniment !</p>

					</div>
				</div>
				<div className="testimonial-item border p-4">
					<div className=" d-flex align-items-center">
						<div className="">
							<img src="img/testimonial-3.jpg" alt="" />
						</div>
						<div className="ms-4">
							<h4 className="text-secondary">Pierre WAFO</h4>
							<p className="m-0 pb-3">ELEVE</p>
							<div className="d-flex pe-5">
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
							</div>
						</div>
					</div>
					<div className="border-top mt-4 pt-3">
						<p className="mb-0">Je voulais simplement exprimer ma reconnaissance pour votre plateforme éducative. Les cours sont clairs, 
																																																																																																																																																																																																																																																																																																																										les ressources sont abondantes et l'interface est conviviale. Merci pour tout le soutien que vous nous apportez dans notre parcours éducatif.</p>

					</div>
				</div>
				<div className="testimonial-item border p-4">
					<div className=" d-flex align-items-center">
						<div className="">
							<img src="img/testimonial-4.jpg" alt="" />
						</div>
						<div className="ms-4">
							<h4 className="text-secondary">Aissa TOURE</h4>
							<p className="m-0 pb-3">ELEVE</p>
							<div className="d-flex pe-5">
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
								<i className="fas fa-star me-1 text-primary"></i>
							</div>
						</div>
					</div>
					<div className="border-top mt-4 pt-3">
						<p className="mb-0">
							Un immense merci à  l'équipe de cette plateforme éducative 
																																																																																																																																																																																																																																																																																														fantastique ! Vos efforts pour rendre l'apprentissage accessible
																																																																																																																																																																																																																																																																																														. Je suis reconnaissant(e) de pouvoir compter sur une ressource aussi précieuse pour mon éducation. Merci encore et continuez votre excellent travail !</p>

					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Testimonial End -->


	<!-- Contact Start -->
	<div className="container-fluid py-5 mb-5">
		<div className="container">
			<div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
				<h5 className="text-primary">Get In Touch</h5>
				<h1 className="mb-3">Veuillez nous contacter pour tous vos soucis !</h1>
				<p className="mb-2">Nous sommes là pour vous aider ! N'hésitez pas à nous contacter pour toute question ou assistance. Nous sommes impatients de vous fournir le soutien dont vous avez besoin..
					<a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
			</div>
			<div className="contact-detail position-relative p-5">
				<div className="row g-5 mb-5 justify-content-center">
					<div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".3s">
						<div className="d-flex bg-light p-3 rounded">
							<div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
								<i className="fas fa-map-marker-alt text-white"></i>
							</div>
							<div className="ms-3">
								<h4 className="text-primary">Address</h4>
								<a href="https://goo.gl/maps/Zd4BCynmTb98ivUJ6" target="_blank" className="h5">
									DOUALA-Akwa/ Carrefour Équinox Tv face Beneficial Assurance</a>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".5s">
						<div className="d-flex bg-light p-3 rounded">
							<div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
								<i className="fa fa-phone text-white"></i>
							</div>
							<div className="ms-3">
								<h4 className="text-primary">Appelez nous</h4>
								<a className="h5" href="tel:+0123456789" target="_blank">+237 675391197 / +237 698809093</a>

							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".7s">
						<div className="d-flex bg-light p-3 rounded">
							<div className="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
								<i className="fa fa-envelope text-white"></i>
							</div>
							<div className="ms-3">
								<h4 className="text-primary">Email Us</h4>
								<a className="h5" href="mailto:contact@kulmapeck.com" target="_blank">contact@kulmapeck.com</a>
							</div>
						</div>
					</div>
				</div>
				<div className="row g-5">
					<div className="col-lg-6 wow fadeIn" data-wow-delay=".3s">
						<div className="p-5 h-100 rounded contact-map">
							<iframe className="rounded w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.4710403339755!2d-73.82241512404069!3d40.685622471397615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c26749046ee14f%3A0xea672968476d962c!2s123rd%20St%2C%20Queens%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1686493221834!5m2!1sen!2sbd" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</div>
					<div className="col-lg-6 wow fadeIn" data-wow-delay=".5s">
						<div className="p-5 rounded contact-form">
							{form_start(form)}
							{form_widget(form)}
							<br />
							<button className="btn bg-primary text-white py-3 px-5">{button_label|default('Send ')}</button>

							{form_end(form)}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Contact End -->
{% endblock %}

    </>
  );
}
