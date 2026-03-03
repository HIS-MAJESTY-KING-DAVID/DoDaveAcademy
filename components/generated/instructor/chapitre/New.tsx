import React from 'react';
import Link from 'next/link';
import Form from './Form';

interface NewProps {
  cours: {
    slug: string;
  };
}

export default function New({ cours }: NewProps) {
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link href={`/instructor/chapitre/index/${cours?.slug}`} className="btn btn-secondary">
          back to list
        </Link>
      </div>
      <Form />
    </>
  );
}
