# System Architecture

Complete system design for Sito Paulo Zefi application.

## 🏛️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Angular 17 - Standalone Components + Signals           │  │
│  │  - Login Component                                       │  │
│  │  - Admin Dashboard Component                            │  │
│  │  - Core Services (Auth, API)                            │  │
│  │  - Guards (Auth, Admin)                                 │  │
│  │  - Interceptors (JWT)                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│         ↓ HTTP/REST API Calls (JWT-authenticated)             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CORS Middleware | Rate Limiting | Logging              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                          │
│                   (NestJS 10 Modules)                           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              AUTH MODULE                               │    │
│  │  - JwtStrategy (Token Validation)                      │    │
│  │  - LocalStrategy (Email/Password)                      │    │
│  │  - JwtGuard (Route Protection)                         │    │
│  │  - AuthController (POST /login, GET /profile)         │    │
│  │  - AuthService (Business Logic)                        │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              USERS MODULE                              │    │
│  │  - User Schema (Mongoose)                              │    │
│  │  - UsersController (CRUD endpoints)                    │    │
│  │  - UsersService (DB operations)                        │    │
│  │  - Password hashing (bcrypt)                           │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              COMMON MODULE                             │    │
│  │  - ExceptionFilter (Global error handling)             │    │
│  │  - DatabaseSeeder (Initial data)                       │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              CONFIG MODULE                             │    │
│  │  - Database Configuration                              │    │
│  │  - JWT Configuration                                   │    │
│  │  - Environment Variables                               │    │
│  └────────────────────────────────────────────────────────┘    │
│                              ↓                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Mongoose ORM + MongoDB Connection Pool                 │  │
│  │  - User Schema & Model                                  │  │
│  │  - Query Building & Validation                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    PERSISTENCE LAYER                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  MongoDB Database                                        │  │
│  │  ├── Collections: users                                 │  │
│  │  ├── Indexes: email (unique)                            │  │
│  │  └── Replicas (optional): 3-node cluster               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow Sequence

```
BROWSER                ANGULAR APP              NESTJS BACKEND          DATABASE
   │                      │                          │                      │
   │───── Enter Email ────>│                          │                      │
   │     & Password        │                          │                      │
   │                       │                          │                      │
   │                       │──── POST /auth/login ──->│                      │
   │                       │  {email, password}       │                      │
   │                       │                          │ Find User            │
   │                       │                          ├─────────────────────>│
   │                       │                          │ User Document        │
   │                       │                          │<─────────────────────┤
   │                       │                          │ Verify Password      │
   │                       │                          │ (bcrypt.compare)     │
   │                       │ 200 + JWT Token          │                      │
   │                       │<─ {access_token} ────────│                      │
   │                       │                          │                      │
   │                       │ Save Token               │                      │
   │                       │ (localStorage)           │                      │
   │                       │                          │                      │
   │──── Show Dashboard ──>│ Route Guard              │                      │
   │                       │ Check isAuthenticated    │                      │
   │                       │ Redirect /admin          │                      │
   │                       │                          │                      │
   │                       │──── GET /auth/profile ──>│                      │
   │                       │ Authorization:           │ Validate JWT Token   │
   │                       │ Bearer <token>           │ Extract User ID      │
   │                       │ (Interceptor adds)       │                      │
   │                       │                          │ Find User By ID      │
   │                       │                          ├─────────────────────>│
   │                       │ 200 + User Profile       │ User Document        │
   │                       │<─ {id, email, role}  ───│<─────────────────────┤
   │                       │                          │                      │
   │ Display User Info     │ Update Component         │                      │
   │<───── Render ─────────│                          │                      │
   │                       │                          │                      │
```

## 📦 Module Dependencies

```
AppModule (Root)
├── ConfigModule (Global)
│   ├── database.config.ts
│   └── jwt.config.ts
├── MongooseModule
│   └── Database Connection
├── AuthModule
│   ├── JwtModule
│   ├── PassportModule
│   ├── UsersModule (Imported)
│   ├── JwtStrategy
│   ├── LocalStrategy
│   ├── AuthService
│   └── AuthController
├── UsersModule
│   ├── MongooseModule (User Schema)
│   ├── UsersService
│   └── UsersController
└── SeederModule
    └── DatabaseSeederService
```

## 🔄 Data Flow

