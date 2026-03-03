import React from 'react';
import Link from 'next/link';

interface RetraitProps {
  showHistorique?: boolean;
  enseignant?: any;
  networkConfig?: any;
  retraits?: any[];
  montantTotal?: number;
}

export default function Retrait({ 
  showHistorique = false, 
  enseignant, 
  networkConfig, 
  retraits = [], 
  montantTotal = 0 
}: RetraitProps) {
  
  const handleRetrait = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdrawal logic
    alert('Retrait submitted');
  };

  return (
    <div className="card bg-transparent border rounded-3">
      <div className="card-body">
        {!showHistorique ? (
          <>
            <div className="alert alert-info">
              <p>
                <label>Montant Disponible : </label>
                <i>{enseignant?.utilisateur?.especes || 0} XAF</i>
              </p>
              <p>
                <label>Minimun retirable : </label>
                <i> {networkConfig?.minimumRetirable || 0} XAF</i>
              </p>
              <p>
                <Link href="/student/network/retraits">Historique des retraits</Link>
              </p>
            </div>
            <div>
              {(networkConfig?.minimumRetirable || 0) < (enseignant?.utilisateur?.especes || 0) ? (
                <form onSubmit={handleRetrait}>
                  {/* Form fields placeholder - actual implementation needs fields */}
                  <div className="mb-3">
                    <label className="form-label">Montant</label>
                    <input type="number" className="form-control" name="montant" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Methode de paiement</label>
                    <select className="form-select" name="method" required>
                      <option value="momo">Mobile Money</option>
                      <option value="om">Orange Money</option>
                    </select>
                  </div>
                   <div className="mb-3">
                    <label className="form-label">Numero de telephone</label>
                    <input type="tel" className="form-control" name="phone" required />
                  </div>
                  <hr />
                  <button type="submit" className="btn btn-primary-soft">Retirer</button>
                </form>
              ) : (
                <div className="alert alert-danger">
                  <p>Action impossible. Vous n'avez pas le minimun retirable</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="alert alert-info">
              <p>
                <strong>Nombre total de retraits</strong> : 
                <span> {retraits.length} </span>
              </p>
              <p>
                <strong>Montant total retiré : </strong>
                <span> {montantTotal} XAF</span>
              </p>
              <p>
                <Link href="/student/network/retrait">Effectuer un retrait</Link>
              </p>
            </div>
            <div className="table-responsive border-0">
              <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                {/* Table head */}
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
                {/* Table body START */}
                <tbody>
                  {retraits.length > 0 ? (
                    retraits.map((retrait, index) => (
                      <tr key={index}>
                        <td> {index + 1} </td>
                        <td> {new Date(retrait.createdAt).toLocaleDateString('fr-FR')} </td>
                        <td>{retrait.montant} XAF</td>
                        <td> {retrait.paymentMethod?.code} </td>
                        <td>{retrait.numeroTelephone}</td>
                        <td></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>Vous n'avez effectuer aucun retrait !</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
