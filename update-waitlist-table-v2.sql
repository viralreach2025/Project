-- =====================================================
-- UPDATE WAITLIST ENTRIES TABLE FOR ROLE-SPECIFIC QUIZ DATA
-- =====================================================

-- First, drop the existing table if it exists (this will lose existing data)
-- If you want to preserve existing data, use the ALTER TABLE approach below instead
DROP TABLE IF EXISTS public.waitlist_entries;

-- Create the updated waitlist_entries table with all role-specific fields
CREATE TABLE public.waitlist_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    user_type TEXT CHECK (user_type IN ('brand', 'creator', 'agency')) NOT NULL,
    
    -- Common fields (all roles)
    primary_goal TEXT,
    biggest_challenge TEXT,
    timeline TEXT,
    
    -- Brand-specific fields
    budget_range TEXT,
    
    -- Creator-specific fields
    follower_count TEXT,
    primary_platform TEXT,
    
    -- Agency-specific fields
    collaboration_experience TEXT, -- renamed from monthly_campaigns for clarity
    
    -- Legacy fields (kept for backward compatibility)
    current_solution TEXT,
    most_important TEXT,
    content_niche TEXT,
    creator_challenge TEXT,
    creator_important TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_email ON public.waitlist_entries(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_user_type ON public.waitlist_entries(user_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_created_at ON public.waitlist_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_primary_goal ON public.waitlist_entries(primary_goal);
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_biggest_challenge ON public.waitlist_entries(biggest_challenge);

-- =====================================================
-- ALTERNATIVE: If you want to preserve existing data, use these ALTER statements instead:
-- =====================================================

-- Uncomment these lines if you want to preserve existing data:

-- -- Update the user_type constraint to include 'agency'
-- ALTER TABLE public.waitlist_entries 
-- DROP CONSTRAINT IF EXISTS waitlist_entries_user_type_check;
-- 
-- ALTER TABLE public.waitlist_entries 
-- ADD CONSTRAINT waitlist_entries_user_type_check 
-- CHECK (user_type IN ('brand', 'creator', 'agency'));

-- -- Add any missing columns if they don't exist
-- DO $$ 
-- BEGIN
--     -- Add follower_count if it doesn't exist
--     IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
--                    WHERE table_name = 'waitlist_entries' AND column_name = 'follower_count') THEN
--         ALTER TABLE public.waitlist_entries ADD COLUMN follower_count TEXT;
--     END IF;
--     
--     -- Add primary_platform if it doesn't exist
--     IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
--                    WHERE table_name = 'waitlist_entries' AND column_name = 'primary_platform') THEN
--         ALTER TABLE public.waitlist_entries ADD COLUMN primary_platform TEXT;
--     END IF;
--     
--     -- Add collaboration_experience if it doesn't exist
--     IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
--                    WHERE table_name = 'waitlist_entries' AND column_name = 'collaboration_experience') THEN
--         ALTER TABLE public.waitlist_entries ADD COLUMN collaboration_experience TEXT;
--     END IF;
-- END $$;

-- =====================================================
-- SAMPLE DATA FOR TESTING (optional)
-- =====================================================

-- Insert sample waitlist entries for each role type
INSERT INTO public.waitlist_entries (
    email, 
    user_type, 
    primary_goal, 
    biggest_challenge, 
    timeline,
    budget_range,
    follower_count,
    primary_platform,
    collaboration_experience
) VALUES 
    -- Brand sample
    ('brand@example.com', 'brand', 'increase_sales', 'finding_authentic_creators', 'within_month', '5k_20k', NULL, NULL, NULL),
    
    -- Creator sample
    ('creator@example.com', 'creator', 'earn_more_money', 'getting_paid_fairly', 'immediately', NULL, '50k_200k', 'instagram', NULL),
    
    -- Agency sample
    ('agency@example.com', 'agency', 'better_client_results', 'client_satisfaction', 'within_quarter', NULL, NULL, NULL, '20_50')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'waitlist_entries' 
ORDER BY ordinal_position;

-- Check sample data
SELECT * FROM public.waitlist_entries LIMIT 5;

-- Check user type distribution
SELECT user_type, COUNT(*) as count 
FROM public.waitlist_entries 
GROUP BY user_type;

-- Check role-specific data
SELECT 
    user_type,
    primary_goal,
    biggest_challenge,
    CASE 
        WHEN user_type = 'brand' THEN budget_range
        WHEN user_type = 'creator' THEN follower_count
        WHEN user_type = 'agency' THEN collaboration_experience
    END as role_specific_field
FROM public.waitlist_entries; 