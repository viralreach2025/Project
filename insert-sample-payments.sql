-- =====================================================
-- SAMPLE PAYMENT DATA FOR TESTING EARNINGS
-- =====================================================

-- Insert sample payments for creators
INSERT INTO public.payments (id, collaboration_id, amount, currency, payment_type, status, platform_fee, creator_amount, payment_date, created_at)
VALUES 
  -- Creator 1 payments (last 30 days)
  (
    'bb0e8400-e29b-41d4-a716-446655440001',
    '990e8400-e29b-41d4-a716-446655440001',
    1200.00,
    'USD',
    'escrow',
    'completed',
    120.00,
    1080.00,
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '5 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440002',
    '990e8400-e29b-41d4-a716-446655440001',
    800.00,
    'USD',
    'release',
    'completed',
    80.00,
    720.00,
    NOW() - INTERVAL '12 days',
    NOW() - INTERVAL '12 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440003',
    '990e8400-e29b-41d4-a716-446655440001',
    1500.00,
    'USD',
    'escrow',
    'completed',
    150.00,
    1350.00,
    NOW() - INTERVAL '18 days',
    NOW() - INTERVAL '18 days'
  ),
  
  -- Creator 2 payments (last 30 days)
  (
    'bb0e8400-e29b-41d4-a716-446655440004',
    '990e8400-e29b-41d4-a716-446655440002',
    950.00,
    'USD',
    'escrow',
    'completed',
    95.00,
    855.00,
    NOW() - INTERVAL '8 days',
    NOW() - INTERVAL '8 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440005',
    '990e8400-e29b-41d4-a716-446655440002',
    1100.00,
    'USD',
    'release',
    'completed',
    110.00,
    990.00,
    NOW() - INTERVAL '15 days',
    NOW() - INTERVAL '15 days'
  ),
  
  -- Creator 3 payments (last 30 days)
  (
    'bb0e8400-e29b-41d4-a716-446655440006',
    '990e8400-e29b-41d4-a716-446655440003',
    750.00,
    'USD',
    'escrow',
    'completed',
    75.00,
    675.00,
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '3 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440007',
    '990e8400-e29b-41d4-a716-446655440003',
    1300.00,
    'USD',
    'release',
    'completed',
    130.00,
    1170.00,
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '10 days'
  ),
  
  -- Historical payments (older than 30 days for trend analysis)
  (
    'bb0e8400-e29b-41d4-a716-446655440008',
    '990e8400-e29b-41d4-a716-446655440001',
    900.00,
    'USD',
    'escrow',
    'completed',
    90.00,
    810.00,
    NOW() - INTERVAL '45 days',
    NOW() - INTERVAL '45 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440009',
    '990e8400-e29b-41d4-a716-446655440002',
    1050.00,
    'USD',
    'release',
    'completed',
    105.00,
    945.00,
    NOW() - INTERVAL '60 days',
    NOW() - INTERVAL '60 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440010',
    '990e8400-e29b-41d4-a716-446655440003',
    1200.00,
    'USD',
    'escrow',
    'completed',
    120.00,
    1080.00,
    NOW() - INTERVAL '75 days',
    NOW() - INTERVAL '75 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440011',
    '990e8400-e29b-41d4-a716-446655440001',
    850.00,
    'USD',
    'release',
    'completed',
    85.00,
    765.00,
    NOW() - INTERVAL '90 days',
    NOW() - INTERVAL '90 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440012',
    '990e8400-e29b-41d4-a716-446655440002',
    1400.00,
    'USD',
    'escrow',
    'completed',
    140.00,
    1260.00,
    NOW() - INTERVAL '105 days',
    NOW() - INTERVAL '105 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440013',
    '990e8400-e29b-41d4-a716-446655440003',
    950.00,
    'USD',
    'release',
    'completed',
    95.00,
    855.00,
    NOW() - INTERVAL '120 days',
    NOW() - INTERVAL '120 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440014',
    '990e8400-e29b-41d4-a716-446655440001',
    1100.00,
    'USD',
    'escrow',
    'completed',
    110.00,
    990.00,
    NOW() - INTERVAL '135 days',
    NOW() - INTERVAL '135 days'
  ),
  (
    'bb0e8400-e29b-41d4-a716-446655440015',
    '990e8400-e29b-41d4-a716-446655440002',
    1250.00,
    'USD',
    'release',
    'completed',
    125.00,
    1125.00,
    NOW() - INTERVAL '150 days',
    NOW() - INTERVAL '150 days'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert additional collaborations for more payment data
INSERT INTO public.collaborations (id, application_id, campaign_id, creator_id, brand_id, agreed_rate, deliverables, timeline, status, start_date, end_date, created_at, updated_at)
VALUES 
  (
    '990e8400-e29b-41d4-a716-446655440002',
    '880e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440002',
    950.00,
    '{"posts": 2, "stories": 3, "videos": 1}',
    '{"start_date": "2024-05-15", "end_date": "2024-05-30"}',
    'active',
    '2024-05-15',
    '2024-05-30',
    NOW(),
    NOW()
  ),
  (
    '990e8400-e29b-41d4-a716-446655440003',
    '880e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440003',
    '660e8400-e29b-41d4-a716-446655440002',
    750.00,
    '{"posts": 1, "stories": 2, "videos": 1}',
    '{"start_date": "2024-05-20", "end_date": "2024-06-05"}',
    'active',
    '2024-05-20',
    '2024-06-05',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- END OF SAMPLE PAYMENT DATA
-- ===================================================== 