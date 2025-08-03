import Link from 'next/link'
import { ArrowLeft, Shield, Zap, CreditCard, Users, BarChart3, Lock } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-2xl font-bold text-blue-600">StageOne Wallet Demo</div>
            <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Demo Introduction */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Experience StageOne Wallet
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our secure wallet system with advanced features designed for modern digital payments.
            See how we handle encryption, transactions, and user experience.
          </p>
        </div>

        {/* Demo Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AES Encryption</h3>
            <p className="text-gray-600 mb-4">
              All wallet balances and sensitive data are encrypted using AES-256 encryption before storage.
            </p>
            <div className="bg-gray-50 p-3 rounded text-sm font-mono">
              balance: "U2FsdGVkX1+..."
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Zap className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Recharge</h3>
            <p className="text-gray-600 mb-4">
              Mock payment gateway integration with real-time balance updates and transaction logging.
            </p>
            <div className="bg-green-50 p-3 rounded text-sm">
              ✓ Payment processed in &lt;2 seconds
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <CreditCard className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Features</h3>
            <p className="text-gray-600 mb-4">
              Premium users get overdraft facility, allowing payments even with zero balance.
            </p>
            <div className="bg-purple-50 p-3 rounded text-sm">
              💳 Overdraft limit: ₹5,000
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Users className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Management</h3>
            <p className="text-gray-600 mb-4">
              Secure JWT-based authentication with bcrypt password hashing and session management.
            </p>
            <div className="bg-orange-50 p-3 rounded text-sm">
              🔐 JWT + bcrypt security
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <BarChart3 className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
            <p className="text-gray-600 mb-4">
              Complete audit trail of all wallet operations with real-time updates and filtering.
            </p>
            <div className="bg-red-50 p-3 rounded text-sm">
              📊 Real-time transaction logs
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Lock className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Database Security</h3>
            <p className="text-gray-600 mb-4">
              MongoDB transactions ensure atomicity and consistency for all wallet operations.
            </p>
            <div className="bg-indigo-50 p-3 rounded text-sm">
              🛡️ ACID compliance
            </div>
          </div>
        </div>

        {/* Demo Flow */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Demo User Flow</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-sm text-gray-600">Create account with premium option</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Recharge</h3>
              <p className="text-sm text-gray-600">Add funds using mock payment</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Spend</h3>
              <p className="text-sm text-gray-600">Make payments with wallet balance</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Track</h3>
              <p className="text-sm text-gray-600">View transaction history</p>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Frontend Stack</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js 14 with App Router</li>
                <li>• React 18 with Hooks</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Lucide React for icons</li>
                <li>• Responsive mobile-first design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Backend & Security</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js API Routes</li>
                <li>• MongoDB with transactions</li>
                <li>• JWT authentication</li>
                <li>• AES-256 encryption</li>
                <li>• bcrypt password hashing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience StageOne Wallet?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create your account and start using our secure wallet system today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Create Account
            </Link>
            <Link href="/auth/login" className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}