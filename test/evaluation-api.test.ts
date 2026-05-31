import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  student: { findUnique: vi.fn() },
  evaluationResult: { findFirst: vi.fn(), create: vi.fn() },
  evaluationQuestion: { findMany: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));

vi.mock('@/lib/auth', () => ({
  getSession: vi.fn(),
}));

const { getSession } = await import('@/lib/auth');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/evaluation/submit', () => {
  it('grades all correct answers', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1 });
    mockPrisma.student.findUnique.mockResolvedValue({ id: 5, userId: 1 });
    mockPrisma.evaluationResult.findFirst.mockResolvedValue(null);
    mockPrisma.evaluationQuestion.findMany.mockResolvedValue([
      { id: 1, correctPropositions: '1,2' },
      { id: 2, correctPropositions: '3' },
    ]);
    mockPrisma.evaluationResult.create.mockResolvedValue({ id: 50, score: 100 });

    const { POST } = await import('@/app/api/evaluation/submit/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        evaluationId: 10,
        studentId: 5,
        answers: { '1': ['1', '2'], '2': ['3'] },
      }),
    });
    const res = await POST(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.score).toBe(100);
    expect(mockPrisma.evaluationResult.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ evaluationId: 10, studentId: 5, score: 100 }),
    });
  });

  it('grades partial correct answers', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1 });
    mockPrisma.student.findUnique.mockResolvedValue({ id: 5, userId: 1 });
    mockPrisma.evaluationResult.findFirst.mockResolvedValue(null);
    mockPrisma.evaluationQuestion.findMany.mockResolvedValue([
      { id: 1, correctPropositions: '1,2' },
      { id: 2, correctPropositions: '3' },
    ]);
    mockPrisma.evaluationResult.create.mockResolvedValue({ id: 51, score: 50 });

    const { POST } = await import('@/app/api/evaluation/submit/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        evaluationId: 10,
        studentId: 5,
        answers: { '1': ['1'], '2': ['3'] },
      }),
    });
    const res = await POST(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.score).toBe(50);
  });

  it('rejects duplicate submission', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1 });
    mockPrisma.student.findUnique.mockResolvedValue({ id: 5, userId: 1 });
    mockPrisma.evaluationResult.findFirst.mockResolvedValue({ id: 99 });

    const { POST } = await import('@/app/api/evaluation/submit/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ evaluationId: 10, studentId: 5, answers: {} }),
    });
    const res = await POST(req);
    expect(res.status).toBe(409);
  });

  it('returns 401 when not authenticated', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const { POST } = await import('@/app/api/evaluation/submit/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ evaluationId: 10, studentId: 5, answers: {} }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 401 when student ID mismatch', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1 });
    mockPrisma.student.findUnique.mockResolvedValue({ id: 5, userId: 1 });

    const { POST } = await import('@/app/api/evaluation/submit/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ evaluationId: 10, studentId: 99, answers: {} }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });
});
