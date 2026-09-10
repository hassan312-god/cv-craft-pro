# CV Craft Pro

![GitHub License](https://img.shields.io/github/license/hassan312-god/cv-craft-pro?style=flat-square)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue?style=flat-square)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

**CV Craft Pro** est un créateur de CV en ligne. Un tunnel guidé collecte le parcours du candidat une question à la fois, puis un éditeur libre permet de déplacer, redimensionner et restyliser chaque bloc de la page — sans jamais ressaisir le contenu. Export PDF et PNG, sans compte et sans filigrane.

## Parcours utilisateur

| Route | Page | Rôle |
| --- | --- | --- |
| `/` | Accueil | Présentation, modèles mis en avant, tarifs, FAQ |
| `/create` | **Tunnel de création** | Dix écrans, une question par écran |
| `/editeur` | **Studio canvas** | Édition libre de la page, export PDF et PNG |
| `/modeles` | Galerie de modèles | 16 mises en page, filtres, nuancier, aperçu agrandi |
| `/exemples` | Exemples par métier | 32 CV complets classés en 8 secteurs |
| `/fonctionnalites` · `/tarifs` · `/faq` | Pages éditoriales | Détail de l'offre |
| `/mes-cv` | Mes CV | Brouillons locaux et CV enregistrés en ligne |
| `/auth` | Connexion | Facultatif : sert uniquement à retrouver ses CV ailleurs |
| `/share/:shareId` | Partage public | Lien de consultation d'un CV |
| `/formulaire` | Formulaire détaillé *(hérité)* | Ancien formulaire en cinq étapes, encore accessible |

## Fonctionnalités

- **Tunnel guidé** — modèle, identité, coordonnées, poste visé, expériences, formation, compétences, liens, accroche, récapitulatif. Les expériences et formations sont des listes que l'on complète librement, les compétences se saisissent en étiquettes.
- **Éditeur canvas** — glisser-déposer, redimensionnement par huit poignées, aimantation sur grille de 4 px avec repères d'alignement, édition de texte en place, calques, verrouillage, annuler/rétablir.
- **16 modèles × 8 couleurs d'accent**, tous modifiables après application.
- **Rédaction assistée** — l'accroche est proposée à partir du parcours saisi, via une fonction Edge qui garde la clé d'API côté serveur.
- **Export** — PDF A4 et PNG haute résolution, rendus hors écran pour éviter tout artefact d'interface.
- **Persistance** — brouillons dans le navigateur par défaut, synchronisation Supabase avec un compte.
- **Import** — reprise d'un CV PDF ou Word depuis le formulaire hérité.

## Les modèles

Définis dans `src/lib/canvasPresets.ts`. Chaque modèle est une fonction qui compose une page A4 à partir de blocs positionnés.

| Modèle | Catégorie | Forme |
| --- | --- | --- |
| Prestige | Professionnel | En-tête noir avec photo, colonne de droite, serif |
| Aurora | Moderne | Colonne latérale en dégradé, titres soulignés |
| Monaco | Deux colonnes | Photo centrée en médaillon, encadré de compétences |
| Editorial | Créatif | Composition magazine, très grand nom |
| Classic | Simple | Une colonne dense, filets de section |
| Traditional | Professionnel | Serif, filet de couleur, contact à droite |
| Prime ATS | ATS | Photo discrète, structure linéaire |
| Pure ATS | ATS | Sans couleur ni colonne, le plus sûr pour les robots de tri |
| Specialist | Deux colonnes | Colonne latérale claire |
| Corporate | Professionnel | En-tête sobre avec photo |
| Sidebar Moderne | Deux colonnes | Colonne colorée avec photo |
| Minimal Centré | Simple | Typographie aérée, sections centrées |
| Deux Colonnes | Deux colonnes | Bandeau d'en-tête |
| Créatif Coloré | Créatif | En-tête pleine largeur, parcours en timeline |
| Executive Serif | Professionnel | Sobre, pour profils seniors |
| Bandeau Photo | Moderne | Bandeau sombre avec photo |

## Stack technique

**Frontend** — React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack Query, Zod et React Hook Form.

**Backend** — Supabase (PostgreSQL, Auth, Edge Functions en Deno). La génération de texte passe par la fonction `ai-cv`, qui relaie vers [OpenRouter](https://openrouter.ai/) : la clé d'API reste côté serveur et n'entre jamais dans le bundle.

**Export** — `html2canvas` pour la capture, `jspdf` pour le PDF, `docx` pour l'export Word du formulaire hérité.

**Déploiement** — Vercel pour le frontend, fonctions serverless dans `api/`.

## Installation

### Prérequis

- Node.js >= 18
- Un projet Supabase (facultatif pour un simple essai en local, mais le client échoue au démarrage sans les variables)
- Supabase CLI, si vous travaillez sur les Edge Functions

### Mise en route

```bash
git clone https://github.com/hassan312-god/cv-craft-pro.git
cd cv-craft-pro
npm install
cp .env.example .env
npm run dev
```

### Variables d'environnement

Côté navigateur — ces valeurs sont publiques par nature et se retrouvent dans le bundle :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=votre-cle-publique
VITE_SUPABASE_PROJECT_ID=votre-project-id
```

Côté serveur uniquement — à définir dans les secrets Supabase ou de la plateforme d'hébergement, **jamais avec un préfixe `VITE_`**, qui les exposerait publiquement :

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=qwen/qwen-2.5-72b-instruct

CANVA_CLIENT_ID=
CANVA_CLIENT_SECRET=
CANVA_REDIRECT_URI=https://cv-craft-pro.vercel.app/api/canva/callback
```

### Backend

```bash
# Migrations : fichiers SQL de supabase/migrations/
supabase db push

# Fonction de génération de texte, en local
supabase functions serve ai-cv --no-verify-jwt
```

## Scripts

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build de production |
| `npm run build:dev` | Build en mode développement |
| `npm run preview` | Prévisualisation du build |
| `npm run lint` | ESLint sur le dépôt |

## Intégration Canva Connect

Quatre fonctions serverless portent le flux OAuth 2.0 avec PKCE.

| Route | Méthode | Rôle |
| --- | --- | --- |
| `/api/canva/authorize` | GET | Génère le couple PKCE et le `state`, redirige vers le consentement Canva |
| `/api/canva/callback` | GET | **URL de redirection à déclarer dans la console Canva.** Vérifie le `state`, échange le code contre les jetons |
| `/api/canva/status` | GET | Indique si ce navigateur est connecté, sans jamais exposer le jeton |
| `/api/canva/disconnect` | POST | Efface les jetons de ce navigateur |

Pour lancer la connexion depuis l'application : `window.location.href = '/api/canva/authorize'`.

Au retour, l'utilisateur arrive sur `/` avec `?canva=connecte`, ou `?canva=error&reason=...` en cas d'échec.

### Configuration

Dans la console Canva, l'URL de redirection doit correspondre **au caractère près** à `CANVA_REDIRECT_URI` :

```
https://cv-craft-pro.vercel.app/api/canva/callback
```

Les variables sont listées dans `.env.example`. `CANVA_CLIENT_SECRET` est un secret serveur : il ne doit jamais porter le préfixe `VITE_`, qui l'inlinerait dans le bundle.

### Choix d'implémentation

- **PKCE obligatoire** — le `code_verifier` ne quitte jamais le serveur ; seul son empreinte SHA-256 transite par le navigateur.
- **`state` vérifié en temps constant** — protège du rejeu et de la falsification de requête.
- **Secret en authentification Basic** — jamais dans le corps de la requête de jeton.
- **Jetons en cookie `HttpOnly`, `Secure`, `SameSite=Lax`** — inaccessibles au JavaScript de la page.
- **Rafraîchissement automatique** — une minute avant expiration, de façon transparente.

### Limite connue

Les jetons vivent dans un cookie, donc dans **un seul navigateur** : ils ne suivent pas l'utilisateur d'un appareil à l'autre et ne sont pas exploitables par une tâche de fond.

Une version multi-appareils demande une table Supabase indexée par utilisateur, avec chiffrement au repos du jeton de rafraîchissement. Le stockage est isolé dans `storeTokens` et `getValidAccessToken` (`api/_canva.ts`) : c'est le seul endroit à reprendre.

## Structure du projet

```text
.
├── api/                          # Fonctions serverless Vercel
│   ├── _canva.ts                 # PKCE, cookies et échange de jeton Canva
│   ├── canva/                    # Flux OAuth : authorize, callback, status, disconnect
│   ├── openrouter.ts             # Relais protégeant la clé OpenRouter
│   └── webhook.ts                # Réception d'événements
├── server/                       # Proxy Node.js pour le développement local
├── supabase/
│   ├── functions/ai-cv/          # Edge Function de génération de texte
│   └── migrations/               # Schéma SQL et politiques RLS
└── src/
    ├── components/
    │   ├── canvas/               # Cœur de l'éditeur (voir ci-dessous)
    │   ├── wizard/               # Coquille du tunnel de création
    │   ├── SiteHeader / SiteFooter
    │   ├── Reveal.tsx            # Révélation au défilement
    │   ├── templates/            # Anciens modèles React (voir « Dette connue »)
    │   └── ui/                   # Composants shadcn/ui
    ├── contexts/                 # Authentification
    ├── lib/
    │   ├── canvasDocument.ts     # Modèle de document et extraction des données du CV
    │   ├── canvasPresets.ts      # Les 16 modèles et la palette d'accents
    │   ├── canvasExport.ts       # Export PDF et PNG
    │   ├── demoResumes.ts        # CV de démonstration des aperçus
    │   ├── exampleCVData.ts      # Exemples par métier
    │   ├── avatarPlaceholder.ts  # Avatars SVG génériques
    │   └── draftStorage.ts       # Brouillons locaux
    └── pages/                    # Une page par route
```

## Architecture de l'éditeur

Le cœur du produit tient en quatre fichiers.

**`lib/canvasDocument.ts`** définit le document : une page A4 de 794 × 1123 px portant des blocs librement positionnés. Deux familles cohabitent :

- les **blocs libres** — `text`, `heading`, `image`, `shape`, `divider` — dont le contenu est saisi sur le canvas ;
- les **blocs liés** — `section` — qui affichent en direct une partie des données du formulaire.

C'est ce second type qui fait tenir l'ensemble : déplacer le bloc « Expériences » ne le détache pas du parcours saisi, et modifier une expérience ne casse pas la mise en page.

**`lib/canvasPresets.ts`** compose chaque modèle en empilant ces blocs à des coordonnées choisies. Ajouter un modèle revient à écrire une fonction et une entrée dans le tableau — aucune logique métier à toucher.

**`components/canvas/CanvasRenderer.tsx`** produit le rendu figé, partagé par les aperçus et par l'export. Le même composant sert à l'écran et au PDF, ce qui garantit que le fichier exporté correspond à ce qui était affiché.

**`components/canvas/ResumeThumb.tsx`** met la page à l'échelle de son conteneur. La page est rendue à sa taille réelle puis réduite par `transform`, et positionnée en absolu : `transform` ne modifiant pas la boîte de mise en page, un enfant en flux ferait autrement gonfler les grilles qui l'entourent.

L'export (`lib/canvasExport.ts`) monte le document hors écran plutôt que de capturer le DOM de l'éditeur, afin qu'aucune poignée ni repère d'alignement ne se retrouve dans le PDF.

## Dette connue

Points à traiter, listés ici pour éviter les mauvaises surprises :

- **Anciens modèles React** — `src/components/templates/` contient une trentaine de composants qui ne sont plus utilisés que par le formulaire hérité (`/formulaire`) et une page de test. Ils sont supprimables une fois ce formulaire retiré.
- **Page unique** — le document canvas est mono-page A4 : un contenu très long est rogné plutôt que réparti sur plusieurs pages.
- **Témoignages de l'accueil** — ce sont des exemples de mise en page, pas de vrais avis. À remplacer avant une mise en ligne publique.
- **Lint** — le dépôt comporte des erreurs ESLint préexistantes dans `src/components/templates/` et `src/components/ui/`.

## Contribution

1. Forkez le projet.
2. Créez votre branche (`git checkout -b feature/ma-fonctionnalite`).
3. Vérifiez que `npx tsc --noEmit`, `npm run lint` et `npm run build` passent.
4. Commitez, poussez, puis ouvrez une Pull Request.

## Licence

Distribué sous licence **MIT**. Voir le fichier `LICENSE`.
