"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ChevronDown, Menu, X, ArrowRight, Search, Shield, TrendingUp, Users, DollarSign, BarChart3, MessageSquare, Star, Clock, Camera, Target, Eye } from 'lucide-react'
import HeroDemo from './components/HeroDemo'
import { saveWaitlistEntry } from '../lib/database'

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
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Enhanced waitlist form state
  const [showQuestions, setShowQuestions] = useState(false)
  const [userType, setUserType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    userType: '',
    // Brand-specific fields
    primaryGoal: '',
    biggestChallenge: '',
    currentSolution: '',
    budgetRange: '',
    timeline: '',
    mostImportant: '',
    // Creator-specific fields
    primaryPlatform: '',
    followerCount: '',
    contentNiche: '',
    collaborationExperience: '',
    creatorChallenge: '',
    creatorImportant: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && !showQuestions) {
      setShowQuestions(true)
    }
  }

  const handleEnhancedSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitError('')

    try {
      // Prepare data for Supabase - convert long user type to short values
      const userTypeMapping = {
        'Brand/Business Owner': 'brand',
        'Influencer/Creator': 'creator'
      }
      
      const mappedUserType = userTypeMapping[formData.userType as keyof typeof userTypeMapping]
      
      if (!mappedUserType) {
        throw new Error('Please select a valid user type')
      }
      
      const waitlistData = {
        email: email,
        user_type: mappedUserType as 'brand' | 'creator',
        // Brand fields
        primary_goal: formData.primaryGoal,
        biggest_challenge: formData.biggestChallenge,
        current_solution: formData.currentSolution,
        budget_range: formData.budgetRange,
        timeline: formData.timeline,
        most_important: formData.mostImportant,
        // Creator fields
        primary_platform: formData.primaryPlatform,
        follower_count: formData.followerCount,
        content_niche: formData.contentNiche,
        collaboration_experience: formData.collaborationExperience,
        creator_challenge: formData.creatorChallenge,
        creator_important: formData.creatorImportant,
      }

      console.log('Submitting waitlist data:', waitlistData)
      const result = await saveWaitlistEntry(waitlistData)
      console.log('📋 Database result:', result)
      
      if (result.success) {
        if (result.alreadyExists) {
          // User is already on waitlist
          console.log('⚠️ User already on waitlist:', email)
          setSubmitError(result.message || "You're already on our waitlist! We'll notify you when we launch.")
          return // Early return to prevent email sending
        } else {
          // New user - send welcome email
          console.log('✅ Successfully saved waitlist entry:', result.data)
          
          try {
            console.log('📧 Sending welcome email to:', email, 'as', mappedUserType)
            const emailResponse = await fetch('/api/send-waitlist-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                userType: mappedUserType,
                formData: {
                  primaryGoal: formData.primaryGoal,
                  budgetRange: formData.budgetRange,
                  primaryPlatform: formData.primaryPlatform,
                  contentNiche: formData.contentNiche,
                  biggestChallenge: formData.biggestChallenge,
                  timeline: formData.timeline,
                  // Add other relevant fields for personalization
                }
              }),
            })

            if (!emailResponse.ok) {
              console.error('❌ Failed to send welcome email:', await emailResponse.text())
              // Don't fail the signup if email fails
            } else {
              console.log('✅ Welcome email sent successfully!')
            }
          } catch (emailError) {
            console.error('Error sending welcome email:', emailError)
            // Don't fail the signup if email fails
          }
          
          setIsSubmitted(true)
        }
      } else {
        console.error('Database save failed:', result.error)
        throw new Error(result.error?.message || 'Failed to save entry')
      }
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setSubmitError(`Failed to submit: ${error.message || 'Please try again.'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const problems = [
    {
      title: "You spent $5,000 on an influencer who never posted",
      description: "They took your money, promised content, then disappeared. Sound familiar?",
      icon: "💸",
      stat: "73% of brands have been ghosted by influencers"
    },
    {
      title: "Half their followers are bots from Bangladesh", 
      description: "That 100K follower account? Only 12K are real people who might buy your product.",
      icon: "🤖",
      stat: "Average of 45% fake followers on influencer accounts"
    },
    {
      title: "You have no idea if it's actually working",
      description: "Did that post drive sales? Increase brand awareness? You're flying blind.",
      icon: "🔍",
      stat: "68% of brands can't measure influencer ROI"
    },
    {
      title: "Finding good influencers takes forever",
      description: "Scrolling through Instagram for hours, DMing dozens of creators, most don't reply.",
      icon: "⏰",
      stat: "Average 40 hours spent per campaign just finding influencers"
    }
  ]

  const solutions = [
    {
      title: 'No More Ghosting - Guaranteed Delivery',
      description: 'Every influencer is verified and contractually bound to deliver. If they don\'t post, you don\'t pay. Plus, we provide backup influencers automatically.',
      icon: <Shield className="w-6 h-6" />,
      details: [
        'Escrow payment system - money held until content is live',
        'Backup influencer network activated within 24 hours',
        'Legal contracts with performance guarantees',
        'Real-time delivery tracking and notifications'
      ],
      solves: "Solves: Getting ghosted by influencers who take money and disappear"
    },
    {
      title: 'Real Followers Only - AI-Powered Verification',
      description: 'Our advanced AI scans every influencer\'s followers for bots, fake accounts, and suspicious activity. Only authentic audiences make it through.',
      icon: <Eye className="w-6 h-6" />,
      details: [
        'AI bot detection with 98% accuracy rate',
        'Engagement pattern analysis to spot fake activity',
        'Geographical follower distribution checks',
        'Regular re-verification to maintain quality'
      ],
      solves: "Solves: Wasting money on influencers with fake followers"
    },
    {
      title: 'Complete Performance Transparency',
      description: 'See exactly how your campaigns perform with real-time analytics, conversion tracking, and ROI calculations. No more guessing games.',
      icon: <BarChart3 className="w-6 h-6" />,
      details: [
        'Live dashboard with views, clicks, and conversions',
        'UTM tracking for every campaign link',
        'ROI calculator with profit/loss breakdowns',
        'Audience demographic insights and engagement quality'
      ],
      solves: "Solves: Not knowing if your campaigns are actually working"
    },
    {
      title: 'Instant Influencer Discovery',
      description: 'Find perfect influencers in minutes, not hours. Our smart matching algorithm connects you with creators who actually fit your brand.',
      icon: <Target className="w-6 h-6" />,
      details: [
        'Smart filters: niche, audience, engagement, location',
        'AI-powered recommendations based on your goals',
        'Instant availability status and response rates',
        'Pre-vetted creators ready to start immediately'
      ],
      solves: "Solves: Spending weeks searching for the right influencers"
    },
    {
      title: 'Flexible Payment Models',
      description: 'Choose how you want to pay: fixed rates, pay-per-view, pay-per-click, or pay-per-conversion. Only pay for results that matter to your business.',
      icon: <DollarSign className="w-6 h-6" />,
      details: [
        'Fixed fee for guaranteed content delivery',
        'Pay-per-view for brand awareness campaigns',
        'Pay-per-click for traffic generation',
        'Pay-per-conversion for direct sales goals'
      ],
      solves: "Solves: Paying upfront with no guarantee of results"
    },
    {
      title: 'End-to-End Campaign Management',
      description: 'From brief creation to final reporting, manage everything in one place. Approve content, track progress, and communicate with influencers seamlessly.',
      icon: <CheckCircle className="w-6 h-6" />,
      details: [
        'Campaign brief builder with clear deliverables',
        'Content approval workflow with revision requests',
        'Built-in messaging system for smooth communication',
        'Automated reporting and performance summaries'
      ],
      solves: "Solves: Juggling multiple platforms and losing track of campaigns"
    }
  ]

  const brandFeatures = [
    {
      title: 'Influencer Discovery',
      icon: <Search className="w-8 h-8 text-purple-600" />,
      features: [
        'Access a curated network of verified influencers',
        'Filter by niche, platform, follower size, engagement, country, and audience demographics',
        'Browse influencer profiles with sample content, past campaigns, and ratings'
      ]
    },
    {
      title: 'Campaign Creation & Management',
      icon: <Target className="w-8 h-8 text-blue-600" />,
      features: [
        'Create campaigns with goals, product details, and deliverables',
        'Set budgets, deadlines, and preferred content formats (Reels, TikToks, Stories, etc.)',
        'Approve or reject influencers before content goes live'
      ]
    },
    {
      title: 'Flexible Payment Models',
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      features: [
        'Choose flat fee, pay-per-view (CPV), cost-per-click (CPC), or hybrid model',
        'Escrow-based secure payment until post is verified live',
        'Pay only for verified performance'
      ]
    },
    {
      title: 'Real-Time Tracking & Analytics',
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      features: [
        'Track views, likes, comments, shares, and click-throughs per post',
        'See conversion metrics and ROI across campaigns',
        'Visual dashboards with filters by campaign, creator, or platform'
      ]
    },
    {
      title: 'Content & Post Verification',
      icon: <Shield className="w-8 h-8 text-pink-600" />,
      features: [
        'Live post links embedded in dashboard',
        'Screenshots and video receipts of posts',
        'Fraud detection alerts (e.g., sudden follower spikes)'
      ]
    }
  ]

  const creatorFeatures = [
    {
      title: 'Instant Campaign Access',
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      features: [
        'Browse available campaigns that match your niche',
        'Apply directly from your dashboard with custom pitch messages'
      ]
    },
    {
      title: 'Account Verification',
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      features: [
        'Connect Instagram, TikTok, or YouTube to verify audience and stats',
        'Auto-check engagement rates, authenticity, and follower quality'
      ]
    },
    {
      title: 'Fair, Transparent Payments',
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      features: [
        'See how much you\'ll earn before accepting a campaign',
        'Choose between flat rate or performance-based earnings',
        'Payments released once campaign is marked complete by the brand'
      ]
    },
    {
      title: 'Content Submission Workflow',
      icon: <Camera className="w-8 h-8 text-orange-600" />,
      features: [
        'Upload drafts for brand approval',
        'Schedule content or notify when posted live',
        'Get feedback and ratings from brands'
      ]
    }
  ]

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
      question: "How do you verify influencers?",
      answer: "We use advanced analytics to verify authentic engagement, check follower quality, review posting history, and validate social media accounts. All influencers go through a comprehensive vetting process before joining our network."
    },
    {
      question: "Can I pay based on performance?",
      answer: "Yes! Choose from multiple payment models: fixed fees, pay-per-view, pay-per-click, pay-per-conversion, or hybrid models. You only pay when you see real results that matter to your business."
    },
    {
      question: "How do I track campaign success?",
      answer: "Our real-time dashboard shows comprehensive analytics including views, engagement rates, click-through rates, conversions, ROI, and audience demographics. Get instant notifications when posts go live."
    },
    {
      question: "What types of influencers are available?",
      answer: "We have micro-influencers (1K-100K followers), mid-tier influencers (100K-1M), and macro-influencers (1M+) across all major platforms: Instagram, TikTok, YouTube, Twitter, and LinkedIn. All niches covered."
    },

    {
      question: "How long does it take to launch a campaign?",
      answer: "Most campaigns launch within 24-48 hours. Simply create your brief, approve influencers, and they'll start posting. Rush campaigns can go live in as little as 4-6 hours."
    },
    {
      question: "Do influencers disclose partnerships?",
      answer: "Absolutely. All our influencers follow FTC guidelines and platform policies, using proper disclosure hashtags like #ad, #sponsored, or #partnership to maintain transparency and trust."
    },
    {
      question: "Can I review posts before they go live?",
      answer: "Yes! You can require pre-approval for all content. Influencers submit drafts for your review, and you can request changes before the final post goes live."
    },
    {
      question: "What if an influencer doesn't deliver?",
      answer: "We have a performance guarantee. If an influencer fails to deliver as promised, you don't pay. We also provide backup influencers and full campaign support to ensure success."
    },
    {
      question: "Can I work with the same influencers again?",
      answer: "Definitely! Build long-term relationships with top-performing influencers. Our platform makes it easy to re-book successful creators and track their lifetime value for your brand."
    },
    {
      question: "Do you support international campaigns?",
      answer: "Yes! We have verified influencers in 50+ countries. Target specific regions, languages, or go global. Our platform handles currency conversion and local compliance automatically."
    },
    {
      question: "What content formats are supported?",
      answer: "All major formats: Instagram posts, Stories, Reels, TikTok videos, YouTube videos/Shorts, Twitter posts, LinkedIn articles, and more. Choose the format that best fits your campaign goals."
    },
    {
      question: "How do you prevent fake followers?",
      answer: "We use AI-powered tools to detect fake followers, bots, and suspicious engagement patterns. Only influencers with authentic, engaged audiences make it into our verified network."
    },
    {
      question: "Can I target specific demographics?",
      answer: "Yes! Filter by age, gender, location, interests, follower count, engagement rate, and audience demographics. Find influencers whose followers match your ideal customer profile."
    },
    {
      question: "What kind of support do you provide?",
      answer: "Full campaign support including strategy consultation, content guidance, performance optimization, and 24/7 customer success management. We're here to ensure your campaigns succeed."
    },
    {
      question: "Is there a minimum campaign budget?",
      answer: "No minimum budget required. Start small with a single influencer post for as little as $50, or scale up to multi-influencer campaigns. Grow at your own pace."
    },
    {
      question: "How do you handle content rights?",
      answer: "Clear usage rights are defined upfront. You can negotiate extended usage rights for high-performing content, including rights to repost, use in ads, or feature on your website."
    },
    {
      question: "Can I exclude competitors' influencers?",
      answer: "Yes! Set exclusivity requirements and competitor blacklists. Ensure your chosen influencers haven't recently promoted competing brands and can maintain campaign exclusivity."
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
        <section className="monday-hero-bg py-20" aria-label="Hero section with main call to action">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-gradient-purple">The Influencer Marketplace</span><br/>
                for Real Results — Starting with<br/>
                <span className="text-gradient-purple">Skincare</span>
              </motion.h1>
              
              <motion.div 
                className="text-xl font-bold text-black mb-4 max-w-2xl lg:max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <TypewriterText 
                  text="Now onboarding early skincare brands & creators."
                  speed={100}
                  deleteSpeed={50}
                  delay={2000}
                />
              </motion.div>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-2xl lg:max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Get UGC that sells — without chasing influencers or guessing ROI. The trusted platform where skincare brands connect with authentic creators. Track real metrics, approve content, and only pay when performance is verified. <span className="font-medium">Expanding soon to beauty, wellness, and more.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-md mx-auto lg:mx-0"
              >
                {isSubmitted ? (
                  <div className="monday-card p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">You're on the list!</h3>
                    <p className="text-gray-600">We'll notify you when ViralReach launches.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-monday-primary whitespace-nowrap sm:w-auto"
                    >
                      Get Early Access
                    </button>
                  </form>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Early Access Platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Real-Time Analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Pay for Results Only</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Interactive Demo */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <HeroDemo />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="monday-stats-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Why Traditional Influencer Marketing Isn't Enough
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="monday-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                    <p className="text-gray-600 mb-3">{problem.description}</p>
                    <div className="text-sm font-medium text-red-700 bg-red-50 px-3 py-1 rounded-lg inline-block">
                      📊 {problem.stat}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="monday-stats-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Our Solution: A Better Way to Promote
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ViralReach directly addresses every pain point of traditional influencer marketing with innovative solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="monday-card p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 monday-gradient-purple rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    {solution.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    
                    {/* Problem it solves */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-sm font-medium text-green-800">✅ {solution.solves}</p>
                    </div>
                    
                    {/* Detailed features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">How it works:</h4>
                      <ul className="space-y-1">
                        {solution.details.map((detail, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="monday-card p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Join thousands of brands and creators who've already discovered a better way to collaborate
              </p>
              <button
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-monday-primary text-lg px-8 py-4 inline-flex items-center"
              >
                Join the Waitlist <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="monday-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              How It Works: Simple 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 monday-gradient-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Campaign</h3>
              <p className="text-gray-600">Share your product details, goals, and budget.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 monday-gradient-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Influencers</h3>
              <p className="text-gray-600">Browse our verified influencer network and approve the right fit.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 monday-gradient-green rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track & Pay</h3>
              <p className="text-gray-600">Influencers post promos on their channels. Track metrics and pay securely when satisfied.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Brand Features */}
      <section id="features" className="monday-stats-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              🧩 For Brands & Advertisers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandFeatures.map((feature, index) => (
              <div key={index} className="monday-card p-6 h-full">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Features */}
      <section className="monday-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              🌟 For Influencers & Creators
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {creatorFeatures.map((feature, index) => (
              <div key={index} className="monday-card p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 monday-card p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">🤝 Communication & Workflow Tools</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-purple-600" />
                <span className="text-gray-700">In-app messaging between brands and influencers</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">Comment threads per campaign</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">Notifications and reminders for deadlines or approvals</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-orange-600" />
                <span className="text-gray-700">Smart recommendations (e.g., "Creators similar to X")</span>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Waitlist Benefits */}
      <section className="monday-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Why Join Our Waitlist?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="monday-card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Exclusive Access</h3>
              <p className="text-gray-600">Be the first to access an exclusive network of quality influencers.</p>
            </div>
            <div className="monday-card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💰 Early Adopter Perks</h3>
              <p className="text-gray-600">Get early adopter perks and discounted rates.</p>
            </div>
            <div className="monday-card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🛠️ Shape the Product</h3>
              <p className="text-gray-600">Influence the product features by sharing your feedback.</p>
            </div>
            <div className="monday-card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📚 Expert Insights</h3>
              <p className="text-gray-600">Receive tips and insights to maximize your campaign success.</p>
            </div>
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

      {/* Enhanced Waitlist Signup */}
      <section id="waitlist" className="monday-stats-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="monday-card p-12">
            {!isSubmitted ? (
              <>
                {!showQuestions ? (
                  // Step 1: Email Collection
                  <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-gray-800">
                      Join the ViralReach Waitlist
                    </h2>
                    
                    <p className="text-xl text-gray-600 mb-8">
                      Get early access to the platform that's revolutionizing influencer marketing
                    </p>
                    
                    <div className="max-w-md mx-auto">
                      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                        <button type="submit" className="btn-monday-primary whitespace-nowrap sm:w-auto">
                          Continue
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  // Step 2: Enhanced Questionnaire
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
                        Tell Us About Yourself
                      </h2>
                      <p className="text-lg text-gray-600">
                        Help us personalize your ViralReach experience
                      </p>
                    </div>

                    <form onSubmit={handleEnhancedSubmit} className="space-y-6">
                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company/Brand Name</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Question 1: User Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">I am a... *</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {['Brand/Business Owner', 'Influencer/Creator'].map((type) => (
                            <label key={type} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                type="radio"
                                name="userType"
                                value={type}
                                checked={formData.userType === type}
                                onChange={(e) => handleInputChange('userType', e.target.value)}
                                className="mr-3 text-purple-600"
                                required
                              />
                              <span className="text-gray-700">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Dynamic Questions Based on User Type */}
                      {formData.userType === 'Brand/Business Owner' && (
                        <>
                          {/* Question 2: Primary Goal - Brand */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              What's your primary goal with influencer marketing? *
                            </label>
                            <select
                              value={formData.primaryGoal}
                              onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select your primary goal</option>
                              <option value="brand-awareness">Increase Brand Awareness</option>
                              <option value="sales">Drive Sales & Conversions</option>
                              <option value="engagement">Boost Social Media Engagement</option>
                              <option value="reach">Expand Audience Reach</option>
                              <option value="partnerships">Build Long-term Partnerships</option>
                              <option value="content">Generate User Content</option>
                            </select>
                          </div>

                          {/* Question 3: Biggest Challenge - Brand */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              What's your biggest challenge with influencer marketing? *
                            </label>
                            <select
                              value={formData.biggestChallenge}
                              onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select your biggest challenge</option>
                              <option value="finding-influencers">Finding the Right Influencers</option>
                              <option value="measuring-roi">Measuring ROI & Performance</option>
                              <option value="fake-followers">Dealing with Fake Followers</option>
                              <option value="pricing">Understanding Fair Pricing</option>
                              <option value="campaign-management">Managing Campaigns Efficiently</option>
                              <option value="content-quality">Ensuring Content Quality</option>
                            </select>
                          </div>

                          {/* Question 4: Current Solution - Brand */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              How do you currently handle influencer marketing? *
                            </label>
                            <select
                              value={formData.currentSolution}
                              onChange={(e) => handleInputChange('currentSolution', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select your current approach</option>
                              <option value="manual-outreach">Manual Outreach on Social Media</option>
                              <option value="other-platforms">Other Influencer Platforms</option>
                              <option value="agencies">Working with Agencies</option>
                              <option value="personal-network">Personal Network/Referrals</option>
                              <option value="not-started">Haven't Started Yet</option>
                              <option value="in-house-team">In-house Marketing Team</option>
                            </select>
                          </div>

                          {/* Question 5: Budget Range - Brand */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              What's your monthly influencer marketing budget? *
                            </label>
                            <select
                              value={formData.budgetRange}
                              onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select your budget range</option>
                              <option value="under-500">Under $500</option>
                              <option value="500-2000">$500 - $2,000</option>
                              <option value="2000-5000">$2,000 - $5,000</option>
                              <option value="5000-10000">$5,000 - $10,000</option>
                              <option value="10000-25000">$10,000 - $25,000</option>
                              <option value="over-25000">Over $25,000</option>
                            </select>
                          </div>

                          {/* Question 6: Timeline - Brand */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              When are you looking to start your next campaign? *
                            </label>
                            <select
                              value={formData.timeline}
                              onChange={(e) => handleInputChange('timeline', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select your timeline</option>
                              <option value="immediately">Immediately</option>
                              <option value="1-2-weeks">Within 1-2 weeks</option>
                              <option value="1-month">Within 1 month</option>
                              <option value="2-3-months">In 2-3 months</option>
                              <option value="planning-phase">Still in planning phase</option>
                              <option value="exploring">Just exploring options</option>
                            </select>
                          </div>

                          {/* Question 7: Most Important Feature - Brand */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              What's most important to you in an influencer platform? *
                            </label>
                            <select
                              value={formData.mostImportant}
                              onChange={(e) => handleInputChange('mostImportant', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select most important feature</option>
                              <option value="verified-influencers">Verified, High-Quality Influencers</option>
                              <option value="performance-tracking">Detailed Performance Tracking</option>
                              <option value="fair-pricing">Transparent, Fair Pricing</option>
                              <option value="easy-management">Easy Campaign Management</option>
                              <option value="customer-support">Excellent Customer Support</option>
                              <option value="fast-results">Quick Campaign Setup & Results</option>
                            </select>
                          </div>
                        </>
                      )}

                      {formData.userType === 'Influencer/Creator' && (
                        <>
                                                     {/* Question 2: Primary Platform - Creator */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-3">
                               What's your primary social media platform? *
                             </label>
                             <select
                               value={formData.primaryPlatform}
                               onChange={(e) => handleInputChange('primaryPlatform', e.target.value)}
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                               required
                             >
                               <option value="">Select your primary platform</option>
                               <option value="instagram">Instagram</option>
                               <option value="tiktok">TikTok</option>
                               <option value="youtube">YouTube</option>
                               <option value="twitter">Twitter/X</option>
                               <option value="linkedin">LinkedIn</option>
                               <option value="multiple">Multiple Platforms</option>
                             </select>
                           </div>
 
                           {/* Question 3: Follower Count - Creator */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-3">
                               What's your follower count on your main platform? *
                             </label>
                             <select
                               value={formData.followerCount}
                               onChange={(e) => handleInputChange('followerCount', e.target.value)}
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                               required
                             >
                               <option value="">Select your follower range</option>
                               <option value="under-1k">Under 1,000</option>
                               <option value="1k-10k">1,000 - 10,000</option>
                               <option value="10k-50k">10,000 - 50,000</option>
                               <option value="50k-100k">50,000 - 100,000</option>
                               <option value="100k-500k">100,000 - 500,000</option>
                               <option value="over-500k">Over 500,000</option>
                             </select>
                           </div>
 
                           {/* Question 4: Content Niche - Creator */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-3">
                               What's your content niche? *
                             </label>
                             <select
                               value={formData.contentNiche}
                               onChange={(e) => handleInputChange('contentNiche', e.target.value)}
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                               required
                             >
                               <option value="">Select your content niche</option>
                               <option value="lifestyle">Lifestyle & Fashion</option>
                               <option value="beauty">Beauty & Skincare</option>
                               <option value="fitness">Fitness & Health</option>
                               <option value="food">Food & Cooking</option>
                               <option value="tech">Technology & Gaming</option>
                               <option value="travel">Travel & Adventure</option>
                               <option value="business">Business & Finance</option>
                               <option value="parenting">Parenting & Family</option>
                               <option value="other">Other</option>
                             </select>
                           </div>
 
                           {/* Question 5: Brand Collaboration Experience - Creator */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-3">
                               How much brand collaboration experience do you have? *
                             </label>
                             <select
                               value={formData.collaborationExperience}
                               onChange={(e) => handleInputChange('collaborationExperience', e.target.value)}
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                               required
                             >
                               <option value="">Select your experience level</option>
                               <option value="beginner">Just starting out</option>
                               <option value="some-experience">A few collaborations</option>
                               <option value="experienced">Regular collaborations</option>
                               <option value="very-experienced">Highly experienced</option>
                               <option value="professional">Full-time influencer</option>
                             </select>
                           </div>
 
                           {/* Question 6: Biggest Challenge - Creator */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-3">
                               What's your biggest challenge as a creator? *
                             </label>
                             <select
                               value={formData.creatorChallenge}
                               onChange={(e) => handleInputChange('creatorChallenge', e.target.value)}
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                               required
                             >
                               <option value="">Select your biggest challenge</option>
                               <option value="finding-brands">Finding quality brands to work with</option>
                               <option value="fair-payment">Getting fair payment for my work</option>
                               <option value="growing-audience">Growing my audience</option>
                               <option value="content-creation">Creating consistent content</option>
                               <option value="brand-relationships">Building long-term brand relationships</option>
                               <option value="understanding-metrics">Understanding my performance metrics</option>
                             </select>
                           </div>
 
                           {/* Question 7: Most Important Feature - Creator */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-3">
                               What's most important to you in an influencer platform? *
                             </label>
                             <select
                               value={formData.creatorImportant}
                               onChange={(e) => handleInputChange('creatorImportant', e.target.value)}
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                               required
                             >
                               <option value="">Select most important feature</option>
                               <option value="fair-rates">Fair and transparent rates</option>
                               <option value="quality-brands">Access to quality brands</option>
                               <option value="easy-application">Easy campaign application process</option>
                               <option value="fast-payments">Fast and reliable payments</option>
                               <option value="creative-freedom">Creative freedom in content</option>
                               <option value="performance-insights">Performance insights and analytics</option>
                             </select>
                           </div>
                        </>
                      )}

                      {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                          {submitError}
                        </div>
                      )}
                      
                      <div className="pt-6">
                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full btn-monday-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Saving to waitlist...
                            </>
                          ) : (
                            'Join the Waitlist'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            ) : (
              // Success State
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
                  You're on the Waitlist!
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Thank you for your interest in ViralReach. We'll be in touch soon with early access.
                </p>
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">What's Next?</h3>
                  <ul className="text-purple-700 space-y-1">
                    <li>✅ You'll receive early access before public launch</li>
                    <li>✅ Exclusive onboarding and setup assistance</li>
                    <li>✅ Special launch pricing and bonuses</li>
                    <li>✅ Direct line to our team for feedback</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
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