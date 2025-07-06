-- Insert sample brand profiles first
INSERT INTO public.brand_profiles (id, user_id, brand_name, logo_url, verified, rating, total_reviews, industry, company_size, website, description, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Glow Beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop&crop=face', true, 4.8, 127, 'Beauty & Personal Care', '50-200', 'https://glowbeauty.com', 'Premium skincare and beauty products', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'FitLife Supplements', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face', true, 4.6, 89, 'Health & Fitness', '10-50', 'https://fitlife.com', 'Plant-based supplements for active lifestyles', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'EcoStyle Fashion', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop&crop=face', true, 4.9, 203, 'Fashion & Apparel', '100-500', 'https://ecostyle.com', 'Sustainable fashion for conscious consumers', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'TechFlow Solutions', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face', true, 4.7, 156, 'Technology', '200-1000', 'https://techflow.com', 'Innovative software solutions', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'FreshBites Kitchen', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=face', true, 4.5, 78, 'Food & Beverage', '20-100', 'https://freshbites.com', 'Healthy meal delivery service', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample campaigns
INSERT INTO public.campaigns (id, brand_id, title, description, campaign_type, goals, target_audience, content_requirements, deliverables, budget_range, timeline, status, is_featured, application_deadline, created_at, updated_at)
VALUES 
  (
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Summer Skincare Campaign',
    'Promote our new summer skincare line with authentic content. Looking for creators who genuinely love skincare and can create engaging tutorials.',
    'awareness',
    '{"primary_goal": "brand_awareness", "kpis": ["reach", "engagement"]}',
    '{"age_range": [18, 35], "interests": ["skincare", "beauty", "self-care"], "locations": ["Worldwide"]}',
    'Authentic content showcasing product benefits and usage',
    '{"posts": 3, "stories": 5, "videos": 1}',
    '{"min": 800, "max": 1500, "currency": "USD"}',
    '{"start_date": "2024-01-15", "end_date": "2024-02-15"}',
    'active',
    true,
    '2024-02-15T23:59:59Z',
    NOW(),
    NOW()
  ),
  (
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440002',
    'Protein Powder Launch',
    'Help us launch our new plant-based protein powder. Create content that showcases the benefits and taste of our product.',
    'sales',
    '{"primary_goal": "product_launch", "kpis": ["sales", "engagement"]}',
    '{"age_range": [20, 40], "interests": ["fitness", "health", "nutrition"], "locations": ["US", "Canada"]}',
    'Content highlighting product benefits and taste',
    '{"posts": 4, "stories": 8, "videos": 2}',
    '{"min": 1200, "max": 2500, "currency": "USD"}',
    '{"start_date": "2024-01-20", "end_date": "2024-02-20"}',
    'active',
    false,
    '2024-02-20T23:59:59Z',
    NOW(),
    NOW()
  ),
  (
    '660e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440003',
    'Sustainable Fashion Collection',
    'Promote our eco-friendly fashion line. We''re looking for creators who are passionate about sustainability and fashion.',
    'engagement',
    '{"primary_goal": "brand_engagement", "kpis": ["engagement", "reach"]}',
    '{"age_range": [18, 30], "interests": ["fashion", "sustainability", "lifestyle"], "locations": ["Worldwide"]}',
    'Stylish content showcasing sustainable fashion',
    '{"posts": 5, "stories": 10, "videos": 1}',
    '{"min": 600, "max": 1200, "currency": "USD"}',
    '{"start_date": "2024-01-25", "end_date": "2024-02-25"}',
    'active',
    true,
    '2024-02-25T23:59:59Z',
    NOW(),
    NOW()
  ),
  (
    '660e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440004',
    'App Launch Campaign',
    'Help us launch our new productivity app. Create content that demonstrates the app''s features and benefits.',
    'launch',
    '{"primary_goal": "app_launch", "kpis": ["downloads", "engagement"]}',
    '{"age_range": [25, 45], "interests": ["productivity", "technology", "business"], "locations": ["Worldwide"]}',
    'Content demonstrating app features and use cases',
    '{"posts": 3, "stories": 6, "videos": 2}',
    '{"min": 1500, "max": 3000, "currency": "USD"}',
    '{"start_date": "2024-02-01", "end_date": "2024-03-01"}',
    'active',
    false,
    '2024-03-01T23:59:59Z',
    NOW(),
    NOW()
  ),
  (
    '660e8400-e29b-41d4-a716-446655440005',
    '550e8400-e29b-41d4-a716-446655440005',
    'Healthy Meal Prep Series',
    'Create content around healthy meal preparation using our fresh ingredients. Show creative recipes and meal prep tips.',
    'engagement',
    '{"primary_goal": "content_engagement", "kpis": ["engagement", "reach"]}',
    '{"age_range": [22, 40], "interests": ["cooking", "health", "meal_prep"], "locations": ["US"]}',
    'Creative cooking content and meal prep tutorials',
    '{"posts": 6, "stories": 12, "videos": 3}',
    '{"min": 1000, "max": 2000, "currency": "USD"}',
    '{"start_date": "2024-02-05", "end_date": "2024-03-05"}',
    'active',
    true,
    '2024-03-05T23:59:59Z',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- Insert campaign requirements
INSERT INTO public.campaign_requirements (id, campaign_id, requirement_type, requirement_value, is_required, created_at)
VALUES 
  -- Glow Beauty Campaign Requirements
  ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'platform', '["Instagram", "TikTok"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 'audience_size', '{"min": 50000, "max": 200000}', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'engagement_rate', 4.5, true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440001', 'content_type', '["Video", "Photos", "Stories"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440001', 'niche', '["skincare", "beauty", "self-care"]', true, NOW()),

  -- FitLife Supplements Campaign Requirements
  ('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440002', 'platform', '["Instagram", "YouTube"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440002', 'audience_size', '{"min": 75000, "max": 300000}', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440002', 'engagement_rate', 5.0, true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440002', 'content_type', '["Video", "Photos"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440002', 'niche', '["fitness", "health", "nutrition"]', true, NOW()),

  -- EcoStyle Fashion Campaign Requirements
  ('770e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440003', 'platform', '["Instagram", "TikTok", "Pinterest"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440003', 'audience_size', '{"min": 30000, "max": 150000}', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440003', 'engagement_rate', 4.0, true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440003', 'content_type', '["Photos", "Stories", "Reels"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440015', '660e8400-e29b-41d4-a716-446655440003', 'niche', '["fashion", "sustainability", "lifestyle"]', true, NOW()),

  -- TechFlow Solutions Campaign Requirements
  ('770e8400-e29b-41d4-a716-446655440016', '660e8400-e29b-41d4-a716-446655440004', 'platform', '["LinkedIn", "YouTube", "Twitter"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440017', '660e8400-e29b-41d4-a716-446655440004', 'audience_size', '{"min": 100000, "max": 500000}', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440018', '660e8400-e29b-41d4-a716-446655440004', 'engagement_rate', 3.5, true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440019', '660e8400-e29b-41d4-a716-446655440004', 'content_type', '["Video", "Screenshots", "Tutorials"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440020', '660e8400-e29b-41d4-a716-446655440004', 'niche', '["technology", "productivity", "business"]', true, NOW()),

  -- FreshBites Kitchen Campaign Requirements
  ('770e8400-e29b-41d4-a716-446655440021', '660e8400-e29b-41d4-a716-446655440005', 'platform', '["Instagram", "TikTok", "YouTube"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440022', '660e8400-e29b-41d4-a716-446655440005', 'audience_size', '{"min": 40000, "max": 180000}', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440023', '660e8400-e29b-41d4-a716-446655440005', 'engagement_rate', 4.2, true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440024', '660e8400-e29b-41d4-a716-446655440005', 'content_type', '["Video", "Photos", "Recipes"]', true, NOW()),
  ('770e8400-e29b-41d4-a716-446655440025', '660e8400-e29b-41d4-a716-446655440005', 'niche', '["cooking", "health", "meal_prep"]', true, NOW())
ON CONFLICT (id) DO NOTHING; 