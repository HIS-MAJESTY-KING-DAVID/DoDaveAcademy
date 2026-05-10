import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  notification: {
    create: vi.fn(),
  },
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Notification Service', () => {
  it('creates a notification', async () => {
    mockPrisma.notification.create.mockResolvedValue({
      id: 1,
      recipientId: 42,
      title: 'Test',
      content: 'Hello',
      type: 0,
      isRead: false,
      createdAt: new Date(),
    });

    const { createNotification } = await import('@/lib/notifications');
    const result = await createNotification({
      recipientId: 42,
      title: 'Test',
      content: 'Hello',
    });

    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        recipientId: 42,
        title: 'Test',
        content: 'Hello',
        type: 0,
        isRead: false,
      }),
    });
    expect(result.recipientId).toBe(42);
    expect(result.title).toBe('Test');
  });

  it('notifies on course enrollment', async () => {
    mockPrisma.notification.create.mockResolvedValue({ id: 1 });

    const { notifyCourseEnrolled } = await import('@/lib/notifications');
    await notifyCourseEnrolled(5, 'React 101');

    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        recipientId: 5,
        title: 'Course Enrollment',
        content: expect.stringContaining('React 101'),
        type: 1,
      }),
    });
  });

  it('notifies on course publish', async () => {
    mockPrisma.notification.create.mockResolvedValue({ id: 1 });

    const { notifyCoursePublished } = await import('@/lib/notifications');
    await notifyCoursePublished(3, 'Next.js Mastery', 10);

    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        recipientId: 3,
        title: 'Course Submitted',
        type: 2,
      }),
    });
  });

  it('notifies on course validation', async () => {
    mockPrisma.notification.create.mockResolvedValue({ id: 1 });

    const { notifyCourseValidated } = await import('@/lib/notifications');
    await notifyCourseValidated(7, 'TypeScript Deep Dive');

    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        recipientId: 7,
        title: 'Course Published',
        content: expect.stringContaining('TypeScript Deep Dive'),
        type: 2,
      }),
    });
  });

  it('notifies on forum reply', async () => {
    mockPrisma.notification.create.mockResolvedValue({ id: 1 });

    const { notifyForumReply } = await import('@/lib/notifications');
    await notifyForumReply(9, 'React 101', 'How to useState?');

    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        recipientId: 9,
        title: 'New Forum Reply',
        content: expect.stringContaining('How to useState?'),
        type: 3,
      }),
    });
  });

  it('notifies on quiz result', async () => {
    mockPrisma.notification.create.mockResolvedValue({ id: 1 });

    const { notifyQuizResult } = await import('@/lib/notifications');
    await notifyQuizResult(2, 'CSS Basics', 85);

    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        recipientId: 2,
        content: expect.stringContaining('85'),
        type: 0,
      }),
    });
  });

  it('uses broadcast handler when set', async () => {
    mockPrisma.notification.create.mockResolvedValue({
      id: 1,
      recipientId: 42,
      title: 'Broadcast Test',
      content: 'Hello',
      type: 0,
      isRead: false,
      createdAt: new Date(),
    });

    const broadcastFn = vi.fn();
    const { createAndBroadcast, setBroadcastHandler } = await import('@/lib/notifications');
    setBroadcastHandler(broadcastFn);

    await createAndBroadcast({
      recipientId: 42,
      title: 'Broadcast Test',
      content: 'Hello',
      channel: 'notifications:42',
    });

    expect(broadcastFn).toHaveBeenCalledWith(
      'notifications:42',
      'new_notification',
      expect.objectContaining({ id: 1 }),
    );
  });
});
