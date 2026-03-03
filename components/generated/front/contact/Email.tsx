import React from 'react';

interface EmailProps {
  message: string;
}

export default function Email({ message }: EmailProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
