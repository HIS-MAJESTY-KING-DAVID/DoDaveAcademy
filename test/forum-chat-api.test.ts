import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPrisma = {
  course: { findFirst: vi.fn() },
  student: { findUnique: vi.fn() },
  studentCourse: { findUnique: vi.fn() },
  user: { findFirst: vi.fn(), findMany: vi.fn() },
  conversation: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));
vi.mock('@/lib/auth', () => ({ getSession: vi.fn() }));

const { getSession } = await import('@/lib/auth');
const { getCourseForumAccess } = await import('@/lib/forum-access');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('course forum access', () => {
  it('allows the course instructor', async () => {
    mockPrisma.course.findFirst.mockResolvedValue({ id: 10, instructor: { userId: 7 } });
    await expect(getCourseForumAccess('course', 7)).resolves.toMatchObject({ allowed: true, isInstructor: true, studentId: null });
    expect(mockPrisma.student.findUnique).not.toHaveBeenCalled();
  });

  it('allows an enrolled student and rejects a non-enrolled student', async () => {
    mockPrisma.course.findFirst.mockResolvedValue({ id: 10, instructor: null });
    mockPrisma.student.findUnique.mockResolvedValue({ id: 22 });
    mockPrisma.studentCourse.findUnique.mockResolvedValueOnce({ studentId: 22 });
    await expect(getCourseForumAccess('course', 8)).resolves.toMatchObject({ allowed: true, studentId: 22 });

    mockPrisma.studentCourse.findUnique.mockResolvedValueOnce(null);
    await expect(getCourseForumAccess('course', 8)).resolves.toMatchObject({ allowed: false, studentId: 22 });
  });
});

describe('direct conversation protections', () => {
  it('rejects starting a conversation with oneself', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 7 });
    const { POST } = await import('@/app/api/chat/conversations/route');
    const response = await POST(new Request('http://localhost/api/chat/conversations', {
      method: 'POST',
      body: JSON.stringify({ recipientId: 7 }),
    }));
    expect(response.status).toBe(400);
    expect(mockPrisma.user.findFirst).not.toHaveBeenCalled();
  });

  it('reuses only an exact two-person conversation', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 7 });
    mockPrisma.user.findFirst.mockResolvedValue({ id: 8 });
    mockPrisma.conversation.findMany.mockResolvedValue([
      { id: 1, participants: [{ userId: 7 }, { userId: 8 }, { userId: 9 }] },
      { id: 2, participants: [{ userId: 7 }, { userId: 8 }] },
    ]);
    mockPrisma.conversation.findUnique.mockResolvedValue({ id: 2, participants: [] });

    const { POST } = await import('@/app/api/chat/conversations/route');
    const response = await POST(new Request('http://localhost/api/chat/conversations', {
      method: 'POST',
      body: JSON.stringify({ recipientId: 8 }),
    }));
    expect(response.status).toBe(200);
    expect(mockPrisma.conversation.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 2 } }));
    expect(mockPrisma.conversation.create).not.toHaveBeenCalled();
  });
});
