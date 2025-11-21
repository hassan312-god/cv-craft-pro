# ⚡ Déploiement Rapide sur Vercel

## 🚀 Étapes Rapides

### 1. Installer la dépendance Vercel

```bash
npm install @vercel/node
```

### 2. Pousser sur Git

```bash
git add .
git commit -m "Configuration pour Vercel"
git push origin main
```

### 3. Déployer sur Vercel

#### Via Dashboard (Recommandé) :

1. Allez sur https://vercel.com
2. **"Add New Project"** → Importez votre repo
3. Vercel détectera automatiquement Vite ✅
4. **IMPORTANT** : Avant de déployer, cliquez sur **"Environment Variables"** :
   - **Name** : `OPENROUTER_API_KEY`
   - **Value** : `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`
   - **Environments** : ✅ Production, ✅ Preview, ✅ Development
5. Cliquez sur **"Deploy"**

#### Via CLI :

```bash
npm i -g vercel
vercel login
vercel
# Quand demandé, ajoutez la variable d'environnement :
vercel env add OPENROUTER_API_KEY
# Collez votre clé API
vercel --prod
```

## ✅ C'est tout !

Votre site sera disponible sur `https://votre-projet.vercel.app`

L'API est automatiquement protégée via `/api/openrouter` (fonction serverless).

## 🔍 Vérification

1. Testez votre site déployé
2. Les fonctionnalités IA devraient fonctionner
3. La clé API est protégée (jamais exposée au client)

## 📚 Documentation Complète

Voir `DEPLOY_VERCEL.md` pour plus de détails.

