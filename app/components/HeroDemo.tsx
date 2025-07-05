"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Play,
  Pause,
  Plus,
  Search,
  MessageCircle,
  Star,
  Building,
  User
} from 'lucide-react'

export default function HeroDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [userType, setUserType] = useState<'brand' | 'creator'>('brand')

  // Auto-advance through steps
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const brandSteps = [
    {
      title: "1. Create Campaign",
      description: "Set your goals and budget",
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "2. Find Creators", 
      description: "AI matches you with perfect creators",
      icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-green-500"
    },
    {
      title: "3. Collaborate",
      description: "Review content and approve",
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-green-500 to-yellow-500"
    },
    {
      title: "4. Track Results",
      description: "Monitor performance and ROI",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-yellow-500 to-purple-500"
    }
  ]

  const creatorSteps = [
    {
      title: "1. Complete Profile",
      description: "Showcase your content and audience",
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "2. Get Matched", 
      description: "AI finds perfect brand opportunities",
      icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-green-500"
    },
    {
      title: "3. Create Content",
      description: "Make authentic branded content",
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-green-500 to-yellow-500"
    },
    {
      title: "4. Earn & Grow",
      description: "Get paid and build relationships",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-yellow-500 to-purple-500"
    }
  ]

  const steps = userType === 'brand' ? brandSteps : creatorSteps

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Simple Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">How ViralReach Works</h2>
              <p className="text-xs sm:text-sm text-gray-600">Simple 4-step process</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* User Type Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setUserType('brand')}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                  userType === 'brand' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Building className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Brands</span>
              </button>
              <button
                onClick={() => setUserType('creator')}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                  userType === 'creator' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Creators</span>
              </button>
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step-by-Step Process */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
              index === currentStep 
                ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg scale-105' 
                : 'border-gray-100 bg-white/80 backdrop-blur-xl'
            }`}
          >
            {/* Active indicator */}
            {index === currentStep && (
              <motion.div
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.div>
            )}

            <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r ${step.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4`}>
              <div className="text-white">
                {step.icon}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">{step.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-tight">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Live Example */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Live Example</h3>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`${userType}-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 sm:space-y-4"
          >
            {userType === 'brand' ? (
              // Brand Examples
              <>
                {currentStep === 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Skincare Campaign</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Goal: Brand awareness • Budget: $2,500</p>
                    </div>
                    <div className="sm:ml-auto">
                      <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Created
                      </span>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">3 Perfect Matches Found</h4>
                        <p className="text-xs sm:text-sm text-gray-600">AI matched with skincare creators</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {['✨ Sarah', '💄 Emma', '🧴 Maya'].map((creator, index) => (
                        <div key={index} className="text-center p-2 sm:p-3 bg-white rounded-lg border">
                          <div className="text-sm sm:text-lg mb-1">{creator}</div>
                          <div className="text-xs text-gray-600">95% match</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Content Review</h4>
                        <p className="text-xs sm:text-sm text-gray-600">2 posts ready for approval</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="p-2 sm:p-3 bg-white rounded-lg border text-center">
                        <div className="text-xs sm:text-sm font-medium">Instagram Post</div>
                        <div className="text-xs text-gray-600">Ready to approve</div>
                      </div>
                      <div className="p-2 sm:p-3 bg-white rounded-lg border text-center">
                        <div className="text-xs sm:text-sm font-medium">TikTok Video</div>
                        <div className="text-xs text-gray-600">Ready to approve</div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-purple-50 rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Campaign Results</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Live performance tracking</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border">
                        <div className="text-sm sm:text-lg font-bold text-green-600">342%</div>
                        <div className="text-xs text-gray-600">ROI</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border">
                        <div className="text-sm sm:text-lg font-bold text-blue-600">2.8K</div>
                        <div className="text-xs text-gray-600">Views</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border">
                        <div className="text-sm sm:text-lg font-bold text-purple-600">156</div>
                        <div className="text-xs text-gray-600">Clicks</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Creator Examples
              <>
                {currentStep === 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Beauty Creator Profile</h4>
                      <p className="text-xs sm:text-sm text-gray-600">125K followers • Skincare niche</p>
                    </div>
                    <div className="sm:ml-auto">
                      <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">5 Brand Opportunities</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Perfect matches for your audience</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {['🧴 GlowSkin', '✨ HydraCare', '💧 PureGlow'].map((brand, index) => (
                        <div key={index} className="text-center p-2 sm:p-3 bg-white rounded-lg border">
                          <div className="text-sm sm:text-lg mb-1">{brand}</div>
                          <div className="text-xs text-gray-600">$500-1.2K</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Content Creation</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Create authentic branded content</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="p-2 sm:p-3 bg-white rounded-lg border text-center">
                        <div className="text-xs sm:text-sm font-medium">Before/After</div>
                        <div className="text-xs text-gray-600">Skincare routine</div>
                      </div>
                      <div className="p-2 sm:p-3 bg-white rounded-lg border text-center">
                        <div className="text-xs sm:text-sm font-medium">Review Video</div>
                        <div className="text-xs text-gray-600">Product testing</div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-purple-50 rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Earnings & Growth</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Get paid and build relationships</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border">
                        <div className="text-sm sm:text-lg font-bold text-green-600">$850</div>
                        <div className="text-xs text-gray-600">This Month</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border">
                        <div className="text-sm sm:text-lg font-bold text-blue-600">12</div>
                        <div className="text-xs text-gray-600">Brand Partners</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-white rounded-lg border">
                        <div className="text-sm sm:text-lg font-bold text-purple-600">4.8★</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 