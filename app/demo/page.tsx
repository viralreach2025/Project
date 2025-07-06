'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Award,
  CheckCircle,
  Target,
  DollarSign,
  BarChart3,
  Shield,
  Clock,
  Camera
} from 'lucide-react'

function HeroStep() {
  return (
    <div className="p-12 text-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <div className="text-4xl font-bold text-purple-600">50K+</div>
          <div className="text-lg text-gray-600">Verified Creators</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <div className="text-4xl font-bold text-green-600">340%</div>
          <div className="text-lg text-gray-600">Average ROI</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <div className="text-4xl font-bold text-blue-600">100%</div>
          <div className="text-lg text-gray-600">Results Verified</div>
        </div>
      </div>
      <p className="text-2xl text-gray-700 leading-relaxed">
        Connect with authentic creators who deliver measurable results for your brand
      </p>
    </div>
  )
}

function CampaignCreationStep() {
  return (
    <div className="p-12">
      <h3 className="text-2xl font-semibold mb-8 text-center">Create Your Campaign</h3>
      <div className="space-y-6">
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="block text-lg font-medium text-gray-700 mb-3">Campaign Goal</label>
          <div className="bg-purple-100 text-purple-800 px-4 py-3 rounded-lg border-2 border-purple-200 text-lg">
            Brand Awareness & Sales
          </div>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="block text-lg font-medium text-gray-700 mb-3">Target Audience</label>
          <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-lg border-2 border-blue-200 text-lg">
            Women 25-35, Lifestyle & Fashion
          </div>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl">
          <label className="block text-lg font-medium text-gray-700 mb-3">Budget Range</label>
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg border-2 border-green-200 text-lg">
            $2,000 - $5,000
          </div>
        </div>
        <motion.div 
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl text-center"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <CheckCircle className="w-8 h-8 mx-auto mb-3" />
          <span className="font-semibold text-xl">Campaign Created!</span>
        </motion.div>
      </div>
    </div>
  )
}

