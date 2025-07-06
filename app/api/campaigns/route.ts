import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const platform = searchParams.get('platform')
    const budgetRange = searchParams.get('budgetRange')
    const searchTerm = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // For now, we'll get all active campaigns without user-specific filtering
    // In a real implementation, you'd get the user from the request headers or session
    // and filter campaigns based on user preferences and match scores

    // Get creator profile to calculate match scores (using a sample profile for now)
    const { data: creatorProfile } = await supabase
      .from('creator_profiles')
      .select('*')
      .limit(1)
      .single()

    // Build query for campaigns
    let query = supabase
      .from('campaigns')
      .select(`
        *,
        brand_profiles!inner(
          id,
          brand_name,
          logo_url,
          verified,
          rating,
          total_reviews
        ),
        campaign_requirements(*)
      `)
      .eq('status', 'active')
      .gte('application_deadline', new Date().toISOString())

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('campaign_type', category)
    }

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,brand_profiles.brand_name.ilike.%${searchTerm}%`)
    }

    // Apply sorting
    switch (sortBy) {
      case 'budget':
        query = query.order('budget_range->max', { ascending: false })
        break
      case 'deadline':
        query = query.order('application_deadline', { ascending: true })
        break
      case 'created_at':
      default:
        query = query.order('created_at', { ascending: false })
        break
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: campaigns, error } = await query

    if (error) {
      console.error('Error fetching campaigns:', error)
      return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
    }

    // Calculate match scores and apply additional filters
    const opportunitiesWithMatchScores = campaigns?.map(campaign => {
      let matchScore = 50 // Base score

      if (creatorProfile) {
        // Calculate match score based on creator profile
        const creatorNiche = creatorProfile.niche || []
        const creatorFollowers = creatorProfile.follower_count || 0
        const creatorEngagement = creatorProfile.engagement_rate || 0

        // Niche matching (if campaign has niche requirements)
        const campaignRequirements = campaign.campaign_requirements || []
        const nicheRequirements = campaignRequirements.find(req => req.requirement_type === 'niche')
        if (nicheRequirements && creatorNiche.length > 0) {
          const requiredNiches = nicheRequirements.requirement_value || []
          const nicheMatch = creatorNiche.some(niche => requiredNiches.includes(niche))
          if (nicheMatch) matchScore += 20
        }

        // Follower count matching
        const followerRequirements = campaignRequirements.find(req => req.requirement_type === 'audience_size')
        if (followerRequirements) {
          const { min, max } = followerRequirements.requirement_value || {}
          if (creatorFollowers >= (min || 0) && creatorFollowers <= (max || Infinity)) {
            matchScore += 15
          }
        }

        // Engagement rate matching
        const engagementRequirements = campaignRequirements.find(req => req.requirement_type === 'engagement_rate')
        if (engagementRequirements) {
          const requiredEngagement = engagementRequirements.requirement_value || 0
          if (creatorEngagement >= requiredEngagement) {
            matchScore += 15
          }
        }
      }

      // Budget range filtering
      if (budgetRange && budgetRange !== 'all') {
        const budget = campaign.budget_range || {}
        const campaignMin = budget.min || 0
        const campaignMax = budget.max || Infinity

        switch (budgetRange) {
          case '500-1000':
            if (campaignMin < 500 || campaignMax > 1000) return null
            break
          case '1000-2000':
            if (campaignMin < 1000 || campaignMax > 2000) return null
            break
          case '2000-3000':
            if (campaignMin < 2000 || campaignMax > 3000) return null
            break
          case '3000+':
            if (campaignMin < 3000) return null
            break
        }
      }

      // Platform filtering
      if (platform && platform !== 'all') {
        const platformRequirements = campaign.campaign_requirements?.find(req => req.requirement_type === 'platform')
        if (platformRequirements) {
          const requiredPlatforms = platformRequirements.requirement_value || []
          if (!requiredPlatforms.includes(platform)) return null
        }
      }

      return {
        id: campaign.id,
        brand: {
          name: campaign.brand_profiles.brand_name,
          logo: campaign.brand_profiles.logo_url,
          verified: campaign.brand_profiles.verified,
          rating: campaign.brand_profiles.rating,
          reviews: campaign.brand_profiles.total_reviews
        },
        title: campaign.title,
        description: campaign.description,
        category: campaign.campaign_type,
        platforms: campaign.campaign_requirements
          ?.filter(req => req.requirement_type === 'platform')
          ?.map(req => req.requirement_value)
          ?.flat() || [],
        budget: campaign.budget_range,
        requirements: {
          followers: campaign.campaign_requirements
            ?.find(req => req.requirement_type === 'audience_size')
            ?.requirement_value || { min: 0, max: Infinity },
          engagement: campaign.campaign_requirements
            ?.find(req => req.requirement_type === 'engagement_rate')
            ?.requirement_value || 0,
          content: campaign.campaign_requirements
            ?.filter(req => req.requirement_type === 'content_type')
            ?.map(req => req.requirement_value)
            ?.flat() || [],
          deliverables: campaign.deliverables?.posts || 0
        },
        matchScore: Math.min(100, Math.max(0, matchScore)),
        deadline: campaign.application_deadline,
        status: campaign.status,
        tags: campaign.campaign_requirements
          ?.filter(req => req.requirement_type === 'niche')
          ?.map(req => req.requirement_value)
          ?.flat() || [],
        location: campaign.target_audience?.locations?.[0] || 'Worldwide',
        payment: 'Net 30', // Default payment terms
        featured: campaign.is_featured,
        created_at: campaign.created_at
      }
    }).filter(Boolean) // Remove null entries from filtering

    // Sort by match score if that's the selected sort
    if (sortBy === 'match') {
      opportunitiesWithMatchScores.sort((a, b) => b.matchScore - a.matchScore)
    }

    return NextResponse.json({
      opportunities: opportunitiesWithMatchScores,
      pagination: {
        page,
        limit,
        total: opportunitiesWithMatchScores.length,
        hasMore: opportunitiesWithMatchScores.length === limit
      }
    })

  } catch (error) {
    console.error('Error in campaigns API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 