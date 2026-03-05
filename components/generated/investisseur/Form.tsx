import React from 'react';
import Link from 'next/link';

export default function Form(props: any) {
  return (
    <>
<div className="container ">
	<div className="card m-3">
		<div className="card-body">
			<p>L’entreprise DoDave Academy trouve ses origines dans l’idée de créer la plateforme pédagogique digitale DoDave Academy, qui a vu le jour il y a deux ans.</p>
			<p>À ce jour :</p>
			<ul>
				<li>Avant la création de l'entreprise DoDave Academy, nous avons mené une étude de marché en 2021 qui a abouti à la rédaction du business plan du projet DoDave Academy en 2022.</li>
				<li>Nous avons lancé un premier appel à investissement d'un montant de 30 millions de FCFA, nous permettant de développer la version expérimentale de la plateforme DoDave Academy.</li>
				<li>Nous avons réalisé 98% des travaux de développement de la plateforme DoDave Academy, comprenant l'application Web, la version mobile pour Android et iOS (hors ligne).</li>
				<li>Les enseignants ont déjà chargé des ressources pédagogiques dans certaines classes expérimentales.</li>
				<li>Seulement six mois après l'assemblée générale de lancement officiel de la phase commerciale de la plateforme DoDave Academy, nous avons enregistré plus de 4 000 élèves inscrits, avec un chiffre d'affaires de 5 millions de FCFA.</li>
				<li>Nous disposons d'une équipe de direction dévouée et passionnée pour la réussite de ce projet ambitieux.</li>
			</ul>
			<p>Voici notre plan de développement sur 4 ans :</p>
			<p>
				<strong>BESOINS FINANCIERS ET PROJECTION DE RENTABILITÉ</strong>
			</p>
			<p>Nous lançons une levée de fonds du 20 avril au 30 mai 2024 pour cette deuxième phase, d'un montant de 1 000 000 000 FCFA, répartis comme suit : 30% pour les besoins de démarrage, 30% pour le fonctionnement et 40% pour la charge salariale sur deux ans.</p>
			<p>Nous prévoyons un résultat net comptable cumulé de 3 229 627 018,86 FCFA (4 925 181,20 €) en 2027 et de 6 388 999 585,12 FCFA (9 743 224,36 €) pour l'année 2028, ce qui représente une marge bénéficiaire potentielle de près de 160% chaque année à partir de fin 2027 sur votre investissement initial de 2024, vous faisant ainsi devenir un actionnaire à vie de DoDave Academy.</p>
		</div>
	</div>


	<div className="row">
		<h2>Veuillez vous enregistrer pour devenir membre investisseur</h2>
		<div className="col-md-12">
			<div className="stepwizard">
				<div className="stepwizard-row setup-panel">
					<div className="stepwizard-step">
						<a href="#step-1" type="button" className="btn btn-primary btn-circle">1</a>
						<p>Informations</p>
					</div>
					<div className="stepwizard-step">
						<a href="#step-2" type="button" className="btn btn-default btn-circle" disabled="disabled">2</a>
						<p>Part/Ation</p>
					</div>
					<div className="stepwizard-step">
						<a href="#step-3" type="button" className="btn btn-default btn-circle" disabled="disabled">3</a>

						<p>Récapitulatif</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="row">
		<div className="col-md-6 offset-md-3">
			<form role="form" action="{path('app_investisseur_new')}" method="post">
				{form_row(form._token)}
				{form_errors(form) is not empty && (

					<div className="alert alert-danger">
						<ul>
							{% for error in form_errors(form) %}
								<li>{error.message}</li>
							
))}
						</ul>
					</div>
				
)}

				<div className="row setup-content" id="step-1">
					<div className="col-md-12">
						<h3>Informations Personnelles</h3>
						{form_row(form.firstName)}
						{form_errors(form.firstName)}
						{form_row(form.lastName)}
						{form_errors(form.lastName)}
						{form_row(form.address)}
						{form_errors(form.address)}
						{form_row(form.ville)}
						{form_errors(form.ville)}
						{form_row(form.phone)}
						{form_errors(form.phone)}
						{form_row(form.email)}
						{form_errors(form.email)}
						<br />
						<button className="btn btn-primary nextBtn btn-lg pull-right" type="button">Next >></button>
					</div>
				</div>

				<!-- Step 2 -->
				<div className="row setup-content" id="step-2">
					<div className="col-md-12">
						<h3>Step 2</h3>
						{form_row(form.companyName)}
						<br />
						{form_errors(form.companyName)}
						<br />
						{form_row(form.cniNumber)}
						{form_errors(form.cniNumber)}
						<br />
						{form_row(form.dateExpiration)}
						{form_errors(form.dateExpiration)}
						<br />
						{form_row(form.desiredInvestmentType)}
						{form_errors(form.desiredInvestmentType)}
						{form_row(form.investmentAmount)}
						{form_errors(form.investmentAmount)}
						<br />
						<button className="btn btn-primary prevBtn btn-lg pull-left" type="button">Previous</button>
						<button className="btn btn-primary nextBtn btn-lg pull-right" type="button">Next >></button>
					</div>
				</div>

				<!-- Step 3 -->
				<div className="row setup-content" id="step-3">
					<div className="col-md-12">
						<div className="card-body">
							<div id="recap-content" style="font-size: 15px;"></div>

						</div>
						<br />
						<button className="btn btn-primary prevBtn btn-lg pull-left" type="button">Previous</button>
						<button className="btn btn-success btn-lg pull-right" type="submit">Submit</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

    </>
  );
}
