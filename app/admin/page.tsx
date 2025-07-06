"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  Shield,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Star,
  Flag,
  UserCheck,
  UserX,
  CreditCard,
  PieChart,
  LineChart,
  MapPin,
  Globe,
  Zap,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Unlock,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Plus,
  Search,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react'

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  // Enhanced stats data
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      detail: '1,234 brands • 1,613 creators'
    },
    {
      title: 'Active Campaigns',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      detail: '89 pending • 67 live'
    },
    {
      title: 'Platform Revenue',
      value: '$45,892',
      change: '+23.1%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      detail: 'This month • $12.3k pending'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-5.3%',
      changeType: 'negative',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      detail: '15 campaigns • 8 creators'
    }
  ]

  // Enhanced recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'campaign_created',
      title: 'New Campaign Created',
      description: 'GlowSkin launched "Summer Radiance" campaign',
      time: '2 minutes ago',
      status: 'pending',
      user: 'Sarah Johnson',
      amount: '$2,500'
    },
    {
      id: 2,
      type: 'user_registered',
      title: 'New Creator Joined',
      description: 'Sarah Style (125K followers) joined platform',
      time: '15 minutes ago',
      status: 'approved',
      user: 'Sarah Style',
      amount: null
    },
    {
      id: 3,
      type: 'content_flagged',
      title: 'Content Flagged for Review',
      description: 'Campaign content violates guidelines',
      time: '1 hour ago',
      status: 'flagged',
      user: 'Emma Lifestyle',
      amount: null
    },
    {
      id: 4,
      type: 'payment_processed',
      title: 'Payment Processed',
      description: '$2,450 paid to Emma Lifestyle',
      time: '2 hours ago',
      status: 'completed',
      user: 'Emma Lifestyle',
      amount: '$2,450'
    },
    {
      id: 5,
      type: 'campaign_completed',
      title: 'Campaign Completed',
      description: 'Summer Glow campaign achieved 150% ROI',
      time: '3 hours ago',
      status: 'completed',
      user: 'GlowSkin',
      amount: '$3,750'
    }
  ]

  // Enhanced alerts
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Dispute Rate',
      description: '3 payment disputes in last 24 hours',
      icon: AlertTriangle,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'System Maintenance',
      description: 'Scheduled maintenance in 2 hours',
      icon: Shield,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'New Feature Released',
      description: 'AI creator matching v2.0 is live',
      icon: CheckCircle,
      priority: 'low'
    }
  ]

  // User management preview
  const recentUsers = [
    {
      id: 1,
      name: 'Sarah Style',
      email: 'sarah@style.com',
      type: 'creator',
      followers: '125K',
      status: 'active',
      joined: '2 days ago',
      avatar: 'SS'
    },
    {
      id: 2,
      name: 'GlowSkin Brand',
      email: 'contact@glowskin.com',
      type: 'brand',
      followers: null,
      status: 'pending',
      joined: '1 week ago',
      avatar: 'GB'
    },
    {
      id: 3,
      name: 'Emma Lifestyle',
      email: 'emma@lifestyle.com',
      type: 'creator',
      followers: '89K',
      status: 'active',
      joined: '3 days ago',
      avatar: 'EL'
    }
  ]

  // Campaign insights
  const campaignInsights = [
    {
      name: 'Summer Radiance',
      brand: 'GlowSkin',
      budget: '$2,500',
      spent: '$1,850',
      roi: '156%',
      status: 'active',
      creators: 3,
      engagement: '12.5K'
    },
    {
      name: 'Natural Glow',
      brand: 'PureBeauty',
      budget: '$3,000',
      spent: '$2,200',
      roi: '142%',
      status: 'active',
      creators: 4,
      engagement: '18.2K'
    },
    {
      name: 'Winter Care',
      brand: 'SkinCare Pro',
      budget: '$1,800',
      spent: '$1,800',
      roi: '189%',
      status: 'completed',
      creators: 2,
      engagement: '8.9K'
    }
  ]

  // System metrics
  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: '45%',
      status: 'normal',
      icon: Cpu,
      color: 'text-green-600'
    },
    {
      name: 'Memory Usage',
      value: '67%',
      status: 'warning',
      icon: Database,
      color: 'text-orange-600'
    },
    {
      name: 'Storage',
      value: '23%',
      status: 'normal',
      icon: HardDrive,
      color: 'text-green-600'
    },
    {
      name: 'Network',
      value: '89%',
      status: 'critical',
      icon: Wifi,
      color: 'text-red-600'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'flagged':
        return <Flag className="w-4 h-4 text-red-500" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'info':
        return <Shield className="w-5 h-5 text-blue-500" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-orange-200 bg-orange-50'
      case 'low':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview and key metrics</p>
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
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
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
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-green-600">{activity.amount}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <p className="text-xs text-purple-600 font-medium">{activity.user}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Enhanced Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg border ${getPriorityColor(alert.priority)}`}>
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-purple-900">Review Pending</p>
                  <p className="text-xs text-purple-600">23 items need attention</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-purple-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-blue-900">User Management</p>
                  <p className="text-xs text-blue-600">Manage creators & brands</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-blue-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-green-900">Analytics Report</p>
                  <p className="text-xs text-green-600">View detailed insights</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-orange-900">Support Tickets</p>
                  <p className="text-xs text-orange-600">12 open tickets</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all users
            </button>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">{user.type}</span>
                    {user.followers && <span className="text-xs text-gray-500">{user.followers} followers</span>}
                    <span className="text-xs text-gray-500">{user.joined}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Insights */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Campaign Insights</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all campaigns
            </button>
          </div>
          <div className="space-y-4">
            {campaignInsights.map((campaign, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{campaign.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{campaign.brand}</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-medium">{campaign.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Spent</p>
                    <p className="font-medium">{campaign.spent}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">ROI</p>
                    <p className="font-medium text-green-600">{campaign.roi}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Creators</p>
                    <p className="font-medium">{campaign.creators}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health & Platform Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Platform Health */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Health</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">System Status</p>
              <p className="text-sm text-green-600">All systems operational</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Response Time</p>
              <p className="text-sm text-blue-600">245ms average</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">User Satisfaction</p>
              <p className="text-sm text-purple-600">4.8/5 rating</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Uptime</p>
              <p className="text-sm text-orange-600">99.9% this month</p>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">System Metrics</h2>
          <div className="space-y-4">
            {systemMetrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">{metric.value}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    metric.status === 'normal' ? 'bg-green-500' : 
                    metric.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                  }`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Financial Overview</h2>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-1 text-sm border border-gray-300 rounded-lg">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View details
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">$45,892</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-xs text-green-600 mt-1">+23.1% vs last month</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">$12,340</p>
            <p className="text-sm text-gray-600">Pending Payments</p>
            <p className="text-xs text-blue-600 mt-1">15 transactions</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">156%</p>
            <p className="text-sm text-gray-600">Average ROI</p>
            <p className="text-xs text-purple-600 mt-1">+12% vs last month</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">847</p>
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-xs text-orange-600 mt-1">+8.2% vs last month</p>
          </div>
        </div>
      </div>
    </div>
  )
} 