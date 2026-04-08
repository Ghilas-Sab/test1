---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-04-08'
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/product-brief.md', '_bmad-output/planning-artifacts/prd-validation-report.md']
workflowType: 'architecture'
project_name: 'Test1'
user_name: 'ghilas'
date: '2026-04-08'
---

# Architecture Decision Document

_Ce document se construit collaborativement étape par étape. Les sections sont ajoutées au fil des décisions architecturales._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Site portfolio statique single-page composé de 5 sections ancrées :
Hero (identité), À propos (profil + compétences), Galerie (4-6 photos),
Projets (3 minimum avec détails techniques), Contact (formulaire + coordonnées).
Maintenance par Ghilas via git push → déploiement automatique.

**Non-Functional Requirements:**
- Lighthouse Performance ≥ 90/100
- Chargement initial < 2 secondes
- Responsive mobile-first (320px → 1440px+)
- Accessibilité niveau AA (WCAG 2.1)
- SEO : balises meta, Open Graph, URL propre
- Navigateurs : Chrome, Firefox, Safari, Edge (2 dernières versions)
- CI/CD : déploiement auto depuis GitHub via Netlify

**Scale & Complexity:**
- Complexité : Faible — aucun backend, aucune BDD, aucun temps réel
- Domaine : Web statique (SSG)
- Utilisateurs : recruteurs (lecture seule) + Ghilas (maintenance)
- Composants architecturaux estimés : 8

### Technical Constraints & Dependencies

- Stack définie dans le PRD : Astro 4 + Tailwind CSS + Netlify + GitHub
- Formulaire géré par Netlify Forms — pas de serveur requis
- Génération statique obligatoire (Zero-JS par défaut)
- Hébergement Netlify avec domaine personnalisé

### Cross-Cutting Concerns Identified

- **Performance** — chaque décision de composant, image, CSS doit viser Lighthouse ≥ 90
- **Accessibilité AA** — alt text, contraste, navigation clavier sur tout le site
- **Responsive** — mobile-first sur chaque section
- **SEO** — structure HTML sémantique, meta tags, Open Graph

## Starter Template Evaluation

### Primary Technology Domain

Web statique (SSG) — site portfolio single-page sans backend ni état dynamique.

### Starter Options Considered

Stack arrêtée dans le PRD : Astro + Tailwind CSS + Netlify.
Starter officiel Astro retenu — seul candidat pertinent pour ce type de projet.
Note : le PRD mentionne "Astro 4" — version actuelle au 2026-04-08 : **Astro 6.1.3**.

### Selected Starter: npm create astro@latest

**Rationale :** Starter officiel, maintenu par l'équipe Astro core. TypeScript inclus par défaut. Structure projet optimale pour SSG.

**Initialization Commands:**

```bash
npm create astro@latest ghilas-portfolio
cd ghilas-portfolio
npx astro add tailwind
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:** TypeScript activé par défaut (tsconfig.json inclus)

**Styling Solution:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (ajouté post-init avec `npx astro add tailwind`)

**Build Tooling:** Vite intégré — HMR dev server, optimisation assets auto

**Testing Framework:** Non inclus — hors scope MVP

**Code Organization:**
- `src/pages/` — routing basé sur fichiers
- `src/components/` — composants Astro réutilisables
- `src/layouts/` — layout principal (BaseLayout.astro)
- `src/styles/` — CSS global
- `public/` — assets statiques (images, favicons)

**Development Experience:**
- Hot reload via Vite
- `astro.config.mjs` pour configuration centralisée
- `astro:assets` pour optimisation images automatique

**Note:** L'initialisation du projet est la première story d'implémentation.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Structure de contenu : Astro Content Collections
- Navigation : Smooth scroll CSS natif
- Galerie : dialog HTML natif (pure CSS)
- TypeScript : mode strict

**Deferred Decisions (Post-MVP):**
- Blog technique (Growth)
- Multilingue FR/EN (Vision)
- Compteur de visites (Growth)

### Data Architecture

**Content Management : Astro Content Collections**
- Décision : données projets/compétences gérées via `src/content/`
- Schéma Zod pour validation des données
- Rationale : extensible pour blog futur, natif Astro, bien typé
- Affecte : section Projets, À propos

**Pas de base de données** — site 100% statique, aucun état persistant côté serveur.

### Authentication & Security

**Pas d'authentification** — portfolio public, lecture seule.

**Protection formulaire :** Netlify Forms spam filtering natif + champ honeypot HTML.

### API & Communication Patterns

**Pas d'API** — site statique.

**Formulaire de contact :** Netlify Forms (attribut `data-netlify="true"` sur le form).
Champs : nom, email, message. Confirmation d'envoi via page de succès Netlify.

### Frontend Architecture

**Structure :** Single-page avec sections ancrées (`#hero`, `#about`, `#gallery`, `#projects`, `#contact`)

