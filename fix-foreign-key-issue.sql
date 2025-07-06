-- =====================================================
-- FIX FOREIGN KEY CONSTRAINT ISSUE
-- =====================================================

-- Step 1: Check if there are orphaned users in public.users
SELECT 
    pu.id,
    pu.email,
    CASE 
        WHEN au.id IS NULL THEN 'MISSING FROM AUTH'
        ELSE 'EXISTS IN AUTH'
    END as auth_status
FROM public.users pu
LEFT JOIN auth.users au ON pu.id = au.id
WHERE au.id IS NULL;

-- Step 2: Check if there are auth users without profiles
SELECT 
    au.id,
    au.email,
    au.created_at,
    CASE 
        WHEN pu.id IS NULL THEN 'MISSING PROFILE'
        ELSE 'PROFILE EXISTS'
    END as profile_status
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ORDER BY au.created_at DESC
LIMIT 10;

-- Step 3: Clean up orphaned profiles (if any)
-- DELETE FROM public.users 
-- WHERE id NOT IN (SELECT id FROM auth.users);

-- Step 4: Create missing profiles for auth users
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
)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'user_type', 'brand'),
    COALESCE(au.raw_user_meta_data->>'full_name', ''),
    COALESCE(au.raw_user_meta_data->>'company_name', ''),
    false,
    true,
    'free',
    'active',
    au.created_at,
    NOW()
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Step 5: Verify the fix
SELECT 
    'Total Auth Users' as metric,
    COUNT(*) as count
FROM auth.users

UNION ALL

SELECT 
    'Total Public Users' as metric,
    COUNT(*) as count
FROM public.users

UNION ALL

SELECT 
    'Users with Profiles' as metric,
    COUNT(*) as count
FROM auth.users au
INNER JOIN public.users pu ON au.id = pu.id

UNION ALL

SELECT 
    'Users without Profiles' as metric,
    COUNT(*) as count
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Step 6: Check recent user creations
SELECT 
    au.id,
    au.email,
    au.created_at as auth_created,
    pu.created_at as profile_created,
    CASE 
        WHEN pu.id IS NULL THEN 'NO PROFILE'
        WHEN au.created_at = pu.created_at THEN 'SYNCED'
        ELSE 'DELAYED'
    END as sync_status
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at DESC
LIMIT 5; 