# Internazionalizzazione (i18n) - Documentazione Completa

## 🌍 Overview

Questo progetto implementa un sistema di internazionalizzazione completo con supporto per 5 lingue:
- 🇬🇧 English
- 🇮🇹 Italiano
- 🇫🇷 Français
- 🇪🇸 Español
- 🇦🇱 Shqiptar (Albanese)

## 📦 Struttura del Progetto

```
frontend/src/
├── assets/
│   └── i18n/
│       ├── en.json        # Traduzioni inglese
│       ├── it.json        # Traduzioni italiano
│       ├── fr.json        # Traduzioni francese
│       ├── es.json        # Traduzioni spagnolo
│       └── sq.json        # Traduzioni albanese
├── app/
│   ├── core/
│   │   └── services/
│   │       └── language.service.ts    # Gestione lingua
│   ├── shared/
│   │   └── components/
│   │       └── language-switcher/     # Selettore lingua
│   └── pages/
│       ├── login/                     # Con traduzioni
│       ├── admin/                     # Con traduzioni
│       └── public/
│           └── home/
│               ├── sections/
│               │   └── contatti/      # Con traduzioni
│               └── footer/            # Con traduzioni
```

## 🚀 Installazione & Setup

### 1. Dipendenze Installate

```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

### 2. Configurazione in main.ts

Il sistema i18n è già configurato in `main.ts`:
- **Loader**: TranslateHttpLoader (carica JSON da assets)
- **Lingua di default**: English (en)
- **Fallback**: English se lingua non supportata

### 3. Inizializzazione in AppComponent

Il `LanguageService` si inizializza automaticamente quando l'app bootstrap:
- Rileva lingua del browser
- Carica lingua salvata da localStorage
- Imposta lingua di default

## 📝 Uso del Sistema i18n

### 1. Nel Template (HTML)

```html
<!-- Pipe translate basico -->
<h1>{{ 'common.welcome' | translate }}</h1>

<!-- Con placeholder per attributi -->
<input [placeholder]="'login.email_placeholder' | translate" />

<!-- Con parametri (future) -->
<p>{{ 'greeting' | translate:{ name: userName } }}</p>
```

### 2. Nel Component (TypeScript)

```typescript
import { TranslateService } from '@ngx-translate/core';

export class MyComponent {
  constructor(private translate: TranslateService) {}

  showMessage() {
    this.translate.get('common.success').subscribe((text: string) => {
      console.log(text); // Output in lingua corrente
    });
  }
}
```

### 3. Cambio Lingua Runtime

```typescript
import { LanguageService } from '@core/services/language.service';

export class MyComponent {
  constructor(private languageService: LanguageService) {}

  changeLanguage() {
    this.languageService.setLanguage('it'); // Cambia a italiano
    // Automaticamente:
    // - Aggiorna locale locale
    // - Salva in localStorage
    // - Emette evento per i subscribers
    // - Cambia attributo lang su HTML
  }
}
```

## 🔧 Language Service API

### Metodi Principali

```typescript
// Imposta lingua
languageService.setLanguage('it');

// Ottieni lingua corrente
const lang = languageService.getCurrentLanguage(); // 'it'

// Observable per cambio lingua
languageService.getCurrentLanguage$().subscribe(lang => {
  console.log('Lingua cambiata a:', lang);
});

// Get tutte le lingue supportate
const languages = languageService.getSupportedLanguages();
// Output: [
//   { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
//   { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
//   ...
// ]

// Info su una lingua specifica
const info = languageService.getLanguageInfo('it');
// Output: { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' }

// Verifica se lingua è supportata
const supported = languageService.isSupportedLanguage('en'); // true

// Reset a lingua di default
languageService.resetToDefault(); // Torna a 'en'
```

## 🎨 Language Switcher Component

### Utilizzo

```html
<!-- Nel header o dove preferisci -->
<app-language-switcher></app-language-switcher>
```

### Features

- ✅ Dropdown con tutte le lingue supportate
- ✅ Flag emoji per cada lingua
- ✅ Cambio lingua live senza reload
- ✅ Visualizzazione lingua corrente con checkmark
- ✅ Supporto dark/light theme
- ✅ Responsive (mobile friendly)

### Styling

Il componente usa CSS variables per il tema:
```css
--color-surface      /* Background default */
--color-text         /* Testo default */
--color-surface-dark /* Background dark theme */
--color-text-dark    /* Testo dark theme */
```

## 📂 Struttura File di Traduzione

Ogni file JSON segue questa struttura gerarchica:

```json
{
  "common": {
    "login": "Login",
    "logout": "Logout",
    "welcome": "Welcome"
  },
  "header": {
    "biografia": "Biography",
    "contatti": "Contacts"
  },
  "login": {
    "title": "Admin Login",
    "description": "Enter your credentials..."
  },
  "sections": {
    "contatti": {
      "title": "Contacts",
      "send_message": "Send Message"
    }
  }
}
```

### Best Practices

1. **Gerarchia logica**: Organizza per area (header, footer, pages)
2. **Nomi descrittivi**: Usa chiavi significative (es. `login.error_invalid` vs `err1`)
3. **Coerenza**: Stessi valori per lo stesso concetto in tutte le lingue
4. **Completezza**: Assicura che tutte le lingue abbiano le stesse chiavi

## 🔄 Persistenza

La lingua selezionata viene salvata in `localStorage` con chiave: `app_language`

```javascript
// Salvato automaticamente
localStorage.setItem('app_language', 'it');

