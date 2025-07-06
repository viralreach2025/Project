-- =====================================================
-- COMPREHENSIVE RLS POLICY FIX FOR USER SIGNUP
-- =====================================================

-- First, drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;
DROP POLICY IF EXISTS "Enable delete for users based on id" ON public.users;

-- Create comprehensive RLS policies for users table
-- Allow users to insert their own profile during signup
CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Allow service role to manage all users (for admin functions)
CREATE POLICY "Service role can manage all users" ON public.users
    FOR ALL USING (auth.role() = 'service_role');

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- FIX OTHER TABLES RLS POLICIES
-- =====================================================

-- Waitlist entries - allow public insert
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.waitlist_entries;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.waitlist_entries;

CREATE POLICY "Enable insert for all users" ON public.waitlist_entries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON public.waitlist_entries
    FOR SELECT USING (true);

-- Contact submissions - allow public insert
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.contact_submissions;

CREATE POLICY "Enable insert for all users" ON public.contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON public.contact_submissions
    FOR SELECT USING (true);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('users', 'waitlist_entries', 'contact_submissions')
ORDER BY tablename, policyname;

-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('users', 'waitlist_entries', 'contact_submissions'); 