import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://authapi-pf6diz22ka-uc.a.run.app/api';

const apiFetch = async (path, options = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data?.message || 'Something went wrong';
  return data;
};

export const register = async (credentials) =>
  apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(credentials) });

export const login = async (credentials) =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });

export const googleAuth = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  return apiFetch('/auth/google', { method: 'POST', body: JSON.stringify({ idToken }) });
};

export const logout = async () => {
  try {
    await apiFetch('/auth/logout', { method: 'POST' });
  } catch (_) {}
};