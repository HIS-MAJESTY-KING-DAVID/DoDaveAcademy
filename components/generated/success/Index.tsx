import React from 'react';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="container-fluid page-header py-5">
      <div className="container text-center py-5">
        <h1 className="display-2 text-white mb-4 animated slideInDown">
          "Envoyé avec succès"
        </h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item" aria-current="page">Envoyé avec succès</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
