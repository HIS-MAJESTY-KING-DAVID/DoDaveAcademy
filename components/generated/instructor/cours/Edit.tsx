import React from 'react';
import Form from './Form';

interface EditProps {
  course: any;
}

export default function Edit({ course }: EditProps) {
  return (
    <>
      <Form initialData={course} />
    </>
  );
}
