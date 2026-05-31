import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  instructor: { update: vi.fn(), findMany: vi.fn() },
  category: { create: vi.fn(), delete: vi.fn(), findMany: vi.fn() },
  siteSetting: { findFirst: vi.fn(), update: vi.fn(), create: vi.fn() },
  socialSetting: { create: vi.fn(), delete: vi.fn(), findMany: vi.fn() },
  networkConfig: { findFirst: vi.fn(), update: vi.fn(), create: vi.fn() },
};

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));

vi.mock('@/lib/auth', () => ({
  getSession: vi.fn(),
}));

const { getSession } = await import('@/lib/auth');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/admin/instructors/[id]/validate', () => {
  it('validates instructor when admin', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    const { POST } = await import('@/app/api/admin/instructors/[id]/validate/route');
    const req = new Request('http://localhost/api', { method: 'POST' });
    const res = await POST(req, { params: Promise.resolve({ id: '5' }) });
    expect(res.status).toBe(307);
    expect(mockPrisma.instructor.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { isValidated: true, isRejected: false },
    });
  });

  it('returns 401 when not admin', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_STUDENT' });
    const { POST } = await import('@/app/api/admin/instructors/[id]/validate/route');
    const req = new Request('http://localhost/api', { method: 'POST' });
    const res = await POST(req, { params: Promise.resolve({ id: '1' }) });
    expect(res.status).toBe(401);
  });
});

describe('POST /api/admin/instructors/[id]/reject', () => {
  it('rejects instructor when admin', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    const { POST } = await import('@/app/api/admin/instructors/[id]/reject/route');
    const req = new Request('http://localhost/api', { method: 'POST' });
    const res = await POST(req, { params: Promise.resolve({ id: '3' }) });
    expect(res.status).toBe(307);
    expect(mockPrisma.instructor.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { isRejected: true, isValidated: false },
    });
  });
});

describe('POST /api/admin/categories', () => {
  it('creates a top-level category', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    const { POST } = await import('@/app/api/admin/categories/route');
    const form = new FormData();
    form.set('name', 'Web Development');
    const req = new Request('http://localhost/api', { method: 'POST', body: form });
    const res = await POST(req);
    expect(res.status).toBe(307);
    expect(mockPrisma.category.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ name: 'Web Development', slug: 'web-development', categoryId: null, isSubCategory: false }),
    });
  });

  it('creates a subcategory', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    const { POST } = await import('@/app/api/admin/categories/route');
    const form = new FormData();
    form.set('name', 'React');
    form.set('categoryId', '1');
    const req = new Request('http://localhost/api', { method: 'POST', body: form });
    const res = await POST(req);
    expect(res.status).toBe(307);
    expect(mockPrisma.category.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ name: 'React', slug: 'react', categoryId: 1, isSubCategory: true }),
    });
  });
});

describe('POST /api/admin/categories/[id]/delete', () => {
  it('deletes a category when admin', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    const { POST } = await import('@/app/api/admin/categories/[id]/delete/route');
    const req = new Request('http://localhost/api', { method: 'POST' });
    const res = await POST(req, { params: Promise.resolve({ id: '2' }) });
    expect(res.status).toBe(307);
    expect(mockPrisma.category.delete).toHaveBeenCalledWith({ where: { id: 2 } });
  });
});

describe('POST /api/admin/settings/site', () => {
  it('creates site settings when none exist', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    mockPrisma.siteSetting.findFirst.mockResolvedValue(null);
    const { POST } = await import('@/app/api/admin/settings/site/route');
    const form = new FormData();
    form.set('siteName', 'DoDave');
    form.set('siteEmail', 'admin@test.com');
    const req = new Request('http://localhost/api', { method: 'POST', body: form });
    const res = await POST(req);
    expect(res.status).toBe(307);
    expect(mockPrisma.siteSetting.create).toHaveBeenCalled();
  });

  it('updates existing site settings', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    mockPrisma.siteSetting.findFirst.mockResolvedValue({ id: 1 });
    const { POST } = await import('@/app/api/admin/settings/site/route');
    const form = new FormData();
    form.set('siteName', 'Updated');
    const req = new Request('http://localhost/api', { method: 'POST', body: form });
    const res = await POST(req);
    expect(res.status).toBe(307);
    expect(mockPrisma.siteSetting.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });
});

describe('POST /api/admin/settings/social', () => {
  it('adds a social link', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    const { POST } = await import('@/app/api/admin/settings/social/route');
    const form = new FormData();
    form.set('name', 'Twitter');
    form.set('link', 'https://twitter.com/dodave');
    form.set('icon', 'bi bi-twitter');
    const req = new Request('http://localhost/api', { method: 'POST', body: form });
    const res = await POST(req);
    expect(res.status).toBe(307);
    expect(mockPrisma.socialSetting.create).toHaveBeenCalledWith({
      data: { name: 'Twitter', link: 'https://twitter.com/dodave', icon: 'bi bi-twitter' },
    });
  });
});

describe('POST /api/admin/settings/social/[id]/delete', () => {
  it('deletes a social link', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    const { POST } = await import('@/app/api/admin/settings/social/[id]/delete/route');
    const req = new Request('http://localhost/api', { method: 'POST' });
    const res = await POST(req, { params: Promise.resolve({ id: '3' }) });
    expect(res.status).toBe(307);
    expect(mockPrisma.socialSetting.delete).toHaveBeenCalledWith({ where: { id: 3 } });
  });
});

describe('POST /api/admin/settings/network', () => {
  it('creates or updates network config', async () => {
    (getSession as ReturnType<typeof vi.fn>).mockResolvedValue({ roles: 'ROLE_ADMIN' });
    mockPrisma.networkConfig.findFirst.mockResolvedValue({ id: 1 });
    const { POST } = await import('@/app/api/admin/settings/network/route');
    const form = new FormData();
    form.set('pointsPerInvitation', '10');
    form.set('exchangeRate', '1.5');
    const req = new Request('http://localhost/api', { method: 'POST', body: form });
    const res = await POST(req);
    expect(res.status).toBe(307);
    expect(mockPrisma.networkConfig.update).toHaveBeenCalled();
  });
});
