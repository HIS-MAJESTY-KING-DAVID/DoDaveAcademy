import React from 'react';
import Link from 'next/link';
import Form from './Form';

interface EditProps {
  cours: {
    slug: string;
  };
  chapitre: any;
}

export default function Edit({ cours, chapitre }: EditProps) {
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link href={`/instructor/chapitre/index/${cours?.slug}`} className="btn btn-secondary">
          back to list
        </Link>
      </div>
      <Form initialData={chapitre} buttonLabel="Enregistrer" />
    </>
  );
}
