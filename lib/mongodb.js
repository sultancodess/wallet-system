import { MongoClient } from 'mongodb'

// Handle undefined environment variables during build
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stageone_wallet'
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client
let clientPromise

// Only create connection if we have a valid URI
if (uri && uri !== 'mongodb://localhost:27017/stageone_wallet') {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the connection
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, create a new connection
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
} else {
  // Fallback for build time when env vars might not be available
  clientPromise = Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: () => Promise.resolve(null),
        find: () => ({ toArray: () => Promise.resolve([]) }),
        insertOne: () => Promise.resolve({ insertedId: 'mock' }),
        updateOne: () => Promise.resolve({ modifiedCount: 1 }),
        countDocuments: () => Promise.resolve(0)
      }),
      admin: () => ({
        ping: () => Promise.resolve(true)
      }),
      stats: () => Promise.resolve({ collections: 0, dataSize: 0 })
    })
  })
}

export default clientPromise