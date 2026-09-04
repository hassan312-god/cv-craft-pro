# CV Builder Pro

Application web pour créer, personnaliser, sauvegarder et exporter des CV professionnels au format PDF A4.

## Fonctionnalités

- Création guidée en 5 étapes (informations, expériences, formation, compétences, thème)
- Génération IA d'un **CV complet en une seule étape** (ou section par section)
- Plus de 30 templates et une galerie de modèles par secteur
- Aperçu A4 en temps réel (fixe sur desktop, modal sur mobile)
- Export PDF A4 haute qualité et export Word
- Brouillons locaux + sauvegarde cloud « Mes CV » (compte requis)
- Partage par lien, statistiques d'utilisation, import de CV existant (PDF/DOCX)
- Interface responsive, sans emoji, couleurs solides (aucun gradient)

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Backend : base de données, authentification et fonctions serveur (Supabase / Lovable Cloud)
- IA : fonction serveur `ai-cv` (OpenRouter, clé API côté serveur uniquement)
- PDF : `jspdf` + `html2canvas`

## Démarrage

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # build de production dans dist/
```

## Variables d'environnement

Copiez `.env.example` vers `.env.local`, puis remplacez les valeurs Supabase
par celles de votre projet avant de lancer le serveur de développement.

Front (générées automatiquement) :

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
```

Côté serveur (secret, jamais exposé au navigateur) :

```
OPENROUTER_API_KEY=
OPENROUTER_MODEL=qwen/qwen-2.5-72b-instruct   # optionnel
```

## Structure

```
src/
  pages/        Index, Gallery, CVCreate, Auth, MyCVs, Share, ...
  components/   CVPreview, TemplateSelector, templates/
  lib/          pdfExport, wordExport, openRouter, cloudCvs, draftStorage, ...
  contexts/     AuthContext
supabase/
  functions/ai-cv/   proxy IA sécurisé
```

## Déploiement Vercel

Le fichier `vercel.json` configure le build Vite (`dist/`) et la réécriture SPA.

```bash
npm i -g vercel
vercel --prod
```

Ajoutez les variables `VITE_*` dans les paramètres du projet Vercel. La génération IA passe par la fonction serveur du backend, aucune clé n'est nécessaire côté Vercel.

## Licence

MIT — voir `LICENSE`.
