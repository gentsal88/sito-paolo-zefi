# Best Practices & Production Checklist

Critical guidelines for production-ready code and deployment.

## ✅ Code Quality

### Backend (NestJS)

#### Controllers
- ✅ Minimal logic in controllers
- ✅ Delegate to services
- ✅ Use decorators for validation
- ✅ Handle HTTP status codes correctly

```typescript
// ✅ Good
@Post('login')
async login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}

// ❌ Bad - Business logic in controller
@Post('login')
async login(@Body() loginDto: LoginDto) {
  const user = await this.userModel.findOne(...);
  const isValid = await bcrypt.compare(...);
  // ... lots of logic
}
```

#### Services
- ✅ All business logic in services
- ✅ No HTTP knowledge
- ✅ Dependency injection
- ✅ Error handling

```typescript
// ✅ Good
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    // Business logic
  }
}
```

#### DTOs
- ✅ Define all request/response shapes
- ✅ Use class-validator decorators
- ✅ Type everything

```typescript
// ✅ Good
export class LoginDto {
  @IsEmail()
  email: string;
  
  @MinLength(8)
  password: string;
}
```

### Frontend (Angular)

#### Services
- ✅ Data fetching logic only
- ✅ Use Observables, not Promises
- ✅ Proper error handling
- ✅ Tap for side effects

```typescript
// ✅ Good
@Injectable()
export class AuthService {
  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/login', dto)
      .pipe(
        tap(response => this.setToken(response.access_token)),
        catchError(this.handleError)
      );
  }
}
```

#### Components
- ✅ Use OnPush change detection
- ✅ Unsubscribe from Observables (or use async pipe)
- ✅ Keep templates minimal
- ✅ Use Signals for state

```typescript
// ✅ Good
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ currentUser$ | async | json }}`
})
export class AdminComponent {
  currentUser$ = this.authService.currentUser$;
}
```

## 🔐 Security Best Practices

### Backend

#### JWT Security
```typescript
// ✅ Strong secret (min 32 chars, random)
JWT_SECRET: 'aB3$xY9@mK2%qL5&wN8*pR4+tH7/vC6-z'

// ✅ Short expiration for sensitive ops
JWT_EXPIRATION: '15m' // Access token
REFRESH_TOKEN_EXPIRATION: '7d'

// ✅ Never expose secrets
console.log(process.env.JWT_SECRET) // ❌ NEVER
```

#### Password Security
```typescript
// ✅ Bcrypt with sufficient rounds
const BCRYPT_ROUNDS = 12; // Production: 12+

// ✅ Never log passwords
logger.info(`User logged in: ${email}`) // ✅
logger.info(`User logged in: ${email}:${password}`) // ❌

// ✅ Verify password correctly
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

#### Input Validation
```typescript
// ✅ Validate all inputs
@Post('login')
async login(@Body() dto: LoginDto) {
  // DTO validation happens automatically via class-validator
}

// ✅ Sanitize database queries
const user = await this.userModel.findOne({ email: email.toLowerCase() });

// ✅ Parameterized queries (Mongoose does this)
// ❌ Don't use string concatenation
const query = `db.users.find({email: "${email}"})` // SQL Injection risk
```

#### CORS Security
```typescript
// ✅ Specific CORS origin
app.enableCors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
});

// ❌ Don't allow all origins
app.enableCors({ origin: '*' }) // NEVER
```

### Frontend

#### Token Storage
```typescript
// ✅ LocalStorage (acceptable for this app)
localStorage.setItem('auth_token', token);

// 🚀 Better: SessionStorage (auto-clears on browser close)
sessionStorage.setItem('auth_token', token);

// 🏆 Best: HttpOnly Cookies (backend sets, not accessible via JS)
// Response header: Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict
```

#### XSS Prevention
```typescript
// ✅ Angular sanitizes by default
{{ userData }} // Safe - Angular escapes

// ✅ Explicit sanitization if needed
<div [innerHTML]="sanitizedHtml"></div>

// ❌ Never use innerHTML with user data
<div innerHTML="{{ userData }}"></div>
```

#### CSRF Protection
```typescript
// ✅ Always use HTTPS
// ✅ Send CSRF token with POST/PUT/DELETE
// ✅ Use SameSite=Strict cookies
// ✅ Check Origin/Referer headers
```

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing: `npm test`
- [ ] No console.log statements (use logger)
- [ ] No hardcoded credentials
- [ ] Environment variables documented
- [ ] Database migrations run
- [ ] API endpoints tested
- [ ] Performance optimized
- [ ] Security headers set
- [ ] CORS properly configured
- [ ] SSL certificates ready
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Error tracking enabled (Sentry, etc)

### Backend

