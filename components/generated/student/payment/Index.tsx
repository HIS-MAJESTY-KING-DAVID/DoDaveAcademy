import React from 'react';
import Link from 'next/link';

interface Payment {
  id: number;
  reference: string;
  paidAt: string;
  abonnement?: {
    label: string;
    montant: number;
  };
  cours?: {
    slug: string;
    intitule: string;
    montantAbonnement: number;
  };
}

interface IndexProps {
  payments: Payment[];
}

export default function Index({ payments }: IndexProps) {
  return (
    <div className="card bg-transparent border rounded-3">
      {/* Card header START */}
      <div className="card-header bg-transparent border-bottom">
        <h3 className="mb-0">My Payments</h3>
      </div>
      {/* Card header END */}

      {/* Card body START */}
      <div className="card-body">

        {/* Search and select START */}
        <div className="row g-3 align-items-center justify-content-between mb-4">
          {/* Content */}
          <div className="col-md-8">
            <form name="search" action="/student/courses" className="rounded position-relative">
              <input name="search" required className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" />
              <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                <i className="fas fa-search fs-6 "></i>
              </button>
            </form>
          </div>

          {/* Select option */}
          <div className="col-md-3">
            
          </div>
        </div>
        {/* Search and select END */}

        {/* Course list table START */}
        <div className="table-responsive border-0">
          <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
            {/* Table head */}
            <thead>
              <tr>
                <th scope="col" className="border-0 rounded-start">Payment Label</th>
                <th scope="col" className="border-0">Order ID</th>
                <th scope="col" className="border-0">Date</th>
                <th scope="col" className="border-0">Amount</th>
                <th scope="col" className="border-0 rounded-end">Payment</th>
                <th scope="col" className="border-0 rounded-end">Statut</th>
              </tr>
            </thead>

            {/* Table body START */}
            <tbody>
              {payments && payments.map(payment => (
                <tr key={payment.id}>
                  {/* Table data */}
                  <td>
                    <h6 className="table-responsive-title mt-2 mt-lg-0 mb-0">
                      {payment.abonnement ? (
                        <a href="#">{payment.abonnement.label}</a>
                      ) : payment.cours ? (
                        <Link href={`/course/${payment.cours.slug}`}>{payment.cours.intitule}</Link>
                      ) : null}
                    </h6>
                  </td>

                  {/* Table data */}
                  <td className="text-center text-sm-start text-primary-hover">
                    <a href="#" className="text-body"><u>#{payment.reference}</u></a>
                  </td>

                  {/* Table data */}
                  <td>{new Date(payment.paidAt).toLocaleString('en-GB')}</td>

                  {/* Table data */}
                  <td>
                    {payment.abonnement ? (
                      `${payment.abonnement.montant} XAF`
                    ) : payment.cours ? (
                      `${payment.cours.montantAbonnement} XAF`
                    ) : null}
                  </td>

                  {/* Table data */}
                  <td>{/* Payment method or status placeholder */}</td>
                  <td>{/* Status placeholder */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