function CreatorMatchingStep() {
  const [matchProgress, setMatchProgress] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setMatchProgress(prev => prev < 100 ? prev + 20 : 100)
    }, 300)
    return () => clearInterval(timer)
  }, [])

  const creators = [
    { name: "Sarah Style", niche: "Fashion", followers: "125K", match: "98%" },
    { name: "Emma Lifestyle", niche: "Lifestyle", followers: "89K", match: "95%" },
    { name: "Maya Fashion", niche: "Fashion", followers: "156K", match: "92%" }
  ]

  return (
    <div className="p-12">
      <h3 className="text-2xl font-semibold mb-8 text-center">AI Creator Matching</h3>
      
      {matchProgress < 100 ? (
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 mb-6">Finding perfect creators...</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${matchProgress}%` }}
            ></div>
          </div>
          <p className="text-lg text-gray-500 mt-3">{matchProgress}% complete</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <p className="font-semibold text-green-600 text-xl">3 Perfect Matches Found!</p>
          </div>
          {creators.map((creator, index) => (
            <motion.div 
              key={creator.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-4 p-4 bg-white border-2 border-green-200 rounded-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {creator.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{creator.name}</div>
                <div className="text-gray-600">{creator.niche} • {creator.followers}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{creator.match}</div>
                <div className="text-gray-500">match</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

function CollaborationStep() {
  const [step, setStep] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => prev < 2 ? prev + 1 : prev)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const steps = [
    { title: "Content Draft Submitted", desc: "Creator uploaded campaign content", icon: "📝" },
    { title: "Brand Review & Approval", desc: "Content approved with minor edits", icon: "✅" },
    { title: "Content Goes Live", desc: "Post published across platforms", icon: "🚀" }
  ]

  return (
    <div className="p-12">
      <h3 className="text-2xl font-semibold mb-8 text-center">Launch & Collaborate</h3>
      <div className="space-y-6">
        {steps.map((stepItem, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ 
              opacity: index <= step ? 1 : 0.3,
              scale: index <= step ? 1 : 0.95
            }}
            className={`flex items-center space-x-6 p-6 rounded-xl ${
              index <= step ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
            }`}
          >
            <div className="text-3xl">{stepItem.icon}</div>
            <div className="flex-1">
              <div className={`font-semibold text-xl ${index <= step ? 'text-green-800' : 'text-gray-600'}`}>
                {stepItem.title}
              </div>
              <div className={`text-lg ${index <= step ? 'text-green-600' : 'text-gray-500'}`}>
                {stepItem.desc}
              </div>
            </div>
            {index <= step && <CheckCircle className="w-8 h-8 text-green-500" />}
          </motion.div>
        ))}
        
        {step >= 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl text-center"
          >
            <TrendingUp className="w-8 h-8 mx-auto mb-3" />
            <div className="font-semibold text-xl">Campaign is now live and performing!</div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function MetricsStep() {
  const [metrics, setMetrics] = useState({
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    clicks: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => ({
        views: Math.min(prev.views + Math.floor(Math.random() * 500), 15000),
        likes: Math.min(prev.likes + Math.floor(Math.random() * 50), 1200),
        comments: Math.min(prev.comments + Math.floor(Math.random() * 10), 180),
        shares: Math.min(prev.shares + Math.floor(Math.random() * 20), 450),
        clicks: Math.min(prev.clicks + Math.floor(Math.random() * 30), 800)
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="p-12">
      <h3 className="text-2xl font-semibold mb-8 text-center">Live Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl text-center">
          <div className="text-4xl font-bold mb-2">{metrics.views.toLocaleString()}</div>
          <div className="text-lg">Views</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center">
          <div className="text-4xl font-bold mb-2">{metrics.likes.toLocaleString()}</div>
          <div className="text-lg">Likes</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl text-center">
          <div className="text-4xl font-bold mb-2">{metrics.comments.toLocaleString()}</div>
          <div className="text-lg">Comments</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl text-center">
          <div className="text-4xl font-bold mb-2">{metrics.shares.toLocaleString()}</div>
          <div className="text-lg">Shares</div>
        </div>
      </div>
      <div className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl text-center">
        <div className="text-4xl font-bold mb-2">{metrics.clicks.toLocaleString()}</div>
        <div className="text-lg">Website Clicks</div>
      </div>
      <div className="mt-6 flex items-center justify-center space-x-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-lg font-medium">Live Updates</span>
      </div>
    </div>
  )
}

function PaymentStep() {
  return (
    <div className="p-12">
      <h3 className="text-2xl font-semibold mb-8 text-center">Results & Payment</h3>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl text-center">
          <div className="text-4xl font-bold mb-2">$3,450</div>
          <div className="text-xl">Total Revenue Generated</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center">
          <div className="text-4xl font-bold mb-2">340%</div>
          <div className="text-xl">ROI Achieved</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl text-center">
          <div className="text-4xl font-bold mb-2">$1,200</div>
          <div className="text-xl">Creator Payment Released</div>
        </div>
        <motion.div 
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl text-center"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <CheckCircle className="w-8 h-8 mx-auto mb-3" />
          <div className="font-semibold text-xl">Payment Verified & Released!</div>
          <div className="text-lg">Only pay for verified results</div>
        </motion.div>
      </div>
    </div>
  )
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demoSteps = [
    {
      title: "Welcome to ViralReach",
      subtitle: "Performance-Driven Creator Marketing",
      component: <HeroStep />
    },
    {
      title: "1. Create Campaign",
      subtitle: "Set goals, budget, and target audience",
      component: <CampaignCreationStep />
    },
    {
      title: "2. AI Creator Matching",
      subtitle: "Find perfect creators for your brand",
      component: <CreatorMatchingStep />
    },
    {
      title: "3. Content Collaboration",
      subtitle: "Approve and launch content",
      component: <CollaborationStep />
    },
    {
      title: "4. Live Performance",
      subtitle: "Real-time campaign metrics",
      component: <MetricsStep />
    },
    {
      title: "5. Results & Payment",
      subtitle: "Pay only for verified results",
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
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [isPlaying, demoSteps.length])

  const startDemo = () => {
    setCurrentStep(0)
    setIsPlaying(true)
  }

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {!isPlaying && currentStep === 0 ? (
          <motion.div 
            className="text-center pt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-white font-bold text-3xl">VR</span>
            </div>
            <h1 className="text-7xl font-bold text-gray-900 mb-4">ViralReach</h1>
            <p className="text-3xl text-gray-600 mb-12">Performance-Driven Creator Marketing</p>
            <button 
              onClick={startDemo}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-16 py-5 rounded-full text-2xl font-semibold flex items-center space-x-4 mx-auto hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Play className="w-8 h-8" />
              <span>Start Interactive Demo</span>
            </button>
          </motion.div>
        ) : (
          <div className="pt-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-8"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
                  <span className="text-white font-bold text-2xl">VR</span>
                </div>
                <h1 className="text-6xl font-bold text-gray-900 mb-6">
                  {demoSteps[currentStep].title}
                </h1>
                <p className="text-3xl text-gray-600 mb-12">
                  {demoSteps[currentStep].subtitle}
                </p>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-lg text-gray-500 mb-8">
                  Step {currentStep + 1} of {demoSteps.length}
                </p>

                <div className="flex space-x-4">
                  <button 
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={currentStep === demoSteps.length - 1}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              <motion.div
                key={`demo-${currentStep}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                {demoSteps[currentStep].component}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 