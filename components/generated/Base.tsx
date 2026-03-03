import React from 'react';
import Link from 'next/link';

export default function Base(props: any) {
  return (
    <>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta content="width=device-width, initial-scale=1.0" name="viewport">
		<meta content="" name="keywords">
		<meta content="" name="description">

		<title>
			{% block title %}Welcome
			{% endblock %}
		</title>

		<!-- Google Web Fonts -->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Saira:wght@500;600;700&display=swap" rel="stylesheet">

		<!-- Icon Font Stylesheet -->
		<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
		<link
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

		<!-- Libraries Stylesheet -->
		<link href="{asset('assets/lib/animate/animate.min.css')}" rel="stylesheet">
		<link
		href="{asset('assets/lib/owlcarousel/assets/owl.carousel.min.css')}" rel="stylesheet">

		<!-- Customized Bootstrap Stylesheet -->
		<link
		href="{asset('assets/css/bootstrap.min.css')}" rel="stylesheet">

		<!-- Template Stylesheet -->
		<link href="{asset('assets/css/style.css')}" rel="stylesheet">
		
		<!-- Webpack Encore -->
        {% block encore_stylesheets %}
            {encore_entry_link_tags('app')}
        {% endblock %}

        {% block stylesheets %}{% endblock %}

		<style>

			.stepwizard-step p {
				margin-top: 10px;
			}
			.stepwizard-row {
				display: table-row;
			}
			.stepwizard {
				display: table;
				width: 50%;
				margin: 0 auto;

				position: relative;
			}
			.stepwizard-step button[disabled] {
				opacity: 1 !important;
				filter: alpha(opacity=100) !important;
			}
			.stepwizard-row:before {
				top: 14px;
				bottom: 0;
				position: absolute;
				content: " ";
				width: 100%;
				height: 1px;
				background-color: #ccc;
				z-order: 0;
			}
			.stepwizard-step {
				display: table-cell;
				text-align: center;
				position: relative;
			}
			.btn-circle {
				width: 30px;
				height: 30px;
				text-align: center;
				padding: 6px 0;
				font-size: 12px;
				line-height: 1.428571429;
				border-radius: 15px;
			}
			.masthead {
				height: 100vh;
				min-height: 500px;
				background-image: url('https://source.unsplash.com/BtbjCFUvBXs/1920x1080');
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}
		</style>

	</head>
	<body>
		<!-- Spinner Start -->
		<div id="spinner" className="show position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
			<div className="spinner-grow text-primary" role="status"></div>
		</div>
		<!-- Spinner End -->

		<!-- Topbar Start -->
		<div className="container-fluid bg-dark py-2 d-none d-md-flex">
			<div className="container">
				<div className="d-flex justify-content-between topbar">
					<div className="top-info">
						<small className="me-3 text-white-50">
							<a href="#">
								<i className="fas fa-map-marker-alt me-2 text-secondary"></i>
							</a>23 Akwa, Douala</small>
						<small className="me-3 text-white-50">
							<a href="#">
								<i className="fas fa-envelope me-2 text-secondary"></i>
							</a>contact@kulmapeck.com</small>
					</div>
					<div id="note" className="text-secondary d-none d-xl-flex">
						<small>Note : Nous vous aidons à développer l'éducation de vos enfants.</small>

					</div>
					<div className="top-link">
						<a href="https://www.facebook.com/kulmapeck?mibextid=ZbWKwL" className="bg-light nav-fill btn btn-sm-square rounded-circle">

							<i className="fab fa-facebook-f text-primary"></i>
						</a>
						<a href="https://wa.me/+237698809093" className="bg-light nav-fill btn btn-sm-square rounded-circle">

							<i className="fab fa-twitter text-primary"></i>
						</a>
						<a href="https://wa.me/+237698809093" className="bg-light nav-fill btn btn-sm-square rounded-circle">

							<i className="fab fa-instagram text-primary"></i>
						</a>
						<a href="https://www.linkedin.com/company/kulmapeckeducationnumeriquepourtous/" className="bg-light nav-fill btn btn-sm-square rounded-circle me-0">

							<i className="fab fa-linkedin-in text-primary"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
		<!-- Topbar End -->

		<!-- Navbar Start -->
		<div className="container-fluid bg-primary">
			<div className="container">
				<nav className="navbar navbar-dark navbar-expand-lg py-0">
					<a href="{path('app_home')}" className="navbar-brand">
						<h1 className="text-white fw-bold d-block">
							<span className="text-secondary">KULMAPECK</span>

						</h1>
					</a>
					<button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse bg-transparent" id="navbarCollapse">
						<div className="navbar-nav ms-auto mx-xl-auto p-0">
							<a href="{path('app_home')}" className="nav-item nav-link">Home</a>

							<a href="{path('app_about')}" className="nav-item nav-link">About</a>
							<a href="{path('app_service')}" className="nav-item nav-link">Services</a>

							<a href="{path('app_investisseur_new')}" active className="nav-item nav-link active">Investir</a>

							<div className="nav-item dropdown">
								<a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">Pages</a>
								<div className="dropdown-menu rounded">

									<a href="https://kulmapeck.com" className="dropdown-item active">Se former a kulmapeck</a>
									<a href="{path('app_blog')}" className="dropdown-item ">Our Blog</a>

									<a href="{path('app_team')}" className="dropdown-item">Notre Equipe</a>

									<a href="{path('app_testimony')}" className="dropdown-item">Testimonial</a>

									<a href="{path('app_e404')}" className="dropdown-item">404 Page</a>

								</div>
							</div>
							<a href="{path('app_contact_index')}" className="nav-item nav-link">Contact</a>

						</div>

					</div>
					<div className="d-none d-xl-flex flex-shirink-0">
						<div id="phone-tada" className="d-flex align-items-center justify-content-center me-4">
							<a href="" className="position-relative animated tada infinite">
								<i className="fa fa-phone-alt text-white fa-2x"></i>
								<div className="position-absolute" style="top: -7px; left: 20px;">
									<span>
										<i className="fa fa-comment-dots text-secondary"></i>
									</span>
								</div>
							</a>
						</div>
						<div className="d-flex flex-column pe-4 border-end">
							<span className="text-white-50">Avez vous des preoccupations ?</span>
							<span className="text-secondary">Call: +237 675391197 / +237 698809093</span>

						</div>
						<div className="d-flex align-items-center justify-content-center ms-4 ">
							<a href="#">
								<i className="bi bi-search text-white fa-2x"></i>
							</a>
						</div>
					</div>
				</nav>
			</div>
		</div>

		{% block body %}{% endblock %}

		<div className="container-fluid footer bg-dark wow fadeIn" data-wow-delay=".3s">
			<div className="container pt-5 pb-4">
				<div className="row g-5">
					<div className="col-lg-3 col-md-6">
						<a href="index.html">
							<h1 className="text-white fw-bold d-block">
								<span className="text-secondary">KULMAPECK</span>

							</h1>
						</a>
						<p className="mt-4 text-light">
							Le Nouvel et Gigantesque Lycée Polyvalent Digital 
																																																								au Service des Différents Acteurs de l`Education.</p>

						<div className="d-flex hightech-link">
							<a href="https://www.facebook.com/kulmapeck?mibextid=ZbWKwL" className="btn-light nav-fill btn btn-square rounded-circle me-2">

								<i className="fab fa-facebook-f text-primary"></i>
							</a>
							<a href="https://wa.me/+237698809093" className="btn-light nav-fill btn btn-square rounded-circle me-2">

								<i className="fab fa-twitter text-primary"></i>
							</a>
							<a href="https://wa.me/+237698809093" className="btn-light nav-fill btn btn-square rounded-circle me-2">

								<i className="fab fa-instagram text-primary"></i>
							</a>
							<a href="https://www.linkedin.com/company/kulmapeckeducationnumeriquepourtous/" className="btn-light nav-fill btn btn-square rounded-circle me-0">

								<i className="fab fa-linkedin-in text-primary"></i>
							</a>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<a href="#" className="h3 text-secondary">Short Link</a>
						<div className="mt-4 d-flex flex-column short-link">
							<a href="{path('app_about')}" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>About</a>
							<a href="{path('app_contact_index')}" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>Contact</a>
							<a href="{path('app_service')}" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>Our Services</a>
							<a href="{path('app_project')}" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>Our Projects</a>
							<a href="{path('app_blog')}" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>Latest Blog</a>
						</div>

					</div>
					<div className="col-lg-3 col-md-6">
						<a href="#" className="h3 text-secondary">Help Link</a>
						<div className="mt-4 d-flex flex-column help-link">
							<a href="" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>Terms Of use</a>
							<a href="" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>Privacy Policy</a>
							<a href="" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>Helps</a>
							<a href="" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>FQAs</a>
							<a href="{path('app_contact_index')}" className="mb-2 text-white">
								<i className="fas fa-angle-right text-secondary me-2"></i>Contact</a>
						</div>
					</div>
					<div className="col-lg-3 col-md-6">
						<a href="#" className="h3 text-secondary">Contact Us</a>
						<div className="text-white mt-4 d-flex flex-column contact-link">
							<a href="#" className="pb-3 text-light border-bottom border-primary">
								<i className="fas fa-map-marker-alt text-secondary me-2"></i>
								DOUALA-Akwa/ Carrefour Équinox Tv</a>

							<a href="#" className="py-3 text-light border-bottom border-primary">
								<i className="fas fa-phone-alt text-secondary me-2"></i>
								+237 675391197 / +237 698809093</a>

							<a href="#" className="py-3 text-light border-bottom border-primary">
								<i className="fas fa-envelope text-secondary me-2"></i>
								contact@kulmapeck.com</a>
						</div>
					</div>
				</div>
				<hr className="text-light mt-5 mb-4" />
				<div className="row">
					<div className="col-md-6 text-center text-md-start">
						<span className="text-light">
							<a href="https://kulmapeck.com" className="text-secondary">
								<i className="fas fa-copyright text-secondary me-2"></i>
								Kulmapeck
							</a>, All right reserved.</span>
					</div>
					<div
						className="col-md-6 text-center text-md-end">
						<!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
						<span className="text-light">Developped By<a href="https://akouma.net" className="text-secondary">
								Akouma Developer</a>
							Distributed By
							<a href="https://kulmapeck.com">Kulmapeck</a>
						</span>
					</div>
				</div>
			</div>
		</div>
		<!-- Footer End -->


		<!-- Back to Top -->
		<a href="#" className="btn btn-secondary btn-square rounded-circle back-to-top">
			<i className="fa fa-arrow-up text-white"></i>
		</a>

		<!-- JavaScript Libraries -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
		<script src="{asset('assets/lib/wow/wow.min.js')}"></script>
		<script src="{asset('assets/lib/easing/easing.min.js')}"></script>
		<script src="{asset('assets/lib/waypoints/waypoints.min.js')}"></script>
		<script src="{asset('assets/lib/owlcarousel/owl.carousel.min.js')}"></script>
		<!-- Template Javascript -->
            <script src="{asset('assets/js/main.js')}"></script>
            
            <!-- Webpack Encore -->
            {% block encore_javascripts %}
                {encore_entry_script_tags('app')}
            {% endblock %}

            {% block javascripts %}{% endblock %}

		<script>
			$(document).ready(function () {
var navListItems = $('div.setup-panel div a'),
allWells = $('.setup-content'),
allNextBtn = $('.nextBtn'),
allPrevBtn = $('.prevBtn');

allWells.hide();

navListItems.click(function (e) {
e.preventDefault();
var $target = $($(this).attr('href')),
$item = $(this);

if (! $item.hasClass('disabled')) {
navListItems.removeClass('btn-primary').addClass('btn-default');
$item.addClass('btn-primary');
allWells.hide();
$target.show();
$target.find('input:eq(0)').focus();
}
});

allPrevBtn.click(function () {

var curStep = $(this).closest(".setup-content"),
curStepBtn = curStep.attr("id"),
prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
prevStepWizard.removeAttr('disabled').trigger('click');
 

});

allNextBtn.click(function () {
var curStep = $(this).closest(".setup-content"),
curStepBtn = curStep.attr("id"),
nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
curInputs = curStep.find("input[type='text'],input[type='url']"),
isValid = true;

$(".form-group").removeClass("has-error");
for (var i = 0; i < curInputs.length; i++) {
if (! curInputs[i].validity.valid) {
isValid = false;
$(curInputs[i]).closest(".form-group").addClass("has-error");
}
}

if (isValid) {
console.error('####### |||');
if (curStepBtn === 'step-2') {
console.error('generateRecap ####### ');


generateRecap();
}

nextStepWizard.removeAttr('disabled').trigger('click');
}

// Call generateRecap method for step-3

});

function generateRecap() {
console.error('####### ');

var recapContent = '';
recapContent += '<h4>Step 1 - Informations Personnelles:</h4>';
recapContent += '<ul>';
recapContent += '<li><strong>First Name:</strong> ' + $('#investisseur_firstName').val() + '</li>';
recapContent += '<li><strong>Last Name: </strong>' + $('#investisseur_lastName').val() + '</li>';
recapContent += '<li><strong>Address:</strong> ' + $('#investisseur_address').val() + '</li>';
recapContent += '<li><strong>Ville: </strong>' + $('#investisseur_ville').val() + '</li>';
recapContent += '<li><strong>Phone: </strong>' + $('#investisseur_phone').val() + '</li>';
recapContent += '<li><strong>Email:</strong> ' + $('#investisseur_email').val() + '</li>';
recapContent += '</ul>';

recapContent += '<h4>Step 2:</h4>';
recapContent += '<ul>';
recapContent += '<li><strong>Company Name:</strong> ' + $('#investisseur_companyName').val() + '</li>';
recapContent += '<li><strong>CNI/Passeport:</strong> ' + $('#investisseur_cniNumber').val() + '</li>';
recapContent += '<li><strong>Date emission:</strong> ' + $('#investisseur_dateExpiration').val() + '</li>';
recapContent += '<li><strong>Quantite:</strong> ' + $('#investisseur_investmentAmount').val() + '</li>';

// Retrieve desiredInvestmentType value
var desiredInvestmentType = $("input[name='investisseur[desiredInvestmentType]']:checked").val();
if (desiredInvestmentType) {
recapContent += '<li><strong>Desired Investment Type: </strong>' + desiredInvestmentType + '</li>';
} else {} recapContent += '</ul>';

$('#recap-content').html(recapContent);
}

$('div.setup-panel div a.btn-primary').trigger('click');
});
		</script>

	</body>

</html>

    </>
  );
}
