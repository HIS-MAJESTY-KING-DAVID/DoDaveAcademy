import React from 'react';
import Link from 'next/link';

interface Chapitre {
  id: number;
  title: string;
  slug: string;
  description: string;
  numero: number;
}

interface ShowProps {
  chapitre: Chapitre;
  cours: {
    slug: string;
  };
}

export default function Show({ chapitre, cours }: ShowProps) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this chapter?')) {
      console.log('Delete chapter', id);
    }
  };

  return (
    <>
      <h1>Chapitre</h1>

      <table className="table">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{chapitre.id}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{chapitre.title}</td>
          </tr>
          <tr>
            <th>Slug</th>
            <td>{chapitre.slug}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{chapitre.description}</td>
          </tr>
          <tr>
            <th>Numero</th>
            <td>{chapitre.numero}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex gap-2 mt-3">
        <Link href={`/instructor/chapitre/index/${cours?.slug}`} className="btn btn-secondary">
          back to list
        </Link>

        <Link href={`/instructor/chapitre/${chapitre.id}/edit`} className="btn btn-warning">
          edit
        </Link>

        <button 
          className="btn btn-danger" 
          onClick={() => handleDelete(chapitre.id)}
        >
          delete
        </button>
      </div>
    </>
  );
}
