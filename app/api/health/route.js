import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb.js'
import { isUsingLocalDB } from '../../../lib/db-utils.js'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check environment variables
    const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID
    const isVercel = process.env.VERCEL || process.env.VERCEL_ENV
    const usingLocalDB = isUsingLocalDB()
    
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      RAILWAY: !!isRailway,
      VERCEL: !!isVercel,
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
      ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET ? 'Set' : 'Not set',
      USE_LOCAL_DB: process.env.USE_LOCAL_DB,
      USING_LOCAL_DB: usingLocalDB,
    }

    // Test database connection
    const client = await clientPromise
    const db = client.db('wallet_system')
    
    // Test database ping (different for local vs MongoDB)
    if (usingLocalDB) {
      // For local database, just test if we can access it
      await db.collection('users').countDocuments()
    } else {
      // For MongoDB, use admin ping
      await db.admin().ping()
    }
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      database: usingLocalDB ? 'local-db' : 'mongodb',
      message: 'All systems operational'
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        RAILWAY: !!(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID),
        VERCEL: !!(process.env.VERCEL || process.env.VERCEL_ENV),
        MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
        JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
        ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET ? 'Set' : 'Not set',
        USE_LOCAL_DB: process.env.USE_LOCAL_DB,
        USING_LOCAL_DB: isUsingLocalDB(),
      }
    }, { status: 500 })
  }
}