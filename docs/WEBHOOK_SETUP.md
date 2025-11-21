# Configuration des Webhooks

Ce guide explique comment configurer des webhooks pour ce projet.

## 📋 Table des matières

- [Webhooks GitHub](#webhooks-github)
- [Webhooks Vercel](#webhooks-vercel)
- [Webhooks personnalisés](#webhooks-personnalisés)
- [Sécurité](#sécurité)
- [Dépannage](#dépannage)

## 🔗 Webhooks GitHub

### Configuration

1. **Accédez aux paramètres du repository**
   - Allez sur votre repository GitHub
   - Cliquez sur **Settings** > **Webhooks** > **Add webhook**

2. **Configurez le webhook**
   - **Payload URL**: `https://cv-craft-pro.vercel.app/api/webhook`
   - **Content type**: `application/json`
   - **Secret**: (optionnel) Créez un secret aléatoire et ajoutez-le dans les variables d'environnement
   - **SSL verification**: Activé (recommandé)

3. **Sélectionnez les événements**
   - **Just the push event**: Pour les événements de push uniquement
   - **Send me everything**: Pour tous les événements
   - **Let me select individual events**: Pour choisir manuellement :
     - ✅ `push` - Lors d'un push sur une branche
     - ✅ `pull_request` - Lors d'une PR ouverte/fermée/modifiée
     - ✅ `deployment` - Lors d'un déploiement
     - ✅ `deployment_status` - Lors d'un changement de statut de déploiement
     - ✅ `release` - Lors d'une release
     - ✅ `workflow_run` - Lorsqu'un workflow GitHub Actions se termine

4. **Activez le webhook**
   - Cliquez sur **Add webhook**

### Variables d'environnement

Ajoutez dans Vercel (ou votre plateforme) :

```bash
WEBHOOK_SECRET=votre-secret-aleatoire-ici
```

Générez un secret sécurisé :
```bash
# Linux/Mac
openssl rand -hex 32

# Ou utilisez un générateur en ligne
```

## 🚀 Webhooks Vercel

### Configuration automatique

Si vous déployez sur Vercel, les webhooks sont automatiquement configurés pour :
- Déploiements réussis
- Déploiements échoués
- Déploiements annulés

### Configuration manuelle

1. **Dans Vercel Dashboard**
   - Allez dans **Settings** > **Git**
   - Configurez l'intégration GitHub

2. **Webhooks de déploiement**
   - Vercel envoie automatiquement des webhooks lors des déploiements
   - L'endpoint `/api/webhook` recevra ces événements

## 🔧 Webhooks personnalisés

### Créer un webhook personnalisé

Vous pouvez créer des endpoints personnalisés dans `api/` :

```typescript
// api/custom-webhook.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Votre logique personnalisée
  return res.status(200).json({ success: true });
}
```

### Tester un webhook localement

1. **Utilisez ngrok ou un service similaire**
   ```bash
   ngrok http 3000
   ```

2. **Configurez le webhook avec l'URL ngrok** (pour tests locaux)
   ```
   https://votre-id.ngrok.io/api/webhook
   ```
   
   **Ou utilisez directement l'URL de production :**
   ```
   https://cv-craft-pro.vercel.app/api/webhook
   ```

3. **Testez avec curl**
   ```bash
   curl -X POST http://localhost:3000/api/webhook \
     -H "Content-Type: application/json" \
     -H "X-GitHub-Event: push" \
     -d '{"ref":"refs/heads/main","commits":[]}'
   ```

## 🔒 Sécurité

### Vérification de la signature (GitHub)

Le webhook vérifie automatiquement la signature GitHub si `WEBHOOK_SECRET` est défini.

### Bonnes pratiques

1. **Toujours utiliser HTTPS** pour les webhooks
2. **Utiliser un secret** pour vérifier l'authenticité des requêtes
3. **Limiter les événements** aux seuls nécessaires
4. **Logger les événements** pour le débogage
5. **Implémenter un rate limiting** si nécessaire

## 🐛 Dépannage

### Le webhook ne reçoit pas d'événements

1. Vérifiez que l'URL est correcte
2. Vérifiez que le webhook est actif dans GitHub
3. Consultez les logs dans Vercel Dashboard
4. Vérifiez les "Recent Deliveries" dans GitHub

### Erreur 405 Method Not Allowed

- Assurez-vous que la requête utilise la méthode `POST`
- Vérifiez que l'endpoint est correct

### Erreur 500 Internal Server Error

1. Consultez les logs dans Vercel Dashboard
2. Vérifiez les variables d'environnement
3. Vérifiez le format du payload

### Tester manuellement

```bash
# Test avec curl
curl -X POST https://cv-craft-pro.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -d '{
    "ref": "refs/heads/main",
    "repository": {
      "name": "cv-craft-pro",
      "full_name": "votre-username/cv-craft-pro"
    },
    "commits": [{
      "id": "abc123",
      "message": "Test commit",
      "author": {
        "name": "Test User",
        "email": "test@example.com"
      }
    }]
  }'
```

## 📊 Événements supportés

| Événement | Description | Utilisation |
|-----------|-------------|-------------|
| `push` | Push sur une branche | Déclencher un build, notifier l'équipe |
| `pull_request` | PR ouverte/fermée/modifiée | Commenter, mettre à jour le statut |
| `deployment` | Déploiement créé | Notifier l'équipe |
| `deployment_status` | Statut de déploiement changé | Mettre à jour un dashboard |
| `release` | Release créée | Notifier, créer des tickets |
| `workflow_run` | Workflow GitHub Actions terminé | Notifier en cas d'échec |

## 🔗 Ressources

- [Documentation GitHub Webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [Documentation Vercel Webhooks](https://vercel.com/docs/concepts/projects/overview#webhooks)
- [GitHub Webhook Events](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)

