# Story 4.3: Audit accessibilité AA et corrections

Status: ready-for-dev

## Story

As a recruteur (utilisateur avec besoins d'accessibilité),
I want the site to be fully navigable by keyboard and screen reader,
so that the site is inclusive and compliant with WCAG 2.1 AA.

## Acceptance Criteria

1. Le score Accessibility Lighthouse est ≥ 90
2. Toutes les images ont un attribut `alt` non vide
3. Tous les liens et boutons ont un label accessible (texte visible ou `aria-label`)
4. Le ratio de contraste texte/fond est ≥ 4.5:1 sur tout le site
5. La navigation complète du site est possible au clavier (Tab, Entrée, Échap)

## Tasks / Subtasks

- [ ] Audit Lighthouse Accessibility (AC: 1)
  - [ ] Lancer un audit Lighthouse (DevTools → Lighthouse → Accessibility)
  - [ ] Corriger toutes les violations jusqu'à score ≥ 90
- [ ] Vérifier toutes les images (AC: 2)
  - [ ] `Hero.astro` — `alt` descriptif sur la photo de profil ✓ (Story 2.2)
  - [ ] `Gallery.astro` / `GalleryItem.astro` — `alt` sur chaque photo ✓ (Story 3.2)
  - [ ] SVG icône GitHub dans ProjectCard — `aria-hidden="true"` ✓ (Story 3.3)
  - [ ] Corriger tout `alt` manquant ou vide
- [ ] Vérifier tous les liens et boutons (AC: 3)
  - [ ] Liens de navigation dans `Nav.astro` — texte visible ✓ (Story 2.1)
  - [ ] Boutons CTA Hero — texte visible ✓ (Story 2.2)
  - [ ] Boutons d'ouverture dialog galerie — `aria-label` ✓ (Story 3.2)
  - [ ] Bouton fermeture dialog — `aria-label="Fermer"` ✓ (Story 3.2)
  - [ ] Lien GitHub dans ProjectCard — `aria-label` ✓ (Story 3.3)
  - [ ] Liens mailto: et tel: dans Contact — `aria-label` ✓ (Story 4.1)
  - [ ] Corriger tout lien/bouton sans label accessible
- [ ] Vérifier les contrastes (AC: 4)
  - [ ] Utiliser l'outil Contrast Checker (navigateur DevTools ou webaim.org/resources/contrastchecker)
  - [ ] Texte principal sur fond blanc : ≥ 4.5:1
  - [ ] Texte des badges technologies (bleu sur fond bleu clair) : vérifier le ratio
  - [ ] Placeholder des inputs : minimum 3:1 (critère AA pour les placeholders)
  - [ ] Corriger les couleurs non conformes
- [ ] Vérifier la navigation clavier (AC: 5)
  - [ ] Tab à travers tous les éléments interactifs (liens, boutons, inputs)
  - [ ] Vérifier l'ordre de focus logique (haut → bas, gauche → droite)
  - [ ] Vérifier que le focus est visible (outline ou ring visible)
  - [ ] Ouvrir un dialog galerie au clavier (Tab jusqu'au bouton, Entrée pour ouvrir)
  - [ ] Fermer avec Échap (comportement natif du dialog)
  - [ ] Vérifier le focus trap dans le dialog (Tab ne sort pas du dialog)
  - [ ] Soumettre le formulaire contact au clavier
- [ ] Vérifier la structure sémantique (bonus)
  - [ ] `<main>` autour du contenu principal
  - [ ] Hiérarchie des headings : h1 (Hero) → h2 (sections) → h3 (sous-sections)
  - [ ] `<nav>` avec `aria-label` sur Nav.astro
  - [ ] `<article>` sur les cartes projet

## Dev Notes

### Corrections fréquentes à anticiper

**Contraste des couleurs Tailwind**
- `text-gray-600` sur `bg-white` : ratio ~5.9:1 ✅
- `text-gray-500` sur `bg-white` : ratio ~3.9:1 ⚠️ — utiliser `text-gray-600` minimum
- `text-blue-600` sur `bg-white` : ratio ~4.5:1 ✅ (juste)
- `text-blue-700` sur `bg-blue-50` : vérifier avec DevTools

**Focus visible**
Tailwind CSS v4 inclut des styles de focus par défaut via `focus:ring-*`.
S'assurer que les boutons ont `focus:outline-none focus:ring-2 focus:ring-blue-500`.

**Ajout de `<main>` dans index.astro**
```astro
<!-- Avant -->
<Nav />
<Hero />
...

<!-- Après -->
<Nav />
<main>
  <Hero />
  <About />
  <Gallery />
  <Projects />
  <Contact />
</main>
```

**`role="main"` dans BaseLayout**
Alternativement, ajouter `<main>` dans BaseLayout autour du `<slot />`.

**Nav.astro — aria-label sur le nav**
```astro
<nav aria-label="Navigation principale" class="sticky top-0 z-50 ...">
```

**Dialog — focus trap natif**
Le `<dialog>` HTML natif géré avec `showModal()` implémente le focus trap automatiquement.
Vérifier que `showModal()` est bien utilisé (pas `dialog.show()`).

### Lighthouse Accessibility — lancer l'audit
1. Déployer sur Netlify (ou utiliser `npm run build && npm run preview`)
2. Ouvrir Chrome DevTools → Lighthouse
3. Cocher uniquement "Accessibility"
4. Lancer l'audit
5. Corriger les violations (chaque violation a une explication détaillée)

### Ordre de priorité des corrections
1. `alt` manquant sur les images (erreur critique Lighthouse)
2. Labels manquants sur les inputs (erreur critique)
3. Contraste insuffisant (erreur critique)
4. Focus non visible (erreur majeure)
5. Structure sémantique (recommandation)

### Anti-patterns à éviter
- ❌ Ne PAS utiliser `alt=""` sur des images informatives (seulement pour les images décoratives)
- ❌ Ne PAS cacher le focus avec `outline: none` sans alternative
- ❌ Ne PAS ajouter `tabindex="-1"` sur des éléments navigables
- ❌ Ne PAS utiliser `aria-hidden="true"` sur des éléments qui doivent être accessibles

### References
- [Source: architecture.md#Process Patterns] — règles accessibilité AA obligatoires
- [Source: architecture.md#Core Architectural Decisions] — dialog HTML natif avec focus trap
- [Source: epics.md#Story 4.3] — AC complets
- [Source: prd.md#NFR4] — accessibilité WCAG 2.1 AA

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
