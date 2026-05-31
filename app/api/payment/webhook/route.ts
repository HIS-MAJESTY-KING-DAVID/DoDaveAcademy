import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, status, transactionId } = body;

    if (!reference) {
      return NextResponse.json({ message: 'Missing reference' }, { status: 400 });
    }

    if (status === 'SUCCESS') {
      return NextResponse.json({ received: true, reference, transactionId, status });
    }

    return NextResponse.json({ received: true, reference, status });
  } catch {
    return NextResponse.json({ message: 'Invalid callback payload' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');
  if (!reference) {
    return NextResponse.json({ message: 'Missing reference' }, { status: 400 });
  }
  return NextResponse.json({ reference, status: 'PENDING' });
}
