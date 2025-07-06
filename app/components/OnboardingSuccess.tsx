"use client"

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles, Users, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'

interface OnboardingSuccessProps {
  userType: 'brand' | 'creator'
  userName: string
}

export default function OnboardingSuccess({ userType, userName }: OnboardingSuccessProps) {
  const brandNextSteps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Browse Creators",
      description: "Discover thousands of vetted creators in your niche",
      action: "Explore Creators",
      href: "/dashboard/creators"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Launch Campaign",
      description: "Create your first campaign in under 5 minutes",
      action: "Create Campaign",
      href: "/dashboard/campaigns/new"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Track Results",
      description: "Monitor performance and ROI in real-time",
      action: "View Analytics",
      href: "/dashboard/analytics"
    }
  ]

  const creatorNextSteps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Complete Profile",
      description: "Add your social links and showcase your content",
      action: "Edit Profile",
      href: "/dashboard/profile"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Browse Opportunities",
      description: "Find brand partnerships that match your values",
      action: "View Opportunities",
      href: "/dashboard/opportunities"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Start Earning",
      description: "Apply to campaigns and start monetizing your influence",
      action: "Apply Now",
      href: "/dashboard/applications"
    }
  ]

  const steps = userType === 'brand' ? brandNextSteps : creatorNextSteps

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ViralReach, <span className="text-white">{userName}</span>! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {userType === 'brand' 
              ? "Your journey to influencer marketing success starts now!"
              : "Ready to monetize your influence and work with amazing brands!"
            }
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-purple-600 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Pro Tip</span>
            </div>
            <p className="text-gray-600 text-sm">
              {userType === 'brand'
                ? "Complete your first campaign within 24 hours to unlock premium features!"
                : "Complete your profile to increase your chances of getting selected by brands!"
              }
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-purple-600 mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {step.description}
              </p>
              <Link
                href={step.href}
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
              >
                {step.action}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              {userType === 'brand' 
                ? "Ready to launch your first campaign?"
                : "Ready to start earning?"
              }
            </h3>
            <p className="text-purple-100 mb-6">
              {userType === 'brand'
                ? "Join thousands of brands who've already found success with ViralReach"
                : "Join thousands of creators who've already earned millions with ViralReach"
              }
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            <p>
              Need help getting started?{' '}
              <Link href="/contact" className="text-purple-600 hover:text-purple-500">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 