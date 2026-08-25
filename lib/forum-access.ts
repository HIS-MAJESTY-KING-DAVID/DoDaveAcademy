import { prisma } from '@/lib/prisma';

export type CourseForumAccess = {
  course: { id: number; instructor: { userId: number } | null } | null;
  studentId: number | null;
  isInstructor: boolean;
  allowed: boolean;
};

export async function getCourseForumAccess(slug: string, userId: number): Promise<CourseForumAccess> {
  const course = await prisma.course.findFirst({
    where: { slug },
    select: {
      id: true,
      instructor: { select: { userId: true } },
    },
  });

  if (!course) {
    return { course: null, studentId: null, isInstructor: false, allowed: false };
  }

  const isInstructor = course.instructor?.userId === userId;
  if (isInstructor) {
    return { course, studentId: null, isInstructor: true, allowed: true };
  }

  const student = await prisma.student.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!student) {
    return { course, studentId: null, isInstructor: false, allowed: false };
  }

  const enrollment = await prisma.studentCourse.findUnique({
    where: {
      studentId_courseId: {
        studentId: student.id,
        courseId: course.id,
      },
    },
    select: { studentId: true },
  });

  return {
    course,
    studentId: student.id,
    isInstructor: false,
    allowed: Boolean(enrollment),
  };
}
