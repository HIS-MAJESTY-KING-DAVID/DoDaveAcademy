import React from 'react';

interface DeleteFormProps {
  lesson: {
    id: number;
    slug: string;
  };
  chapitre: {
    slug: string;
  };
  onDelete?: () => void;
}

export default function DeleteForm({ lesson, chapitre, onDelete }: DeleteFormProps) {
  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm('Vous êtes sure de vouloir supprimer définitivement cette leçon?')) {
      if (onDelete) {
        onDelete();
      }
      console.log('Delete lesson', lesson.slug, 'from chapitre', chapitre.slug);
    }
  };

  return (
    <form onSubmit={handleDelete} className="d-inline">
      <button className="btn btn-sm btn-danger-soft btn-round me-1 mb-0">
        <i className="fas fa-trash"></i>
      </button>
    </form>
  );
}
