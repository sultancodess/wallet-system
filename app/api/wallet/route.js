import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb.js'
import { getAuthUser } from '../../../lib/auth.js'
import { decryptBalance } from '../../../lib/encryption.js'

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

    // Get user details (handle both ObjectId and string formats)
    const userQuery = user.userId.length === 24 
      ? { _id: new ObjectId(user.userId) }
      : { _id: user.userId }
    
    const userDetails = await db.collection('users').findOne(
      userQuery,
      { projection: { password: 0 } }
    )

    // Get wallet details
    const walletQuery = user.userId.length === 24
      ? { userId: new ObjectId(user.userId) }
      : { userId: user.userId }
    
    const wallet = await db.collection('wallets').findOne(walletQuery)

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