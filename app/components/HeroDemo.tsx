"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, TrendingUp, Users, DollarSign, Eye, Heart, MessageCircle, Share2, Play, Pause, BarChart3, Target, Zap, Star, ArrowUp } from 'lucide-react'

export default function HeroDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentCampaign, setCurrentCampaign] = useState(0)
  const [liveMetrics, setLiveMetrics] = useState({
    views: 12847,
    engagement: 8.4,
    clicks: 1247,
    conversions: 89,
    revenue: 2847
  })

  // Simulate live metrics updates
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        views: prev.views + Math.floor(Math.random() * 25) + 5,
        engagement: Number((prev.engagement + (Math.random() - 0.5) * 0.3).toFixed(1)),
        clicks: prev.clicks + Math.floor(Math.random() * 8) + 1,
        conversions: prev.conversions + Math.floor(Math.random() * 3),
        revenue: prev.revenue + Math.floor(Math.random() * 45) + 10
      }))
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isPlaying])

  // Auto-rotate campaigns
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentCampaign(prev => (prev + 1) % campaigns.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isPlaying])

  // Auto-rotate tabs
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % tabs.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [isPlaying])

  const campaigns = [
    {
      brand: "StyleCo",
      creator: "Emma Fashion",
      product: "Summer Collection",
      status: "live",
      color: "from-pink-500 to-purple-600"
    },
    {
      brand: "TechGear",
      creator: "Alex Tech",
      product: "Smart Watch",
      status: "completed",
      color: "from-blue-500 to-cyan-600"
    },
    {
      brand: "FitLife",
      creator: "Sarah Fitness",
      product: "Protein Powder",
      status: "pending",
      color: "from-green-500 to-emerald-600"
    }
  ]

  const tabs = [
    {
      title: "Live Campaigns",
      icon: <Play className="w-4 h-4" />,
      content: "campaign"
    },
    {
      title: "Real-Time Analytics",
      icon: <BarChart3 className="w-4 h-4" />,
      content: "analytics"
    },
    {
      title: "Creator Network",
      icon: <Users className="w-4 h-4" />,
      content: "creators"
    }
  ]

  const creators = [
    { name: "Emma Fashion", followers: "125K", niche: "Fashion", avatar: "👩‍💼", verified: true, engagement: 9.2 },
    { name: "Alex Tech", followers: "89K", niche: "Technology", avatar: "👨‍💻", verified: true, engagement: 8.7 },
    { name: "Sarah Fitness", followers: "156K", niche: "Fitness", avatar: "💪", verified: true, engagement: 9.8 }
  ]

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="relative">
      {/* Main Interactive Dashboard */}
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header with Browser-like Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="text-sm font-medium text-gray-600">ViralReach Dashboard</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            {isPlaying && (
              <motion.div 
                className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>LIVE</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === index
                  ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Live Campaigns Tab */}
            {activeTab === 0 && (
              <motion.div
                key="campaigns"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>3 campaigns running</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCampaign}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`p-4 rounded-xl bg-gradient-to-r ${campaigns[currentCampaign].color} text-white`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold">{campaigns[currentCampaign].brand}</div>
                        <div className="text-sm opacity-90">with {campaigns[currentCampaign].creator}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaigns[currentCampaign].status === 'live' ? 'bg-green-500' :
                        campaigns[currentCampaign].status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}>
                        {campaigns[currentCampaign].status}
                      </div>
                    </div>
                    
                    <div className="text-sm opacity-90 mb-3">
                      Product: {campaigns[currentCampaign].product}
                    </div>

                    <div className="grid grid-cols-4 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold">{formatNumber(liveMetrics.views)}</div>
                        <div className="text-xs opacity-80">Views</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{liveMetrics.engagement}%</div>
                        <div className="text-xs opacity-80">Engagement</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{formatNumber(liveMetrics.clicks)}</div>
                        <div className="text-xs opacity-80">Clicks</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">${formatNumber(liveMetrics.revenue)}</div>
                        <div className="text-xs opacity-80">Revenue</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="grid grid-cols-3 gap-3">
                  {campaigns.map((campaign, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentCampaign(index)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        currentCampaign === index
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-sm font-medium text-gray-900">{campaign.brand}</div>
                      <div className="text-xs text-gray-600">{campaign.creator}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 1 && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Performance Metrics</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-900">{formatNumber(liveMetrics.views)}</div>
                        <div className="text-sm text-blue-700">Total Views</div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      <span>+12% from yesterday</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <DollarSign className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-900">${formatNumber(liveMetrics.revenue)}</div>
                        <div className="text-sm text-green-700">Revenue</div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      <span>+28% this week</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-900">{liveMetrics.engagement}%</div>
                        <div className="text-sm text-purple-700">Engagement</div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      <span>Above average</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-900">{liveMetrics.conversions}</div>
                        <div className="text-sm text-orange-700">Conversions</div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      <span>+15% today</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Creators Tab */}
            {activeTab === 2 && (
              <motion.div
                key="creators"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Creators</h3>
                
                <div className="space-y-3">
                  {creators.map((creator, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
                            {creator.avatar}
                          </div>
                          {creator.verified && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{creator.name}</div>
                          <div className="text-sm text-gray-600">{creator.niche} • {creator.followers}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold text-gray-900">{creator.engagement}</span>
                        </div>
                        <div className="text-sm text-gray-600">Engagement</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating Stats Cards */}
      <motion.div
        className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">+340%</div>
            <div className="text-sm text-gray-600">ROI Increase</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">50K+</div>
            <div className="text-sm text-gray-600">Verified Creators</div>
          </div>
        </div>
      </motion.div>

      {/* Pulse Effect */}
      <motion.div
        className="absolute inset-0 bg-purple-500 rounded-2xl opacity-5"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  )
} 