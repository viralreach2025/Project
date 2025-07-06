-- Add missing columns to brand_profiles table
ALTER TABLE public.brand_profiles 
ADD COLUMN IF NOT EXISTS brand_name TEXT,
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_reviews INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS description TEXT;

-- Update existing brand profiles with sample data
UPDATE public.brand_profiles 
SET 
  brand_name = 'Glow Beauty',
  logo_url = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop&crop=face',
  verified = true,
  rating = 4.8,
  total_reviews = 127,
  website = 'https://glowbeauty.com',
  description = 'Premium skincare and beauty products'
WHERE id = '550e8400-e29b-41d4-a716-446655440001';

UPDATE public.brand_profiles 
SET 
  brand_name = 'FitLife Supplements',
  logo_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
  verified = true,
  rating = 4.6,
  total_reviews = 89,
  website = 'https://fitlife.com',
  description = 'Plant-based supplements for active lifestyles'
WHERE id = '550e8400-e29b-41d4-a716-446655440002';

UPDATE public.brand_profiles 
SET 
  brand_name = 'EcoStyle Fashion',
  logo_url = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop&crop=face',
  verified = true,
  rating = 4.9,
  total_reviews = 203,
  website = 'https://ecostyle.com',
  description = 'Sustainable fashion for conscious consumers'
WHERE id = '550e8400-e29b-41d4-a716-446655440003';

UPDATE public.brand_profiles 
SET 
  brand_name = 'TechFlow Solutions',
  logo_url = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face',
  verified = true,
  rating = 4.7,
  total_reviews = 156,
  website = 'https://techflow.com',
  description = 'Innovative software solutions'
WHERE id = '550e8400-e29b-41d4-a716-446655440004';

UPDATE public.brand_profiles 
SET 
  brand_name = 'FreshBites Kitchen',
  logo_url = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=face',
  verified = true,
  rating = 4.5,
  total_reviews = 78,
  website = 'https://freshbites.com',
  description = 'Healthy meal delivery service'
WHERE id = '550e8400-e29b-41d4-a716-446655440005'; 