// Caricato automaticamente al refresh
const savedLanguage = localStorage.getItem('app_language');
```

## 🌐 Browser Language Detection

Se nessuna lingua è salvata in localStorage, il sistema:
1. Rileva la lingua del browser
2. Se corrisponde a una lingua supportata, la usa
3. Se no, usa il fallback (English)

Esempio:
- Browser lingua: `en-US` → Usa `en` ✓
- Browser lingua: `de-DE` → Fallback a `en` (non supportato)
- Browser lingua: `it` → Usa `it` ✓

## 🎯 Componenti Già Integrati

Questi componenti usano il sistema i18n:

1. **LoginComponent**
   - Traduzioni per form e messaggi di errore
   - Labels in lingua corrente

2. **AdminComponent**
   - Dashboard con traduzioni complete
   - Profilo e informazioni utente

3. **HeaderComponent**
   - Menu di navigazione tradotto
   - Language Switcher integrato
   - Links login/admin tradotti

4. **FooterComponent**
   - Sezioni e copyright tradotti
   - Social links e informazioni

5. **ContattiComponent**
   - Form completamente tradotto
   - Messaggi di successo/errore
   - Placeholders tradotti

## 📋 Aggiunta di Nuove Traduzioni

### Passo 1: Aggiungi chiave in tutti i JSON

```json
// en.json
{
  "myfeature": {
    "title": "My Feature"
  }
}

// it.json
{
  "myfeature": {
    "title": "La Mia Funzione"
  }
}

// Ripeti per fr.json, es.json, sq.json
```

### Passo 2: Usa nel Template

```html
<h2>{{ 'myfeature.title' | translate }}</h2>
```

### Passo 3: Usa nel Component

```typescript
this.translate.get('myfeature.title').subscribe(text => {
  console.log(text);
});
```

## 🧪 Testing

Per testare il sistema i18n:

```typescript
// Cambia lingua
languageService.setLanguage('it');

// Verifica cambio
expect(languageService.getCurrentLanguage()).toBe('it');

// Verifica localStorage
expect(localStorage.getItem('app_language')).toBe('it');

// Verifica HTML lang attribute
expect(document.documentElement.lang).toBe('it');
```

## 🐛 Troubleshooting

### Traduzioni non caricate

**Problema**: Vedere chiavi come `myfeature.title` invece del testo tradotto

**Soluzione**:
1. Controlla che i file JSON siano in `src/assets/i18n/`
2. Verifica che la chiave esista in tutti i 5 file linguistici
3. Ricarica il browser

### Lingua non cambia al click

**Problema**: Click sul language switcher ma niente cambia

**Soluzione**:
1. Verifica che `LanguageSwitcherComponent` sia importato
2. Controlla console per errori
3. Assicura che `TranslateService` sia fornito

### Fallback non funziona

**Problema**: Lingua non supportata dovrebbe fallback a English

**Soluzione**:
1. Verifica `main.ts` per configurazione TranslateLoader
2. Check che lingua sia valida con `isSupportedLanguage()`

## 📚 Risorse

- [ngx-translate docs](https://github.com/ngx-translate/core)
- [TranslateHttpLoader docs](https://github.com/ngx-translate/http-loader)
- [Angular i18n guide](https://angular.io/guide/i18n)

## ✅ Checklist di Completamento

- [x] Setup ngx-translate con HttpLoader
- [x] Creazone 5 file JSON per lingue supportate
- [x] Language Service con localStorage persistence
- [x] Language Switcher Component con UI completa
- [x] Integrazione in tutti i componenti principali
- [x] Runtime language switching senza reload
- [x] Browser language detection
- [x] Dark theme support nel Language Switcher
- [x] Responsive design per mobile
- [x] Production-ready e scalabile
