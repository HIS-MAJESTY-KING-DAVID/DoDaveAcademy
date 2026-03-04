
'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface User {
    id: number;
    person: {
        pseudo: string;
        firstName: string;
        lastName: string;
    };
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
    participants: {
        user: User;
    }[];
    messages: Message[];
}

export default function ChatWindow() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const currentUser = { id: 0 }; // Placeholder, in real app useAuth()

    useEffect(() => {
        // Fetch initial conversations
        fetchConversations();

        // Subscribe to conversation updates (e.g. new message in existing conversation updates 'updatedAt')
        const channel = supabase
            .channel('public:conversation')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'conversation'
                },
                (payload) => {
                    console.log('Conversation update:', payload);
                    fetchConversations();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        if (selectedConversation) {
            fetchMessages(selectedConversation.id);
            
            // Subscribe to new messages in this conversation
            const channel = supabase
                .channel(`chat:${selectedConversation.id}`)
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'chat_message',
                        filter: `conversation_id=eq.${selectedConversation.id}`
                    },
                    (payload) => {
                        console.log('New message:', payload);
                        fetchMessages(selectedConversation.id);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [selectedConversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const res = await fetch('/api/chat/conversations');
            const data = await res.json();
            if (data.data) {
                setConversations(data.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Failed to load conversations', error);
        }
    };

    const fetchMessages = async (conversationId: number) => {
        try {
            const res = await fetch(`/api/chat/conversations/${conversationId}/messages`);
            const data = await res.json();
            if (data.data) {
                setMessages(data.data);
            }
        } catch (error) {
            console.error('Failed to load messages', error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        try {
            const res = await fetch(`/api/chat/conversations/${selectedConversation.id}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMessage })
            });
            
            if (res.ok) {
                setNewMessage('');
                fetchMessages(selectedConversation.id); // Immediate refresh
            }
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    const getOtherParticipant = (conversation: Conversation) => {
        // In a real app, filter out current user. 
        // For now, just take the first one that isn't me (if I had my ID).
        // Since I don't have my ID easily here without context, I'll just show names.
        return conversation.participants.map(p => p.user.person?.pseudo || 'User').join(', ');
    };

    if (isLoading) return <div>Loading chats...</div>;

    return (
        <div className="card shadow-sm h-100" style={{ minHeight: '600px' }}>
            <div className="row g-0 h-100">
                {/* Conversation List */}
                <div className="col-md-4 border-end">
                    <div className="p-3 border-bottom">
                        <h5 className="mb-0">Messages</h5>
                    </div>
                    <div className="list-group list-group-flush overflow-auto" style={{ height: 'calc(600px - 60px)' }}>
                        {conversations.length === 0 && <div className="p-3 text-muted">No conversations yet.</div>}
                        {conversations.map(conv => (
                            <button
                                key={conv.id}
                                className={`list-group-item list-group-item-action ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                                onClick={() => setSelectedConversation(conv)}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1">{getOtherParticipant(conv)}</h6>
                                    <small>{new Date(conv.updatedAt).toLocaleDateString()}</small>
                                </div>
                                <p className="mb-1 small text-truncate">
                                    {conv.messages[0]?.content || 'No messages yet'}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="col-md-8 d-flex flex-column" style={{ height: '600px' }}>
                    {selectedConversation ? (
                        <>
                            <div className="p-3 border-bottom bg-light">
                                <h6 className="mb-0">Chat with {getOtherParticipant(selectedConversation)}</h6>
                            </div>
                            
                            <div className="flex-grow-1 p-3 overflow-auto bg-white">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`d-flex mb-3 ${msg.senderId === currentUser.id ? 'justify-content-end' : 'justify-content-start'}`}>
                                        <div className={`p-3 rounded-3 ${msg.senderId === currentUser.id ? 'bg-primary text-white' : 'bg-light text-dark'}`} style={{ maxWidth: '75%' }}>
                                            <div className="small fw-bold mb-1">{msg.sender.person?.pseudo}</div>
                                            <div>{msg.content}</div>
                                            <div className="small mt-1 opacity-75 text-end" style={{ fontSize: '0.7rem' }}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-3 border-top bg-light">
                                <form onSubmit={handleSendMessage} className="d-flex gap-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                            <div className="text-center">
                                <i className="fas fa-comments fa-3x mb-3"></i>
                                <p>Select a conversation to start chatting</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
