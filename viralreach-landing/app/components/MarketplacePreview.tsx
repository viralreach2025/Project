import React, { useState } from 'react';

const creators = [
  {
    name: 'Sarah Style',
    platform: 'Instagram',
    followers: '125K',
    price: '$150',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: true,
    bio: 'I love working with skincare brands to create authentic content!',
    gallery: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=64&h=64&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=64&h=64&q=80'
    ],
    packages: [
      { name: 'Story + Post', price: '$150' },
      { name: '3x Stories', price: '$250' }
    ]
  },
  {
    name: 'Emma Lifestyle',
    platform: 'TikTok',
    followers: '89K',
    price: '$120',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    verified: false,
    bio: 'Lifestyle content creator passionate about beauty and wellness!',
    gallery: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=facearea&w=64&h=64&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&w=64&h=64&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=64&h=64&q=80'
    ],
    packages: [
      { name: 'TikTok Video', price: '$120' },
      { name: '2x Videos', price: '$200' }
    ]
  },
  {
    name: 'Maya Fashion',
    platform: 'YouTube',
    followers: '156K',
    price: '$200',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    verified: true,
    bio: 'Fashion and beauty YouTuber with a passion for authentic reviews!',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=64&h=64&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=64&h=64&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=64&h=64&q=80'
    ],
    packages: [
      { name: 'Product Review', price: '$200' },
      { name: 'Tutorial Video', price: '$300' }
    ]
  },
  {
    name: 'Lily Beauty',
    platform: 'Instagram',
    followers: '110K',
    price: '$180',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    verified: false,
    bio: 'Beauty influencer specializing in skincare and makeup tutorials!',
    gallery: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&w=64&h=64&q=80',
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=facearea&w=64&h=64&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=64&h=64&q=80'
    ],
    packages: [
      { name: 'Beauty Post', price: '$180' },
      { name: 'Skincare Routine', price: '$250' }
    ]
  },
];

export default function MarketplacePreview() {
  const [selectedCreator, setSelectedCreator] = useState(creators[0]);
  const [hoveredCreator, setHoveredCreator] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('Platform');
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedFollowers, setSelectedFollowers] = useState('Followers');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatorClick = (creator: typeof creators[0]) => {
    setSelectedCreator(creator);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-gray-900 relative">
      {/* Filter/Search Bar */}
      <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100 bg-gray-50">
        <select 
          className="text-sm px-3 py-1 rounded border border-gray-200 bg-white hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          <option>Platform</option>
          <option>Instagram</option>
          <option>TikTok</option>
          <option>YouTube</option>
        </select>
        <select 
          className="text-sm px-3 py-1 rounded border border-gray-200 bg-white hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>Category</option>
          <option>Fashion</option>
          <option>Lifestyle</option>
          <option>Beauty</option>
        </select>
        <select 
          className="text-sm px-3 py-1 rounded border border-gray-200 bg-white hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
          value={selectedFollowers}
          onChange={(e) => setSelectedFollowers(e.target.value)}
        >
          <option>Followers</option>
          <option>10K+</option>
          <option>50K+</option>
          <option>100K+</option>
        </select>
        <input
          className="flex-1 text-sm px-3 py-1 rounded border border-gray-200 bg-white hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors"
          placeholder="Search creators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid of Creator Cards */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {creators.map((creator, i) => (
          <div 
            key={i} 
            className={`bg-gray-50 rounded-xl p-3 flex flex-col items-center border border-gray-100 shadow-sm cursor-pointer transition-all duration-200 ${
              hoveredCreator === creator.name 
                ? 'bg-purple-50 border-purple-200 shadow-md transform scale-105' 
                : 'hover:bg-gray-100 hover:border-gray-200'
            } ${
              selectedCreator.name === creator.name 
                ? 'ring-2 ring-purple-500 bg-purple-50' 
                : ''
            }`}
            onClick={() => handleCreatorClick(creator)}
            onMouseEnter={() => setHoveredCreator(creator.name)}
            onMouseLeave={() => setHoveredCreator(null)}
          >
            <div className="relative">
              <img 
                src={creator.avatar} 
                alt={creator.name} 
                className={`w-14 h-14 rounded-full border-2 border-purple-200 object-cover transition-all duration-200 ${
                  hoveredCreator === creator.name ? 'border-purple-400 scale-110' : ''
                }`}
              />
              {creator.verified && (
                <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5 border border-white animate-pulse">✔</span>
              )}
            </div>
            <div className="mt-2 text-sm font-semibold text-gray-800">{creator.name}</div>
            <div className="text-xs text-gray-500">{creator.platform} • {creator.followers}</div>
            <div className="mt-1 text-xs font-bold text-purple-600">{creator.price}</div>
          </div>
        ))}
      </div>

      {/* Profile Preview Card */}
      <div className="p-4 border-t border-gray-100 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="flex gap-4 items-center">
          <img 
            src={selectedCreator.avatar} 
            alt={selectedCreator.name} 
            className="w-16 h-16 rounded-full border-2 border-purple-300 object-cover hover:border-purple-500 transition-colors cursor-pointer"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-800">{selectedCreator.name}</span>
              {selectedCreator.verified && (
                <span className="bg-green-500 text-white text-xs rounded px-1 ml-1 animate-pulse">Verified</span>
              )}
            </div>
            <div className="text-xs text-gray-500">{selectedCreator.platform} • {selectedCreator.followers} followers</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-700 italic">"{selectedCreator.bio}"</div>
        <div className="mt-3 flex gap-2">
          {selectedCreator.gallery.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Gallery ${index + 1}`} 
              className="w-10 h-10 rounded-lg object-cover hover:scale-110 transition-transform cursor-pointer border border-gray-200 hover:border-purple-300"
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {selectedCreator.packages.map((pkg, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-2 border border-gray-200 text-xs text-center hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <div className="font-bold text-purple-600">{pkg.price}</div>
              <div>{pkg.name}</div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 bg-purple-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
          Contact Creator
        </button>
      </div>

      {/* Sample Preview Badge */}
      <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded shadow hover:bg-purple-700 transition-colors cursor-pointer">
        Sample Preview
      </div>
    </div>
  );
} 