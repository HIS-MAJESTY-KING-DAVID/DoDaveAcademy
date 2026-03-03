import React from 'react';
import Link from 'next/link';

interface IndexProps {
  cours: any;
  chapitres: any[];
}

export default function Index({ cours, chapitres }: IndexProps) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      // Handle delete
      console.log('Delete chapter', id);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link href={`/instructor/chapitre/${cours.slug}/new`} className="btn btn-success mb-0">
          Ajouter un Chapitre
        </Link>
      </div>

      {/* Card START */}
      <div className="card border bg-transparent rounded-3">
        {/* Card header START */}
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">{cours.intitule}</h3>
          <blockquote>{cours.description}</blockquote>
          <hr />
          <h4>Liste des chapitres</h4>
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
                  <th scope="col" className="border-0 rounded-start">#</th>
                  <th scope="col" className="border-0">Titre</th>
                  <th scope="col" className="border-0">Description</th>
                  <th scope="col" className="border-0">Nombre de leçons</th>
                  <th scope="col" className="border-0 rounded-end">Action</th>
                </tr>
              </thead>

              {/* Table body START */}
              <tbody>
                {/* Table item */}
                {chapitres && chapitres.length > 0 ? (
                  chapitres.map((chapitre, index) => (
                    <tr key={chapitre.id}>
                      <td>{index + 1}</td>
                      <td>{chapitre.title.length > 33 ? chapitre.title.substring(0, 33) + '...' : chapitre.title}</td>
                      <td>{chapitre.description.length > 53 ? chapitre.description.substring(0, 53) + '...' : chapitre.description}</td>
                      <td>{chapitre.lessons?.length || 0}</td>
                      <td>
                        <Link 
                          href={`/instructor/lesson/${chapitre.slug}`} 
                          className="btn btn-sm btn-info-soft me-1"
                          title="Afficher la liste des leçons de ce chapitre"
                        >
                          <i className="fas fa-list fa-fw"></i>
                        </Link>
                        <Link 
                          href={`/instructor/lesson/${chapitre.slug}/new`} 
                          className="btn btn-sm btn-success-soft me-1"
                          title="Ajouter une nouvelle leçon"
                        >
                          <i className="fas fa-plus fa-fw"></i>
                        </Link>
                        <Link 
                          href={`/instructor/chapitre/${cours.slug}/${chapitre.slug}/edit`} 
                          className="btn btn-sm btn-primary-soft me-1"
                          title="Modifier"
                        >
                          <i className="fas fa-edit fa-fw"></i>
                        </Link>
                        <Link 
                          href={`/instructor/courses/${chapitre.slug}/quizzes`} 
                          className="btn btn-sm btn-warning-soft me-1"
                          title="Quiz"
                        >
                          <i className="fas fa-arrow-right fa-fw"></i>
                        </Link>
                        <button 
                          className="btn btn-sm btn-danger-soft"
                          onClick={() => handleDelete(chapitre.id)}
                        >
                          <i className="fas fa-trash fa-fw"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No data found</td>
                  </tr>
                )}
              </tbody>
              {/* Table body END */}
            </table>
          </div>
          {/* Pagination END */}
        </div>
        {/* Card body START */}
      </div>
      {/* Card END */}
    </>
  );
}
