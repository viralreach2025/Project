import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create a Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // This bypasses RLS
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Fallback client using anon key (will be subject to RLS)
const supabaseAnon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, email, userType, userData } = body

    if (!userId || !email || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if service role key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('SUPABASE_SERVICE_ROLE_KEY not found, using anon key (may fail due to RLS)')
      
      // Try with anon key (may fail due to RLS policies)
      const { data, error } = await supabaseAnon
        .from('users')
        .insert([
          {
            id: userId,
            email: email,
            user_type: userType,
            full_name: userData?.full_name,
            company_name: userData?.company_name,
            website: userData?.website,
            phone: userData?.phone,
            location: userData?.location,
            bio: userData?.bio,
            is_verified: false,
            is_active: true,
            subscription_tier: 'free',
            subscription_status: 'active'
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error creating user profile with anon key:', error)
        return NextResponse.json(
          { 
            error: 'Failed to create user profile. Please add SUPABASE_SERVICE_ROLE_KEY to your environment variables.',
            details: error.message 
          },
          { status: 500 }
        )
      }

      return NextResponse.json({ 
        success: true, 
        user: data,
        method: 'anon_key'
      })
    }

    // Use service role key (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([
        {
          id: userId,
          email: email,
          user_type: userType,
          full_name: userData?.full_name,
          company_name: userData?.company_name,
          website: userData?.website,
          phone: userData?.phone,
          location: userData?.location,
          bio: userData?.bio,
          is_verified: false,
          is_active: true,
          subscription_tier: 'free',
          subscription_status: 'active'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating user profile with service role:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      user: data,
      method: 'service_role'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 