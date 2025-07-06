'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

interface QuizData {
  email: string
  userType: 'brand' | 'creator' | 'agency'
  primaryGoal: string
  biggestChallenge: string
  budgetRange?: string
  timeline: string
  followerCount?: string
  preferredPlatform?: string
  monthlyCampaigns?: string
}

interface WaitlistQuizProps {
  onComplete: (data: QuizData) => void
  onSkip: () => void
}

// Role selection question
const roleQuestion = {
  id: 'userType',
  question: 'I am a...',
  options: [
    { value: 'brand', label: 'Skincare/Brand', description: 'Looking for authentic creators' },
    { value: 'creator', label: 'Content Creator', description: 'Want to work with real brands' },
    { value: 'agency', label: 'Marketing Agency', description: 'Managing campaigns for clients' }
  ]
}

// Role-specific questions
const roleSpecificQuestions = {
  brand: [
    {
      id: 'primaryGoal',
      question: 'What\'s your primary goal?',
      options: [
        { value: 'increase_sales', label: 'Increase Sales', description: 'Drive more conversions' },
        { value: 'brand_awareness', label: 'Brand Awareness', description: 'Get your brand noticed' },
        { value: 'product_launch', label: 'Product Launch', description: 'Launch new products' },
        { value: 'customer_acquisition', label: 'Customer Acquisition', description: 'Get new customers' }
      ]
    },
    {
      id: 'biggestChallenge',
      question: 'What\'s your biggest challenge?',
      options: [
        { value: 'finding_authentic_creators', label: 'Finding Authentic Creators', description: 'Hard to find real influencers' },
        { value: 'measuring_roi', label: 'Measuring ROI', description: 'Not sure if campaigns work' },
        { value: 'fake_engagement', label: 'Fake Engagement', description: 'Dealing with fake followers' },
        { value: 'budget_allocation', label: 'Budget Allocation', description: 'Not sure where to spend' }
      ]
    },
    {
      id: 'budgetRange',
      question: 'What\'s your budget range?',
      options: [
        { value: 'under_1k', label: 'Under $1K', description: 'Small budget campaigns' },
        { value: '1k_5k', label: '$1K - $5K', description: 'Medium budget campaigns' },
        { value: '5k_20k', label: '$5K - $20K', description: 'Large budget campaigns' },
        { value: '20k_plus', label: '$20K+', description: 'Enterprise level campaigns' }
      ]
    },
    {
      id: 'timeline',
      question: 'What\'s your timeline?',
      options: [
        { value: 'immediately', label: 'Immediately', description: 'Ready to start now' },
        { value: 'within_month', label: 'Within a Month', description: 'Planning phase' },
        { value: 'within_quarter', label: 'Within 3 Months', description: 'Future planning' },
        { value: 'just_exploring', label: 'Just Exploring', description: 'Exploring options' }
      ]
    }
  ],
  creator: [
    {
      id: 'primaryGoal',
      question: 'What\'s your primary goal?',
      options: [
        { value: 'earn_more_money', label: 'Earn More Money', description: 'Increase my income' },
        { value: 'authentic_partnerships', label: 'Authentic Partnerships', description: 'Work with real brands' },
        { value: 'grow_audience', label: 'Grow Audience', description: 'Build my following' },
        { value: 'better_brands', label: 'Better Brands', description: 'Work with premium brands' }
      ]
    },
    {
      id: 'biggestChallenge',
      question: 'What\'s your biggest challenge?',
      options: [
        { value: 'getting_paid_fairly', label: 'Getting Paid Fairly', description: 'Not earning what I deserve' },
        { value: 'good_partnerships', label: 'Finding Good Partnerships', description: 'Hard to find quality brands' },
        { value: 'fake_engagement', label: 'Fake Engagement', description: 'Dealing with fake followers' },
        { value: 'authentic_content', label: 'Building Authentic Content', description: 'Creating real content' }
      ]
    },
    {
      id: 'followerCount',
      question: 'What\'s your follower count?',
      options: [
        { value: 'under_10k', label: 'Under 10K', description: 'Micro-influencer' },
        { value: '10k_50k', label: '10K - 50K', description: 'Growing influencer' },
        { value: '50k_200k', label: '50K - 200K', description: 'Established influencer' },
        { value: '200k_plus', label: '200K+', description: 'Macro-influencer' }
      ]
    },
    {
      id: 'preferredPlatform',
      question: 'What\'s your preferred platform?',
      options: [
        { value: 'instagram', label: 'Instagram', description: 'My main platform' },
        { value: 'tiktok', label: 'TikTok', description: 'Short-form content' },
        { value: 'youtube', label: 'YouTube', description: 'Long-form content' },
        { value: 'multiple', label: 'Multiple Platforms', description: 'Cross-platform creator' }
      ]
    }
  ],
  agency: [
    {
      id: 'primaryGoal',
      question: 'What\'s your primary goal?',
      options: [
        { value: 'better_client_results', label: 'Better Client Results', description: 'Deliver better outcomes' },
        { value: 'streamline_processes', label: 'Streamline Processes', description: 'Automate workflows' },
        { value: 'reduce_costs', label: 'Reduce Costs', description: 'Lower campaign costs' },
        { value: 'scale_campaigns', label: 'Scale Campaigns', description: 'Handle more campaigns' }
      ]
    },
    {
      id: 'biggestChallenge',
      question: 'What\'s your biggest challenge?',
      options: [
        { value: 'client_satisfaction', label: 'Client Satisfaction', description: 'Keeping clients happy' },
        { value: 'measuring_success', label: 'Measuring Success', description: 'Proving campaign value' },
        { value: 'reliable_creators', label: 'Finding Reliable Creators', description: 'Quality creator network' },
        { value: 'managing_campaigns', label: 'Managing Multiple Campaigns', description: 'Campaign coordination' }
      ]
    },
    {
      id: 'monthlyCampaigns',
      question: 'How many campaigns do you manage monthly?',
      options: [
        { value: '1_5', label: '1-5 Campaigns', description: 'Small agency' },
        { value: '5_20', label: '5-20 Campaigns', description: 'Medium agency' },
        { value: '20_50', label: '20-50 Campaigns', description: 'Large agency' },
        { value: '50_plus', label: '50+ Campaigns', description: 'Enterprise agency' }
      ]
    },
    {
      id: 'timeline',
      question: 'What\'s your timeline?',
      options: [
        { value: 'immediately', label: 'Immediately', description: 'Ready to start now' },
        { value: 'within_month', label: 'Within a Month', description: 'Planning phase' },
        { value: 'within_quarter', label: 'Within 3 Months', description: 'Future planning' },
        { value: 'just_exploring', label: 'Just Exploring', description: 'Exploring options' }
      ]
    }
  ]
}

