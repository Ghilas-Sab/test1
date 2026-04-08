# Story 3.2: Section Galerie avec lightbox

Status: ready-for-dev

## Story

As a recruteur,
I want to browse a photo gallery of Ghilas and open photos in full screen,
so that I get a more personal and human impression of the candidate.

## Acceptance Criteria

1. 4 à 6 photos sont affichées en grille responsive
2. Chaque photo est chargée via `astro:assets` (optimisation WebP + lazy loading)
3. Chaque photo a une légende issue de la Content Collection
4. Un `<dialog>` HTML natif s'ouvre avec la photo en grand format au clic
5. Le dialog se ferme en cliquant en dehors ou avec la touche Échap
6. Le `<dialog>` a un `aria-label` et gère le focus trap natif
7. La section a l'ancre `id="gallery"`

## Tasks / Subtasks

- [ ] Créer `src/components/GalleryItem.astro` (AC: 2, 4, 5, 6)
  - [ ] Accepter les props : `imageSrc`, `alt`, `caption`, `id` (pour le dialog unique)
  - [ ] Implémenter le bouton qui ouvre le `<dialog>`
  - [ ] Implémenter le `<dialog>` avec l'image en grand format
  - [ ] Ajouter `aria-label` sur le dialog
  - [ ] Ajouter un bouton de fermeture dans le dialog
  - [ ] Implémenter la fermeture au clic en dehors (via backdrop click)
  - [ ] La touche Échap ferme le dialog nativement (comportement par défaut du `<dialog>`)
- [ ] Créer `src/components/Gallery.astro` (AC: 1, 3, 7)
  - [ ] Ajouter `id="gallery"` sur la section
  - [ ] Importer `getCollection` depuis `astro:content`
  - [ ] Charger la collection `gallery`
  - [ ] Créer la grille responsive (2-3 colonnes desktop, 1-2 colonnes mobile)
  - [ ] Rendre les composants `<GalleryItem>` pour chaque photo
- [ ] Intégrer dans `src/pages/index.astro`
  - [ ] Importer et placer `<Gallery />` après `<About />`

## Dev Notes

### GalleryItem.astro — implémentation complète
```astro
---
import { Image } from 'astro:assets';

interface Props {
  imageSrc: ImageMetadata;
  alt: string;
  caption: string;
  dialogId: string;
}

const { imageSrc, alt, caption, dialogId } = Astro.props;
---

<div class="group relative overflow-hidden rounded-lg">
  <!-- Thumbnail cliquable -->
  <button
    onclick={`document.getElementById('${dialogId}').showModal()`}
    class="w-full block cursor-pointer"
    aria-label={`Agrandir : ${caption}`}
  >
    <Image
      src={imageSrc}
      alt={alt}
      width={400}
      height={300}
      class="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
    <p class="mt-2 text-sm text-gray-600 text-center">{caption}</p>
  </button>
</div>

<!-- Dialog lightbox -->
<dialog
  id={dialogId}
  aria-label={`Photo agrandie : ${caption}`}
  class="p-0 rounded-xl shadow-2xl max-w-4xl w-full backdrop:bg-black/70"
  onclick="if(event.target === this) this.close()"
>
  <div class="relative">
    <button
      onclick={`document.getElementById('${dialogId}').close()`}
      class="absolute top-3 right-3 z-10 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
      aria-label="Fermer"
    >
      ✕
    </button>
    <Image
      src={imageSrc}
      alt={alt}
      width={1200}
      height={800}
      class="w-full h-auto rounded-xl"
      loading="lazy"
    />
    <p class="p-4 text-center text-gray-700 font-medium">{caption}</p>
  </div>
</dialog>
```

### Gallery.astro — implémentation complète
```astro
---
import { getCollection } from 'astro:content';
import GalleryItem from './GalleryItem.astro';

// Importer toutes les images
import gallery1 from '../assets/photos/gallery-1.jpg';
import gallery2 from '../assets/photos/gallery-2.jpg';
import gallery3 from '../assets/photos/gallery-3.jpg';
import gallery4 from '../assets/photos/gallery-4.jpg';

const galleryData = await getCollection('gallery');

// Map imagePath → ImageMetadata importé
const imageMap: Record<string, ImageMetadata> = {
  'gallery-1.jpg': gallery1,
  'gallery-2.jpg': gallery2,
  'gallery-3.jpg': gallery3,
  'gallery-4.jpg': gallery4,
};
---

<section id="gallery" class="py-20 px-4">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Galerie</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {galleryData.map((item, index) => (
        <GalleryItem
          imageSrc={imageMap[item.data.imagePath]}
          alt={item.data.alt}
          caption={item.data.caption}
          dialogId={`gallery-dialog-${index}`}
        />
      ))}
    </div>
  </div>
</section>
```

### Comportement du <dialog> HTML natif
- `showModal()` : ouvre le dialog en mode modal (bloque le reste, gère le focus trap nativement)
- `close()` : ferme le dialog
- Touche Échap : ferme automatiquement (comportement navigateur natif, aucun JS requis)
- `backdrop` : pseudo-élément CSS natif pour l'overlay sombre
- `onclick="if(event.target === this) this.close()"` : ferme au clic sur l'overlay

### ImageMetadata (Astro)
Avec `astro:assets`, les images importées depuis `src/assets/` retournent un objet `ImageMetadata`.
Impossible de passer un chemin string dynamique — il faut importer chaque image statiquement ou utiliser le map comme montré ci-dessus.

### Astro:assets — lazy loading galerie
Utiliser `loading="lazy"` pour les thumbnails (galerie hors viewport au chargement).
Utiliser `loading="lazy"` aussi pour les images dans les dialogs.

### Anti-patterns à éviter
- ❌ Ne PAS utiliser JavaScript externe pour la lightbox (Fancybox, Lightgallery, etc.)
- ❌ Ne PAS utiliser `<img>` directement — toujours `<Image>` de astro:assets
- ❌ Ne PAS mettre les images dans `public/` — elles doivent être dans `src/assets/`
- ❌ Ne PAS créer plusieurs dialogs en dehors de GalleryItem (chaque item gère le sien)

### Project Structure Notes
- `src/components/GalleryItem.astro`
- `src/components/Gallery.astro`
- Images dans `src/assets/photos/gallery-{1-4}.jpg`

### References
- [Source: architecture.md#Core Architectural Decisions] — dialog HTML natif, zéro JS
- [Source: architecture.md#Architectural Boundaries] — GalleryItem gère son propre dialog
- [Source: architecture.md#Process Patterns] — astro:assets obligatoire, règle d'accessibilité
- [Source: epics.md#Story 3.2] — AC complets
- [Source: prd.md#FR3] — galerie 4-6 photos, plein écran

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
