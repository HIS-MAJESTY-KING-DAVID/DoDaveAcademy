'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ChatWindowProps {
  accessToken: string;
  currentUserId: number;
}

interface User {
  id: number;
  roles?: string;
  person: {
    pseudo: string;
    firstName: string;
    lastName: string;
  } | null;
}

interface Message {
  id: number;
  content: string;
  createdAt: string;
  sender: User;
  senderId: number;
}

interface Conversation {
  id: number;
  updatedAt: string;
  participants: { user: User }[];
  messages: Message[];
}

export default function ChatWindow({ accessToken, currentUserId }: ChatWindowProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [recipients, setRecipients] = useState<User[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingConversation, setIsStartingConversation] = useState(false);
  const [showRecipientPicker, setShowRecipientPicker] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/chat/conversations');
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load conversations');
      setConversations(data.data || []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRecipients = useCallback(async () => {
    try {
      const res = await fetch('/api/chat/users');
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load recipients');
      setRecipients(data.data || []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to load recipients');
    }
  }, []);

  const fetchMessages = useCallback(async (conversationId: number) => {
    try {
      const res = await fetch(`/api/chat/conversations/${conversationId}/messages`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load messages');
      setMessages(data.data || []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to load messages');
    }
  }, []);

  useEffect(() => {
    supabase.realtime.setAuth(accessToken);
  }, [accessToken]);

  useEffect(() => {
    fetchConversations();
    const channel = supabase
      .channel('public:conversation')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversation' }, fetchConversations)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchConversations]);

  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return undefined;
    }

    fetchMessages(selectedConversation.id);
    const channel = supabase
      .channel(`chat:${selectedConversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_message',
          filter: `conversation_id=eq.${selectedConversation.id}`,
        },
        () => fetchMessages(selectedConversation.id),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversation, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartConversation = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedRecipientId) return;
    setIsStartingConversation(true);
    setError('');

    try {
      const res = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientId: Number(selectedRecipientId) }),
      });
      const data = await res.json();
      if (!res.ok || !data.data) throw new Error(data.message || 'Unable to start conversation');
      setSelectedConversation(data.data);
      setSelectedRecipientId('');
      setShowRecipientPicker(false);
      await fetchConversations();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to start conversation');
    } finally {
      setIsStartingConversation(false);
    }
  };

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    setError('');

    try {
      const res = await fetch(`/api/chat/conversations/${selectedConversation.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send message');
      setNewMessage('');
      await fetchMessages(selectedConversation.id);
      await fetchConversations();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to send message');
    }
  };

  const getOtherParticipant = (conversation: Conversation) => conversation.participants
    .filter((participant) => participant.user.id !== currentUserId)
    .map((participant) => participant.user.person?.pseudo || participant.user.person?.firstName || 'User')
    .join(', ') || 'Conversation';

  const getUserLabel = (user: User) => user.person?.pseudo || `${user.person?.firstName || ''} ${user.person?.lastName || ''}`.trim() || `User #${user.id}`;

  if (isLoading) return <div>Loading chats...</div>;

  return (
    <div className="card shadow-sm h-100" style={{ minHeight: '600px' }}>
      <div className="row g-0 h-100">
        <div className="col-md-4 border-end">
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Messages</h5>
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { setShowRecipientPicker((open) => !open); if (!showRecipientPicker) fetchRecipients(); }}>
              New conversation
            </button>
          </div>
          {showRecipientPicker && (
            <form className="p-3 border-bottom" onSubmit={handleStartConversation}>
              <label className="form-label" htmlFor="chat-recipient">Choose a recipient</label>
              <select id="chat-recipient" className="form-select mb-2" value={selectedRecipientId} onChange={(event) => setSelectedRecipientId(event.target.value)} required>
                <option value="">Select a user</option>
                {recipients.map((recipient) => <option key={recipient.id} value={recipient.id}>{getUserLabel(recipient)}</option>)}
              </select>
              <button type="submit" className="btn btn-primary btn-sm" disabled={isStartingConversation || !selectedRecipientId}>
                {isStartingConversation ? 'Starting...' : 'Start conversation'}
              </button>
            </form>
          )}
          <div className="list-group list-group-flush overflow-auto" style={{ height: 'calc(600px - 60px)' }}>
            {conversations.length === 0 && <div className="p-3 text-muted">No conversations yet.</div>}
            {conversations.map((conversation) => (
              <button key={conversation.id} type="button" className={`list-group-item list-group-item-action ${selectedConversation?.id === conversation.id ? 'active' : ''}`} onClick={() => setSelectedConversation(conversation)}>
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">{getOtherParticipant(conversation)}</h6>
                  <small>{new Date(conversation.updatedAt).toLocaleDateString()}</small>
                </div>
                <p className="mb-1 small text-truncate">{conversation.messages[0]?.content || 'No messages yet'}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-8 d-flex flex-column" style={{ height: '600px' }}>
          {error && <div className="alert alert-danger m-3 mb-0" role="alert">{error}</div>}
          {selectedConversation ? (
            <>
              <div className="p-3 border-bottom bg-light"><h6 className="mb-0">Chat with {getOtherParticipant(selectedConversation)}</h6></div>
              <div className="flex-grow-1 p-3 overflow-auto">
                {messages.map((message) => {
                  const isMine = message.senderId === currentUserId;
                  return (
                    <div key={message.id} className={`d-flex mb-3 ${isMine ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div className={`p-3 rounded ${isMine ? 'bg-primary text-white' : 'bg-light border'}`} style={{ maxWidth: '75%' }}>
                        <div className="small fw-bold mb-1">{message.sender.person?.pseudo || 'User'}</div>
                        <div>{message.content}</div>
                        <div className={`small mt-1 ${isMine ? 'text-light' : 'text-muted'}`}>{new Date(message.createdAt).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 border-top">
                <form onSubmit={handleSendMessage} className="d-flex gap-2">
                  <input type="text" className="form-control" placeholder="Type a message..." value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />
                  <button type="submit" className="btn btn-primary" disabled={!newMessage.trim()}>Send</button>
                </form>
              </div>
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 text-muted">Select a conversation to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}
