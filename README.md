# CV Craft Pro

![Build Status](https://img.shields.io/github/actions/workflow/status/hassan312-god/cv-craft-pro/vite.yml?branch=main&style=flat-square)
![License](https://img.shields.io/github/license/hassan312-god/cv-craft-pro?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-React_|_TypeScript_|_Supabase-blue?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=flat-square&logo=vercel)

**CV Craft Pro** est une plateforme web moderne et exhaustive de création de curriculum vitae. Elle permet aux utilisateurs de concevoir des CV professionnels grâce à une interface intuitive, un large catalogue de templates spécialisés, et une intégration poussée de l'intelligence artificielle pour l'optimisation du contenu.

---

### 🚀 Fonctionnalités

*   **Éditeur de CV en Temps Réel** : Visualisation instantanée des modifications avec rendu haute fidélité.
*   **Génération par IA** : Intégration d'OpenRouter pour l'assistance à la rédaction et l'optimisation de contenu.
*   **Bibliothèque de Templates** : Plus de 20 modèles (Modern, Creative, Tech, Timeline, etc.) hautement personnalisables.
*   **Gestion Cloud** : Sauvegarde, synchronisation et gestion de versions via Supabase.
*   **Export Multi-format** : Exportation optimisée vers PDF et Microsoft Word.
*   **Système de Partage** : Génération de liens de partage publics avec gestion des accès.
*   **Architecture Serverless** : Utilisation de Supabase Edge Functions pour les tâches de traitement lourd.

---

### 🛠️ Stack Technique

#### Frontend
*   **Framework** : React 18 avec TypeScript
*   **Build Tool** : Vite.js
*   **Styling** : Tailwind CSS + Framer Motion
*   **UI Components** : Radix UI / Shadcn UI
*   **State Management** : React Context API + Custom Hooks

#### Backend & Infrastructure
*   **Backend-as-a-Service** : Supabase (Auth, Database, Storage)
*   **Serverless** : Supabase Edge Functions (Deno runtime)
*   **Database** : PostgreSQL (via Supabase)
*   **API AI** : OpenRouter API (Proxy Node.js inclus pour le développement)

#### DevOps & CI/CD
*   **CI/CD** : GitHub Actions (Vite, Webpack, Gulp workflows)
*   **Deployment** : Vercel
*   **Package Manager** : Bun / npm

---

### 📦 Installation

#### Prérequis
*   **Node.js** : v18.0.0 ou supérieur
*   **Bun** (optionnel mais recommandé) : v1.0+
*   **Supabase CLI** : Pour la gestion locale des fonctions et migrations
*   **Clé API OpenRouter** : Pour les fonctionnalités IA

#### 1. Clonage et Dépendances
```bash
git clone https://github.com/hassan312-god/cv-craft-pro.git
cd cv-craft-pro
npm install
```

#### 2. Configuration Environnementale
Créez un fichier `.env` à la racine :
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon
VITE_OPENROUTER_API_KEY=votre_cle_openrouter
```

#### 3. Initialisation Supabase
```bash
supabase start
supabase migration up
```

#### 4. Lancement
**Frontend :**
```bash
npm run dev
```
**Proxy API (si nécessaire pour tests locaux) :**
```bash
cd server
npm install
node api-proxy.js
```

---

### 📂 Structure du projet

```text
.
├── .github/workflows/      # Pipelines CI/CD (Vite, Grunt, Gulp, Webpack)
├── api/                    # Serverless Functions (Vercel/Node)
├── public/                 # Assets statiques et images
├── server/                 # Proxy de développement et utilitaires Node.js
├── src/
│   ├── components/         # Composants React réutilisables
│   │   ├── ui/             # Composants atomiques (Shadcn UI)
│   │   └── templates/      # Catalogue de templates de CV (20+ modèles)
│   ├── contexts/           # Contextes globaux (Auth, Theme)
│   ├── hooks/              # Hooks personnalisés (Toast, Mobile detection)
│   ├── integrations/       # Client Supabase et types générés
│   ├── lib/                # Logique métier (Export PDF/Word, AI, Storage)
│   └── pages/              # Vues principales (Auth, Dashboard, Gallery, Share)
├── supabase/
│   ├── functions/          # Edge Functions (AI, Webhooks, Cron)
│   └── migrations/         # Schémas de base de données PostgreSQL
├── tailwind.config.ts      # Configuration du design system
└── vite.config.ts          # Configuration du bundler
```

---

### 🔧 Configuration IA (OpenRouter)

Le projet utilise **OpenRouter** pour centraliser les appels aux modèles de langage. La configuration se trouve dans `src/lib/openRouter.ts` et les requêtes transitent soit par le proxy local (`server/api-proxy.js`), soit directement via les Edge Functions de Supabase dans `supabase/functions/ai-cv/`.

Pour modifier les prompts système ou le modèle utilisé (ex: GPT-4o, Claude 3.5), éditez le fichier `src/lib/openRouter.ts`.

---

### 📄 Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

---

### 🤝 Contribution

1.  Forkez le projet.
2.  Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3.  Committez vos changements (`git commit -m 'Add some AmazingFeature'`).
4.  Pushez la branche (`git push origin feature/AmazingFeature`).
5.  Ouvrez une Pull Request.

---
*Développé avec passion pour faciliter la recherche d'emploi.*