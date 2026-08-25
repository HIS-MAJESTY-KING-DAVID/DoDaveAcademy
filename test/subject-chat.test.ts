import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockPrisma = {
  user: { findUnique: vi.fn() },
  student: { findUnique: vi.fn() },
  category: { findMany: vi.fn() },
  subjectChat: { upsert: vi.fn(), findMany: vi.fn(), findFirst: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));

const { getSubjectChatPrincipal, ensureSubjectChatRooms, getSubjectChatForUser } = await import('@/lib/subject-chat');

beforeEach(() => vi.clearAllMocks());

describe('subject-chat access', () => {
  it('allows premium students and blocks non-premium students', async () => {
    mockPrisma.user.findUnique.mockResolvedValueOnce({ id: 7, roles: 'ROLE_STUDENT', isAdmin: false, student: { id: 12, isPremium: true }, instructor: null });
    await expect(getSubjectChatPrincipal(7)).resolves.toMatchObject({ studentId: 12, canUseSubjectChat: true });

    mockPrisma.user.findUnique.mockResolvedValueOnce({ id: 8, roles: 'ROLE_STUDENT', isAdmin: false, student: { id: 13, isPremium: false }, instructor: null });
    await expect(getSubjectChatPrincipal(8)).resolves.toMatchObject({ studentId: 13, canUseSubjectChat: false });
  });

  it('does not expose a room to a non-premium student', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 8, roles: 'ROLE_STUDENT', isAdmin: false, student: { id: 13, isPremium: false }, instructor: null });
    await expect(getSubjectChatForUser(4, 8)).resolves.toMatchObject({ room: null, principal: { canUseSubjectChat: false } });
    expect(mockPrisma.subjectChat.findFirst).not.toHaveBeenCalled();
  });
});

describe('subject-chat provisioning', () => {
  it('provisions one room for each enrolled course category', async () => {
    mockPrisma.student.findUnique
      .mockResolvedValueOnce({ class: { skillLevelId: 3 }, studentCourses: [{ course: { categoryId: 2 } }, { course: { categoryId: 2 } }, { course: { categoryId: 5 } }] })
      .mockResolvedValueOnce({ userId: 7 });
    mockPrisma.category.findMany.mockResolvedValue([{ id: 2, name: 'Mathematics' }, { id: 5, name: 'Physics' }]);
    mockPrisma.subjectChat.upsert.mockResolvedValue({});
    mockPrisma.subjectChat.findMany.mockResolvedValue([{ id: 1, name: 'Mathematics', cycle: 3, category: { id: 2, name: 'Mathematics', slug: 'mathematics' }, _count: { messages: 0 }, messages: [] }]);

    await ensureSubjectChatRooms(12);
    expect(mockPrisma.subjectChat.upsert).toHaveBeenCalledTimes(2);
    expect(mockPrisma.subjectChat.upsert).toHaveBeenCalledWith(expect.objectContaining({ where: { studentId_categoryId: { studentId: 12, categoryId: 2 } } }));
    expect(mockPrisma.subjectChat.upsert).toHaveBeenCalledWith(expect.objectContaining({ where: { studentId_categoryId: { studentId: 12, categoryId: 5 } } }));
  });
});
