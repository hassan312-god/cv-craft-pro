# CV Builder Pro 🚀

Une application web moderne et intuitive pour créer des CV professionnels en quelques minutes. Exportez votre CV en **PDF** ou **Word**, partagez-le via un lien unique, choisissez parmi **30+ templates élégants**, le tout **100% gratuitement** et **sans inscription**.

![CV Builder Pro](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ Fonctionnalités Principales

### 🎨 Templates & Design
- **30+ Templates Professionnels** - Large sélection de designs modernes, élégants et créatifs
- **12 Thèmes de Couleurs** - Personnalisez votre CV avec des palettes de couleurs variées
- **Catégories de Templates** - Minimaliste, Professionnel, Créatif, Avec Photo, Moderne, Classique
- **Prévisualisation en Temps Réel** - Voyez votre CV se construire au fur et à mesure
- **Aperçu Responsive** - Visualisez votre CV avant téléchargement
- **Nouveaux Templates** - Moderne Minimal, Colorful, et bien d'autres

### 📝 Création de CV
- **Interface Intuitive** - Processus guidé étape par étape
- **Génération IA** - Descriptions automatiques pour "À propos", expériences et formations
- **Géolocalisation Automatique** - Détection précise de votre adresse
- **Upload de Photo** - Ajoutez votre photo professionnelle
- **Sections Complètes** - Expériences, formations, compétences, liens sociaux
- **Validation en Temps Réel** - Vérification automatique des champs

### 💾 Sauvegarde & Gestion
- **Sauvegarde Automatique** - Vos brouillons sont sauvegardés automatiquement toutes les 30 secondes
- **Gestion des Brouillons** - Sauvegardez et reprenez vos CVs plus tard
- **LocalStorage** - Stockage local sécurisé (jusqu'à 10 brouillons)

### 📄 Export & Partage
- **Export PDF Haute Qualité** - Téléchargez votre CV en PDF professionnel
- **Export Word (.docx)** - Téléchargez votre CV en format Word éditable
- **Format A4 Standard** - Dimensions parfaites pour impression
- **Gestion Multi-pages** - Support automatique des CVs multi-pages
- **Nom de Fichier Personnalisé** - Format : `Prénom_Nom_CV.pdf` ou `.docx`
- **Partage via Lien Unique** - Partagez votre CV avec un lien sécurisé
- **Expiration Automatique** - Les liens expirent après 30 jours
- **Compteur de Vues** - Suivez le nombre de personnes qui ont vu votre CV

### 🎯 Galerie & Découverte
- **Galerie de Modèles** - Parcourez 20+ exemples de CVs par secteur
- **Barre de Recherche** - Recherchez par nom, poste, entreprise, compétence
- **Filtres par Catégorie** - Tech, Marketing, Design, Ventes, Éducation, Médical
- **Système de Notation** - Notez les modèles et voyez les plus populaires
- **Tri par Popularité** - Découvrez les modèles les mieux notés
- **Aperçu Modal** - Visualisez les exemples en plein écran

### 🤖 Intelligence Artificielle
- **Génération de Descriptions** - Créez des descriptions professionnelles avec l'IA
- **Section "À Propos"** - Génération automatique basée sur votre profil
- **Descriptions d'Expériences** - Enrichissez vos expériences professionnelles
- **Descriptions de Formations** - Descriptions concises et pertinentes

### 🎨 Animations & UX
- **Animations Fluides** - Interface moderne avec animations subtiles
- **Typewriter Effect** - Animation d'écriture sur la page d'accueil
- **Compteurs Animés** - Statistiques animées (templates, gratuit, PDF)
- **Transitions Douces** - Expérience utilisateur optimisée

### 📊 Statistiques & Analytics
- **Statistiques d'Utilisation** - Suivez votre activité sur la plateforme
- **CVs Créés** - Nombre total de CVs que vous avez créés
- **Exports Réalisés** - Nombre de PDFs et documents Word exportés
- **CVs Partagés** - Nombre de liens de partage créés
- **Templates Préférés** - Découvrez vos templates et thèmes les plus utilisés

### 🔒 Sécurité & Performance
- **API Protégée** - Clé API sécurisée via proxy backend ou variables d'environnement
- **Déploiement Vercel** - Configuration optimale pour Vercel
- **Fonctions Serverless** - API routes protégées
- **Rate Limiting** - Protection contre les abus

## 🚀 Démarrage Rapide

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/hassan312-god/cv-craft-pro.git

# Naviguer vers le dossier du projet
cd cv-craft-pro

# Installer les dépendances
npm install

# Configurer les variables d'environnement (optionnel)
cp .env.example .env
# Éditez .env et ajoutez votre clé API OpenRouter si nécessaire

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Build de développement
npm run build:dev

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

## 🌐 Déploiement

### Déploiement sur Vercel (Recommandé)

Le projet est pré-configuré pour Vercel. Voir `DEPLOY_VERCEL.md` pour les instructions complètes.

**Déploiement rapide :**

1. Poussez votre code sur GitHub
2. Importez le projet sur [Vercel](https://vercel.com)
3. Configurez la variable d'environnement `OPENROUTER_API_KEY` dans le dashboard Vercel
4. Déployez !

**Via CLI :**
```bash
npm i -g vercel
vercel login
vercel
vercel env add OPENROUTER_API_KEY
vercel --prod
```

### Configuration API

Pour protéger votre clé API, deux options :

1. **Proxy Backend (Recommandé)** - Utilisez le serveur proxy fourni
2. **Variables d'Environnement** - Configurez `VITE_OPENROUTER_API_KEY` dans `.env`

Voir `SECURITY.md` et `SETUP_API.md` pour plus de détails.

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI moderne
- **TypeScript** - Typage statique pour plus de sécurité
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes et accessibles
- **React Router** - Navigation SPA
- **React Hook Form** - Gestion de formulaires performante
- **Zod** - Validation de schémas

### Backend & API
- **Vercel Functions** - Fonctions serverless pour l'API
- **OpenRouter API** - Génération IA des descriptions
- **Nominatim (OpenStreetMap)** - Géolocalisation

### Bibliothèques Utilitaires
- **jsPDF** - Génération de PDF
- **html2canvas** - Capture d'écran pour PDF
- **docx** - Génération de documents Word
- **file-saver** - Téléchargement de fichiers
- **Lucide React** - Icônes modernes
- **Sonner** - Notifications toast
- **date-fns** - Manipulation de dates

## 📁 Structure du Projet

```
cv-craft-pro/
├── api/                    # API Routes Vercel
│   └── openrouter.ts       # Proxy API sécurisé
├── public/                 # Assets statiques
│   └── templates/          # Images de preview
├── server/                 # Serveur proxy (optionnel)
│   ├── api-proxy.js        # Proxy Express
│   └── package.json
├── src/
│   ├── components/         # Composants React
│   │   ├── templates/      # 30+ templates de CV
│   │   ├── ui/             # Composants UI réutilisables
│   │   ├── CVPreview.tsx   # Aperçu du CV
│   │   ├── CVPreviewWrapper.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── StarRating.tsx  # Composant de notation
│   ├── pages/              # Pages de l'application
│   │   ├── Index.tsx       # Page d'accueil
│   │   ├── CVCreate.tsx    # Création de CV
│   │   ├── Gallery.tsx     # Galerie de modèles
│   │   ├── Share.tsx       # Page de partage
│   │   └── NotFound.tsx
│   ├── lib/                # Utilitaires
│   │   ├── openRouter.ts   # Intégration API IA
│   │   ├── templateConfig.ts
│   │   ├── themeConfig.ts  # Configuration des thèmes
│   │   ├── draftStorage.ts # Gestion des brouillons
│   │   ├── ratingStorage.ts # Gestion des notes
│   │   ├── shareStorage.ts  # Gestion du partage
│   │   ├── usageStats.ts   # Statistiques d'utilisation
│   │   ├── wordExport.ts   # Export Word
│   │   └── cvUtils.ts      # Utilitaires CV
│   ├── hooks/              # Hooks personnalisés
│   └── App.tsx             # Composant principal
├── vercel.json             # Configuration Vercel
├── .env.example            # Exemple de variables d'environnement
├── package.json
└── README.md
```

## 🎨 Templates Disponibles

L'application propose **30+ templates professionnels** organisés en catégories :

### Minimaliste
- Minimal, Clean, Bronzor, Modern Minimal

### Professionnel
- Executive, Professional, Elegant, Corporate, Sidebar, Dark Sidebar

### Créatif
- Creative, Bold, Colorful

### Moderne
- Modern, Tech, Two Column, Timeline, Gradient

### Avec Photo
- Photo Modern, Photo Compact, Photo Header, Photo Sidebar, Photo Centered, Photo Large, Photo Corner, Photo Banner, Azurill, Chikorita

### Classique
- Classic

Chaque template supporte **12 thèmes de couleurs** différents pour une personnalisation maximale.

## 📝 Guide d'Utilisation

### Créer un CV

1. **Accédez à l'application** et cliquez sur "Créer mon CV"
2. **Remplissez vos informations** étape par étape :
   - **Informations Personnelles** : Nom, prénom, email, téléphone, adresse
   - **Photo** : Upload optionnel de votre photo professionnelle
   - **À Propos** : Description personnelle (génération IA disponible)
   - **Expériences Professionnelles** : Postes, entreprises, dates, descriptions (génération IA disponible)
   - **Formations** : Diplômes, écoles, dates, descriptions (génération IA disponible)
   - **Compétences** : Liste de compétences avec niveaux
   - **Liens Sociaux** : LinkedIn, GitHub, Twitter, Portfolio
3. **Choisissez un template** qui correspond à votre style
4. **Sélectionnez un thème** de couleurs
5. **Prévisualisez** votre CV en temps réel
6. **Sauvegardez** votre brouillon (automatique ou manuel)
7. **Exportez** votre CV :
   - **PDF** : Pour impression et envoi par email
   - **Word (.docx)** : Pour édition ultérieure dans Microsoft Word
8. **Partagez** votre CV via un lien unique (valide 30 jours)

### Utiliser la Galerie

1. **Parcourez les modèles** par catégorie
2. **Recherchez** un modèle spécifique avec la barre de recherche
3. **Visualisez** les exemples en cliquant sur l'icône œil
4. **Notez** les modèles pour aider la communauté
5. **Triez** par note ou popularité
6. **Utilisez** un modèle pour créer votre CV

### Sauvegarder et Reprendre

- Vos brouillons sont **sauvegardés automatiquement** toutes les 30 secondes
- Cliquez sur **"Sauvegarder"** pour une sauvegarde immédiate
- Cliquez sur **"Brouillons"** pour voir tous vos CVs sauvegardés
- Cliquez sur un brouillon pour le charger et continuer votre travail
- Supprimez les brouillons inutiles pour libérer de l'espace

### Partager votre CV

1. Cliquez sur le bouton **"Partager"** après avoir complété votre CV
2. Un lien unique sera généré automatiquement
3. **Copiez le lien** et partagez-le avec qui vous voulez
4. Le lien est **valide pendant 30 jours**
5. Consultez le **nombre de vues** de votre CV partagé
6. Les personnes avec le lien peuvent **visualiser et télécharger** votre CV en PDF

### Consulter vos Statistiques

1. Cliquez sur l'icône **graphique** dans la barre d'outils
2. Consultez vos statistiques d'utilisation :
   - Nombre de CVs créés
   - Nombre de PDFs exportés
   - Nombre de documents Word exportés
   - Nombre de CVs partagés
   - Template le plus utilisé
   - Thème le plus utilisé

## 🔒 Sécurité

### Protection de l'API

Le projet inclut plusieurs méthodes pour protéger votre clé API :

1. **Proxy Backend (Recommandé)** - Serveur Express avec rate limiting
2. **API Routes Vercel** - Fonctions serverless sécurisées
3. **Variables d'Environnement** - Clés stockées de manière sécurisée

Voir `SECURITY.md` pour les détails complets.

### Variables d'Environnement

- `.env` - Variables locales (jamais commitées)
- `OPENROUTER_API_KEY` - Clé API OpenRouter
- `VITE_API_URL` - URL du proxy backend (optionnel)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Guidelines

- Suivez les conventions de code existantes
- Ajoutez des tests si possible
- Documentez vos changements
- Respectez le formatage (ESLint)

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**Hassan**

- GitHub: [@hassan312-god](https://github.com/hassan312-god)

## 🙏 Remerciements

- [shadcn/ui](https://ui.shadcn.com/) pour les composants UI
- [Lucide Icons](https://lucide.dev/) pour les icônes
- [OpenRouter](https://openrouter.ai/) pour l'API IA
- [OpenStreetMap](https://www.openstreetmap.org/) pour la géolocalisation
- La communauté open source

## 📞 Support

Pour toute question ou suggestion :
- Ouvrez une [issue](https://github.com/hassan312-god/cv-craft-pro/issues) sur GitHub
- Consultez la documentation dans les fichiers `*.md`
- Voir `DEPLOY_VERCEL.md` pour le déploiement
- Voir `SECURITY.md` pour la sécurité

## 🎯 Roadmap

- [x] Export en Word (.docx) ✅
- [x] Partage de CV via lien unique ✅
- [x] Templates supplémentaires ✅
- [x] Statistiques d'utilisation ✅
- [ ] Export en Word avec styles avancés
- [ ] Partage avec mot de passe
- [ ] Mode sombre
- [ ] Multi-langues
- [ ] Intégration LinkedIn pour import automatique

---

⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile !

**Fait avec ❤️ pour vous aider à créer le CV parfait**
