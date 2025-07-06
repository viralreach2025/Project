import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface ProfileCustomization {
  layout: string
  theme: {
    primaryColor: string
    backgroundColor: string
    textColor: string
  }
  username: string
  displayName: string
  bio: string
  categories: string[]
  location: string
  rateRange: {
    min: number
    max: number
    currency: string
  }
  socialLinks: {
    instagram?: string
    tiktok?: string
    youtube?: string
    twitter?: string
  }
  userId: string
}

export async function POST(request: NextRequest) {
  try {
    const customizationData: ProfileCustomization = await request.json()

    if (!customizationData.username || !customizationData.displayName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save profile customization to database
    const { data, error } = await supabase
      .from('profile_customizations')
      .upsert({
        user_id: customizationData.userId || 'demo-user',
        username: customizationData.username,
        layout: customizationData.layout,
        theme: customizationData.theme,
        display_name: customizationData.displayName,
        bio: customizationData.bio,
        categories: customizationData.categories,
        location: customizationData.location,
        rate_range: customizationData.rateRange,
        social_links: customizationData.socialLinks,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save customization' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { id: 'saved' }
    })

  } catch (error) {
    console.error('Profile customization save error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const username = searchParams.get('username')

    if (!userId && !username) {
      return NextResponse.json(
        { success: false, error: 'User ID or username required' },
        { status: 400 }
      )
    }

    // Get profile customization from database
    let query = supabase.from('profile_customizations').select('*')
    
    if (userId) {
      query = query.eq('user_id', userId)
    } else if (username) {
      query = query.eq('username', username)
    }

    const { data, error } = await query.single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No customization found
        return NextResponse.json({
          success: true,
          data: null
        })
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch customization' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('Profile customization fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 