# Correction des Erreurs en Production

Ce guide explique comment corriger les erreurs courantes rencontrées en production.

## 🔴 Erreurs Courantes

### 1. `ReferenceError: handleSaveDraft is not defined`

**✅ CORRIGÉ** - Les fonctions manquantes ont été ajoutées dans `CVCreate.tsx` :
- `handleSaveDraft` - Sauvegarde manuelle d'un brouillon
- `handleLoadDraft` - Charge un brouillon
- `handleDeleteDraft` - Supprime un brouillon

**Solution :** Redéployez le projet sur Vercel après avoir poussé les corrections.

### 2. `VITE_OPENROUTER_API_KEY n'est pas définie`

**Cause :** La variable d'environnement n'est pas configurée sur Vercel.

**Solution :**

1. **Dans Vercel Dashboard :**
   - Allez dans votre projet
   - Cliquez sur **Settings** > **Environment Variables**
   - Ajoutez :
     ```
     Name: VITE_OPENROUTER_API_KEY
     Value: sk-or-v1-votre-cle-api
     Environment: Production, Preview, Development
     ```
   - Cliquez sur **Save**

2. **Redéployez :**
   - Allez dans **Deployments**
   - Cliquez sur les trois points (⋯) du dernier déploiement
   - Sélectionnez **Redeploy**

**Note :** Les fonctionnalités IA ne fonctionneront pas sans cette clé, mais le reste de l'application fonctionnera normalement.

### 3. URI invalide - Le chargement de la ressource média a échoué

**Causes possibles :**
- Image avec une URL invalide
- Image manquante dans le dossier `public/`
- Problème de CORS

**Solutions :**

1. **Vérifier les images dans `public/` :**
   ```bash
   # Vérifiez que toutes les images référencées existent
   ls public/templates/
   ```

2. **Vérifier les URLs dans le code :**
   - Assurez-vous que les chemins d'images commencent par `/` (ex: `/templates/minimal.png`)
   - Vérifiez qu'aucune URL externe n'est bloquée par CORS

3. **Vérifier la console du navigateur :**
   - Ouvrez les DevTools (F12)
   - Allez dans l'onglet **Network**
   - Identifiez quelle ressource échoue
   - Vérifiez l'URL complète

### 4. Erreur CSS - `-webkit-text-size-adjust`

**Cause :** Propriété CSS non standard ou mal formatée.

**Solution :** Cette erreur est généralement inoffensive et n'affecte pas le fonctionnement. Si elle persiste :

1. Vérifiez les fichiers CSS personnalisés
2. Vérifiez les styles inline dans les composants
3. Utilisez des propriétés CSS standard

### 5. Error: An unexpected error occurred (spoofer.js)

**Cause :** Extension de navigateur ou script tiers interférant.

**Solutions :**

1. **Désactiver les extensions :**
   - Testez en mode navigation privée
   - Désactivez les extensions une par une

2. **Vérifier la console :**
   - Ouvrez les DevTools (F12)
   - Regardez l'onglet **Console** pour plus de détails

3. **Vider le cache :**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

## 🔧 Configuration Vercel Complète

### Variables d'Environnement Requises

Dans **Settings** > **Environment Variables**, configurez :

```bash
# Obligatoire pour les fonctionnalités IA
VITE_OPENROUTER_API_KEY=sk-or-v1-votre-cle-api

# Optionnel mais recommandé
WEBHOOK_SECRET=votre-secret-webhook-aleatoire
```

### Vérification du Déploiement

1. **Vérifier les logs :**
   - Allez dans **Deployments**
   - Cliquez sur un déploiement
   - Consultez les **Build Logs** et **Function Logs**

2. **Tester les endpoints :**
   ```bash
   # Test du webhook
   curl https://cv-craft-pro.vercel.app/api/webhook-test
   
   # Test de l'API OpenRouter (nécessite la clé)
   curl -X POST https://cv-craft-pro.vercel.app/api/openrouter \
     -H "Content-Type: application/json" \
     -d '{"model":"openai/gpt-4o-mini","messages":[{"role":"user","content":"test"}]}'
   ```

## 🚀 Redéploiement

Après avoir corrigé les erreurs :

1. **Commit et push :**
   ```bash
   git add .
   git commit -m "Fix: Add missing draft functions and update config"
   git push origin main
   ```

2. **Vercel redéploiera automatiquement**

3. **Ou redéployez manuellement :**
   - Dans Vercel Dashboard
   - **Deployments** > **Redeploy**

## 📊 Vérification Post-Déploiement

1. ✅ Le site se charge sans erreurs
2. ✅ Les fonctionnalités de base fonctionnent
3. ✅ La sauvegarde de brouillons fonctionne
4. ✅ L'export PDF fonctionne
5. ✅ L'export Word fonctionne
6. ✅ Le partage fonctionne
7. ✅ Les statistiques s'affichent
8. ✅ La génération IA fonctionne (si la clé est configurée)

## 🐛 Dépannage Avancé

### Erreurs persistantes

1. **Vérifier les logs Vercel :**
   - **Deployments** > **Function Logs**
   - Recherchez les erreurs récentes

2. **Tester localement :**
   ```bash
   npm run build
   npm run preview
   ```

3. **Vérifier la compatibilité :**
   - Node.js version (18.x ou 20.x)
   - Dependencies à jour
   - Build sans erreurs

### Support

Si les erreurs persistent :
- Consultez les logs dans Vercel Dashboard
- Vérifiez la console du navigateur
- Testez dans un navigateur différent
- Vérifiez que toutes les dépendances sont installées

