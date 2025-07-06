import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await request.json()
    const { campaignId, proposal, proposedRate, portfolioSamples } = body

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 })
    }

    // For now, we'll use a sample creator profile
    // In a real implementation, you'd get the creator from the authenticated user
    const { data: creatorProfile } = await supabase
      .from('creator_profiles')
      .select('id')
      .limit(1)
      .single()

    if (!creatorProfile) {
      return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 })
    }

    // Check if application already exists
    const { data: existingApplication } = await supabase
      .from('applications')
      .select('id')
      .eq('campaign_id', campaignId)
      .eq('creator_id', creatorProfile.id)
      .single()

    if (existingApplication) {
      return NextResponse.json({ error: 'You have already applied to this campaign' }, { status: 409 })
    }

    // Create the application
    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        campaign_id: campaignId,
        creator_id: creatorProfile.id,
        proposal: proposal || 'Interested in this opportunity!',
        proposed_rate: proposedRate,
        portfolio_samples: portfolioSamples || [],
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating application:', error)
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Application submitted successfully',
      application
    })

  } catch (error) {
    console.error('Error in applications API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaignId')
    const status = searchParams.get('status')

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    let query = supabase
      .from('applications')
      .select(`
        *,
        campaigns(
          id,
          title,
          brand_profiles(
            brand_name,
            logo_url
          )
        ),
        creator_profiles(
          id,
          display_name,
          avatar_url
        )
      `)

    if (campaignId) {
      query = query.eq('campaign_id', campaignId)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data: applications, error } = await query

    if (error) {
      console.error('Error fetching applications:', error)
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
    }

    return NextResponse.json({ applications })

  } catch (error) {
    console.error('Error in applications API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 