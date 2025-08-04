#!/usr/bin/env node

// Railway deployment setup script
const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up Railway deployment...");

// Ensure environment variables are set for build
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET", "ENCRYPTION_SECRET"];

// Check if we're in Railway environment
const isRailway =
  process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID;

if (isRailway) {
  console.log("✅ Railway environment detected");

  // Set default values for missing environment variables during build
  if (!process.env.MONGODB_URI) {
    process.env.MONGODB_URI = "mongodb://localhost:27017/stageone_wallet";
    console.log("⚠️  Using default MongoDB URI for build");
  }

  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = "railway-build-jwt-secret";
    console.log("⚠️  Using default JWT secret for build");
  }

  if (!process.env.ENCRYPTION_SECRET) {
    process.env.ENCRYPTION_SECRET = "railway-build-encryption-secret";
    console.log("⚠️  Using default encryption secret for build");
  }

  // Set NODE_ENV to production for Railway
  process.env.NODE_ENV = "production";
  console.log("✅ Environment set to production");
} else {
  console.log("🔧 Local development environment");

  // For local development, use local database
  if (!process.env.USE_LOCAL_DB) {
    process.env.USE_LOCAL_DB = "true";
    console.log("✅ Using local database for development");
  }
}

// Create necessary directories
const dirs = ["scripts", ".next"];
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

console.log("✅ Railway setup complete!");
