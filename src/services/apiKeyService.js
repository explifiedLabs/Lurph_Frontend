import { apiFetch } from './apiConfig';

/**
 * Verify a key against the provider and save it encrypted on the backend.
 */
export const verifyAndSaveKey = (provider, apiKey) =>
  apiFetch('/keys/verify', {
    method: 'POST',
    body: JSON.stringify({ provider, apiKey }),
  });

/**
 * Returns a flat boolean map: { openai: bool, gemini: bool, ... }
 *
 * The backend now returns the richer shape:
 *   { success, providers: { openai: { user, platform, requiresUserKey }, ... }, freeLimit }
 *
 * We normalise it here so every consumer gets the simple shape they expect.
 * A provider counts as "active" if the user has saved their own key (user: true)
 * OR if a platform key exists and no user key is required (e.g. gemini free tier).
 */
export const getKeyStatus = async () => {
  const data = await apiFetch('/keys/status');

  // Already flat boolean map (old backend shape) — wrap each into rich object
  if (data && typeof data === 'object' && !data.providers) {
    const rich = {};
    for (const [provider, val] of Object.entries(data)) {
      if (typeof val === 'boolean') {
        rich[provider] = { active: val, userKey: val, freeTier: false };
      }
    }
    return rich;
  }

  // New shape: { success, providers: { openai: { user, platform, requiresUserKey } } }
  if (data?.providers && typeof data.providers === 'object') {
    const rich = {};
    for (const [provider, info] of Object.entries(data.providers)) {
      if (typeof info === 'boolean') {
        rich[provider] = { active: info, userKey: info, freeTier: false };
      } else if (typeof info === 'object' && info !== null) {
        const userKey  = !!info.user;
        const active   = userKey;
        rich[provider] = { active, userKey, freeTier: false };
      } else {
        rich[provider] = { active: false, userKey: false, freeTier: false };
      }
    }
    return rich;
  }

  // Fallback — return empty map
  return {};
};

/**
 * Remove a saved key for a specific provider.
 */
export const deleteKey = (provider) =>
  apiFetch(`/keys/${provider}`, { method: 'DELETE' });