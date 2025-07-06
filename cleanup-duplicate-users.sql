-- =====================================================
-- CLEANUP DUPLICATE USERS
-- =====================================================

-- Check for duplicate emails in users table
SELECT email, COUNT(*) as count
FROM public.users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- Check for users in auth.users but not in public.users
SELECT au.email, au.id as auth_id
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
AND au.email IS NOT NULL;

-- Check for users in public.users but not in auth.users
SELECT pu.email, pu.id as public_id
FROM public.users pu
LEFT JOIN auth.users au ON pu.id = au.id
WHERE au.id IS NULL;

-- =====================================================
-- FIX DUPLICATE USERS (RUN CAREFULLY)
-- =====================================================

-- Option 1: Keep the most recent user profile for each email
-- DELETE FROM public.users 
-- WHERE id NOT IN (
--   SELECT DISTINCT ON (email) id
--   FROM public.users
--   ORDER BY email, created_at DESC
-- );

-- Option 2: Keep the first user profile for each email
-- DELETE FROM public.users 
-- WHERE id NOT IN (
--   SELECT DISTINCT ON (email) id
--   FROM public.users
--   ORDER BY email, created_at ASC
-- );

-- =====================================================
-- VERIFICATION AFTER CLEANUP
-- =====================================================

-- Verify no more duplicates
SELECT email, COUNT(*) as count
FROM public.users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- Show final user count
SELECT COUNT(*) as total_users FROM public.users; 