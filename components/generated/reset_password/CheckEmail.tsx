import React from 'react';
import Link from 'next/link';
import AuthLayout from '../security/AuthLayout';

interface CheckEmailProps {
    resetToken?: {
        expirationMessageKey: string;
        expirationMessageData: any;
    };
}

export default function CheckEmail({ resetToken }: CheckEmailProps) {
  return (
    <AuthLayout>
        <div className="alert alert-info">
            <p>
                If an account matching your email exists, then an email was just sent that contains a link that you can use to reset your password.
                This link will expire in {resetToken?.expirationMessageKey || 'some time'}.
            </p>
            <p>If you don't receive an email please check your spam folder or <Link href="/forgot-password">try again</Link>.</p>
        </div>
    </AuthLayout>
  );
}
