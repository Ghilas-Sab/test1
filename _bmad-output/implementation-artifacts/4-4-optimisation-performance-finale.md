# Story 4.4: Optimisation performance finale

Status: ready-for-dev

## Story

As a recruteur,
I want the site to load fast and score high on Lighthouse,
so that I get a seamless browsing experience and Ghilas demonstrates technical quality.

## Acceptance Criteria

1. Le score Performance Lighthouse est ≥ 90/100
2. Le chargement initial de la page est < 2 secondes (sur réseau standard)
3. Toutes les images sont servies au format WebP via `astro:assets`
4. Le site s'affiche correctement sur Chrome, Firefox, Safari, Edge (2 dernières versions)
5. Le site est fully responsive de 320px à 1440px+ sans scroll horizontal

## Tasks / Subtasks

- [ ] Audit Lighthouse Performance (AC: 1, 2)
  - [ ] Lancer un audit Lighthouse sur le site déployé (pas en local)
  - [ ] Cibler score ≥ 90 en Performance
  - [ ] Vérifier LCP (Largest Contentful Paint) < 2.5s
  - [ ] Vérifier CLS (Cumulative Layout Shift) < 0.1
  - [ ] Vérifier TBT (Total Blocking Time) < 200ms
- [ ] Vérifier les images (AC: 3)
  - [ ] Confirmer que TOUTES les images utilisent `<Image>` de astro:assets
  - [ ] Vérifier dans le HTML généré que les images sont en `.webp`
  - [ ] Vérifier que les `width` et `height` sont explicitement passés (évite le CLS)
  - [ ] Vérifier `loading="eager"` sur l'image Hero et `loading="lazy"` sur les autres
- [ ] Test multi-navigateurs (AC: 4)
  - [ ] Chrome (dernière version) — test complet
  - [ ] Firefox (dernière version) — test complet
  - [ ] Safari (dernière version, macOS ou iOS) — test complet
  - [ ] Edge (dernière version) — test complet
  - [ ] Vérifier le `<dialog>` fonctionne dans tous les navigateurs (support universel depuis 2022)
- [ ] Test responsive (AC: 5)
  - [ ] 320px — iPhone SE : vérifier chaque section, pas de scroll horizontal
  - [ ] 768px — Tablette : vérifier les breakpoints md:
  - [ ] 1440px+ — Desktop large : vérifier le max-w et les marges
  - [ ] Utiliser DevTools Device Emulation pour les tests mobiles
- [ ] Optimisations supplémentaires si score < 90 (AC: 1)
  - [ ] Vérifier que le CSS Tailwind est purgé au build (automatique avec Astro + Tailwind v4)
  - [ ] Vérifier qu'aucun script JS externe n'est chargé
  - [ ] Vérifier les polices (si Google Fonts : utiliser `font-display: swap`)

## Dev Notes

### Lighthouse — lancer l'audit correctement
**IMPORTANT : Toujours auditer le site déployé sur Netlify, pas en local.**
Les CDN, compression et optimisations Netlify impactent les scores.

Méthode recommandée :
1. Ouvrir Chrome en mode incognito (évite les extensions)
2. Aller sur l'URL Netlify du site
3. DevTools → Lighthouse → "Performance" coché → "Analyze page load"
4. Ou utiliser : `npx lighthouse https://ton-site.netlify.app --view`

### Performance Astro SSG — atouts natifs
Astro génère du HTML statique pur avec :
- Zéro JavaScript client-side par défaut ✅
- CSS Tailwind purgé automatiquement ✅
- Images WebP optimisées via astro:assets ✅
- Servi via CDN Netlify ✅

Ces optimisations garantissent généralement un score ≥ 90 sans action supplémentaire.

### Images WebP — vérification
Dans le HTML généré (Vue source ou DevTools), les images doivent avoir des URLs du type :
```html
<img src="/_astro/gallery-1.HASH.webp" ...>
```
Si `<img src="/photos/gallery-1.jpg">` (sans `/_astro/`) → l'image n'utilise PAS astro:assets → corriger.

### Éviter le CLS (Layout Shift)
Toujours spécifier `width` et `height` sur le composant `<Image>` :
```astro
<Image src={photo} alt="..." width={400} height={300} />
```
Cela permet au navigateur de réserver l'espace avant que l'image charge.

### Responsive — breakpoints Tailwind
- `sm:` = 640px (petits mobiles paysage)
- `md:` = 768px (tablettes)
- `lg:` = 1024px (petits desktops)
- `xl:` = 1280px (desktops standards)
- `2xl:` = 1536px (grands écrans)

Tester à 320px en priorité (le plus contraignant).

### Polices
Si des polices Google Fonts sont utilisées, ajouter dans BaseLayout :
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.gstatic.com" />
```
Et utiliser `font-display: swap` dans le CSS.

**Recommandation** : Pour un score maximum, utiliser les polices système (Tailwind `font-sans`) — aucun chargement réseau.

### Test dialog cross-browser
Le `<dialog>` HTML natif est supporté par :
- Chrome 37+ ✅
- Firefox 98+ ✅
- Safari 15.4+ ✅
- Edge 79+ ✅
Support universel pour les 2 dernières versions majeures de chaque navigateur.

### Anti-patterns à éviter
- ❌ Ne PAS ajouter de bibliothèques JS pour les animations (impact performance)
- ❌ Ne PAS utiliser des polices web externes si possible (utiliser font-system)
- ❌ Ne PAS oublier `width` et `height` sur les composants `<Image>` (CLS)
- ❌ Ne PAS tester en local pour le score Lighthouse final — utiliser le déploiement Netlify

### Project Structure Notes
- Aucun nouveau fichier à créer — story d'audit et corrections transversales
- Modifications potentielles dans tous les composants existants

### References
- [Source: architecture.md#Architecture Validation Results] — Performance garantie par SSG + CDN
- [Source: architecture.md#Cross-Cutting Concerns] — Performance, chaque décision vise Lighthouse ≥ 90
- [Source: epics.md#Story 4.4] — AC complets
- [Source: prd.md#NFR1, NFR2, NFR3, NFR6] — Lighthouse ≥ 90, < 2s, responsive, multi-navigateurs

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
