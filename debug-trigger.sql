-- =====================================================
-- DEBUG TRIGGER ISSUES
-- =====================================================

-- Check if trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    action_statement,
    action_timing
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check if function exists
SELECT 
    routine_name,
    routine_type,
    data_type
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- Check current RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname;

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- =====================================================
-- MANUAL TEST OF TRIGGER FUNCTION
-- =====================================================

-- Test the trigger function manually (replace with actual values)
-- This simulates what the trigger should do
DO $$
DECLARE
    test_user_id UUID := '00000000-0000-0000-0000-000000000000';
    test_email TEXT := 'test@example.com';
    test_user_type TEXT := 'brand';
    test_full_name TEXT := 'Test User';
    test_company_name TEXT := 'Test Company';
BEGIN
    -- Try to insert a test user profile
    INSERT INTO public.users (
        id,
        email,
        user_type,
        full_name,
        company_name,
        is_verified,
        is_active,
        subscription_tier,
        subscription_status,
        created_at,
        updated_at
    ) VALUES (
        test_user_id,
        test_email,
        test_user_type,
        test_full_name,
        test_company_name,
        false,
        true,
        'free',
        'active',
        NOW(),
        NOW()
    );
    
    RAISE NOTICE 'Test insertion successful';
    
    -- Clean up test data
    DELETE FROM public.users WHERE id = test_user_id;
    RAISE NOTICE 'Test cleanup completed';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error: %', SQLERRM;
END $$;

-- =====================================================
-- CHECK RECENT USER CREATIONS
-- =====================================================

-- Check recent auth users
SELECT 
    id,
    email,
    created_at,
    raw_user_meta_data
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;

-- Check recent public users
SELECT 
    id,
    email,
    user_type,
    created_at
FROM public.users 
ORDER BY created_at DESC 
LIMIT 5;

-- =====================================================
-- RECREATE TRIGGER WITH BETTER ERROR HANDLING
-- =====================================================

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function with error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Log the trigger execution
    RAISE NOTICE 'Trigger executed for user: %', NEW.id;
    
    -- Check if user already exists in public.users
    IF EXISTS (SELECT 1 FROM public.users WHERE id = NEW.id) THEN
        RAISE NOTICE 'User profile already exists for: %', NEW.id;
        RETURN NEW;
    END IF;
    
    -- Insert the user profile
    INSERT INTO public.users (
        id,
        email,
        user_type,
        full_name,
        company_name,
        is_verified,
        is_active,
        subscription_tier,
        subscription_status,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'brand'),
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
        false,
        true,
        'free',
        'active',
        NOW(),
        NOW()
    );
    
    RAISE NOTICE 'User profile created successfully for: %', NEW.id;
    RETURN NEW;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating user profile: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check if trigger was created
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check function
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user'; 