'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type NotificationItem = {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  type: number;
  createdAt: string;
};

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetch('/api/notifications')
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setNotifications(data.data.slice(0, 10));
          setUnreadCount(data.unreadCount);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const getTypeIcon = (type: number) => {
    switch (type) {
      case 1: return 'bi-cart-check';
      case 2: return 'bi-check-circle';
      case 3: return 'bi-chat-dots';
      default: return 'bi-bell';
    }
  };

  return (
    <div className="position-relative">
      <button
        ref={btnRef}
        className="btn btn-sm position-relative"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
      >
        <i className="bi bi-bell fs-5"></i>
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={menuRef}
          className="position-absolute end-0 mt-2 bg-white shadow rounded border"
          style={{ width: '360px', zIndex: 1050, maxHeight: '480px', overflowY: 'auto' }}
        >
          <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
            <strong>Notifications</strong>
            <Link
              href="/dashboard/notifications"
              className="small text-decoration-none"
              onClick={() => setOpen(false)}
            >
              View all
            </Link>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-4 text-muted small">
              <i className="bi bi-bell-slash d-block mb-2 fs-4"></i>
              No notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`px-3 py-2 border-bottom d-flex gap-2 align-items-start ${
                  !notif.isRead ? 'bg-light' : ''
                }`}
              >
                <i className={`bi ${getTypeIcon(notif.type)} mt-1 text-primary flex-shrink-0`}></i>
                <div className="flex-grow-1 min-width-0">
                  <div className={`small ${!notif.isRead ? 'fw-bold' : ''}`}>{notif.title}</div>
                  <div className="text-muted small text-truncate">{notif.content}</div>
                  <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {!notif.isRead && (
                  <button
                    className="btn btn-sm p-0 text-success"
                    title="Mark as read"
                    onClick={() => markAsRead(notif.id)}
                  >
                    <i className="bi bi-check"></i>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
