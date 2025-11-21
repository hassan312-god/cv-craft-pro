import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Webhook endpoint pour recevoir des événements GitHub, Vercel, etc.
 * 
 * Configuration GitHub:
 * 1. Allez dans Settings > Webhooks > Add webhook
 * 2. Payload URL: https://cv-craft-pro.vercel.app/api/webhook
 * 3. Content type: application/json
 * 4. Secret: (optionnel, défini dans les variables d'environnement)
 * 5. Events: push, pull_request, deployment, etc.
 */

interface WebhookPayload {
  action?: string;
  repository?: {
    name: string;
    full_name: string;
    html_url: string;
  };
  sender?: {
    login: string;
  };
  commits?: Array<{
    id: string;
    message: string;
    author: {
      name: string;
      email: string;
    };
  }>;
  pull_request?: {
    number: number;
    title: string;
    state: string;
    user: {
      login: string;
    };
  };
  deployment?: {
    id: number;
    environment: string;
    state: string;
  };
  ref?: string;
  head_commit?: {
    id: string;
    message: string;
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vérifier le secret du webhook (optionnel mais recommandé)
    const webhookSecret = process.env.WEBHOOK_SECRET;
    const githubSignature = req.headers['x-hub-signature-256'] as string;
    
    if (webhookSecret && githubSignature) {
      // Ici, vous pouvez implémenter la vérification HMAC
      // Pour simplifier, on vérifie juste que le secret est présent
      // En production, utilisez crypto pour vérifier la signature
    }

    const payload: WebhookPayload = req.body;
    const event = req.headers['x-github-event'] as string;

    // Logger l'événement reçu
    console.log(`[Webhook] Event: ${event}`);
    console.log(`[Webhook] Action: ${payload.action || 'N/A'}`);
    console.log(`[Webhook] Repository: ${payload.repository?.full_name || 'N/A'}`);

    // Traiter différents types d'événements
    switch (event) {
      case 'push':
        await handlePushEvent(payload);
        break;
      
      case 'pull_request':
        await handlePullRequestEvent(payload);
        break;
      
      case 'deployment':
        await handleDeploymentEvent(payload);
        break;
      
      case 'deployment_status':
        await handleDeploymentStatusEvent(payload);
        break;
      
      default:
        console.log(`[Webhook] Unhandled event type: ${event}`);
    }

    // Répondre avec succès
    return res.status(200).json({
      success: true,
      event,
      message: 'Webhook received and processed'
    });

  } catch (error) {
    console.error('[Webhook] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Gère les événements de push
 */
async function handlePushEvent(payload: WebhookPayload) {
  console.log(`[Push] Branch: ${payload.ref}`);
  console.log(`[Push] Commits: ${payload.commits?.length || 0}`);
  
  if (payload.commits && payload.commits.length > 0) {
    payload.commits.forEach((commit, index) => {
      console.log(`[Push] Commit ${index + 1}: ${commit.message} by ${commit.author.name}`);
    });
  }

  // Ici, vous pouvez ajouter votre logique personnalisée :
  // - Envoyer une notification
  // - Déclencher un déploiement
  // - Mettre à jour une base de données
  // - etc.
}

/**
 * Gère les événements de pull request
 */
async function handlePullRequestEvent(payload: WebhookPayload) {
  if (!payload.pull_request) return;

  const pr = payload.pull_request;
  console.log(`[PR] #${pr.number}: ${pr.title}`);
  console.log(`[PR] State: ${pr.state}`);
  console.log(`[PR] Author: ${pr.user.login}`);
  console.log(`[PR] Action: ${payload.action}`);

  // Ici, vous pouvez ajouter votre logique personnalisée :
  // - Commenter sur la PR
  // - Mettre à jour un tableau de bord
  // - Envoyer une notification Slack/Discord
  // - etc.
}

/**
 * Gère les événements de déploiement
 */
async function handleDeploymentEvent(payload: WebhookPayload) {
  if (!payload.deployment) return;

  const deployment = payload.deployment;
  console.log(`[Deployment] ID: ${deployment.id}`);
  console.log(`[Deployment] Environment: ${deployment.environment}`);
  console.log(`[Deployment] State: ${deployment.state}`);

  // Ici, vous pouvez ajouter votre logique personnalisée :
  // - Notifier l'équipe
  // - Mettre à jour le statut
  // - etc.
}

/**
 * Gère les événements de statut de déploiement
 */
async function handleDeploymentStatusEvent(payload: WebhookPayload) {
  console.log(`[Deployment Status] State: ${payload.deployment?.state}`);
  
  // Ici, vous pouvez ajouter votre logique personnalisée :
  // - Notifier en cas d'échec
  // - Mettre à jour un dashboard
  // - etc.
}

