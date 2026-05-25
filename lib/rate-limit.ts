import { NextResponse } from 'next/server';

interface RateLimitConfig {
  max: number;
  windowMs: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const DEFAULT_CONFIG: RateLimitConfig = {
  max: 10,
  windowMs: 15 * 60 * 1000,
};

export function rateLimit(
  identifier: string,
  config: Partial<RateLimitConfig> = {},
): { success: boolean; headers: Record<string, string> } {
  const { max, windowMs } = { ...DEFAULT_CONFIG, ...config };
  const now = Date.now();

  let entry = store.get(identifier);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(identifier, entry);
    return {
      success: true,
      headers: {
        'X-RateLimit-Limit': String(max),
        'X-RateLimit-Remaining': String(max - 1),
        'X-RateLimit-Reset': String(entry.resetAt),
      },
    };
  }

  entry.count++;

  const remaining = Math.max(0, max - entry.count);
  const headers = {
    'X-RateLimit-Limit': String(max),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(entry.resetAt),
  };

  if (entry.count > max) {
    return { success: false, headers };
  }

  return { success: true, headers };
}

export function rateLimitResponse(headers: Record<string, string>) {
  return NextResponse.json(
    { message: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers,
    },
  );
}

export function getClientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}
