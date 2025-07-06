"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  Users, 
  DollarSign, 
  Calendar,
  Instagram,
  Youtube,
  Target as TiktokIcon,
  CheckCircle,
  Plus,
  X
} from 'lucide-react'
import Link from 'next/link'

interface CampaignData {
  name: string
  description: string
  goal: string
  targetAudience: string[]
  budget: {
    min: number
    max: number
  }
  platforms: string[]
  startDate: string
  endDate: string
  requirements: string
  deliverables: string[]
}

export default function NewCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    description: '',
    goal: '',
    targetAudience: [],
    budget: { min: 0, max: 0 },
    platforms: [],
    startDate: '',
    endDate: '',
    requirements: '',
    deliverables: []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    { id: 1, title: 'Campaign Basics', description: 'Name and description' },
    { id: 2, title: 'Goals & Audience', description: 'Define objectives and target audience' },
    { id: 3, title: 'Budget & Timeline', description: 'Set budget and dates' },
    { id: 4, title: 'Platforms & Requirements', description: 'Choose platforms and requirements' },
    { id: 5, title: 'Review & Launch', description: 'Review and publish campaign' }
  ]

  const goals = [
    'Brand Awareness',
    'Lead Generation',
    'Sales & Conversions',
    'Product Launch',
    'Community Building',
    'Event Promotion'
  ]

  const audienceOptions = [
    'Women 18-24',
    'Women 25-34',
    'Women 35-44',
    'Men 18-24',
    'Men 25-34',
    'Men 35-44',
    'Teens 13-17',
    'Parents',
    'Fitness Enthusiasts',
    'Fashion Lovers',
    'Tech Savvy',
    'Foodies',
    'Travelers',
    'Students',
    'Professionals'
  ]

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { id: 'tiktok', name: 'TikTok', icon: TiktokIcon, color: 'text-black' }
  ]

  const deliverables = [
    'Instagram Post',
    'Instagram Story',
    'Instagram Reel',
    'YouTube Video',
    'TikTok Video',
    'Blog Post',
    'Product Review',
    'Unboxing Video',
    'Tutorial',
    'Behind the Scenes'
  ]

  const handleInputChange = (field: string, value: any) => {
    setCampaignData(prev => ({ ...prev, [field]: value }))
  }

  const handleAudienceToggle = (audience: string) => {
    setCampaignData(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter(a => a !== audience)
        : [...prev.targetAudience, audience]
    }))
  }

  const handlePlatformToggle = (platform: string) => {
    setCampaignData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  const handleDeliverableToggle = (deliverable: string) => {
    setCampaignData(prev => ({
      ...prev,
      deliverables: prev.deliverables.includes(deliverable)
        ? prev.deliverables.filter(d => d !== deliverable)
        : [...prev.deliverables, deliverable]
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Redirect to dashboard
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Error creating campaign:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return campaignData.name && campaignData.description
      case 2:
        return campaignData.goal && campaignData.targetAudience.length > 0
      case 3:
        return campaignData.budget.min > 0 && campaignData.budget.max > 0 && 
               campaignData.startDate && campaignData.endDate
      case 4:
        return campaignData.platforms.length > 0 && campaignData.requirements
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
                <p className="text-gray-600">Set up your influencer marketing campaign</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <p className={`text-sm font-medium ${
                  currentStep === step.id ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Basics</h2>
                <p className="text-gray-600 mb-6">Start by giving your campaign a name and description.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Summer Fashion Collection Launch"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Description *
                </label>
                <textarea
                  value={campaignData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your campaign goals, target audience, and what you're looking for from creators..."
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Goals & Target Audience</h2>
                <p className="text-gray-600 mb-6">Define your campaign objectives and target audience.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Primary Goal *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => handleInputChange('goal', goal)}
                      className={`p-3 text-left rounded-lg border-2 transition-colors ${
                        campaignData.goal === goal
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Target Audience * (Select all that apply)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {audienceOptions.map((audience) => (
                    <button
                      key={audience}
                      type="button"
                      onClick={() => handleAudienceToggle(audience)}
                      className={`p-2 text-sm rounded border transition-colors ${
                        campaignData.targetAudience.includes(audience)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {audience}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget & Timeline</h2>
                <p className="text-gray-600 mb-6">Set your budget range and campaign timeline.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Budget *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={campaignData.budget.min}
                      onChange={(e) => handleInputChange('budget', { ...campaignData.budget, min: Number(e.target.value) })}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Budget *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={campaignData.budget.max}
                      onChange={(e) => handleInputChange('budget', { ...campaignData.budget, max: Number(e.target.value) })}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Platforms & Requirements</h2>
                <p className="text-gray-600 mb-6">Choose platforms and define content requirements.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Social Media Platforms * (Select all that apply)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        campaignData.platforms.includes(platform.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <platform.icon className={`w-8 h-8 mx-auto mb-2 ${platform.color}`} />
                      <span className="text-sm font-medium">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Requirements *
                </label>
                <textarea
                  value={campaignData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe what you're looking for in terms of content style, messaging, hashtags, etc..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Deliverables (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {deliverables.map((deliverable) => (
                    <button
                      key={deliverable}
                      type="button"
                      onClick={() => handleDeliverableToggle(deliverable)}
                      className={`p-2 text-sm rounded border transition-colors ${
                        campaignData.deliverables.includes(deliverable)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {deliverable}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Review & Launch</h2>
                <p className="text-gray-600 mb-6">Review your campaign details before launching.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Campaign Name</h3>
                  <p className="text-gray-600">{campaignData.name}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Description</h3>
                  <p className="text-gray-600">{campaignData.description}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Goal</h3>
                  <p className="text-gray-600">{campaignData.goal}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Target Audience</h3>
                  <div className="flex flex-wrap gap-2">
                    {campaignData.targetAudience.map((audience) => (
                      <span key={audience} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Budget</h3>
                  <p className="text-gray-600">${campaignData.budget.min.toLocaleString()} - ${campaignData.budget.max.toLocaleString()}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Timeline</h3>
                  <p className="text-gray-600">{campaignData.startDate} to {campaignData.endDate}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Platforms</h3>
                  <div className="flex gap-2">
                    {campaignData.platforms.map((platform) => (
                      <span key={platform} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepValid()}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    Launch Campaign
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 