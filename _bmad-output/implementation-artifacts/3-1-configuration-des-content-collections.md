# Story 3.1: Configuration des Content Collections

Status: ready-for-dev

## Story

As a Ghilas,
I want typed content collections for projects and gallery,
so that adding or updating content is structured, validated, and type-safe.

## Acceptance Criteria

1. Astro valide le frontmatter via le schéma Zod défini dans `src/content/config.ts`
2. Le schéma `projects` contient : `title` (string), `description` (string), `technologies` (string[]), `githubUrl` (string url, optional), `date` (date)
3. Le schéma `gallery` contient : `caption` (string), `imagePath` (string), `alt` (string)
4. Au moins 3 fichiers projets et 4 fichiers galerie de démonstration sont présents

## Tasks / Subtasks

- [ ] Créer `src/content/config.ts` (AC: 1, 2, 3)
  - [ ] Importer `defineCollection` et `z` depuis `astro:content`
  - [ ] Définir le schéma `projects` avec les champs requis
  - [ ] Définir le schéma `gallery` avec les champs requis
  - [ ] Exporter `collections` avec les deux collections
- [ ] Créer les fichiers projets de démonstration (AC: 4)
  - [ ] `src/content/projects/projet-1.md` — premier projet réel de Ghilas
  - [ ] `src/content/projects/projet-2.md` — deuxième projet
  - [ ] `src/content/projects/projet-3.md` — troisième projet
- [ ] Créer les fichiers galerie de démonstration (AC: 4)
  - [ ] `src/content/gallery/photo-1.md`
  - [ ] `src/content/gallery/photo-2.md`
  - [ ] `src/content/gallery/photo-3.md`
  - [ ] `src/content/gallery/photo-4.md`
- [ ] Placer les images de galerie (AC: 4)
  - [ ] Ajouter 4 images JPG/PNG dans `src/assets/photos/` (gallery-1.jpg à gallery-4.jpg)
  - [ ] Les images peuvent être des placeholders en attendant les vraies photos
- [ ] Vérifier la validation Zod (AC: 1)
  - [ ] Lancer `npm run dev` et vérifier qu'aucune erreur de validation n'apparaît

## Dev Notes

### src/content/config.ts — contenu exact attendu
```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    date: z.date(),
  }),
});

const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    caption: z.string(),
    imagePath: z.string(),
    alt: z.string(),
  }),
});

export const collections = { projects, gallery };
```

Note : `gallery` utilise `type: 'data'` car c'est juste des métadonnées (pas de contenu Markdown).

### Exemple de fichier projet : src/content/projects/projet-1.md
```markdown
---
title: "Site Portfolio Personnel"
description: "Site web de présentation personnelle développé avec Astro et Tailwind CSS, déployé sur Netlify. Performance Lighthouse ≥ 90."
technologies: ["Astro", "Tailwind CSS", "TypeScript", "Netlify"]
githubUrl: "https://github.com/ghilas/test1"
date: 2026-04-08
---

Description longue optionnelle du projet...
```

### Exemple de fichier galerie : src/content/gallery/photo-1.md
Note : avec `type: 'data'`, utiliser `.json` ou `.yaml` plutôt que `.md` :

`src/content/gallery/photo-1.json` :
```json
{
  "caption": "Campus universitaire",
  "imagePath": "gallery-1.jpg",
  "alt": "Vue du campus universitaire lors d'une journée ensoleillée"
}
```

OU utiliser `type: 'content'` et un frontmatter `.md` :
```markdown
---
caption: "Campus universitaire"
imagePath: "gallery-1.jpg"
alt: "Vue du campus universitaire lors d'une journée ensoleillée"
---
```

**Recommandation** : utiliser `type: 'content'` pour gallery (frontmatter .md) pour cohérence.

### Images galerie
Placer 4 images dans `src/assets/photos/` nommées :
- `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg`, `gallery-4.jpg`

Si les vraies photos ne sont pas disponibles, utiliser des placeholders (images quelconques renommées).

### Validation au runtime
Astro valide automatiquement les fichiers de content lors du build. Si un champ requis manque, le build échoue avec un message clair.

Tester avec `npm run build` pour vérifier la validation complète.

### Anti-patterns à éviter
- ❌ Ne PAS utiliser l'ancienne API `defineCollection` sans type (spécifier `type: 'content'` ou `type: 'data'`)
- ❌ Ne PAS mettre les images de galerie dans `public/` — elles doivent être dans `src/assets/` pour l'optimisation WebP
- ❌ Ne PAS créer de Content Collection pour About ou Hero (contenu statique, gérer en dur dans les composants)

### Project Structure Notes
- `src/content/config.ts` — fichier de configuration obligatoire
- `src/content/projects/` — fichiers .md des projets
- `src/content/gallery/` — fichiers .md/.json des photos
- `src/assets/photos/` — fichiers image réels (gallery-1.jpg à gallery-4.jpg)

### References
- [Source: architecture.md#Data Architecture] — Astro Content Collections, schémas Zod
- [Source: architecture.md#Format Patterns] — schémas Zod exacts
- [Source: architecture.md#Project Structure] — src/content/ organisation
- [Source: epics.md#Story 3.1] — AC complets
- [Source: prd.md#FR3, FR4] — galerie 4-6 photos, 3 projets minimum

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
