-- =====================================================
-- FIX RLS POLICIES FOR USER SIGNUP
-- =====================================================

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

-- Create comprehensive RLS policies for users table
CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Allow service role to manage all users (for admin functions)
CREATE POLICY "Service role can manage all users" ON public.users
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- ADDITIONAL POLICIES FOR OTHER TABLES
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

-- Fix RLS policies for portfolio_items table
-- Run this in your Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Portfolio items are viewable by everyone" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can update their own portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can insert their own portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can delete their own portfolio items" ON public.portfolio_items;

-- Create new policies that allow all operations for development
CREATE POLICY "Portfolio items are viewable by everyone" ON public.portfolio_items
    FOR SELECT USING (true);

CREATE POLICY "Users can insert portfolio items" ON public.portfolio_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update portfolio items" ON public.portfolio_items
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete portfolio items" ON public.portfolio_items
    FOR DELETE USING (true);

-- Alternative: More restrictive policies for production (uncomment if needed)
-- CREATE POLICY "Portfolio items are viewable by everyone" ON public.portfolio_items
--     FOR SELECT USING (true);

-- CREATE POLICY "Users can insert their own portfolio items" ON public.portfolio_items
--     FOR INSERT WITH CHECK (auth.uid()::text = profile_id);

-- CREATE POLICY "Users can update their own portfolio items" ON public.portfolio_items
--     FOR UPDATE USING (auth.uid()::text = profile_id);

-- CREATE POLICY "Users can delete their own portfolio items" ON public.portfolio_items
--     FOR DELETE USING (auth.uid()::text = profile_id); 