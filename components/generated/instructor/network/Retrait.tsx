import React from 'react';
import Link from 'next/link';

export default function Retrait(props: any) {
  return (
    <>
{% extends "instructor/base.html.twig" %}

{% block pageContent %}

    <div className="card bg-transparent border rounded-3">
        <div className="card-body">
            {not showHistorique is defined && (

                <div className="alert alert-info">
                    <p>
                        <label>Montant Disponible : </label>
                        <i>{enseignant.utilisateur.especes} XAF</i>
                    </p>
                    <p>
                        <label>Minimun retirable : </label>
                        <i> {networkConfig.minimumRetirable} XAF</i>
                    </p>
                    <p>
                        <a href="{url("app_instructor_network_retraits")}">Historique des retraits</a>
                    </p>
                </div>
                <div>
                    {networkConfig.minimumRetirable < enseignant.utilisateur.especes && (

                        {form_start(form)}
                            {form_widget(form)}
                            <hr />
                            <button type="submit" className="btn btn-primary-soft">Retirer</button>
                        {form_end(form)}
                    
) || (

                        <div className="alert alert-danger">
                            <p>Action impossible. Vous n'avez pas le minimun retirable</p>
                        </div>
                    
)}
                </div>
            
) || (

                <div className="alert alert-info">
                    <p>
                        <strong>Nombre total de retraits</strong> : 
                        <span> {retraits|length} </span>
                    </p>
                    <p>
                        <strong>Montant total retiré : </strong>
                        <span> {montantTotal} XAF</span>
                    </p>
                    <p>
                        <a href="{url("app_instructor_network_retrait")}">Effectuer un retrait</a>
                    </p>
                </div>
                <div className="table-responsive border-0">
                    <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                        <!-- Table head -->
                        <thead>
                            <tr>
                                <th scope="col" className="border-0 rounded-start">#</th>
                                <th scope="col" className="border-0">Date</th>
                                <th scope="col" className="border-0">Montant</th>
                                <th scope="col" className="border-0">Methode</th>
                                <th scope="col" className="border-0">Telephone</th>
                                <th scope="col" className="border-0 rounded-end">Statut</th>
                            </tr>
                        </thead>
                        <!-- Table body START -->
                        <tbody>
                            {retraits.map(retrait => (

                                <tr>
                                    <td> {loop.index} </td>
                                    <td> {retrait.createdAt|date("d/m/Y")} </td>
                                    <td>{retrait.montant} XAF</td>
                                    <td> {retrait.paymentMethod.code} </td>
                                    <td>{retrait.numeroTelephone}</td>
                                    <td></td>
                                </tr>
                            
) || (

                                <tr>
                                    <td colspan="6">Vous návez effectuer aucun retrait !</td>
                                </tr>
                            
))}
                        </tbody>
                    </table>
                </div>
            
)}
        </div>
    </div>

{% endblock %}
    </>
  );
}
