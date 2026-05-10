import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch before importing sendEmail
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.RESEND_API_KEY;
});

describe('emailTemplates', () => {
  it('generates welcome email', async () => {
    const { emailTemplates } = await import('@/lib/email');
    const result = emailTemplates.welcome('John');
    expect(result.subject).toBe('Welcome to DoDave Academy!');
    expect(result.html).toContain('John');
    expect(result.html).toContain('Browse Courses');
  });

  it('generates reset password email', async () => {
    const { emailTemplates } = await import('@/lib/email');
    const link = 'http://localhost:3000/reset-password?token=abc123';
    const result = emailTemplates.resetPassword(link);
    expect(result.subject).toBe('Reset Your Password');
    expect(result.html).toContain(link);
    expect(result.html).toContain('Reset Password');
  });

  it('generates purchase receipt email', async () => {
    const { emailTemplates } = await import('@/lib/email');
    const result = emailTemplates.purchaseReceipt('React 101', 15000);
    expect(result.subject).toBe('Receipt: React 101');
    expect(result.html).toContain('React 101');
    expect(result.html).toContain('15,000');
  });

  it('generates change email confirmation', async () => {
    const { emailTemplates } = await import('@/lib/email');
    const link = 'http://localhost:3000/confirm-email?token=xyz';
    const result = emailTemplates.changeEmail('Jane', link);
    expect(result.subject).toBe('Confirm Your New Email');
    expect(result.html).toContain('Jane');
    expect(result.html).toContain(link);
  });

  it('generates course validated email', async () => {
    const { emailTemplates } = await import('@/lib/email');
    const result = emailTemplates.courseValidated('Master Next.js');
    expect(result.subject).toBe('Course Published: Master Next.js');
    expect(result.html).toContain('Master Next.js');
    expect(result.html).toContain('Congratulations');
  });
});

describe('sendEmail', () => {
  it('sends via Resend when RESEND_API_KEY is set', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    mockFetch.mockResolvedValueOnce({ ok: true, text: () => '' });

    const { sendEmail } = await import('@/lib/email');
    await sendEmail({ to: 'test@test.com', subject: 'Test', html: '<p>Hi</p>' });

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(opts.method).toBe('POST');
    expect(opts.headers.Authorization).toBe('Bearer re_test_key');
    const body = JSON.parse(opts.body);
    expect(body.to).toBe('test@test.com');
    expect(body.subject).toBe('Test');
  });

  it('falls back to console.log when RESEND_API_KEY is not set', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { sendEmail } = await import('@/lib/email');

    await sendEmail({ to: 'test@test.com', subject: 'Test', html: '<p>Hi</p>' });

    expect(logSpy).toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });

  it('logs error when Resend API call fails', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    mockFetch.mockResolvedValueOnce({ ok: false, text: () => 'Rate limited' });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { sendEmail } = await import('@/lib/email');
    await sendEmail({ to: 'test@test.com', subject: 'Test', html: '<p>Hi</p>' });

    expect(errorSpy).toHaveBeenCalledWith('[EMAIL SEND FAILED]', 'Rate limited');
    errorSpy.mockRestore();
  });
});
