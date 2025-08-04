import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb.js'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Test database connection
    const client = await clientPromise
    const db = client.db('stageone_wallet')
    
    // Ping database
    await db.admin().ping()
    
    // Get basic stats
    const stats = await db.stats()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        collections: stats.collections || 0,
        dataSize: stats.dataSize || 0
      },
      application: {
        name: 'StageOne Wallet',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: {
        message: 'Database connection failed',
        type: error.name
      }
    }, { status: 500 })
  }
}