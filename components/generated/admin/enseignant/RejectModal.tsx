import React from 'react';
import Link from 'next/link';

export default function RejectModal(props: any) {
  return (
    <>
<div className="modal fade" id="modal-reject-request-{e.id}">
    <form className="modal-dialog" method="POST" action="{path('app_admin_enseignant_reject_request', {reference: e.reference})}">
        <div className="modal-content">
            <div className="modal-header bg-dark">
                <h5 className="modal-title text-white" id="viewReviewLabel">Rejeter la demande</h5>
                <button type="button" className="btn btn-sm btn-light mb-0" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg"></i></button>
            </div>
            
            <div className="modal-body">
                <div>
                    <label for="mofif-rejet-{e.id}" className="form-label">Entrer le motif du rejet</label>
                    <textarea name="motif" id="" cols="30" rows="7" className="form-control"></textarea>
                    <input type="hidden" name="_token" value="{csrf_token('reject' ~ e.id)}" />
                </div>
            </div>

            <!-- Modal footer -->
            <div className="modal-footer">
                <button type="button" className="btn btn-danger-soft my-0" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" className="btn btn-warning-soft my-0">Rejeter</button>
            </div>
        </div>
    </form>
</div>
    </>
  );
}
