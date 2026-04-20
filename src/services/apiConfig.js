const API_URL = import.meta.env.VITE_API_URL || 'https://authapi-pf6diz22ka-uc.a.run.app/api';

export const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',          // ← this is what's missing
    headers,
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err.message || `Request failed: ${res.status}`;
  }

  return res.json();
};





