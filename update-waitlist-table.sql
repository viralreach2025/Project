-- =====================================================
-- UPDATE WAITLIST ENTRIES TABLE FOR QUIZ DATA
-- =====================================================

-- First, drop the existing table if it exists (this will lose existing data)
-- If you want to preserve existing data, use the ALTER TABLE approach below instead
DROP TABLE IF EXISTS public.waitlist_entries;

-- Create the updated waitlist_entries table with all quiz fields
CREATE TABLE public.waitlist_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    user_type TEXT CHECK (user_type IN ('brand', 'creator', 'agency')) NOT NULL,
    primary_goal TEXT,
    biggest_challenge TEXT,
    current_solution TEXT,
    budget_range TEXT,
    timeline TEXT,
    most_important TEXT,
    primary_platform TEXT,
    follower_count TEXT,
    content_niche TEXT,
    collaboration_experience TEXT,
    creator_challenge TEXT,
    creator_important TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_email ON public.waitlist_entries(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_user_type ON public.waitlist_entries(user_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_entries_created_at ON public.waitlist_entries(created_at);

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

-- =====================================================
-- SAMPLE DATA FOR TESTING (optional)
-- =====================================================

-- Insert some sample waitlist entries for testing
INSERT INTO public.waitlist_entries (
    email, 
    user_type, 
    primary_goal, 
    biggest_challenge, 
    budget_range, 
    timeline
) VALUES 
    ('test@brand.com', 'brand', 'increase_sales', 'fake_engagement', '5k_20k', 'within_month'),
    ('test@creator.com', 'creator', 'audience_growth', 'getting_paid', 'under_1k', 'immediately'),
    ('test@agency.com', 'agency', 'brand_awareness', 'measuring_roi', '20k_plus', 'within_quarter')
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