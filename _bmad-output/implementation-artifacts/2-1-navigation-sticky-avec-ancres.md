# Story 2.1: Navigation sticky avec ancres

Status: ready-for-dev

## Story

As a recruteur,
I want a sticky navigation bar with anchor links to each section,
so that I can quickly jump to any part of the page from anywhere.

## Acceptance Criteria

1. La barre de navigation reste visible en haut de l'écran lors du scroll
2. Les liens (`#hero`, `#about`, `#gallery`, `#projects`, `#contact`) scrollent vers la section correspondante avec animation fluide
3. La navigation est responsive et utilisable sur mobile (menu hamburger OU liens visibles compacts)
4. Chaque lien a un `aria-label` accessible ou un texte visible suffisant

## Tasks / Subtasks

- [ ] Créer `src/components/Nav.astro` (AC: 1, 2, 3, 4)
  - [ ] Implémenter la structure HTML `<nav>` avec `<ul>` et liens d'ancrage
  - [ ] Appliquer `position: sticky; top: 0;` via Tailwind (`sticky top-0`)
  - [ ] Ajouter `z-index` élevé (`z-50`) pour rester au-dessus du contenu
  - [ ] Ajouter un fond opaque (`bg-white` ou dark) pour masquer le contenu derrière
  - [ ] Ajouter les 5 liens : `#hero`, `#about`, `#gallery`, `#projects`, `#contact`
  - [ ] Ajouter `aria-label` sur chaque lien ou s'assurer que le texte est descriptif
- [ ] Gérer le responsive mobile (AC: 3)
  - [ ] Desktop : liens horizontaux visibles
  - [ ] Mobile : soit liens compacts (texte court), soit menu hamburger simple en CSS
  - [ ] Tester à 320px de large
- [ ] Intégrer Nav dans `src/pages/index.astro` (AC: 1)
  - [ ] Importer `Nav.astro` et le placer avant les sections dans le body
- [ ] Vérifier le scroll fluide (AC: 2)
  - [ ] Confirmer que `scroll-behavior: smooth` dans `global.css` est actif (Story 1.2)
  - [ ] Tester chaque lien dans le navigateur

## Dev Notes

### Nav.astro — structure de base recommandée
```astro
---
// Pas de props requises
---

<nav class="sticky top-0 z-50 bg-white shadow-sm">
  <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
    <span class="font-semibold text-gray-900">Ghilas Sabour</span>
    <ul class="flex gap-6 text-sm font-medium text-gray-600">
      <li><a href="#hero" class="hover:text-gray-900 transition-colors">Accueil</a></li>
      <li><a href="#about" class="hover:text-gray-900 transition-colors">À propos</a></li>
      <li><a href="#gallery" class="hover:text-gray-900 transition-colors">Galerie</a></li>
      <li><a href="#projects" class="hover:text-gray-900 transition-colors">Projets</a></li>
      <li><a href="#contact" class="hover:text-gray-900 transition-colors">Contact</a></li>
    </ul>
  </div>
</nav>
```

### Approche mobile recommandée (sans JS)
Option 1 — Liens compacts cachés partiellement sur petits écrans :
```astro
<ul class="flex gap-2 sm:gap-6 text-xs sm:text-sm font-medium text-gray-600 overflow-x-auto">
```

Option 2 — Menu hamburger CSS pur (checkbox hack) si nécessaire.
**IMPORTANT : Zéro JS — tout doit fonctionner avec du CSS pur.**

### Accessibilité
- Ajouter `role="navigation"` et `aria-label="Navigation principale"` sur le `<nav>`
- Les textes des liens sont suffisamment descriptifs (pas besoin d'aria-label supplémentaire)
- L'ancre active peut être indiquée visuellement via `:focus` et `:hover`

### Scroll fluide
Le smooth scroll est géré par `scroll-behavior: smooth` dans `global.css` (Story 1.2).
Aucun JavaScript requis pour les liens d'ancrage.

### Anti-patterns à éviter
- ❌ Ne PAS utiliser JavaScript pour gérer le sticky ou le scroll
- ❌ Ne PAS mettre `position: fixed` — utiliser `sticky` pour garder le flux normal
- ❌ Ne PAS oublier le `z-50` (sinon le nav passe derrière le contenu des sections)

### Project Structure Notes
- `Nav.astro` dans `src/components/`
- Import dans `src/pages/index.astro` comme premier enfant du `<body>` après BaseLayout

### References
- [Source: architecture.md#Frontend Architecture] — Nav.astro, navigation sticky, smooth scroll CSS natif
- [Source: architecture.md#Core Architectural Decisions] — scroll-behavior: smooth, zéro JS
- [Source: epics.md#Story 2.1] — AC complets
- [Source: prd.md#Responsive Design] — mobile-first 320px → desktop

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
