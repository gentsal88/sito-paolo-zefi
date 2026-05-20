# Sito Paulo Zefi - Frontend (Angular)

Production-ready Angular frontend con auth system, JWT interceptor e role-based access control.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn
- Angular CLI

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm start
```

Application sarà disponibile su `http://localhost:4200`

### Build for Production

```bash
npm run build:prod
```

Output in `dist/frontend`

## 📱 Features

### Auth System
- **Login Page**: Email/password authentication
- **JWT Token Management**: Salva token in localStorage
- **JWT Interceptor**: Aggiunge token automaticamente a tutte le requests
- **Auth Guards**: Protegge route admin
- **Signals**: State management con Angular Signals

### Pages

#### Login (`/login`)
- Form email/password
- Validazione input
- Error handling
- Redirect ad admin su success

#### Admin Dashboard (`/admin`)
- Protetta da AdminGuard (richiede JWT valido e ruolo admin)
- User information display
- Stats overview
- Logout functionality

## 🏗️ Architecture

### Services

**AuthService** (`src/app/core/services/auth.service.ts`)
- Login/logout
- Token management (get/set/clear)
- User persistence in localStorage
- Observable streams per reactive updates

**JwtInterceptor** (`src/app/core/services/api.service.ts`)
- Aggiunge Authorization header a tutte le requests
- Automaticamente estrae token da localStorage

### Guards

**AuthGuard** (`src/app/core/guards/auth.guard.ts`)
- Verifica se utente è autenticato
- Redirect a /login se non autenticato

**AdminGuard** (`src/app/core/guards/admin.guard.ts`)
- Verifica ruolo admin
- Redirect a /login se non admin

### Routing

```
/login       - Login page (public)
/admin       - Admin dashboard (protected by AdminGuard)
/            - Redirect to /admin
```

### Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── api.service.ts (JWT interceptor)
│   │   └── guards/
│   │       ├── auth.guard.ts
│   │       └── admin.guard.ts
│   ├── pages/
│   │   ├── login/
│   │   │   └── login.component.ts
│   │   └── admin/
│   │       └── admin.component.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── main.ts
├── index.html
└── styles.scss
```

## 🔐 Auth Flow

1. **User Input**: Email/password nella login page
2. **API Call**: POST `/auth/login` con credentials
3. **Token Storage**: JWT salvato in localStorage
4. **State Update**: AuthService aggiorna observable streams
5. **Navigation**: Redirect a `/admin` dashboard
6. **Interceptor**: JwtInterceptor aggiunge token alle requests
7. **Guard Protection**: AdminGuard verifica autenticazione
8. **Display**: Dashboard mostra user info

## 🛠️ Technologies

- **Angular** 17.x - Latest framework
- **TypeScript** 5.x - Type safety
- **RxJS** - Reactive programming
- **Angular Signals** - Modern state management
- **SCSS** - Styling
- **Standalone Components** - Latest Angular pattern

## 📝 Component Features

### Login Component
- Reactive form handling
- Signal-based loading state
- Error message display
- Form validation
- Gradient UI design

### Admin Component
- User information display
- Logout functionality
- Signals for reactive state
- Stats grid layout
- Professional dashboard UI

## 🔗 API Integration

Backend deve essere in esecuzione su `http://localhost:3000`

Auth endpoints:
- `POST /auth/login` - Login
- `GET /auth/profile` - Get profile (requires JWT)

## 🚢 Production Build

```bash
npm run build:prod
```

Optimizzazioni:
- Tree-shaking
- Minification
- AOT compilation
- Code splitting
- Asset optimization

## 📋 Notes

- Token salvato in localStorage (considera sessionStorage per prod)
- CORS configurato per `http://localhost:3000` in development
- Interceptor automaticamente attacca token a tutte le requests
- Guards proteggono route admin dal pubblico
- Error handling centralizzato nel service
