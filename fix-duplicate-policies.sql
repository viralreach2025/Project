-- =====================================================
-- FIX DUPLICATE RLS POLICIES FOR USER SIGNUP
-- =====================================================

-- First, drop ALL existing policies to start completely fresh
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on id" ON public.users;
DROP POLICY IF EXISTS "Enable delete for users based on id" ON public.users;

-- Drop policies for other tables that might conflict
DROP POLICY IF EXISTS "Creators can view their own profile" ON public.creator_profiles;
DROP POLICY IF EXISTS "Creators can update their own profile" ON public.creator_profiles;
DROP POLICY IF EXISTS "Creators can insert their own profile" ON public.creator_profiles;
DROP POLICY IF EXISTS "Brands can view creator profiles" ON public.creator_profiles;

DROP POLICY IF EXISTS "Brands can view their own profile" ON public.brand_profiles;
DROP POLICY IF EXISTS "Brands can update their own profile" ON public.brand_profiles;
DROP POLICY IF EXISTS "Brands can insert their own profile" ON public.brand_profiles;

DROP POLICY IF EXISTS "Creators can insert applications" ON public.applications;
DROP POLICY IF EXISTS "Creators can view their applications" ON public.applications;
DROP POLICY IF EXISTS "Brands can view applications for their campaigns" ON public.applications;

-- =====================================================
-- CREATE FRESH RLS POLICIES FOR USERS TABLE
-- =====================================================

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

-- =====================================================
-- CREATE POLICIES FOR OTHER TABLES
-- =====================================================

-- Creator profiles policies
CREATE POLICY "Creators can insert their own profile" ON public.creator_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Creators can view their own profile" ON public.creator_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Creators can update their own profile" ON public.creator_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Brands can view creator profiles" ON public.creator_profiles
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND user_type = 'brand'
    ));

-- Brand profiles policies
CREATE POLICY "Brands can insert their own profile" ON public.brand_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Brands can view their own profile" ON public.brand_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Brands can update their own profile" ON public.brand_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Applications policies
CREATE POLICY "Creators can insert applications" ON public.applications
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.creator_profiles 
            WHERE id = creator_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Creators can view their applications" ON public.applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.creator_profiles 
            WHERE id = creator_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Brands can view applications for their campaigns" ON public.applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.campaigns c
            JOIN public.brand_profiles b ON c.brand_id = b.id
            WHERE c.id = campaign_id AND b.user_id = auth.uid()
        )
    );

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check if policies are created successfully
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users' 
ORDER BY policyname;

-- Check total count of policies
SELECT COUNT(*) as total_policies FROM pg_policies WHERE tablename = 'users'; 