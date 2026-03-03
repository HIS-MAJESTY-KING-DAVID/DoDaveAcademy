import React from 'react';
import SetupModal from './SetupModal';

interface SubjectChatProps {
  user?: any;
  needsSetup?: boolean;
}

export default function SubjectChat({ user, needsSetup = false }: SubjectChatProps) {
  return (
    <>
      {user && (
        <>
          <meta name="current-user-id" content={user.id} />
          <meta name="current-username" content={user.firstName} />
        </>
      )}

      {needsSetup && <SetupModal />}

      <div className="row">
        <div className="col-12">
          <div className="chat-app">
            <div className="chat-sidebar">
              <div className="sidebar-header">
                <h5>Messages</h5>
                <button type="button" className="btn btn-icon d-none">
                  <i className="bi bi-pencil-square"></i>
                </button>
              </div>
              <div className="sidebar-search">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input type="text" id="subject-search" className="form-control" placeholder="Search subjects..." />
                </div>
              </div>
              <div className="sidebar-content">
                <div id="subject-list" className="chat-list">
                  {/* Subject list will be populated by JavaScript */}
                </div>
              </div>
            </div>
            <div id="sidebar-resizer" className="sidebar-resizer"></div>
            <div className="chat-content">
              <button type="button" className="mobile-back-button">
                <i className="bi bi-arrow-left"></i> BACKTOSUBJECT_KEY
              </button>
              <div id="chat-header" className="chat-header">
                {/* Chat header will be populated by JavaScript */}
              </div>
              <div id="chat-messages" className="chat-body">
                {/* Messages will be populated by JavaScript */}
                <div className="message-wrapper">
                  <div className="message-time">Today</div>
                </div>
              </div>
              <div className="chat-footer">
                <div className="chat-input-container">
                  <button type="button" id="emoji-button" className="btn btn-icon d-none">
                    <i className="bi bi-emoji-smile"></i>
                  </button>
                  <button type="button" className="btn btn-icon d-none">
                    <i className="bi bi-paperclip"></i>
                  </button>
                  <div className="input-wrapper">
                    <textarea id="message-input" className="form-control" placeholder="Type a message..."></textarea>
                  </div>
                  <button id="send-message" type="button" className="btn btn-primary">
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
