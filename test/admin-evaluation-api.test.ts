import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPrisma = {
  evaluation: { findUnique: vi.fn() },
  evaluationQuestion: { findMany: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), delete: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));
vi.mock('@/lib/auth', () => ({ getSession: vi.fn() }));

const { getSession } = await import('@/lib/auth');

beforeEach(() => vi.clearAllMocks());

function adminSession() {
  (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1, roles: 'ROLE_ADMIN' });
}

function json(value: unknown) {
  return new Request('http://localhost', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });
}

describe('admin evaluation question management', () => {
  it('rejects non-admin question creation', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 7, roles: 'ROLE_INSTRUCTOR' });
    const { POST } = await import('@/app/api/admin/evaluations/[id]/questions/route');
    const response = await POST(json({ question: 'Q', proposition1: 'A', proposition2: 'B', correctPropositions: '1' }), { params: Promise.resolve({ id: '4' }) });
    expect(response.status).toBe(401);
    expect(mockPrisma.evaluation.findUnique).not.toHaveBeenCalled();
  });

  it('creates a validated question for an unlocked evaluation', async () => {
    adminSession();
    mockPrisma.evaluation.findUnique.mockResolvedValue({ id: 4, isPassed: false });
    mockPrisma.evaluationQuestion.create.mockResolvedValue({ id: 20, evaluationId: 4 });
    const { POST } = await import('@/app/api/admin/evaluations/[id]/questions/route');
    const response = await POST(json({ question: '2 + 2?', proposition1: '3', proposition2: '4', correctPropositions: ['2', '2'] }), { params: Promise.resolve({ id: '4' }) });
    expect(response.status).toBe(201);
    expect(mockPrisma.evaluationQuestion.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ evaluationId: 4, correctPropositions: '2' }) }));
  });

  it('rejects a question from a different evaluation parent', async () => {
    adminSession();
    mockPrisma.evaluationQuestion.findFirst.mockResolvedValue(null);
    const { PUT } = await import('@/app/api/admin/evaluations/[id]/questions/[questionId]/route');
    const response = await PUT(json({ question: 'Q', proposition1: 'A', proposition2: 'B', correctPropositions: '1' }), { params: Promise.resolve({ id: '4', questionId: '20' }) });
    expect(response.status).toBe(404);
    expect(mockPrisma.evaluationQuestion.update).not.toHaveBeenCalled();
  });

  it('blocks question deletion after the evaluation is passed', async () => {
    adminSession();
    mockPrisma.evaluationQuestion.findFirst.mockResolvedValue({ id: 20, evaluation: { isPassed: true } });
    const { DELETE } = await import('@/app/api/admin/evaluations/[id]/questions/[questionId]/route');
    const response = await DELETE(new Request('http://localhost', { method: 'DELETE' }), { params: Promise.resolve({ id: '4', questionId: '20' }) });
    expect(response.status).toBe(409);
    expect(mockPrisma.evaluationQuestion.delete).not.toHaveBeenCalled();
  });
});
