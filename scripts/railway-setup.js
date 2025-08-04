// Railway deployment setup script
const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up StageOne Wallet for Railway deployment...')

// Check if required environment variables are set
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET', 
  'ENCRYPTION_SECRET'
]

const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  console.warn('⚠️  Warning: Missing environment variables:', missingVars.join(', '))
  console.log('📝 Please set these in your Railway dashboard:')
  missingVars.forEach(varName => {
    console.log(`   ${varName}=your-${varName.toLowerCase().replace('_', '-')}-here`)
  })
} else {
  console.log('✅ All required environment variables are set!')
}

// Verify MongoDB connection string format
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    console.error('❌ Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://')
    process.exit(1)
  }
  console.log('✅ MongoDB URI format is valid')
}

console.log('🎉 Railway setup complete!')