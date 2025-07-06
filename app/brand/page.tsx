"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  Target,
  DollarSign,
  BarChart3,
  Eye,
  Clock,
  Award,
  Globe,
  ChevronDown,
  Instagram,
  Youtube,
  Video
} from 'lucide-react'

export default function BrandPage() {
  const [isFAQOpen, setIsFAQOpen] = useState<number | null>(null)

  const brandBenefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Pay Only for Results",
      description: "No more paying upfront for posts that may not drive sales. Pay based on views, clicks, or conversions.",
      stat: "Save 40-60% on influencer marketing"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "AI-Powered Matching",
      description: "Our AI finds perfect creators for your brand in seconds, not hours of manual research.",
      stat: "Find creators 10x faster"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Escrow Protection",
      description: "Your money is held securely until content is delivered and performance is verified.",
      stat: "100% secure payments"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Track campaign performance live with detailed ROI, engagement, and conversion metrics.",
      stat: "See results in real-time"
    }
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Campaign",
      description: "Set your goals, budget, and target audience. Our AI matches you with perfect creators.",
      icon: <Target className="w-6 h-6" />,
      time: "5 minutes"
    },
    {
      step: "2",
      title: "Review & Approve",
      description: "Browse creator proposals, review their content samples, and approve the best fits.",
      icon: <Eye className="w-6 h-6" />,
      time: "24 hours"
    },
    {
      step: "3",
      title: "Track & Pay for Results",
      description: "Monitor performance in real-time and pay only when your targets are met.",
      icon: <TrendingUp className="w-6 h-6" />,
      time: "Real-time"
    }
  ]

  const creators = [
    {
      name: "Sarah Chen",
      handle: "@sarahbeauty",
      platform: "Instagram",
      followers: "125K",
      niche: "Skincare & Beauty",
      rate: "$500-800",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      rating: 4.9,
      engagement: "4.2%",
      verified: true
    },
    {
      name: "Maya Johnson",
      handle: "@mayaskincare",
      platform: "YouTube",
      followers: "156K",
      niche: "Skincare Reviews",
      rate: "$800-1200",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      rating: 4.9,
      engagement: "3.8%",
      verified: true
    },
    {
      name: "Alex Kim",
      handle: "@alexbeauty",
      platform: "Instagram",
      followers: "67K",
      niche: "Beauty Tutorials",
      rate: "$400-700",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      rating: 4.7,
      engagement: "4.5%",
      verified: true
    }
  ]

  const faqs = [
    {
      question: "How does performance-based payment work?",
      answer: "You set performance goals (views, clicks, sales) and only pay when those targets are met. Creators get paid based on actual results, not just posting content."
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                ViralReach
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/creator" className="text-gray-600 hover:text-gray-900">For Creators</Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">Sign In</Link>
            </div>
            <div className="md:hidden">
              <button className="text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Netflix Style with Brand Logos Background */}
      <section className="relative pt-24 pb-16 bg-black overflow-hidden">
        {/* Diagonal Collage Background of Brand Logos */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] flex flex-wrap gap-4" style={{ width: '120vw', height: '60vh' }}>
            {[
              // Diverse Beauty & Skincare Brand Logos
              "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&crop=center", // Glossier-style minimal
              "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop&crop=center", // Luxury skincare
              "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=200&fit=crop&crop=center", // Organic beauty
              "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop&crop=center", // Skincare bottle
              "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop&crop=center", // Beauty product
              "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200&h=200&fit=crop&crop=center", // Serum bottle
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center", // Cream jar
              "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop&crop=center", // Premium brand
              "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=200&fit=crop&crop=center", // Organic brand
              "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop&crop=center", // Skincare brand
              "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop&crop=center", // Beauty brand
              "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200&h=200&fit=crop&crop=center", // Serum brand
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center", // Cream brand
              "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop&crop=center", // Luxury brand
              "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&h=200&fit=crop&crop=center", // Organic brand
              "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&crop=center", // Glossier brand
              "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop&crop=center", // Skincare brand
              "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop&crop=center" // Beauty brand
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Brand Logo ${i + 1}`}
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
                For Beauty & Skincare Brands
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                Get Real Results from{' '}
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Influencer Marketing
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow">
                Connect with verified beauty and skincare creators. 
                <span className="font-medium text-purple-200"> Pay only for real results, not just posts.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <Link 
                href="/signup?type=brand"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Your Campaign
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <button className="bg-white/90 backdrop-blur-sm text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Browse Creators
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-200"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>500+ Verified Creators</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Performance-Based Pay</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Escrow Protection</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Why Choose ViralReach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ViralReach Over Other Platforms?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another influencer platform. We're the only one that puts your results first.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {brandBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="text-pink-500 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {benefit.description}
                </p>
                <div className="text-sm font-medium text-purple-600">
                  {benefit.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works for Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes, not months. Our streamlined process makes influencer marketing simple and effective.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">
                  {step.description}
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  {step.icon}
                  <span className="ml-1">{step.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Top Creators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verified beauty and skincare influencers ready to promote your brand.
            </p>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-12 max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Creator Marketplace Coming Soon
              </h3>
              <p className="text-gray-600 mb-6">
                We're curating an exclusive network of verified beauty and skincare creators. 
                Get notified when our creator marketplace launches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                  Get Notified
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything brands need to know about ViralReach.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <button
                  onClick={() => setIsFAQOpen(isFAQOpen === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isFAQOpen === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {isFAQOpen === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Real Results?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join hundreds of beauty brands who've already discovered the ViralReach difference.
          </p>
          <Link 
            href="/signup?type=brand"
            className="inline-flex items-center bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Your First Campaign
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                ViralReach
              </div>
              <p className="text-gray-400 mb-4">
                The future of performance-based influencer marketing for beauty and skincare brands.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Video className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/creator" className="hover:text-white">For Creators</Link></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ViralReach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 