/**
 * API Route Vercel pour protéger la clé API OpenRouter
 * 
 * Cette fonction serverless remplace le serveur proxy Express
 * et protège votre clé API côté serveur.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Gérer les requêtes OPTIONS pour CORS
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Seulement accepter les requêtes POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'openai/gpt-4o-mini', temperature = 0.7, max_tokens } = request.body;

    if (!messages || !Array.isArray(messages)) {
      return response.status(400).json({ error: 'Messages invalides' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY n\'est pas définie dans les variables d\'environnement Vercel');
      return response.status(500).json({ error: 'Configuration serveur invalide' });
    }

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://cv-builder-pro.vercel.app',
        'X-Title': 'CV Builder Pro'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens
      })
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error('Erreur OpenRouter:', openRouterResponse.status, errorText);
      return response.status(openRouterResponse.status).json({ 
        error: `Erreur API: ${openRouterResponse.status}` 
      });
    }

    const data = await openRouterResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    console.error('Erreur API route:', error);
    return response.status(500).json({ error: 'Erreur serveur interne' });
  }
}

