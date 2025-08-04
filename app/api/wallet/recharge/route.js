import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '../../../../lib/mongodb.js'
import { getAuthUser } from '../../../../lib/auth.js'
import { encryptBalance, decryptBalance } from '../../../../lib/encryption.js'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const user = getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { amount } = await request.json()

    if (!amount || amount <= 0 || amount > 100000) {
      return NextResponse.json(
        { message: 'Amount must be between ₹1 and ₹1,00,000' },
        { status: 400 }
      )
    }

    // Validate user ID format (supports both MongoDB ObjectId and local DB format)
    if (!user.userId || (user.userId.length !== 24 && user.userId.length !== 9)) {
      return NextResponse.json(
        { message: 'Invalid user ID format' },
        { status: 400 }
      )
    }

    const rechargeAmount = parseFloat(amount)

    const client = await clientPromise
    const db = client.db('stageone_wallet')

    // Start a session for transaction
    const session = client.startSession()

    try {
      await session.withTransaction(async () => {
        // Get current wallet (handle both ObjectId and string formats)
        const walletQuery = user.userId.length === 24
          ? { userId: new ObjectId(user.userId) }
          : { userId: user.userId }
        
        const wallet = await db.collection('wallets').findOne(
          walletQuery,
          { session }
        )

        if (!wallet) {
          throw new Error('Wallet not found')
        }

        // Decrypt current balances
        const currentBalance = decryptBalance(wallet.balance)
        const currentTotalCredited = decryptBalance(wallet.totalCredited)

        // Calculate new balances
        const newBalance = currentBalance + rechargeAmount
        const newTotalCredited = currentTotalCredited + rechargeAmount

        // Update wallet
        const updateQuery = user.userId.length === 24
          ? { userId: new ObjectId(user.userId) }
          : { userId: user.userId }
        
        await db.collection('wallets').updateOne(
          updateQuery,
          {
            $set: {
              balance: encryptBalance(newBalance),
              totalCredited: encryptBalance(newTotalCredited),
              lastRechargeDate: new Date(),
              updatedAt: new Date()
            }
          },
          { session }
        )

        // Create transaction record
        const transactionUserId = user.userId.length === 24
          ? new ObjectId(user.userId)
          : user.userId
        
        await db.collection('transactions').insertOne({
          userId: transactionUserId,
          type: 'credit',
          amount: rechargeAmount,
          description: 'Wallet Recharge',
          balanceAfter: newBalance,
          createdAt: new Date()
        }, { session })
      })

      return NextResponse.json({
        message: 'Wallet recharged successfully',
        amount: rechargeAmount
      })

    } finally {
      await session.endSession()
    }

  } catch (error) {
    console.error('Recharge error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}