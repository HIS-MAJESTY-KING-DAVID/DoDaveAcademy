import React from 'react';

interface SuccessProps {
  activatedConfirmation?: boolean | null;
}

export default function Success({ activatedConfirmation }: SuccessProps) {
  return (
    <section className="pt-4 pt-sm-5">
      <div className="container">
        <div className="row g-4 g-md-5 justify-content-between">
          <div className="col-lg-12 mb-5">
            {!activatedConfirmation ? (
              <div className="text-center">
                <h3 className="mb-5 mt-3 text-white">Confirmation de création de compte !</h3>
                <p>Félicitation !</p>
                <p>
                  Nous vous informons que votre compte a été créé avec succès. <br />
                  Pour confirmer la creation de compte, veuillez cliquer sur le lien qui vous a
                  été envoyé par mail.
                </p>
                <p>
                  Une fois que vous aurez cliqué sur le lien, votre compte sera activé et vous 
                  pourrez vous connecter.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="mb-5 mt-3 text-white">Confirmation : compte activé</h3>
                <p>Félicitation !</p>
                <p>
                  Votre compte a bien été activé. Vous pouvez dès lors vous connecter et profiter de 
                  notre plateforme.
                </p>
                <p>Merci de votre confiance et surtout bonne lecture.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
