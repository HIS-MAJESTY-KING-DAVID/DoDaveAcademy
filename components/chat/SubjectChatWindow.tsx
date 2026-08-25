'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface SubjectChatWindowProps {
  accessToken: string;
  currentUserId: number;
}

interface Room {
  id: number;
  name: string;
  cycle: number | null;
  unreadCount: number;
  messageCount: number;
  category: { id: number; name: string; slug: string };
}

interface ChatMessage {
  id: number;
  subjectChatId: number;
  senderId: number;
  content: string;
  isFromAI: boolean;
  isRead: boolean;
  isDeleted: boolean;
  editedAt: string | null;
  createdAt: string;
  sender: { id: number; person: { pseudo: string; firstName: string; lastName: string } | null };
}

export default function SubjectChatWindow({ accessToken, currentUserId }: SubjectChatWindowProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [isMobileRoomOpen, setIsMobileRoomOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadRooms = useCallback(async () => {
    try {
      const response = await fetch('/api/chat/subject-chats');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to load subject chats');
      const nextRooms: Room[] = data.data || [];
      setRooms(nextRooms);
      setSelectedRoom((current) => {
        const next = current ? nextRooms.find((room) => room.id === current.id) : nextRooms[0];
        return current && next && current.id === next.id ? current : next || null;
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load subject chats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMessages = useCallback(async (roomId: number) => {
    try {
      const response = await fetch(`/api/chat/subject-chats/${roomId}/messages`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to load messages');
      setMessages(data.data || []);
      await loadRooms();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load messages');
    }
  }, [loadRooms]);

  useEffect(() => {
    supabase.realtime.setAuth(accessToken);
    loadRooms();
  }, [accessToken, loadRooms]);

  useEffect(() => {
    if (!selectedRoom) {
      setMessages([]);
      return undefined;
    }

    loadMessages(selectedRoom.id);
    const channel = supabase
      .channel(`subject-chat:${selectedRoom.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dodave_subject_chat_message', filter: `subject_chat_id=eq.${selectedRoom.id}` }, () => loadMessages(selectedRoom.id))
      .subscribe();
    const polling = window.setInterval(() => loadMessages(selectedRoom.id), 10000);

    return () => {
      window.clearInterval(polling);
      supabase.removeChannel(channel);
    };
  }, [selectedRoom, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredRooms = useMemo(() => rooms.filter((room) => room.name.toLowerCase().includes(search.toLowerCase())), [rooms, search]);

  const selectRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsMobileRoomOpen(true);
    setError('');
  };

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedRoom || !draft.trim() || isSending) return;
    setIsSending(true);
    setError('');
    try {
      const response = await fetch(`/api/chat/subject-chats/${selectedRoom.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: draft.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send message');
      setDraft('');
      await loadMessages(selectedRoom.id);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to send message');
    } finally {
      setIsSending(false);
    }
  };

  const saveEdit = async (messageId: number) => {
    if (!selectedRoom || !editingContent.trim()) return;
    const response = await fetch(`/api/chat/subject-chats/${selectedRoom.id}/messages/${messageId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editingContent.trim() }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message || 'Unable to edit message');
      return;
    }
    setEditingMessageId(null);
    setEditingContent('');
    await loadMessages(selectedRoom.id);
  };

  const deleteMessage = async (messageId: number) => {
    if (!selectedRoom || !window.confirm('Delete this message?')) return;
    const response = await fetch(`/api/chat/subject-chats/${selectedRoom.id}/messages/${messageId}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message || 'Unable to delete message');
      return;
    }
    await loadMessages(selectedRoom.id);
  };

  const senderName = (message: ChatMessage) => message.sender.person?.pseudo || message.sender.person?.firstName || 'User';

  if (isLoading) return <div className="card p-4">Loading subject chats...</div>;

  return (
    <div className={`card shadow-sm subject-chat-window ${isMobileRoomOpen ? 'subject-chat-mobile-active' : ''}`}>
      <div className="row g-0" style={{ minHeight: '680px' }}>
        <aside className="col-md-4 border-end subject-chat-sidebar">
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Subjects</h5>
            <span className="badge bg-primary">{rooms.length}</span>
          </div>
          <div className="p-3 border-bottom">
            <label htmlFor="subject-chat-search" className="visually-hidden">Search subjects</label>
            <input id="subject-chat-search" className="form-control" placeholder="Search subjects..." value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '570px' }}>
            {filteredRooms.length === 0 && <div className="p-3 text-muted">No subject rooms are available yet.</div>}
            {filteredRooms.map((room) => (
              <button type="button" key={room.id} className={`list-group-item list-group-item-action text-start ${selectedRoom?.id === room.id ? 'active' : ''}`} onClick={() => selectRoom(room)}>
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{room.name}</strong>
                  {room.unreadCount > 0 && <span className="badge rounded-pill bg-danger">{room.unreadCount}</span>}
                </div>
                <small className={selectedRoom?.id === room.id ? 'text-white-50' : 'text-muted'}>{room.messageCount} messages</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="col-md-8 d-flex flex-column subject-chat-content">
          {error && <div className="alert alert-danger m-3 mb-0" role="alert">{error}</div>}
          {selectedRoom ? (
            <>
              <div className="p-3 border-bottom d-flex align-items-center gap-2">
                <button type="button" className="btn btn-sm btn-outline-secondary d-md-none" onClick={() => setIsMobileRoomOpen(false)}>Back</button>
                <div><h5 className="mb-0">{selectedRoom.name}</h5><small className="text-muted">{selectedRoom.category.name}</small></div>
              </div>
              <div className="flex-grow-1 p-3 overflow-auto" style={{ maxHeight: '540px' }}>
                {messages.length === 0 && <div className="text-center text-muted py-5">Start the conversation for this subject.</div>}
                {messages.map((message) => {
                  const mine = message.senderId === currentUserId;
                  return (
                    <div key={message.id} className={`d-flex mb-3 ${mine ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div className={`p-3 rounded ${mine ? 'bg-primary text-white' : 'bg-light border'}`} style={{ maxWidth: '78%' }}>
                        <div className="small fw-semibold mb-1">{message.isFromAI ? 'DoDave Assistant' : senderName(message)}</div>
                        {message.isDeleted ? <em className="opacity-75">Message deleted</em> : editingMessageId === message.id ? (
                          <div>
                            <textarea className="form-control mb-2" value={editingContent} onChange={(event) => setEditingContent(event.target.value)} />
                            <button type="button" className="btn btn-sm btn-light me-2" onClick={() => saveEdit(message.id)}>Save</button>
                            <button type="button" className="btn btn-sm btn-outline-light" onClick={() => setEditingMessageId(null)}>Cancel</button>
                          </div>
                        ) : <div>{message.content}</div>}
                        <div className={`small mt-2 ${mine ? 'text-white-50' : 'text-muted'}`}>{new Date(message.createdAt).toLocaleString()}{message.editedAt ? ' · edited' : ''}</div>
                        {mine && !message.isDeleted && editingMessageId !== message.id && <div className="mt-2"><button type="button" className={`btn btn-link btn-sm p-0 me-2 ${mine ? 'text-white' : ''}`} onClick={() => { setEditingMessageId(message.id); setEditingContent(message.content); }}>Edit</button><button type="button" className={`btn btn-link btn-sm p-0 ${mine ? 'text-white' : ''}`} onClick={() => deleteMessage(message.id)}>Delete</button></div>}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <form className="p-3 border-top d-flex gap-2" onSubmit={sendMessage}>
                <label htmlFor="subject-chat-message" className="visually-hidden">Type a message</label>
                <textarea id="subject-chat-message" className="form-control" rows={1} placeholder="Type a message..." value={draft} onChange={(event) => setDraft(event.target.value)} />
                <button type="submit" className="btn btn-primary align-self-end" disabled={isSending || !draft.trim()}>Send</button>
              </form>
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 text-muted p-4 text-center">Select a subject to start chatting.</div>
          )}
        </section>
      </div>
    </div>
  );
}
