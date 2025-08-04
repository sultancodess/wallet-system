import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb.js'
import { getAuthUser } from '../../../lib/auth.js'
import { decryptBalance } from '../../../lib/encryption.js'
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
    const db = client.db('wallet_system')

    // Validate user ID format
    if (!isValidUserId(user.userId)) {
      return NextResponse.json(
        { message: 'Invalid user ID format' },
        { status: 400 }
      )
    }

    // Get user details
    const userDetails = await db.collection('users').findOne(
      createUserIdQuery(user.userId),
      { projection: { password: 0 } }
    )

    // Get wallet details
    const wallet = await db.collection('wallets').findOne(
      createUserIdQuery(user.userId, 'userId')
    )

    if (!wallet) {
      return NextResponse.json(
        { message: 'Wallet not found' },
        { status: 404 }
      )
    }

    // Decrypt wallet data
    const decryptedWallet = {
      ...wallet,
      balance: decryptBalance(wallet.balance),
      totalCredited: decryptBalance(wallet.totalCredited)
    }

    return NextResponse.json({
      user: {
        id: userDetails._id,
        name: userDetails.name,
        email: userDetails.email,
        isPremium: userDetails.isPremium
      },
      wallet: decryptedWallet
    })

  } catch (error) {
    console.error('Wallet fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}