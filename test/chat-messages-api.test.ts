import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPrisma = {
  participant: { findUnique: vi.fn() },
  chatMessage: { updateMany: vi.fn(), findMany: vi.fn(), create: vi.fn() },
  conversation: { update: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));
vi.mock('@/lib/auth', () => ({ getSession: vi.fn() }));

const { getSession } = await import('@/lib/auth');

beforeEach(() => {
  vi.clearAllMocks();
  (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 7 });
});

describe('direct chat messages', () => {
  it('marks incoming messages read before returning the conversation history', async () => {
    mockPrisma.participant.findUnique.mockResolvedValue({ id: 1 });
    mockPrisma.chatMessage.updateMany.mockResolvedValue({ count: 2 });
    mockPrisma.chatMessage.findMany.mockResolvedValue([{ id: 1, senderId: 8, isRead: true }]);

    const { GET } = await import('@/app/api/chat/conversations/[id]/messages/route');
    const response = await GET(new Request('http://localhost'), { params: Promise.resolve({ id: '5' }) });
    expect(response.status).toBe(200);
    expect(mockPrisma.chatMessage.updateMany).toHaveBeenCalledWith({
      where: { conversationId: 5, senderId: { not: 7 }, isRead: false },
      data: { isRead: true },
    });
  });

  it('rejects oversized messages before persistence', async () => {
    mockPrisma.participant.findUnique.mockResolvedValue({ id: 1 });
    const { POST } = await import('@/app/api/chat/conversations/[id]/messages/route');
    const response = await POST(new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ content: 'x'.repeat(5001) }),
    }), { params: Promise.resolve({ id: '5' }) });
    expect(response.status).toBe(400);
    expect(mockPrisma.chatMessage.create).not.toHaveBeenCalled();
  });
});
