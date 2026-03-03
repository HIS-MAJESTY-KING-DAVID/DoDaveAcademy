import React from 'react';
import Link from 'next/link';

interface ForumMessage {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  isAnswer: boolean;
  member: {
    avatar: string;
    pseudo: string;
    id: number;
  };
  forumMessages?: ForumMessage[]; // Replies
}

interface ForumSubject {
  id: number;
  reference: string;
  content: string;
  isSolved: boolean;
  createdAt: string;
  member: {
    avatar: string;
    pseudo: string;
    id: number;
  };
  forumMessages: ForumMessage[];
}

interface MessagesProps {
  subject: ForumSubject;
  currentMember?: {
    id: number;
    avatar: string;
  };
  isInstructor?: boolean;
  onPostMessage?: (content: string) => void;
  onLikeMessage?: (id: number) => void;
  onSolveMessage?: (id: number) => void;
  onDeleteMessage?: (id: number) => void;
}

export default function Messages({ 
  subject, 
  currentMember, 
  isInstructor = false,
  onPostMessage,
  onLikeMessage,
  onSolveMessage,
  onDeleteMessage
}: MessagesProps) {
  
  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const content = (e.target as any).elements.message.value;
    if (onPostMessage) {
      onPostMessage(content);
    }
    (e.target as HTMLFormElement).reset();
  };

  const renderMessage = (message: ForumMessage, isReply = false) => (
    <li className="comment-item" id={`item-comment-${message.id}`} key={message.id}>
      <div className="d-flex mb-3">
        <div className={`avatar ${isReply ? 'avatar-xs' : 'avatar-sm'} flex-shrink-0`}>
          <img 
            className="avatar-img rounded-circle" 
            src={message.member.avatar || '/assets/images/avatar/placeholder.jpg'} 
            alt="" 
          />
        </div>
        <div className="ms-2">
          <div className="bg-light p-3 rounded">
            <div className="d-flex justify-content-center">
              <div className="me-2">
                <h6 className="mb-1 lead fw-bold">
                  {message.member.pseudo}
                </h6>
                <p className="h6 mb-0">{message.content}</p>
              </div>
              <small>{new Date(message.createdAt).toLocaleString()}</small>
            </div>
          </div>
          
          <ul className="nav nav-divider py-2 small">
            <li className="nav-item">
              <button 
                className={`btn btn-link p-0 text-primary-hover ${currentMember && !subject.isSolved ? '' : 'disabled'}`}
                onClick={() => onLikeMessage && onLikeMessage(message.id)}
              >
                <i className="fas fa-thumbs-up me-1"></i>
                Like ({message.likes})
              </button>
            </li>
            
            {!subject.isSolved && currentMember && !isReply && (
              <li className="nav-item">
                 <button className="btn btn-link p-0 text-primary-hover ms-3">
                   <i className="fas fa-reply me-1"></i> Reply
                 </button>
              </li>
            )}

            {!subject.isSolved && currentMember?.id === subject.member.id && (
              <li className="nav-item">
                <button 
                  className="btn btn-link p-0 text-success-hover text-success ms-3"
                  onClick={() => {
                    if (confirm('Are you sure that you want to set these response as the top response that solved your problem ?')) {
                       onSolveMessage && onSolveMessage(message.id);
                    }
                  }}
                >
                  <i className="fas fa-check me-1"></i> Resolved
                </button>
              </li>
            )}
            
            {currentMember && !subject.isSolved && (currentMember.id === message.member.id || isInstructor) && (
              <li className="nav-item">
                <button 
                  className="btn btn-link p-0 text-danger-hover text-danger ms-3"
                  onClick={() => {
                     if (confirm('Are you sure you want to remove this item?')) {
                        onDeleteMessage && onDeleteMessage(message.id);
                     }
                  }}
                >
                  <i className="fas fa-trash me-1"></i> Remove
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {message.forumMessages && message.forumMessages.length > 0 && (
        <ul className="list-unstyled ms-4">
          {message.forumMessages.map(reply => renderMessage(reply, true))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="card shadow rounded-2 p-0">
      <div className="card-body p-4">
        <div className="d-flex mb-4 mt-3">
          <div className="avatar avatar-lg flex-shrink-0 me-2">
            <img 
              className="avatar-img rounded-circle" 
              src={subject.member.avatar || '/assets/images/avatar/placeholder.jpg'} 
              alt="" 
            />
          </div>
          <div className="w-100 d-flex">
            <div className="w-100">
               <h6>
                 By {subject.member.pseudo}
                 <span className="badge btn-info-soft ms-2">{new Date(subject.createdAt).toLocaleString()}</span>
                 <span className={`badge ms-2 ${subject.isSolved ? "btn-success-soft" : 'btn-danger-soft'}`}>
                   {subject.isSolved ? "Resolved" : "Unresolved"}
                 </span>
               </h6>
               <div dangerouslySetInnerHTML={{ __html: subject.content }} />
            </div>
          </div>
        </div>
        <hr />

        <div className="custom-scrollbar h-600px overflow-hidden">
          <ul className="list-unstyled mb-0">
            {subject.forumMessages && subject.forumMessages.length > 0 ? (
              subject.forumMessages.filter(m => !m.isAnswer).map(message => renderMessage(message))
            ) : (
              <h5 className="mt-2 text-danger">No Answer Found</h5>
            )}
          </ul>
        </div>
      </div>

      <div className="card-footer p-4">
        {currentMember && !subject.isSolved && (
          <div className="d-flex mb-4 mt-3">
            <div className="avatar avatar-sm flex-shrink-0 me-2">
               <img 
                 className="avatar-img rounded-circle" 
                 src={currentMember.avatar || '/assets/images/avatar/placeholder.jpg'} 
                 alt="" 
               />
            </div>
            <form onSubmit={handlePost} className="w-100 d-flex">
              <textarea 
                name="message" 
                className="form-control pe-4 bg-light" 
                placeholder="Add a comment..." 
                rows={5}
              ></textarea>
              <button className="btn btn-primary ms-2 mb-0" type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
