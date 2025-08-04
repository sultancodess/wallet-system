import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb.js'
import { getAuthUser } from '../../../lib/auth.js'
import { isValidUserId, createUserIdQuery } from '../../../lib/db-utils.js'

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

    // Validate user ID format
    if (!isValidUserId(user.userId)) {
      return NextResponse.json(
        { message: 'Invalid user ID format' },
        { status: 400 }
      )
    }

    // Get transactions for the user
    const transactions = await db.collection('transactions')
      .find(createUserIdQuery(user.userId, 'userId'))
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