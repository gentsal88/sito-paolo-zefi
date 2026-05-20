# Deployment Guide

Production deployment per Sito Paulo Zefi (Angular + NestJS + MongoDB)

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB 5+
- npm or yarn

### Setup

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run start:dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

- Backend: http://localhost:3000
- Frontend: http://localhost:4200

## Docker Deployment

### Build Images

```bash
# Build all images
docker-compose build

# Run services
docker-compose up -d
```

Services:
- MongoDB: localhost:27017
- Backend: localhost:3000
- Frontend: localhost:4200

### Docker Cleanup

```bash
docker-compose down -v  # Remove volumes too
```

## Production Environment

### Environment Variables

**Backend (.env)**:
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/sito-paulo-zefi
JWT_SECRET=CHANGE_THIS_STRONG_SECRET_KEY_IN_PRODUCTION
JWT_EXPIRATION=24h
BCRYPT_ROUNDS=12
CORS_ORIGIN=https://yourdomain.com
```

**Security Considerations**:
- ✅ Use strong JWT_SECRET (min 32 characters)
- ✅ Enable MongoDB authentication
- ✅ Use HTTPS/SSL only
- ✅ Set secure CORS_ORIGIN
- ✅ Use production-grade MongoDB (Atlas, AWS, etc.)
- ✅ Enable environment-based configuration

### Backend Deployment

#### Option 1: Heroku

```bash
# Create Heroku app
heroku create sito-paulo-zefi-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_strong_secret_key
heroku config:set MONGODB_URI=mongodb+srv://...

# Deploy
git push heroku main
```

#### Option 2: AWS/DigitalOcean/Linode

1. **EC2/Droplet Setup**:
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2

   # Clone repo and setup
   git clone <repo-url>
   cd backend
   npm install
   npm run build
   ```

2. **PM2 Process Manager**:
   ```bash
   # Start app
   pm2 start dist/main.js --name "sito-paulo-backend"

   # Enable autostart
   pm2 startup
   pm2 save
   ```

3. **Nginx Reverse Proxy**:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   # Enable and reload
   sudo systemctl enable nginx
   sudo systemctl reload nginx
   ```

4. **SSL Certificate (Let's Encrypt)**:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d api.yourdomain.com
   ```

#### Option 3: Docker Container

```bash
# Build image
docker build -t sito-paulo-backend:latest -f backend/Dockerfile backend/

# Run container
docker run -d \
  --name sito-backend \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db \
  -e JWT_SECRET=your_secret \
  sito-paulo-backend:latest
```

### Frontend Deployment

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

Automatically builds, deploys, and provides SSL.

#### Option 2: Netlify

```bash
# Build
npm run build:prod

# Deploy dist folder to Netlify
# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=dist/frontend
```

#### Option 3: AWS S3 + CloudFront

```bash
# Build app
npm run build:prod

# Upload to S3
aws s3 sync dist/frontend/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

#### Option 4: GitHub Pages

```bash
# Add to angular.json:
# "outputPath": "dist/frontend"

npm run build:prod

# Deploy dist folder to gh-pages branch
gh-pages -d dist/frontend
```

## Database Deployment

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Create database user
4. Get connection string
5. Update MONGODB_URI in backend .env

### Self-Hosted MongoDB

```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb

# Create admin user
mongo
use admin
db.createUser({
  user: "admin",
  pwd: "password",
  roles: [{ role: "root", db: "admin" }]
})

# Enable authentication in /etc/mongodb.conf
# Restart MongoDB
sudo systemctl restart mongodb
```

## SSL/TLS Certificate

### Using Let's Encrypt + Certbot

```bash
sudo certbot certonly --standalone \
  -d yourdomain.com \
  -d api.yourdomain.com \
  -d app.yourdomain.com
```

Certificates located in: `/etc/letsencrypt/live/yourdomain.com/`

### Auto-renewal

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## Monitoring & Logging

### PM2 Monitoring

```bash
# Start monitoring
pm2 monit

# Save logs
pm2 save

# View logs
pm2 logs sito-paulo-backend
```

### Nginx Logs

```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

## Performance Optimization

### Backend

```bash
# Enable compression
npm install compression

# Use clustering
npm install throng
```

### Frontend

```bash
# Analyze bundle
npm run build -- --stats-json
webpack-bundle-analyzer dist/frontend/stats.json

# Optimize images
npm install imagemin
```

## Health Checks

### Backend Health Endpoint

Add to `app.controller.ts`:
```typescript
@Get('health')
health() {
  return { status: 'ok', timestamp: new Date() };
}
```

### Monitoring

```bash
# Check backend
curl https://api.yourdomain.com/health

# Check frontend
curl https://yourdomain.com

# Check database
mongo --host production-cluster.mongodb.net --authenticationDatabase admin -u admin
```

## Rollback Procedure

### Git-based

```bash
git revert HEAD~1
git push origin main
```

### Container-based

```bash
docker pull sito-paulo-backend:v1.0.0
docker stop sito-backend
docker rm sito-backend
docker run -d ... sito-paulo-backend:v1.0.0
```

## Security Checklist

- [ ] JWT_SECRET is strong and random
- [ ] CORS_ORIGIN is set correctly
- [ ] MongoDB has authentication enabled
- [ ] SSL/TLS certificates installed
- [ ] Environment variables are not in git
- [ ] Rate limiting configured
- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] Security headers configured
- [ ] Regular backups enabled
- [ ] Monitoring and alerting configured

## Support & Troubleshooting

**503 Service Unavailable**
- Check backend is running: `pm2 status`
- Check MongoDB connection: `mongo`
- Check logs: `pm2 logs`

**CORS Error**
- Verify CORS_ORIGIN matches frontend URL
- Restart backend after changing .env

**SSL Certificate Error**
- Renew certificate: `certbot renew`
- Check certificate: `certbot certificates`

---

For detailed info, see individual README.md files in backend/ and frontend/ directories.