- [ ] `NODE_ENV=production`
- [ ] Strong JWT_SECRET (min 32 chars)
- [ ] BCRYPT_ROUNDS >= 12
- [ ] CORS_ORIGIN set correctly
- [ ] MongoDB authentication enabled
- [ ] Connection pooling enabled
- [ ] Rate limiting enabled
- [ ] Request logging enabled
- [ ] Error logging to external service
- [ ] Health check endpoint available
- [ ] Graceful shutdown configured

```typescript
// Example: Health check endpoint
@Get('health')
@Public()
health(): object {
  return {
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime()
  };
}
```

### Frontend

- [ ] Production build: `npm run build:prod`
- [ ] Bundle analyzed for size
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] API URLs point to production
- [ ] Console errors cleared
- [ ] Sourcemaps disabled or external
- [ ] Service Worker configured (optional)
- [ ] Error tracking enabled
- [ ] Performance monitoring enabled

### Database

- [ ] Automated backups enabled
- [ ] Backup verification tested
- [ ] Indexes created
- [ ] Connection encryption enabled
- [ ] Authentication required
- [ ] Network access restricted
- [ ] Disk space monitored
- [ ] Replication enabled (optional)

### Infrastructure

- [ ] SSL/TLS certificates installed
- [ ] HTTP → HTTPS redirect
- [ ] Security headers set
  ```
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Content-Security-Policy: default-src 'self'
  ```
- [ ] Rate limiting configured
- [ ] DDoS protection enabled
- [ ] Firewall configured
- [ ] SSH key-based authentication only
- [ ] No default credentials

## 🚀 Performance Optimization

### Backend

```typescript
// ✅ Use pagination
@Get('users')
async getUsers(
  @Query('page') page = 1,
  @Query('limit') limit = 20
) {
  return this.usersService.findAll(page, limit);
}

// ✅ Use projections (select specific fields)
const user = await this.userModel
  .findById(id)
  .select('email role -password');

// ✅ Use indexes
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

// ✅ Cache frequently accessed data
@Cacheable({ ttl: 600 })
async getProfile(userId: string) {
  return this.userModel.findById(userId);
}
```

### Frontend

```typescript
// ✅ OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// ✅ TrackBy in *ngFor
<div *ngFor="let user of users; trackBy: trackByUserId">

trackByUserId(index: number, user: User): string {
  return user.id;
}

// ✅ Lazy loading routes
const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent),
    canActivate: [AdminGuard]
  }
];

// ✅ RxJS operators
this.authService.login(dto).pipe(
  debounceTime(300),
  distinctUntilChanged(),
  tap(response => this.setToken(response))
).subscribe();
```

## 🔄 Monitoring & Logging

### Backend Logging

```typescript
// ✅ Use proper log levels
this.logger.log('Application started');     // INFO
this.logger.warn('Low memory');             // WARN
this.logger.error('Database connection failed', error); // ERROR
this.logger.debug('User logged in', userId); // DEBUG

// ❌ Avoid console.log in production
console.log('Debug info'); // Use logger instead

// ✅ Include request ID for tracing
@UseInterceptors(new RequestIdInterceptor())
@Post('login')
async login(@Request() req) {
  this.logger.log(`Login attempt`, req.id);
}
```

### Frontend Error Tracking

```typescript
// ✅ Setup error handler
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handle(error: Error | HttpErrorResponse) {
    // Send to error tracking service (Sentry)
    this.errorService.captureException(error);
    
    // Show user-friendly message
    this.toastr.error('An error occurred');
  }
}

// ✅ Setup performance monitoring
mark('auth-login-start');
// ... login logic
measure('auth-login-duration', 'auth-login-start');
```

## 🧪 Testing Strategy

### Backend

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

```typescript
// ✅ Test service methods
describe('AuthService', () => {
  it('should login with valid credentials', async () => {
    const result = await authService.login({
      email: 'test@test.com',
      password: 'password123'
    });
    expect(result.access_token).toBeDefined();
  });
});
```

### Frontend

```bash
# Unit tests
npm run test

# E2E tests (Cypress/Playwright)
npm run e2e
```

```typescript
// ✅ Test component
it('should navigate to admin on successful login', () => {
  component.email = 'admin@admin.com';
  component.password = 'admin123';
  component.onLogin();
  
  expect(router.navigate).toHaveBeenCalledWith(['/admin']);
});
```

## 📝 Documentation Requirements

- [ ] README.md for each module
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Architecture diagrams
- [ ] Deployment guide
- [ ] Environment variables documented
- [ ] Common issues & solutions
- [ ] Development setup guide

## 🔄 CI/CD Pipeline

```yaml
# .github/workflows/main.yml
name: CI/CD

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
      - name: Backend Tests
        run: cd backend && npm test
      - name: Frontend Tests
        run: cd frontend && npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Backend
        run: cd backend && npm run build
      - name: Build Frontend
        run: cd frontend && npm run build:prod

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: # your deployment script
```

---

**Last Updated**: May 20, 2026
