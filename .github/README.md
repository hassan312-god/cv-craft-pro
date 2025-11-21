# GitHub Actions Workflows

Ce répertoire contient les workflows GitHub Actions pour automatiser les builds et les déploiements du projet.

## 📋 Workflows Disponibles

### 1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
Workflow principal pour le projet Vite/React :
- ✅ Lint du code
- ✅ Build de production
- ✅ Upload des artifacts
- ✅ Déploiement preview pour les PRs

**Déclenchement :**
- Push sur `main` ou `develop`
- Pull Requests
- Déclenchement manuel

### 2. **Build with Vite** (`.github/workflows/vite.yml`)
Workflow spécifique pour le build Vite :
- ✅ Test sur Node.js 18.x et 20.x
- ✅ Lint
- ✅ Build
- ✅ Upload des artifacts

### 3. **Build with Gulp** (`.github/workflows/gulp.yml`)
Workflow pour tester le build avec Gulp :
- ✅ Installation de Gulp CLI
- ✅ Création automatique de `gulpfile.js` si absent
- ✅ Build avec Gulp
- ✅ Upload des artifacts

**Note :** Ce workflow crée un `gulpfile.js` basique si le fichier n'existe pas.

### 4. **Build with Grunt** (`.github/workflows/grunt.yml`)
Workflow pour tester le build avec Grunt :
- ✅ Installation de Grunt CLI
- ✅ Création automatique de `Gruntfile.js` si absent
- ✅ Installation des plugins Grunt nécessaires
- ✅ Build avec Grunt
- ✅ Upload des artifacts

**Note :** Ce workflow crée un `Gruntfile.js` basique si le fichier n'existe pas.

### 5. **Build with Webpack** (`.github/workflows/webpack.yml`)
Workflow pour tester le build avec Webpack :
- ✅ Installation de Webpack et Webpack CLI
- ✅ Création automatique de `webpack.config.js` si absent
- ✅ Build avec Webpack
- ✅ Upload des artifacts

**Note :** Ce workflow crée un `webpack.config.js` basique si le fichier n'existe pas.

## 🚀 Utilisation

### Activer un workflow

Les workflows sont automatiquement activés lors de :
- Push sur les branches `main` ou `develop`
- Ouverture/modification d'une Pull Request
- Déclenchement manuel via l'onglet "Actions" de GitHub

### Déclencher manuellement

1. Allez sur l'onglet **Actions** de votre repository GitHub
2. Sélectionnez le workflow souhaité
3. Cliquez sur **Run workflow**
4. Choisissez la branche et cliquez sur **Run workflow**

## 📦 Artifacts

Tous les workflows uploadent les artifacts de build dans :
- **Nom :** `{tool}-build-{node-version}`
- **Rétention :** 7 jours (30 jours pour CI/CD)
- **Emplacement :** `dist/`

Pour télécharger les artifacts :
1. Allez sur l'onglet **Actions**
2. Sélectionnez une exécution de workflow
3. Faites défiler jusqu'à **Artifacts**
4. Téléchargez le fichier ZIP

## 🔧 Configuration

### Variables d'environnement

Pour ajouter des variables d'environnement :
1. Allez dans **Settings** > **Secrets and variables** > **Actions**
2. Ajoutez vos secrets/variables

### Modifier un workflow

Éditez le fichier `.github/workflows/{workflow-name}.yml` et poussez les changements.

## 📝 Notes

- Les workflows Gulp, Grunt et Webpack créent automatiquement les fichiers de configuration s'ils n'existent pas
- Le projet principal utilise **Vite**, donc le workflow `vite.yml` est le plus pertinent
- Les autres workflows (Gulp, Grunt, Webpack) sont fournis comme exemples ou pour des besoins spécifiques

## 🐛 Dépannage

### Le workflow échoue

1. Vérifiez les logs dans l'onglet **Actions**
2. Assurez-vous que `package.json` contient les scripts nécessaires
3. Vérifiez que les dépendances sont correctement installées

### Les artifacts ne sont pas générés

1. Vérifiez que le build réussit
2. Assurez-vous que le répertoire `dist/` est créé
3. Vérifiez les permissions du workflow

## 📚 Ressources

- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

