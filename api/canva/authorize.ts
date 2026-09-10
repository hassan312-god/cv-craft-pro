import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  OAUTH_COOKIE,
  assertConfigured,
  canvaConfig,
  createPkce,
  createState,
  setCookie,
} from '../_canva';

/**
 * Démarre la connexion à Canva.
 *
 * Génère le couple PKCE et l'anti-rejeu `state`, les met de côté dans un cookie
 * inaccessible au JavaScript, puis renvoie l'utilisateur vers la page de
 * consentement de Canva.
 *
 * Usage côté application : `window.location.href = '/api/canva/authorize'`.
 */
export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Méthode non autorisée' });
  }

  const configurationError = assertConfigured();
  if (configurationError) {
    return response.status(500).json({ error: configurationError });
  }

  const { verifier, challenge } = createPkce();
  const state = createState();

  // Dix minutes : le temps de consentir, pas davantage.
  setCookie(response, OAUTH_COOKIE, JSON.stringify({ verifier, state }), { maxAge: 600 });

  const url = new URL(canvaConfig.authorizeUrl);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', canvaConfig.clientId);
  url.searchParams.set('redirect_uri', canvaConfig.redirectUri);
  url.searchParams.set('scope', canvaConfig.scopes);
  url.searchParams.set('code_challenge_method', 's256');
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('state', state);

  response.setHeader('Location', url.toString());
  return response.status(302).end();
}
