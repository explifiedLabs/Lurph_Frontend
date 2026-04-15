import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { apiFetch } from './apiConfig';

export const register = (credentials) =>
  apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(credentials) });

export const login = (credentials) =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });

export const googleAuth = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  return apiFetch('/auth/google', { method: 'POST', body: JSON.stringify({ idToken }) });
};

export const logout = () =>
  apiFetch('/auth/logout', { method: 'POST' }).catch(() => {});

export const getMe = () =>
  apiFetch('/auth/me');