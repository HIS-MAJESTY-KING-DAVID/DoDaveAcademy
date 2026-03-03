import React from 'react';
import Link from 'next/link';

interface IndexProps {
  chapitre: any;
  lessons: any[];
}

export default function Index({ chapitre, lessons }: IndexProps) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      // Handle delete
      console.log('Delete lesson', id);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link href={`/instructor/lesson/${chapitre.slug}/new`} className="btn btn-success mb-0">
          Nouvelle leçon
        </Link>
      </div>

      {/* Card START */}
      <div className="card border bg-transparent rounded-3">
        {/* Card header START */}
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">{chapitre.title}</h3>
          <blockquote>{chapitre.description}</blockquote>
          <hr />
          <h4>Liste des leçons</h4>
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
                  <th scope="col" className="border-0 rounded-end">Action</th>
                </tr>
              </thead>

              {/* Table body START */}
              <tbody>
                {/* Table item */}
                {lessons && lessons.length > 0 ? (
                  lessons.map((lesson, index) => (
                    <tr key={lesson.id}>
                      <td>{index + 1}</td>
                      <td>{lesson.title}</td>
                      <td>
                        <Link 
                          href={`/instructor/lesson/${chapitre.slug}/${lesson.slug}/edit`} 
                          className="btn btn-sm btn-warning-soft btn-round me-1 mb-0"
                          title="Modifier"
                        >
                          <i className="far fa-fw fa-edit"></i>
                        </Link>
                        <button 
                          className="btn btn-sm btn-danger-soft btn-round mb-0"
                          onClick={() => handleDelete(lesson.id)}
                        >
                          <i className="fas fa-fw fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No data found</td>
                  </tr>
                )}
              </tbody>
              {/* Table body END */}
            </table>
          </div>
          {/* Course list table END */}
        </div>
        {/* Card body START */}
      </div>
      {/* Card END */}
    </>
  );
}
