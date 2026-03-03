import React from 'react';
import Link from 'next/link';

export default function ConfirmationEmail(props: any) {
  return (
    <>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmation de votre email - Kulmapeck</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <img src="{absolute_url(asset('assets/images/logo.png'))}" alt="Kulmapeck Logo" style="max-width: 200px;" />
    </div>

    <h1 style="color: #2563eb; text-align: center;">Confirmez votre adresse email</h1>

    <p style="margin-bottom: 20px;">
        Bonjour,<br /><br />
        Merci d'avoir ajouté votre email à votre compte Kulmapeck. Pour finaliser ce processus, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :
    </p>

    <div style="text-align: center; margin: 30px 0;">
        <a href="{signedUrl|raw}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Confirmer mon email
        </a>
    </div>

    <p style="color: #666; font-size: 0.9em;">
        Ce lien expirera dans {expiresAtMessageKey|trans(expiresAtMessageData, 'VerifyEmailBundle')}. Si le bouton ne fonctionne pas, vous pouvez copier et coller le lien suivant dans votre navigateur :<br />
        <span style="color: #2563eb;">{signedUrl|raw}</span>
    </p>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 0.9em;">
        <p>
            Si vous n'avez pas demandé cette confirmation d'email, vous pouvez ignorer ce message.<br />
            {"now"|date("Y")} Kulmapeck. Tous droits réservés.
        </p>
    </div>
</body>
</html>

    </>
  );
}
