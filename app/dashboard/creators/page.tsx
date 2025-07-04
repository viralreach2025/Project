"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Heart, 
  MessageSquare,
  Star,
  Instagram,
  Youtube,
  Twitter,
  Eye,
  Bookmark,
  TrendingUp,
  Target,
  DollarSign,
  Calendar,
  CheckCircle,
  Verified
} from 'lucide-react'

export default function CreatorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedNiche, setSelectedNiche] = useState('all')
  const [selectedFollowers, setSelectedFollowers] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')

  // Mock creator data
  const creators = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjohnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      platforms: [
        { name: "Instagram", followers: 125000, engagement: 4.2, verified: true },
        { name: "TikTok", followers: 89000, engagement: 6.8, verified: true }
      ],
      niche: "Fashion & Lifestyle",
      location: "Los Angeles, CA",
      rate: 2500,
      rating: 4.9,
      reviews: 47,
      availability: "Available",
      languages: ["English", "Spanish"],
      description: "Fashion enthusiast sharing style tips and lifestyle content. Passionate about sustainable fashion and empowering women through style.",
      tags: ["Fashion", "Lifestyle", "Sustainable", "Women Empowerment"],
      recentPosts: [
        { platform: "Instagram", views: 45000, engagement: 4.5, date: "2024-01-15" },
        { platform: "TikTok", views: 89000, engagement: 7.2, date: "2024-01-12" }
      ],
      isVerified: true,
      isBookmarked: false
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mikechen_tech",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      platforms: [
        { name: "YouTube", followers: 450000, engagement: 3.8, verified: true },
        { name: "Instagram", followers: 89000, engagement: 4.1, verified: true }
      ],
      niche: "Technology",
      location: "San Francisco, CA",
      rate: 5000,
      rating: 4.7,
      reviews: 23,
      availability: "Available",
      languages: ["English", "Mandarin"],
      description: "Tech reviewer and gadget enthusiast. Sharing the latest in technology, gadgets, and digital lifestyle.",
      tags: ["Technology", "Gadgets", "Reviews", "Digital Lifestyle"],
      recentPosts: [
        { platform: "YouTube", views: 125000, engagement: 3.8, date: "2024-01-14" },
        { platform: "Instagram", views: 32000, engagement: 4.1, date: "2024-01-10" }
      ],
      isVerified: true,
      isBookmarked: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      handle: "@emmafitness",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      platforms: [
        { name: "Instagram", followers: 89000, engagement: 5.2, verified: true },
        { name: "TikTok", followers: 156000, engagement: 8.1, verified: true }
      ],
      niche: "Fitness & Wellness",
      location: "Miami, FL",
      rate: 1800,
      rating: 4.8,
      reviews: 34,
      availability: "Available",
      languages: ["English", "Spanish"],
      description: "Certified personal trainer and wellness coach. Helping people achieve their fitness goals through motivation and education.",
      tags: ["Fitness", "Wellness", "Nutrition", "Motivation"],
      recentPosts: [
        { platform: "Instagram", views: 28000, engagement: 5.2, date: "2024-01-15" },
        { platform: "TikTok", views: 156000, engagement: 8.1, date: "2024-01-13" }
      ],
      isVerified: true,
      isBookmarked: false
    },
    {
      id: 4,
      name: "Alex Thompson",
      handle: "@alexfoodie",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      platforms: [
        { name: "Instagram", followers: 67000, engagement: 6.1, verified: false },
        { name: "YouTube", followers: 89000, engagement: 4.3, verified: false }
      ],
      niche: "Food & Cooking",
      location: "New York, NY",
      rate: 1200,
      rating: 4.6,
      reviews: 18,
      availability: "Available",
      languages: ["English"],
      description: "Home chef and food enthusiast. Sharing delicious recipes, cooking tips, and food adventures.",
      tags: ["Food", "Cooking", "Recipes", "Restaurants"],
      recentPosts: [
        { platform: "Instagram", views: 22000, engagement: 6.1, date: "2024-01-14" },
        { platform: "YouTube", views: 45000, engagement: 4.3, date: "2024-01-11" }
      ],
      isVerified: false,
      isBookmarked: false
    }
  ]

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.niche.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPlatform = selectedPlatform === 'all' || 
                           creator.platforms.some(p => p.name.toLowerCase() === selectedPlatform.toLowerCase())
    
    const matchesNiche = selectedNiche === 'all' || creator.niche.toLowerCase() === selectedNiche.toLowerCase()
    
    const matchesFollowers = selectedFollowers === 'all' || 
                            creator.platforms.some(p => {
                              const followers = p.followers
                              switch (selectedFollowers) {
                                case 'micro': return followers >= 1000 && followers < 10000
                                case 'small': return followers >= 10000 && followers < 50000
                                case 'medium': return followers >= 50000 && followers < 100000
                                case 'large': return followers >= 100000 && followers < 500000
                                case 'macro': return followers >= 500000
                                default: return true
                              }
                            })
    
    return matchesSearch && matchesPlatform && matchesNiche && matchesFollowers
  })

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />
      case 'youtube': return <Youtube className="w-4 h-4" />
      case 'tiktok': return <div className="w-4 h-4 bg-black text-white rounded text-xs flex items-center justify-center font-bold">T</div>
      case 'twitter': return <Twitter className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getFollowerRange = (followers: number) => {
    if (followers >= 1000000) return `${(followers / 1000000).toFixed(1)}M`
    if (followers >= 1000) return `${(followers / 1000).toFixed(1)}K`
    return followers.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Creator Directory</h1>
              <p className="text-gray-600 mt-1">Discover and connect with verified influencers</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {filteredCreators.length} creators found
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search creators, niches, or handles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter</option>
              </select>
            </div>
            <div>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Niches</option>
                <option value="fashion & lifestyle">Fashion & Lifestyle</option>
                <option value="technology">Technology</option>
                <option value="fitness & wellness">Fitness & Wellness</option>
                <option value="food & cooking">Food & Cooking</option>
                <option value="beauty">Beauty</option>
                <option value="travel">Travel</option>
                <option value="gaming">Gaming</option>
              </select>
            </div>
            <div>
              <select
                value={selectedFollowers}
                onChange={(e) => setSelectedFollowers(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Sizes</option>
                <option value="micro">Micro (1K-10K)</option>
                <option value="small">Small (10K-50K)</option>
                <option value="medium">Medium (50K-100K)</option>
                <option value="large">Large (100K-500K)</option>
                <option value="macro">Macro (500K+)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="followers">Followers</option>
                <option value="engagement">Engagement</option>
                <option value="rating">Rating</option>
                <option value="rate">Rate</option>
              </select>
            </div>
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-200 hover:shadow-lg"
            >
              {/* Creator Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                        {creator.isVerified && (
                          <Verified className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{creator.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Bookmark className={`w-4 h-4 ${creator.isBookmarked ? 'text-purple-600 fill-current' : ''}`} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{creator.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{creator.rating}</span>
                    <span className="text-sm text-gray-600">({creator.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{creator.niche}</span>
                  <span className="text-sm font-medium text-green-600">{creator.availability}</span>
                </div>
              </div>

              {/* Platform Stats */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Platform Performance</h4>
                <div className="space-y-3">
                  {creator.platforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getPlatformIcon(platform.name)}
                        <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                        {platform.verified && (
                          <Verified className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {getFollowerRange(platform.followers)}
                        </div>
                        <div className="text-xs text-gray-600">
                          {platform.engagement}% engagement
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creator Info */}
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {creator.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {creator.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{creator.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">${creator.rate}</div>
                    <div className="text-xs text-gray-600">per post</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{creator.languages.length}</div>
                    <div className="text-xs text-gray-600">languages</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    <MessageSquare className="w-4 h-4 mr-2 inline" />
                    Contact
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 mr-2 inline" />
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No creators found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
} 