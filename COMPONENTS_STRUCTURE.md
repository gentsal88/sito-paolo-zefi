# Struttura Componenti - Organizzazione Modulare

## 📁 Albero della Struttura Attuale

```
frontend/src/app/
├── shared/
│   └── components/
│       ├── header/
│       │   ├── header.component.ts
│       │   ├── header.component.html
│       │   ├── header.component.scss
│       │   └── index.ts
│       ├── footer/
│       │   ├── footer.component.ts
│       │   ├── footer.component.html
│       │   ├── footer.component.scss
│       │   └── index.ts
│       ├── preloader/
│       │   ├── preloader.component.ts
│       │   ├── preloader.component.html
│       │   ├── preloader.component.scss
│       │   └── index.ts
│       ├── index.ts                    ← Barrel export
│       └── shared-components.module.ts ← Modulo
├── pages/
│   └── public/
│       └── home/
│           ├── home.page.ts
│           ├── home.page.html
│           ├── home.page.scss
│           └── sections/
│               ├── hero/
│               │   ├── hero.component.ts
│               │   ├── hero.component.html
│               │   ├── hero.component.scss
│               │   └── index.ts
│               ├── biografia/
│               │   ├── biografia.component.ts
│               │   ├── biografia.component.html
│               │   ├── biografia.component.scss
│               │   └── index.ts
│               ├── lezha/
│               │   ├── lezha.component.ts
│               │   ├── lezha.component.html
│               │   ├── lezha.component.scss
│               │   └── index.ts
│               ├── galleria/
│               │   ├── galleria.component.ts
│               │   ├── galleria.component.html
│               │   ├── galleria.component.scss
│               │   └── index.ts
│               ├── pubblicazioni/
│               │   ├── pubblicazioni.component.ts
│               │   ├── pubblicazioni.component.html
│               │   ├── pubblicazioni.component.scss
│               │   └── index.ts
│               ├── video/
│               │   ├── video.component.ts
│               │   ├── video.component.html
│               │   ├── video.component.scss
│               │   └── index.ts
│               ├── contatti/
│               │   ├── contatti.component.ts
│               │   ├── contatti.component.html
│               │   ├── contatti.component.scss
│               │   └── index.ts
│               ├── index.ts                    ← Barrel export
│               └── home-sections.module.ts    ← Modulo
```

---

## 🎯 Principi di Organizzazione

### 1. Una Cartella per Componente
- **Prima**: File singoli in cartella flat
- **Ora**: Una cartella per ogni componente con i 3 file correlati

**Vantaggi:**
- 🎯 Facile trovare file correlati
- 📦 Isolamento e indipendenza
- 🔄 Refactoring semplice
- 📈 Scalabilità

---

### 2. Barrel Exports (index.ts)

**Ogni cartella componente ha `index.ts`:**
```typescript
// hero/index.ts
export * from './hero.component';
```

**Barrel centrale:**
```typescript
// shared/components/index.ts
export * from './header';
export * from './footer';
export * from './preloader';
```

**Import pulito:**
```typescript
// Prima: import { HeaderComponent } from '../../../../shared/components/header/header.component';
// Ora:
import { HeaderComponent, FooterComponent, PreloaderComponent } from '../../../../shared/components';
```

---

### 3. Moduli NgModule

**SharedComponentsModule** (`shared/components/shared-components.module.ts`):
```typescript
@NgModule({
  imports: [HeaderComponent, FooterComponent, PreloaderComponent],
  exports: [HeaderComponent, FooterComponent, PreloaderComponent],
})
export class SharedComponentsModule {}
```

**HomeSectionsModule** (`pages/public/home/sections/home-sections.module.ts`):
```typescript
@NgModule({
  imports: [
    HeroComponent, BiografiaComponent, LezhaComponent,
    GalleriaComponent, PubblicazioniComponent, VideoComponent, ContattiComponent
  ],
  exports: [
    HeroComponent, BiografiaComponent, LezhaComponent,
    GalleriaComponent, PubblicazioniComponent, VideoComponent, ContattiComponent
  ],
})
export class HomeSectionsModule {}
```

