import { prisma } from '@/lib/prisma';

type CreateNotificationParams = {
  recipientId: number;
  title: string;
  content: string;
  type?: number;
};

export async function createNotification({
  recipientId,
  title,
  content,
  type = 0,
}: CreateNotificationParams) {
  return prisma.notification.create({
    data: {
      recipientId,
      title,
      content,
      type,
      isRead: false,
      createdAt: new Date(),
    },
  });
}

export async function notifyCourseEnrolled(studentId: number, courseTitle: string) {
  return createNotification({
    recipientId: studentId,
    title: 'Course Enrollment',
    content: `You have been enrolled in "${courseTitle}". Start learning now!`,
    type: 1,
  });
}

export async function notifyCoursePublished(instructorId: number, courseTitle: string, courseId: number) {
  return createNotification({
    recipientId: instructorId,
    title: 'Course Submitted',
    content: `Your course "${courseTitle}" has been submitted for validation.`,
    type: 2,
  });
}

export async function notifyCourseValidated(instructorId: number, courseTitle: string) {
  return createNotification({
    recipientId: instructorId,
    title: 'Course Published',
    content: `Congratulations! Your course "${courseTitle}" has been validated and is now live.`,
    type: 2,
  });
}

export async function notifyForumReply(recipientId: number, courseTitle: string, subjectTitle: string) {
  return createNotification({
    recipientId,
    title: 'New Forum Reply',
    content: `Someone replied to "${subjectTitle}" in course "${courseTitle}".`,
    type: 3,
  });
}

export async function notifyQuizResult(studentId: number, courseTitle: string, score: number) {
  return createNotification({
    recipientId: studentId,
    title: 'Quiz Result',
    content: `Your quiz score for "${courseTitle}": ${score}%.`,
    type: 0,
  });
}

type BroadcastFn = (channel: string, event: string, payload: unknown) => void;

let broadcastFn: BroadcastFn | null = null;

export function setBroadcastHandler(fn: BroadcastFn) {
  broadcastFn = fn;
}

export async function createAndBroadcast(params: CreateNotificationParams & { channel?: string }) {
  const notification = await createNotification(params);

  if (broadcastFn) {
    broadcastFn(
      params.channel || `notifications:${params.recipientId}`,
      'new_notification',
      notification,
    );
  }

  return notification;
}
