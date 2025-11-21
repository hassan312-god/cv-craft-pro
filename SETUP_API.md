# 🔐 Configuration de l'API - Guide Rapide

## ⚠️ IMPORTANT : Protection de la Clé API

Votre clé API OpenRouter est actuellement **exposée dans le code**. Vous devez la protéger avant de mettre le site en ligne.

## 🎯 Solution Recommandée : Proxy Backend

### Étape 1 : Installer le serveur proxy

```bash
cd server
npm install
```

### Étape 2 : Configurer les variables d'environnement

Créez un fichier `server/.env` :

```env
OPENROUTER_API_KEY=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
FRONTEND_URL=http://localhost:5173
PORT=3001
```

### Étape 3 : Démarrer le serveur proxy

```bash
cd server
npm start
```

### Étape 4 : Configurer le frontend

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:3001/api
```

**⚠️ NE METTEZ PAS la clé API dans ce fichier !**

### Étape 5 : Redémarrer le serveur de développement

```bash
npm run dev
```

## ✅ Vérification

1. Le serveur proxy doit afficher : `🚀 Serveur proxy API démarré sur le port 3001`
2. Les fonctionnalités IA doivent fonctionner normalement
3. La clé API n'est plus dans le code client

## 🚀 Déploiement en Production

### Option 1 : Déployer le proxy (Recommandé)

1. Déployez le serveur proxy sur Heroku/Railway/Render
2. Configurez `OPENROUTER_API_KEY` sur la plateforme
3. Mettez à jour `VITE_API_URL` avec l'URL du proxy déployé

### Option 2 : Variables d'environnement (Non recommandé)

Si vous devez utiliser les variables d'environnement directement :

1. Créez `.env` à la racine :
   ```env
   VITE_OPENROUTER_API_KEY=votre-cle-api
   ```

2. ⚠️ Notez que la clé sera visible dans le JavaScript compilé

## 📋 Checklist Avant Mise en Ligne

- [ ] Clé API retirée du code source (`src/lib/openRouter.ts`)
- [ ] Fichier `.env` créé et ajouté à `.gitignore`
- [ ] Serveur proxy configuré et testé
- [ ] Variables d'environnement configurées
- [ ] HTTPS activé en production
- [ ] CORS configuré correctement

## 🔗 Documentation Complète

Voir `SECURITY.md` pour plus de détails.

