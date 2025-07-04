"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Menu, X, ArrowRight, Clock, Calendar, Camera, Users, Zap, Award, Heart, Droplets, Sun, Shield, Star, TrendingUp, Eye, Target, Sparkles, Crown, Gift, MessageSquare, BarChart3, Palette, Verified, Play, AlertTriangle, DollarSign, ThumbsDown, ThumbsUp, Timer, CheckSquare, ChevronRight, ChevronLeft, Send, Mail, User, Building, Instagram, Youtube, Facebook, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function SkincarePage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePainPoint, setActivePainPoint] = useState(0)
  const [activeSolution, setActiveSolution] = useState(0)
  
  // Auto-advance pain points
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePainPoint(prev => (prev + 1) % painPoints.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Auto-advance solutions
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSolution(prev => (prev + 1) % solutions.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const painPoints = [
    {
      icon: <ThumbsDown className="w-8 h-8" />,
      title: "Fake Product Testing",
      description: "Creators post glowing reviews after using products for just 1-2 days. No real results, no authenticity.",
      impact: "Brands lose trust, creators lose credibility",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Wasted Marketing Budget",
      description: "Spending $5K+ on influencers who never post or post fake content. No ROI tracking.",
      impact: "Average 67% of influencer marketing budget wasted",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Wrong Audience Targeting",
      description: "Connecting with creators whose followers don't match your target demographic or skin concerns.",
      impact: "Low engagement, poor conversion rates",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Timer className="w-8 h-8" />,
      title: "No Real Progress Proof",
      description: "Before/after photos are often staged or edited. No genuine transformation documentation.",
      impact: "Customers don't trust the results",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const solutions = [
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: "90-Day Authentic Testing",
      description: "Creators must test products for minimum 90 days with weekly progress documentation. No quick posts allowed.",
      benefit: "Real results, genuine transformations",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "AI-Powered Creator Matching",
      description: "Match brands with creators based on skin type, audience demographics, and brand values. 98% accuracy rate.",
      benefit: "Perfect audience alignment",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Performance Tracking",
      description: "Track engagement, conversions, and ROI in real-time. See exactly what's working and what's not.",
      benefit: "Transparent results, measurable ROI",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Verified className="w-8 h-8" />,
      title: "Verified Progress Documentation",
      description: "Timestamped before/during/after photos with skin analysis. No editing, no staging, just real results.",
      benefit: "Authentic proof of product efficacy",
      color: "from-pink-500 to-rose-500"
    }
  ]

  const creatorPainPoints = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Low Pay for Fake Content",
      description: "Getting paid $200-500 for quick promotional posts that hurt your credibility",
      solution: "Earn $2K-$15K for authentic 90-day campaigns"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Pressure to Post Fake Reviews",
      description: "Brands demanding positive reviews regardless of actual results",
      solution: "Only work with brands that value authenticity"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Audience Trust Issues",
      description: "Losing followers when they discover you're posting fake reviews",
      solution: "Build genuine trust through real transformation stories"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "No Long-term Partnerships",
      description: "One-off campaigns with no recurring income opportunities",
      solution: "Build lasting relationships with premium brands"
    }
  ]

  const brandPainPoints = [
    {
      icon: <ThumbsDown className="w-6 h-6" />,
      title: "Fake Influencer Followers",
      description: "Paying for creators with 50K+ followers, but only 2K are real",
      solution: "Verified creator profiles with real audience metrics"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "No ROI Tracking",
      description: "Spending thousands on campaigns with no way to measure success",
      solution: "Real-time analytics and conversion tracking"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Wrong Creator Matching",
      description: "Working with creators whose audience doesn't match your target market",
      solution: "AI-powered matching for perfect audience alignment"
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Quick Promotional Posts",
      description: "Creators posting one-time ads that don't show real product benefits",
      solution: "Extended testing periods for authentic content"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                SkinConnect
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Main Platform
              </Link>
              <a href="#problems" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Problems</a>
              <a href="#solutions" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Solutions</a>
              <a href="#creators" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">For Creators</a>
              <a href="#brands" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">For Brands</a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/50 backdrop-blur-sm"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-t border-pink-100"
            >
              <div className="px-4 py-4 space-y-3">
                <Link href="/" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">
                  Main Platform
                </Link>
                <a href="#problems" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">Problems</a>
                <a href="#solutions" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">Solutions</a>
                <a href="#creators" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">For Creators</a>
                <a href="#brands" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">For Brands</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-red-100 border border-red-200 rounded-full px-6 py-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-700">The Skincare Industry Has a Problem</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-800">Fake Reviews Are </span>
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Killing Your Business
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                <span className="font-semibold text-red-600">67% of skincare brands waste their marketing budget</span> on influencers who post fake reviews. 
                <br />
                <span className="text-pink-600 font-semibold">We're fixing this with authentic 90-day product testing.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <span>I'm a Creator - Show Me Real Opportunities</span>
                <Crown className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <span>I'm a Brand - Stop Wasting Money</span>
                <Verified className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {[
                { number: "67%", label: "Marketing Budget Wasted", icon: <DollarSign className="w-6 h-6" />, color: "text-red-500" },
                { number: "89%", label: "Fake Reviews Posted", icon: <ThumbsDown className="w-6 h-6" />, color: "text-orange-500" },
                { number: "2-3 days", label: "Average Testing Time", icon: <Timer className="w-6 h-6" />, color: "text-yellow-500" },
                { number: "0%", label: "ROI Tracking", icon: <BarChart3 className="w-6 h-6" />, color: "text-purple-500" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className={`mb-2 flex justify-center ${stat.color}`}>{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">The </span>
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Real Problems
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These are the issues that are costing brands millions and destroying creator credibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {painPoints.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activePainPoint === index 
                      ? 'bg-red-50 border-2 border-red-200 shadow-xl' 
                      : 'bg-gray-50 hover:bg-red-50/50'
                  }`}
                  onClick={() => setActivePainPoint(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${problem.color} text-white`}>
                      {problem.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{problem.title}</h3>
                      <p className="text-gray-600 mb-3">{problem.description}</p>
                      <div className="text-sm font-semibold text-red-600">{problem.impact}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <motion.div
                key={activePainPoint}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${painPoints[activePainPoint].color} flex items-center justify-center text-white mb-6`}>
                  {painPoints[activePainPoint].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{painPoints[activePainPoint].title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{painPoints[activePainPoint].description}</p>
                <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                  <div className="font-semibold text-red-800">Impact:</div>
                  <div className="text-red-700">{painPoints[activePainPoint].impact}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">Our </span>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we're fixing the skincare industry's biggest problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <motion.div
                key={activeSolution}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-2 border-green-200 rounded-3xl p-8 shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${solutions[activeSolution].color} flex items-center justify-center text-white mb-6`}>
                  {solutions[activeSolution].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{solutions[activeSolution].title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{solutions[activeSolution].description}</p>
                <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800">Benefit:</div>
                  <div className="text-green-700">{solutions[activeSolution].benefit}</div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeSolution === index 
                      ? 'bg-white border-2 border-green-200 shadow-xl' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                  onClick={() => setActiveSolution(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${solution.color} text-white`}>
                      {solution.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{solution.title}</h3>
                      <p className="text-gray-600 mb-3">{solution.description}</p>
                      <div className="text-sm font-semibold text-green-600">{solution.benefit}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">How </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                It Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The simple 4-step process that creates authentic skincare collaborations
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                step: "1",
                title: "Match & Connect",
                description: "AI matches brands with creators based on skin type, audience, and brand values",
                icon: <Target className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500",
                details: [
                  "Skin type compatibility analysis",
                  "Audience demographic matching",
                  "Brand value alignment",
                  "Creator verification process"
                ]
              },
              {
                step: "2",
                title: "Plan & Prepare",
                description: "90-day testing plan with weekly milestones and content strategy",
                icon: <Calendar className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500",
                details: [
                  "90-day testing timeline",
                  "Weekly progress milestones",
                  "Content creation strategy",
                  "Performance benchmarks"
                ]
              },
              {
                step: "3",
                title: "Test & Document",
                description: "Authentic product testing with timestamped progress documentation",
                icon: <Camera className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500",
                details: [
                  "Weekly progress photos",
                  "Timestamped documentation",
                  "Real skin analysis",
                  "No editing or staging"
                ]
              },
              {
                step: "4",
                title: "Launch & Track",
                description: "Authentic content launch with real-time performance analytics",
                icon: <TrendingUp className="w-8 h-8" />,
                color: "from-orange-500 to-red-500",
                details: [
                  "Authentic content creation",
                  "Real-time engagement tracking",
                  "Conversion analytics",
                  "ROI measurement"
                ]
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${process.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {process.step}
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${process.color} flex items-center justify-center text-white`}>
                      {process.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{process.title}</h3>
                  <p className="text-gray-600 mb-4">{process.description}</p>
                  
                  <ul className="space-y-2">
                    {process.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Timeline Visualization */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">90-Day Authentic Testing Timeline</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    30
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Days 1-30</h4>
                  <p className="text-gray-600 text-sm">Initial testing period with baseline documentation and weekly progress updates</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    60
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Days 31-60</h4>
                  <p className="text-gray-600 text-sm">Mid-point assessment with detailed progress analysis and content creation</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    90
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Days 61-90</h4>
                  <p className="text-gray-600 text-sm">Final results documentation and authentic content launch with real metrics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Creator vs Brand Process */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Creator Process */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Crown className="w-6 h-6 text-pink-500 mr-3" />
                For Content Creators
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Apply & Get Verified",
                    description: "Submit your profile and get verified as an authentic creator"
                  },
                  {
                    step: "2", 
                    title: "Receive Product & Plan",
                    description: "Get matched with brands and receive products with testing plan"
                  },
                  {
                    step: "3",
                    title: "Test & Document",
                    description: "Test products for 90 days with weekly progress documentation"
                  },
                  {
                    step: "4",
                    title: "Create & Earn",
                    description: "Create authentic content and earn $2K-$15K per campaign"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Process */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Verified className="w-6 h-6 text-blue-500 mr-3" />
                For Skincare Brands
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Set Campaign Goals",
                    description: "Define your objectives, target audience, and budget"
                  },
                  {
                    step: "2",
                    title: "Get AI Matches",
                    description: "Receive perfectly matched creators based on your criteria"
                  },
                  {
                    step: "3", 
                    title: "Monitor Progress",
                    description: "Track authentic testing progress with real-time updates"
                  },
                  {
                    step: "4",
                    title: "Launch & Measure",
                    description: "Launch authentic content and measure real ROI"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Creators Section */}
      <section id="creators" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">For </span>
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Content Creators
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop posting fake reviews. Start earning real money for authentic content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Current Pain Points:</h3>
              <div className="space-y-4">
                {creatorPainPoints.map((pain, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="bg-red-500 p-2 rounded-lg text-white">
                      {pain.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{pain.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{pain.description}</p>
                      <div className="text-sm font-semibold text-green-600">→ {pain.solution}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">What You Get With SkinConnect:</h3>
              <div className="space-y-4">
                {[
                  "Earn $2K-$15K per authentic campaign",
                  "90-day testing periods for real results",
                  "Work only with verified premium brands",
                  "Build genuine audience trust",
                  "Long-term partnership opportunities",
                  "Real-time performance analytics"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Brands Section */}
      <section id="brands" className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">For </span>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Skincare Brands
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop wasting money on fake influencers. Get real results from authentic creators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">What You Get With SkinConnect:</h3>
              <div className="space-y-4">
                {[
                  "Verified creators with real audiences",
                  "90-day authentic product testing",
                  "Real-time ROI and conversion tracking",
                  "Perfect audience matching (98% accuracy)",
                  "Authentic before/during/after documentation",
                  "Transparent performance metrics"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Current Pain Points:</h3>
              <div className="space-y-4">
                {brandPainPoints.map((pain, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="bg-red-500 p-2 rounded-lg text-white">
                      {pain.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{pain.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{pain.description}</p>
                      <div className="text-sm font-semibold text-green-600">→ {pain.solution}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Fix the Skincare Industry?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the movement to eliminate fake reviews and create authentic beauty connections
            </p>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Join the Authentic Beauty Movement
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Take our personalized assessment to see how we can help you eliminate fake reviews and build authentic partnerships in the skincare industry.
                </p>
                
                <Link 
                  href="/"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
                >
                  <span>Take the Assessment</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <p className="text-sm text-gray-500 mt-4">
                  You'll be redirected to our main platform for a personalized experience
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">SkinConnect</span>
              </div>
              <p className="text-gray-400">
                Eliminating fake reviews, one authentic collaboration at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Creators</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Join Authentic Platform</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Real Earnings</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Creator Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Brands</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Stop Wasting Money</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Real ROI Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Authentic Partnerships</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkinConnect. Authentic beauty, real results.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 