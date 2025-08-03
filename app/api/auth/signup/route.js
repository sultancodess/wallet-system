import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { hashPassword, generateToken } from '@/lib/auth'
import { encryptBalance } from '@/lib/encryption'

export async function POST(request) {
  try {
    const { name, email, password, isPremium } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('stageone_wallet')

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = {
      name,
      email,
      password: hashedPassword,
      isPremium: isPremium || false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('users').insertOne(user)
    const userId = result.insertedId

    // Create wallet for user
    const wallet = {
      userId: userId,
      balance: encryptBalance(0),
      lastRechargeDate: null,
      totalCredited: encryptBalance(0),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await db.collection('wallets').insertOne(wallet)

    // Generate JWT token
    const token = generateToken({
      userId: userId.toString(),
      email,
      name,
      isPremium: isPremium || false
    })

    return NextResponse.json({
      message: 'User created successfully',
      token,
      user: {
        id: userId,
        name,
        email,
        isPremium: isPremium || false
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}