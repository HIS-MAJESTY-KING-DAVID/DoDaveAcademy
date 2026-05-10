import { describe, it, expect } from 'vitest';

describe('Auth validation schemas', () => {
  it('validates user registration schema', async () => {
    const { userRegisterSchema } = await import('@/lib/validations/auth');
    const valid = userRegisterSchema.parse({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'Password123!',
    });
    expect(valid.name).toBe('John Doe');
    expect(valid.email).toBe('john@test.com');
  });

  it('rejects invalid register email', async () => {
    const { userRegisterSchema } = await import('@/lib/validations/auth');
    expect(() =>
      userRegisterSchema.parse({
        name: 'John',
        email: 'not-an-email',
        password: 'Password123!',
      }),
    ).toThrow();
  });

  it('validates login schema', async () => {
    const { userAuthSchema } = await import('@/lib/validations/auth');
    const valid = userAuthSchema.parse({
      email: 'john@test.com',
      password: 'mypassword',
    });
    expect(valid.email).toBe('john@test.com');
    expect(valid.password).toBe('mypassword');
  });

  it('rejects login with missing password', async () => {
    const { userAuthSchema } = await import('@/lib/validations/auth');
    expect(() =>
      userAuthSchema.parse({ email: 'john@test.com' }),
    ).toThrow();
  });

  it('validates forgot password schema', async () => {
    const { forgotPasswordSchema } = await import('@/lib/validations/auth');
    const valid = forgotPasswordSchema.parse({ email: 'john@test.com' });
    expect(valid.email).toBe('john@test.com');
  });

  it('rejects forgot password with invalid email', async () => {
    const { forgotPasswordSchema } = await import('@/lib/validations/auth');
    expect(() => forgotPasswordSchema.parse({ email: '' })).toThrow();
  });
});

describe('JWT helpers', () => {
  it('signs and verifies tokens', async () => {
    const { sign, verify } = await import('jsonwebtoken');
    const payload = { userId: 1, email: 'test@test.com', roles: 'ROLE_USER' };
    const token = sign(payload, 'test-secret-key', { expiresIn: '1h' });
    const decoded = verify(token, 'test-secret-key') as typeof payload;
    expect(decoded.userId).toBe(1);
    expect(decoded.email).toBe('test@test.com');
  });

  it('rejects expired tokens', async () => {
    const { sign, verify } = await import('jsonwebtoken');
    const token = sign({ userId: 1 }, 'test-secret-key', { expiresIn: '0s' });
    // Wait a tick for expiry
    await new Promise((r) => setTimeout(r, 100));
    expect(() => verify(token, 'test-secret-key')).toThrow();
  });

  it('rejects tampered tokens', async () => {
    const { verify } = await import('jsonwebtoken');
    expect(() => verify('fake.token.here', 'test-secret-key')).toThrow();
  });
});

describe('Enroll validation schema', () => {
  it('validates enrollment', async () => {
    const { enrollSchema } = await import('@/lib/validations/student');
    const valid = enrollSchema.parse({ courseId: 5 });
    expect(valid.courseId).toBe(5);
  });

  it('transforms string courseId to number', async () => {
    const { enrollSchema } = await import('@/lib/validations/student');
    const result = enrollSchema.parse({ courseId: '5' });
    expect(result.courseId).toBe(5);
  });

  it('rejects missing courseId', async () => {
    const { enrollSchema } = await import('@/lib/validations/student');
    expect(() => enrollSchema.parse({})).toThrow();
  });
});
