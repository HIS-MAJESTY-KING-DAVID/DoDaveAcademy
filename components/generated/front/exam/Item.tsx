import React from 'react';
import Link from 'next/link';

export default function Item(props: any) {
  return (
    <>
<div className="col-12">
    <div className="card shadow overflow-hidden p-2">
        <div className="row g-0">
            <div className="col-md-5 overflow-hidden">
                <img style="max-height: 230px;" src="{asset('uploads/media/exams/files/' ~ exam.imageFile)}" className="rounded-2" alt="Card image" />
            </div>
            <div className="col-md-7">
                <div className="card-body">

                    <!-- Title -->
                    <h5 className="card-title"><a href="{url("app_front_exam_show", {reference: exam.reference})}">{exam.title}</a></h5>
                    <p className="text-truncate-2 d-none d-lg-block">{exam.description|u.truncate(120)}</p>

                    <!-- Info -->
                    <ul className="list-inline">
                        <li className="list-inline-item h6 fw-light mb-1 mb-sm-0"><i className="far fa-clock text-danger me-2"></i>{exam.duration}</li>
                        <li className="list-inline-item h6 fw-light mb-1 mb-sm-0"><i className="fas fa-table text-orange me-2"></i>{exam.classe.name}</li>
                        <li className="list-inline-item h6 fw-light"><i className="fas fa-signal text-success me-2"></i>{exam.category.name}</li>
                    </ul>

                    <!-- Price and avatar -->
                    <div className="d-sm-flex justify-content-sm-between align-items-center">
                        <!-- Avatar -->
                        <div className="d-flex align-items-center">
                            <div className="avatar">
                                <img className="avatar-img rounded-circle" src="{asset(exam.user.personne.avatarPath)}" alt="avatar" />
                            </div>
                            <p className="mb-0 ms-2"><a href="#" className="h6 fw-light">{exam.user.personne.nomComplet}</a></p>
                        </div>
                        <!-- Price -->
                        <div className="mt-3 mt-sm-0">
                            <a href="{url("app_front_exam_show", {reference: exam.reference})}" className="btn btn-dark">{% trans %}VIEWMORE_KEY{% endtrans %}</a>    
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
}
