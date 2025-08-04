# Wallet System

A secure digital wallet system with encrypted balance storage, instant transactions, and premium features.

## Features

- **Secure Auth**: JWT + bcrypt password hashing
- **Encrypted Storage**: AES-256 encryption for wallet data
- **Instant Transactions**: Real-time balance updates
- **Premium Overdraft**: Up to ₹5,000 for premium users
- **Transaction History**: Complete audit trail
- **Local Database**: File-based fallback for development

## Tech Stack

**Frontend:** Next.js 14, React 18, Tailwind CSS  
**Backend:** MongoDB, JWT, bcryptjs, crypto-js

## Quick Start

```bash
# Install
git clone <repo-url>
cd wallet-system
npm install

# Run
npm run dev
```

Open `http://localhost:3000`

## Environment (Optional)

Create `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/wallet_system
JWT_SECRET=your-secret
ENCRYPTION_SECRET=your-secret
USE_LOCAL_DB=true
```

## Usage

1. **Sign Up** → Create account (Basic free / Premium ₹99/month)
2. **Add Money** → Recharge wallet (₹1 - ₹1,00,000)
3. **Send Money** → Make payments
4. **View History** → Track transactions

## API Endpoints

```bash
POST /api/auth/signup    # Register
POST /api/auth/login     # Login
GET  /api/wallet         # Get wallet info
POST /api/wallet/recharge # Add money
POST /api/wallet/pay     # Send money
GET  /api/transactions   # Get history
```

## Security

- AES-256 encrypted wallet balances
- JWT authentication with 7-day expiry
- bcrypt password hashing (12 rounds)
- MongoDB transactions for atomicity
- Security headers middleware

## Deployment

**Vercel (Recommended):**
1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ENCRYPTION_SECRET=your-encryption-secret
   NODE_ENV=production
   USE_LOCAL_DB=false
   ```
3. Deploy automatically

**Railway.app:**
1. Connect GitHub repo → Auto-deploys with local database
2. Optional: Set `JWT_SECRET` and `ENCRYPTION_SECRET` 
3. Ready to use immediately

**Manual:**
```bash
npm run build
npm start
```

## Scripts

```bash
npm run dev     # Development server
npm run build   # Production build
npm start       # Production server
npm run lint    # ESLint
```

---

**Wallet System** - Secure. Fast. Reliable.