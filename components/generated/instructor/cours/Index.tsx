import React from 'react';
import Link from 'next/link';

interface Cours {
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

interface IndexProps {
  cours: Cours[];
}

export default function Index({ cours }: IndexProps) {
  return (
    <div className="container">
      <h1>Cours index</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Intitule</th>
            <th>Slug</th>
            <th>Content</th>
            <th>Description</th>
            <th>IsPublished</th>
            <th>IsFree</th>
            <th>NiveauDifficulte</th>
            <th>DureeApprentissage</th>
            <th>CreatedAt</th>
            <th>Vues</th>
            <th>IsValidated</th>
            <th>MontantAbonnement</th>
            <th>Language</th>
            <th>NumberOfLessons</th>
            <th>Tags</th>
            <th>IsRejected</th>
            <th>Review</th>
            <th>UpdatedAt</th>
            <th>PublishedAt</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {cours && cours.length > 0 ? (
            cours.map((cour) => (
              <tr key={cour.id}>
                <td>{cour.id}</td>
                <td>{cour.intitule}</td>
                <td>{cour.slug}</td>
                <td>{cour.content}</td>
                <td>{cour.description}</td>
                <td>{cour.isPublished ? 'Yes' : 'No'}</td>
                <td>{cour.isFree ? 'Yes' : 'No'}</td>
                <td>{cour.niveauDifficulte}</td>
                <td>{cour.dureeApprentissage}</td>
                <td>{cour.createdAt ? new Date(cour.createdAt).toLocaleString() : ''}</td>
                <td>{cour.vues}</td>
                <td>{cour.isValidated ? 'Yes' : 'No'}</td>
                <td>{cour.montantAbonnement}</td>
                <td>{cour.language}</td>
                <td>{cour.numberOfLessons}</td>
                <td>{cour.tags}</td>
                <td>{cour.isRejected ? 'Yes' : 'No'}</td>
                <td>{cour.review}</td>
                <td>{cour.updatedAt ? new Date(cour.updatedAt).toLocaleString() : ''}</td>
                <td>{cour.publishedAt ? new Date(cour.publishedAt).toLocaleString() : ''}</td>
                <td>
                  <Link href={`/instructor/cours/${cour.id}`} className="btn btn-sm btn-info me-1">show</Link>
                  <Link href={`/instructor/cours/${cour.id}/edit`} className="btn btn-sm btn-primary">edit</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={21}>no records found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link href="/instructor/cours/new" className="btn btn-success">Create new</Link>
    </div>
  );
}
