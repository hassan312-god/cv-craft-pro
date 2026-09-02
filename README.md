<img src="public/favicon.ico" width="48" height="48" alt="CV Craft Pro Logo" align="right" />

# CV Craft Pro

CV Craft Pro est un générateur de CV moderne, pensé pour créer des curriculum vitae professionnels en quelques minutes. L’application combine un éditeur visuel, des templates premium, une IA d’assistance et des exports PDF/Word.

## Vue d’ensemble

- Création de CV guidée et rapide
- Prévisualisation instantanée
- Templates premium par catégorie
- Authentification avec Supabase
- Export PDF et Word
- Possibilité de partager et sauvegarder les CV
- IA pour générer ou enrichir le contenu

## Fonctionnalités principales

### 1. Création de CV
- formulaire étape par étape
- édition des informations personnelles, expériences, formation, compétences
- thème et template personnalisables
- sauvegarde automatique des brouillons

### 2. Templates premium
- collection organisée par style
- catégories : Moderne, Professionnel, Minimaliste, Créatif, Classique, Avec photo
- navigation par catégorie et détail par template

### 3. IA et automatisation
- génération de texte assistée
- amélioration du profil professionnel
- intégration OpenRouter

### 4. Export et partage
- export PDF
- export Word
- partage public
- statistiques de usage

## Stack technique

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router

### Backend / services
- Supabase
- Edge Functions
- OpenRouter API
- stockage local + cloud

### Déploiement
- Vercel
- Node.js

## Démarrage rapide

### Prérequis
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/hassan312-god/cv-craft-pro.git
cd cv-craft-pro
npm install
```

### Variables d’environnement

Créer un fichier `.env` à la racine du projet :

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_OPENROUTER_API_KEY=your_openrouter_key
```

### Lancer le projet

```bash
npm run dev
```

### Build de production

```bash
npm run build
```

## Structure du projet

```text
.
├── api/                     # API serveur / webhooks / proxy
├── config/                 # configurations
├── docs/                   # documentation technique
├── public/                 # assets publics
├── scripts/                # scripts utiles
├── server/                 # serveur proxy optionnel
├── src/
│   ├── components/         # composants UI et templates
│   ├── contexts/           # contextes React
│   ├── hooks/              # hooks personnalisés
│   ├── integrations/       # intégrations externes
│   ├── lib/                # logique métier et utilitaires
│   ├── pages/              # pages de l'application
│   ├── App.tsx             # routage principal
│   └── main.tsx            # point d'entrée
├── supabase/               # migrations et functions
├── .gitignore
├── LICENSE
├── components.json
├── package.json
├── README.md               # documentation principale
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── vite.config.ts
└── index.html
```

## Déploiement

### Vercel

```bash
npm run build
```

Puis déployer sur Vercel avec les variables d’environnement ci-dessus.

## Documentation complémentaire

Pour des détails de déploiement et d’intégration :

- [DEPLOYMENT.md](DEPLOYMENT.md)
- [QUICK_START_VERCEL.md](QUICK_START_VERCEL.md)
- [docs/WEBHOOK_SETUP.md](docs/WEBHOOK_SETUP.md)
- [docs/FIX_PRODUCTION_ERRORS.md](docs/FIX_PRODUCTION_ERRORS.md)

## Contribution

1. Créer une branche
2. Développer la fonctionnalité
3. Vérifier le build
4. Ouvrir une pull request

## Licence

Projet distribué sous licence MIT. Voir [LICENSE](LICENSE).
