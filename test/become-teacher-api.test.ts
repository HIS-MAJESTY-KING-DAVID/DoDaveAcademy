import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  user: { findUnique: vi.fn() },
  contact: { create: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/auth/become-teacher', () => {
  it('creates a contact record when user email exists', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 42 });
    mockPrisma.contact.create.mockResolvedValue({ id: 1 });

    const { POST } = await import('@/app/api/auth/become-teacher/route');
    const req = new Request('http://localhost/api/auth/become-teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teacher@test.com',
        fullName: 'John Doe',
        phone: '+237123456789',
        expertise: 'web-development',
        bio: 'Experienced web developer with 10 years of teaching',
      }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Application submitted successfully');
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'teacher@test.com' },
    });
    expect(mockPrisma.contact.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          object: 'Instructor Application - web-development',
          userId: 42,
        }),
      }),
    );
  });

  it('returns 404 when user email not found', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    const { POST } = await import('@/app/api/auth/become-teacher/route');
    const req = new Request('http://localhost/api/auth/become-teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'unknown@test.com',
        fullName: 'No Account',
        expertise: 'design',
        bio: 'No account yet',
      }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.message).toBe('No account found with this email. Please register first.');
    expect(mockPrisma.contact.create).not.toHaveBeenCalled();
  });

  it('rejects missing required fields with 400', async () => {
    const { POST } = await import('@/app/api/auth/become-teacher/route');
    const req = new Request('http://localhost/api/auth/become-teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'only-email@test.com' }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe('Missing required fields');
    expect(mockPrisma.user.findUnique).not.toHaveBeenCalled();
    expect(mockPrisma.contact.create).not.toHaveBeenCalled();
  });

  it('returns 500 on prisma error', async () => {
    mockPrisma.user.findUnique.mockRejectedValue(new Error('DB error'));

    const { POST } = await import('@/app/api/auth/become-teacher/route');
    const req = new Request('http://localhost/api/auth/become-teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teacher@test.com',
        fullName: 'John Doe',
        expertise: 'web-development',
        bio: 'Experienced developer',
      }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.message).toBe('DB error');
  });

  it('accepts application without phone number (phone optional)', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 7 });
    mockPrisma.contact.create.mockResolvedValue({ id: 2 });

    const { POST } = await import('@/app/api/auth/become-teacher/route');
    const req = new Request('http://localhost/api/auth/become-teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teacher@test.com',
        fullName: 'Jane Doe',
        expertise: 'data-science',
        bio: 'Data scientist with PhD',
      }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Application submitted successfully');
    expect(mockPrisma.contact.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          content: expect.stringContaining('Phone: N/A'),
          userId: 7,
        }),
      }),
    );
  });
});
