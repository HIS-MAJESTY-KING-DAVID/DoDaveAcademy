import React from 'react';
import SetupModal from './SetupModal';

interface IndexProps {
  showSetupModal?: boolean;
  isProfileComplete?: boolean;
  isPremium?: boolean;
  subjects?: any[];
}

export default function Index({ showSetupModal, isProfileComplete, isPremium, subjects }: IndexProps) {
  return (
    <>
      {showSetupModal && (
        <SetupModal isProfileComplete={isProfileComplete} isPremium={isPremium} />
      )}

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
              {subjects && subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <div className={`chat-item ${index === 0 ? 'active' : ''}`} data-subject-id={subject.id} key={subject.id}>
                    <div className="chat-item-avatar">
                      {subject.icon ? (
                        <img src={subject.icon} alt={subject.name} className="rounded-circle" />
                      ) : (
                        <div className="avatar-placeholder rounded-circle">
                          {subject.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="chat-item-info">
                      <div className="chat-item-name">{subject.name}</div>
                      <div className="chat-item-preview">{subject.lastMessage || 'Start chatting...'}</div>
                    </div>
                    <div className="chat-item-meta">
                      {subject.unreadCount > 0 && (
                        <div className="chat-item-badge">{subject.unreadCount}</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="loading-state text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading subjects...</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="chat-content">
          <button type="button" className="mobile-back-button">
            <i className="bi bi-arrow-left"></i> BACKTOSUBJECT_KEY
          </button>
          <div className="welcome-screen" id="welcome-screen">
            <div className="welcome-content">
              <div className="welcome-icon">
                <i className="bi bi-chat-dots"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
