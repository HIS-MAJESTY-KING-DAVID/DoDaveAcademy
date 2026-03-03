import React from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  intitule: string;
  slug: string;
  content: string;
  description: string;
  isPublished: boolean;
  isFree: boolean;
  niveauDifficulte: string;
  dureeApprentissage: string;
  createdAt: string;
  vues: number;
  isValidated: boolean;
  montantAbonnement: number;
  language: string;
  numberOfLessons: number;
  tags: string;
  isRejected: boolean;
  review: string;
  updatedAt: string;
  publishedAt: string;
}

interface ShowProps {
  course: Course;
}

export default function Show({ course }: ShowProps) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      console.log('Delete course', id);
    }
  };

  return (
    <>
      <h1>Cours</h1>

      <table className="table">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{course.id}</td>
          </tr>
          <tr>
            <th>Intitule</th>
            <td>{course.intitule}</td>
          </tr>
          <tr>
            <th>Slug</th>
            <td>{course.slug}</td>
          </tr>
          <tr>
            <th>Content</th>
            <td>{course.content}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{course.description}</td>
          </tr>
          <tr>
            <th>IsPublished</th>
            <td>{course.isPublished ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>IsFree</th>
            <td>{course.isFree ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>NiveauDifficulte</th>
            <td>{course.niveauDifficulte}</td>
          </tr>
          <tr>
            <th>DureeApprentissage</th>
            <td>{course.dureeApprentissage}</td>
          </tr>
          <tr>
            <th>CreatedAt</th>
            <td>{course.createdAt ? new Date(course.createdAt).toLocaleString() : ''}</td>
          </tr>
          <tr>
            <th>Vues</th>
            <td>{course.vues}</td>
          </tr>
          <tr>
            <th>IsValidated</th>
            <td>{course.isValidated ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>MontantAbonnement</th>
            <td>{course.montantAbonnement}</td>
          </tr>
          <tr>
            <th>Language</th>
            <td>{course.language}</td>
          </tr>
          <tr>
            <th>NumberOfLessons</th>
            <td>{course.numberOfLessons}</td>
          </tr>
          <tr>
            <th>Tags</th>
            <td>{course.tags}</td>
          </tr>
          <tr>
            <th>IsRejected</th>
            <td>{course.isRejected ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>Review</th>
            <td>{course.review}</td>
          </tr>
          <tr>
            <th>UpdatedAt</th>
            <td>{course.updatedAt ? new Date(course.updatedAt).toLocaleString() : ''}</td>
          </tr>
          <tr>
            <th>PublishedAt</th>
            <td>{course.publishedAt ? new Date(course.publishedAt).toLocaleString() : ''}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex gap-2 mt-3">
        <Link href="/instructor/cours" className="btn btn-secondary">
          back to list
        </Link>

        <Link href={`/instructor/cours/${course.id}/edit`} className="btn btn-warning">
          edit
        </Link>

        <button 
          className="btn btn-danger" 
          onClick={() => handleDelete(course.id)}
        >
          delete
        </button>
      </div>
    </>
  );
}
