import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { getAuthUser } from '@/lib/auth'
import { encryptBalance, decryptBalance } from '@/lib/encryption'

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

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: 'Invalid amount' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('stageone_wallet')

    // Start a session for transaction
    const session = client.startSession()

    try {
      await session.withTransaction(async () => {
        // Get current wallet
        const wallet = await db.collection('wallets').findOne(
          { userId: new ObjectId(user.userId) },
          { session }
        )

        if (!wallet) {
          throw new Error('Wallet not found')
        }

        // Decrypt current balances
        const currentBalance = decryptBalance(wallet.balance)
        const currentTotalCredited = decryptBalance(wallet.totalCredited)

        // Calculate new balances
        const newBalance = currentBalance + amount
        const newTotalCredited = currentTotalCredited + amount

        // Update wallet
        await db.collection('wallets').updateOne(
          { userId: new ObjectId(user.userId) },
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
        await db.collection('transactions').insertOne({
          userId: new ObjectId(user.userId),
          type: 'credit',
          amount: amount,
          description: 'Wallet Recharge',
          balanceAfter: newBalance,
          createdAt: new Date()
        }, { session })
      })

      return NextResponse.json({
        message: 'Wallet recharged successfully',
        amount: amount
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