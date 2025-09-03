const API = import.meta.env.VITE_API_URL;

export function authHeader(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function api(path: string, options: RequestInit = {}) {
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...authHeader(),
  };

  const optionHeaders =
    options.headers instanceof Headers
      ? Object.fromEntries(options.headers.entries())
      : (options.headers as Record<string, string>) || {};

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...baseHeaders,
      ...optionHeaders,
    },
  });

  if (!res.ok) throw await res.json().catch(() => ({ message: res.statusText }));
  return res.status === 204 ? null : res.json();
}
