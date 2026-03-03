import React from 'react';
import Link from 'next/link';

interface Lesson {
  id: number;
  title: string;
  slug: string;
  content: string;
  videoLink: string;
  numero: number;
  poster: string;
  updatedAt: string;
}

interface ShowProps {
  lesson: Lesson;
}

export default function Show({ lesson }: ShowProps) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      console.log('Delete lesson', id);
    }
  };

  return (
    <>
      <h1>Lesson</h1>

      <table className="table">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{lesson.id}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{lesson.title}</td>
          </tr>
          <tr>
            <th>Slug</th>
            <td>{lesson.slug}</td>
          </tr>
          <tr>
            <th>Content</th>
            <td>{lesson.content}</td>
          </tr>
          <tr>
            <th>VideoLink</th>
            <td>{lesson.videoLink}</td>
          </tr>
          <tr>
            <th>Numero</th>
            <td>{lesson.numero}</td>
          </tr>
          <tr>
            <th>Poster</th>
            <td>{lesson.poster}</td>
          </tr>
          <tr>
            <th>UpdatedAt</th>
            <td>{lesson.updatedAt ? new Date(lesson.updatedAt).toLocaleString() : ''}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex gap-2 mt-3">
        <Link href="/instructor/lesson" className="btn btn-secondary">
          back to list
        </Link>

        <Link href={`/instructor/lesson/${lesson.id}/edit`} className="btn btn-warning">
          edit
        </Link>

        <button 
          className="btn btn-danger" 
          onClick={() => handleDelete(lesson.id)}
        >
          delete
        </button>
      </div>
    </>
  );
}
