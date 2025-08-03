# StageOne Wallet - Secure Digital Wallet System

A modern, secure wallet system built with Next.js, MongoDB, and advanced encryption for seamless digital payments.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **End-to-End Encryption**: AES encryption for wallet balances and sensitive data
- **Wallet Management**: Recharge, spend, and track wallet transactions
- **Premium Features**: Overdraft facility for premium users
- **Real-time Updates**: Live balance updates and transaction history
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Encryption**: AES encryption using crypto-js
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stageone-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stageone_wallet
   JWT_SECRET=your-super-secret-jwt-key
   ENCRYPTION_SECRET=your-super-secret-encryption-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗 Project Structure

```
stageone-wallet/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   └── signup/route.js
│   │   ├── wallet/
│   │   │   ├── route.js
│   │   │   ├── recharge/route.js
│   │   │   └── pay/route.js
│   │   └── transactions/route.js
│   ├── auth/
│   │   ├── login/page.jsx
│   │   └── signup/page.jsx
│   ├── dashboard/page.jsx
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── lib/
│   ├── mongodb.js
│   ├── auth.js
│   └── encryption.js
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔐 Security Features

### Encryption
- **AES Encryption**: Wallet balances and sensitive data are encrypted before storage
- **Password Hashing**: User passwords are hashed using bcrypt with salt rounds
- **JWT Tokens**: Secure authentication with JSON Web Tokens

### Data Protection
- **Input Validation**: All API endpoints validate input data
- **Authorization**: Protected routes require valid JWT tokens
- **Transaction Atomicity**: Database transactions ensure data consistency

## 💳 Core Features

### User Authentication
- Secure signup and login
- JWT-based session management
- Password encryption with bcrypt

### Wallet Operations
- **Recharge**: Add funds to wallet with mock payment simulation
- **Payment**: Deduct funds for purchases with balance validation
- **Balance Check**: Real-time encrypted balance display
- **Transaction History**: Complete audit trail of all operations

### Premium Features
- **Overdraft Facility**: Premium users can spend beyond available balance
- **Priority Support**: Enhanced user experience for premium accounts

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Wallet Management
- `GET /api/wallet` - Get wallet details
- `POST /api/wallet/recharge` - Recharge wallet
- `POST /api/wallet/pay` - Make payment

### Transactions
- `GET /api/transactions` - Get transaction history

## 🎨 UI Components

### Landing Page
- Hero section with value proposition
- Feature highlights
- Pricing plans
- Call-to-action buttons

### Dashboard
- Wallet overview with encrypted balance
- Quick recharge functionality
- Payment interface
- Transaction history table
- Responsive sidebar navigation

## 🚀 Deployment

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
ENCRYPTION_SECRET=your-production-encryption-secret
```

## 🧪 Testing

### Manual Testing Scenarios
1. **User Registration**: Create new account with premium option
2. **Login Flow**: Authenticate with valid credentials
3. **Wallet Recharge**: Add funds with various amounts
4. **Payment Processing**: Make payments with sufficient/insufficient balance
5. **Premium Features**: Test overdraft for premium users
6. **Transaction History**: Verify all operations are logged

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  isPremium: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Wallets Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  balance: String (encrypted),
  totalCredited: String (encrypted),
  lastRechargeDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Transactions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // 'credit' or 'debit'
  amount: Number,
  description: String,
  balanceAfter: Number,
  createdAt: Date
}
```

## 🔍 Research Insights

### Payment Gateway Integration
- **Razorpay Integration**: Webhook handling for payment confirmation
- **Stripe Integration**: Secure payment processing with SCA compliance
- **Security Best Practices**: PCI DSS compliance considerations

### Scalability Considerations
- **Database Indexing**: Optimized queries for user and transaction data
- **Caching Strategy**: Redis implementation for session management
- **Load Balancing**: Horizontal scaling with multiple server instances

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for StageOne Internship Challenge**