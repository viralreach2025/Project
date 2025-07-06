import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userType = searchParams.get('userType') // 'creator' or 'brand'
    const userId = searchParams.get('userId')

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    if (userType === 'creator') {
      // Get creator dashboard stats
      const [
        { data: creatorProfile },
        { data: applications },
        { data: collaborations },
        { data: earnings }
      ] = await Promise.all([
        supabase
          .from('creator_profiles')
          .select('follower_count, engagement_rate')
          .eq('user_id', userId)
          .single(),
        supabase
          .from('applications')
          .select('id, status')
          .eq('creator_id', userId),
        supabase
          .from('collaborations')
          .select('id, status, agreed_rate')
          .eq('creator_id', userId),
        supabase
          .from('payments')
          .select(`
            amount, 
            status, 
            payment_date,
            collaborations!inner(
              creator_id
            )
          `)
          .eq('collaborations.creator_id', userId)
      ])

      // Calculate stats
      const totalFollowers = creatorProfile?.follower_count ? 
        (typeof creatorProfile.follower_count === 'object' ? 
          Object.values(creatorProfile.follower_count).reduce((sum: number, count: any) => sum + (count || 0), 0) : 
          creatorProfile.follower_count) : 0
      const avgEngagement = creatorProfile?.engagement_rate || 0
      
      // Calculate earnings
      const completedPayments = earnings?.filter(payment => payment.status === 'completed') || []
      const totalEarnings = completedPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
      
      // Calculate monthly earnings (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const monthlyPayments = completedPayments.filter(payment => 
        new Date(payment.payment_date) >= thirtyDaysAgo
      )
      const monthlyEarnings = monthlyPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
      
      // Calculate earnings growth (mock for now - would be calculated from historical data)
      const earningsGrowth = 8.5 // This would be calculated from previous month comparison
      
      const activeCollaborations = collaborations?.filter(c => c.status === 'active').length || 0
      const pendingApplications = applications?.filter(a => a.status === 'pending').length || 0
      const totalApplications = applications?.length || 0

      // Calculate monthly growth (mock for now)
      const monthlyGrowth = 12.5 // This would be calculated from historical data

      return NextResponse.json({
        stats: {
          totalFollowers: {
            value: totalFollowers.toLocaleString(),
            change: `+${monthlyGrowth}%`,
            changeType: 'positive'
          },
          avgEngagement: {
            value: `${avgEngagement.toFixed(1)}%`,
            change: '+2.3%',
            changeType: 'positive'
          },
          monthlyEarnings: {
            value: `$${monthlyEarnings.toLocaleString()}`,
            change: `+${earningsGrowth}%`,
            changeType: 'positive'
          },
          activeCollaborations: {
            value: activeCollaborations.toString(),
            change: `+${pendingApplications}`,
            changeType: 'positive'
          }
        },
        recentActivity: [
          {
            id: '1',
            type: 'application',
            title: 'New Application Submitted',
            description: 'Applied to Glow Beauty Campaign',
            time: new Date().toISOString(),
            status: 'pending'
          },
          {
            id: '2',
            type: 'collaboration',
            title: 'Collaboration Started',
            description: 'Started working with FitLife Supplements',
            time: new Date(Date.now() - 86400000).toISOString(),
            status: 'active'
          }
        ]
      })

    } else {
      // Get brand dashboard stats
      const { data: brandProfile } = await supabase
        .from('brand_profiles')
        .select('id, total_spent')
        .eq('user_id', userId)
        .single()

      if (!brandProfile) {
        return NextResponse.json({
          stats: {
            totalSpent: { value: '$0', change: '0%', changeType: 'positive' },
            activeCampaigns: { value: '0', change: '0', changeType: 'positive' },
            creatorMatches: { value: '0', change: '0', changeType: 'positive' },
            avgROI: { value: '0%', change: '0%', changeType: 'positive' }
          },
          recentActivity: []
        })
      }

      const [
        { data: campaigns },
        { data: payments }
      ] = await Promise.all([
        supabase
          .from('campaigns')
          .select('id, status, budget_range')
          .eq('brand_id', brandProfile.id),
        supabase
          .from('payments')
          .select(`
            amount, 
            status,
            collaborations!inner(
              brand_id
            )
          `)
          .eq('collaborations.brand_id', brandProfile.id)
      ])

      // Get applications for all campaigns
      const campaignIds = campaigns?.map(c => c.id) || []
      const { data: applications } = campaignIds.length > 0 ? 
        await supabase
          .from('applications')
          .select('id, status')
          .in('campaign_id', campaignIds) :
        { data: [] }

      // Calculate stats
      const totalSpent = brandProfile?.total_spent || 0
      const activeCampaigns = campaigns?.filter(c => c.status === 'active').length || 0
      const totalCampaigns = campaigns?.length || 0
      const pendingApplications = applications?.filter(a => a.status === 'pending').length || 0
      const totalApplications = applications?.length || 0

      // Calculate ROI (mock for now)
      const avgROI = 245 // This would be calculated from campaign performance

      return NextResponse.json({
        stats: {
          totalSpent: {
            value: `$${totalSpent.toLocaleString()}`,
            change: '+15.2%',
            changeType: 'positive'
          },
          activeCampaigns: {
            value: activeCampaigns.toString(),
            change: `+${totalCampaigns - activeCampaigns}`,
            changeType: 'positive'
          },
          creatorMatches: {
            value: totalApplications.toString(),
            change: `+${pendingApplications}`,
            changeType: 'positive'
          },
          avgROI: {
            value: `${avgROI}%`,
            change: '+12.8%',
            changeType: 'positive'
          }
        },
        recentActivity: [
          {
            id: '1',
            type: 'campaign',
            title: 'New Campaign Created',
            description: 'Summer Skincare Campaign',
            time: new Date().toISOString(),
            status: 'active'
          },
          {
            id: '2',
            type: 'application',
            title: 'New Application Received',
            description: 'Creator applied to Protein Powder Campaign',
            time: new Date(Date.now() - 86400000).toISOString(),
            status: 'pending'
          }
        ]
      })
    }

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 