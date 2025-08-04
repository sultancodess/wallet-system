import { MongoClient } from 'mongodb'

// Handle undefined environment variables during build
const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  // SSL/TLS options for MongoDB Atlas
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
}

let client
let clientPromise

// Check if we're in a build environment or if MongoDB URI is missing
const isBuildTime = !uri || uri === '' || process.env.NODE_ENV === 'build'

if (isBuildTime) {
  // Mock client for build time
  clientPromise = Promise.resolve({
    db: (name) => ({
      collection: (collectionName) => ({
        findOne: () => Promise.resolve(null),
        find: () => ({ 
          toArray: () => Promise.resolve([]),
          sort: () => ({ 
            limit: () => ({ toArray: () => Promise.resolve([]) })
          })
        }),
        insertOne: () => Promise.resolve({ insertedId: 'mock-id' }),
        updateOne: () => Promise.resolve({ modifiedCount: 1 }),
        countDocuments: () => Promise.resolve(0)
      }),
      admin: () => ({
        ping: () => Promise.resolve({ ok: 1 })
      }),
      stats: () => Promise.resolve({ collections: 0, dataSize: 0 })
    }),
    startSession: () => ({
      withTransaction: async (fn) => await fn(),
      endSession: () => Promise.resolve()
    })
  })
} else {
  // Real MongoDB connection for runtime
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
}

export default clientPromise