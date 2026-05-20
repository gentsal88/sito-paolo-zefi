# 📋 Project Files Index

Complete file structure and descriptions for Sito Paulo Zefi.

## 🗂️ Root Level

```
sito-paulo-zefi/
├── .gitignore                  # Git ignore rules
├── README.md                   # Original README (kept as-is)
├── README_MAIN.md              # Main project overview ⭐
├── GETTING_STARTED.md          # Quick start guide ⭐
├── ARCHITECTURE.md             # System architecture & design
├── DEPLOYMENT.md               # Production deployment guide
├── QUICK_REFERENCE.md          # Common commands & troubleshooting
├── BEST_PRACTICES.md           # Code quality & security checklist
├── docker-compose.yml          # Docker services configuration
├── backend/                    # NestJS Backend
└── frontend/                   # Angular Frontend
```

## 🔙 Backend Files (`backend/`)

### Configuration
```
backend/
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript config
├── nest-cli.json               # NestJS CLI config
├── .env.example                # Environment template
├── .env                        # Development environment
├── Dockerfile                  # Docker image
├── jest.config.js              # Jest testing config
├── README.md                   # Backend documentation
```

### Source Code
```
src/
├── main.ts                     # Entry point (bootstrap)
├── app.module.ts               # Root module
├── auth/
│   ├── auth.module.ts          # Auth module
│   ├── auth.controller.ts      # Route handlers
│   ├── auth.service.ts         # Business logic
│   ├── strategies/
│   │   ├── jwt.strategy.ts     # JWT validation
│   │   └── local.strategy.ts   # Email/password
│   ├── guards/
│   │   ├── jwt.guard.ts        # Token protection
│   │   ├── local.guard.ts      # Local auth
│   │   └── roles.guard.ts      # Role checking
│   └── dto/
│       └── login.dto.ts        # Data transfer objects
├── users/
│   ├── users.module.ts         # Users module
│   ├── users.controller.ts     # CRUD endpoints
│   ├── users.service.ts        # Database operations
│   ├── user.schema.ts          # Mongoose schema
│   └── dto/
│       └── create-user.dto.ts  # User DTOs
├── common/
│   ├── filters/
│   │   └── all-exceptions.filter.ts  # Global error handler
│   └── seeder/
│       ├── database.seeder.ts        # Auto-creates admin
│       └── seeder.module.ts
└── config/
    ├── database.config.ts      # MongoDB config
    └── jwt.config.ts           # JWT config
```

### Testing
```
test/
├── auth.e2e-spec.ts            # E2E tests
└── jest-e2e.json               # E2E config
```

**Total Backend Files**: ~20 files

## 🎨 Frontend Files (`frontend/`)

### Configuration
```
frontend/
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript config
├── tsconfig.app.json           # App-specific config
├── tsconfig.spec.json          # Test config
├── angular.json                # Angular CLI config
├── Dockerfile                  # Docker image
├── README.md                   # Frontend documentation
```

### Source Code
```
src/
├── main.ts                     # Bootstrap & providers
├── index.html                  # HTML shell
├── styles.scss                 # Global styles
├── app/
│   ├── app.component.ts        # Root component
│   ├── app.routes.ts           # Routing config
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts         # Auth logic
│   │   │   └── api.service.ts          # JWT interceptor
│   │   └── guards/
│   │       ├── auth.guard.ts           # Check auth
│   │       └── admin.guard.ts          # Check admin role
│   └── pages/
│       ├── login/
│       │   └── login.component.ts      # Login page
│       └── admin/
│           └── admin.component.ts      # Admin dashboard
```

**Total Frontend Files**: ~15 files

## 🔒 Authentication Flow Files

### Critical Files for Auth
1. `backend/src/auth/auth.service.ts` - JWT generation
2. `backend/src/auth/auth.controller.ts` - /auth/login endpoint
3. `backend/src/auth/strategies/jwt.strategy.ts` - Token validation
4. `frontend/src/app/core/services/auth.service.ts` - Login handler
5. `frontend/src/app/core/services/api.service.ts` - Token injection
6. `frontend/src/app/core/guards/auth.guard.ts` - Route protection

## 🗄️ Database Files

### Mongoose Schema
- `backend/src/users/user.schema.ts` - User data structure

