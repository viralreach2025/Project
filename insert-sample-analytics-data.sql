-- Insert sample users
INSERT INTO public.users (id, email, user_type, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'creator@example.com', 'creator', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'brand@example.com', 'brand', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample creator profile
INSERT INTO public.creator_profiles (id, user_id, display_name, bio, niche, follower_count, engagement_rate, availability_status, created_at, updated_at)
VALUES 
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Sarah Johnson', 'Lifestyle and beauty content creator', '["lifestyle", "beauty", "fashion"]', 125430, 4.8, 'available', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample brand profile
INSERT INTO public.brand_profiles (id, user_id, brand_name, logo_url, verified, rating, total_reviews, industry, company_size, website, description, created_at, updated_at)
VALUES 
  ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Glow Beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop&crop=face', true, 4.8, 127, 'Beauty & Personal Care', '50-200', 'https://glowbeauty.com', 'Premium skincare and beauty products', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample campaign
INSERT INTO public.campaigns (id, brand_id, title, description, campaign_type, goals, target_audience, content_requirements, deliverables, budget_range, timeline, status, is_featured, application_deadline, created_at, updated_at)
VALUES 
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Summer Skincare Campaign', 'Promote our new summer skincare line with authentic content.', 'awareness', '{"primary_goal": "brand_awareness", "kpis": ["reach", "engagement"]}', '{"age_range": [18, 35], "interests": ["skincare", "beauty", "self-care"], "locations": ["Worldwide"]}', 'Authentic content showcasing product benefits and usage', '{"posts": 3, "stories": 5, "videos": 1}', '{"min": 800, "max": 1500, "currency": "USD"}', '{"start_date": "2024-01-15", "end_date": "2024-02-15"}', 'active', true, '2024-02-15T23:59:59Z', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample application
INSERT INTO public.applications (id, campaign_id, creator_id, proposal, proposed_rate, portfolio_samples, status, created_at, updated_at)
VALUES 
  ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'I would love to collaborate on this skincare campaign!', 1200.00, '["sample1.jpg", "sample2.jpg"]', 'pending', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample collaboration
INSERT INTO public.collaborations (id, application_id, campaign_id, creator_id, brand_id, agreed_rate, deliverables, timeline, status, start_date, end_date, created_at, updated_at)
VALUES 
  ('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 1200.00, '{"posts": 3, "stories": 5, "videos": 1}', '{"start_date": "2024-01-15", "end_date": "2024-02-15"}', 'active', '2024-01-15T00:00:00Z', '2024-02-15T23:59:59Z', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample performance metrics
INSERT INTO public.performance_metrics (id, content_submission_id, collaboration_id, platform, metrics, engagement_rate, reach, impressions, date_recorded, created_at)
VALUES 
  ('bb0e8400-e29b-41d4-a716-446655440001', NULL, 'aa0e8400-e29b-41d4-a716-446655440001', 'Instagram', '{"views": 15000, "likes": 1200, "comments": 150, "shares": 45, "clicks": 300}', 8.5, 15000, 18000, CURRENT_DATE, NOW()),
  ('bb0e8400-e29b-41d4-a716-446655440002', NULL, 'aa0e8400-e29b-41d4-a716-446655440001', 'TikTok', '{"views": 25000, "likes": 2000, "comments": 300, "shares": 120, "clicks": 500}', 9.2, 25000, 28000, CURRENT_DATE, NOW())
ON CONFLICT (id) DO NOTHING; 