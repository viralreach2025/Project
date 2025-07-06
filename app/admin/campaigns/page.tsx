"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Users,
  BarChart3,
  Calendar,
  MapPin,
  Star,
  Plus,
  Download,
  RefreshCw,
  Play,
  Pause,
  StopCircle,
  Flag,
  MessageSquare,
  ExternalLink,
  Zap,
  Award,
  Activity,
  ArrowUpRight
} from 'lucide-react'

export default function CampaignOversight() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  // Mock campaign data
  const campaigns = [
    {
      id: 1,
      name: 'Summer Radiance',
      brand: 'GlowSkin',
      status: 'active',
      type: 'awareness',
      budget: '$2,500',
      spent: '$1,850',
      roi: '156%',
      engagement: '12.5K',
      reach: '45.2K',
      creators: 3,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      performance: 'excellent',
      priority: 'high',
      description: 'Summer skincare campaign targeting women 25-35'
    },
    {
      id: 2,
      name: 'Natural Glow',
      brand: 'PureBeauty',
      status: 'pending',
      type: 'sales',
      budget: '$3,000',
      spent: '$0',
      roi: null,
      engagement: null,
      reach: null,
      creators: 4,
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      performance: null,
      priority: 'medium',
      description: 'Natural beauty products campaign'
    },
    {
      id: 3,
      name: 'Winter Care',
      brand: 'SkinCare Pro',
      status: 'completed',
      type: 'awareness',
      budget: '$1,800',
      spent: '$1,800',
      roi: '189%',
      engagement: '8.9K',
      reach: '32.1K',
      creators: 2,
      startDate: '2023-12-01',
      endDate: '2024-01-01',
      performance: 'excellent',
      priority: 'low',
      description: 'Winter skincare essentials campaign'
    },
    {
      id: 4,
      name: 'Youth Boost',
      brand: 'AntiAging Plus',
      status: 'paused',
      type: 'sales',
      budget: '$4,200',
      spent: '$2,100',
      roi: '142%',
      engagement: '15.3K',
      reach: '58.7K',
      creators: 5,
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      performance: 'good',
      priority: 'high',
      description: 'Anti-aging products campaign'
    },
    {
      id: 5,
      name: 'Acne Solutions',
      brand: 'ClearSkin',
      status: 'flagged',
      type: 'awareness',
      budget: '$1,500',
      spent: '$750',
      roi: '89%',
      engagement: '6.2K',
      reach: '28.4K',
      creators: 2,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      performance: 'poor',
      priority: 'medium',
      description: 'Acne treatment products campaign'
    }
  ]

  const stats = [
    {
      title: 'Total Campaigns',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Campaigns',
      value: '89',
      change: '+12.5%',
      changeType: 'positive',
      icon: Play,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Pending Approval',
      value: '23',
      change: '-5.3%',
      changeType: 'negative',
      icon: Clock,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Average ROI',
      value: '156%',
      change: '+12.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Pending</span>
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Completed</span>
      case 'paused':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Paused</span>
      case 'flagged':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Flagged</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const getPerformanceBadge = (performance: string | null) => {
    if (!performance) return null
    switch (performance) {
      case 'excellent':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Excellent</span>
      case 'good':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Good</span>
      case 'poor':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Poor</span>
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">High</span>
      case 'medium':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Medium</span>
      case 'low':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Low</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{priority}</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Oversight</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all platform campaigns</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
              <option value="flagged">Flagged</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="awareness">Awareness</option>
              <option value="sales">Sales</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="budget">Budget</option>
              <option value="roi">ROI</option>
              <option value="engagement">Engagement</option>
            </select>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
          >
            {/* Campaign Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  {getPriorityBadge(campaign.priority)}
                </div>
                <p className="text-sm text-gray-600">{campaign.brand}</p>
                <p className="text-xs text-gray-500 mt-1">{campaign.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(campaign.status)}
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Campaign Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Budget</span>
                  <span className="text-sm font-medium">{campaign.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Spent</span>
                  <span className="text-sm font-medium">{campaign.spent}</span>
                </div>
                {campaign.roi && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ROI</span>
                    <span className="text-sm font-medium text-green-600">{campaign.roi}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Creators</span>
                  <span className="text-sm font-medium">{campaign.creators}</span>
                </div>
                {campaign.engagement && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Engagement</span>
                    <span className="text-sm font-medium">{campaign.engagement}</span>
                  </div>
                )}
                {campaign.reach && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reach</span>
                    <span className="text-sm font-medium">{campaign.reach}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Performance and Dates */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {campaign.performance && getPerformanceBadge(campaign.performance)}
                <span className="text-xs text-gray-500">
                  {campaign.startDate} - {campaign.endDate}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                {campaign.status === 'pending' && (
                  <>
                    <button className="flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </button>
                    <button className="flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200">
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </button>
                  </>
                )}
                {campaign.status === 'active' && (
                  <button className="flex items-center px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded hover:bg-orange-200">
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </button>
                )}
                {campaign.status === 'paused' && (
                  <button className="flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200">
                    <Play className="w-3 h-3 mr-1" />
                    Resume
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Review Pending</p>
                <p className="text-xs text-gray-600">23 campaigns need approval</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Flag className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Flagged Content</p>
                <p className="text-xs text-gray-600">5 campaigns flagged</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Top Performers</p>
                <p className="text-xs text-gray-600">View best campaigns</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
} 