# Story 4.1: Section Contact avec formulaire Netlify

Status: ready-for-dev

## Story

As a recruteur,
I want to send a message to Ghilas via a contact form,
so that I can reach him in less than 3 clicks from anywhere on the page.

## Acceptance Criteria

1. Le formulaire a `data-netlify="true"` et un champ honeypot
2. La soumission redirige vers `/success`
3. L'email, le téléphone (cliquable via `tel:`) et optionnellement l'adresse sont visibles
4. Le numéro de téléphone déclenche un appel au tap sur mobile
5. La section a l'ancre `id="contact"`
6. Tous les champs (nom, email, message) ont des labels accessibles

## Tasks / Subtasks

- [ ] Créer `src/components/Contact.astro` (AC: 1, 2, 3, 4, 5, 6)
  - [ ] Ajouter `id="contact"` sur la section
  - [ ] Créer le formulaire HTML avec `data-netlify="true"` et `name="contact"`
  - [ ] Ajouter le champ honeypot : `<input type="hidden" name="bot-field" />`
  - [ ] Ajouter `action="/success"` sur le formulaire
  - [ ] Créer les champs : nom (`name`), email (`email`), message (`textarea`)
  - [ ] Ajouter `<label>` associé à chaque champ (via `for`/`id`)
  - [ ] Ajouter `required` sur tous les champs
  - [ ] Afficher l'email de contact avec lien `mailto:`
  - [ ] Afficher le numéro de téléphone avec lien `tel:`
  - [ ] Afficher optionnellement la ville/localisation
- [ ] Intégrer dans `src/pages/index.astro`
  - [ ] Importer et placer `<Contact />` comme dernière section

## Dev Notes

### Contact.astro — implémentation complète
```astro
---
// Informations de contact de Ghilas — à personnaliser
const contactInfo = {
  email: 'ghilas.sabour@email.com',  // À remplacer par le vrai email
  phone: '+33 6 XX XX XX XX',         // À remplacer par le vrai numéro
  phoneHref: '+33XXXXXXXXX',          // Format international sans espaces
  location: 'Paris, France',
};
---

<section id="contact" class="py-20 px-4 bg-gray-50">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 mb-4 text-center">Contact</h2>
    <p class="text-gray-600 text-center mb-12">
      Une opportunité d'alternance ? N'hésitez pas à me contacter !
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      
      <!-- Coordonnées -->
      <div class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-800">Mes coordonnées</h3>
        
        <div class="flex items-center gap-3">
          <span class="text-blue-600" aria-hidden="true">✉</span>
          <a
            href={`mailto:${contactInfo.email}`}
            class="text-gray-700 hover:text-blue-600 transition-colors"
            aria-label={`Envoyer un email à ${contactInfo.email}`}
          >
            {contactInfo.email}
          </a>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="text-blue-600" aria-hidden="true">📞</span>
          <a
            href={`tel:${contactInfo.phoneHref}`}
            class="text-gray-700 hover:text-blue-600 transition-colors"
            aria-label={`Appeler Ghilas au ${contactInfo.phone}`}
          >
            {contactInfo.phone}
          </a>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="text-blue-600" aria-hidden="true">📍</span>
          <span class="text-gray-700">{contactInfo.location}</span>
        </div>
      </div>
      
      <!-- Formulaire -->
      <form
        name="contact"
        method="POST"
        action="/success"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        class="space-y-4"
      >
        <!-- Honeypot (anti-spam) -->
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        
        <!-- Nom -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            Nom <span aria-hidden="true" class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autocomplete="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Votre nom"
          />
        </div>
        
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email <span aria-hidden="true" class="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autocomplete="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="votre@email.com"
          />
        </div>
        
        <!-- Message -->
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
            Message <span aria-hidden="true" class="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="5"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Votre message..."
          ></textarea>
        </div>
        
        <!-- Submit -->
        <button
          type="submit"
          class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Envoyer le message
        </button>
        
      </form>
      
    </div>
  </div>
</section>
```

### Netlify Forms — fonctionnement
- `data-netlify="true"` : active Netlify Forms pour ce formulaire
- `name="contact"` : nom du formulaire dans le dashboard Netlify
- `data-netlify-honeypot="bot-field"` : champ anti-spam (Netlify rejette les soumissions qui remplissent ce champ)
- `action="/success"` : redirection après soumission réussie
- `<input type="hidden" name="form-name" value="contact" />` : requis pour que Netlify identifie le formulaire lors du POST

**IMPORTANT :** Netlify Forms ne fonctionne PAS en local (`npm run dev`). Il faut un déploiement Netlify réel (Story 1.3) pour tester.

### Tel: link — format
Le format `tel:+33XXXXXXXXX` (sans espaces, avec indicatif international) est la seule façon de garantir que l'appel se déclenche sur tous les mobiles.

### Anti-patterns à éviter
- ❌ Ne PAS utiliser JavaScript pour la soumission du formulaire
- ❌ Ne PAS oublier `<input type="hidden" name="form-name" value="contact" />`
- ❌ Ne PAS tester Netlify Forms en local — tester sur le site déployé uniquement
- ❌ Ne PAS oublier les `<label>` associés (accessibilité)

### Project Structure Notes
- `src/components/Contact.astro`

### References
- [Source: architecture.md#API & Communication Patterns] — Netlify Forms, data-netlify="true", honeypot, redirect success
- [Source: architecture.md#Process Patterns] — formulaire contact pattern complet
- [Source: epics.md#Story 4.1] — AC complets
- [Source: prd.md#FR5, FR6] — formulaire contact, numéro tel: cliquable

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References

### Completion Notes List

### File List
