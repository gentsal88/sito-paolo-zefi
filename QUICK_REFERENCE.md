# Quick Reference Guide

Fast lookup for common commands and workflows.

## 🎯 Development Workflows

### Start Development Environment

**Terminal 1 - Backend**:
```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm install
npm start
```

**Terminal 3 - MongoDB (if local)**:
```bash
mongod
```

### Build for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build:prod
```

## 🔑 API Endpoints Quick Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | ❌ | Login with email/password |
| GET | `/auth/profile` | ✅ | Get current user |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users` | ❌ | Create user |
| GET | `/users/:id` | ✅ | Get user by ID |
| GET | `/users/profile` | ✅ | Get profile |

## 🔐 JWT Token Operations

### Get Token
```typescript
// Frontend
const token = localStorage.getItem('auth_token');
```

### Add Token to Request
```typescript
// Automatically done by JwtInterceptor
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Decode Token (Client-side)
```typescript
const payload = JSON.parse(
  atob(token.split('.')[1])
);
console.log(payload);
```

### Verify Token (Server-side)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/auth/profile
```

## 🐛 Common Issues & Fixes

### MongoDB Connection Error

**Problem**: `MongooseError: connect ECONNREFUSED`

**Solution**:
```bash
# Check MongoDB is running
mongod

# Or use MongoDB Atlas connection string
# Update MONGODB_URI in .env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### CORS Error

**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Update backend `.env`:
   ```
   CORS_ORIGIN=http://localhost:4200
   ```
2. Restart backend server
3. Clear browser cache

### Token Expired

**Problem**: `401 Unauthorized` after some hours

**Solution**:
```typescript
// Frontend
localStorage.removeItem('auth_token');
// User will be redirected to login page
router.navigate(['/login']);
```

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::3000`

**Solution**:
```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port in .env:
PORT=3001
```

## 📝 Testing Credentials

**Admin User** (auto-seeded):
```
Email: admin@admin.com
Password: admin123
```

## 🧪 Test Requests

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.com",
    "password": "admin123"
  }'
```

### Get Profile (requires token)
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📦 File Structure Quick Find

| What | Where |
|------|-------|
| Login Component | `frontend/src/app/pages/login/login.component.ts` |
| Admin Component | `frontend/src/app/pages/admin/admin.component.ts` |
| Auth Service | `frontend/src/app/core/services/auth.service.ts` |
| Auth Guard | `frontend/src/app/core/guards/auth.guard.ts` |
| Routes | `frontend/src/app/app.routes.ts` |
| Auth Controller | `backend/src/auth/auth.controller.ts` |
| Auth Service | `backend/src/auth/auth.service.ts` |
| User Schema | `backend/src/users/user.schema.ts` |
| Database Config | `backend/src/config/database.config.ts` |
| Seeder | `backend/src/common/seeder/database.seeder.ts` |

## 🔄 Git Workflow

### Initial Setup
```bash
git clone <repo>
cd sito-paulo-zefi
cd backend && npm install
cd ../frontend && npm install
```

### Daily Development
```bash
git pull
# Make changes
git add .
git commit -m "feat: description"
git push
```

### Before Deployment
```bash
# Ensure code quality
npm run lint
npm run build
npm run test

# Tag release
git tag v1.0.0
git push origin v1.0.0
```

## 🐳 Docker Commands

### Build
```bash
docker-compose build
```

### Start
```bash
docker-compose up -d
```

### Stop
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Access Container
```bash
docker exec -it sito-paulo-zefi-backend sh
docker exec -it sito-paulo-zefi-frontend sh
```

## 📊 Monitoring

### Backend Health
```bash
curl http://localhost:3000/health
```

### View Logs
```bash
# NestJS logs
npm run start:dev

# PM2 logs (production)
pm2 logs sito-paulo-backend
```

### Database Stats
```bash
mongo
use sito-paulo-zefi
db.users.find()
db.users.stats()
```

## 🔑 Environment Variables Reference

### Backend
```
NODE_ENV=development|production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sito-paulo-zefi
JWT_SECRET=your_secret_key
JWT_EXPIRATION=24h
BCRYPT_ROUNDS=10
CORS_ORIGIN=http://localhost:4200
```

### Frontend (hardcoded)
```typescript
// src/app/core/services/auth.service.ts
private apiUrl = 'http://localhost:3000/auth';
```

## 📈 Performance Tips

### Frontend
- Use `OnPush` change detection
- Lazy load routes
- Use `trackBy` in *ngFor loops
- Optimize images
- Enable gzip compression

### Backend
- Use connection pooling
- Implement caching
- Add rate limiting
- Use database indexes
- Monitor memory usage

### Database
- Create indexes on frequently queried fields
- Use projections to limit returned fields
- Implement pagination
- Regular backups

## 🚨 Emergency Procedures

### Rollback Deploy
```bash
git revert HEAD~1
git push
npm run build
# Redeploy
```

### Clear User Data
```bash
# MongoDB
use sito-paulo-zefi
db.users.deleteMany({})

# Run seeder again to create admin
# Restart backend
```

### Reset Database
```bash
mongo
use admin
db.dropDatabase()
# Restart MongoDB and backend
```

### Clear Frontend Cache
```typescript
// Browser console
localStorage.clear()
sessionStorage.clear()
// Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
```

## 📚 Documentation Links

- [NestJS Docs](https://docs.nestjs.com)
- [Angular Docs](https://angular.io)
- [MongoDB Docs](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)
- [JWT.io](https://jwt.io)
- [Passport.js](http://www.passportjs.org)

---

**Last Updated**: May 20, 2026