export default function WaitlistQuiz({ onComplete, onSkip }: WaitlistQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState('')
  const [answers, setAnswers] = useState<Partial<QuizData>>({})
  const [isEmailValid, setIsEmailValid] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const getCurrentQuestion = () => {
    if (currentStep === 0) return null // Email step
    if (currentStep === 1) return roleQuestion // Role selection
    
    const userType = answers.userType as 'brand' | 'creator' | 'agency'
    if (!userType) return null
    
    const roleQuestions = roleSpecificQuestions[userType]
    const questionIndex = currentStep - 2 // Subtract email and role steps
    return roleQuestions[questionIndex]
  }

  const getTotalSteps = () => {
    const userType = answers.userType as 'brand' | 'creator' | 'agency'
    if (!userType) return 2 // Email + role selection
    
    const roleQuestions = roleSpecificQuestions[userType]
    return 2 + roleQuestions.length // Email + role + role-specific questions
  }

  const handleNext = () => {
    if (currentStep === 0 && !isEmailValid) return
    if (currentStep < getTotalSteps()) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete({ email, ...answers } as QuizData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = getCurrentQuestion()
  const totalSteps = getTotalSteps()

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 0 ? (
            // Email Step
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Let's get started! What's your email?
              </h3>
              <p className="text-gray-600 mb-8">
                We'll send you updates about ViralReach and exclusive early access
              </p>
              <div className="max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {email && !isEmailValid && (
                  <p className="text-red-500 text-sm mt-2">Please enter a valid email address</p>
                )}
              </div>
            </div>
          ) : currentQuestion ? (
            // Quiz Questions
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {currentQuestion.question}
              </h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      answers[currentQuestion.id as keyof QuizData] === option.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onSkip}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip quiz
        </button>
        
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={currentStep === 0 ? !isEmailValid : !currentQuestion || !answers[currentQuestion.id as keyof QuizData]}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
} 