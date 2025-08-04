# 🚀 Railway Deployment Fix Guide

## 🔧 **Issues Fixed**

### **1. Next.js Configuration Error**
**Problem**: Invalid next.config.js with deprecated `experimental.appDir`
**Solution**: Updated configuration to remove deprecated options

### **2. Environment Variables Missing During Build**
**Problem**: MongoDB connection fails during build because env vars not available
**Solution**: Added fallback handling in MongoDB connection

### **3. Build Process Optimization**
**Problem**: Build failing due to missing environment validation
**Solution**: Added pre-build setup script

## 📋 **Railway Deployment Steps**

### **Step 1: Set Environment Variables in Railway**

Go to your Railway project dashboard and set these variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stageone_wallet?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters-long
ENCRYPTION_SECRET=your-super-secure-encryption-key-minimum-32-characters-long
NODE_ENV=production
```

### **Step 2: MongoDB Atlas Setup**

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster

2. **Configure Network Access**
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - This is required for Railway to connect

3. **Create Database User**
   - Go to Database Access
   - Create user with read/write permissions
   - Note username and password

4. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your actual password

### **Step 3: Deploy to Railway**

1. **Push Latest Changes**
   ```bash
   git add .
   git commit -m "Fix Railway deployment issues"
   git push origin main
   ```

2. **Railway Auto-Deploy**
   - Railway will automatically detect changes
   - Build process will now work correctly
   - Check deployment logs for any issues

### **Step 4: Verify Deployment**

1. **Check Health Endpoint**
   ```bash
   curl https://your-app.railway.app/api/health
   ```

2. **Test Core Functionality**
   - Visit your Railway URL
   - Try user registration
   - Test wallet operations

## 🔍 **Troubleshooting**

### **If Build Still Fails**

1. **Check Environment Variables**
   ```bash
   # In Railway dashboard, verify all env vars are set
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret
   ENCRYPTION_SECRET=your-encryption-key
   ```

2. **Check MongoDB Connection**
   - Verify connection string format
   - Test connection from MongoDB Compass
   - Ensure network access allows Railway IPs

3. **Check Build Logs**
   - Look for specific error messages
   - Verify all dependencies installed
   - Check for syntax errors

### **Common Error Solutions**

**Error**: `Cannot read properties of undefined (reading 'startsWith')`
**Solution**: Ensure MONGODB_URI is set in Railway environment variables

**Error**: `Invalid next.config.js options detected`
**Solution**: Already fixed in updated next.config.js

**Error**: `Build timeout`
**Solution**: Increase build timeout in railway.json (already set to 300s)

## 📝 **Environment Variables Template**

Copy this template and fill in your values:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/stageone_wallet?retryWrites=true&w=majority

# JWT Secret (Generate a random 32+ character string)
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long-random-string

# Encryption Secret (Generate a different random 32+ character string)  
ENCRYPTION_SECRET=your-super-secure-encryption-key-minimum-32-characters-long-different-string

# Environment
NODE_ENV=production
```

## 🎯 **Generate Secure Secrets**

Use these commands to generate secure secrets:

```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate Encryption Secret  
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## ✅ **Deployment Checklist**

- [ ] MongoDB Atlas cluster created and configured
- [ ] Network access set to 0.0.0.0/0
- [ ] Database user created with read/write permissions
- [ ] Connection string tested locally
- [ ] All environment variables set in Railway
- [ ] Latest code pushed to GitHub
- [ ] Railway deployment triggered
- [ ] Health endpoint responding
- [ ] Core functionality tested

## 🚀 **Expected Result**

After following these steps, your Railway deployment should:

1. ✅ Build successfully without errors
2. ✅ Connect to MongoDB Atlas
3. ✅ Serve the application at your Railway URL
4. ✅ Handle user registration and login
5. ✅ Process wallet operations correctly

## 📞 **Still Having Issues?**

If you're still experiencing problems:

1. **Check Railway Logs**
   - Go to Railway dashboard
   - Click on your service
   - Check "Deployments" tab for build logs

2. **Verify Environment Variables**
   - Ensure no typos in variable names
   - Check for extra spaces or characters
   - Verify MongoDB URI format

3. **Test Locally First**
   ```bash
   # Set environment variables locally
   export MONGODB_URI="your-connection-string"
   export JWT_SECRET="your-jwt-secret"
   export ENCRYPTION_SECRET="your-encryption-secret"
   
   # Test build locally
   npm run build
   npm start
   ```

Your deployment should now work correctly! 🎉