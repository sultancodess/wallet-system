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

    const { amount, description } = await request.json()

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

    const paymentAmount = parseFloat(amount)
    const sanitizedDescription = (description || 'Payment').trim()

    const client = await clientPromise
    const db = client.db('stageone_wallet')

    // Get user details to check premium status (handle both ObjectId and string formats)
    const userQuery = user.userId.length === 24 
      ? { _id: new ObjectId(user.userId) }
      : { _id: user.userId }
    
    const userDetails = await db.collection('users').findOne(userQuery)

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

        // Decrypt current balance
        const currentBalance = decryptBalance(wallet.balance)

        // Check if user has sufficient balance or is premium
        if (currentBalance < paymentAmount && !userDetails.isPremium) {
          throw new Error('Insufficient balance')
        }

        // Calculate new balance
        const newBalance = currentBalance - paymentAmount

        // Update wallet
        const updateQuery = user.userId.length === 24
          ? { userId: new ObjectId(user.userId) }
          : { userId: user.userId }
        
        await db.collection('wallets').updateOne(
          updateQuery,
          {
            $set: {
              balance: encryptBalance(newBalance),
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