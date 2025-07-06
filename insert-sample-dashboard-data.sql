-- =====================================================
-- INSERT SAMPLE DATA FOR DASHBOARD TESTING
-- =====================================================

-- Insert sample users (if they don't exist)
INSERT INTO public.users (id, email, full_name, user_type, is_verified, is_active, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'creator@example.com', 'Sarah Johnson', 'creator', true, true, NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'brand@example.com', 'Mike Chen', 'brand', true, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample creator profile
INSERT INTO public.creator_profiles (id, user_id, niche, content_type, follower_count, engagement_rate, average_views, average_likes, average_comments, collaboration_experience, rate_range, availability_status, verification_status, created_at, updated_at)
VALUES (
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  ARRAY['lifestyle', 'fitness', 'wellness'],
  ARRAY['post', 'story', 'reel'],
  '{"instagram": 25000, "tiktok": 15000, "youtube": 5000}',
  4.2,
  5000,
  800,
  120,
  '2 years of brand collaborations',
  '{"min": 200, "max": 1500, "currency": "USD"}',
  'available',
  'verified',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert sample brand profile
INSERT INTO public.brand_profiles (id, user_id, industry, company_size, target_audience, previous_campaigns, total_spent, verification_status, created_at, updated_at)
VALUES (
  '660e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440002',
  'Health & Fitness',
  '50-200',
  '{"age_range": [18, 35], "interests": ["fitness", "wellness", "lifestyle"], "locations": ["US", "CA", "UK"]}',
  15,
  25000.00,
  'verified',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert sample campaigns
INSERT INTO public.campaigns (id, brand_id, title, description, campaign_type, goals, target_audience, content_requirements, deliverables, budget_range, timeline, status, is_featured, application_deadline, created_at, updated_at)
VALUES 
  (
    '770e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440002',
    'Summer Fitness Challenge',
    'Promote our new fitness app with engaging content about summer workouts',
    'awareness',
    '{"primary_goal": "brand_awareness", "kpis": ["reach", "engagement", "app_downloads"]}',
    '{"age_range": [18, 35], "interests": ["fitness", "wellness"], "locations": ["US"]}',
    'Create authentic content showcasing summer fitness routines',
    '{"posts": 3, "stories": 5, "videos": 1}',
    '{"min": 800, "max": 2000, "currency": "USD"}',
    '{"start_date": "2024-06-01", "end_date": "2024-06-30"}',
    'active',
    true,
    '2024-05-25',
    NOW(),
    NOW()
  ),
  (
    '770e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440002',
    'Wellness Product Launch',
    'Launch campaign for our new wellness supplements',
    'sales',
    '{"primary_goal": "sales", "kpis": ["conversions", "revenue", "engagement"]}',
    '{"age_range": [25, 45], "interests": ["health", "wellness", "supplements"], "locations": ["US", "CA"]}',
    'Educational content about wellness and product benefits',
    '{"posts": 2, "stories": 3, "videos": 2}',
    '{"min": 1200, "max": 3000, "currency": "USD"}',
    '{"start_date": "2024-07-01", "end_date": "2024-07-31"}',
    'active',
    false,
    '2024-06-20',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample applications
INSERT INTO public.applications (id, campaign_id, creator_id, proposal, proposed_rate, portfolio_samples, status, brand_notes, creator_notes, created_at, updated_at)
VALUES (
  '880e8400-e29b-41d4-a716-446655440001',
  '770e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  'I would love to create engaging fitness content showcasing your app! I have experience with fitness challenges and can create authentic content that resonates with my audience.',
  1200.00,
  ARRAY['https://example.com/portfolio1.jpg', 'https://example.com/portfolio2.jpg'],
  'pending',
  'Great proposal, fits our campaign goals well',
  'Excited about this opportunity!',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert sample collaborations
INSERT INTO public.collaborations (id, application_id, campaign_id, creator_id, brand_id, agreed_rate, deliverables, timeline, status, start_date, end_date, created_at, updated_at)
VALUES (
  '990e8400-e29b-41d4-a716-446655440001',
  '880e8400-e29b-41d4-a716-446655440001',
  '770e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440002',
  1200.00,
  '{"posts": 3, "stories": 5, "videos": 1}',
  '{"start_date": "2024-06-01", "end_date": "2024-06-30"}',
  'active',
  '2024-06-01',
  '2024-06-30',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert sample payments
INSERT INTO public.payments (id, collaboration_id, amount, currency, payment_type, status, platform_fee, creator_amount, payment_date, created_at)
VALUES (
  'aa0e8400-e29b-41d4-a716-446655440001',
  '990e8400-e29b-41d4-a716-446655440001',
  1200.00,
  'USD',
  'escrow',
  'completed',
  120.00,
  1080.00,
  '2024-06-15',
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- END OF SAMPLE DATA
-- ===================================================== 