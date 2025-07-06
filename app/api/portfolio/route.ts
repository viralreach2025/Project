import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface PortfolioItem {
  type: 'image' | 'video'
  filename: string
  caption?: string
}

interface PortfolioData {
  profileHandle: string
  portfolioItems: PortfolioItem[]
  userId: string
}

export async function POST(request: NextRequest) {
  try {
    const { profileHandle, portfolioItems, userId }: PortfolioData = await request.json()

    if (!profileHandle || !portfolioItems || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save portfolio data to database
    const { data, error } = await supabase
      .from('portfolios')
      .upsert({
        user_id: userId,
        profile_handle: profileHandle,
        portfolio_items: portfolioItems,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save portfolio' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { id: 'saved' }
    })

  } catch (error) {
    console.error('Portfolio save error:', error)
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

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }

    // Get portfolio data from database
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No portfolio found
        return NextResponse.json({
          success: true,
          data: null
        })
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch portfolio' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('Portfolio fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 