import { describe, it, expect } from 'vitest';

describe('handleApiError', () => {
  it('handles Zod validation errors with 422', async () => {
    const { handleApiError, AppError } = await import('@/lib/exceptions');
    const { z } = await import('zod');

    const schema = z.object({ email: z.string().email() });
    try {
      schema.parse({ email: 'bad' });
    } catch (e) {
      const response = handleApiError(e);
      const body = await response.json();
      expect(response.status).toBe(422);
      expect(body.message).toBe('Validation Error');
      expect(body.errors).toBeDefined();
    }
  });

  it('handles AppError with custom status code', async () => {
    const { handleApiError, AppError } = await import('@/lib/exceptions');

    const error = new AppError('Not Found', 404);
    const response = handleApiError(error);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.message).toBe('Not Found');
  });

  it('handles generic Error with 500', async () => {
    const { handleApiError } = await import('@/lib/exceptions');

    const error = new Error('Something broke');
    const response = handleApiError(error);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.message).toBe('Something broke');
  });

  it('handles unknown errors with 500', async () => {
    const { handleApiError } = await import('@/lib/exceptions');

    const response = handleApiError('unexpected string');
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.message).toBe('Internal Server Error');
  });
});
