'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      router.push('/login');
    });
  }, [router]);

  return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Déconnexion...</span>
      </div>
      <p className="mt-3 text-muted">Déconnexion en cours...</p>
    </div>
  );
}
