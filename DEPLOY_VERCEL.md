# 🚀 Déploiement sur Vercel - Guide Complet

## 📋 Prérequis

1. Compte Vercel (gratuit) : https://vercel.com
2. Git repository (GitHub, GitLab, ou Bitbucket)
3. Projet prêt à être déployé

## 🔧 Configuration

### Étape 1 : Préparer le projet

Le projet est déjà configuré avec :
- ✅ `vercel.json` - Configuration Vercel
- ✅ `api/openrouter.ts` - API route serverless pour protéger la clé API
- ✅ Code modifié pour utiliser l'API route sur Vercel

### Étape 2 : Pousser sur Git

```bash
git add .
git commit -m "Préparation pour déploiement Vercel"
git push origin main
```

### Étape 3 : Déployer sur Vercel

#### Option A : Via le Dashboard Vercel (Recommandé)

1. Allez sur https://vercel.com
2. Cliquez sur **"Add New Project"**
3. Importez votre repository Git
4. Vercel détectera automatiquement Vite
5. **IMPORTANT** : Configurez les variables d'environnement :

   Cliquez sur **"Environment Variables"** et ajoutez :
   
   ```
   VITE_OPENROUTER_API_KEY = sk-or-v1-votre-cle-api-ici
   ```
   
   ⚠️ **IMPORTANT :** 
   - Le nom doit commencer par `VITE_` pour être accessible côté client
   - **Sélectionnez tous les environnements** (Production, Preview, Development)
   - Pour utiliser le proxy backend, ajoutez aussi `OPENROUTER_API_KEY` (sans VITE_)

6. Cliquez sur **"Deploy"**

#### Option B : Via Vercel CLI

1. Installer Vercel CLI :
   ```bash
   npm i -g vercel
   ```

2. Se connecter :
   ```bash
   vercel login
   ```

3. Déployer :
   ```bash
   vercel
   ```

4. Configurer les variables d'environnement :
   ```bash
   vercel env add OPENROUTER_API_KEY
   # Collez votre clé API quand demandé
   ```

5. Déployer en production :
   ```bash
   vercel --prod
   ```

## ✅ Vérification

Après le déploiement :

1. Votre site sera disponible sur `https://votre-projet.vercel.app`
2. L'API route sera accessible sur `https://votre-projet.vercel.app/api/openrouter`
3. Les fonctionnalités IA devraient fonctionner

## 🔒 Sécurité

✅ **Clé API protégée** : La clé API est stockée dans les variables d'environnement Vercel et n'est jamais exposée au client.

✅ **API Route serverless** : Les appels API passent par `/api/openrouter` qui est une fonction serverless sécurisée.

## 🛠️ Configuration des Variables d'Environnement

### Dans le Dashboard Vercel :

1. Allez sur votre projet
2. Cliquez sur **Settings** → **Environment Variables**
3. Ajoutez :
   - **Name** : `VITE_OPENROUTER_API_KEY`
   - **Value** : `sk-or-v1-votre-cle-api-ici`
   - **Environments** : Sélectionnez Production, Preview, et Development
   
   **Note :** Si vous utilisez le proxy backend (`api/openrouter.ts`), ajoutez aussi :
   - **Name** : `OPENROUTER_API_KEY` (sans VITE_)
   - **Value** : `sk-or-v1-votre-cle-api-ici`

### Via CLI :

```bash
vercel env add OPENROUTER_API_KEY production
vercel env add OPENROUTER_API_KEY preview
vercel env add OPENROUTER_API_KEY development
```

## 📝 Notes Importantes

1. **Pas besoin de `.env` sur Vercel** : Les variables d'environnement sont configurées dans le dashboard Vercel.

2. **Redéploiement après changement** : Si vous modifiez les variables d'environnement, vous devez redéployer :
   ```bash
   vercel --prod
   ```

3. **Logs** : Vous pouvez voir les logs de l'API route dans le dashboard Vercel sous **Functions**.

4. **Limites** : Vercel offre un plan gratuit généreux, mais vérifiez les limites pour les fonctions serverless.

## 🐛 Dépannage

### L'API ne fonctionne pas

1. Vérifiez que `OPENROUTER_API_KEY` est bien configurée dans Vercel
2. Vérifiez les logs dans le dashboard Vercel
3. Testez l'endpoint : `https://votre-projet.vercel.app/api/openrouter` (devrait retourner une erreur 405 en GET, c'est normal)

### Erreur de build

1. Vérifiez que toutes les dépendances sont dans `package.json`
2. Vérifiez les logs de build dans Vercel
3. Testez le build localement : `npm run build`

## 🎉 C'est tout !

Votre site est maintenant déployé et sécurisé sur Vercel ! 🚀

