import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  contact: {
    create: vi.fn(),
  },
  user: {
    findUnique: vi.fn(),
  },
};

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/contact', () => {
  it('creates contact with userId when user email exists', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 42 });
    mockPrisma.contact.create.mockResolvedValue({ id: 1 });

    const { POST } = await import('@/app/api/contact/route');
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        email: 'alice@test.com',
        message: 'I have a question about courses',
      }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Message sent successfully');
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'alice@test.com' },
      select: { id: true },
    });
    expect(mockPrisma.contact.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ userId: 42 }),
      }),
    );
  });

  it('routes anonymous contact messages to support email without creating an invalid contact row', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    const { sendEmail } = await import('@/lib/email');
    (sendEmail as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    const { POST } = await import('@/app/api/contact/route');
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bob',
        email: 'bob@unknown.com',
        message: 'Hello from a new visitor',
      }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.message).toBe('Message sent successfully');
    expect(mockPrisma.contact.create).not.toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'dave@dodave.tech',
      subject: 'Website contact from Bob',
    }));
  });

  it('rejects missing required fields with 400', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'NoEmail' }),
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

    const { POST } = await import('@/app/api/contact/route');
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Carol',
        email: 'carol@test.com',
        message: 'Help with enrollment',
      }),
    });
    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.message).toBe('DB error');
  });
});