### Database Operations
- `backend/src/users/users.service.ts` - CRUD operations
- `backend/src/common/seeder/database.seeder.ts` - Initial data

## 📚 Documentation Files

| File | Purpose | Length |
|------|---------|--------|
| GETTING_STARTED.md | Setup guide | ~400 lines |
| ARCHITECTURE.md | System design | ~500 lines |
| DEPLOYMENT.md | Production guide | ~600 lines |
| QUICK_REFERENCE.md | Common tasks | ~400 lines |
| BEST_PRACTICES.md | Code quality | ~500 lines |
| backend/README.md | Backend docs | ~200 lines |
| frontend/README.md | Frontend docs | ~200 lines |
| README_MAIN.md | Project overview | ~200 lines |

**Total Documentation**: ~3000+ lines

## 🐳 Docker Files

- `docker-compose.yml` - 3 services (MongoDB, Backend, Frontend)
- `backend/Dockerfile` - Node.js Alpine image
- `frontend/Dockerfile` - Multi-stage build

## 🔧 Configuration Files

- `.env.example` - Template with all variables
- `.env` - Pre-configured for development
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies (both backend & frontend)
- `angular.json` - Angular build config
- `nest-cli.json` - NestJS config

## 📊 File Statistics

| Category | Files | Lines of Code |
|----------|-------|----------------|
| Backend Source | 20 | ~2000 |
| Frontend Source | 15 | ~1500 |
| Configuration | 10 | ~500 |
| Documentation | 8 | ~3000 |
| Docker | 3 | ~100 |
| **Total** | **~55** | **~7000+** |

## 🎯 Key Features by File

### Authentication
- `auth.service.ts` - Login & token generation
- `jwt.strategy.ts` - Token validation
- `auth.guard.ts` - Route protection
- `auth.service.ts` (frontend) - Token management

### Database
- `user.schema.ts` - Data structure
- `users.service.ts` - DB operations
- `database.seeder.ts` - Auto-create admin

### API
- `auth.controller.ts` - `/auth` endpoints
- `users.controller.ts` - `/users` endpoints
- `all-exceptions.filter.ts` - Error handling

### UI
- `login.component.ts` - Login page
- `admin.component.ts` - Dashboard
- `app.routes.ts` - Routing

## 🚀 How to Navigate the Code

### For Backend Changes
1. Start: `backend/src/main.ts`
2. Routes: `backend/src/auth/auth.controller.ts`
3. Logic: `backend/src/auth/auth.service.ts`
4. DB: `backend/src/users/users.service.ts`

### For Frontend Changes
1. Start: `frontend/src/main.ts`
2. Routes: `frontend/src/app/app.routes.ts`
3. Services: `frontend/src/app/core/services/`
4. Components: `frontend/src/app/pages/`

### For Deployment
1. Read: `DEPLOYMENT.md`
2. Environment: `backend/.env` variables
3. Docker: `docker-compose.yml`

### For Understanding
1. Read: `ARCHITECTURE.md`
2. Read: `GETTING_STARTED.md`
3. Browse: `QUICK_REFERENCE.md`

## 🔑 Most Important Files

Priority order:

1. **GETTING_STARTED.md** - Start here first
2. **backend/src/main.ts** - Backend entry point
3. **frontend/src/main.ts** - Frontend entry point
4. **backend/src/auth/auth.service.ts** - Core auth logic
5. **frontend/src/app/core/services/auth.service.ts** - Frontend auth
6. **docker-compose.yml** - Complete stack setup

## 📖 File Dependencies

```
main.ts (backend)
  └─> app.module.ts
       ├─> auth.module.ts
       │    ├─> auth.controller.ts
       │    ├─> auth.service.ts
       │    ├─> jwt.strategy.ts
       │    └─> users.service.ts
       ├─> users.module.ts
       │    ├─> user.schema.ts
       │    └─> users.service.ts
       └─> seeder.module.ts
            └─> database.seeder.ts
```

```
main.ts (frontend)
  └─> app.component.ts
       └─> app.routes.ts
            ├─> login.component.ts
            │    └─> auth.service.ts
            ├─> admin.component.ts
            │    └─> auth.service.ts
            └─> guards/
                 ├─> auth.guard.ts
                 └─> admin.guard.ts
```

---

**Last Updated**: May 20, 2026
**Total Files**: 55+
**Production Ready**: ✅
