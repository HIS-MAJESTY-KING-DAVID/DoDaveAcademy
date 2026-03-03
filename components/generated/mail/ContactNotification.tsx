import React from 'react';
import Link from 'next/link';

export default function ContactNotification(props: any) {
  return (
    <>
{/* templates/emails/contact_notification.html.twig */}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact Venant su site</title>
</head>
<body>
    <h1>Nouveau message de contact reçu :</h1>
    <ul>
        <li><strong>Nom :</strong> {contactMessage.name}</li>
        <li><strong>Email :</strong> {contactMessage.email}</li>
        <li><strong>Projet :</strong> {contactMessage.project}</li>
        <li><strong>Message :</strong> {contactMessage.message}</li>
    </ul>
</body>
</html>

    </>
  );
}
