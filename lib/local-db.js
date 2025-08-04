// Simple file-based database for development
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'local-db.json')

// Initialize database file if it doesn't exist
function initDB() {
  if (!fs.existsSync(dbPath)) {
    const initialData = {
      users: [],
      wallets: [],
      transactions: []
    }
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2))
  }
}

// Read database
function readDB() {
  initDB()
  const data = fs.readFileSync(dbPath, 'utf8')
  return JSON.parse(data)
}

// Write database
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

// Generate mock ObjectId
function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

// Mock MongoDB client for local development
export const localClient = {
  db: (name) => ({
    collection: (collectionName) => ({
      findOne: async (query) => {
        const db = readDB()
        const collection = db[collectionName] || []
        
        if (query._id) {
          return collection.find(item => item._id === query._id) || null
        }
        if (query.email) {
          return collection.find(item => item.email === query.email) || null
        }
        if (query.userId) {
          return collection.find(item => item.userId === query.userId) || null
        }
        
        return collection[0] || null
      },
      
      find: (query) => ({
        toArray: async () => {
          const db = readDB()
          const collection = db[collectionName] || []
          
          if (query.userId) {
            return collection.filter(item => item.userId === query.userId)
          }
          
          return collection
        },
        sort: () => ({
          limit: (num) => ({
            toArray: async () => {
              const db = readDB()
              const collection = db[collectionName] || []
              return collection.slice(0, num)
            }
          })
        })
      }),
      
      insertOne: async (document) => {
        const db = readDB()
        if (!db[collectionName]) db[collectionName] = []
        
        const newDoc = {
          ...document,
          _id: generateId()
        }
        
        db[collectionName].push(newDoc)
        writeDB(db)
        
        return { insertedId: newDoc._id }
      },
      
      updateOne: async (query, update) => {
        const db = readDB()
        const collection = db[collectionName] || []
        
        let updated = false
        for (let i = 0; i < collection.length; i++) {
          if (
            (query._id && collection[i]._id === query._id) ||
            (query.userId && collection[i].userId === query.userId) ||
            (query.email && collection[i].email === query.email)
          ) {
            if (update.$set) {
              Object.assign(collection[i], update.$set)
            }
            updated = true
            break
          }
        }
        
        if (updated) {
          writeDB(db)
        }
        
        return { modifiedCount: updated ? 1 : 0 }
      },
      
      countDocuments: async () => {
        const db = readDB()
        const collection = db[collectionName] || []
        return collection.length
      }
    }),
    
    admin: () => ({
      ping: async () => ({ ok: 1 })
    }),
    
    stats: async () => ({
      collections: 3,
      dataSize: fs.statSync(dbPath).size
    })
  }),
  
  startSession: () => ({
    withTransaction: async (fn) => await fn(),
    endSession: async () => {}
  })
}

export default Promise.resolve(localClient)