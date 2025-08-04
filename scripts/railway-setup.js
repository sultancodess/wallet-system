// Railway deployment setup script
const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up StageOne Wallet for Railway deployment...");

// Set dummy environment variables for build if they don't exist
const requiredEnvVars = {
  MONGODB_URI: "mongodb://localhost:27017/stageone_wallet_build",
  JWT_SECRET: "build-time-jwt-secret-placeholder-minimum-32-characters",
  ENCRYPTION_SECRET:
    "build-time-encryption-secret-placeholder-minimum-32-characters",
};

let hasRealEnvVars = true;

Object.entries(requiredEnvVars).forEach(([varName, defaultValue]) => {
  if (!process.env[varName]) {
    console.log(`⚠️  Setting build-time placeholder for ${varName}`);
    process.env[varName] = defaultValue;
    hasRealEnvVars = false;
  }
});

if (hasRealEnvVars) {
  console.log("✅ All required environment variables are set!");

  // Verify MongoDB connection string format
  const uri = process.env.MONGODB_URI;
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    console.error(
      "❌ Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://"
    );
    process.exit(1);
  }
  console.log("✅ MongoDB URI format is valid");
} else {
  console.log(
    "📝 Using build-time placeholders. Make sure to set real values in Railway dashboard:"
  );
  console.log("   MONGODB_URI=your-mongodb-connection-string");
  console.log("   JWT_SECRET=your-jwt-secret-here");
  console.log("   ENCRYPTION_SECRET=your-encryption-secret-here");
}

console.log("🎉 Railway setup complete!");