**Navigation :** `scroll-behavior: smooth` en CSS global — zéro JS

**Galerie :** `<dialog>` HTML natif + CSS — zéro JS, accessible nativement

**Composants Astro (un par section) :**
- `Hero.astro`
- `About.astro`
- `Gallery.astro`
- `Projects.astro`
- `Contact.astro`
- `BaseLayout.astro` (head SEO, meta, OG)
- `Nav.astro`

**Images :** `astro:assets` — optimisation WebP automatique, lazy loading

**TypeScript :** mode `strict`

### Infrastructure & Deployment

**Hébergement :** Netlify (offre gratuite)
**CI/CD :** GitHub → Netlify auto-deploy sur push `main`
**Domaine :** personnalisé (à configurer dans Netlify dashboard)
**Commande d'init :**
```bash
npm create astro@latest test1
cd test1
npx astro add tailwind
```

### Decision Impact Analysis

**Séquence d'implémentation :**
1. Init projet (`npm create astro@latest test1`)
2. BaseLayout + Nav + SEO head
3. Sections dans l'ordre du scroll (Hero → About → Gallery → Projects → Contact)
4. Configuration Netlify Forms
5. Déploiement Netlify + domaine

**Dépendances croisées :**
- Content Collections doit être configuré avant les sections Projets et About
- BaseLayout doit être créé avant toutes les sections
- Netlify Forms nécessite un déploiement réel pour fonctionner (pas en dev local)

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Points de conflit potentiels identifiés :** 4 zones
(nommage fichiers, organisation contenu, gestion images, structure composants)

### Naming Patterns

**Composants Astro :** PascalCase
- ✅ `Hero.astro`, `About.astro`, `ProjectCard.astro`
- ❌ `hero.astro`, `project-card.astro`

**Fichiers TypeScript utilitaires :** camelCase
- ✅ `formatDate.ts`, `getSortedProjects.ts`
- ❌ `FormatDate.ts`, `get-sorted-projects.ts`

**Content Collections :** kebab-case pour noms de collection et fichiers
- ✅ `src/content/projects/mon-projet.md`
- ❌ `src/content/Projects/MonProjet.md`

**Variables & fonctions TypeScript :** camelCase
**Types & Interfaces :** PascalCase — `ProjectEntry`, `GalleryImage`
**CSS :** classes Tailwind uniquement — pas de classes custom sauf dans `global.css`

### Structure Patterns

**Organisation fichiers :**
```
src/
  components/          # Un fichier = un composant
  content/
    projects/          # .md par projet
    gallery/           # .md par photo (légende + path)
  layouts/
    BaseLayout.astro   # Unique layout avec head SEO
  pages/
    index.astro        # Page unique — importe toutes les sections
    success.astro      # Page confirmation formulaire Netlify
  styles/
    global.css         # scroll-behavior: smooth + reset minimal
  assets/              # Images optimisées via astro:assets
public/
  favicon.svg
  og-image.jpg         # Image Open Graph 1200x630
```

**Règle :** `src/assets/` pour toutes les images du site (optimisation auto).
`public/` uniquement pour favicon et og-image (référencés en meta tags).

### Format Patterns

**Content Collection — Schéma Projet (Zod) :**
```typescript
// src/content/config.ts
title: z.string()
description: z.string()
technologies: z.array(z.string())
githubUrl: z.string().url().optional()
date: z.date()
```

**Content Collection — Schéma Galerie :**
```typescript
caption: z.string()
imagePath: z.string()
alt: z.string()
```

### Process Patterns

**Formulaire de contact :**
- Attribut `data-netlify="true"` sur le `<form>`
- Champ honeypot : `<input type="hidden" name="bot-field" />`
- `action="/success"` → redirect vers `success.astro`

