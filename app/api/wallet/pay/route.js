import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '../../../../lib/mongodb.js'
import { getAuthUser } from '../../../../lib/auth.js'
import { encryptBalance, decryptBalance } from '../../../../lib/encryption.js'
import { validateAmount, sanitizeInput } from '@/lib/validation'

export async function POST(request) {
  try {
    const user = getAuthUser(request)
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { amount, description } = await request.json()

    if (!validateAmount(amount)) {
      return NextResponse.json(
        { message: 'Amount must be between ₹1 and ₹1,00,000' },
        { status: 400 }
      )
    }

    const paymentAmount = parseFloat(amount)
    const sanitizedDescription = sanitizeInput(description) || 'Payment'

    const client = await clientPromise
    const db = client.db('stageone_wallet')

    // Get user details to check premium status
    const userDetails = await db.collection('users').findOne({
      _id: new ObjectId(user.userId)
    })

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

        // Decrypt current balance
        const currentBalance = decryptBalance(wallet.balance)

        // Check if user has sufficient balance or is premium
        if (currentBalance < paymentAmount && !userDetails.isPremium) {
          throw new Error('Insufficient balance')
        }

        // Calculate new balance
        const newBalance = currentBalance - paymentAmount

        // Update wallet
        await db.collection('wallets').updateOne(
          { userId: new ObjectId(user.userId) },
          {
            $set: {
              balance: encryptBalance(newBalance),
              updatedAt: new Date()
            }
          },
          { session }
        )

        // Create transaction record
        await db.collection('transactions').insertOne({
          userId: new ObjectId(user.userId),
          type: 'debit',
          amount: paymentAmount,
          description: sanitizedDescription,
          balanceAfter: newBalance,
          createdAt: new Date()
        }, { session })
      })

      return NextResponse.json({
        message: 'Payment successful',
        amount: paymentAmount
      })

    } catch (error) {
      if (error.message === 'Insufficient balance') {
        return NextResponse.json(
          { message: 'Insufficient balance. Upgrade to Premium for overdraft facility.' },
          { status: 400 }
        )
      }
      throw error
    } finally {
      await session.endSession()
    }

  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}