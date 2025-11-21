# Informations de Déploiement

## 🌐 URL de Production

**Site principal :** https://cv-craft-pro.vercel.app

## 📋 Endpoints API

### Webhooks
- **Webhook GitHub :** https://cv-craft-pro.vercel.app/api/webhook
- **Test Webhook :** https://cv-craft-pro.vercel.app/api/webhook-test

### API OpenRouter (Proxy)
- **Endpoint :** https://cv-craft-pro.vercel.app/api/openrouter

## 🔧 Configuration Vercel

### Variables d'Environnement Requises

Dans le dashboard Vercel, configurez :

```bash
# Obligatoire
OPENROUTER_API_KEY=sk-or-v1-votre-cle-api

# Optionnel (recommandé pour la sécurité)
WEBHOOK_SECRET=votre-secret-webhook-aleatoire
```

### Générer un Secret Webhook

```bash
# Linux/Mac
openssl rand -hex 32

# Ou utilisez un générateur en ligne
```

## 🔗 Configuration GitHub Webhook

1. Allez dans **Settings** > **Webhooks** > **Add webhook**
2. **Payload URL**: `https://cv-craft-pro.vercel.app/api/webhook`
3. **Content type**: `application/json`
4. **Secret**: Utilisez la valeur de `WEBHOOK_SECRET`
5. **Events**: Sélectionnez les événements souhaités

## ✅ Vérification du Déploiement

### Tester le site
```bash
curl https://cv-craft-pro.vercel.app
```

### Tester le webhook
```bash
curl https://cv-craft-pro.vercel.app/api/webhook-test
```

### Tester l'API OpenRouter (nécessite la clé API)
```bash
curl -X POST https://cv-craft-pro.vercel.app/api/openrouter \
  -H "Content-Type: application/json" \
  -d '{"model":"openai/gpt-4o-mini","messages":[{"role":"user","content":"Hello"}]}'
```

## 📊 Statut du Déploiement

- **Plateforme :** Vercel
- **Framework :** Vite + React
- **Build Command :** `npm run build`
- **Output Directory :** `dist`
- **Node Version :** 18.x / 20.x

## 🔄 Mise à Jour

Les déploiements sont automatiques via GitHub :
- Push sur `main` → Déploiement en production
- Pull Request → Déploiement preview

## 🐛 Dépannage

### Le site ne se charge pas
1. Vérifiez les logs dans Vercel Dashboard
2. Vérifiez que les variables d'environnement sont configurées
3. Vérifiez que le build réussit

### Les webhooks ne fonctionnent pas
1. Vérifiez que `WEBHOOK_SECRET` est configuré
2. Vérifiez les "Recent Deliveries" dans GitHub
3. Consultez les logs dans Vercel Dashboard

### L'API OpenRouter ne fonctionne pas
1. Vérifiez que `OPENROUTER_API_KEY` est configuré
2. Vérifiez les logs dans Vercel Dashboard
3. Testez l'endpoint `/api/webhook-test` pour vérifier la connectivité

## 📞 Support

Pour toute question sur le déploiement :
- Consultez les logs dans [Vercel Dashboard](https://vercel.com/dashboard)
- Voir `DEPLOY_VERCEL.md` pour les instructions détaillées
- Voir `docs/WEBHOOK_SETUP.md` pour la configuration des webhooks

