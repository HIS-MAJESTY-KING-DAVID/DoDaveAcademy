import React from 'react';

export default function Index({ controller_name = 'GoogleController' }: { controller_name?: string }) {
  return (
    <div className="example-wrapper" style={{ margin: '1em auto', maxWidth: '800px', width: '95%', font: '18px/1.5 sans-serif' }}>
      <h1>Hello {controller_name}! ✅</h1>

      This friendly message is coming from:
      <ul>
        <li>Your controller at <code>src/Controller/GoogleController.php</code></li>
        <li>Your template at <code>templates/google/index.html.twig</code></li>
      </ul>
    </div>
  );
}
