let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
  const storedRefreshToken = localStorage.getItem('refreshToken');
  if (!storedRefreshToken) return false;

  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: storedRefreshToken }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

async function refreshToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }
  isRefreshing = true;
  refreshPromise = attemptRefresh().finally(() => {
    isRefreshing = false;
    refreshPromise = null;
  });
  return refreshPromise;
}

type FetchOptions = RequestInit & {
  noAuth?: boolean;
};

export async function apiClient(url: string, options: FetchOptions = {}): Promise<Response> {
  const { noAuth, ...fetchOptions } = options;

  if (!noAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  let res = await fetch(url, fetchOptions);

  if (res.status === 401 && !noAuth) {
    const refreshed = await refreshToken();
    if (refreshed) {
      const newToken = localStorage.getItem('authToken');
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${newToken}`,
      };
      res = await fetch(url, fetchOptions);
    }
  }

  return res;
}
