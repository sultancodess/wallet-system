# 🚀 StageOne Wallet - Deployment Guide

Complete guide for deploying the StageOne Wallet system to Railway.app with production-ready configuration.

## 📋 **Pre-Deployment Checklist**

### **✅ Code Preparation**
- [ ] All features implemented and tested
- [ ] Environment variables configured
- [ ] Database schema validated
- [ ] Error handling implemented
- [ ] Security measures in place
- [ ] Performance optimizations applied

### **✅ Database Setup**
- [ ] MongoDB Atlas cluster created
- [ ] Database user with appropriate permissions
- [ ] Network access configured (0.0.0.0/0 for Railway)
- [ ] Connection string tested locally

### **✅ Security Configuration**
- [ ] Strong JWT secret generated (minimum 32 characters)
- [ ] Unique encryption secret created
- [ ] Environment variables secured
- [ ] No sensitive data in code repository

## 🛠 **Railway.app Deployment Steps**

### **Step 1: Repository Preparation**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready deployment"
   git push origin main
   ```

2. **Verify Repository Structure**
   ```
   ├── app/                 # Next.js application
   ├── lib/                 # Utility libraries
   ├── package.json         # Dependencies
   ├── railway.json         # Railway configuration
   ├── .env.example         # Environment template
   └── README.md           # Documentation
   ```

### **Step 2: Railway Project Setup**

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub account
   - Verify email address

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select main branch

### **Step 3: Environment Configuration**

Set the following environment variables in Railway dashboard:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stageone_wallet?retryWrites=true&w=majority

# Security Keys
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters-long
ENCRYPTION_SECRET=your-super-secure-encryption-key-minimum-32-characters-long

# Application Settings
NODE_ENV=production
NEXTAUTH_URL=https://your-app-name.railway.app
```

### **Step 4: Build Configuration**

Railway will automatically detect Next.js and use these settings:

```json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

### **Step 5: Deploy and Verify**

1. **Automatic Deployment**
   - Railway will automatically build and deploy
   - Monitor build logs for any errors
   - Wait for deployment to complete

2. **Access Your Application**
   - Your app will be available at: `https://your-app-name.railway.app`
   - Test all core functionality

## 🧪 **Post-Deployment Testing**

### **Functional Testing Checklist**

1. **Authentication Flow**
   - [ ] User registration works
   - [ ] User login successful
   - [ ] JWT token generation and validation
   - [ ] Logout functionality

2. **Wallet Operations**
   - [ ] Balance display (encrypted/decrypted correctly)
   - [ ] Wallet recharge functionality
   - [ ] Payment processing
   - [ ] Premium user overdraft

3. **Transaction Management**
   - [ ] Transaction history display
   - [ ] Transaction filtering
   - [ ] Real-time balance updates

4. **Security Features**
   - [ ] Data encryption working
   - [ ] Unauthorized access blocked
   - [ ] Input validation active
   - [ ] Error handling secure

### **Performance Testing**

1. **Load Testing**
   ```bash
   # Test concurrent users (if you have tools)
   # Monitor response times
   # Check database connection stability
   ```

2. **Security Testing**
   ```bash
   # Test SQL injection attempts
   # Verify HTTPS enforcement
   # Check for exposed sensitive data
   ```

## 🔧 **Troubleshooting Common Issues**

### **Build Failures**

**Issue**: Build fails with dependency errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Environment variables not loading
```bash
# Solution: Verify Railway environment variables
# Check variable names match exactly
# Ensure no extra spaces or characters
```

### **Database Connection Issues**

**Issue**: MongoDB connection timeout
```bash
# Solution: Check MongoDB Atlas settings
# Verify network access (0.0.0.0/0)
# Test connection string locally
```

**Issue**: Authentication failed
```bash
# Solution: Verify database user permissions
# Check username/password in connection string
# Ensure database exists
```

### **Runtime Errors**

**Issue**: 500 Internal Server Error
```bash
# Solution: Check Railway logs
# Verify all environment variables set
# Test API endpoints individually
```

**Issue**: Encryption/Decryption errors
```bash
# Solution: Verify ENCRYPTION_SECRET is set
# Check secret key length (minimum 32 chars)
# Test encryption locally first
```

## 📊 **Monitoring and Maintenance**

### **Railway Dashboard Monitoring**

1. **Application Metrics**
   - CPU usage
   - Memory consumption
   - Request response times
   - Error rates

2. **Database Monitoring**
   - Connection count
   - Query performance
   - Storage usage
   - Index efficiency

### **Log Monitoring**

```bash
# View Railway logs
railway logs

# Filter for errors
railway logs --filter error

# Real-time monitoring
railway logs --follow
```

### **Health Checks**

Create a health check endpoint:

```javascript
// app/api/health/route.js
export async function GET() {
  try {
    // Test database connection
    const client = await clientPromise
    await client.db().admin().ping()
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    })
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message
    }, { status: 500 })
  }
}
```

## 🔄 **Continuous Deployment**

### **Automatic Deployments**

Railway automatically deploys when you push to main branch:

```bash
# Make changes
git add .
git commit -m "Feature: Add new functionality"
git push origin main

# Railway will automatically:
# 1. Detect changes
# 2. Build application
# 3. Deploy to production
# 4. Update live URL
```

### **Rollback Strategy**

If deployment fails:

1. **Quick Rollback**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   ```

2. **Manual Rollback**
   - Use Railway dashboard
   - Select previous deployment
   - Click "Redeploy"

## 📈 **Performance Optimization**

### **Production Optimizations**

1. **Next.js Optimizations**
   ```javascript
   // next.config.js
   module.exports = {
     compress: true,
     poweredByHeader: false,
     generateEtags: false,
     httpAgentOptions: {
       keepAlive: true,
     },
   }
   ```

2. **Database Optimizations**
   ```javascript
   // Ensure proper indexing
   db.users.createIndex({ email: 1 }, { unique: true })
   db.wallets.createIndex({ userId: 1 })
   db.transactions.createIndex({ userId: 1, createdAt: -1 })
   ```

### **Caching Strategy**

```javascript
// Add caching headers
export async function GET(request) {
  const response = NextResponse.json(data)
  response.headers.set('Cache-Control', 'public, max-age=60')
  return response
}
```

## 🔐 **Security Hardening**

### **Production Security Checklist**

- [ ] HTTPS enforced (Railway provides automatically)
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] API rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive data
- [ ] JWT tokens have appropriate expiration
- [ ] Encryption keys are strong and unique

### **Security Headers**

```javascript
// middleware.js
export function middleware(request) {
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  return response
}
```

## 📞 **Support and Maintenance**

### **Monitoring Alerts**

Set up monitoring for:
- Application downtime
- High error rates
- Database connection issues
- Performance degradation

### **Backup Strategy**

1. **Database Backups**
   - MongoDB Atlas automatic backups
   - Point-in-time recovery available
   - Regular backup testing

2. **Code Backups**
   - Git repository (GitHub)
   - Multiple branches for safety
   - Tagged releases for versions

## 🎉 **Deployment Success**

Once deployed successfully, your StageOne Wallet will be:

✅ **Live and Accessible** at your Railway URL
✅ **Secure** with HTTPS and encryption
✅ **Scalable** with Railway's infrastructure
✅ **Monitored** with built-in metrics
✅ **Maintainable** with continuous deployment

**Your live application URL**: `https://your-app-name.railway.app`

---

**🚀 Congratulations! Your StageOne Wallet is now live and ready for users!**

*Remember to test all functionality thoroughly and monitor the application for any issues.*