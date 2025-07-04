"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, TrendingUp, Users, DollarSign, BarChart3, Star, Play, ArrowRight, Camera, Heart, MessageCircle, Share2, Eye, Target, Clock, Globe, Award } from 'lucide-react'

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
  const [formData, setFormData] = useState({
    goal: 'Brand Awareness',
    budget: '$2,000 - $5,000',
    audience: 'Women 25-35, Lifestyle & Fashion',
    duration: '2 weeks'
  })

  return (
    <div className="p-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Your Campaign</h2>
        
        <div className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">Campaign Goal</label>
            <div className="grid grid-cols-2 gap-4">
              {['Brand Awareness', 'Website Traffic', 'Sales Growth', 'App Downloads'].map((goal) => (
                <div 
                  key={goal}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.goal === goal 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, goal})}
                >
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-purple-600" />
                    <span className="font-medium">{goal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">Budget Range</label>
            <select 
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
            >
              <option>$500 - $2,000</option>
              <option>$2,000 - $5,000</option>
              <option>$5,000 - $10,000</option>
              <option>$10,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">Target Audience</label>
            <textarea 
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
              rows={3}
              value={formData.audience}
              onChange={(e) => setFormData({...formData, audience: e.target.value})}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl text-center"
          >
            <CheckCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Campaign Created!</h3>
            <p className="text-lg opacity-90">Now let's find the perfect creators for your brand</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function CreatorMatchingStep() {
  const [matchProgress, setMatchProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setMatchProgress(prev => {
        if (prev < 100) {
          return prev + 10
        } else {
          setShowResults(true)
          return 100
        }
      })
    }, 200)
    return () => clearInterval(timer)
  }, [])

  const creators = [
    { 
      name: "Sarah Style", 
      handle: "@sarahstyle",
      followers: "125K", 
      engagement: "8.5%", 
      niche: "Fashion & Lifestyle",
      match: "98%",
      verified: true,
      posts: 1250,
      avgViews: "15K"
    },
    { 
      name: "Emma Lifestyle", 
      handle: "@emmalifestyle",
      followers: "89K", 
      engagement: "9.2%", 
      niche: "Lifestyle & Beauty",
      match: "95%",
      verified: true,
      posts: 980,
      avgViews: "12K"
    },
    { 
      name: "Maya Fashion", 
      handle: "@mayafashion",
      followers: "156K", 
      engagement: "7.8%", 
      niche: "Fashion & Beauty",
      match: "92%",
      verified: true,
      posts: 1580,
      avgViews: "20K"
    }
  ]

  return (
    <div className="p-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">AI Creator Matching</h2>
      
      {!showResults ? (
        <div className="text-center">
          <div className="w-32 h-32 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-2xl text-gray-600 mb-6">Finding perfect creators for your brand...</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${matchProgress}%` }}
            ></div>
          </div>
          <p className="text-lg text-gray-500">{matchProgress}% complete</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-600">3 Perfect Matches Found!</h3>
            <p className="text-lg text-gray-600">AI analyzed 50,000+ creators to find your ideal partners</p>
          </div>
          
          {creators.map((creator, index) => (
            <motion.div 
              key={creator.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {creator.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-2xl font-bold text-gray-800">{creator.name}</h4>
                    {creator.verified && <CheckCircle className="w-6 h-6 text-blue-500" />}
                  </div>
                  <p className="text-lg text-gray-600 mb-4">{creator.handle} • {creator.niche}</p>
                  
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{creator.followers}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{creator.engagement}</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{creator.avgViews}</div>
                      <div className="text-sm text-gray-600">Avg Views</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">{creator.posts}</div>
                      <div className="text-sm text-gray-600">Posts</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{creator.match}</div>
                  <div className="text-sm text-gray-600">Match Score</div>
                  <button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
                    Select Creator
                  </button>
                </div>
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
      setStep(prev => prev < 3 ? prev + 1 : 3)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  const steps = [
    { icon: "📝", title: "Content Brief Sent", desc: "Creator guidelines and requirements shared" },
    { icon: "📸", title: "Content Created", desc: "Professional photos and videos produced" },
    { icon: "✅", title: "Content Approved", desc: "Brand review and approval completed" },
    { icon: "🚀", title: "Content Published", desc: "Live across all social platforms" }
  ]

  return (
    <div className="p-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Content Collaboration</h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              SS
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Sarah Style</h3>
              <p className="text-gray-600">@sarahstyle • Fashion Influencer</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Camera className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">Content Preview</span>
            </div>
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Camera className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-600">Fashion lookbook featuring your brand</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm">2.1K</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">145</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">89</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {steps.map((stepItem, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{ 
                opacity: index <= step ? 1 : 0.3,
                scale: index <= step ? 1 : 0.95
              }}
              className={`flex items-center space-x-4 p-4 rounded-xl ${
                index <= step ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
              }`}
            >
              <div className="text-3xl">{stepItem.icon}</div>
              <div className="flex-1">
                <div className={`text-lg font-semibold ${index <= step ? 'text-green-800' : 'text-gray-600'}`}>
                  {stepItem.title}
                </div>
                <div className={`text-sm ${index <= step ? 'text-green-600' : 'text-gray-500'}`}>
                  {stepItem.desc}
                </div>
              </div>
              {index <= step && <CheckCircle className="w-6 h-6 text-green-500" />}
            </motion.div>
          ))}
        </div>
      </div>
      
      {step >= 3 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg text-center"
        >
          <TrendingUp className="w-6 h-6 mx-auto mb-2" />
          <div className="font-semibold">Campaign is now live and performing!</div>
        </motion.div>
      )}
    </div>
  )
}

function MetricsStep() {
  const [metrics, setMetrics] = useState({
    views: 245000,
    engagement: 8.5,
    clicks: 12400,
    conversions: 340,
    reach: 189000,
    impressions: 567000
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        views: prev.views + Math.floor(Math.random() * 500),
        engagement: +(prev.engagement + (Math.random() - 0.5) * 0.1).toFixed(1),
        clicks: prev.clicks + Math.floor(Math.random() * 25),
        conversions: prev.conversions + Math.floor(Math.random() * 3),
        reach: prev.reach + Math.floor(Math.random() * 200),
        impressions: prev.impressions + Math.floor(Math.random() * 800)
      }))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Live Campaign Performance</h2>
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-semibold">Live Updates Every Second</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-2xl text-center border-2 border-blue-100">
          <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.views.toLocaleString()}</div>
          <div className="text-lg text-gray-600">Total Views</div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-2xl text-center border-2 border-green-100">
          <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-green-600 mb-2">{metrics.engagement}%</div>
          <div className="text-lg text-gray-600">Engagement Rate</div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-2xl text-center border-2 border-purple-100">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-purple-600 mb-2">{metrics.reach.toLocaleString()}</div>
          <div className="text-lg text-gray-600">Unique Reach</div>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-2xl text-center border-2 border-orange-100">
          <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-orange-600 mb-2">{metrics.impressions.toLocaleString()}</div>
          <div className="text-lg text-gray-600">Impressions</div>
        </div>
        
        <div className="bg-indigo-50 p-6 rounded-2xl text-center border-2 border-indigo-100">
          <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-indigo-600 mb-2">{metrics.clicks.toLocaleString()}</div>
          <div className="text-lg text-gray-600">Link Clicks</div>
        </div>
        
        <div className="bg-pink-50 p-6 rounded-2xl text-center border-2 border-pink-100">
          <DollarSign className="w-12 h-12 text-pink-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-pink-600 mb-2">{metrics.conversions}</div>
          <div className="text-lg text-gray-600">Conversions</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-2xl text-center">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold mb-2">340%</div>
            <div className="text-lg opacity-90">ROI Achieved</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">$8,500</div>
            <div className="text-lg opacity-90">Revenue Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24hrs</div>
            <div className="text-lg opacity-90">Campaign Duration</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentStep() {
  return (
    <div className="p-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Results & Payment</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Campaign Performance</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Total Reach</span>
                <span className="font-bold text-green-600">2.4M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Engagement Rate</span>
                <span className="font-bold text-blue-600">8.7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Click-through Rate</span>
                <span className="font-bold text-purple-600">12.3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Conversions</span>
                <span className="font-bold text-orange-600">1,247</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Payment</span>
                <span className="font-semibold">$2,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Performance Bonus</span>
                <span className="font-semibold text-green-600">+$750</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-semibold text-red-600">-$325</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-gray-800">Total Payout</span>
                <span className="font-bold text-green-600 text-xl">$2,925</span>
              </div>
            </div>
            
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Payment Verified & Released</span>
              </div>
              <p className="text-sm text-green-700 mt-1">Funds transferred to creator's account</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Campaign Success!</h3>
            <p className="text-lg mb-4">This campaign exceeded all performance targets and delivered exceptional ROI.</p>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">340%</div>
                <div className="text-sm opacity-90">ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$8,500</div>
                <div className="text-sm opacity-90">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm opacity-90">Creator Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 