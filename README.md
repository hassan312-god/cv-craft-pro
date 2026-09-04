# CV Craft Pro

![GitHub License](https://img.shields.io/github/license/hassan312-god/cv-craft-pro?style=flat-square)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue?style=flat-square)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

**CV Craft Pro** est une plateforme avancée de création de CV professionnels, offrant une interface intuitive, une personnalisation poussée via des templates thématiques et une intégration d'intelligence artificielle pour l'optimisation de contenu. Le projet utilise une architecture moderne basée sur React, optimisée pour la performance et le SEO.

## 🚀 Fonctionnalités

- 📝 **Éditeur dynamique** : Création et modification de CV en temps réel avec prévisualisation instantanée.
- 🎨 **Bibliothèque de Templates** : Plus de 30 modèles professionnels (Azurill, Corporate, Tech, Modern, etc.).
- 🤖 **IA Assistée** : Intégration OpenRouter pour la génération et l'amélioration de contenu via intelligence artificielle.
- 📂 **Import/Export Multi-format** : Import de fichiers PDF/Word, export au format JSON Resume, PDF et Word.
- 🔐 **Authentification & Persistance** : Gestion des comptes utilisateurs et stockage cloud des CV via Supabase.
- 📊 **Tableau de Bord** : Gestion des brouillons, statistiques d'utilisation et galerie de catégories.
- 🌐 **Partage public** : Génération de liens de partage uniques pour chaque CV.

## 🛠️ Stack Technique

### Frontend
- **Framework** : [React 18](https://reactjs.org/) avec [TypeScript](https://www.typescriptlang.org/)
- **Build Tool** : [Vite](https://vitejs.dev/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
- **Gestion d'état** : React Context API (Auth) + Hooks personnalisés
- **Validation** : Zod + React Hook Form

### Backend & Infrastructure
- **BaaS (Backend as a Service)** : [Supabase](https://supabase.com/) (Database, Auth, Edge Functions)
- **API AI** : [OpenRouter](https://openrouter.ai/) (Proxy de modèles LLM)
- **Edge Functions** : TypeScript (Runtime Deno)
- **Proxy Server** : Node.js (Express) pour le relais API sécurisé
- **Déploiement** : Vercel (Frontend) / GitHub Actions (CI/CD)

## 📦 Installation

### Prérequis
- **Node.js** : >= 18.x
- **Bun** : Optionnel (mais utilisé pour le lockfile `bun.lockb`)
- **Supabase CLI** : Recommandé pour le développement local des fonctions

### Configuration Backend (Supabase)
1. Créez un projet sur [Supabase](https://supabase.com/).
2. Exécutez les migrations situées dans `supabase/migrations/` pour initialiser le schéma de base de données.
3. Configurez les Edge Functions :
   ```bash
   supabase functions serve ai-cv --no-verify-jwt
   ```

### Configuration Frontend
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/hassan312-god/cv-craft-pro.git
   cd cv-craft-pro
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement (`.env`) :
   ```env
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
   VITE_OPENROUTER_API_KEY=votre_cle_openrouter
   ```
4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

### Serveur API Proxy (Optionnel)
Pour le développement local du proxy :
```bash
cd server
npm install
node api-proxy.js
```

## 📂 Structure du projet

```text
.
├── api/                    # Serverless functions (Vercel) pour les webhooks et OpenRouter
├── public/                 # Assets statiques et images globales
├── server/                 # Serveur proxy Node.js pour contourner les CORS en dev
├── src/
│   ├── components/         # Composants React réutilisables
│   │   ├── templates/      # Logique de rendu des 30+ modèles de CV
│   │   └── ui/             # Composants atomiques Shadcn/UI
│   ├── contexts/           # Contextes globaux (Authentification)
│   ├── hooks/              # Logique métier extraite (Hooks personnalisés)
│   ├── integrations/       # Clients API (Supabase, Lovable)
│   ├── lib/                # Utilitaires (Export PDF, Parsing JSON Resume, etc.)
│   └── pages/              # Vues principales de l'application (Router)
├── supabase/               # Configuration Backend
│   ├── functions/          # Edge Functions (AI, Cron jobs)
│   └── migrations/         # Schémas SQL et politiques RLS
├── vite.config.ts          # Configuration du bundler
└── vercel.json             # Configuration de déploiement Cloud
```

## 🏗️ Architecture Technique : "Qui fait quoi ?"

- **Couche Présentation (`src/components/templates`)** : Chaque template est un composant React pur qui reçoit un objet JSON structuré (standardisé sur JSON Resume). Cela permet d'ajouter un nouveau style de CV simplement en créant un nouveau fichier `.tsx` sans toucher à la logique métier.
- **Logique d'Export (`src/lib/pdfExport.ts`)** : Utilise des techniques de rendu côté client pour transformer le DOM HTML/CSS en documents PDF haute définition, préservant les styles CSS complexes.
- **Gestion des Données (`src/lib/cloudCvs.ts`)** : Assure la synchronisation bidirectionnelle entre le store local (brouillons) et la base de données PostgreSQL via Supabase.
- **Intelligence Artificielle (`supabase/functions/ai-cv`)** : Une fonction Edge qui traite les requêtes d'optimisation de texte, agissant comme middleware sécurisé pour masquer les clés d'API OpenRouter.
- **Système de Thème (`src/lib/themeConfig.ts`)** : Système centralisé gérant les palettes de couleurs et les variantes typographiques injectées dynamiquement dans Tailwind.

## 🤝 Contribution

1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`).
4. Pushez la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

## 📄 Licence

Distribué sous la licence **MIT**. Voir `LICENSE` pour plus d'informations.