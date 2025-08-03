import Link from 'next/link'
import { Shield, Zap, CreditCard, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">StageOne Wallet</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
              <Link href="/auth/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            </nav>
            <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Money. Your Control.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Recharge, store, and spend securely with our advanced wallet system. 
            Experience seamless transactions with enterprise-grade security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center justify-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/demo" className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for secure digital payments</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">AES encryption protects your wallet data and transactions</p>
            </div>
            <div className="text-center p-6">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Recharge</h3>
              <p className="text-gray-600">Add funds to your wallet instantly with multiple payment options</p>
            </div>
            <div className="text-center p-6">
              <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Credit Mode</h3>
              <p className="text-gray-600">Premium users can spend even with zero balance</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Add Funds</h3>
              <p className="text-gray-600">Recharge your wallet securely with various payment methods</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Spend</h3>
              <p className="text-gray-600">Use your wallet balance for seamless transactions</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Track</h3>
              <p className="text-gray-600">Monitor all your transactions in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Basic Plan</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">Free</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Secure wallet</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Instant recharge</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Transaction history</li>
              </ul>
              <Link href="/auth/signup" className="block text-center bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                Get Started
              </Link>
            </div>
            <div className="border border-blue-600 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">₹99<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Everything in Basic</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Overdraft facility</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Priority support</li>
              </ul>
              <Link href="/auth/signup" className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">StageOne Wallet</div>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white">Docs</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
            <div className="mt-8 text-gray-400">
              © 2025 StageOne Wallet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}