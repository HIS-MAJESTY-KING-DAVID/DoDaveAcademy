import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPrisma = {
  course: { findUnique: vi.fn() },
  chapter: { findFirst: vi.fn(), create: vi.fn() },
  lesson: { findFirst: vi.fn(), create: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));
vi.mock('@/lib/auth', () => ({ getSession: vi.fn() }));

const { getSession } = await import('@/lib/auth');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('admin recursive course content', () => {
  it('rejects non-admin chapter creation', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 7, roles: 'ROLE_STUDENT' });
    const { POST } = await import('@/app/api/admin/courses/[id]/content/route');
    const form = new FormData();
    form.set('title', 'Chapter');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form }), { params: Promise.resolve({ id: '4' }) });
    expect(response.status).toBe(403);
    expect(mockPrisma.chapter.create).not.toHaveBeenCalled();
  });

  it('rejects a lesson when the chapter belongs to another course', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1, roles: 'ROLE_ADMIN' });
    mockPrisma.chapter.findFirst.mockResolvedValue(null);
    const { POST } = await import('@/app/api/admin/courses/[id]/content/[chapterId]/lessons/route');
    const form = new FormData();
    form.set('title', 'Lesson');
    form.set('content', 'Content');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form }), { params: Promise.resolve({ id: '4', chapterId: '9' }) });
    expect(response.status).toBe(404);
    expect(mockPrisma.lesson.create).not.toHaveBeenCalled();
  });
});
