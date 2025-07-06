'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, TrendingUp, DollarSign, BarChart3, Target, MessageSquare, CreditCard } from 'lucide-react';

export function InteractiveDemo() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: "Create Campaign",
      description: "Set your goals and budget",
      icon: "🎯",
      color: "from-purple-500 to-blue-500",
      dashboardView: "campaign-creation"
    },
    {
      title: "AI Matches Creators",
      description: "Get perfect creator recommendations",
      icon: "🤖",
      color: "from-blue-500 to-green-500",
      dashboardView: "creator-matching"
    },
    {
      title: "Collaborate & Launch",
      description: "Work together and go live",
      icon: "🚀",
      color: "from-green-500 to-purple-500",
      dashboardView: "collaboration"
    },
    {
      title: "Track Results",
      description: "Monitor performance & ROI",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
      dashboardView: "analytics"
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const resetDemo = () => {
    setStep(0);
    setIsAnimating(false);
  };

  const renderDashboardPreview = () => {
    const currentStep = steps[step];
    
    switch (currentStep.dashboardView) {
      case "campaign-creation":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Create Campaign</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Goal</label>
                <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                  <option>Brand Awareness</option>
                  <option>Lead Generation</option>
                  <option>Sales Conversion</option>
                </select>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <div className="flex space-x-2">
                  <input type="number" placeholder="$2,000" className="flex-1 p-2 border border-gray-300 rounded-md" />
                  <span className="text-gray-500 self-center">to</span>
                  <input type="number" placeholder="$5,000" className="flex-1 p-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <input type="text" placeholder="Women 25-35, Lifestyle" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        );

      case "creator-matching":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">AI Creator Matches</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live Matching</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: "Sarah Style", match: "98%", followers: "125K", niche: "Lifestyle", avatar: "SS" },
                { name: "Emma Lifestyle", match: "95%", followers: "89K", niche: "Beauty", avatar: "EL" },
                { name: "Maya Fashion", match: "92%", followers: "156K", niche: "Fashion", avatar: "MF" }
              ].map((creator, index) => (
                <motion.div
                  key={creator.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {creator.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{creator.name}</div>
                      <div className="text-sm text-gray-500">{creator.followers} • {creator.niche}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{creator.match}</div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "collaboration":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Campaign Collaboration</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Active</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium text-gray-900">Content Brief Sent</div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium text-gray-900">Creator Accepted</div>
                  <div className="text-sm text-gray-500">1 hour ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <div className="font-medium text-gray-900">Content in Review</div>
                  <div className="text-sm text-gray-500">Expected: 2 days</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Recent Messages</span>
                </div>
                <div className="text-sm text-gray-600">"Love the brief! Will have content ready by Friday."</div>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Live Campaign Analytics</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Real-time</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2.4M</div>
                <div className="text-sm text-gray-600">Total Reach</div>
                <div className="text-xs text-green-600">+12% vs last week</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">8.2%</div>
                <div className="text-sm text-gray-600">Engagement Rate</div>
                <div className="text-xs text-green-600">+3.1% vs last week</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">$12.5K</div>
                <div className="text-sm text-gray-600">Revenue Generated</div>
                <div className="text-xs text-green-600">+45% vs last week</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">1,247</div>
                <div className="text-sm text-gray-600">Clicks</div>
                <div className="text-xs text-green-600">+28% vs last week</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Performance Trend</span>
              </div>
              <div className="h-16 bg-white rounded border flex items-center justify-center">
                <div className="text-xs text-gray-500">📈 Chart visualization would appear here</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Experience ViralReach in Action
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how easy it is to create campaigns, match with creators, and track results in real-time
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side - Interactive Demo */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {step + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(((step + 1) / steps.length) * 100)}%
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

          {/* Current Step */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${steps[step].color} flex items-center justify-center text-3xl`}>
              {steps[step].icon}
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {steps[step].title}
            </h4>
            <p className="text-gray-600">
              {steps[step].description}
            </p>
          </motion.div>

          {/* Demo Content */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Campaign Goal: Brand Awareness</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Budget: $2,000 - $5,000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Target: Women 25-35, Lifestyle</span>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {[
                  { name: "Sarah Style", match: "98%", followers: "125K" },
                  { name: "Emma Lifestyle", match: "95%", followers: "89K" },
                  { name: "Maya Fashion", match: "92%", followers: "156K" }
                ].map((creator, index) => (
                  <motion.div
                    key={creator.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {creator.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{creator.name}</div>
                        <div className="text-xs text-gray-500">{creator.followers} followers</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">{creator.match}</div>
                      <div className="text-xs text-gray-500">match</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Content brief sent</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Creator accepted offer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Content in review</span>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2.4M</div>
                  <div className="text-xs text-gray-500">Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">8.2%</div>
                  <div className="text-xs text-gray-500">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$12.5K</div>
                  <div className="text-xs text-gray-500">Revenue</div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {step < steps.length - 1 ? (
              <button
                onClick={nextStep}
                disabled={isAnimating}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            ) : (
              <button
                onClick={resetDemo}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200"
              >
                Start Over
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Dashboard Preview */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Preview the ViralReach Dashboard</h3>
              <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">Live Preview</span>
            </div>
            <div className="h-96">
              {renderDashboardPreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 