### Login Flow
```
1. User submits credentials
   └─> LoginComponent receives email & password

2. Call AuthService.login()
   └─> POST /auth/login with credentials
   └─> Backend receives request in AuthController

3. AuthService validates credentials
   └─> Find user by email in MongoDB
   └─> Compare password with bcrypt
   └─> If valid, generate JWT token

4. Frontend stores token
   └─> localStorage.setItem('auth_token', token)
   └─> Update BehaviorSubjects for reactivity

5. Interceptor attaches token
   └─> Every subsequent request includes Authorization header
   └─> Format: "Bearer <jwt_token>"

6. Backend validates token
   └─> JwtStrategy extracts token from header
   └─> Verifies signature using JWT_SECRET
   └─> Extracts user info from payload
   └─> Attaches user to Request object

7. Route Guard checks authorization
   └─> If JwtGuard: checks if token exists
   └─> If AdminGuard: checks if role === 'admin'
   └─> Allows or denies access
```

### Request Lifecycle
```
HTTP Request
    ↓
[CORS Middleware] - Check origin
    ↓
[JWT Interceptor] - Attach token (Frontend)
    ↓
[CORS Handler] - Add CORS headers (Backend)
    ↓
[Route Handler] - Match route
    ↓
[Guard] - Check authorization
    ├─> JwtGuard validates token
    ├─> AdminGuard checks role
    └─> If fails, return 403 Unauthorized
    ↓
[Controller] - Route to method
    ↓
[Service] - Business logic
    ├─> Database operations
    ├─> Data transformation
    └─> Error handling
    ↓
[Database] - Query/Update/Delete
    ↓
[Response] - Return to client
    ↓
[Exception Filter] - Handle errors globally
    ↓
HTTP Response (JSON)
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId("..."),
  email: String (unique, indexed, lowercase),
  password: String (bcrypt hashed),
  role: String (enum: ['admin', 'user']),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `email` (unique, sparse)
- `createdAt` (for sorting)

## 🔐 Security Layers

### 1. Transport Security
- HTTPS/TLS encryption
- SSL certificates (Let's Encrypt)
- Secure headers (Helmet)

### 2. Authentication
- Passport.js strategies
- JWT token-based auth
- Secure token storage

### 3. Authorization
- Role-based access control (RBAC)
- Guards (JwtGuard, AdminGuard, RolesGuard)
- Route protection decorators

### 4. Data Security
- Password hashing (bcrypt, 10-12 rounds)
- Input validation (class-validator)
- Output sanitization

### 5. Database Security
- MongoDB authentication
- Connection string encryption
- Query parameterization (Mongoose)

## 🚀 Performance Considerations

### Frontend
- **Lazy Loading**: Route-based code splitting
- **Change Detection**: OnPush strategy with Signals
- **Bundle Size**: Tree-shaking, minification
- **Caching**: Token in localStorage, HTTP caching
- **Compression**: Gzip enabled

### Backend
- **Connection Pooling**: MongoDB connection reuse
- **Caching**: Response caching middleware
- **Pagination**: Implement for large datasets
- **Rate Limiting**: Prevent brute force attacks
- **Clustering**: Multi-core utilization (PM2)

### Database
- **Indexing**: Index frequently queried fields
- **Replication**: 3-node replica set
- **Sharding**: Horizontal scaling for large datasets
- **Backup**: Automated daily backups

## 📊 API Response Format

### Success Response (200)
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@admin.com",
    "role": "admin"
  }
}
```

### Error Response (4xx/5xx)
```json
{
  "statusCode": 401,
  "timestamp": "2024-05-20T10:30:00.000Z",
  "path": "/auth/login",
  "message": "Invalid credentials"
}
```

## 🔄 Deployment Architecture

### Development
```
localhost:4200 (Angular)
     ↓
localhost:3000 (NestJS)
     ↓
mongodb://localhost:27017 (MongoDB)
```

### Production (Docker)
```
Frontend Container (nginx)
├─ Port: 80/443
└─ dist/frontend (Angular build)
     ↓
Backend Container (Node.js)
├─ Port: 3000
└─ src/main.ts (NestJS app)
     ↓
MongoDB Container
└─ Port: 27017 (or MongoDB Atlas)
```

### Production (Cloud)
```
CDN (Vercel/Netlify - Frontend)
     ↓
Cloud Run (Backend - Google Cloud)
     ↓
MongoDB Atlas (Database - Cloud)
```

---

**Last Updated**: May 20, 2026
