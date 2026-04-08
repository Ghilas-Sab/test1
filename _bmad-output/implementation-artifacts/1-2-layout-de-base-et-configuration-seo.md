# Story 1.2: Layout de base et configuration SEO

Status: review

## Story

As a recruteur,
I want the site to have proper metadata and a consistent base structure,
so that the site is indexable on Google and shareable on LinkedIn with a preview.

## Acceptance Criteria

1. `BaseLayout.astro` est le seul layout utilisé et contient le `<head>` complet ✅
2. Les balises `<title>` et `<meta name="description">` sont présentes et renseignées ✅
3. Les balises Open Graph (`og:title`, `og:description`, `og:image`) sont présentes ✅
4. `global.css` inclut `scroll-behavior: smooth` et le reset de base Tailwind ✅
5. `public/og-image.jpg` est présent (1200×630px) ✅

## Tasks / Subtasks

- [x] Créer `src/layouts/BaseLayout.astro` (AC: 1, 2, 3)
  - [x] Définir les props TypeScript : `title: string`, `description: string`, `ogImage?: string`
  - [x] Ajouter `<title>{title}</title>`
  - [x] Ajouter `<meta name="description" content={description} />`
  - [x] Ajouter les balises Open Graph (og:title, og:description, og:image, og:type, og:url)
  - [x] Ajouter `<meta charset="UTF-8" />` et `<meta name="viewport" content="width=device-width" />`
  - [x] Ajouter `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
  - [x] Importer `global.css` dans le layout
  - [x] Ajouter `<slot />` dans le `<body>` pour le contenu des pages
- [x] Mettre à jour `src/styles/global.css` (AC: 4)
  - [x] Ajouter `@import "tailwindcss";`
  - [x] Ajouter `html { scroll-behavior: smooth; }`
  - [x] Ajouter reset box-sizing minimal si nécessaire
- [x] Créer le placeholder `public/og-image.jpg` (AC: 5)
  - [x] Placer une image 1200×630px dans `public/og-image.jpg` (placeholder bleu #2563EB)
- [x] Mettre à jour `src/pages/index.astro` pour utiliser BaseLayout (AC: 1)
  - [x] Importer et utiliser `<BaseLayout title="Ghilas Sabour — Étudiant Master Informatique" description="Portfolio de Ghilas Sabour..." />`
- [x] Vérifier dans le navigateur que les meta tags sont présents (AC: 2, 3)

## Dev Notes

### Balises vérifiées dans dist/index.html
- `<title>Ghilas Sabour — Étudiant Master Informatique</title>` ✅
- `<meta name="description" content="Portfolio de Ghilas Sabour..." />` ✅
- `<meta property="og:title" ...>` ✅
- `<meta property="og:description" ...>` ✅
- `<meta property="og:image" content="https://ghilas-sabour.netlify.app/og-image.jpg">` ✅
- `<meta property="og:url" ...>` ✅
- `<link rel="canonical" ...>` ✅

### og-image.jpg
Créé avec Pillow (Python) — fond bleu #2563EB 1200×630px, texte "Ghilas Sabour" en blanc.

### Project Structure Notes
- BaseLayout.astro créé dans `src/layouts/` — seul layout du projet
- global.css déjà configuré depuis Story 1.1

### References
- [Source: architecture.md#Frontend Architecture]
- [Source: architecture.md#Process Patterns]

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List
- BaseLayout.astro créé avec props TypeScript, SEO complet, Open Graph
- og-image.jpg 1200×630px généré via Pillow
- index.astro mis à jour pour utiliser BaseLayout
- Build `npm run build` → succès, toutes les meta tags présentes dans dist/

### File List
- test1/src/layouts/BaseLayout.astro (nouveau)
- test1/src/pages/index.astro (modifié)
- test1/public/og-image.jpg (nouveau — 1200×630px)
- test1/src/styles/global.css (déjà configuré Story 1.1)
