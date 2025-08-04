import { MongoClient } from "mongodb";
import localClient from "./local-db.js";

// Handle undefined environment variables during build
const uri = process.env.MONGODB_URI;
const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID;
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;
const useLocalDB =
  !isVercel && ( // Never use local DB on Vercel
    isRailway || // Always use local DB on Railway
    process.env.USE_LOCAL_DB === "true" || 
    !uri || 
    uri.includes("file://") || 
    uri.includes("localhost")
  );

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 5000,
  // Simple SSL configuration
  ssl: false,
  tls: false,
};

let client;
let clientPromise;

// Check if we should use local database
if (useLocalDB) {
  console.log("🔧 Using local file-based database for development");
  clientPromise = localClient;
} else if (!uri || uri === "" || process.env.NODE_ENV === "build") {
  // Mock client for build time
  clientPromise = Promise.resolve({
    db: (name) => ({
      collection: (collectionName) => ({
        findOne: () => Promise.resolve(null),
        find: () => ({
          toArray: () => Promise.resolve([]),
          sort: () => ({
            limit: () => ({ toArray: () => Promise.resolve([]) }),
          }),
        }),
        insertOne: () => Promise.resolve({ insertedId: "mock-id" }),
        updateOne: () => Promise.resolve({ modifiedCount: 1 }),
        countDocuments: () => Promise.resolve(0),
      }),
      admin: () => ({
        ping: () => Promise.resolve({ ok: 1 }),
      }),
      stats: () => Promise.resolve({ collections: 0, dataSize: 0 }),
    }),
    startSession: () => ({
      withTransaction: async (fn) => await fn(),
      endSession: () => Promise.resolve(),
    }),
  });
} else {
  // Real MongoDB connection for runtime
  try {
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable to preserve the connection
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().catch((error) => {
          console.error("MongoDB connection failed:", error.message);
          throw error; // Don't use mock client in production
        });
      }
      clientPromise = global._mongoClientPromise;
    } else {
      // In production mode (Vercel), create a new connection
      client = new MongoClient(uri, options);
      clientPromise = client.connect().catch((error) => {
        console.error("Production MongoDB connection failed:", error.message);
        console.error("URI:", uri ? "Set" : "Not set");
        console.error("Environment:", process.env.NODE_ENV);
        throw error; // Don't use mock client in production
      });
    }
  } catch (error) {
    console.error("MongoDB setup failed:", error.message);
    throw error; // Don't use mock client in production
  }
}

export default clientPromise;
