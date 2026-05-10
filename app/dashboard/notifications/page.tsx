'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type Notification = {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  type: number;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.data) {
        setNotifications(data.data);
        setUnreadCount(data.unreadCount);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: number) => {
    await fetch(`/api/notifications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: true }),
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const deleteNotification = async (id: number) => {
    await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
    setNotifications((prev) => {
      const removed = prev.find((n) => n.id === id);
      if (removed && !removed.isRead) setUnreadCount((c) => Math.max(0, c - 1));
      return prev.filter((n) => n.id !== id);
    });
  };

  const markAllAsRead = async () => {
    await fetch('/api/notifications/read-all', { method: 'POST' });
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const getTypeIcon = (type: number) => {
    switch (type) {
      case 1: return 'bi bi-cart-check';
      case 2: return 'bi bi-check-circle';
      case 3: return 'bi bi-chat-dots';
      default: return 'bi bi-bell';
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          Notifications
          {unreadCount > 0 && (
            <span className="badge bg-primary ms-2">{unreadCount} unread</span>
          )}
        </h2>
        <div>
          {unreadCount > 0 && (
            <button className="btn btn-outline-primary btn-sm me-2" onClick={markAllAsRead}>
              <i className="bi bi-check-all me-1"></i>Mark all as read
            </button>
          )}
          <Link href="/dashboard" className="btn btn-outline-secondary btn-sm">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5 text-muted">
            <i className="bi bi-bell-slash fs-1 d-block mb-3"></i>
            <p className="mb-0">No notifications yet.</p>
          </div>
        </div>
      ) : (
        <div className="list-group">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`list-group-item list-group-item-action d-flex align-items-start gap-3 ${
                !notif.isRead ? 'bg-light border-start border-primary border-4' : ''
              }`}
            >
              <div className="mt-1">
                <i className={`${getTypeIcon(notif.type)} fs-5 text-primary`}></i>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                  <h6 className={`mb-1 ${!notif.isRead ? 'fw-bold' : ''}`}>
                    {notif.title}
                  </h6>
                  <small className="text-muted text-nowrap ms-2">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <p className="mb-1 text-muted">{notif.content}</p>
              </div>
              <div className="d-flex gap-1 flex-shrink-0">
                {!notif.isRead && (
                  <button
                    className="btn btn-sm btn-outline-success"
                    title="Mark as read"
                    onClick={() => markAsRead(notif.id)}
                  >
                    <i className="bi bi-check"></i>
                  </button>
                )}
                <button
                  className="btn btn-sm btn-outline-danger"
                  title="Delete"
                  onClick={() => deleteNotification(notif.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
