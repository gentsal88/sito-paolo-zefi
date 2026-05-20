# Sito Paulo Zefi - Backend (NestJS)

Production-ready NestJS backend con MongoDB, JWT auth e Passport strategies.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB >= 5.0
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Configura le variabili d'ambiente in `.env`:
- `MONGODB_URI`: Connection string MongoDB
- `JWT_SECRET`: Secret key per JWT (cambia in produzione!)
- `PORT`: Porta server (default: 3000)

### Run Development Server

```bash
npm run start:dev
```

Server sarà disponibile su `http://localhost:3000`

### API Endpoints

#### Auth
- `POST /auth/login` - Login admin
  ```json
  {
    "email": "admin@admin.com",
    "password": "admin123"
  }
  ```
  Response:
  ```json
  {
    "access_token": "eyJhbGc...",
    "user": {
      "id": "...",
      "email": "admin@admin.com",
      "role": "admin"
    }
  }
  ```

- `GET /auth/profile` - Get current user profile (requires JWT)

#### Users
- `POST /users` - Create user
- `GET /users/profile` - Get profile (requires JWT)
- `GET /users/:id` - Get user by ID

### Seeder

Al startup, il backend crea automaticamente un admin user:
- **Email**: `admin@admin.com`
- **Password**: `admin123`

### Database

MongoDB connection configurata in `src/config/database.config.ts`

Schemas:
- **User**: email (unique), password (hashed), role, isActive, timestamps

### Auth Architecture

1. **LocalStrategy**: Validazione email/password
2. **JwtStrategy**: Verifica JWT token nel header Authorization
3. **JwtGuard**: Guard per proteggere endpoint
4. **RolesGuard**: Guard per verificare ruoli utente (admin)

### Project Structure

```
src/
├── auth/                 # Auth module
│   ├── strategies/      # Passport strategies
│   ├── guards/          # Auth guards
│   ├── dto/             # DTOs
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   └── auth.module.ts
├── users/               # Users module
│   ├── user.schema.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── users.module.ts
├── common/              # Common utilities
│   ├── filters/         # Exception filters
│   └── seeder/          # Database seeder
├── config/              # Configuration
│   ├── database.config.ts
│   └── jwt.config.ts
├── app.module.ts
└── main.ts
```

### Technologies

- **NestJS** 10.x - Progressive Node.js framework
- **Mongoose** 8.x - MongoDB ODM
- **Passport** - Authentication middleware
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **class-validator** - DTO validation
- **TypeScript** - Type safety

### Notes

- Tutti gli endpoint auth ritornano JWT token nel formato `Authorization: Bearer <token>`
- Password automaticamente hashate con bcrypt
- MongoDB connection usa connection pooling
- Global exception filter per error handling centralizzato
