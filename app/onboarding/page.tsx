"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Building, 
  User, 
  Target, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star,
  Instagram,
  Youtube,
  Tiktok,
  DollarSign,
  Zap,
  Shield,
  Heart,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [userType, setUserType] = useState<'brand' | 'creator' | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    socialHandle: '',
    followers: '',
    niche: '',
    goals: [] as string[]
  })

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to ViralReach! 🎉',
      subtitle: 'The future of influencer marketing starts here'
    },
    {
      id: 'user-type',
      title: 'Who are you?',
      subtitle: 'Choose your path to success'
    },
    {
      id: 'brand-onboarding',
      title: 'Brand Onboarding',
      subtitle: 'Let\'s get your campaigns started'
    },
    {
      id: 'creator-onboarding',
      title: 'Creator Onboarding',
      subtitle: 'Ready to monetize your influence?'
    },
    {
      id: 'success',
      title: 'You\'re all set! 🚀',
      subtitle: 'Welcome to the ViralReach family'
    }
  ]

  const brandBenefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'AI-Powered Matching',
      description: 'Find perfect creators in seconds, not weeks'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Guaranteed Results',
      description: 'Performance-based campaigns with ROI tracking'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Brand Safety',
      description: 'Vetted creators and content approval system'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Launch campaigns in minutes, not months'
    }
  ]

  const creatorBenefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Higher Earnings',
      description: 'Earn 2-3x more than traditional platforms'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Authentic Partnerships',
      description: 'Work with brands that align with your values'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Creative Freedom',
      description: 'Full control over your content and voice'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Support',
      description: 'Join thousands of successful creators'
    }
  ]

  const socialProof = [
    { text: "Increased my brand awareness by 300%", author: "Sarah Chen, Glow Beauty" },
    { text: "Earned $15K in my first month", author: "Mike Rodriguez, Lifestyle Creator" },
    { text: "Found 50 perfect creators in 2 hours", author: "Emma Thompson, Skincare Brand" },
    { text: "Best platform for authentic partnerships", author: "Alex Kim, Fashion Influencer" }
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome to ViralReach!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of brands and creators who are already experiencing 
                the future of influencer marketing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Brands</h3>
                <p className="text-gray-600 mb-4">
                  Launch campaigns in minutes, not months. Find perfect creators instantly.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    AI-powered creator matching
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Guaranteed ROI tracking
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Brand safety protection
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 rounded-2xl">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Creators</h3>
                <p className="text-gray-600 mb-4">
                  Earn more, work with better brands, and grow your influence.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    2-3x higher earnings
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Authentic partnerships
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Creative freedom
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">What our community says</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {socialProof.map((proof, index) => (
                  <div key={index} className="text-left p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 italic">"{proof.text}"</p>
                    <p className="text-sm text-gray-500 mt-2">— {proof.author}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Let's Get Started
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Who are you?</h2>
              <p className="text-xl text-gray-600">Choose your path to success</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setUserType('brand')
                  handleNext()
                }}
                className="cursor-pointer bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border-2 border-transparent hover:border-purple-300 transition-all duration-300"
              >
                <div className="text-center space-y-4">
                  <div className="text-6xl">🏢</div>
                  <h3 className="text-2xl font-bold text-gray-900">I'm a Brand</h3>
                  <p className="text-gray-600">
                    I want to find creators to promote my products and grow my business
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Launch campaigns instantly
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      AI-powered matching
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Guaranteed results
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setUserType('creator')
                  handleNext()
                }}
                className="cursor-pointer bg-gradient-to-br from-pink-50 to-orange-50 p-8 rounded-2xl border-2 border-transparent hover:border-pink-300 transition-all duration-300"
              >
                <div className="text-center space-y-4">
                  <div className="text-6xl">✨</div>
                  <h3 className="text-2xl font-bold text-gray-900">I'm a Creator</h3>
                  <p className="text-gray-600">
                    I want to monetize my influence and work with amazing brands
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Earn 2-3x more
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Authentic partnerships
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Creative freedom
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Brand Onboarding</h2>
              <p className="text-xl text-gray-600">Let's get your campaigns started</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select your industry</option>
                  <option value="skincare">Skincare & Beauty</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="fitness">Fitness & Wellness</option>
                  <option value="food">Food & Beverage</option>
                  <option value="tech">Technology</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Goals (select all that apply)
                </label>
                <div className="space-y-2">
                  {['Brand Awareness', 'Sales & Conversions', 'Product Launches', 'Community Building'].map((goal) => (
                    <label key={goal} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.goals.includes(goal)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, goals: [...formData.goals, goal]})
                          } else {
                            setFormData({...formData, goals: formData.goals.filter(g => g !== goal)})
                          }
                        }}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                  <span>We'll match you with perfect creators in your industry</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                  <span>Launch your first campaign in under 10 minutes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                  <span>Track results and scale successful partnerships</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Creator Onboarding</h2>
              <p className="text-xl text-gray-600">Ready to monetize your influence?</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Platform
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram' },
                    { icon: <Youtube className="w-5 h-5" />, name: 'YouTube' },
                    { icon: <Tiktok className="w-5 h-5" />, name: 'TikTok' }
                  ].map((platform) => (
                    <button
                      key={platform.name}
                      onClick={() => setFormData({...formData, socialHandle: platform.name})}
                      className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-all ${
                        formData.socialHandle === platform.name
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {platform.icon}
                      <span className="text-sm font-medium">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follower Count
                </label>
                <select
                  value={formData.followers}
                  onChange={(e) => setFormData({...formData, followers: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select your follower range</option>
                  <option value="1k-10k">1K - 10K</option>
                  <option value="10k-50k">10K - 50K</option>
                  <option value="50k-100k">50K - 100K</option>
                  <option value="100k-500k">100K - 500K</option>
                  <option value="500k+">500K+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Niche
                </label>
                <select
                  value={formData.niche}
                  onChange={(e) => setFormData({...formData, niche: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select your niche</option>
                  <option value="beauty">Beauty & Skincare</option>
                  <option value="fashion">Fashion & Style</option>
                  <option value="fitness">Fitness & Wellness</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="food">Food & Cooking</option>
                  <option value="travel">Travel</option>
                  <option value="tech">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Your creator journey starts here</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                  <span>Get matched with brands that align with your values</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                  <span>Earn 2-3x more than traditional platforms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                  <span>Maintain full creative control over your content</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-pink-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-orange-700 transition-all duration-300"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-gray-900">
                You're all set! 🚀
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Welcome to the ViralReach family! We're excited to help you achieve your goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">Account created successfully!</span>
                </div>
                
                <div className="text-left space-y-3">
                  <p className="text-gray-700">
                    <strong>Next steps:</strong>
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span>Check your email for verification</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span>Complete your profile setup</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span>Start your first campaign or partnership</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <div className="text-sm text-gray-500">
                <p>Need help? <Link href="/contact" className="text-purple-600 hover:text-purple-500">Contact our support team</Link></p>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {step + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(((step + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 