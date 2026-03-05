import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'base.html.twig' %}

{% block title %}
	About
{% endblock %}

{% block body %}
	<!-- Page Header Start -->
	<div className="container-fluid page-header py-5">
		<div className="container text-center py-5">
			<h1 className="display-2 text-white mb-4 animated slideInDown">About Us</h1>
			<nav aria-label="breadcrumb animated slideInDown">
				<ol className="breadcrumb justify-content-center mb-0">
					<li className="breadcrumb-item">
						<a href="#">Home</a>
					</li>
					<li className="breadcrumb-item">
						<a href="#">Pages</a>
					</li>
					<li className="breadcrumb-item" aria-current="page">About</li>
				</ol>
			</nav>
		</div>
	</div>
	<!-- Page Header End -->


	<!-- Fact Start -->
	<div className="container-fluid bg-secondary py-5">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 wow fadeIn" data-wow-delay=".1s">
					<div className="d-flex counter">
						<h1 className="me-3 text-primary counter-value">99</h1>
						<h5 className="text-white mt-1">Success in getting happy customer</h5>
					</div>
				</div>
				<div className="col-lg-3 wow fadeIn" data-wow-delay=".3s">
					<div className="d-flex counter">
						<h1 className="me-3 text-primary counter-value">25</h1>
						<h5 className="text-white mt-1">Thousands of successful business</h5>
					</div>
				</div>
				<div className="col-lg-3 wow fadeIn" data-wow-delay=".5s">
					<div className="d-flex counter">
						<h1 className="me-3 text-primary counter-value">120</h1>
						<h5 className="text-white mt-1">Total clients who love HighTech</h5>
					</div>
				</div>
				<div className="col-lg-3 wow fadeIn" data-wow-delay=".7s">
					<div className="d-flex counter">
						<h1 className="me-3 text-primary counter-value">5</h1>
						<h5 className="text-white mt-1">Stars reviews given by satisfied clients</h5>
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

					<p>
						Suites aux récents bouleversements causés par la pandémie à Covid 19, les crises sécuritaires, les
																																																																																																																																			revendications des Enseignants, le Ministère de L`Enseignement Secondaire a infructueusement
																																																																																																																																			instauré depuis 2020 , le Distance Education comme approche pédagogique complémentaire qui
																																																																																																																																			résorbera l`effet négatif des multiformes crises actuelles et avenirs sur l`éducation ; dans l`espérance de
																																																																																																																																			garantir une éducation de qualité aux plus de 2 millions de lycéens et collégiens que compte le
																																																																																																																																			Cameroun ; ce, en conformité avec la politique mondiale de l’UNESCO pour l’éducation.
					</p>
					<p className="mb-4"></p>
					<p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333333;">
						<strong>PROJET : FONCTIONNEMENT ET VALEUR</strong><br />
						Au terme d'un diagnostic minutieux et rigoureux des carences et insuffisances aussi bien de l'approche gouvernementale de l'éducation à distance que celle de l'environnement concurrentiel, l'Entreprise DoDave Academy met à la disposition des différents acteurs de l'éducation une Application Web et Mobile produisant un contenu pédagogique sur mesure épousant la philosophie ministérielle pour l’éducation et reparti par classe, filière, matière de l’enseignement général à l’ enseignement technique, dans les sous-systèmes d'enseignement Francophone et Anglophone afin d'accroître véritablement le niveau et la qualité de l’éducation au Cameroun.<br /><br />
						La plateforme pédagogique digitale reconnaît 02 catégories de profils : Les Enseignants et les Élèves.
						<ul>
							<li>Pour les élèves : l'accès à notre plateforme se fait par Abonnement mensuel, Trimestriel ou annuel aux montants respectifs de 2 500 FCFA, 6 000 FCFA, 18 000 FCFA.</li>
							<li>Pour les Enseignants : Les meilleurs dans chaque discipline sont contractuellement engagés avec DoDave Academy en qualité d'Enseignants Certifiés, c’est-à-dire Enseignants Concepteurs de contenus pédagogiques de la plateforme d'Enseignement à distance DoDave Academy.</li>
						</ul>
						Le Business model étant basé sur la recommandation de la plateforme DoDave Academy de chaque Enseignant auprès de ses élèves, celui-ci gagne passivement des commissions allant jusqu’à 30 % sur chaque abonnement effectué par son élève : Les Enseignants sont alors des Agents Publicitaires de DoDave Academy partout où il se trouve dans le territoire national.<br /><br />
						<strong>ÉQUIPE</strong><br />
						Monsieur NYEMB BISSAYA René Ivant, M. KENBOU Alain, Mme KOLLO Françoise Diela résidant à Douala et Monsieur ONDOUA NGAZOUA Benoit résidant à Paris - France tous de nationalité Camerounaise sont les promoteurs de DoDave Academy SARL.<br /><br />
						<strong>MARCHÉ ET CONCURRENCE</strong><br />
						Nous avons 5 concurrents directs : Distance Education (MINESEC), Nomad éducation et Grand prof.org, Infoox.net, AIMS. Nos avantages concurrentiels par rapport à ces 5 entreprises sont les suivants :
						<ul>
							<li>Multidisciplinarité de l’équipe managériale ;</li>
							<li>Disponibilité de l'application Mobile DoDave Academy ;</li>
							<li>Possibilité d'accès et de navigation dans son compte hors connexion ;</li>
							<li>Disponibilité des fora par matières, filières et par classes sous l’administration des Enseignants certifiés recrutés à cet effet ;</li>
							<li>Marketing basé sur l'influence et la rémunération des enseignants ;</li>
						</ul>
					</p>

				</p>
			</div>
		</div>
	</div>
</div>

<!-- About End -->


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

<!-- Team End -->{% endblock %}

    </>
  );
}
