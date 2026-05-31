export type PaymentProvider = 'orange' | 'mtn';

export interface PaymentRequest {
  amount: number;
  currency: string;
  reason: string;
  reference: string;
  phone: string;
  customerName: string;
  customerEmail: string;
  customerLanguage: string;
  receiver: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
  reference?: string;
}

export interface PayInRequest {
  amount: number;
  currency: string;
  reason: string;
  reference: string;
  phone: string;
  customerName: string;
  customerEmail: string;
  customerLanguage: string;
  receiver: string;
}

export interface PayOutRequest {
  amount: number;
  currency: string;
  reason: string;
  reference: string;
  phone: string;
  customerName: string;
}

const PAYMENT_GATEWAY_URL = process.env.PAYMENT_GATEWAY_URL || 'https://api.example.com/v1';
const RECEIVER_NUMBER = process.env.RECEIVER_NUMBER || '641201000';
const MERCHANT_KEY = process.env.MERCHANT_KEY || '';
const MERCHANT_SECRET = process.env.MERCHANT_SECRET || '';

export function generateReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PAY-${timestamp}-${random}`;
}

function buildPayInRequest(params: {
  amount: number;
  reason: string;
  phone: string;
  customerName: string;
  customerEmail: string;
}): PayInRequest {
  return {
    amount: params.amount,
    currency: 'XAF',
    reason: params.reason,
    reference: generateReference(),
    phone: params.phone,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    customerLanguage: 'fr',
    receiver: RECEIVER_NUMBER,
  };
}

function buildPayOutRequest(params: {
  amount: number;
  reason: string;
  phone: string;
  customerName: string;
}): PayOutRequest {
  return {
    amount: params.amount,
    currency: 'XAF',
    reason: params.reason,
    reference: generateReference(),
    phone: params.phone,
    customerName: params.customerName,
  };
}

export async function sendPayIn(request: PayInRequest): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${PAYMENT_GATEWAY_URL}/payin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-Key': MERCHANT_KEY,
        'X-Merchant-Secret': MERCHANT_SECRET,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, message: `Payment gateway error: ${error}` };
    }

    const data = await response.json();
    return {
      success: true,
      transactionId: data.transactionId,
      reference: request.reference,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Payment request failed',
    };
  }
}

export async function sendPayOut(request: PayOutRequest): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${PAYMENT_GATEWAY_URL}/payout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-Key': MERCHANT_KEY,
        'X-Merchant-Secret': MERCHANT_SECRET,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, message: `Payout gateway error: ${error}` };
    }

    const data = await response.json();
    return {
      success: true,
      transactionId: data.transactionId,
      reference: request.reference,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Payout request failed',
    };
  }
}

export async function initCoursePayment(params: {
  courseTitle: string;
  amount: number;
  phone: string;
  customerName: string;
  customerEmail: string;
}): Promise<PaymentResponse> {
  const request = buildPayInRequest({
    amount: params.amount,
    reason: `Achat Cours : ${params.courseTitle}`,
    phone: params.phone,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
  });
  return sendPayIn(request);
}

export async function initSubscriptionPayment(params: {
  planLabel: string;
  amount: number;
  phone: string;
  customerName: string;
  customerEmail: string;
}): Promise<PaymentResponse> {
  const request = buildPayInRequest({
    amount: params.amount,
    reason: `Abonnement Plan : ${params.planLabel}`,
    phone: params.phone,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
  });
  return sendPayIn(request);
}

export async function verifyCallback(reference: string): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${PAYMENT_GATEWAY_URL}/status/${reference}`, {
      headers: {
        'X-Merchant-Key': MERCHANT_KEY,
        'X-Merchant-Secret': MERCHANT_SECRET,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to verify payment status' };
    }

    const data = await response.json();
    return {
      success: data.status === 'SUCCESS',
      transactionId: data.transactionId,
      reference,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Verification failed',
    };
  }
}
