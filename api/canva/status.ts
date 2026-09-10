import type { VercelRequest, VercelResponse } from '@vercel/node';
import { assertConfigured, canvaConfig, getValidAccessToken } from '../_canva';

/**
 * État de la connexion Canva du navigateur courant.
 *
 * Sert de sonde après un aller-retour OAuth et de source de vérité pour
 * l'interface : afficher « Connecter Canva » ou « Déconnecter ».
 *
 * Le jeton lui-même n'est jamais renvoyé : seul son existence est exposée.
 */
export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Méthode non autorisée' });
  }

  const configurationError = assertConfigured();

  const accessToken = configurationError ? null : await getValidAccessToken(request, response);

  // Cet état dépend des cookies de la requête : il ne doit jamais être mis en cache.
  response.setHeader('Cache-Control', 'no-store');

  return response.status(200).json({
    configured: configurationError === null,
    connected: accessToken !== null,
    redirectUri: canvaConfig.redirectUri,
    ...(configurationError ? { error: configurationError } : {}),
  });
}
