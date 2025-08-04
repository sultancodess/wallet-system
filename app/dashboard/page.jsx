'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '../../components/ToastProvider'
import { 
  Wallet, 
  Plus, 
  Send, 
  History, 
  Settings, 
  LogOut, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Eye,
  EyeOff,
  Bell,
  Search,
  Filter,
  Download,
  Sparkles,
  Shield,
  Zap,
  Crown,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [rechargeAmount, setRechargeAmount] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()
  const { showSuccess, showError, showWarning } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    fetchDashboardData(token)
  }, [router])

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-dropdown')) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifications])

  const fetchDashboardData = async (token) => {
    try {
      const [walletRes, transactionsRes] = await Promise.all([
        fetch('/api/wallet', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      if (walletRes.ok) {
        const walletData = await walletRes.json()
        setWallet(walletData.wallet)
        setUser(walletData.user)
      } else if (walletRes.status === 401) {
        localStorage.removeItem('token')
        router.push('/auth/login')
        return
      }

      if (transactionsRes.ok) {
        const transactionsData = await transactionsRes.json()
        setTransactions(transactionsData.transactions)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRecharge = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const amount = parseFloat(rechargeAmount)

    if (!amount || amount <= 0) {
      showError('Please enter a valid amount')
      return
    }

    try {
      const response = await fetch('/api/wallet/recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
      })

      if (response.ok) {
        setRechargeAmount('')
        fetchDashboardData(token)
        showSuccess('Wallet recharged successfully!')
      } else {
        const data = await response.json()
        showError(data.message || 'Recharge failed')
      }
    } catch (error) {
      showError('Network error. Please try again.')
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const amount = parseFloat(paymentAmount)

    if (!amount || amount <= 0) {
      showError('Please enter a valid amount')
      return
    }

    try {
      const response = await fetch('/api/wallet/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount, description: 'Mock Order Payment' })
      })

      if (response.ok) {
        setPaymentAmount('')
        fetchDashboardData(token)
        showSuccess('Payment successful!')
      } else {
        const data = await response.json()
        showError(data.message || 'Payment failed')
      }
    } catch (error) {
      showError('Network error. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <div className="text-xl font-semibold text-gray-700">Loading your wallet...</div>
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mt-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Wallet System
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-96">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="bg-transparent outline-none flex-1 text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative notification-dropdown">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors relative"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {/* Recent transactions as notifications */}
                      {transactions.slice(0, 5).map((transaction, index) => (
                        <div key={transaction._id || index} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {transaction.type === 'credit' ? (
                                <ArrowDownLeft className="h-4 w-4 text-green-600" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {transaction.type === 'credit' ? 'Money Added' : 'Payment Made'}
                              </p>
                              <p className="text-xs text-gray-500">{transaction.description}</p>
                              <p className={`text-sm font-semibold ${
                                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount?.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {transactions.length === 0 && (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-gray-500">No notifications yet</p>
                          <p className="text-sm text-gray-400">Your transaction updates will appear here</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <button 
                        onClick={() => setActiveTab('transactions')}
                        className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View All Transactions
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 bg-gray-100 rounded-xl px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user?.name?.charAt(0)}</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    {user?.isPremium ? (
                      <>
                        <Crown className="h-3 w-3 text-yellow-500 mr-1" />
                        Premium
                      </>
                    ) : (
                      'Basic Plan'
                    )}
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Wallet className="w-8 h-8" />
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
              <div className="text-sm opacity-80 mb-1">Current Balance</div>
              <div className="text-2xl font-bold">
                {balanceVisible ? `₹${wallet?.balance?.toFixed(2) || '0.00'}` : '₹••••••'}
              </div>
            </div>
          </div>

          {/* Total Credited */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Total Credited</div>
            <div className="text-2xl font-bold text-gray-900">₹{wallet?.totalCredited?.toFixed(2) || '0.00'}</div>
          </div>

          {/* Last Recharge */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-500" />
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Last Recharge</div>
            <div className="text-lg font-semibold text-gray-900">
              {wallet?.lastRechargeDate 
                ? new Date(wallet.lastRechargeDate).toLocaleDateString()
                : 'Never'
              }
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              {user?.isPremium ? (
                <Crown className="w-8 h-8 text-yellow-500" />
              ) : (
                <Shield className="w-8 h-8 text-gray-500" />
              )}
              {user?.isPremium ? <Crown className="h-5 w-5 text-yellow-500" /> : <Shield className="h-5 w-5 text-gray-500" />}
            </div>
            <div className="text-sm text-gray-600 mb-1">Account Type</div>
            <div className={`text-lg font-semibold ${user?.isPremium ? 'text-yellow-600' : 'text-gray-900'}`}>
              {user?.isPremium ? 'Premium' : 'Basic'}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Modern Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Quick Actions
              </div>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === 'overview' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Wallet className="w-5 h-5 mr-3" />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('recharge')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === 'recharge' 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    Add Money
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('pay')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === 'pay' 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Send className="w-5 h-5 mr-3" />
                    Send Money
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === 'transactions' 
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <History className="w-5 h-5 mr-3" />
                    Transaction History
                  </button>
                </li>
              </ul>

              {/* Premium Upgrade Card */}
              {!user?.isPremium && (
                <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Crown className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Upgrade to Premium</span>
                  </div>
                  <p className="text-sm opacity-90 mb-3">Get overdraft facility and priority support</p>
                  <button className="w-full bg-white text-orange-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              )}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Activity */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <History className="w-6 h-6 mr-2" />
                      Recent Activity
                    </h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
                  </div>
                  
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction, index) => (
                      <div key={transaction._id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeft className="h-6 w-6 text-green-600" />
                            ) : (
                              <ArrowUpRight className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="font-semibold text-gray-900">{transaction.description}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className={`font-bold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount?.toFixed(2)}
                        </div>
                      </div>
                    ))}
                    
                    {transactions.length === 0 && (
                      <div className="text-center py-12">
                        <History className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500">No transactions yet</p>
                        <p className="text-sm text-gray-400">Start by adding money to your wallet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setActiveTab('recharge')}
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Plus className="w-8 h-8" />
                      <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold mb-1">Add Money</div>
                      <div className="text-sm opacity-90">Recharge your wallet instantly</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('pay')}
                    className="group bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Send className="w-8 h-8" />
                      <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold mb-1">Send Money</div>
                      <div className="text-sm opacity-90">Pay using your wallet balance</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'recharge' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Money to Wallet</h2>
                  <p className="text-gray-600">Choose an amount to recharge your wallet</p>
                </div>

                <form onSubmit={handleRecharge} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold text-gray-900 bg-gray-50"
                      placeholder="Enter amount to recharge"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[100, 500, 1000, 2000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setRechargeAmount(amount.toString())}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 font-semibold text-gray-700 hover:text-green-600"
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Add Money to Wallet
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'pay' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Money</h2>
                  <p className="text-gray-600">Pay using your wallet balance</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Payment Amount (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold text-gray-900 bg-gray-50"
                      placeholder="Enter payment amount"
                      required
                    />
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-gray-900">Available Balance:</span>
                      <span className="text-2xl font-bold text-blue-600">₹{wallet?.balance?.toFixed(2) || '0.00'}</span>
                    </div>
                    {user?.isPremium && (
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Premium user: Overdraft facility available up to ₹5,000
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Send Payment
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <History className="w-8 h-8 mr-3" />
                      Transaction History
                    </h2>
                    <p className="text-gray-600 mt-1">View all your wallet transactions</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Transactions</option>
                      <option value="credit">Money Added</option>
                      <option value="debit">Money Sent</option>
                    </select>
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {transactions
                    .filter(t => filterType === 'all' || t.type === filterType)
                    .map((transaction, index) => (
                    <div key={transaction._id || index} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="h-7 w-7 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-7 w-7 text-red-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-gray-900 text-lg">{transaction.description}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(transaction.createdAt).toLocaleDateString()} at {new Date(transaction.createdAt).toLocaleTimeString()}
                          </div>
                          <div className="text-xs text-gray-400">Balance after: ₹{transaction.balanceAfter?.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className={`font-bold text-xl ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount?.toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  {transactions.filter(t => filterType === 'all' || t.type === filterType).length === 0 && (
                    <div className="text-center py-12">
                      <History className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500">No transactions found</p>
                      <p className="text-sm text-gray-400">Try changing the filter or add some transactions</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}