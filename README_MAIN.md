# Sito Paulo Zefi - Full Stack Application

## 📦 What's Inside

This is a **production-ready** full-stack application built with:

### Backend
- **NestJS 10** - Modern Node.js framework
- **MongoDB + Mongoose** - NoSQL database
- **JWT + Passport** - Authentication
- **bcrypt** - Password hashing

### Frontend  
- **Angular 17** - Latest framework with Signals
- **Standalone Components** - Modern patterns
- **JWT Interceptor** - Automatic token injection
- **Route Guards** - Role-based access control

## 🚀 Quick Start

```bash
# 1. Backend
cd backend
npm install
npm run start:dev

# 2. Frontend (new terminal)
cd frontend
npm install
npm start
```

**Login with**:
- Email: `admin@admin.com`
- Password: `admin123`

## 📚 Documentation

Start here based on your needs:

| Purpose | Document |
|---------|----------|
| **Getting Started** | [GETTING_STARTED.md](GETTING_STARTED.md) |
| **Architecture Overview** | [ARCHITECTURE.md](ARCHITECTURE.md) |
| **Quick Commands** | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| **Production Deployment** | [DEPLOYMENT.md](DEPLOYMENT.md) |
| **Code Best Practices** | [BEST_PRACTICES.md](BEST_PRACTICES.md) |
| **Backend Details** | [backend/README.md](backend/README.md) |
| **Frontend Details** | [frontend/README.md](frontend/README.md) |

## 🎯 Key Features

✅ **Complete Auth System**
- JWT token-based authentication
- Secure password hashing (bcrypt)
- Role-based access control
- Automatic token injection via interceptor

✅ **Production Ready**
- Global exception handling
- Input validation (class-validator)
- Environment-based configuration
- CORS properly configured
- Database seeder with default admin

✅ **Modern Architecture**
- Clean controller → service → repository pattern
- Standalone Angular components with Signals
- Modular NestJS structure
- Type-safe with TypeScript

✅ **Fully Documented**
- Architecture diagrams
- API documentation
- Deployment guides
- Troubleshooting tips
- Code examples

## 📋 Project Structure

```
sito-paulo-zefi/
├── backend/          # NestJS API server
├── frontend/         # Angular web app
├── GETTING_STARTED.md
├── ARCHITECTURE.md
├── DEPLOYMENT.md
├── QUICK_REFERENCE.md
├── BEST_PRACTICES.md
└── docker-compose.yml
```

## 🔑 Default Credentials

The system auto-creates an admin user on first run:

```
Email:    admin@admin.com
Password: admin123
```

## 🛠️ Tech Stack

**Backend**
- NestJS, MongoDB, Mongoose, Passport, JWT, bcrypt

**Frontend**
- Angular, TypeScript, RxJS, Signals

**Infrastructure**
- Docker, Docker Compose, MongoDB, Node.js

## 🚀 Available Commands

```bash
# Backend
cd backend
npm run start:dev      # Development with hot reload
npm run build          # Production build
npm run test           # Run tests

# Frontend
cd frontend
npm start              # Development server
npm run build:prod     # Production build
npm run test           # Run tests
```

## 🐳 Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# Access
- Backend:  http://localhost:3000
- Frontend: http://localhost:4200
- MongoDB:  localhost:27017
```

## 🔐 Security Features

- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ CORS properly configured
- ✅ Global exception filtering
- ✅ Input validation
- ✅ Secure token storage

## 📊 API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth/login` | ❌ | Login with credentials |
| GET | `/auth/profile` | ✅ | Get current user |
| POST | `/users` | ❌ | Create user |
| GET | `/users/:id` | ✅ | Get user by ID |

## 🚢 Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Cloud deployment (Vercel, Heroku, AWS)
- Docker deployment
- MongoDB Atlas setup
- SSL/TLS configuration
- Monitoring and logging

## 💡 Next Steps

1. **Start Development**
   ```bash
   cd backend && npm run start:dev
   cd frontend && npm start
   ```

2. **Read Documentation** - Start with [GETTING_STARTED.md](GETTING_STARTED.md)

3. **Explore Code** - Check out `backend/src` and `frontend/src` structure

4. **Make Changes** - Hot reload enabled for both backend and frontend

5. **Deploy** - Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production

## ⚠️ Important Notes

- Change `JWT_SECRET` in production
- Use strong passwords for database
- Enable HTTPS/SSL in production
- Regularly backup MongoDB data
- Monitor application logs
- Keep dependencies updated

## 📝 License

MIT

## 🤝 Support

For issues and questions:
1. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common issues
2. Read [ARCHITECTURE.md](ARCHITECTURE.md) for design details
3. See [BEST_PRACTICES.md](BEST_PRACTICES.md) for code patterns

---

**Created**: 2024  
**Last Updated**: May 20, 2026  
**Status**: Production Ready ✅
