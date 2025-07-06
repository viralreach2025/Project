'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, DollarSign, Users, Eye, Target } from 'lucide-react';

export function DashboardPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Campaign Analytics</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Real-time</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 bg-blue-50 rounded-lg"
        >
          <div className="text-2xl font-bold text-blue-600">2.4M</div>
          <div className="text-sm text-gray-600">Total Reach</div>
          <div className="text-xs text-green-600">+12% vs last week</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 bg-green-50 rounded-lg"
        >
          <div className="text-2xl font-bold text-green-600">8.2%</div>
          <div className="text-sm text-gray-600">Engagement Rate</div>
          <div className="text-xs text-green-600">+3.1% vs last week</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 bg-purple-50 rounded-lg"
        >
          <div className="text-2xl font-bold text-purple-600">$12.5K</div>
          <div className="text-sm text-gray-600">Revenue Generated</div>
          <div className="text-xs text-green-600">+45% vs last week</div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center p-4 bg-orange-50 rounded-lg"
        >
          <div className="text-2xl font-bold text-orange-600">1,247</div>
          <div className="text-sm text-gray-600">Clicks</div>
          <div className="text-xs text-green-600">+28% vs last week</div>
        </motion.div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">Performance Trend</span>
        </div>
        <div className="h-20 bg-white rounded border flex items-center justify-center">
          <div className="text-xs text-gray-500">📈 Live performance chart</div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>Campaign: Summer Skincare Launch</span>
        <span>Updated 2 min ago</span>
      </div>
    </div>
  );
} 