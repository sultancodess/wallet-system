import { ObjectId } from 'mongodb'

// Check if we're using local database
export function isUsingLocalDB() {
  const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID
  const uri = process.env.MONGODB_URI
  
  return (
    process.env.USE_LOCAL_DB === "true" || 
    !uri || 
    uri.includes("file://") || 
    uri.includes("localhost") ||
    isRailway
  )
}

// Validate user ID format
export function isValidUserId(userId) {
  if (!userId) return false
  
  if (isUsingLocalDB()) {
    // Local DB uses 9-character strings
    return typeof userId === 'string' && userId.length >= 6
  } else {
    // MongoDB uses 24-character hex strings
    return typeof userId === 'string' && userId.length === 24 && /^[0-9a-fA-F]{24}$/.test(userId)
  }
}

// Create proper query for user ID
export function createUserIdQuery(userId, field = '_id') {
  if (isUsingLocalDB()) {
    return { [field]: userId }
  } else {
    try {
      return { [field]: new ObjectId(userId) }
    } catch (error) {
      // If ObjectId creation fails, treat as string
      return { [field]: userId }
    }
  }
}

// Create proper user ID for database operations
export function createUserId(userId) {
  if (isUsingLocalDB()) {
    return userId
  } else {
    try {
      return new ObjectId(userId)
    } catch (error) {
      // If ObjectId creation fails, return as string
      return userId
    }
  }
}