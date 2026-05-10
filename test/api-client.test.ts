import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockLocalStorage: Record<string, string> = {};

global.localStorage = {
  getItem: vi.fn((key: string) => mockLocalStorage[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { mockLocalStorage[key] = value; }),
  removeItem: vi.fn((key: string) => { delete mockLocalStorage[key]; }),
  clear: vi.fn(() => { Object.keys(mockLocalStorage).forEach(k => delete mockLocalStorage[k]); }),
  length: 0,
  key: vi.fn(() => null),
};

beforeEach(() => {
  vi.clearAllMocks();
  Object.keys(mockLocalStorage).forEach(k => delete mockLocalStorage[k]);
});

describe('apiClient', () => {
  it('attaches Bearer token from localStorage', async () => {
    mockLocalStorage.authToken = 'my-jwt-token';
    const mockFetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    global.fetch = mockFetch;

    // Need to dynamically import after setting up mocks
    const { apiClient } = await import('@/lib/api-client');
    await apiClient('/api/test');

    expect(mockFetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: 'Bearer my-jwt-token',
      }),
    }));
  });

  it('does not attach token when noAuth is true', async () => {
    const mockFetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    global.fetch = mockFetch;

    const { apiClient } = await import('@/lib/api-client');
    await apiClient('/api/public', { noAuth: true });

    expect(mockFetch).toHaveBeenCalledWith('/api/public', expect.not.objectContaining({
      headers: expect.objectContaining({ Authorization: expect.any(String) }),
    }));
  });

  it('refreshes token on 401 and retries', async () => {
    mockLocalStorage.authToken = 'expired-token';
    mockLocalStorage.refreshToken = 'valid-refresh';

    const refreshResponse = new Response(
      JSON.stringify({ token: 'new-token', refreshToken: 'new-refresh' }),
      { status: 200 },
    );

    const successResponse = new Response(JSON.stringify({ data: 'ok' }), { status: 200 });

    const mockFetch = vi.fn()
      .mockResolvedValueOnce(new Response('Unauthorized', { status: 401 })) // first request fails
      .mockResolvedValueOnce(refreshResponse) // refresh succeeds
      .mockResolvedValueOnce(successResponse); // retry succeeds

    global.fetch = mockFetch;

    const { apiClient } = await import('@/lib/api-client');
    const result = await apiClient('/api/protected');

    expect(result.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(mockLocalStorage.authToken).toBe('new-token');
    expect(mockLocalStorage.refreshToken).toBe('new-refresh');
  });

  it('does not retry on 401 if no refresh token', async () => {
    mockLocalStorage.authToken = 'expired-token';

    const mockFetch = vi.fn().mockResolvedValue(new Response('Unauthorized', { status: 401 }));
    global.fetch = mockFetch;

    const { apiClient } = await import('@/lib/api-client');
    const result = await apiClient('/api/protected');

    expect(result.status).toBe(401);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
