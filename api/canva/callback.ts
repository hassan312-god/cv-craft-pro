import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  OAUTH_COOKIE,
  assertConfigured,
  clearCookie,
  exchangeCodeForTokens,
  readCookie,
  redirectToApp,
  safeEquals,
  storeTokens,
} from '../_canva';

interface OAuthTransaction {
  verifier: string;
  state: string;
}

const first = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? (value[0] ?? '') : (value ?? '');

/**
 * Point de retour de Canva après consentement.
 *
 * C'est l'URL à déclarer dans la console Canva :
 * `https://cv-craft-pro.vercel.app/api/canva/callback`
 *
 * Elle vérifie le `state`, échange le code contre des jetons à l'aide du
 * `code_verifier` conservé côté serveur, puis renvoie l'utilisateur vers
 * l'application.
 */
export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Méthode non autorisée' });
  }

  const transaction = readCookie<OAuthTransaction>(request, OAUTH_COOKIE);
  // La transaction est à usage unique, quelle que soit l'issue.
  clearCookie(response, OAUTH_COOKIE);

  // Canva renvoie une erreur lorsque l'utilisateur refuse le consentement.
  const canvaError = first(request.query.error);
  if (canvaError) {
    return redirectToApp(response, { canva: 'error', reason: canvaError });
  }

  const configurationError = assertConfigured();
  if (configurationError) {
    return redirectToApp(response, { canva: 'error', reason: 'configuration' });
  }

  const code = first(request.query.code);
  const state = first(request.query.state);

  if (!code) {
    return redirectToApp(response, { canva: 'error', reason: 'code_manquant' });
  }

  // Sans transaction valide, impossible de prouver que ce retour correspond à
  // une demande partie de ce navigateur : on refuse plutôt que de deviner.
  if (!transaction?.verifier || !transaction.state) {
    return redirectToApp(response, { canva: 'error', reason: 'session_expiree' });
  }

  if (!state || !safeEquals(state, transaction.state)) {
    return redirectToApp(response, { canva: 'error', reason: 'state_invalide' });
  }

  try {
    const tokens = await exchangeCodeForTokens(code, transaction.verifier);
    storeTokens(response, tokens);
    return redirectToApp(response, { canva: 'connecte' });
  } catch (error) {
    // Le détail reste dans les journaux du serveur : le message de Canva peut
    // contenir des éléments qui n'ont pas à transiter par la barre d'adresse.
    console.error('Échec de l\'échange de jeton Canva :', error);
    return redirectToApp(response, { canva: 'error', reason: 'echange_refuse' });
  }
}
