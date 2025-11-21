# API Proxy Server

Serveur proxy pour protéger les clés API OpenRouter.

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Copiez le fichier `.env.example` vers `.env` :
   ```bash
   cp .env.example .env
   ```

2. Éditez `.env` et ajoutez votre clé API :
   ```
   OPENROUTER_API_KEY=votre-cle-api-ici
   FRONTEND_URL=http://localhost:5173
   PORT=3001
   ```

## ▶️ Démarrage

### Mode développement (avec auto-reload) :
```bash
npm run dev
```

### Mode production :
```bash
npm start
```

Le serveur démarre sur le port 3001 par défaut.

## 📡 Endpoints

### POST `/api/openrouter`
Proxy pour les requêtes OpenRouter.

**Body :**
```json
{
  "messages": [...],
  "model": "openai/gpt-4o-mini",
  "temperature": 0.7,
  "max_tokens": 200
}
```

### GET `/api/health`
Health check du serveur.

## 🔒 Sécurité

- ✅ Rate limiting : 50 requêtes par minute par IP
- ✅ CORS configuré
- ✅ Clé API jamais exposée au client
- ✅ Validation des requêtes

## 🌐 Déploiement

### Heroku
```bash
heroku create votre-app
heroku config:set OPENROUTER_API_KEY=votre-cle
heroku config:set FRONTEND_URL=https://votre-site.com
git push heroku main
```

### Railway
1. Connectez votre repo
2. Configurez les variables d'environnement
3. Déployez

### Render
1. Créez un nouveau Web Service
2. Configurez les variables d'environnement
3. Déployez

## 📝 Notes

- Le rate limiting est basique. Pour la production, utilisez `express-rate-limit`
- Configurez HTTPS en production
- Surveillez les logs pour détecter les abus

