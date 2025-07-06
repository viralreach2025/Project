"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Banknote,
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
  BarChart3,
  Calendar,
  Download,
  RefreshCw,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart,
  Receipt,
  Wallet,
  Shield,
  Zap,
  Award,
  Star
} from 'lucide-react'

export default function FinancialManagement() {
  const [timeRange, setTimeRange] = useState('30d')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock financial data
  const financialStats = [
    {
      title: 'Total Revenue',
      value: '$156,892',
      change: '+23.1%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      detail: 'This month'
    },
    {
      title: 'Pending Payments',
      value: '$12,340',
      change: '+8.2%',
      changeType: 'positive',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      detail: '15 transactions'
    },
    {
      title: 'Platform Fees',
      value: '$15,689',
      change: '+18.5%',
      changeType: 'positive',
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600',
      detail: '10% commission'
    },
    {
      title: 'Disputes',
      value: '$2,450',
      change: '-12.3%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      detail: '3 cases'
    }
  ]

  const transactions = [
    {
      id: 1,
      type: 'payment',
      description: 'Payment to Sarah Style',
      amount: '$2,450',
      status: 'completed',
      date: '2024-01-25',
      time: '2:30 PM',
      user: 'Sarah Style',
      campaign: 'Summer Radiance',
      method: 'Stripe'
    },
    {
      id: 2,
      type: 'commission',
      description: 'Platform fee - GlowSkin campaign',
      amount: '$250',
      status: 'completed',
      date: '2024-01-25',
      time: '2:25 PM',
      user: 'GlowSkin',
      campaign: 'Summer Radiance',
      method: 'Automatic'
    },
    {
      id: 3,
      type: 'payment',
      description: 'Payment to Emma Lifestyle',
      amount: '$1,850',
      status: 'pending',
      date: '2024-01-25',
      time: '1:45 PM',
      user: 'Emma Lifestyle',
      campaign: 'Natural Glow',
      method: 'PayPal'
    },
    {
      id: 4,
      type: 'refund',
      description: 'Refund - Maya Fashion',
      amount: '-$750',
      status: 'processing',
      date: '2024-01-25',
      time: '1:20 PM',
      user: 'Maya Fashion',
      campaign: 'Acne Solutions',
      method: 'Stripe'
    },
    {
      id: 5,
      type: 'payment',
      description: 'Payment to Creator XYZ',
      amount: '$3,200',
      status: 'completed',
      date: '2024-01-24',
      time: '4:15 PM',
      user: 'Creator XYZ',
      campaign: 'Youth Boost',
      method: 'Bank Transfer'
    }
  ]

  const revenueBreakdown = [
    {
      category: 'Creator Payments',
      amount: '$89,450',
      percentage: 57,
      color: 'bg-blue-500'
    },
    {
      category: 'Platform Fees',
      amount: '$15,689',
      percentage: 10,
      color: 'bg-purple-500'
    },
    {
      category: 'Processing Fees',
      amount: '$4,567',
      percentage: 3,
      color: 'bg-orange-500'
    },
    {
      category: 'Other Revenue',
      amount: '$47,186',
      percentage: 30,
      color: 'bg-green-500'
    }
  ]

  const recentDisputes = [
    {
      id: 1,
      user: 'Maya Fashion',
      amount: '$750',
      reason: 'Content not delivered as promised',
      status: 'under_review',
      date: '2024-01-25',
      priority: 'high'
    },
    {
      id: 2,
      user: 'Brand ABC',
      amount: '$1,200',
      reason: 'Campaign performance below expectations',
      status: 'resolved',
      date: '2024-01-24',
      priority: 'medium'
    },
    {
      id: 3,
      user: 'Creator XYZ',
      amount: '$500',
      reason: 'Payment delay',
      status: 'pending',
      date: '2024-01-23',
      priority: 'low'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Pending</span>
      case 'processing':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Processing</span>
      case 'failed':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Failed</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'payment':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Payment</span>
      case 'commission':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Commission</span>
      case 'refund':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Refund</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{type}</span>
    }
  }

  const getDisputeStatusBadge = (status: string) => {
    switch (status) {
      case 'under_review':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Under Review</span>
      case 'resolved':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Resolved</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Pending</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-600 mt-1">Track revenue, payments, and financial performance</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
              <div className="flex items-center mt-3">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Breakdown and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View details
            </button>
          </div>
          <div className="space-y-4">
            {revenueBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{item.amount}</p>
                  <p className="text-xs text-gray-600">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Revenue breakdown chart</p>
            </div>
          </div>
        </div>

        {/* Revenue Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trends</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View details
            </button>
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <LineChart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Revenue trends chart</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-lg font-semibold text-green-600">$45,892</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Month</p>
              <p className="text-lg font-semibold text-gray-900">$37,234</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth</p>
              <p className="text-lg font-semibold text-green-600">+23.1%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions and Disputes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'payment' ? 'bg-green-100' :
                    transaction.type === 'commission' ? 'bg-purple-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'payment' ? (
                      <DollarSign className="w-4 h-4 text-green-600" />
                    ) : transaction.type === 'commission' ? (
                      <CreditCard className="w-4 h-4 text-purple-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-600">{transaction.user} • {transaction.campaign}</p>
                    <p className="text-xs text-gray-500">{transaction.date} at {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.amount}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getTypeBadge(transaction.type)}
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Disputes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Disputes</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentDisputes.map((dispute) => (
              <div key={dispute.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{dispute.user}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      dispute.priority === 'high' ? 'bg-red-100 text-red-800' :
                      dispute.priority === 'medium' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {dispute.priority}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${
                    dispute.amount.startsWith('-') ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {dispute.amount}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-2">{dispute.reason}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{dispute.date}</p>
                  {getDisputeStatusBadge(dispute.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Process Pending</p>
                <p className="text-xs text-gray-600">15 payments pending</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Review Disputes</p>
                <p className="text-xs text-gray-600">3 disputes need attention</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Generate Reports</p>
                <p className="text-xs text-gray-600">Financial reports</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
} 