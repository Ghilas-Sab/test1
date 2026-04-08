# Story 2.2: Section Hero

Status: ready-for-dev

## Story

As a recruteur,
I want to immediately see who Ghilas is when the page loads,
so that I can assess his profile in under 10 seconds.

## Acceptance Criteria

1. La section Hero est visible sans scroll avec : photo de profil, nom complet, titre (Étudiant Master Informatique), phrase d'accroche
2. Un bouton CTA "Me contacter" (scroll vers `#contact`) et un bouton "Voir mes projets" (scroll vers `#projects`) sont présents et fonctionnels
3. La photo est affichée via `astro:assets` (composant `<Image>`)
4. La section est responsive sur mobile (320px) et desktop (1440px+)
5. L'image a un attribut `alt` descriptif non vide

## Tasks / Subtasks

- [ ] Placer la photo de profil (AC: 3)
  - [ ] Ajouter `profile.jpg` (ou `.png`, `.webp`) dans `src/assets/photos/`
  - [ ] La photo doit représenter Ghilas (peut être un placeholder en attendant la vraie photo)
- [ ] Créer `src/components/Hero.astro` (AC: 1, 2, 3, 4, 5)
  - [ ] Ajouter `id="hero"` sur la section
  - [ ] Importer et utiliser le composant `<Image>` depuis `astro:assets`
  - [ ] Afficher l'image avec `alt="Photo de profil de Ghilas Sabour"` et dimensions adaptées
  - [ ] Afficher le nom complet : "Ghilas Sabour"
  - [ ] Afficher le titre : "Étudiant Master Informatique"
  - [ ] Afficher la phrase d'accroche (choisir une accroche percutante)
  - [ ] Ajouter bouton "Me contacter" → `href="#contact"`
  - [ ] Ajouter bouton "Voir mes projets" → `href="#projects"`
- [ ] Rendre responsive (AC: 4)
  - [ ] Mobile (320px) : layout vertical (photo centrée, texte en dessous)
  - [ ] Desktop (1440px+) : layout horizontal (photo gauche, texte droite) ou centré selon design
- [ ] Intégrer dans `src/pages/index.astro` (AC: 1)
  - [ ] Importer et placer `<Hero />` après `<Nav />`

## Dev Notes

### Hero.astro — structure de base
```astro
---
import { Image } from 'astro:assets';
import profilePhoto from '../assets/photos/profile.jpg';
---

<section id="hero" class="min-h-screen flex items-center justify-center px-4 py-16">
  <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
    
    <!-- Photo de profil -->
    <div class="flex-shrink-0">
      <Image
        src={profilePhoto}
        alt="Photo de profil de Ghilas Sabour"
        width={300}
        height={300}
        class="rounded-full object-cover w-48 h-48 md:w-64 md:h-64"
        loading="eager"
      />
    </div>
    
    <!-- Texte -->
    <div class="text-center md:text-left">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Ghilas Sabour</h1>
      <p class="text-xl text-blue-600 font-medium mb-4">Étudiant Master Informatique</p>
      <p class="text-gray-600 text-lg mb-8 max-w-md">
        Passionné par le développement web et les nouvelles technologies. 
        À la recherche d'une alternance pour mettre mes compétences au service de projets ambitieux.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <a href="#contact" class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center">
          Me contacter
        </a>
        <a href="#projects" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors text-center">
          Voir mes projets
        </a>
      </div>
    </div>
    
  </div>
</section>
```

### astro:assets — règles importantes
- TOUJOURS importer l'image depuis `src/assets/` (pas depuis `public/`)
- Utiliser `import profilePhoto from '../assets/photos/profile.jpg'`
- Utiliser le composant `<Image>` (jamais `<img>` directement)
- `loading="eager"` pour l'image hero (above the fold — pas de lazy loading)
- Astro génère automatiquement le WebP optimisé au build

### Photo placeholder
Si la vraie photo n'est pas disponible, utiliser n'importe quelle image JPG 300×300 comme placeholder nommée `profile.jpg`.

### Phrase d'accroche suggérée
"Passionné par le développement web et les nouvelles technologies. À la recherche d'une alternance pour mettre mes compétences au service de projets ambitieux."
(Ghilas peut la personnaliser après)

### Responsive
- Mobile : `flex-col`, photo centrée, texte centré
- Desktop (`md:`) : `flex-row`, photo à gauche, texte à droite, texte aligné gauche
- Utiliser les breakpoints Tailwind : `md:` = 768px

### Anti-patterns à éviter
- ❌ Ne PAS utiliser `<img src="...">` directement — toujours `<Image>` de astro:assets
- ❌ Ne PAS mettre `loading="lazy"` sur l'image Hero (above the fold)
- ❌ Ne PAS oublier l'attribut `alt` non vide

### Project Structure Notes
- Photo dans `src/assets/photos/profile.jpg`
- Composant dans `src/components/Hero.astro`

### References
- [Source: architecture.md#Frontend Architecture] — Hero.astro, astro:assets obligatoire
- [Source: architecture.md#Process Patterns] — règle astro:assets
- [Source: epics.md#Story 2.2] — AC complets
- [Source: prd.md#FR1] — Hero visible, nom, photo, titre, accroche < 10s

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