**SEO — BaseLayout.astro reçoit ces props :**
```typescript
title: string
description: string
ogImage?: string  // default: /og-image.jpg
```

**Accessibilité AA — règles obligatoires :**
- Tout `<img>` a un `alt` non vide
- Ratio contraste ≥ 4.5:1 pour le texte
- Tous les liens et boutons ont un label accessible
- `<dialog>` galerie : `aria-label` + focus trap

### Enforcement Guidelines

**Tous les agents DOIVENT :**
- Utiliser `astro:assets` pour toute image (jamais `<img src="...">` direct)
- Placer la logique de données dans `src/content/` — jamais dans les composants
- Passer les props SEO à BaseLayout — jamais de `<head>` dans les sections
- Tester le formulaire via déploiement Netlify (pas en dev local)

**Anti-Patterns à éviter :**
- ❌ JS inline dans les composants Astro
- ❌ `style` inline — tout passe par Tailwind
- ❌ Images dans `public/` sauf favicon et og-image
- ❌ Créer un 2e layout — BaseLayout est unique

## Project Structure & Boundaries

### Complete Project Directory Structure

```
test1/
├── README.md
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json                  # mode: strict
├── .gitignore
├── .env.example
├── netlify.toml                   # config build Netlify
│
├── public/
│   ├── favicon.svg
│   └── og-image.jpg               # 1200×630 — Open Graph
│
└── src/
    ├── assets/
    │   ├── photos/
    │   │   ├── profile.jpg        # Photo Hero
    │   │   ├── gallery-1.jpg
    │   │   ├── gallery-2.jpg
    │   │   ├── gallery-3.jpg
    │   │   └── gallery-4.jpg
    │   └── projects/
    │       └── (screenshots optionnels)
    │
    ├── components/
    │   ├── Nav.astro              # Navigation sticky avec ancres
    │   ├── Hero.astro             # Nom, photo, titre, CTA
    │   ├── About.astro            # Bio + compétences
    │   ├── Gallery.astro          # Grille + ouverture dialog
    │   ├── GalleryItem.astro      # Photo + dialog lightbox
    │   ├── Projects.astro         # Grille de cartes projets
    │   ├── ProjectCard.astro      # Carte projet individuelle
    │   └── Contact.astro          # Formulaire + coordonnées
    │
    ├── content/
    │   ├── config.ts              # Schémas Zod des collections
    │   ├── projects/
    │   │   ├── projet-1.md
    │   │   ├── projet-2.md
    │   │   └── projet-3.md
    │   └── gallery/
    │       ├── photo-1.md
    │       ├── photo-2.md
    │       ├── photo-3.md
    │       └── photo-4.md
    │
    ├── layouts/
    │   └── BaseLayout.astro       # <head> SEO + OG + structure page
    │
    ├── pages/
    │   ├── index.astro            # Page unique — assemble toutes les sections
    │   └── success.astro          # Page confirmation formulaire Netlify
    │
    └── styles/
        └── global.css             # scroll-behavior: smooth + reset
```

### Architectural Boundaries

**Pas de boundary API** — site 100% statique, zéro endpoint.

**Boundaries composants :**
- `BaseLayout.astro` est le seul composant avec accès au `<head>`
- Chaque section reçoit ses données via `getCollection()` — jamais de fetch réseau
- `GalleryItem.astro` gère son propre `<dialog>` — état local CSS uniquement
- `Contact.astro` délègue la logique de soumission à Netlify Forms

**Boundary déploiement :**
- `src/` → compilé par Astro → `dist/` (gitignored)
- `public/` → copié tel quel dans `dist/`
- `netlify.toml` contrôle la commande de build et le répertoire de publication

### Requirements to Structure Mapping

| Capacité (PRD) | Fichiers |
|---|---|
| Hero (nom, photo, titre, accroche) | `Hero.astro`, `src/assets/photos/profile.jpg` |
| Section À propos + compétences | `About.astro` |
| Galerie photos (4-6 images) | `Gallery.astro`, `GalleryItem.astro`, `src/content/gallery/`, `src/assets/photos/` |
| Section Projets (3 minimum) | `Projects.astro`, `ProjectCard.astro`, `src/content/projects/` |
| Page Contact (formulaire) | `Contact.astro`, `success.astro` |
| Numéro cliquable (tel:) | `Contact.astro` |
| SEO + Open Graph | `BaseLayout.astro`, `public/og-image.jpg` |
| Navigation par ancres | `Nav.astro`, `global.css` |
| CI/CD auto | `netlify.toml`, GitHub main branch |

