# Pualin Zefi · Sito Storico Cinematografico

Sito web premium dedicato a **Pualin Zefi**, storico, ricercatore e custode della memoria di Lezha. Una celebrazione cinematografica della storia albanese, di Gjergj Kastrioti Skanderbeg, della Lega di Alessio e del Castello di Lezha.

> *"La storia non è polvere — è fuoco"* — Pualin Zefi

---

## 🏰 Obiettivi del Progetto

- Trasmettere **cultura, identità albanese, storia medievale e prestigio accademico**
- Atmosfera **"documentario Netflix storico + museo digitale moderno"**
- Esperienza **immersiva, emozionale, autorevole e memorabile**
- Design **responsive** ottimizzato per mobile e desktop

---

## ✅ Funzionalità Implementate

### 🎬 Hero Section Cinematografica
- Sfondo full-screen del Castello di Lezha con **parallax**
- **Effetti nebbia** animata, vignetta cinematografica
- **Particelle dorate atmosferiche** generate via Three.js (scintille/cenere luminosa)
- Bandiera albanese stilizzata che ondeggia
- Titolo **PUALIN ZEFI** con reveal animation 3D
- Pulsanti: *Scopri la storia*, *Le pubblicazioni*, *Contatti*
- **Musica ambient generativa** (drone medievale Web Audio API – attivabile)
- Scroll indicator animato

### 📜 Sezione Biografia (Capitolo I)
- Layout split-screen elegante (ritratto + testo)
- Cornice ornata in stile medievale dorato/bronzo
- Citazione storica
- **Contatori animati** (anni di ricerca, pubblicazioni, conferenze)
- **Timeline animata della carriera** (1965 → 2024) con linea che si disegna allo scroll

### ⚔️ Lezha & Skanderbeg (Capitolo II)
- Citazione cinematografica
- 6 **storytelling cards** sui momenti chiave:
  - Lissus illira (III sec. a.C.)
  - Dominio Veneziano (1393)
  - **Lega di Alessio del 2 Marzo 1444** (card evidenziata)
  - Era di Skanderbeg (1444-1468)
  - La tomba dell'eroe (1468)
  - Il Castello di Lezha oggi
- **Timeline medievale** orizzontale interattiva
- **Parallax background** scroll-controlled (GSAP ScrollTrigger)

### 🖼️ Galleria Storica (Capitolo III)
- Grid moderna asimmetrica con immagini wide/tall
- **Hover zoom** con filtro sepia/contrasto cinematografico
- **Lightbox elegante** con navigazione tastiera (← → Esc)
- 9 immagini: castello, manoscritti, mappe antiche, mura, armi, cattedrale, bandiera, pergamene, panorama

### 📚 Pubblicazioni & Ricerche (Capitolo IV)
- **Cards stile museo moderno** con copertine generate
- **Filtri dinamici** per tipologia: Libri, Articoli, Ricerche, Documenti
- Caricamento dinamico via **RESTful Table API**
- 6 pubblicazioni di esempio precaricate

### 🎥 Video & Documentari (Capitolo V)
- Embed YouTube responsive
- Card *featured* per documentario principale
- Tag categoria (Documentario, Intervista, Conferenza)

### ✉️ Contatti (Capitolo VI)
- Info contatti con icone
- Social links (Facebook, Instagram, LinkedIn, YouTube)
- **WhatsApp floating** sempre visibile
- **Mappa di Lezha** integrata (OpenStreetMap)
- **Form contatti funzionante** con salvataggio su tabella `contact_messages`
- Validazione e feedback animato

### 🎨 Effetti Speciali
- **Preloader cinematografico** con stemma SVG (aquila bicipite albanese stilizzata)
- **GSAP ScrollTrigger** per parallax e reveal animations
- **Three.js** per particelle dorate atmosferiche
- **Cursor glow** dorato (desktop)
- **Dark/Light mode toggle** con preferenza salvata in localStorage
- **Smooth scroll** su tutte le ancore
- Transizioni cinematografiche su tutte le sezioni
- Microinterazioni premium (shimmer sui bottoni, hover 3D sulle card)
- Grain texture overlay per look filmato
- Back-to-top floating

### 📱 Responsive
- Layout fluido desktop / tablet / mobile
- Menu hamburger animato su mobile
- Timeline verticale su mobile

### 🔍 SEO & Performance
- Meta tag OpenGraph
- Semantic HTML (`<header>`, `<section>`, `<article>`, `<footer>`)
- Lazy loading per iframe video
- Font preconnect
- Backdrop-filter & GPU-accelerated animations

---

## 🛣️ URI Funzionali

### Pagine
| Path | Descrizione |
|------|-------------|
| `index.html` | Pagina principale single-page con navigazione per ancore |
| `#hero` | Hero section |
| `#biografia` | Capitolo I – Biografia e timeline |
| `#lezha` | Capitolo II – Lezha & Skanderbeg |
| `#galleria` | Capitolo III – Galleria storica |
| `#pubblicazioni` | Capitolo IV – Pubblicazioni filtrabili |
| `#video` | Capitolo V – Video & documentari |
| `#contatti` | Capitolo VI – Contatti e form |

