class ChatUI {
    constructor() {
        this.forumsList = document.querySelector('.flex-1.overflow-y-auto');
        this.noForumSelected = document.getElementById('noForumSelected');
        this.chatInterface = document.getElementById('chatInterface');
        this.messagesList = document.querySelector('.messages-list');
        this.messageInput = document.querySelector('.chat-input-container input');
        this.sendButton = document.getElementById('sendMessage');
        
        this.currentForumId = null;
        this.websocket = null;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Forum selection
        this.forumsList.addEventListener('click', (e) => {
            const forumCard = e.target.closest('[data-forum-id]');
            if (forumCard) {
                this.selectForum(forumCard);
            }
        });

        // Message sending
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Search functionality
        const searchInput = document.querySelector('.relative input[type="text"]');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    selectForum(forumCard) {
        // Remove active state from previous selection
        const previousActive = this.forumsList.querySelector('.bg-gray-100');
        if (previousActive) {
            previousActive.classList.remove('bg-gray-100');
        }

        // Add active state to selected forum
        forumCard.classList.add('bg-gray-100');

        // Get forum details
        const forumId = forumCard.dataset.forumId;
        const forumTitle = forumCard.querySelector('.font-medium').textContent;
        const forumSubtitle = forumCard.querySelector('.text-sm').textContent;
        const forumInitial = forumTitle.charAt(0).toUpperCase();

        // Update chat interface
        this.noForumSelected.classList.add('hidden');
        this.chatInterface.classList.remove('hidden');
        
        // Update header
        document.querySelector('.forum-initial').textContent = forumInitial;
        document.querySelector('.forum-title').textContent = forumTitle;
        document.querySelector('.forum-subtitle').textContent = forumSubtitle;

        // Initialize WebSocket if needed
        if (this.currentForumId !== forumId) {
            this.currentForumId = forumId;
            this.initializeWebSocket(forumId);
        }

        // Load messages
        this.loadMessages(forumId);
    }

    initializeWebSocket(forumId) {
        if (this.websocket) {
            this.websocket.disconnect();
        }

        this.websocket = new ForumWebSocket(forumId);
        
        // Handle incoming messages
        document.addEventListener(`forum:message`, (e) => {
            if (e.detail.forumId === this.currentForumId) {
                this.appendMessage(e.detail.message);
            }
        });

        // Handle typing status
        document.addEventListener(`forum:typing`, (e) => {
            if (e.detail.forumId === this.currentForumId) {
                this.updateTypingStatus(e.detail);
            }
        });
    }

    loadMessages(forumId) {
        this.messagesList.innerHTML = '<div class="text-center text-gray-500 my-4">Chargement des messages...</div>';
        
        fetch(`/student/chat/messages/${forumId}`)
            .then(response => response.json())
            .then(data => {
                this.messagesList.innerHTML = '';
                data.messages.forEach(message => this.appendMessage(message));
                this.scrollToBottom();
            })
            .catch(error => {
                console.error('Error loading messages:', error);
                this.messagesList.innerHTML = '<div class="text-center text-red-500 my-4">Erreur lors du chargement des messages</div>';
            });
    }

    appendMessage(message) {
        const isOutgoing = message.isFromCurrentUser;
        const messageHtml = `
            <div class="message ${isOutgoing ? 'message-out' : 'message-in'}">
                <div class="message-bubble">
                    <div class="message-content">${message.content}</div>
                    <div class="flex items-center justify-end gap-1 mt-1">
                        <span class="text-xs text-gray-500">${this.formatTime(message.createdAt)}</span>
                        ${isOutgoing ? `
                            <span class="text-xs ${message.isRead ? 'text-primary' : 'text-gray-400'}">
                                <i class="fas fa-check${message.isRead ? '-double' : ''}"></i>
                            </span>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        this.messagesList.insertAdjacentHTML('beforeend', messageHtml);
        this.scrollToBottom();
    }

    sendMessage() {
        const content = this.messageInput.value.trim();
        if (!content || !this.websocket) return;

        const success = this.websocket.sendMessage(content);
        if (success) {
            this.messageInput.value = '';
        }
    }

    handleSearch(query) {
        const forums = this.forumsList.querySelectorAll('[data-forum-id]');
        query = query.toLowerCase();

        forums.forEach(forum => {
            const title = forum.querySelector('.font-medium').textContent.toLowerCase();
            const subtitle = forum.querySelector('.text-sm').textContent.toLowerCase();
            const matches = title.includes(query) || subtitle.includes(query);
            forum.style.display = matches ? 'flex' : 'none';
        });
    }

    scrollToBottom() {
        const container = document.getElementById('messagesContainer');
        container.scrollTop = container.scrollHeight;
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }

    updateTypingStatus({ userId, isTyping }) {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (isTyping) {
            typingIndicator.textContent = 'Quelqu\'un est en train d\'écrire...';
            typingIndicator.classList.remove('d-none');
        } else {
            typingIndicator.classList.add('d-none');
        }
    }
}

// Initialize chat UI when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.chatUI = new ChatUI();
});
