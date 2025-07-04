'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/auth'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BarChart3, 
  Calendar,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Plus,
  Briefcase,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react'
import Link from 'next/link'

// =====================================================
// DASHBOARD PAGE COMPONENT
// =====================================================

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    total_campaigns: 0,
    active_campaigns: 0,
    total_applications: 0,
    pending_applications: 0,
    total_earnings: 0,
    total_spent: 0,
    active_collaborations: 0,
    completed_collaborations: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        total_campaigns: user?.user_type === 'brand' ? 12 : 0,
        active_campaigns: user?.user_type === 'brand' ? 5 : 0,
        total_applications: user?.user_type === 'brand' ? 47 : 23,
        pending_applications: user?.user_type === 'brand' ? 8 : 5,
        total_earnings: user?.user_type === 'creator' ? 2840 : 0,
        total_spent: user?.user_type === 'brand' ? 15600 : 0,
        active_collaborations: user?.user_type === 'brand' ? 3 : 2,
        completed_collaborations: user?.user_type === 'brand' ? 9 : 7
      })
      setLoading(false)
    }, 1000)
  }, [user])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.full_name || 'User'}! 👋
        </h1>
        <p className="text-purple-100">
          {user?.user_type === 'brand' 
            ? 'Ready to launch your next successful campaign?' 
            : 'Ready to find your next collaboration opportunity?'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.user_type === 'brand' ? (
          <>
            <StatCard
              title="Total Campaigns"
              value={stats.total_campaigns}
              change="+12%"
              changeType="positive"
              icon={Briefcase}
            />
            <StatCard
              title="Active Campaigns"
              value={stats.active_campaigns}
              change="+2"
              changeType="positive"
              icon={Target}
            />
            <StatCard
              title="Total Applications"
              value={stats.total_applications}
              change="+8"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Total Spent"
              value={`$${stats.total_spent.toLocaleString()}`}
              change="+15%"
              changeType="positive"
              icon={DollarSign}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Total Earnings"
              value={`$${stats.total_earnings.toLocaleString()}`}
              change="+23%"
              changeType="positive"
              icon={DollarSign}
            />
            <StatCard
              title="Active Collaborations"
              value={stats.active_collaborations}
              change="+1"
              changeType="positive"
              icon={Briefcase}
            />
            <StatCard
              title="Applications Sent"
              value={stats.total_applications}
              change="+5"
              changeType="positive"
              icon={Target}
            />
            <StatCard
              title="Completed Projects"
              value={stats.completed_collaborations}
              change="+2"
              changeType="positive"
              icon={CheckCircle}
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/dashboard/activity" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <RecentActivityList userType={user?.user_type} />
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
              <div className="flex items-center space-x-4">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
            <PerformanceChart userType={user?.user_type} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {user?.user_type === 'brand' ? (
                <>
                  <Link href="/dashboard/campaigns/new" className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <Plus className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Create Campaign</span>
                  </Link>
                  <Link href="/dashboard/creators" className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Find Creators</span>
                  </Link>
                  <Link href="/dashboard/applications" className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Review Applications</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard/opportunities" className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Find Opportunities</span>
                  </Link>
                  <Link href="/dashboard/portfolio" className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <Instagram className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Update Portfolio</span>
                  </Link>
                  <Link href="/dashboard/applications" className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">View Applications</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-3">
              {user?.user_type === 'brand' ? (
                <>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Summer Collection Launch</p>
                      <p className="text-xs text-gray-500">Due in 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Holiday Campaign Review</p>
                      <p className="text-xs text-gray-500">Due in 1 week</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Beauty Product Review</p>
                      <p className="text-xs text-gray-500">Content due in 2 days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Fashion Brand Campaign</p>
                      <p className="text-xs text-gray-500">Proposal due in 5 days</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// STAT CARD COMPONENT
// =====================================================

interface StatCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative'
  icon: any
}

function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {changeType === 'positive' ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">from last month</span>
      </div>
    </motion.div>
  )
}

// =====================================================
// RECENT ACTIVITY LIST COMPONENT
// =====================================================

function RecentActivityList({ userType }: { userType: string }) {
  const activities = userType === 'brand' ? [
    {
      id: 1,
      type: 'application',
      message: 'Sarah Style applied to your Summer Collection campaign',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'content',
      message: 'Emma Lifestyle submitted content for Holiday Campaign',
      time: '4 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'campaign',
      message: 'Your Beauty Brand campaign went live',
      time: '1 day ago',
      icon: Target,
      color: 'text-purple-600'
    }
  ] : [
    {
      id: 1,
      type: 'application',
      message: 'You applied to Beauty Brand campaign',
      time: '1 hour ago',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received for Fashion Campaign',
      time: '3 hours ago',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'collaboration',
      message: 'New collaboration started with Tech Startup',
      time: '1 day ago',
      icon: Briefcase,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon
        return (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// =====================================================
// PERFORMANCE CHART COMPONENT
// =====================================================

function PerformanceChart({ userType }: { userType: string }) {
  const data = userType === 'brand' ? [
    { day: 'Mon', reach: 12000, engagement: 850 },
    { day: 'Tue', reach: 15000, engagement: 920 },
    { day: 'Wed', reach: 18000, engagement: 1100 },
    { day: 'Thu', reach: 14000, engagement: 780 },
    { day: 'Fri', reach: 22000, engagement: 1300 },
    { day: 'Sat', reach: 25000, engagement: 1500 },
    { day: 'Sun', reach: 20000, engagement: 1200 }
  ] : [
    { day: 'Mon', views: 5000, likes: 450 },
    { day: 'Tue', views: 6500, likes: 580 },
    { day: 'Wed', views: 8000, likes: 720 },
    { day: 'Thu', views: 5500, likes: 490 },
    { day: 'Fri', views: 9500, likes: 850 },
    { day: 'Sat', views: 11000, likes: 980 },
    { day: 'Sun', views: 8500, likes: 760 }
  ]

  const maxValue = Math.max(...data.map(d => userType === 'brand' ? d.reach : d.views))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              {userType === 'brand' ? 'Reach' : 'Views'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              {userType === 'brand' ? 'Engagement' : 'Likes'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-end space-x-2 h-32">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div className="flex items-end space-x-1 w-full">
              <div 
                className="flex-1 bg-purple-500 rounded-t"
                style={{ 
                  height: `${((userType === 'brand' ? item.reach : item.views) / maxValue) * 100}%` 
                }}
              ></div>
              <div 
                className="flex-1 bg-blue-500 rounded-t"
                style={{ 
                  height: `${((userType === 'brand' ? item.engagement : item.likes) / maxValue) * 100}%` 
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 