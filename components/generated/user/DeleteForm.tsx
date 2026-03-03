import React from 'react';

interface DeleteFormProps {
  id: string | number;
}

export default function DeleteForm({ id }: DeleteFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      e.preventDefault();
    }
  };

  return (
    <form 
      method="post" 
      action={`/api/user/${id}/delete`} 
      onSubmit={handleSubmit}
      className="d-inline-block"
    >
      <input type="hidden" name="_method" value="DELETE" />
      <button className="btn btn-danger">Delete</button>
    </form>
  );
}
