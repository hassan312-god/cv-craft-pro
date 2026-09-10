import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Briques communes à l'intégration Canva Connect.
 *
 * Le préfixe `_` empêche Vercel de traiter ce fichier comme une route :
 * il n'est utilisé que par les fonctions de `api/canva/`.
 */

/* ------------------------------------------------------------------ */
/* Configuration                                                       */
/* ------------------------------------------------------------------ */

/** Point d'entrée du consentement utilisateur. */
const AUTHORIZE_URL = 'https://www.canva.com/api/oauth/authorize';

/**
 * Échange du code contre un jeton.
 *
 * Surchargeable par `CANVA_TOKEN_URL` : si Canva déplace cet endpoint, la
 * correction se fait par variable d'environnement, sans redéploiement de code.
 */
const TOKEN_URL = process.env.CANVA_TOKEN_URL ?? 'https://api.canva.com/rest/v1/oauth/token';

/**
 * Doit correspondre au caractère près à l'URL déclarée dans la console Canva.
 * OAuth impose une correspondance exacte : un `/` en trop et l'échange échoue.
 */
const REDIRECT_URI =
  process.env.CANVA_REDIRECT_URI ?? 'https://cv-craft-pro.vercel.app/api/canva/callback';

/** Portées demandées, alignées sur l'intégration déclarée côté Canva. */
const SCOPES = [
  'profile:read',
  'design:meta:read',
  'design:content:read',
  'design:content:write',
  'folder:read',
  'folder:write',
  'brandtemplate:meta:read',
  'brandtemplate:content:read',
].join(' ');

export const canvaConfig = {
  clientId: process.env.CANVA_CLIENT_ID ?? '',
  clientSecret: process.env.CANVA_CLIENT_SECRET ?? '',
  authorizeUrl: AUTHORIZE_URL,
  tokenUrl: TOKEN_URL,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES,
};

/** Vérifie que le serveur est configuré avant d'entamer un échange. */
export const assertConfigured = (): string | null => {
  if (!canvaConfig.clientId) return 'CANVA_CLIENT_ID manquante';
  if (!canvaConfig.clientSecret) return 'CANVA_CLIENT_SECRET manquante';
  return null;
};

/* ------------------------------------------------------------------ */
/* PKCE                                                                */
/* ------------------------------------------------------------------ */

const base64url = (input: Buffer): string =>
  input.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * Couple PKCE.
 *
 * Le `verifier` reste sur le serveur, seul le `challenge` transite par le
 * navigateur. Sans le verifier, un code intercepté est inutilisable.
 */
export const createPkce = () => {
  const verifier = base64url(randomBytes(64));
  const challenge = base64url(createHash('sha256').update(verifier).digest());
  return { verifier, challenge };
};

export const createState = (): string => base64url(randomBytes(24));

/** Comparaison à temps constant, pour ne pas fuiter le state par timing. */
export const safeEquals = (a: string, b: string): boolean => {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
};

/* ------------------------------------------------------------------ */
/* Cookies                                                             */
/* ------------------------------------------------------------------ */

/** Cookie de transaction, vivant le temps du consentement. */
export const OAUTH_COOKIE = 'canva_oauth';
/** Cookie porteur des jetons une fois la connexion établie. */
export const TOKEN_COOKIE = 'canva_tokens';

interface CookieOptions {
  maxAge: number;
  path?: string;
}

const serializeCookie = (name: string, value: string, { maxAge, path = '/' }: CookieOptions): string =>
  [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    `Max-Age=${maxAge}`,
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
  ].join('; ');

export const setCookie = (
  response: VercelResponse,
  name: string,
  value: string,
  options: CookieOptions,
) => {
  const existing = response.getHeader('Set-Cookie');
  const previous = Array.isArray(existing) ? existing : existing ? [String(existing)] : [];
  response.setHeader('Set-Cookie', [...previous, serializeCookie(name, value, options)]);
};

export const clearCookie = (response: VercelResponse, name: string, path = '/') => {
  setCookie(response, name, '', { maxAge: 0, path });
};

