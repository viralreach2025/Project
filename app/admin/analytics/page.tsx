"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  MapPin,
  Globe,
  Star,
  Award,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  // Mock analytics data
  const overviewStats = [
    {
      title: 'Total Revenue',
      value: '$156,892',
      change: '+23.1%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      detail: 'vs last month'
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      detail: 'vs last month'
    },
    {
      title: 'Campaign Success Rate',
      value: '89.2%',
      change: '+5.3%',
      changeType: 'positive',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      detail: 'vs last month'
    },
    {
      title: 'Average ROI',
      value: '156%',
      change: '+8.7%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      detail: 'vs last month'
    }
  ]

  const topPerformers = [
    {
      name: 'Sarah Style',
      type: 'creator',
      followers: '125K',
      campaigns: 12,
      totalEarnings: '$8,450',
      avgROI: '189%',
      rating: 4.8,
      avatar: 'SS'
    },
    {
      name: 'Emma Lifestyle',
      type: 'creator',
      followers: '89K',
      campaigns: 8,
      totalEarnings: '$5,230',
      avgROI: '156%',
      rating: 4.6,
      avatar: 'EL'
    },
    {
      name: 'GlowSkin',
      type: 'brand',
      followers: null,
      campaigns: 15,
      totalSpent: '$12,450',
      avgROI: '142%',
      rating: 4.7,
      avatar: 'GS'
    }
  ]

  const recentTrends = [
    {
      metric: 'Revenue',
      value: '$45,892',
      change: '+23.1%',
      changeType: 'positive',
      trend: 'up'
    },
    {
      metric: 'User Growth',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      trend: 'up'
    },
    {
      metric: 'Campaign Success',
      value: '89.2%',
      change: '+5.3%',
      changeType: 'positive',
      trend: 'up'
    },
    {
      metric: 'Engagement Rate',
      value: '4.2%',
      change: '-2.1%',
      changeType: 'negative',
      trend: 'down'
    }
  ]

  const platformMetrics = [
    {
      name: 'System Uptime',
      value: '99.9%',
      status: 'excellent',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      name: 'Response Time',
      value: '245ms',
      status: 'good',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      name: 'User Satisfaction',
      value: '4.8/5',
      status: 'excellent',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      name: 'Error Rate',
      value: '0.1%',
      status: 'good',
      icon: AlertTriangle,
      color: 'text-orange-600'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600'
      case 'good':
        return 'text-blue-600'
      case 'warning':
        return 'text-orange-600'
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform performance insights and trends</p>
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

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trends</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View details
            </button>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Revenue chart visualization</p>
              <p className="text-xs text-gray-400">Interactive chart would be rendered here</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
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

        {/* User Growth Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View details
            </button>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">User growth chart visualization</p>
              <p className="text-xs text-gray-400">Interactive chart would be rendered here</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">New Users</p>
              <p className="text-lg font-semibold text-blue-600">+234</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-lg font-semibold text-gray-900">2,847</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Retention</p>
              <p className="text-lg font-semibold text-green-600">89.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers and Recent Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {performer.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      performer.type === 'creator' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {performer.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                    {performer.followers && <span>{performer.followers} followers</span>}
                    <span>{performer.campaigns} campaigns</span>
                    <span className="text-green-600 font-medium">{performer.avgROI} ROI</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {performer.totalEarnings || performer.totalSpent}
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-gray-600">{performer.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Trends</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    trend.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {trend.trend === 'up' ? (
                      <ArrowUpRight className={`w-4 h-4 ${
                        trend.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    ) : (
                      <ArrowDownRight className={`w-4 h-4 ${
                        trend.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{trend.metric}</p>
                    <p className="text-xs text-gray-600">vs last period</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{trend.value}</p>
                  <p className={`text-xs font-medium ${
                    trend.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Health Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformMetrics.map((metric) => (
            <div key={metric.name} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <p className="text-sm font-medium text-gray-900">{metric.name}</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{metric.value}</p>
              <p className={`text-xs font-medium mt-1 ${getStatusColor(metric.status)}`}>
                {metric.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Geographic Distribution</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View details
            </button>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Geographic distribution chart</p>
              <p className="text-xs text-gray-400">Interactive map would be rendered here</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">United States</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Europe</span>
              <span className="text-sm font-medium">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Asia Pacific</span>
              <span className="text-sm font-medium">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Other</span>
              <span className="text-sm font-medium">9%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Campaign Performance</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View details
            </button>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Campaign performance chart</p>
              <p className="text-xs text-gray-400">Interactive chart would be rendered here</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Excellent</span>
              <span className="text-sm font-medium text-green-600">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Good</span>
              <span className="text-sm font-medium text-blue-600">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average</span>
              <span className="text-sm font-medium text-orange-600">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Poor</span>
              <span className="text-sm font-medium text-red-600">5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 