"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ChevronDown, Menu, X, ArrowRight, Search, Shield, TrendingUp, Users, DollarSign, BarChart3, MessageSquare, Star, Clock, Camera, Target, Eye, Zap, Crown, TestTube, Lightbulb } from 'lucide-react'
import HeroDemo from './components/HeroDemo'
import { DashboardPreview } from './components/DashboardPreview'
import { saveWaitlistEntry } from '../lib/database'
import WaitlistQuiz from './components/WaitlistQuiz'
import CreatorStoriesCarousel from './components/CreatorStoriesCarousel'

// Typewriter component
function TypewriterText({ text, speed = 100, deleteSpeed = 50, delay = 2000 }: { 
  text: string; 
  speed?: number; 
  deleteSpeed?: number; 
  delay?: number; 
}) {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else {
          // Start deleting after delay
          setTimeout(() => setIsDeleting(true), delay)
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(text.slice(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        } else {
          setIsDeleting(false)
          setCurrentIndex(0)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, text, speed, deleteSpeed, delay])

  return (
    <span className="inline-block">
      {displayText}
      <span className="inline-block w-0.5 h-6 bg-purple-500 ml-1 animate-pulse"></span>
    </span>
  )
}

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAlreadyOnList, setIsAlreadyOnList] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const handleQuizComplete = async (quizData: any) => {
    setIsLoading(true)

    try {
      // Save quiz data to waitlist
      const result = await saveWaitlistEntry({
        email: quizData.email,
        user_type: quizData.userType,
        primary_goal: quizData.primaryGoal,
        biggest_challenge: quizData.biggestChallenge,
        budget_range: quizData.budgetRange,
        timeline: quizData.timeline,
        follower_count: quizData.followerCount,
        primary_platform: quizData.preferredPlatform,
        collaboration_experience: quizData.monthlyCampaigns
      })
      
      if (result.alreadyExists) {
        // User is already on the list
        setIsAlreadyOnList(true)
        setIsSubmitted(true)
        setShowQuiz(false)
      } else if (result.success) {
              // New user added successfully - send welcome email
      try {
        await fetch('/api/send-waitlist-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: quizData.email,
            userType: quizData.userType,
            template: 'quiz-completion',
            data: {
              ...quizData,
              // Map role-specific fields to database fields
              primary_goal: quizData.primaryGoal,
              biggest_challenge: quizData.biggestChallenge,
              budget_range: quizData.budgetRange,
              timeline: quizData.timeline,
              follower_count: quizData.followerCount,
              primary_platform: quizData.preferredPlatform,
              collaboration_experience: quizData.monthlyCampaigns
            }
          }),
        })
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Don't fail the quiz completion if email fails
      }
        
        setIsAlreadyOnList(false)
        setIsSubmitted(true)
        setShowQuiz(false)
      }
    } catch (error: any) {
      console.error('Error saving waitlist entry:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuizSkip = async () => {
    setIsLoading(true)

    try {
      // Save minimal data to waitlist
      await saveWaitlistEntry({
        email: 'anonymous@example.com', // Placeholder for skipped quiz
        user_type: 'brand'
      })
      setIsSubmitted(true)
      setShowQuiz(false)
    } catch (error: any) {
      console.error('Error saving waitlist entry:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
  }



  const testimonials = [
    {
      quote: "Our sales increased 3x after just one campaign. The tracking dashboard kept us confident throughout.",
      author: "Sophia, Founder"
    },
    {
      quote: "Finally, a platform where I get paid fairly and can build real brand partnerships.",
      author: "Jake, Influencer"
    }
  ]



  const faqs = [
    {
      question: "How does performance-based payment work?",
      answer: "You set performance goals (views, clicks, sales) and only pay when those targets are met. Creators earn 2-3x more based on actual results, not just posting content."
    },
    {
      question: "What makes ViralReach different from other platforms?",
      answer: "We focus on skincare/beauty, offer performance-based payments, have AI-powered matching, and provide escrow protection. Most platforms charge upfront regardless of results."
    },
    {
      question: "How quickly can I launch a campaign?",
      answer: "You can create and launch a campaign in under 10 minutes. Our AI matching system connects you with relevant creators instantly."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We offer escrow protection and performance guarantees. If results don't meet expectations, we work to resolve issues or provide refunds."
    },
    {
      question: "Do you work with micro-influencers?",
      answer: "Yes! We have creators ranging from 5K to 500K+ followers. Micro-influencers often deliver better engagement and ROI for niche products."
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-0">
      {/* Navigation */}
      <header>
        <nav className="monday-nav sticky top-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 monday-gradient-purple rounded-lg mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VR</span>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">ViralReach</div>
                  <div className="text-xs text-gray-500 -mt-1">Brand-Creator Marketplace</div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/brand" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">For Brands</Link>
              <Link href="/creator" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">For Creators</Link>
              <a href="#features" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">How It Works</a>
              <a href="#faq" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">FAQ</a>
              <a href="/contact" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">Sign In</Link>
              <button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-monday-primary"
              >
                Join Waitlist
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-4 pt-2 pb-3 space-y-1">
                <Link href="/brand" className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium">For Brands</Link>
                <Link href="/creator" className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium">For Creators</Link>
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium">Features</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium">How It Works</a>
                <a href="#faq" className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium">FAQ</a>
                <a href="/contact" className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium">Contact</a>
                <div className="pt-2 border-t border-gray-200">
                  <button className="block w-full text-left px-3 py-2 text-purple-600 hover:text-purple-700 font-medium">Sign In</button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full mt-2 btn-monday-primary text-center"
                  >
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative py-20 bg-black overflow-hidden">
          {/* Diagonal Collage Background of Influencers */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] flex flex-wrap gap-4" style={{ width: '120vw', height: '60vh' }}>
              {[
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/women/68.jpg",
                "https://randomuser.me/api/portraits/women/12.jpg",
                "https://randomuser.me/api/portraits/women/22.jpg",
                "https://randomuser.me/api/portraits/women/33.jpg",
                "https://randomuser.me/api/portraits/women/89.jpg",
                "https://randomuser.me/api/portraits/women/55.jpg",
                "https://randomuser.me/api/portraits/women/77.jpg",
                "https://randomuser.me/api/portraits/women/32.jpg",
                "https://randomuser.me/api/portraits/women/68.jpg",
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/women/77.jpg",
                "https://randomuser.me/api/portraits/women/12.jpg",
                "https://randomuser.me/api/portraits/women/22.jpg",
                "https://randomuser.me/api/portraits/women/33.jpg",
                "https://randomuser.me/api/portraits/women/89.jpg",
                "https://randomuser.me/api/portraits/women/55.jpg",
                "https://randomuser.me/api/portraits/women/77.jpg"
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Influencer ${i + 1}`}
                  className="w-32 h-32 object-cover rounded-xl shadow-lg border-2 border-white/10 opacity-90"
                  style={{ aspectRatio: '1/1', minWidth: 0, minHeight: 0 }}
                />
              ))}
            </div>
          </div>

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-10"></div>

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  Performance-Based Influencer Marketing
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                  The Influencer Marketplace
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    for Real Results
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow">
                  Connect skincare brands with authentic creators. 
                  <span className="font-medium text-purple-200"> Pay only for performance, not just posts.</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              >
                <Link 
                  href="/brand"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  For Brands
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Link>
                <Link 
                  href="/creator"
                  className="bg-white/90 backdrop-blur-sm text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  For Creators
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-200"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Performance-Based Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Escrow Protection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>AI-Powered Matching</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Creator Stories Carousel Section */}
        <CreatorStoriesCarousel />

        {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Building the Future of Influencer Marketing
            </h2>
            <p className="text-lg text-gray-600">
              Join us as we revolutionize how brands and creators collaborate
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-12">
            {/* Early adopter badges */}
            <div className="flex items-center justify-center h-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="text-purple-600 font-semibold text-sm">Early Adopter</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-semibold text-sm">Founding Member</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
              <div className="flex items-center space-x-2">
                <TestTube className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-semibold text-sm">Beta Tester</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border border-pink-100">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-pink-600" />
                <span className="text-pink-600 font-semibold text-sm">Innovator</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Early Access Signups</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$0</div>
              <div className="text-gray-600">Setup Fees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ViralReach?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The only platform that puts results first
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance-Based Payments</h3>
              <p className="text-gray-600">
                Pay only for real results, not just posts. Earn 2-3x more as a creator, get better ROI as a brand.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Escrow Protection</h3>
              <p className="text-gray-600">
                Secure payments for both parties. No more chasing payments or dealing with late-paying brands.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Matching</h3>
              <p className="text-gray-600">
                Perfect brand-creator matches in seconds. No more awkward collaborations or wasted time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join the performance-based influencer marketing revolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/brand"
              className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              For Brands
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
            <Link 
              href="/creator"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-pink-600 transition-colors"
            >
              For Creators
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section with Illustration */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 mb-8">Simple, transparent, and performance-driven influencer marketing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Campaign</h3>
              <p className="text-gray-600">
                Set your goals, budget, and target audience. Our AI matches you with perfect creators.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Review & Approve</h3>
              <p className="text-gray-600">
                Browse creator proposals, review their content samples, and approve the best fits.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track & Pay for Results</h3>
              <p className="text-gray-600">
                Monitor performance in real-time and pay only when your targets are met.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Platform Overview - Engaging UI with Original Content and Improved Images */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Everything You Need in One Platform
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Block 1: Smart Discovery (Netflix-style grid of faces) */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 w-full max-w-xs">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    "https://randomuser.me/api/portraits/women/68.jpg",
                    "https://randomuser.me/api/portraits/men/85.jpg",
                    "https://randomuser.me/api/portraits/women/12.jpg",
                    "https://randomuser.me/api/portraits/men/45.jpg",
                    "https://randomuser.me/api/portraits/women/22.jpg",
                    "https://randomuser.me/api/portraits/men/23.jpg",
                    "https://randomuser.me/api/portraits/women/33.jpg"
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Influencer ${i + 1}`}
                      className="rounded-lg w-full aspect-square object-cover shadow"
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-xs mb-2 inline-block">
                  Smart Discovery
                </span>
                <h3 className="text-xl font-bold mb-2">Smart Discovery</h3>
                <p className="text-gray-700 mb-2">
                  AI-powered creator matching. Find the perfect influencers for your brand in seconds, filtered by niche, audience, and engagement.
                </p>
              </div>
            </div>
            {/* Block 2: Real-Time Analytics (Dashboard screenshot) */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative flex-1 w-full max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
                  alt="Analytics Dashboard Screenshot"
                  className="rounded-xl shadow-lg w-full"
                />
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-4 py-2 text-sm">
                  <div className="font-semibold">Live Data</div>
                  <div className="text-gray-500">#analytics</div>
                </div>
              </div>
              <div className="flex-1">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-xs mb-2 inline-block">
                  Real-Time Analytics
                </span>
                <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
                <p className="text-gray-700 mb-2">
                  Track performance live. Instantly see views, clicks, conversions, and ROI for every campaign and creator.
                </p>
              </div>
            </div>
            {/* Block 3: Secure Payments (Modern digital payment visual) */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative flex-1 w-full max-w-xs">
                <img
                  src="https://images.pexels.com/photos/4968384/pexels-photo-4968384.jpeg?auto=compress&w=400&q=80"
                  alt="Secure Payment"
                  className="rounded-xl shadow-lg w-full"
                />
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-4 py-2 text-sm">
                  <div className="font-semibold">Escrow</div>
                  <div className="text-gray-500">#secure</div>
                </div>
              </div>
              <div className="flex-1">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-xs mb-2 inline-block">
                  Secure Payments
                </span>
                <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                <p className="text-gray-700 mb-2">
                  Escrow protection for all. Payments are held securely until campaign deliverables are met—no more chasing payments.
                </p>
              </div>
            </div>
            {/* Block 4: Built-in Communication (Chat/Collaboration visual) */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative flex-1 w-full max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
                  alt="Communication"
                  className="rounded-xl shadow-lg w-full"
                />
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-4 py-2 text-sm">
                  <div className="font-semibold">Chat</div>
                  <div className="text-gray-500">#collaboration</div>
                </div>
              </div>
              <div className="flex-1">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-xs mb-2 inline-block">
                  Built-in Communication
                </span>
                <h3 className="text-xl font-bold mb-2">Built-in Communication</h3>
                <p className="text-gray-700 mb-2">
                  Seamless collaboration tools. Message, share files, and manage feedback with brands and creators in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Bar (Coming Soon) */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <span className="uppercase text-xs tracking-widest text-gray-400 mb-2">Trusted by early partners</span>
          <div className="flex justify-center items-center opacity-70 mb-4">
            <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold text-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Coming Soon
            </span>
          </div>
          {/* Avatars row remains */}
          <div className="flex -space-x-4 justify-center mt-2">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Creator 1" className="w-10 h-10 rounded-full border-2 border-white shadow" />
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Creator 2" className="w-10 h-10 rounded-full border-2 border-white shadow" />
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Creator 3" className="w-10 h-10 rounded-full border-2 border-white shadow" />
            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Creator 4" className="w-10 h-10 rounded-full border-2 border-white shadow" />
            <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Creator 5" className="w-10 h-10 rounded-full border-2 border-white shadow" />
          </div>
        </div>
      </section>

      {/* Launching Now Stats Bar */}
      <section className="py-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 text-center">
          <div>
            <span className="text-2xl font-bold text-purple-700">🚀</span>
            <div className="font-semibold text-gray-800">Launching Summer 2024</div>
            <div className="text-xs text-gray-500">Be a founding member</div>
          </div>
          <div>
            <span className="text-2xl font-bold text-pink-600">🎉</span>
            <div className="font-semibold text-gray-800">Now onboarding first 100 brands & creators</div>
            <div className="text-xs text-gray-500">Early access, exclusive perks</div>
          </div>
          <div>
            <span className="text-2xl font-bold text-blue-600">🛠️</span>
            <div className="font-semibold text-gray-800">Shape the platform</div>
            <div className="text-xs text-gray-500">Direct input into features & roadmap</div>
          </div>
        </div>
      </section>

      {/* Dashboard/Product Mockup Section (Demo-style) */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Preview the ViralReach Dashboard</h2>
            <p className="text-lg text-gray-600 mb-6">A sneak peek at the tools you'll use to launch, manage, and track your influencer campaigns. (Beta preview)</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-6">
              <li>Real-time campaign analytics</li>
              <li>AI-powered creator matching</li>
              <li>Secure, escrow-based payments</li>
              <li>Seamless brand-creator messaging</li>
            </ul>
            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">Beta Preview</span>
          </div>
          <div className="flex-1 flex justify-center">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Early Adopter Testimonial */}
      <section className="py-12 bg-gradient-to-r from-pink-50 to-purple-50 border-t border-b border-purple-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <blockquote className="text-xl italic text-gray-700 mb-2">"We built ViralReach to solve the headaches we faced as marketers and creators. Join us as a founding member and help shape the future of influencer marketing!"</blockquote>
            <div className="font-semibold text-purple-700">Founding Team</div>
            <div className="text-xs text-gray-500">ViralReach</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="monday-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="monday-card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Q: {faq.question}</h3>
                <p className="text-gray-600">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Waitlist Signup */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join the Waitlist <span className="ml-2 bg-white text-pink-600 px-2 py-1 rounded-full text-xs align-middle font-semibold">Early Access</span>
          </h2>
          <p className="text-xl text-pink-100 mb-2">
            Take our quick quiz to get personalized early access
          </p>
          <p className="text-sm text-pink-200 mb-8">No credit card required • Early access guaranteed • Exclusive founding member perks</p>
          {!isSubmitted ? (
            showQuiz ? (
              <WaitlistQuiz 
                onComplete={handleQuizComplete}
                onSkip={handleQuizSkip}
              />
            ) : (
              <div className="max-w-md mx-auto">
                <button 
                  onClick={handleStartQuiz}
                  className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full"
                >
                  Take Quick Quiz & Join Waitlist
                </button>
              </div>
            )
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {isAlreadyOnList ? "You're already on the list!" : "You're on the list!"}
              </h3>
              <p className="text-pink-100">
                {isAlreadyOnList 
                  ? "Thanks for your interest! We'll notify you when ViralReach launches." 
                  : "We'll notify you when ViralReach launches."
                }
              </p>
            </div>
          )}
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 monday-gradient-purple rounded-lg mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VR</span>
                </div>
                <div className="text-xl font-semibold">ViralReach</div>
              </div>
              <p className="text-gray-400 mb-4">
                Authentic influencer marketing made simple.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ViralReach. Empowering authentic influence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 