export const readCookie = <T>(request: VercelRequest, name: string): T | null => {
  const raw = request.cookies?.[name];
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as T;
  } catch {
    return null;
  }
};

/* ------------------------------------------------------------------ */
/* Jetons                                                              */
/* ------------------------------------------------------------------ */

export interface StoredTokens {
  accessToken: string;
  refreshToken?: string;
  /** Horodatage d'expiration en millisecondes. */
  expiresAt: number;
}

interface CanvaTokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

/**
 * Appelle l'endpoint de jeton de Canva.
 *
 * Le client est confidentiel : `client_id` et `client_secret` partent en
 * authentification Basic, jamais dans le corps de la requête.
 */
const requestToken = async (body: Record<string, string>): Promise<StoredTokens> => {
  const credentials = Buffer.from(
    `${canvaConfig.clientId}:${canvaConfig.clientSecret}`,
  ).toString('base64');

  const response = await fetch(canvaConfig.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams(body).toString(),
  });

  const payload = (await response.json().catch(() => ({}))) as CanvaTokenResponse;

  if (!response.ok || !payload.access_token) {
    // La description de Canva est reprise telle quelle : c'est elle qui dit
    // si l'erreur vient du secret, de l'URL de redirection ou du verifier.
    const reason = payload.error_description ?? payload.error ?? `HTTP ${response.status}`;
    throw new Error(reason);
  }

  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000,
  };
};

export const exchangeCodeForTokens = (code: string, codeVerifier: string): Promise<StoredTokens> =>
  requestToken({
    grant_type: 'authorization_code',
    code,
    code_verifier: codeVerifier,
    redirect_uri: canvaConfig.redirectUri,
  });

export const refreshTokens = (refreshToken: string): Promise<StoredTokens> =>
  requestToken({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

/** Marge avant expiration : on rafraîchit sans attendre la dernière seconde. */
const EXPIRY_MARGIN_MS = 60_000;

/**
 * Jeton d'accès valide pour la requête en cours, rafraîchi si nécessaire.
 * Retourne `null` si l'utilisateur n'est pas connecté ou si le rafraîchissement
 * échoue — l'appelant doit alors relancer le consentement.
 */
export const getValidAccessToken = async (
  request: VercelRequest,
  response: VercelResponse,
): Promise<string | null> => {
  const stored = readCookie<StoredTokens>(request, TOKEN_COOKIE);
  if (!stored?.accessToken) return null;

  if (stored.expiresAt - EXPIRY_MARGIN_MS > Date.now()) return stored.accessToken;
  if (!stored.refreshToken) return null;

  try {
    const refreshed = await refreshTokens(stored.refreshToken);
    // Canva peut ne pas renvoyer de nouveau refresh token : on garde l'ancien.
    const next: StoredTokens = {
      ...refreshed,
      refreshToken: refreshed.refreshToken ?? stored.refreshToken,
    };
    storeTokens(response, next);
    return next.accessToken;
  } catch {
    clearCookie(response, TOKEN_COOKIE);
    return null;
  }
};

/** Durée de vie du cookie de jetons : trente jours. */
const TOKEN_COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

export const storeTokens = (response: VercelResponse, tokens: StoredTokens) => {
  setCookie(response, TOKEN_COOKIE, JSON.stringify(tokens), { maxAge: TOKEN_COOKIE_MAX_AGE });
};

/* ------------------------------------------------------------------ */
/* Redirections                                                        */
/* ------------------------------------------------------------------ */

/** Origine de l'application, déduite de l'URL de redirection déclarée. */
export const appOrigin = (): string => {
  try {
    return new URL(canvaConfig.redirectUri).origin;
  } catch {
    return 'https://cv-craft-pro.vercel.app';
  }
};

export const redirectToApp = (response: VercelResponse, params: Record<string, string>) => {
  const url = new URL('/', appOrigin());
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  response.setHeader('Location', url.toString());
  response.status(302).end();
};
