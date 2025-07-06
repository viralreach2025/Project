'use client'

import PortfolioCarousel from '../../components/PortfolioCarousel'

// Mock data for demonstration
const mockCreators = [
  {
    id: '1',
    profileHandle: '@beautycreator',
    portfolioItems: [
      {
        id: '1',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        caption: 'Skincare routine reveal!'
      },
      {
        id: '2',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
        caption: 'New product review'
      },
      {
        id: '3',
        type: 'video' as const,
        url: '/videos/T1.mp4',
        caption: 'Quick makeup tutorial'
      },
      {
        id: '4',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
        caption: 'Beauty haul time!'
      },
      {
        id: '5',
        type: 'video' as const,
        url: '/videos/T2.mp4',
        caption: 'Skincare tips'
      }
    ]
  },
  {
    id: '2',
    profileHandle: '@lifestyle_emma',
    portfolioItems: [
      {
        id: '1',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        caption: 'Morning routine'
      },
      {
        id: '2',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
        caption: 'Product testing'
      },
      {
        id: '3',
        type: 'video' as const,
        url: '/videos/T3.mp4',
        caption: 'Lifestyle vlog'
      },
      {
        id: '4',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
        caption: 'Fashion haul'
      }
    ]
  },
  {
    id: '3',
    profileHandle: '@skincare_expert',
    portfolioItems: [
      {
        id: '1',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        caption: 'Dermatologist approved'
      },
      {
        id: '2',
        type: 'video' as const,
        url: '/videos/T4.mp4',
        caption: 'Skincare routine'
      },
      {
        id: '3',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
        caption: 'Product comparison'
      },
      {
        id: '4',
        type: 'video' as const,
        url: '/videos/T5.mp4',
        caption: 'Ingredient breakdown'
      },
      {
        id: '5',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
        caption: 'Before & after'
      }
    ]
  },
  {
    id: '4',
    profileHandle: '@makeup_maven',
    portfolioItems: [
      {
        id: '1',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
        caption: 'Glam look tutorial'
      },
      {
        id: '2',
        type: 'video' as const,
        url: '/videos/T6.mp4',
        caption: 'Quick makeup tips'
      },
      {
        id: '3',
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
        caption: 'Product review'
      },
      {
        id: '4',
        type: 'video' as const,
        url: '/videos/T7.mp4',
        caption: 'Makeup transformation'
      }
    ]
  }
]

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Amazing Creators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our curated selection of talented content creators. 
            Each portfolio showcases their best work to help you find the perfect match for your brand.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Categories</option>
                <option>Beauty & Skincare</option>
                <option>Lifestyle</option>
                <option>Fashion</option>
                <option>Fitness</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Followers
              </label>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Any Size</option>
                <option>10K - 50K</option>
                <option>50K - 100K</option>
                <option>100K - 500K</option>
                <option>500K+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engagement Rate
              </label>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Any Rate</option>
                <option>2%+</option>
                <option>5%+</option>
                <option>8%+</option>
              </select>
            </div>

            <div className="ml-auto">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCreators.map((creator) => (
            <PortfolioCarousel
              key={creator.id}
              profileHandle={creator.profileHandle}
              portfolioItems={creator.portfolioItems}
              className="h-full"
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Load More Creators
          </button>
        </div>
      </div>
    </div>
  )
} 