### API RESTful Tables
| Endpoint | Metodo | Descrizione |
|----------|--------|-------------|
| `tables/publications` | GET | Lista pubblicazioni (con paginazione) |
| `tables/publications/{id}` | GET | Singola pubblicazione |
| `tables/contact_messages` | POST | Invio nuovo messaggio dal form contatti |
| `tables/contact_messages` | GET | Lista messaggi ricevuti |

---

## 🗄️ Modelli Dati

### Tabella `publications`
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | text | ID univoco |
| `titolo` | text | Titolo dell'opera |
| `tipo` | text | `libro` / `articolo` / `ricerca` / `documento` |
| `anno` | number | Anno di pubblicazione |
| `descrizione` | rich_text | Descrizione |
| `link_pdf` | text | URL del PDF |

### Tabella `contact_messages`
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| `id` | text | ID univoco |
| `nome` | text | Nome del mittente |
| `email` | text | Email del mittente |
| `oggetto` | text | Oggetto del messaggio |
| `messaggio` | rich_text | Contenuto del messaggio |
| `data_invio` | datetime | Timestamp di invio |

---

## 🎨 Sistema Visivo

### Palette
- **Nero carbone** `#0a0908` (sfondo)
- **Oro antico** `#b8860b` (accenti primari)
- **Oro chiaro** `#d4a93a` / `#f4d27a` (highlights)
- **Bronzo** `#8b5a2b` (decorazioni)
- **Rosso borgogna** `#6b1f24` (accenti drammatici)
- **Grigio pietra** `#2a2622` / `#3a352f` (texture)
- **Crema** `#e8dcc4` (testi su scuro)

### Tipografia
- **Cinzel** – titoli display stile romano/medievale
- **UnifrakturMaguntia** – elementi gotici opzionali
- **Cormorant Garamond** – testo elegante body
- **Inter** – elementi UI moderni

---

## 🛠️ Stack Tecnologico

| Tecnologia | Uso |
|------------|-----|
| **HTML5 semantico** | Struttura |
| **CSS3 avanzato** | Animazioni, grid, custom properties, backdrop-filter |
| **JavaScript ES6+** | Logica, fetch API, IntersectionObserver |
| **GSAP 3.12** + ScrollTrigger | Animazioni cinematografiche |
| **Three.js 0.160** | Particelle atmosferiche WebGL |
| **Web Audio API** | Musica ambient generativa medievale |
| **Font Awesome 6** | Iconografia |
| **Google Fonts** | Cinzel, Cormorant Garamond, Inter, UnifrakturMaguntia |
| **OpenStreetMap** | Mappa di Lezha integrata |
| **RESTful Table API** | Persistenza dati pubblicazioni e messaggi |

---

## 📁 Struttura File

```
.
├── index.html              # Pagina principale completa
├── css/
│   └── style.css           # Tutti gli stili (~1300 righe)
├── js/
│   └── main.js             # Logica JavaScript completa
└── README.md
```

---

## 🚧 Funzionalità Non Ancora Implementate / Migliorie Future

- **Pagine dedicate** per ogni pubblicazione (attualmente single-page)
- **Sistema di ricerca full-text** nelle pubblicazioni
- **Galleria con upload reali** delle foto storiche personali di Pualin Zefi
- **Video YouTube reali** del professore (attualmente placeholder generici)
- **Sezione blog/articoli** con CMS dinamico
- **Multilingua** (Albanese / Italiano / Inglese)
- **Newsletter** con iscrizione email
- **PDF reali** delle pubblicazioni scaricabili
- **3D viewer** interattivo del Castello di Lezha (Three.js avanzato)
- **Audio professionale** registrato al posto del drone generativo
- **Sistema di archivio digitale** con tag e categorie avanzate

---

## 🚀 Prossimi Passi Consigliati

1. **Sostituire le immagini placeholder** (Unsplash) con foto autentiche di Pualin Zefi, del Castello di Lezha e del Memoriale di Skanderbeg
2. **Inserire URL YouTube reali** dei video/conferenze del professore
3. **Caricare PDF veri** delle pubblicazioni nel sistema
4. **Aggiornare le informazioni di contatto** (email, telefono WhatsApp, social) con quelle reali
5. **Aggiungere meta tag og:image** con immagine social personalizzata
6. **Configurare dominio personalizzato** (es. `pualinzefi.al` o `lezha-historia.al`)
7. **Pubblicare il sito** tramite la **Publish tab** di Genspark

---

## 🌐 Deployment

Per pubblicare il sito online e renderlo accessibile via URL pubblica, utilizza la **scheda Publish** del progetto Genspark. Il deployment è automatico e fornisce un URL live.

---

## 📜 Licenza

© Pualin Zefi · Tutti i diritti riservati · Lezha, Albania 🇦🇱

*"Chi dimentica la propria storia è condannato a perdere la propria identità."*
