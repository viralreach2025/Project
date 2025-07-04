"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2,
  DollarSign,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedCampaign, setSelectedCampaign] = useState('all')

  // Mock analytics data
  const overviewStats = [
    {
      title: "Total Views",
      value: "2.4M",
      change: "+12.5%",
      changeType: "increase",
      icon: Eye,
      color: "blue"
    },
    {
      title: "Total Engagement",
      value: "156K",
      change: "+8.2%",
      changeType: "increase",
      icon: Heart,
      color: "pink"
    },
    {
      title: "Total Clicks",
      value: "89K",
      change: "+15.3%",
      changeType: "increase",
      icon: Target,
      color: "green"
    },
    {
      title: "Total Conversions",
      value: "3,456",
      change: "+22.1%",
      changeType: "increase",
      icon: TrendingUp,
      color: "purple"
    },
    {
      title: "Total Spend",
      value: "$45,230",
      change: "+5.7%",
      changeType: "increase",
      icon: DollarSign,
      color: "orange"
    },
    {
      title: "ROI",
      value: "312%",
      change: "+18.4%",
      changeType: "increase",
      icon: BarChart3,
      color: "emerald"
    }
  ]

  const campaignPerformance = [
    {
      id: 1,
      name: "Summer Skincare Launch",
      views: 890000,
      engagement: 4.2,
      clicks: 15600,
      conversions: 890,
      spend: 15000,
      roi: 245,
      status: "active"
    },
    {
      id: 2,
      name: "Holiday Gift Guide",
      views: 1250000,
      engagement: 5.8,
      clicks: 23400,
      conversions: 1234,
      spend: 25000,
      roi: 312,
      status: "completed"
    },
    {
      id: 3,
      name: "Back to School Collection",
      views: 567000,
      engagement: 3.9,
      clicks: 8900,
      conversions: 567,
      spend: 12000,
      roi: 189,
      status: "completed"
    }
  ]

  const topInfluencers = [
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      platform: "Instagram",
      followers: "125K",
      engagement: 4.2,
      views: 450000,
      conversions: 234,
      performance: "excellent"
    },
    {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      platform: "YouTube",
      followers: "450K",
      engagement: 3.8,
      views: 890000,
      conversions: 567,
      performance: "excellent"
    },
    {
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      platform: "TikTok",
      followers: "156K",
      engagement: 8.1,
      views: 678000,
      conversions: 345,
      performance: "good"
    }
  ]

  const platformBreakdown = [
    { platform: "Instagram", views: 45, engagement: 4.2, spend: 40 },
    { platform: "TikTok", views: 30, engagement: 6.8, spend: 35 },
    { platform: "YouTube", views: 20, engagement: 3.8, spend: 20 },
    { platform: "Twitter", views: 5, engagement: 2.1, spend: 5 }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      pink: "bg-pink-100 text-pink-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      emerald: "bg-emerald-100 text-emerald-600"
    }
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-600"
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'average': return 'text-yellow-600 bg-yellow-100'
      case 'poor': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Track your campaign performance and ROI</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">vs last period</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Campaign Performance */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Performance</h2>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Campaigns</option>
                <option value="summer-skincare">Summer Skincare Launch</option>
                <option value="holiday-gift">Holiday Gift Guide</option>
                <option value="back-to-school">Back to School Collection</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Campaign</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Views</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Engagement</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Clicks</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Conversions</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignPerformance.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-gray-900">{campaign.name}</p>
                          <p className="text-sm text-gray-600">${campaign.spend.toLocaleString()} spent</p>
                        </div>
                      </td>
                      <td className="text-right py-3 px-2 text-sm text-gray-900">
                        {campaign.views.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-2 text-sm text-gray-900">
                        {campaign.engagement}%
                      </td>
                      <td className="text-right py-3 px-2 text-sm text-gray-900">
                        {campaign.clicks.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-2 text-sm text-gray-900">
                        {campaign.conversions.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-2">
                        <span className="text-sm font-medium text-green-600">
                          {campaign.roi}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Breakdown</h2>
            <div className="space-y-4">
              {platformBreakdown.map((platform) => (
                <div key={platform.platform} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">{platform.platform}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{platform.views}%</p>
                    <p className="text-xs text-gray-600">{platform.engagement}% engagement</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Engagement by Platform</h3>
              <div className="space-y-2">
                {platformBreakdown.map((platform) => (
                  <div key={platform.platform} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{platform.platform}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${platform.engagement * 10}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{platform.engagement}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Influencers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topInfluencers.map((influencer, index) => (
              <motion.div
                key={influencer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{influencer.name}</h3>
                    <p className="text-sm text-gray-600">{influencer.platform} • {influencer.followers}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{influencer.views.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{influencer.conversions}</p>
                    <p className="text-xs text-gray-600">Conversions</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{influencer.engagement}%</p>
                    <p className="text-xs text-gray-600">Engagement</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(influencer.performance)}`}>
                    {influencer.performance}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                type: "campaign",
                message: "Summer Skincare Launch campaign went live",
                time: "2 hours ago",
                icon: Activity,
                color: "green"
              },
              {
                type: "influencer",
                message: "Sarah Johnson submitted content for review",
                time: "4 hours ago",
                icon: Users,
                color: "blue"
              },
              {
                type: "performance",
                message: "Holiday Gift Guide reached 1M views",
                time: "6 hours ago",
                icon: TrendingUp,
                color: "purple"
              },
              {
                type: "payment",
                message: "Payment processed for Emma Rodriguez",
                time: "1 day ago",
                icon: DollarSign,
                color: "orange"
              }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 