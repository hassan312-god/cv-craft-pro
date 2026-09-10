import type { VercelRequest, VercelResponse } from '@vercel/node';
import { OAUTH_COOKIE, TOKEN_COOKIE, clearCookie } from '../_canva';

/**
 * Coupe la connexion Canva de ce navigateur en effaçant les cookies.
 *
 * En POST volontairement : une déconnexion ne doit pas pouvoir être déclenchée
 * par une simple image ou un lien pointant vers cette URL.
 *
 * Les jetons restent valides côté Canva jusqu'à leur expiration ; la révocation
 * complète se fait depuis les paramètres du compte Canva.
 */
export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Méthode non autorisée' });
  }

  clearCookie(response, TOKEN_COOKIE);
  clearCookie(response, OAUTH_COOKIE);

  response.setHeader('Cache-Control', 'no-store');
  return response.status(200).json({ connected: false });
}
