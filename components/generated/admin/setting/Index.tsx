import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Users{% endblock %}

{% block actionBtn %}
	
{% endblock %}

{% block script %}
    
{% endblock %}

{% block mainPageContent %}

    <!-- Page main content START -->
	<div className="page-content-wrapper border">

		<!-- Title -->
		<div className="row">
			<div className="col-12 mb-3">
				<h1 className="h3 mb-2 mb-sm-0">Admin Settings</h1>
			</div>
		</div>

		<div className="row g-4">
			<!-- Left side START -->
			<div className="col-xl-3">
				<!-- Tab START -->
				<ul className="nav nav-pills nav-tabs-bg-dark flex-column">
					<li className="nav-item"> <a className="nav-link active" data-bs-toggle="tab" href="#tab-1"><i className="fas fa-globe fa-fw me-2"></i>Website Settings</a> </li>
					<li className="nav-item"> <a className="nav-link" data-bs-toggle="tab" href="#tab-2"><i className="fas fa-cog fa-fw me-2"></i>General Settings</a> </li>
					<li className="nav-item"> <a className="nav-link" data-bs-toggle="tab" href="#tab-3"><i className="fas fa-bell fa-fw me-2"></i>Notification Settings</a> </li>
					<li className="nav-item"> <a className="nav-link" data-bs-toggle="tab" href="#tab-5"><i className="fas fa-sliders-h fa-fw me-2"></i>Social Settings</a> </li>
					<li className="nav-item"> <a className="nav-link mb-0" data-bs-toggle="tab" href="#tab-6"><i className="fas fa-envelope-open-text fa-fw me-2"></i>Email Settings</a> </li>
					<li className="nav-item"> <a className="nav-link mb-0" href="{url("app_admin_network_config_index")}"><i className="fas fa-globe fa-fw me-2"></i>Network Settings</a> </li>
				</ul>
				<!-- Tab END -->
			</div>
			<!-- Left side END -->

			<!-- Right side START -->
			<div className="col-xl-9">

				<!-- Tab Content START -->
				<div className="tab-content">

					{include('admin/setting/_website_setting.html.twig')}

					{include('admin/setting/_general_setting.html.twig')}

					{include('admin/setting/_notification_setting.html.twig')}

                    {include('admin/setting/_social_setting.html.twig')}

                    {include('admin/setting/_email_setting.html.twig')}

				</div>
				<!-- Tab Content END -->
			</div>
			<!-- Right side END -->
		</div> <!-- Row END -->		
	</div>
	<!-- Page main content END -->

{% endblock %}
    </>
  );
}
