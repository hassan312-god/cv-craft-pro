<img src="public/favicon.ico" width="48" height="48" alt="CV Craft Pro Logo" align="right" />

# CV Craft Pro

![GitHub License](https://img.shields.io/github/license/hassan312-god/cv-craft-pro?style=flat-square)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue?style=flat-square)
![Vite](https://img.shields.io/badge/vite-v5.x-purple?style=flat-square)
![Supabase](https://img.shields.io/badge/supabase-backend-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square)

CV Craft Pro est une solution complète de création de curriculum vitae assistée par intelligence artificielle. Cette application permet aux utilisateurs de générer, personnaliser et exporter des CV professionnels en utilisant une vaste bibliothèque de templates modernes. Le projet intègre des fonctionnalités avancées de gestion de contenu via Supabase, une automatisation IA via OpenRouter et des capacités d'exportation multi-formats (PDF et Word).

## Fonctionnalités

*   Interface de création dynamique avec prévisualisation en temps réel.
*   Plus de 20 templates professionnels (Modern, Creative, Corporate, Tech, etc.).
*   Génération de contenu assistée par IA via l'intégration OpenRouter.
*   Système d'authentification et de stockage cloud sécurisé avec Supabase.
*   Moteur d'exportation haute fidélité pour formats PDF et DOCX.
*   Gestion des brouillons locaux et synchronisation cloud des documents.
*   Système de partage public avec gestion des permissions et statistiques d'utilisation.
*   Architecture réactive optimisée pour mobiles et tablettes.

## Stack Technique

### Frontend
*   **Framework**: React 18 avec TypeScript.
*   **Build Tool**: Vite.
*   **Styling**: Tailwind CSS avec composants UI Shadcn.
*   **Gestion d'état**: React Context API et Hooks personnalisés.
*   **Animations**: Lucide React pour l'iconographie.

### Backend & Services
*   **BaaS**: Supabase (Authentification, PostgreSQL, Storage).
*   **Serverless**: Edge Functions Supabase (Deno runtime).
*   **Proxy API**: Node.js (express) pour la gestion des webhooks et requêtes sensibles.
*   **IA**: Intégration OpenRouter API.

### Infrastructure & CI/CD
*   **Déploiement**: Vercel.
*   **Automatisation**: GitHub Actions (Workflows Vite, Gulp, Grunt).
*   **Gestionnaire de paquets**: Bun / npm.

## Installation

### Prérequis
*   Node.js >= 18.x
*   Bun (optionnel, recommandé pour le verrouillage des dépendances)
*   CLI Supabase (pour le développement local des Edge Functions)

### Frontend
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/hassan312-god/cv-craft-pro.git
   cd cv-craft-pro
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Configurer les variables d'environnement dans un fichier `.env` :
   ```env
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_cle_anon
   VITE_OPENROUTER_API_KEY=votre_cle_api
   ```
4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

### Backend (Supabase Edge Functions)
1. Initialiser le projet Supabase :
   ```bash
   supabase init
   ```
2. Déployer les fonctions :
   ```bash
   supabase functions deploy ai-cv
   ```

### Proxy Serveur (Optionnel)
1. Accéder au dossier serveur :
   ```bash
   cd server
   npm install
   ```
2. Démarrer le proxy :
   ```bash
   node api-proxy.js
   ```

## Structure du projet

```text
.
├── .github/workflows/      # Pipelines CI/CD (Vite, Grunt, Gulp)
├── api/                    # Serverless functions (OpenRouter, Webhooks)
├── config/                 # Configurations spécifiques à l'environnement
├── docs/                   # Documentation technique et guides de production
├── public/                 # Assets statiques et favicon
├── scripts/                # Scripts utilitaires (tests de webhooks)
├── server/                 # Serveur proxy Node.js
├── src/
│   ├── components/         # Composants React
│   │   ├── templates/      # Bibliothèque de templates de CV (20+ styles)
│   │   └── ui/             # Bibliothèque de composants Shadcn/UI
│   ├── contexts/           # Fournisseurs de contexte (Auth, etc.)
│   ├── hooks/              # Hooks personnalisés (UI, mobile)
│   ├── integrations/       # Client Supabase et types générés
│   ├── lib/                # Logique métier (Exports PDF, Word, IA)
│   ├── pages/              # Vues principales de l'application
│   └── main.tsx            # Point d'entrée de l'application
├── supabase/               # Migrations SQL et Edge Functions
├── tailwind.config.ts      # Configuration des styles
└── vite.config.ts          # Configuration du bundler Vite
```

## Configuration API & Webhooks

Le projet utilise des webhooks pour la synchronisation des données et l'interaction avec les services tiers.
*   Les scripts de test sont disponibles dans `/scripts/test-webhook.sh`.
*   La configuration des endpoints se trouve dans `api/webhook.ts`.
*   Consulter `docs/WEBHOOK_SETUP.md` pour les instructions détaillées sur le raccordement des services externes.

## Contribution

1. Créer une branche pour votre fonctionnalité : `git checkout -b feature/AmazingFeature`.
2. Valider vos modifications : `git commit -m 'Add some AmazingFeature'`.
3. Pousser vers la branche : `git push origin feature/AmazingFeature`.
4. Ouvrir une Pull Request.

## Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.