import React from 'react';
import Link from 'next/link';

export default function Index(props: any) {
  return (
    <>
{% extends 'admin/base.html.twig' %}

{% block pageTitle %}Network Config{% endblock %}

{% block actionBtn %}
    {network_configs is empty && (

        <a href="{path('app_admin_network_config_new')}" className="btn btn-primary">Add config <i className="fas fa-plus"></i></a>
    
)}
{% endblock %}

{% block script %}
    
{% endblock %}

{% block mainContent %}
    <div className="card bg-transparent border">
        <!-- Card body START -->
        <div className="card-body">
            <!-- Course table START -->
            <div className="table-responsive border-0 rounded-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre de points par invitation</th>
                            <th>Pourcentage Distribution Enseignant</th>
                            <th>Pourcentage Distribution Eleve</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {network_configs.map(network_config => (

                        <tr>
                            <td>{network_config.nombreDePointsParInvitaton}</td>
                            <td>{network_config.pourcentageDistributionEnseignant}</td>
                            <td>{network_config.pourcentageDistributionEleve}</td>
                            <td>
                                {/* <a href="{path('app_admin_network_config_show', {'id': network_config.id})}">show</a> */}
                                <a className="btn btn-xs btn-warning-soft" href="{path('app_admin_network_config_edit', {'id': network_config.id})}">edit</a>
                            </td>
                        </tr>
                    
) || (

                        <tr>
                            <td colspan="5">no records found</td>
                        </tr>
                    
))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
{% endblock %}

    </>
  );
}
