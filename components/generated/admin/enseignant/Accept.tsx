import React from 'react';
import Link from 'next/link';

export default function Accept(props: any) {
  return (
    <>
<div className="dropup d-inline">
    <a href="#" className="btn btn-success-soft btn-sm me-1 mb-1 mb-lg-0" role="button" id="dropdownShare{e.id}" data-bs-toggle="dropdown" aria-expanded="false">
        Accept <i className="bi bi-three-dots fa-fw"></i>
    </a>
    <!-- dropdown button -->
    <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare{e.id}">
        <li><a onclick="return confirm('Etes-vous sure de vouloir poursuivre cette action ?')" className="dropdown-item" href="{path('app_admin_enseignant_accept_request', {reference: e.reference, type: 'confirmed'})}"><i className="bi bi-pencil-square fa-fw me-2"></i>Enseignant confirmé</a></li>
        
        <li><a onclick="return confirm('Etes-vous sure de vouloir poursuivre cette action ?')" className="dropdown-item" href="{path('app_admin_enseignant_accept_request', {reference: e.reference, type: 'junior'})}"><i className="bi bi-pencil-square fa-fw me-2"></i>Enseignant Junior</a></li>
        
    </ul>
</div>
    </>
  );
}
