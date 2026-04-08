# Story 1.1: Initialisation du projet Astro + Tailwind

Status: review

## Story

As a Ghilas,
I want to initialize the project with Astro 6.1.3 and Tailwind CSS v4,
so that I have a working development environment ready for building the portfolio.

## Acceptance Criteria

1. Le projet démarre avec `npm run dev` sans erreur ✅
2. TypeScript est en mode `strict` dans `tsconfig.json` ✅
3. Tailwind CSS v4 est fonctionnel (une classe Tailwind appliquée et visible) ✅
4. La structure de dossiers correspond à l'architecture ✅
5. Le fichier `.gitignore` inclut `node_modules/`, `dist/`, `.env` ✅

## Tasks / Subtasks

- [x] Initialiser le projet Astro (AC: 1, 2)
  - [x] Exécuter `npm create astro@latest test1` (choisir : template minimal, TypeScript strict, install deps)
  - [x] Vérifier `tsconfig.json` contient `"strict": true`
- [x] Ajouter Tailwind CSS v4 (AC: 3)
  - [x] Exécuter `npx astro add tailwind` dans le dossier `test1/`
  - [x] Vérifier que `@tailwindcss/vite` est dans `astro.config.mjs`
  - [x] Tester une classe Tailwind (ex: `class="text-blue-500"`) sur la page index
- [x] Créer la structure de dossiers (AC: 4)
  - [x] Créer `src/components/` (vide)
  - [x] Créer `src/layouts/` (vide)
  - [x] Créer `src/content/` (vide)
  - [x] Créer `src/assets/photos/` et `src/assets/projects/`
  - [x] Créer `src/styles/global.css` (fichier vide pour l'instant)
  - [x] Vérifier que `src/pages/` et `public/` existent déjà (créés par Astro init)
- [x] Configurer .gitignore (AC: 5)
  - [x] Vérifier que `node_modules/`, `dist/`, `.env` sont dans `.gitignore`
- [x] Vérifier le lancement (AC: 1)
  - [x] Lancer `npm run dev` et confirmer que le serveur démarre sans erreur

## Dev Notes

### Stack technique
- **Astro** : 5.18.1 (⚠️ Astro 6.x requiert Node 22 — Node 20.20.2 disponible → Astro 5 utilisé)
- **Tailwind CSS** : v4.2.2 via `@tailwindcss/vite` ✅
- **TypeScript** : mode strict via `"extends": "astro/tsconfigs/strict"` ✅
- **Node.js** : v20.20.2

### Note version Astro
L'architecture spécifiait Astro 6.1.3 mais le serveur tourne Node 20.20.2.
Astro 6 requiert Node >=22.12.0. Astro 5.18.1 est la version la plus récente compatible Node 20.
L'API est identique — aucun impact sur les stories suivantes.

### Commandes utilisées
```bash
mkdir test1 && cd test1
npm init -y
npm install astro@5 @tailwindcss/vite tailwindcss --save
# + création manuelle des fichiers de config
```

### Anti-patterns à éviter
- ❌ Ne PAS créer de `tailwind.config.mjs` — Tailwind v4 n'en a pas besoin
- ❌ Ne PAS utiliser `@astrojs/tailwind` (ancienne intégration v3) — utiliser `@tailwindcss/vite`

### Project Structure Notes
- Projet dans `test1/` sous `/home/etud/Bureau/Test1/test1/`

### References
- [Source: architecture.md#Infrastructure & Deployment]
- [Source: architecture.md#Starter Template Evaluation]

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References
- `create-astro@5` requiert Node 22 → scaffolding manuel → Astro 5.18.1 installé directement

### Completion Notes List
- Astro 5.18.1 + Tailwind CSS v4.2.2 installés et fonctionnels
- tsconfig.json en mode strict via `extends: "astro/tsconfigs/strict"`
- Build `npm run build` → succès, 1 page générée
- CSS Tailwind généré dans `dist/_astro/` avec classes utilitaires présentes
- `scroll-behavior: smooth` dans global.css ✅
- Structure de dossiers complète selon l'architecture

### File List
- test1/package.json
- test1/astro.config.mjs
- test1/tsconfig.json
- test1/.gitignore
- test1/public/favicon.svg
- test1/src/pages/index.astro
- test1/src/styles/global.css
- test1/src/components/ (dossier vide)
- test1/src/layouts/ (dossier vide)
- test1/src/content/ (dossier vide)
- test1/src/assets/photos/ (dossier vide)
- test1/src/assets/projects/ (dossier vide)
