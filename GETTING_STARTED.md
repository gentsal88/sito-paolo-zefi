# Getting Started - Complete Setup Guide

Step-by-step guide to get the application running locally from scratch.

## 📋 Prerequisites

Verify you have these installed:

```bash
# Check Node.js version (need 18+)
node --version

# Check npm version (need 8+)
npm --version

# Check MongoDB (optional, can use Atlas)
mongod --version
```

If any are missing:
- **Node.js**: Download from https://nodejs.org/
- **MongoDB**: Download from https://www.mongodb.com/try/download/community

## 🚀 Quick Start (5 minutes)

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# The .env file is pre-configured for local development
# Just ensure MongoDB is running

# Start development server
npm run start:dev
```

You should see:
```
✅ Server running on http://localhost:3000
```

**Default Admin Created**:
- Email: `admin@admin.com`
- Password: `admin123`

### 2. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Browser automatically opens to:
```
http://localhost:4200
```

## ✅ Verify Everything Works

### 1. Test Login Flow

1. Go to http://localhost:4200
2. You're redirected to `/login` (not authenticated)
3. Enter credentials:
   - Email: `admin@admin.com`
   - Password: `admin123`
4. Click Login
5. Should redirect to `/admin` dashboard
6. See user information displayed

### 2. Test API Endpoints

Open terminal and run:

```bash
# Test login endpoint
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.com",
    "password": "admin123"
  }'

# You'll get a response like:
# {
#   "access_token": "eyJhbGc...",
#   "user": {
#     "id": "...",
#     "email": "admin@admin.com",
#     "role": "admin"
#   }
# }
```

Copy the `access_token` and test profile endpoint:

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# You'll get user profile back
```

## 🗄️ Database Setup

### Option 1: Local MongoDB

```bash
# Start MongoDB service
mongod

# In another terminal, verify connection
mongo
# Should connect successfully
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Update in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/sito-paulo-zefi
   ```

## 📁 Project Structure

```
sito-paulo-zefi/
├── backend/                 # NestJS server
│   ├── src/
│   │   ├── auth/           # Login, JWT, strategies
│   │   ├── users/          # User model, schema
│   │   ├── common/         # Shared utilities
│   │   ├── config/         # Configuration
│   │   ├── app.module.ts   # Main module
│   │   └── main.ts         # Entry point
│   ├── package.json
│   └── .env                # Environment variables
│
├── frontend/                # Angular app
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/       # Services, guards
│   │   │   ├── pages/      # Components
│   │   │   └── app.routes.ts
│   │   ├── main.ts
│   │   └── index.html
│   ├── package.json
│   └── angular.json
│
└── README.md               # Main documentation
```

## 🛠️ Available Commands

### Backend

```bash
cd backend

npm run start:dev        # Development with hot reload
npm run start            # Production mode
npm run build            # Build for production
npm run lint             # ESLint check
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:cov         # Coverage report
```

### Frontend

```bash
cd frontend

npm start                 # Development server
npm run build             # Production build
npm run build:prod        # Production with optimization
npm run lint              # ESLint check
npm run test              # Unit tests
npm run test:watch        # Watch mode
```

## 🔐 Login & Dashboard

### Admin Credentials

After startup, admin user is automatically created:

**Email**: `admin@admin.com`
**Password**: `admin123`

### First Time Login

1. Navigate to http://localhost:4200
2. Enter credentials above
3. You'll be redirected to admin dashboard
4. You can see:
   - Your user ID
   - Email address
   - Role (admin)
   - Last login time
   - Logout button

## 🐛 Troubleshooting

### "MongoDB connection failed"

**Solution**:
```bash
# Check if MongoDB is running
mongod

# Or use MongoDB Atlas instead:
# 1. Update MONGODB_URI in backend/.env
# 2. MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
# 3. Restart backend: npm run start:dev
```

### "Port 3000 already in use"

**Solution**:
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or change port in backend/.env:
PORT=3001
```

### "Port 4200 already in use"

**Solution**:
```bash
# Use different port
ng serve --port 4201

# Or kill process on 4200
lsof -ti:4200 | xargs kill -9
```

### "CORS error in browser console"

**Solution**:
1. Check backend `.env` has:
   ```
   CORS_ORIGIN=http://localhost:4200
   ```
2. Restart backend:
   ```bash
   npm run start:dev
   ```
3. Clear browser cache (Ctrl+Shift+R)

### "Cannot login, get 401 error"

**Solution**:
1. Verify credentials:
   - Email: `admin@admin.com` (exact, lowercase)
   - Password: `admin123` (exact)
2. Check backend is running:
   ```bash
   curl http://localhost:3000/auth/profile
   ```
3. If needed, reset database:
   ```bash
   # Stop backend
   # Delete database or collections
   mongod -> use sito-paulo-zefi -> db.users.deleteMany({})
   # Restart backend (seeder will recreate admin)
   npm run start:dev
   ```

### "Token not being sent with requests"

**Solution**:
1. Check token stored:
   - Open DevTools → Application → Local Storage
   - Look for `auth_token`
2. Check interceptor is attached:
   - Verify `JwtInterceptor` in `main.ts`
3. Manually clear and re-login:
   ```bash
   localStorage.clear()
   sessionStorage.clear()
   # Then login again
   ```

## 🚢 Next Steps

After verifying everything works:

1. **Explore Code**: Read through `backend/src` and `frontend/src`
2. **Read Documentation**:
   - `README.md` - Main overview
   - `ARCHITECTURE.md` - System design
   - `QUICK_REFERENCE.md` - Common tasks
   - `BEST_PRACTICES.md` - Production guidelines
3. **Make Changes**: Modify code, restart dev servers (hot reload works)
4. **Test APIs**: Use curl or Postman to test endpoints
5. **Build for Production**: `npm run build` in both folders

## 📚 Learning Resources

- **NestJS**: https://docs.nestjs.com/
- **Angular**: https://angular.io/docs
- **MongoDB**: https://docs.mongodb.com/
- **JWT**: https://jwt.io/
- **Passport**: http://www.passportjs.org/

## 🎯 Common Workflows

### Add New API Endpoint (Backend)

1. Create new controller method in `users.controller.ts`
2. Add business logic in `users.service.ts`
3. Add DTO if needed in `users/dto/`
4. Restart backend
5. Test with curl or Postman

### Add New Page (Frontend)

1. Create component in `src/app/pages/new-page/`
2. Add route in `app.routes.ts`
3. Create service if needed in `core/services/`
4. Add to routing with guard if protected
5. Frontend hot reloads automatically

### Add New Field to User Schema

1. Update `user.schema.ts`
2. Add to `CreateUserDto` if needed
3. Run seeder again (or manually add to DB)
4. Update frontend component if needed

## 💾 Save Your Work

```bash
# Commit changes
git add .
git commit -m "feat: description of changes"
git push

# Tag a release
git tag v1.0.0
git push origin v1.0.0
```

## 🎓 What to Do Next

1. ✅ Setup complete and verified working
2. 📖 Read architecture documentation
3. 🔧 Modify code and test changes
4. 🚀 Deploy to production
5. 📊 Add monitoring and logging
6. 🧪 Add tests
7. 🔐 Implement more authentication methods

---

**Estimated Setup Time**: 5-10 minutes
**Difficulty Level**: Beginner-friendly
**Last Updated**: May 20, 2026
