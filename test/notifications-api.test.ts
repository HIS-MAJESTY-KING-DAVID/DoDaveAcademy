import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  notification: {
    findMany: vi.fn(),
    count: vi.fn(),
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    updateMany: vi.fn(),
  },
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

const mockSession = { userId: 1, email: 'test@test.com', roles: 'ROLE_USER' };
vi.mock('@/lib/auth', () => ({
  getSession: vi.fn(() => mockSession),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Notification API logic', () => {
  it('lists notifications for the current user', async () => {
    mockPrisma.notification.findMany.mockResolvedValue([
      { id: 1, title: 'Hello', content: 'World', isRead: false, type: 0, createdAt: new Date(), recipientId: 1 },
    ]);
    mockPrisma.notification.count.mockResolvedValue(1);

    const { GET } = await import('@/app/api/notifications/route');
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data).toHaveLength(1);
    expect(body.unreadCount).toBe(1);
    expect(mockPrisma.notification.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { recipientId: 1 } }),
    );
  });

  it('creates a notification', async () => {
    mockPrisma.notification.create.mockResolvedValue({
      id: 2,
      recipientId: 1,
      title: 'Test',
      content: 'Content',
      type: 0,
      isRead: false,
      createdAt: new Date(),
    });

    const { POST } = await import('@/app/api/notifications/route');
    const req = new Request('http://localhost/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipientId: 1, title: 'Test', content: 'Content' }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.data.title).toBe('Test');
  });

  it('marks a notification as read', async () => {
    mockPrisma.notification.findUnique.mockResolvedValue({
      id: 1, recipientId: 1, isRead: false,
    });
    mockPrisma.notification.update.mockResolvedValue({
      id: 1, isRead: true,
    });

    const { PUT } = await import('@/app/api/notifications/[id]/route');
    const req = new Request('http://localhost/api/notifications/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: true }),
    });
    const response = await PUT(req, { params: Promise.resolve({ id: '1' }) });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.isRead).toBe(true);
  });

  it('deletes a notification', async () => {
    mockPrisma.notification.findUnique.mockResolvedValue({
      id: 1, recipientId: 1,
    });
    mockPrisma.notification.delete.mockResolvedValue({ id: 1 });

    const { DELETE } = await import('@/app/api/notifications/[id]/route');
    const req = new Request('http://localhost/api/notifications/1', { method: 'DELETE' });
    const response = await DELETE(req, { params: Promise.resolve({ id: '1' }) });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Notification deleted');
  });

  it('marks all notifications as read', async () => {
    mockPrisma.notification.updateMany.mockResolvedValue({ count: 3 });

    const { POST: PostReadAll } = await import('@/app/api/notifications/read-all/route');
    const response = await PostReadAll();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('All notifications marked as read');
    expect(mockPrisma.notification.updateMany).toHaveBeenCalledWith({
      where: { recipientId: 1, isRead: false },
      data: { isRead: true },
    });
  });

  it('rejects creating notification with invalid data', async () => {
    const { POST } = await import('@/app/api/notifications/route');
    const req = new Request('http://localhost/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipientId: 1, title: '', content: '' }),
    });
    const response = await POST(req);
    expect(response.status).toBe(422);
  });
});
