import React from 'react';
import Link from 'next/link';

interface IndexProps {
  student?: any;
  network?: any[];
}

export default function Index({ student, network = [] }: IndexProps) {
  return (
    <>
      <div className="row g-4 mb-5">
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-15 rounded-3">
            <span className="display-6 text-warning mb-0">
              <i className="fas fa-tv fa-fw"></i>
            </span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="purecounter mb-0 fw-bold">
                  {student?.utilisateur?.points || 0}
                </h5>
              </div>
              <span className="mb-0 h6 fw-light">
                Total Des points
              </span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-10 rounded-3">
            <span className="display-6 text-purple mb-0">
              <i className="fas fa-dollar-sign fa-fw"></i>
            </span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="purecounter mb-0 fw-bold">
                  {student?.utilisateur?.especes || 0}
                </h5>
                {/* <span className="mb-0 h5">K+</span> */}
              </div>
              <span className="mb-0 h6 fw-light">
                Montant en espèce
              </span>
              <br />
              <Link href="/student/network/retrait">
                Faire le retrait
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-transparent border rounded-3">
        {/* Card header START */}
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">
            My Network
          </h3>
          <div className="mt-3">
            <b>
              Invitez les enseignants via le lien : 
              <i className="text-primary ms-2">
                {student?.utilisateur?.personne?.invitationLink?.trainer}
              </i>
            </b>
            <br />
            <b>
              Invitez les élèves via le lien : 
              <i className="text-primary ms-2">
                {student?.utilisateur?.personne?.invitationLink?.student}
              </i>
            </b>
            <br />
            <b>
              Ou partagez le code suivant : 
              <i className="text-primary ms-2">
                {student?.utilisateur?.personne?.invitationCode}
              </i>
            </b>
          </div>
        </div>
        {/* Card header END */}

        {/* Card body START */}
        <div className="card-body">
          {/* Course list table START */}
          <div className="table-responsive border-0">
            <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
              {/* Table head */}
              <thead>
                <tr>
                  <th scope="col" className="border-0 rounded-start">
                    Name
                  </th>
                  <th scope="col" className="border-0">
                    email
                  </th>
                  <th scope="col" className="border-0">
                    Mobile
                  </th>
                  <th scope="col" className="border-0 rounded-end">
                    Network
                  </th>
                </tr>
              </thead>
              {/* Table body START */}
              <tbody>
                {network && network.length > 0 ? (
                  network.map((personne, index) => (
                    <tr key={index}>
                      {/* Table data */}
                      <td>
                        <div className="d-flex align-items-center">
                          {/* Image */}
                          <div className="w-50px">
                            <img src={personne.avatarPath || '/assets/img/avatar/default.jpg'} className="rounded" alt="" />
                          </div>
                          <div className="mb-0 ms-2">
                            {/* Title */}
                            <h6>
                              <a href="">
                                {personne.nomComplet}
                              </a>
                            </h6>
                          </div>
                        </div>
                      </td>
                      {/* Table data */}
                      <td>
                        {personne.utilisateur?.email}
                      </td>
                      {/* Table data */}
                      <td>
                        {personne.telephone}
                      </td>
                      {/* Table data */}
                      <td>
                        {personne.invites?.length || 0}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <h5>
                        You haven't invited anyone. use the code or links above to invite teachers and students
                      </h5>
                    </td>
                  </tr>
                )}
              </tbody>
              {/* Table body END */}
            </table>
          </div>
          {/* Course list table END */}
          
          {/* Pagination START */}
          <div className="d-sm-flex justify-content-sm-between pagination-container align-items-sm-center mt-4 mt-sm-3">
             {/* Pagination component placeholder */}
             <div>Pagination goes here</div>
          </div>
          {/* Pagination END */}
        </div>
        {/* Card body START */}
      </div>
    </>
  );
}
