import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  student: { findUnique: vi.fn() },
  payment: { create: vi.fn(), findFirst: vi.fn(), update: vi.fn(), updateMany: vi.fn() },
  paymentMethod: { findFirst: vi.fn() },
  studentCourse: { upsert: vi.fn() },
  subscription: { findUnique: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));

vi.mock('@/lib/auth', () => ({
  getSession: vi.fn(),
}));

vi.mock('@/lib/services/payment', () => ({
  initCoursePayment: vi.fn(),
  initSubscriptionPayment: vi.fn(),
  generateReference: () => 'PAY-TEST-XXXX',
}));

const { getSession } = await import('@/lib/auth');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/payment/init', () => {
  it('returns 401 when not authenticated', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const { POST } = await import('@/app/api/payment/init/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000, phone: '671234567', customerName: 'Test', customerEmail: 't@t.com' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('creates payment and initiates course payment', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1, roles: 'ROLE_STUDENT' });
    mockPrisma.student.findUnique.mockResolvedValue({ id: 10 });
    mockPrisma.paymentMethod.findFirst.mockResolvedValue({ id: 1 });
    mockPrisma.payment.create.mockResolvedValue({ id: 100 });
    const { initCoursePayment } = await import('@/lib/services/payment');
    (initCoursePayment as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true, transactionId: 'txn_123' });

    const { POST } = await import('@/app/api/payment/init/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'course', amount: 5000, phone: '671234567', customerName: 'Test', customerEmail: 't@t.com',
        itemLabel: 'React Course', courseId: 42,
      }),
    });
    const res = await POST(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.reference).toBe('PAY-TEST-XXXX');
    expect(mockPrisma.payment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          studentId: 10, courseId: 42, amount: 5000, status: 'PENDING',
        }),
      }),
    );
  });

  it('returns 502 when gateway fails', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ userId: 1 });
    mockPrisma.student.findUnique.mockResolvedValue({ id: 10 });
    mockPrisma.paymentMethod.findFirst.mockResolvedValue({ id: 1 });
    mockPrisma.payment.create.mockResolvedValue({ id: 100 });
    const { initCoursePayment } = await import('@/lib/services/payment');
    (initCoursePayment as ReturnType<typeof vi.fn>).mockResolvedValue({ success: false, message: 'Gateway down' });

    const { POST } = await import('@/app/api/payment/init/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'course', amount: 5000, phone: '671234567', customerName: 'T', customerEmail: 't@t.com' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(502);
    expect(mockPrisma.payment.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { reference: 'PAY-TEST-XXXX' }, data: { status: 'FAILED' } }),
    );
  });
});

describe('POST /api/payment/webhook', () => {
  it('processes successful course payment and enrolls student', async () => {
    mockPrisma.payment.findFirst.mockResolvedValue({
      id: 100, studentId: 10, courseId: 42, subscriptionId: null,
    });
    mockPrisma.payment.update.mockResolvedValue({});
    mockPrisma.studentCourse.upsert.mockResolvedValue({});

    const { POST } = await import('@/app/api/payment/webhook/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference: 'PAY-TEST-XXXX', status: 'SUCCESS', transactionId: 'txn_456' }),
    });
    const res = await POST(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.received).toBe(true);
    expect(mockPrisma.payment.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 100 }, data: expect.objectContaining({ status: 'SUCCESS' }) }),
    );
    expect(mockPrisma.studentCourse.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { studentId_courseId: { studentId: 10, courseId: 42 } } }),
    );
  });

  it('processes failed payment without enrollment', async () => {
    mockPrisma.payment.findFirst.mockResolvedValue({ id: 100, courseId: 42, studentId: 10 });

    const { POST } = await import('@/app/api/payment/webhook/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference: 'PAY-TEST-XXXX', status: 'FAILED' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockPrisma.studentCourse.upsert).not.toHaveBeenCalled();
    expect(mockPrisma.payment.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 100 }, data: { status: 'FAILED' } }),
    );
  });

  it('returns 404 for unknown reference', async () => {
    mockPrisma.payment.findFirst.mockResolvedValue(null);
    const { POST } = await import('@/app/api/payment/webhook/route');
    const req = new Request('http://localhost/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference: 'UNKNOWN', status: 'SUCCESS' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(404);
  });
});
