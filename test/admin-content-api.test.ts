import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPrisma = {
  course: { findUnique: vi.fn() },
  chapter: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
  lesson: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
  quiz: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
  media: { upsert: vi.fn(), deleteMany: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));
vi.mock('@/lib/auth', () => ({ getSession: vi.fn() }));

const { getSession } = await import('@/lib/auth');

beforeEach(() => vi.clearAllMocks());

function adminSession() {
  (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1, roles: 'ROLE_ADMIN' });
}

function form(fields: Record<string, string>) {
  const value = new FormData();
  for (const [key, field] of Object.entries(fields)) value.set(key, field);
  return value;
}

describe('admin recursive course content', () => {
  it('rejects non-admin chapter creation', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 7, roles: 'ROLE_STUDENT' });
    const { POST } = await import('@/app/api/admin/courses/[id]/content/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ title: 'Chapter' }) }), { params: Promise.resolve({ id: '4' }) });
    expect(response.status).toBe(403);
    expect(mockPrisma.chapter.create).not.toHaveBeenCalled();
  });

  it('rejects a lesson when the chapter belongs to another course', async () => {
    adminSession();
    mockPrisma.chapter.findFirst.mockResolvedValue(null);
    const { POST } = await import('@/app/api/admin/courses/[id]/content/[chapterId]/lessons/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ title: 'Lesson', content: 'Content' }) }), { params: Promise.resolve({ id: '4', chapterId: '9' }) });
    expect(response.status).toBe(404);
    expect(mockPrisma.lesson.create).not.toHaveBeenCalled();
  });

  it('updates a chapter only within the requested course', async () => {
    adminSession();
    mockPrisma.chapter.findFirst.mockResolvedValue({ id: 9 });
    const { POST } = await import('@/app/api/admin/courses/[id]/content/[chapterId]/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ title: 'Updated chapter', description: 'Updated' }) }), { params: Promise.resolve({ id: '4', chapterId: '9' }) });
    expect(response.status).toBe(307);
    expect(mockPrisma.chapter.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 9 }, data: expect.objectContaining({ title: 'Updated chapter' }) }));
  });

  it('validates quiz propositions and creates a learner-compatible question', async () => {
    adminSession();
    mockPrisma.chapter.findFirst.mockResolvedValue({ id: 9 });
    mockPrisma.quiz.create.mockResolvedValue({ id: 22 });
    const { POST } = await import('@/app/api/admin/courses/[id]/content/[chapterId]/quizzes/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ question: '2 + 2?', proposition1: '3', proposition2: '4', proposition3: '5', correctPropositions: '2' }) }), { params: Promise.resolve({ id: '4', chapterId: '9' }) });
    expect(response.status).toBe(307);
    expect(mockPrisma.quiz.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ proposition1: '3', proposition2: '4', correctPropositions: '2' }) }));
  });

  it('rejects quiz updates with a correct option that has no proposition', async () => {
    adminSession();
    mockPrisma.quiz.findFirst.mockResolvedValue({ id: 22 });
    const { POST } = await import('@/app/api/admin/courses/[id]/content/[chapterId]/quizzes/[quizId]/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ question: 'Question', proposition1: 'A', proposition2: 'B', correctPropositions: '4' }) }), { params: Promise.resolve({ id: '4', chapterId: '9', quizId: '22' }) });
    expect(response.status).toBe(400);
    expect(mockPrisma.quiz.update).not.toHaveBeenCalled();
  });

  it('deletes a chapter only after resolving it under the requested course', async () => {
    adminSession();
    mockPrisma.chapter.findFirst.mockResolvedValue({ id: 9 });
    const { POST } = await import('@/app/api/admin/courses/[id]/content/[chapterId]/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ _action: 'delete' }) }), { params: Promise.resolve({ id: '4', chapterId: '9' }) });
    expect(response.status).toBe(307);
    expect(mockPrisma.chapter.delete).toHaveBeenCalledWith({ where: { id: 9 } });
  });

  it('deletes a lesson only when its chapter is inside the requested course', async () => {
    adminSession();
    mockPrisma.lesson.findFirst.mockResolvedValue({ id: 12 });
    const { POST } = await import('@/app/api/admin/courses/[id]/content/[chapterId]/lessons/[lessonId]/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ _action: 'delete' }) }), { params: Promise.resolve({ id: '4', chapterId: '9', lessonId: '12' }) });
    expect(response.status).toBe(307);
    expect(mockPrisma.lesson.delete).toHaveBeenCalledWith({ where: { id: 12 } });
  });

  it('deletes a quiz only when its chapter and course parents match', async () => {
    adminSession();
    mockPrisma.quiz.findFirst.mockResolvedValue({ id: 22 });
    const { POST } = await import('@/app/api/admin/courses/[id]/content/[chapterId]/quizzes/[quizId]/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ _action: 'delete' }) }), { params: Promise.resolve({ id: '4', chapterId: '9', quizId: '22' }) });
    expect(response.status).toBe(307);
    expect(mockPrisma.quiz.delete).toHaveBeenCalledWith({ where: { id: 22 } });
  });

  it('deletes course media references for an existing course', async () => {
    adminSession();
    mockPrisma.course.findUnique.mockResolvedValue({ id: 4 });
    const { POST } = await import('@/app/api/admin/courses/[id]/media/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ _action: 'delete' }) }), { params: Promise.resolve({ id: '4' }) });
    expect(response.status).toBe(307);
    expect(mockPrisma.media.deleteMany).toHaveBeenCalledWith({ where: { courseId: 4 } });
  });

  it('rejects media save without an image reference', async () => {
    adminSession();
    mockPrisma.course.findUnique.mockResolvedValue({ id: 4 });
    const { POST } = await import('@/app/api/admin/courses/[id]/media/route');
    const response = await POST(new Request('http://localhost', { method: 'POST', body: form({ videoUrl: 'https://example.com/video.mp4' }) }), { params: Promise.resolve({ id: '4' }) });
    expect(response.status).toBe(400);
    expect(mockPrisma.media.upsert).not.toHaveBeenCalled();
  });
});
