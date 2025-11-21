import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Endpoint de test pour vérifier que le webhook fonctionne
 * GET /api/webhook-test
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Webhook endpoint is ready',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      webhookSecret: process.env.WEBHOOK_SECRET ? 'Configured' : 'Not configured'
    });
  }

  if (req.method === 'POST') {
    // Simuler un événement GitHub
    const testEvent = {
      event: req.headers['x-github-event'] || 'test',
      payload: req.body || {
        test: true,
        message: 'This is a test webhook payload',
        timestamp: new Date().toISOString()
      }
    };

    return res.status(200).json({
      success: true,
      message: 'Test webhook received',
      received: testEvent
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

