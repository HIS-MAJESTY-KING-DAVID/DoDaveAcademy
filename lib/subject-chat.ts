import { prisma } from '@/lib/prisma';

export type SubjectChatPrincipal = {
  userId: number;
  studentId: number | null;
  isAdmin: boolean;
  isInstructor: boolean;
  canUseSubjectChat: boolean;
};

export async function getSubjectChatPrincipal(userId: number): Promise<SubjectChatPrincipal> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      roles: true,
      isAdmin: true,
      student: { select: { id: true, isPremium: true } },
      instructor: { select: { id: true } },
    },
  });

  if (!user) {
    return { userId, studentId: null, isAdmin: false, isInstructor: false, canUseSubjectChat: false };
  }

  const isAdmin = Boolean(user.isAdmin) || user.roles.split(',').some((role) => role.trim() === 'ROLE_ADMIN');
  const isInstructor = Boolean(user.instructor) || user.roles.split(',').some((role) => role.trim() === 'ROLE_INSTRUCTOR');
  const canUseSubjectChat = isAdmin || isInstructor || Boolean(user.student?.isPremium);

  return {
    userId,
    studentId: user.student?.id ?? null,
    isAdmin,
    isInstructor,
    canUseSubjectChat,
  };
}

export async function ensureSubjectChatRooms(studentId: number) {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: {
      class: { select: { skillLevelId: true } },
      studentCourses: {
        select: {
          course: { select: { categoryId: true } },
        },
      },
    },
  });

  if (!student) return [];

  const categoryIds = [...new Set(student.studentCourses
    .map((item) => item.course?.categoryId)
    .filter((id): id is number => id !== null && id !== undefined))];
  const eligibleCategories = categoryIds.length > 0
    ? await prisma.category.findMany({ where: { id: { in: categoryIds } }, select: { id: true, name: true } })
    : [];

  for (const category of eligibleCategories) {
    await prisma.subjectChat.upsert({
      where: { studentId_categoryId: { studentId, categoryId: category.id } },
      create: {
        studentId,
        categoryId: category.id,
        cycle: student.class?.skillLevelId ?? null,
        name: category.name,
      },
      update: { name: category.name, cycle: student.class?.skillLevelId ?? null },
    });
  }

  const user = await prisma.student.findUnique({ where: { id: studentId }, select: { userId: true } });
  return prisma.subjectChat.findMany({
    where: { studentId },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      _count: { select: { messages: true } },
      messages: {
        where: { senderId: { not: user?.userId ?? -1 }, isRead: false, isDeleted: false },
        select: { id: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
}

export async function getSubjectChatForUser(subjectChatId: number, userId: number) {
  const principal = await getSubjectChatPrincipal(userId);
  if (!principal.canUseSubjectChat || !principal.studentId) return { principal, room: null };

  const room = await prisma.subjectChat.findFirst({
    where: { id: subjectChatId, studentId: principal.studentId },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });

  return { principal, room };
}
