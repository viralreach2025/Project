import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const niche = searchParams.get('niche')
    const minFollowers = searchParams.get('minFollowers')
    const maxFollowers = searchParams.get('maxFollowers')
    const minEngagement = searchParams.get('minEngagement')
    const availability = searchParams.get('availability')
    const search = searchParams.get('search')

    let query = supabase
      .from('creator_profiles')
      .select(`
        *,
        users (
          id,
          full_name,
          email,
          avatar_url,
          location,
          bio,
          is_verified
        ),
        creator_social_accounts (
          platform,
          username,
          follower_count,
          engagement_rate,
          is_verified
        )
      `)
      .eq('users.user_type', 'creator')

    // Apply filters
    if (niche) {
      query = query.contains('niche', [niche])
    }

    if (minFollowers || maxFollowers) {
      // This would need to be implemented based on your specific requirements
      // You might need to join with social accounts and aggregate follower counts
    }

    if (minEngagement) {
      query = query.gte('engagement_rate', parseFloat(minEngagement))
    }

    if (availability && availability !== 'all') {
      query = query.eq('availability_status', availability)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching creators:', error)
      return NextResponse.json({ error: 'Failed to fetch creators' }, { status: 500 })
    }

    // Transform data to match frontend expectations
    const transformedCreators = data?.map(creator => ({
      id: creator.id,
      username: creator.users?.full_name?.toLowerCase().replace(/\s+/g, '') || 'unknown',
      fullName: creator.users?.full_name || 'Unknown Creator',
      bio: creator.users?.bio || 'No bio available',
      avatar: creator.users?.avatar_url || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      location: creator.users?.location || 'Unknown Location',
      isVerified: creator.users?.is_verified || false,
      rating: 4.5, // This would come from a reviews table
      totalReviews: 0, // This would come from a reviews table
      socialAccounts: creator.creator_social_accounts?.map(account => ({
        platform: account.platform,
        followers: account.follower_count || 0,
        engagement: account.engagement_rate || 0
      })) || [],
      niche: creator.niche || [],
      rateRange: creator.rate_range || { min: 100, max: 1000, currency: 'USD' },
      stats: {
        totalFollowers: creator.creator_social_accounts?.reduce((sum, account) => sum + (account.follower_count || 0), 0) || 0,
        avgEngagement: creator.engagement_rate || 0,
        completedCampaigns: 0 // This would come from collaborations table
      },
      availability: creator.availability_status || 'available',
      responseTime: '2-4 hours', // This could be calculated from response times
      featured: false // This could be a field in the database
    })) || []

    // Apply search filter if provided
    let filteredCreators = transformedCreators
    if (search) {
      filteredCreators = transformedCreators.filter(creator =>
        creator.fullName.toLowerCase().includes(search.toLowerCase()) ||
        creator.username.toLowerCase().includes(search.toLowerCase()) ||
        creator.niche.some(niche => niche.toLowerCase().includes(search.toLowerCase()))
      )
    }

    return NextResponse.json({ creators: filteredCreators })
  } catch (error) {
    console.error('Error in creators API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 