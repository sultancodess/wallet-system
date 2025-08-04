import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb.js'
import { getAuthUser } from '../../../lib/auth.js'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const user = getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const db = client.db('stageone_wallet')

    // Validate user ID format (supports both MongoDB ObjectId and local DB format)
    if (!user.userId || (user.userId.length !== 24 && user.userId.length !== 9)) {
      return NextResponse.json(
        { message: 'Invalid user ID format' },
        { status: 400 }
      )
    }

    // Get transactions for the user (handle both ObjectId and string formats)
    const transactionQuery = user.userId.length === 24
      ? { userId: new ObjectId(user.userId) }
      : { userId: user.userId }
    
    const transactions = await db.collection('transactions')
      .find(transactionQuery)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json({
      transactions: transactions
    })

  } catch (error) {
    console.error('Transactions fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}