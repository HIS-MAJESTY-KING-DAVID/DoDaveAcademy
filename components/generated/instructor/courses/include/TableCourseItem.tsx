import React from 'react';
import Link from 'next/link';

interface TableCourseItemProps {
  course: any;
  onDelete?: (course: any) => void;
}

export default function TableCourseItem({ course, onDelete }: TableCourseItemProps) {
  const handleDelete = () => {
    if (confirm('Etes vous sure de vouloir supprimer ce cours définitivement ?')) {
      if (onDelete) onDelete(course);
    }
  };

  return (
    <tr>
      {/* Course item */}
      <td>
        <div className="d-flex align-items-center">
          {/* Image */}
          <div className="w-60px">
            <img 
              src={`/uploads/media/courses/${course.media.imageFile}`} 
              className="rounded" 
              alt="" 
            />
          </div>
          <div className="mb-0 ms-2">
            {/* Title */}
            <h6 title={course.intitule}>
              <Link href={`/course/${course.slug}`} target="_blank">
                {course.intitule.length > 30 ? course.intitule.substring(0, 30) + '...' : course.intitule}
              </Link>
            </h6>
            {/* Info */}
            <div className="d-sm-flex">
              <p className="h6 fw-light mb-0 small me-3">
                <i className="fas fa-table text-orange me-2"></i>{course.numberOfLessons} lessons
              </p>
              <p className="h6 fw-light mb-0 small">
                <i className="fas fa-check-circle text-success me-2"></i>{course.chapitres?.length || 0} chapitre
              </p>
            </div>
          </div>
        </div>
      </td>
      {/* Enrolled item */}
      <td className="text-center text-sm-start">{course.eleves?.length || 0}</td>
      {/* Status item */}
      <td>
        {course.isValidated ? (
          <div className="badge bg-success bg-opacity-10 text-success">published and validated</div>
        ) : course.isPublished ? (
          <div className="badge bg-danger bg-opacity-10 text-danger">Waiting for validation</div>
        ) : (
          <div className="badge bg-primary bg-opacity-10 text-primary">On going redaction</div>
        )}
      </td>
      {/* Price item */}
      <td>
        {course.montantAbonnement > 0 ? (
          `$${course.montantAbonnement}`
        ) : (
          <div className="badge badge-info bg-opacity-10 text-primary">Free</div>
        )}
      </td>
      {/* Action item */}
      <td className="text-center">
        <Link 
          href={`/instructor/courses/${course.slug}/preview`} 
          className="btn btn-sm btn-primary-soft btn-round me-1 mb-0"
          data-bs-toggle="tooltip" 
          data-bs-placement="top" 
          title="Preview"
        >
          <i className="far fa-fw fa-eye"></i>
        </Link>
        
        <div className="dropdown text-end" style={{ float: 'right' }}>
          <a href="#" className="btn btn-sm btn-light btn-round small mb-0" role="button" id="dropdownShare2" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-three-dots fa-fw"></i>
          </a>
          {/* dropdown button */}
          <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare2">
            <li>
              <Link 
                href={`/instructor/chapitre/${course.slug}`} 
                className="dropdown-item"
                title="Afficher Liste des chapitres de ce cours"
              >
                <i className="fas fa-list fa-fw me-2"></i>
                Liste des chapitres
              </Link>
            </li>
            <hr />
            <li>
              <Link 
                href={`/instructor/chapitre/${course.slug}/new`} 
                className="dropdown-item"
                title="Ajouter un chapitre"
              >
                <i className="fas fa-plus fa-fw me-2"></i>
                Nouveau Chapitre
              </Link>
            </li>
            <hr />
            <li>
              <Link 
                href={`/instructor/courses/${course.slug}/quizzes/final`} 
                className="dropdown-item"
                title={`${course.intitule}: Click to add quizzes`}
              >
                <i className="fas fa-arrow-right fa-fw me-2"></i>
                Evaluation finale
              </Link>
            </li>
            
            {!course.isValidated && (
              <>
                <hr />
                <li>
                  <button 
                    onClick={handleDelete}
                    className="dropdown-item d-block bg-danger-soft-hover p-2 delete-item"
                    title="Delete"
                  >
                    <i className="fas fa-fw fa-trash-alt"></i> Remove
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        {!course.isPublished && (
          <Link 
            href={`/instructor/courses/${course.slug}/published`} 
            className="btn btn-sm btn-success-soft btn-round me-1 mb-0"
            title="published"
          >
            <i className="far fa-fw fa-paper-plane"></i>
          </Link>
        )}
      </td>
    </tr>
  );
}
