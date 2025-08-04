// Temporary local database setup for development
const fs = require('fs')

console.log('🔧 Setting up local database alternative...')

// Create a simple file-based storage for development
const dbPath = './local-db.json'

const initialData = {
  users: [],
  wallets: [],
  transactions: []
}

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2))
  console.log('✅ Local database file created')
}

// Update .env.local to use local database
const envContent = `# Local Development - File-based Database
MONGODB_URI=file://./local-db.json
JWT_SECRET=yfghjfghdfgjdfgjdghj
ENCRYPTION_SECRET=yyfghjfghdfgjdfgjdghj
NEXTAUTH_URL=http://localhost:3000
USE_LOCAL_DB=true
`

fs.writeFileSync('.env.local', envContent)
console.log('✅ Environment configured for local database')
console.log('🎉 You can now run npm run dev without MongoDB Atlas!')
console.log('📝 Note: This is a temporary solution for development only')