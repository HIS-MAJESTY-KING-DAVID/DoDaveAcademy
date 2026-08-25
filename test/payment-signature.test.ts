import { createHmac } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';

let verifyPaymentWebhookSignature: (rawBody: string, signature: string | null) => boolean;

beforeAll(async () => {
  process.env.PAYMENT_WEBHOOK_SECRET = 'test-webhook-secret';
  ({ verifyPaymentWebhookSignature } = await import('@/lib/services/payment'));
});

describe('payment webhook signature verification', () => {
  const body = JSON.stringify({ reference: 'PAY-1', status: 'SUCCESS' });
  const digest = createHmac('sha256', 'test-webhook-secret').update(body).digest('hex');

  it('accepts a valid HMAC signature', () => {
    expect(verifyPaymentWebhookSignature(body, digest)).toBe(true);
    expect(verifyPaymentWebhookSignature(body, `sha256=${digest}`)).toBe(true);
  });

  it('rejects missing, altered, or mismatched signatures', () => {
    expect(verifyPaymentWebhookSignature(body, null)).toBe(false);
    expect(verifyPaymentWebhookSignature(body, 'bad-signature')).toBe(false);
    expect(verifyPaymentWebhookSignature(`${body} `, digest)).toBe(false);
  });
});