### Integration Points

**Netlify Forms :**
- `Contact.astro` → POST Netlify → notification email Ghilas → redirect `success.astro`

**astro:assets :**
- `src/assets/**` → optimisation WebP automatique au build → `dist/`

**GitHub → Netlify CI/CD :**
- Push sur `main` → Netlify détecte → `npm run build` → déploiement `dist/`

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/success"
  to = "/success"
  status = 200
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:** Toutes les technologies choisies sont compatibles.
Astro 6.1.3 + Tailwind v4 + Vite forment la stack officielle recommandée.
TypeScript strict + Zod sont natifs à Astro Content Collections.
Netlify Forms s'intègre nativement avec l'hébergement Netlify.

**Pattern Consistency:** Les patterns de nommage, structure et process
sont alignés avec les conventions officielles Astro. Aucun conflit identifié.

**Structure Alignment:** L'arbre de fichiers respecte toutes les décisions —
`src/assets/` pour astro:assets, `src/content/` pour Collections,
`BaseLayout.astro` unique pour SEO, `success.astro` pour Netlify Forms.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:** 7/7 capacités couvertes —
chaque FR du PRD a un composant et/ou fichier de contenu dédié.

**Non-Functional Requirements Coverage:** Tous les NFRs sont adressés
architecturalement — SSG + CDN pour performance, Tailwind pour responsive,
patterns AA pour accessibilité, BaseLayout pour SEO.

### Implementation Readiness Validation ✅

**Decision Completeness:** Toutes les décisions documentées avec versions.
Commande d'init exacte fournie.

**Structure Completeness:** Arbre de fichiers complet et spécifique —
aucun placeholder générique.

**Pattern Completeness:** Naming, structure, formats, process — couverts.
Exemples ✅ / Anti-patterns ✅ fournis pour chaque catégorie.

### Gap Analysis Results

**Gaps critiques :** 0
**Gaps importants :** 0
**Gaps mineurs :** Le contenu exemple des fichiers `.md` (Content Collections)
sera défini lors des stories d'implémentation — non bloquant.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Contexte projet analysé
- [x] Complexité évaluée (faible — SSG statique)
- [x] Contraintes techniques identifiées
- [x] Cross-cutting concerns mappées (perf, a11y, SEO, responsive)

**✅ Architectural Decisions**
- [x] Décisions critiques documentées avec versions
- [x] Stack complète spécifiée (Astro 6.1.3, Tailwind v4, Netlify)
- [x] Patterns d'intégration définis (Netlify Forms, astro:assets, CI/CD)
- [x] Performance adressée architecturalement

**✅ Implementation Patterns**
- [x] Conventions de nommage établies
- [x] Patterns de structure définis
- [x] Patterns de process documentés (formulaire, SEO, accessibilité)
- [x] Anti-patterns documentés

**✅ Project Structure**
- [x] Arbre de répertoires complet
- [x] Boundaries composants établies
- [x] Points d'intégration mappés
- [x] FRs → composants → fichiers : mapping complet

### Architecture Readiness Assessment

**Overall Status : READY FOR IMPLEMENTATION**

**Confidence Level : High**

**Key Strengths :**
- Stack parfaitement adaptée au besoin (SSG portfolio = Astro natif)
- Zéro sur-engineering — aucune technologie inutile
- Traçabilité complète FRs → composants → fichiers
- Performance Lighthouse ≥ 90 garantie par les choix architecturaux

**Areas for Future Enhancement (post-MVP) :**
- Astro View Transitions pour animations (Growth)
- RSS feed si blog ajouté (Growth)
- Multilingue via i18n Astro natif (Vision)

### Implementation Handoff

**Première action :**
```bash
npm create astro@latest test1
cd test1
npx astro add tailwind
```

**Priorité d'implémentation :**
1. Init projet + config TypeScript strict
2. `BaseLayout.astro` + `global.css`
3. `src/content/config.ts` (schémas Zod)
4. Sections dans l'ordre : Hero → About → Gallery → Projects → Contact
5. `success.astro` + configuration Netlify Forms
6. Déploiement Netlify + domaine
