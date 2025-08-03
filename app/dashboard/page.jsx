'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Wallet, Plus, Send, History, Settings, LogOut, CreditCard } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [rechargeAmount, setRechargeAmount] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    fetchDashboardData(token)
  }, [router])

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
      alert('Failed to load dashboard data. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const handleRecharge = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const amount = parseFloat(rechargeAmount)

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount')
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
        alert('Wallet recharged successfully!')
      } else {
        const data = await response.json()
        alert(data.message || 'Recharge failed')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const amount = parseFloat(paymentAmount)

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount')
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
        alert('Payment successful!')
      } else {
        const data = await response.json()
        alert(data.message || 'Payment failed')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">StageOne Wallet</div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              {user?.isPremium && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  Premium
                </span>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                      activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Wallet className="h-5 w-5 mr-3" />
                    Wallet Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('recharge')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                      activeTab === 'recharge' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Plus className="h-5 w-5 mr-3" />
                    Recharge Wallet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('pay')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                      activeTab === 'pay' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Send className="h-5 w-5 mr-3" />
                    Pay with Wallet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-left ${
                      activeTab === 'transactions' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <History className="h-5 w-5 mr-3" />
                    Transaction History
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Current Balance</h3>
                      <div className="text-3xl font-bold mt-2">₹{wallet?.balance?.toFixed(2) || '0.00'}</div>
                    </div>
                    <CreditCard className="h-12 w-12 opacity-80" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="opacity-80">Last Recharge</div>
                      <div className="font-medium">
                        {wallet?.lastRechargeDate 
                          ? new Date(wallet.lastRechargeDate).toLocaleDateString()
                          : 'Never'
                        }
                      </div>
                    </div>
                    <div>
                      <div className="opacity-80">Total Credited</div>
                      <div className="font-medium">₹{wallet?.totalCredited?.toFixed(2) || '0.00'}</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab('recharge')}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-green-500"
                  >
                    <div className="flex items-center">
                      <Plus className="h-8 w-8 text-green-500 mr-4" />
                      <div className="text-left">
                        <div className="font-semibold">Recharge Wallet</div>
                        <div className="text-gray-600 text-sm">Add funds to your wallet</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('pay')}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-blue-500"
                  >
                    <div className="flex items-center">
                      <Send className="h-8 w-8 text-blue-500 mr-4" />
                      <div className="text-left">
                        <div className="font-semibold">Make Payment</div>
                        <div className="text-gray-600 text-sm">Pay using wallet balance</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'recharge' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Recharge Wallet</h2>
                <form onSubmit={handleRecharge} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount to recharge"
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    {[100, 500, 1000, 2000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setRechargeAmount(amount.toString())}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Recharge Wallet
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'pay' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Pay with Wallet</h2>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Amount (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter payment amount"
                      required
                    />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <span>Available Balance:</span>
                      <span className="font-semibold">₹{wallet?.balance?.toFixed(2) || '0.00'}</span>
                    </div>
                    {user?.isPremium && (
                      <div className="text-sm text-green-600 mt-2">
                        ✓ Premium user: Overdraft facility available
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Make Payment
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                            No transactions found
                          </td>
                        </tr>
                      ) : (
                        transactions.map((transaction) => (
                          <tr key={transaction._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.type === 'credit' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {transaction.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₹{transaction.amount?.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction.description}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}