import React from 'react';
import Link from 'next/link';

export default function Annonces(props: any) {
  return (
    <>
{isForPrommedTest is defined && (

<div className="alert alert-dismissible sticky-element fade show bg-dark text-white rounded-3 shadow p-4 ms-3 mb-3 col-10 col-md-4 col-lg-3 col-xl-2 d-none d-lg-block sticky-element-sticked" role="alert">
	<div className="d-sm-flex align-items-center mb-3">
		<!-- Avatar -->
		<div>
			<div className="icon-lg bg-purple rounded-circle text-white">
				<img className="p-3" src="assets/images/client/aftereffect.sv" alt="T" />
			</div>
		</div>
		<!-- Info -->
		<div className="ms-sm-2 mt-2 mt-sm-0">
			<h6 className="mb-0 text-white">{annonce.evaluation.titre}</h6>
			<span className="small mb-0 me-3"><i className="far fa-clock text-danger me-2"></i>{annonce.evaluation.duree} heures</span>
			<span className="small mb-0 me-1"><i className="fas fa-circle fw-bold text-success small me-2"></i>{annonce.evaluation.startAt|date('d/m/Y à H:i:s')}</span>
		</div>
	</div>
	<p className="mb-0 small">{annonce.evaluation.description}</p>

	<!-- Avatar group -->
	<div className="d-sm-flex justify-content-between mt-4">
		<ul className="avatar-group mb-2 mb-sm-0">
			{annonce.eleves is defined && (

                {% for eleve in annonce.eleves %}
                    <li className="avatar avatar-xs">
                        <img className="avatar-img rounded-circle" src="{asset(eleve)}" alt="avatar" />
                    </li>
                
))}
            
)}
		</ul>

		<!-- Button -->
		<a href="{url('app_front_evaluation_inscription', {'slug': annonce.evaluation.slug})}" type="button" className="btn btn-success btn-sm mb-0">
			<span aria-hidden="true">S'inscrire !</span>
		</a>
	</div>
	<!-- Close button -->
	<div className="position-absolute end-0 top-0 mt-n3 me-n3">
		<a href="{url('app_front_evaluation_hide_annonce', {'slug': annonce.evaluation.slug})}" type="button" className="btn btn-danger btn-round btn-sm mb-0">
			<span aria-hidden="true"><i className="bi bi-x-lg"></i></span>
		</a>
	</div>
</div>

)}

{isForCurrentTest is defined && (

<div style="right:50px;position:fixed;bottom:50px;width:300px;z-index:1000;bottom:50px;transition: all 0.3s ease-in-out" className="alert alert-dismissible fade show bg-success text-white rounded-3 shadow p-4 ms-3 mb-3 col-10 col-md-4 col-lg-3 col-xl-2 d-none d-lg-block sticky-element-sticked" role="alert">
	<div className="d-sm-flex align-items-center mb-3">
		<!-- Avatar -->
		<div>
			<div className="icon-lg bg-purple rounded-circle text-white">
				<img className="p-3" src="assets/images/client/aftereffect.sv" alt="T" />
			</div>
		</div>
		<!-- Info -->
		<div className="ms-sm-2 mt-2 mt-sm-0">
			<h6 className="mb-0 text-white">{annonce.evaluation.titre}</h6>
			<span className="small mb-0 me-3"><i className="far fa-clock text-danger me-2"></i>{annonce.evaluation.duree} heures</span>
			<span className="small mb-0 me-1"><i className="fas fa-circle fw-bold text-success small me-2"></i>{annonce.evaluation.startAt|date('d/m/Y à H:i:s')}</span>
		</div>
	</div>
	<p className="mb-0 small">{annonce.evaluation.description}</p>

	<!-- Avatar group -->
	<div className="d-sm-flex justify-content-between mt-4">
		<ul className="avatar-group mb-2 mb-sm-0">
			{annonce.eleves is defined && (

                {% for eleve in annonce.eleves %}
                    <li className="avatar avatar-xs">
                        <img className="avatar-img rounded-circle" src="{asset(eleve)}" alt="avatar" />
                    </li>
                
))}
            
)}
		</ul>

		<!-- Button -->
		<a href="{url('app_front_evaluation_begin', {'slug': annonce.evaluation.slug})}" type="button" className="btn btn-primary-soft btn-sm mb-0">
			<span aria-hidden="true">Commencer !</span>
		</a>
	</div>
	<!-- Close button -->
	<div className="position-absolute end-0 top-0 mt-n3 me-n3">
		<button type="button" data-bs-dismiss="alert" aria-label="close" className="btn btn-danger btn-round btn-sm mb-0">
			<span aria-hidden="true"><i className="bi bi-x-lg"></i></span>
		</button>
	</div>
</div>

)}

    </>
  );
}
