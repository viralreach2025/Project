"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, TrendingUp, Users, DollarSign, BarChart3, Star, Play, ArrowRight } from 'lucide-react'

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demoSteps = [
    {
      title: "ViralReach",
      subtitle: "Performance-Driven Creator Marketing",
      component: <HeroStep />
    },
    {
      title: "1. Create Your Campaign",
      subtitle: "Set goals, budget, and target audience",
      component: <CampaignCreationStep />
    },
    {
      title: "2. Find Perfect Creators",
      subtitle: "AI matches you with verified influencers",
      component: <CreatorMatchingStep />
    },
    {
      title: "3. Launch & Collaborate",
      subtitle: "Approve content and go live instantly",
      component: <CollaborationStep />
    },
    {
      title: "4. Track Performance",
      subtitle: "Real-time metrics and transparent results",
      component: <MetricsStep />
    },
    {
      title: "5. Pay for Results",
      subtitle: "Only pay for verified performance",
      component: <PaymentStep />
    }
  ]

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < demoSteps.length - 1) {
            return prev + 1
          } else {
            setIsPlaying(false)
            return 0
          }
        })
              }, 3500) // 3.5 seconds per step for ~21 seconds total

      return () => clearInterval(timer)
    }
  }, [isPlaying, demoSteps.length])

  const startDemo = () => {
    setCurrentStep(0)
    setIsPlaying(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {!isPlaying && currentStep === 0 ? (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-white font-bold text-2xl">VR</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">ViralReach</h1>
            <p className="text-2xl text-gray-600 mb-12">Performance-Driven Creator Marketing</p>
            <button 
              onClick={startDemo}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold flex items-center space-x-3 mx-auto hover:shadow-lg transition-all"
            >
              <Play className="w-6 h-6" />
              <span>Start Demo</span>
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Info */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center lg:text-left"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-white font-bold text-lg">VR</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {demoSteps[currentStep].title}
              </h1>
              <p className="text-2xl text-gray-600 mb-8">
                {demoSteps[currentStep].subtitle}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {demoSteps.length}
              </p>
            </motion.div>

            {/* Right Side - Demo Component */}
            <motion.div
              key={`demo-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              {demoSteps[currentStep].component}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

function HeroStep() {
  return (
    <div className="text-center">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-50 p-4 rounded-lg">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">50K+</div>
          <div className="text-sm text-gray-600">Creators</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">340%</div>
          <div className="text-sm text-gray-600">Avg ROI</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-gray-600">Verified</div>
        </div>
      </div>
      <p className="text-lg text-gray-600">
        Connect with vetted creators who actually deliver results
      </p>
    </div>
  )
}



function CampaignCreationStep() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-center">Create Your Campaign</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Goal</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <option>Increase Brand Awareness</option>
            <option>Drive Website Traffic</option>
            <option>Boost Sales</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
            <option>$500 - $2,000</option>
            <option>$2,000 - $5,000</option>
            <option>$5,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
          <input 
            className="w-full p-3 border border-gray-300 rounded-lg" 
            placeholder="Age 18-35, Health & Fitness enthusiasts"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

function CreatorMatchingStep() {
  const creators = [
    { name: "@sarah_fitness", followers: "45K", engagement: "8.5%", niche: "Health & Fitness" },
    { name: "@mike_wellness", followers: "38K", engagement: "9.2%", niche: "Wellness" },
    { name: "@fit_jenny", followers: "52K", engagement: "7.8%", niche: "Fitness" }
  ]

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-center">Matched Creators</h3>
      <div className="space-y-3">
        {creators.map((creator, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-semibold">{creator.name}</div>
              <div className="text-sm text-gray-600">{creator.niche}</div>
            </div>
            <div className="text-right">
              <div className="text-sm">{creator.followers} followers</div>
              <div className="text-sm text-green-600">{creator.engagement} engagement</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CollaborationStep() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-center">Content Collaboration</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">@sarah_fitness</span>
            <span className="text-sm text-blue-600">Draft Submitted</span>
          </div>
          <p className="text-sm text-gray-600">Posted workout routine featuring your protein powder...</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">@mike_wellness</span>
            <span className="text-sm text-green-600">Content Approved ✓</span>
          </div>
          <p className="text-sm text-gray-600">Morning routine video with your supplements...</p>
        </div>
      </div>
    </div>
  )
}

function MetricsStep() {
  const [metrics, setMetrics] = useState({
    views: 245000,
    engagement: 8.5,
    clicks: 12400,
    conversions: 340
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        views: prev.views + Math.floor(Math.random() * 1000),
        engagement: +(prev.engagement + (Math.random() - 0.5) * 0.2).toFixed(1),
        clicks: prev.clicks + Math.floor(Math.random() * 50),
        conversions: prev.conversions + Math.floor(Math.random() * 5)
      }))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-center">Live Campaign Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{metrics.views.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{metrics.engagement}%</div>
          <div className="text-sm text-gray-600">Engagement</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">{metrics.clicks.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Clicks</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">{metrics.conversions}</div>
          <div className="text-sm text-gray-600">Conversions</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Updates</span>
        </div>
      </div>
    </div>
  )
}

function PaymentStep() {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-3xl font-bold text-green-600 mb-2">340% ROI</h3>
        <p className="text-gray-600">Campaign performance exceeded goals</p>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-700">Campaign Budget</span>
          <span className="font-semibold">$2,500</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="text-green-700">Revenue Generated</span>
          <span className="font-semibold text-green-600">$8,500</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-blue-700">Creator Payment</span>
          <span className="font-semibold text-blue-600">$750</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
          <span className="text-purple-700 font-semibold">Your Net Profit</span>
          <span className="font-bold text-purple-600 text-lg">$6,000</span>
        </div>
      </div>

      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg"
      >
        <DollarSign className="w-8 h-8 mx-auto mb-2" />
        <p className="text-lg font-semibold mb-1">Payment Processed</p>
        <p className="text-sm opacity-90">Only paid for verified results</p>
      </motion.div>
    </div>
  )
} 