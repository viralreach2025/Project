"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, TrendingUp, Eye, Heart, MessageSquare, DollarSign, CheckCircle, Users, BarChart3 } from 'lucide-react'

export default function HeroDemo() {
  const [activeInfluencer, setActiveInfluencer] = useState(0)
  const [metrics, setMetrics] = useState({
    views: 125420,
    engagement: 4.2,
    revenue: 8750
  })

  const influencers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      handle: '@sarahfits',
      niche: 'Fitness',
      followers: '125K',
      engagement: '4.2%',
      rating: 4.8,
      avatar: '💪',
      verified: true,
      recentPost: {
        views: '45K',
        likes: '2.1K',
        comments: '156'
      }
    },
    {
      id: 2,
      name: 'Mike Chen',
      handle: '@techreview',
      niche: 'Technology',
      followers: '89K',
      engagement: '3.8%',
      rating: 4.9,
      avatar: '📱',
      verified: true,
      recentPost: {
        views: '67K',
        likes: '3.2K',
        comments: '234'
      }
    },
    {
      id: 3,
      name: 'Emma Style',
      handle: '@emmastyle',
      niche: 'Fashion',
      followers: '200K',
      engagement: '5.1%',
      rating: 4.7,
      avatar: '👗',
      verified: true,
      recentPost: {
        views: '89K',
        likes: '4.5K',
        comments: '312'
      }
    }
  ]

  // Auto-cycle through influencers
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInfluencer((prev) => (prev + 1) % influencers.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [influencers.length])

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        views: prev.views + Math.floor(Math.random() * 20) + 5,
        engagement: Number((prev.engagement + (Math.random() - 0.5) * 0.1).toFixed(1)),
        revenue: prev.revenue + Math.floor(Math.random() * 15) + 3
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="relative">
      {/* Main Dashboard Card */}
      <motion.div 
        className="monday-card p-6 bg-white shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-sm text-gray-500">ViralReach Dashboard</div>
        </div>

        {/* Live Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              className="text-center p-3 bg-purple-50 rounded-lg"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-2xl font-bold text-purple-600">{formatNumber(metrics.views)}</div>
              <div className="text-xs text-purple-700">Total Views</div>
            </motion.div>
            <motion.div 
              className="text-center p-3 bg-blue-50 rounded-lg"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="text-2xl font-bold text-blue-600">{metrics.engagement}%</div>
              <div className="text-xs text-blue-700">Engagement</div>
            </motion.div>
            <motion.div 
              className="text-center p-3 bg-green-50 rounded-lg"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <div className="text-2xl font-bold text-green-600">${formatNumber(metrics.revenue)}</div>
              <div className="text-xs text-green-700">Revenue</div>
            </motion.div>
          </div>
        </div>

        {/* Influencer Discovery */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verified Influencers</h3>
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInfluencer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl relative">
                    {influencers[activeInfluencer].avatar}
                    {influencers[activeInfluencer].verified && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{influencers[activeInfluencer].name}</div>
                    <div className="text-sm text-gray-600">{influencers[activeInfluencer].handle}</div>
                    <div className="text-xs text-purple-600">{influencers[activeInfluencer].niche}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{influencers[activeInfluencer].followers}</div>
                  <div className="text-xs text-gray-600">followers</div>
                  <div className="flex items-center mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{influencers[activeInfluencer].rating}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Recent Performance */}
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-sm font-medium text-gray-700 mb-2">Latest Post Performance</div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Eye className="w-3 h-3 text-gray-400" />
                  <span className="text-xs font-medium">{influencers[activeInfluencer].recentPost.views}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span className="text-xs font-medium">{influencers[activeInfluencer].recentPost.likes}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <MessageSquare className="w-3 h-3 text-blue-400" />
                  <span className="text-xs font-medium">{influencers[activeInfluencer].recentPost.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Campaign with {influencers[activeInfluencer].name}
        </motion.button>
      </motion.div>

      {/* Floating Stats Cards */}
      <motion.div
        className="absolute -top-4 -right-4 monday-card p-3 bg-white shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <div>
            <div className="text-sm font-bold text-green-600">+340%</div>
            <div className="text-xs text-gray-500">ROI</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 monday-card p-3 bg-white shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-purple-500" />
          <div>
            <div className="text-sm font-bold text-purple-600">50K+</div>
            <div className="text-xs text-gray-500">Creators</div>
          </div>
        </div>
      </motion.div>

      {/* Live Indicator */}
      <motion.div
        className="absolute top-2 right-2 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <span className="text-xs font-medium">LIVE</span>
      </motion.div>
    </div>
  )
} 