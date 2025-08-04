import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb.js'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('stageone_wallet')
    
    // Get collection stats
    const [usersCount, walletsCount, transactionsCount] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('wallets').countDocuments(),
      db.collection('transactions').countDocuments()
    ])
    
    // Get recent activity (last 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentTransactions = await db.collection('transactions').countDocuments({
      createdAt: { $gte: yesterday }
    })
    
    return NextResponse.json({
      status: 'operational',
      timestamp: new Date().toISOString(),
      system: {
        name: 'StageOne Wallet API',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
      },
      database: {
        status: 'connected',
        collections: {
          users: usersCount,
          wallets: walletsCount,
          transactions: transactionsCount
        }
      },
      metrics: {
        recentTransactions24h: recentTransactions,
        totalUsers: usersCount,
        totalWallets: walletsCount
      },
      endpoints: {
        authentication: '/api/auth/*',
        wallet: '/api/wallet/*',
        transactions: '/api/transactions',
        health: '/api/health',
        status: '/api/status'
      }
    })
  } catch (error) {
    console.error('Status check failed:', error)
    
    return NextResponse.json({
      status: 'degraded',
      timestamp: new Date().toISOString(),
      error: {
        message: 'Unable to fetch system status',
        type: error.name
      }
    }, { status: 500 })
  }
}