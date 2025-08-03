import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb.js'
import { hashPassword, generateToken } from '../../../../lib/auth.js'
import { encryptBalance } from '../../../../lib/encryption.js'
import { validateEmail, validatePassword, validateName, sanitizeInput } from '@/lib/validation'

export async function POST(request) {
  try {
    const { name, email, password, isPremium } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email.toLowerCase())

    // Validate inputs
    if (!validateName(sanitizedName)) {
      return NextResponse.json(
        { message: 'Name must be between 2-50 characters' },
        { status: 400 }
      )
    }

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters with uppercase, lowercase, and number' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('stageone_wallet')

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: sanitizedEmail })
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
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
      isPremium: Boolean(isPremium),
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
      email: sanitizedEmail,
      name: sanitizedName,
      isPremium: Boolean(isPremium)
    })

    return NextResponse.json({
      message: 'User created successfully',
      token,
      user: {
        id: userId,
        name: sanitizedName,
        email: sanitizedEmail,
        isPremium: Boolean(isPremium)
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