import React from 'react';
import Link from 'next/link';

export default function Chat() {
  return (
    <div className="chat-wrapper">
      <div className="container-fluid chat-container">
        {/* Colonne des groupes */}
        <div className="col-md-4 chat-sidebar">
          <div className="chat-sidebar-header">
            <h5>Discussions</h5>
            <input type="text" className="form-control search-bar" placeholder="Rechercher..." />
          </div>
          <div id="group-list" className="chat-group-list"></div>
        </div>

        {/* Colonne du chat principal */}
        <div className="col-md-8 chat-main">
          <div className="chat-main-header">
            <button className="btn btn-light d-md-none" id="back-button">← Retour</button>
            <h5 className="chat-title" id="chat-title" data-group-id="">Sélectionnez un groupe</h5>
          </div>
          <div className="chat-messages">
            <p className="welcome-message">Bienvenue dans le chat ! Sélectionnez un groupe.</p>
          </div>
          <div id="chat-input-area" className="chat-input-area d-none">
            <input type="text" id="chat-message" className="form-control chat-input" placeholder="Écrivez un message..." disabled />
            <button id="send-message" className="btn btn-primary chat-send" disabled>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