---

## 💡 Home Page Integration

**home.page.ts** - Import semplificati:
```typescript
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent, PreloaderComponent } from '../../../../shared/components';
import {
  HeroComponent, BiografiaComponent, LezhaComponent,
  GalleriaComponent, PubblicazioniComponent, VideoComponent, ContattiComponent,
} from './sections';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent, FooterComponent, PreloaderComponent,
    HeroComponent, BiografiaComponent, LezhaComponent,
    GalleriaComponent, PubblicazioniComponent, VideoComponent, ContattiComponent
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomeComponent {}
```

**home.page.html** - Layout verticale:
```html
<app-preloader></app-preloader>
<app-header></app-header>

<main>
  <app-hero></app-hero>
  <app-biografia></app-biografia>
  <app-lezha></app-lezha>
  <app-galleria></app-galleria>
  <app-pubblicazioni></app-pubblicazioni>
  <app-video></app-video>
  <app-contatti></app-contatti>
</main>

<app-footer></app-footer>
```

---

## 📊 Componenti Breakdown

| Componente | Tipo | Responsabilità | Stato |
|-----------|------|-----------------|-------|
| **Header** | Shared | Navigazione + Theme Toggle | Signals |
| **Footer** | Shared | Info contatti + Links | Static |
| **Preloader** | Shared | Splash screen animato | Signals |
| **Hero** | Section | Banner hero con CTA | Static |
| **Biografia** | Section | Bio + Timeline | Array data |
| **Lezha** | Section | Story cards grid | Array data |
| **Galleria** | Section | Image gallery + Lightbox | Signals |
| **Pubblicazioni** | Section | Publications + Filter | Array + Filter state |
| **Video** | Section | YouTube embeds | Static |
| **Contatti** | Section | Contact form + Info | Form state |

---

## 🔄 Flusso di Rendering

```
AppComponent
└── router-outlet
    └── HomeComponent (home.page.ts)
        ├── PreloaderComponent
        ├── HeaderComponent
        ├── HeroComponent
        ├── BiografiaComponent
        ├── LezhaComponent
        ├── GalleriaComponent
        ├── PubblicazioniComponent
        ├── VideoComponent
        ├── ContattiComponent
        └── FooterComponent
```

---

## ✅ Vantaggi della Nuova Struttura

| Aspetto | Vantaggio |
|---------|-----------|
| **Manutenibilità** | Facile trovare e modificare componenti |
| **Riusabilità** | Barrel exports semplificano import |
| **Scalabilità** | Aggiungere nuovi componenti è semplice |
| **Modularità** | Moduli consentono il riuso in altri contesti |
| **Performance** | Tree-shaking migliore, bundle più piccoli |
| **Organizzazione** | Struttura coerente e prevedibile |
| **Collaborazione** | Chiaro dove ogni componente si trova |

---

## 🚀 Prossimi Step

### Immediati
- ✅ Organizzazione modulare completata
- ✅ Barrel exports implementati
- ✅ Moduli NgModule creati

### Breve Termine
- ⏳ Alias tsconfig (`@shared`, `@home`, `@pages`)
- ⏳ Lazy loading delle sezioni
- ⏳ Componenti condivisi (ui-kit)

### Medio Termine
- ⏳ Feature modules separati
- ⏳ State management (NgRx o Signals avanzate)
- ⏳ Testing con Jasmine/Karma

---

## 📝 Convenzioni

```
Cartelle:    kebab-case          (hero, biografia, footer)
File .ts:    {name}.component.ts (hero.component.ts)
File .html:  {name}.component.html
File .scss:  {name}.component.scss
Moduli:      {name}.module.ts    (shared-components.module.ts)
Export:      index.ts (in ogni cartella)
```

---

**Ultimato:** 20 Maggio 2026 | Angular 17 | Standalone Components
