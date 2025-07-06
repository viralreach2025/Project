'use client'

import { useState } from 'react'

interface PortfolioItem {
  id: string
  type: 'image' | 'video'
  url: string
  caption?: string
}

interface PortfolioCarouselProps {
  profileHandle: string
  portfolioItems: PortfolioItem[]
  className?: string
}

export default function PortfolioCarousel({ 
  profileHandle, 
  portfolioItems, 
  className = '' 
}: PortfolioCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
  }

  if (portfolioItems.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500">No portfolio items available</p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-purple-600">
              {profileHandle.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profileHandle}</h3>
            <p className="text-sm text-gray-500">Content Creator</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Main Content */}
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {portfolioItems[currentIndex] && (
            <>
              {portfolioItems[currentIndex].type === 'image' ? (
                <img
                  src={portfolioItems[currentIndex].url}
                  alt={`Portfolio item ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={portfolioItems[currentIndex].url}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
              
              {/* Caption overlay */}
              {portfolioItems[currentIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                  <p className="text-sm">{portfolioItems[currentIndex].caption}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Navigation arrows */}
        {portfolioItems.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {portfolioItems.length > 1 && (
        <div className="p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {portfolioItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex 
                    ? 'border-purple-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} of {portfolioItems.length}
          </span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors">
              Contact Creator
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 