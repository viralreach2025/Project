import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30d'
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get creator profile
    const { data: creatorProfile } = await supabase
      .from('creator_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (!creatorProfile) {
      return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 })
    }

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get applications count
    const { count: totalApplications } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('creator_id', creatorProfile.id)

    // Get active campaigns count
    const { count: totalCampaigns } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('creator_id', creatorProfile.id)
      .eq('status', 'approved')

    // Get earnings from collaborations
    const { data: collaborations } = await supabase
      .from('collaborations')
      .select('agreed_rate, status')
      .eq('creator_id', creatorProfile.id)
      .gte('created_at', startDate.toISOString())

    const totalEarnings = collaborations?.reduce((sum, collab) => {
      return sum + (collab.agreed_rate || 0)
    }, 0) || 0

    // Get performance metrics
    const { data: performanceMetrics } = await supabase
      .from('performance_metrics')
      .select('metrics, engagement_rate, reach, impressions')
      .gte('date_recorded', startDate.toISOString())

    // Calculate aggregated metrics
    const totalViews = performanceMetrics?.reduce((sum, metric) => {
      const views = metric.metrics?.views || 0
      return sum + views
    }, 0) || 0

    const totalLikes = performanceMetrics?.reduce((sum, metric) => {
      const likes = metric.metrics?.likes || 0
      return sum + likes
    }, 0) || 0

    const totalComments = performanceMetrics?.reduce((sum, metric) => {
      const comments = metric.metrics?.comments || 0
      return sum + comments
    }, 0) || 0

    const totalShares = performanceMetrics?.reduce((sum, metric) => {
      const shares = metric.metrics?.shares || 0
      return sum + shares
    }, 0) || 0

    // Calculate average engagement rate
    const avgEngagementRate = performanceMetrics?.length > 0 
      ? performanceMetrics.reduce((sum, metric) => sum + (metric.engagement_rate || 0), 0) / performanceMetrics.length
      : creatorProfile.engagement_rate || 0

    // Get recent activity
    const { data: recentApplications } = await supabase
      .from('applications')
      .select(`
        id,
        status,
        created_at,
        campaigns(
          title,
          brand_profiles(brand_name)
        )
      `)
      .eq('creator_id', creatorProfile.id)
      .order('created_at', { ascending: false })
      .limit(5)

    const recentActivity = recentApplications?.map(app => ({
      id: app.id,
      type: 'application',
      title: `Campaign Application ${app.status === 'approved' ? 'Approved' : app.status === 'rejected' ? 'Rejected' : 'Submitted'}`,
      value: (app.campaigns as any)?.title || 'Unknown Campaign',
      date: app.created_at,
      change: app.status === 'approved' ? 1 : 0
    })) || []

    // Get platform performance (mock data for now since we don't have detailed platform metrics)
    const topPlatforms = [
      { platform: 'Instagram', followers: creatorProfile.follower_count * 0.6 || 0, engagement: avgEngagementRate },
      { platform: 'TikTok', followers: creatorProfile.follower_count * 0.3 || 0, engagement: avgEngagementRate * 1.2 },
      { platform: 'YouTube', followers: creatorProfile.follower_count * 0.1 || 0, engagement: avgEngagementRate * 0.8 }
    ]

    // Calculate monthly growth (mock calculation)
    const monthlyGrowth = 12.5 // This would be calculated from historical data

    const analyticsData = {
      totalFollowers: creatorProfile.follower_count || 0,
      totalEngagement: avgEngagementRate,
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      totalEarnings,
      totalCampaigns: totalCampaigns || 0,
      totalApplications: totalApplications || 0,
      monthlyGrowth,
      topPlatforms,
      recentActivity
    }

    return NextResponse.json(analyticsData)

  } catch (error) {
    console.error('Error in analytics API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 