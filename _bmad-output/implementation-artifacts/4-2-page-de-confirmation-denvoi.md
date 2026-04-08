# Story 4.2: Page de confirmation d'envoi

Status: ready-for-dev

## Story

As a recruteur,
I want to see a confirmation after sending my message,
so that I know my message was received successfully.

## Acceptance Criteria

1. Une page de confirmation s'affiche avec un message clair ("Message envoyé !")
2. Un lien "Retour au site" ramène vers `/#contact`
3. `success.astro` utilise `BaseLayout.astro` avec title et description SEO appropriés

## Tasks / Subtasks

- [ ] Créer `src/pages/success.astro` (AC: 1, 2, 3)
  - [ ] Importer et utiliser `BaseLayout.astro` avec title et description
  - [ ] Afficher un message de confirmation clair
  - [ ] Ajouter un lien "Retour au site" vers `/#contact`
  - [ ] Design cohérent avec le reste du site (Tailwind)
- [ ] Vérifier que le redirect Netlify est configuré (AC: 1)
  - [ ] Confirmer la présence dans `netlify.toml` : `from = "/success"`, `to = "/success"`, `status = 200`

## Dev Notes

### success.astro — implémentation complète
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Message envoyé — Ghilas Sabour"
  description="Votre message a bien été envoyé. Ghilas vous répondra dans les plus brefs délais."
>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gray-50">
    <div class="max-w-md w-full text-center">
      
      <!-- Icône de succès -->
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          class="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <!-- Message principal -->
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Message envoyé !</h1>
      <p class="text-gray-600 mb-8">
        Merci pour votre message. Je vous répondrai dans les plus brefs délais.
      </p>
      
      <!-- Lien retour -->
      <a
        href="/#contact"
        class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        ← Retour au site
      </a>
      
    </div>
  </div>
</BaseLayout>
```

### Redirect netlify.toml
Vérifier que `netlify.toml` contient déjà (créé en Story 1.3) :
```toml
[[redirects]]
  from = "/success"
  to = "/success"
  status = 200
```
Ce redirect est nécessaire pour que Netlify serve correctement la page `/success` après la soumission du formulaire.

### Comportement Netlify Forms
Après soumission du formulaire (Story 4.1), Netlify POST les données et redirige automatiquement vers `action="/success"`.
La page `success.astro` est alors affichée.

### SEO de la page success
- `<title>` : "Message envoyé — Ghilas Sabour" (clair et informatif)
- Ne PAS indexer cette page si désiré (optionnel) : `<meta name="robots" content="noindex" />`
- Pour ce projet simple, laisser l'indexation par défaut est acceptable

### Anti-patterns à éviter
- ❌ Ne PAS créer la page sans utiliser BaseLayout (cohérence du site)
- ❌ Ne PAS oublier le lien de retour vers `/#contact`

### Project Structure Notes
- `src/pages/success.astro` — page de confirmation Netlify Forms

### References
- [Source: architecture.md#Project Structure] — success.astro dans src/pages/
- [Source: architecture.md#Integration Points] — Contact.astro → POST Netlify → redirect success.astro
- [Source: epics.md#Story 4.2] — AC complets
- [Source: prd.md#FR5] — confirmation d'envoi du formulaire

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
