import { z } from 'zod';

export const enrollSchema = z.object({
  courseId: z.union([z.string(), z.number()]).transform((val) => Number(val)),
});

export const progressSchema = z.object({
  lessonId: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  courseId: z.union([z.string(), z.number()]).optional().transform((val) => val ? Number(val) : undefined),
  chapterId: z.union([z.string(), z.number()]).optional().transform((val) => val ? Number(val) : undefined),
  isFinished: z.boolean().optional(),
});

export const quizAttemptSchema = z.object({
  chapterId: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  answers: z.record(z.string(), z.string()), // Record<string(quizId), string(proposition)>
});

export type EnrollSchema = z.infer<typeof enrollSchema>;
export type ProgressSchema = z.infer<typeof progressSchema>;
export type QuizAttemptSchema = z.infer<typeof quizAttemptSchema>;
