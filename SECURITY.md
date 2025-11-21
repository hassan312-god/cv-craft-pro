# Guide de Sécurité - CV Builder Pro

## 🔒 Protection de l'API

### ⚠️ IMPORTANT : Ne jamais committer les clés API

Les clés API sont sensibles et ne doivent **JAMAIS** être commitées dans le dépôt Git.

## 🛡️ Méthode Recommandée : Proxy Backend

Pour une sécurité maximale, utilisez le proxy backend fourni.

### Installation du Proxy

1. **Installer les dépendances du serveur :**
   ```bash
   cd server
   npm install
   ```

2. **Configurer les variables d'environnement :**
   ```bash
   cp .env.example .env
   ```
   
   Éditez `.env` et ajoutez votre clé API :
   ```
   OPENROUTER_API_KEY=votre-cle-api-ici
   FRONTEND_URL=http://localhost:5173
   PORT=3001
   ```

3. **Démarrer le serveur proxy :**
   ```bash
   npm start
   # Ou en mode développement avec auto-reload :
   npm run dev
   ```

4. **Configurer le frontend :**
   
   Créez un fichier `.env` à la racine du projet :
   ```
   VITE_API_URL=http://localhost:3001/api
   ```
   
   **Ne mettez PAS la clé API dans ce fichier !**

### Avantages du Proxy

- ✅ Clé API jamais exposée au client
- ✅ Rate limiting intégré
- ✅ Contrôle d'accès centralisé
- ✅ Logs des requêtes
- ✅ Protection contre les abus

## 🔧 Méthode Alternative : Variables d'Environnement (Développement uniquement)

⚠️ **ATTENTION** : Cette méthode expose la clé API dans le code client. À utiliser uniquement en développement.

1. **Créer un fichier `.env` à la racine :**
   ```
   VITE_OPENROUTER_API_KEY=votre-cle-api-ici
   ```

2. **Vérifier que `.env` est dans `.gitignore`**

3. **Redémarrer le serveur de développement**

## 📋 Checklist de Déploiement

Avant de mettre le site en ligne :

- [ ] ✅ Clé API retirée du code source
- [ ] ✅ Fichier `.env` créé et ajouté à `.gitignore`
- [ ] ✅ Proxy backend configuré et déployé
- [ ] ✅ Variables d'environnement configurées sur le serveur
- [ ] ✅ CORS configuré correctement
- [ ] ✅ Rate limiting activé
- [ ] ✅ HTTPS activé en production
- [ ] ✅ Logs d'erreur configurés

## 🚀 Déploiement en Production

### Option 1 : Proxy Backend (Recommandé)

1. Déployer le serveur proxy sur un service comme :
   - Heroku
   - Railway
   - Render
   - Vercel (fonction serverless)
   - AWS Lambda

2. Configurer les variables d'environnement sur la plateforme

3. Mettre à jour `VITE_API_URL` dans le frontend avec l'URL du proxy

### Option 2 : Variables d'Environnement (Non recommandé)

Si vous devez utiliser les variables d'environnement directement :

1. Configurez `VITE_OPENROUTER_API_KEY` sur votre plateforme de déploiement
2. ⚠️ Notez que la clé sera visible dans le code JavaScript compilé
3. Limitez les permissions de la clé API sur OpenRouter

## 🔐 Bonnes Pratiques

1. **Rotation des clés** : Changez régulièrement vos clés API
2. **Limites de taux** : Configurez des limites sur OpenRouter
3. **Monitoring** : Surveillez l'utilisation de l'API
4. **HTTPS** : Utilisez toujours HTTPS en production
5. **CORS** : Limitez les origines autorisées

## 📞 Support

En cas de problème, vérifiez :
- Les logs du serveur proxy
- La configuration des variables d'environnement
- Les permissions CORS
- Les limites de taux OpenRouter

