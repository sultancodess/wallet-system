# StageOne Wallet - Secure Digital Wallet System

A modern, secure wallet system built with Next.js, MongoDB, and advanced encryption for seamless digital payments. This project demonstrates enterprise-grade fintech architecture with real-world security practices.

## 🎯 **Project Overview**

This is a comprehensive wallet system built for the StageOne internship challenge, showcasing:
- **Product Thinking**: End-to-end user experience design
- **Technical Excellence**: Scalable architecture with security best practices
- **Real-world Application**: Features similar to Paytm, Amazon Pay, and other fintech platforms

## 🚀 **Core Features**

### **💰 Wallet Management**
- **Secure Recharge**: Mock payment system with real-world gateway research
- **Balance Display**: Real-time encrypted balance with hide/show functionality
- **Transaction History**: Complete audit trail with filtering and export
- **Premium Overdraft**: Credit facility for premium users

### **🔐 Security Features**
- **AES-256 Encryption**: All sensitive data encrypted at rest
- **JWT Authentication**: Secure token-based authentication
- **bcrypt Hashing**: Password security with salt rounds
- **Input Validation**: Comprehensive data sanitization

### **🎨 Modern UI/UX**
- **Glassmorphism Design**: Modern backdrop blur effects
- **Flaticon Integration**: Professional icons throughout
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Micro-interactions and transitions

### **⚡ Performance & Scalability**
- **MongoDB Transactions**: ACID compliance for financial operations
- **Connection Pooling**: Optimized database connections
- **Error Handling**: Comprehensive error management
- **Loading States**: Enhanced user feedback

## 🛠 **Tech Stack**

### **Frontend**
- **Next.js 14** (App Router) - React framework with SSR/CSR
- **React 18** - Modern React with hooks and concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Flaticon** - Professional icon integration

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB Atlas** - Cloud database with transactions
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **crypto-js** - AES encryption library

### **DevOps & Deployment**
- **Railway.app** - Cloud deployment platform
- **Git** - Version control
- **Environment Variables** - Secure configuration management

## 📋 **Prerequisites**

- **Node.js 18+** 
- **MongoDB Atlas Account**
- **Railway.app Account** (for deployment)
- **npm or yarn** package manager

## 🔧 **Installation & Setup**

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/stageone-wallet.git
cd stageone-wallet
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Configuration**

Copy the example environment file:
```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stageone_wallet?retryWrites=true&w=majority

# Security Keys (Generate secure random strings)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
ENCRYPTION_SECRET=your-super-secret-encryption-key-minimum-32-characters

# Application Settings
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
```

### **4. Database Setup**

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database named `stageone_wallet`
4. Get your connection string and update `MONGODB_URI`

### **5. Run Development Server**
```bash
npm run dev
```

### **6. Access Application**
Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 **Deployment Guide**

### **Railway.app Deployment**

1. **Connect Repository**
   - Fork this repository
   - Connect your GitHub account to Railway
   - Import the project

2. **Environment Variables**
   Set the following in Railway dashboard:
   ```
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   ENCRYPTION_SECRET=your-production-encryption-secret
   NODE_ENV=production
   ```

3. **Deploy**
   - Railway will automatically build and deploy
   - Your app will be available at `https://your-app.railway.app`

### **Manual Deployment**
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🏗 **Project Structure**

```
stageone-wallet/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── wallet/               # Wallet operations
│   │   └── transactions/         # Transaction history
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Main dashboard
│   ├── demo/                     # Demo showcase
│   ├── globals.css               # Global styles
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Landing page
├── lib/                          # Utility libraries
│   ├── mongodb.js                # Database connection
│   ├── auth.js                   # Authentication utilities
│   ├── encryption.js             # Encryption functions
│   └── validation.js             # Input validation
├── public/                       # Static assets
├── .env.example                  # Environment template
├── railway.json                  # Railway deployment config
├── RESEARCH_REPORT.md            # Comprehensive research
├── sultan_prem.md                # Technical glossary
└── README.md                     # This file
```

## 🔐 **Security Implementation**

### **Data Encryption**
- **AES-256**: Wallet balances encrypted before database storage
- **Key Management**: Environment-based encryption keys
- **Selective Encryption**: Only sensitive fields encrypted for performance

### **Authentication Security**
- **JWT Tokens**: Secure, stateless authentication
- **bcrypt Hashing**: Password security with 12 salt rounds
- **Token Expiration**: 7-day token lifecycle

### **API Security**
- **Input Validation**: All endpoints validate and sanitize input
- **Authorization**: Protected routes require valid JWT tokens
- **Error Handling**: Secure error messages without data exposure

## 📊 **Database Schema**

### **Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (bcrypt hashed),
  isPremium: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **Wallets Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  balance: String (AES encrypted),
  totalCredited: String (AES encrypted),
  lastRechargeDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### **Transactions Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  type: String, // 'credit' | 'debit'
  amount: Number,
  description: String,
  balanceAfter: Number,
  createdAt: Date (indexed)
}
```

## 🧪 **Testing**

### **Manual Testing Checklist**
- [ ] User registration and login
- [ ] Wallet balance display and encryption
- [ ] Money recharge functionality
- [ ] Payment processing with balance validation
- [ ] Premium user overdraft
- [ ] Transaction history and filtering
- [ ] Responsive design on mobile/desktop
- [ ] Error handling and edge cases

### **API Testing**
```bash
# Test wallet recharge
curl -X POST http://localhost:3000/api/wallet/recharge \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000}'

# Test payment
curl -X POST http://localhost:3000/api/wallet/pay \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 500, "description": "Test Payment"}'
```

## 📈 **Performance Optimizations**

- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connection management
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Browser caching for static assets

## 🔄 **Future Enhancements**

### **Short-term (Next Sprint)**
- Real payment gateway integration (Razorpay/Stripe)
- Two-factor authentication (2FA)
- Email notifications for transactions
- Advanced transaction filtering

### **Medium-term (Next Quarter)**
- Mobile application (React Native)
- Multi-currency support
- Merchant payment integration
- Advanced analytics dashboard

### **Long-term (Next Year)**
- Microservices architecture
- Machine learning fraud detection
- International payment support
- White-label solution

## 📚 **Documentation**

- **[Research Report](RESEARCH_REPORT.md)** - Comprehensive technical research
- **[Technical Glossary](sultan_prem.md)** - Complete technology reference
- **[API Documentation](#)** - Detailed API endpoint documentation

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **StageOne Team** - For the challenging and comprehensive internship task
- **Next.js Team** - For the excellent React framework
- **MongoDB** - For the flexible and scalable database
- **Flaticon** - For the professional icon library
- **Railway** - For the seamless deployment platform

## 📞 **Support**

For support, questions, or feedback:
- **Email**: your-email@example.com
- **GitHub Issues**: [Create an issue](https://github.com/your-username/stageone-wallet/issues)
- **Documentation**: Check the research report and technical glossary

---

**Built with ❤️ for StageOne Internship Challenge 2025**

*This project demonstrates modern fintech architecture, security best practices, and production-ready code quality suitable for high-traffic financial applications.*

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