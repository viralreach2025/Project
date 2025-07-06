import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userType = searchParams.get('userType') // 'creator' or 'brand'
    const userId = searchParams.get('userId')
    const period = searchParams.get('period') || '30' // days

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    if (userType === 'creator') {
      // Get creator earnings
      const { data: payments } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          status,
          payment_date,
          payment_type,
          currency,
          collaborations!inner(
            creator_id,
            campaigns(
              title,
              brand_profiles(
                industry
              )
            )
          )
        `)
        .eq('collaborations.creator_id', userId)
        .eq('status', 'completed')
        .order('payment_date', { ascending: false })

      // Calculate earnings by period
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(period))
      
      const periodPayments = payments?.filter(payment => 
        new Date(payment.payment_date) >= daysAgo
      ) || []

      const totalEarnings = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0
      const periodEarnings = periodPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)

      // Calculate earnings by source (campaign type/industry)
      const earningsBySource = payments?.reduce((acc, payment: any) => {
        const source = payment.collaborations?.campaigns?.[0]?.brand_profiles?.[0]?.industry || 'Other'
        acc[source] = (acc[source] || 0) + (payment.amount || 0)
        return acc
      }, {} as Record<string, number>) || {}

      // Calculate monthly trend (last 6 months)
      const monthlyTrend = []
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date()
        monthStart.setMonth(monthStart.getMonth() - i)
        monthStart.setDate(1)
        monthStart.setHours(0, 0, 0, 0)
        
        const monthEnd = new Date(monthStart)
        monthEnd.setMonth(monthEnd.getMonth() + 1)
        monthEnd.setDate(0)
        monthEnd.setHours(23, 59, 59, 999)

        const monthPayments = payments?.filter(payment => {
          const paymentDate = new Date(payment.payment_date)
          return paymentDate >= monthStart && paymentDate <= monthEnd
        }) || []

        const monthEarnings = monthPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
        
        monthlyTrend.push({
          month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          earnings: monthEarnings,
          count: monthPayments.length
        })
      }

      return NextResponse.json({
        totalEarnings,
        periodEarnings,
        period: `${period} days`,
        earningsBySource,
        monthlyTrend,
        recentPayments: payments?.slice(0, 10) || []
      })

    } else {
      // Get brand spending
      const { data: brandProfile } = await supabase
        .from('brand_profiles')
        .select('id, total_spent')
        .eq('user_id', userId)
        .single()

      if (!brandProfile) {
        return NextResponse.json({
          totalSpent: 0,
          periodSpent: 0,
          period: `${period} days`,
          spendingByCampaign: {},
          monthlyTrend: [],
          recentPayments: []
        })
      }

      const { data: payments } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          status,
          payment_date,
          payment_type,
          currency,
          collaborations!inner(
            brand_id,
            campaigns(
              title,
              campaign_type
            )
          )
        `)
        .eq('collaborations.brand_id', brandProfile.id)
        .eq('status', 'completed')
        .order('payment_date', { ascending: false })

      // Calculate spending by period
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(period))
      
      const periodPayments = payments?.filter(payment => 
        new Date(payment.payment_date) >= daysAgo
      ) || []

      const totalSpent = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0
      const periodSpent = periodPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)

      // Calculate spending by campaign
      const spendingByCampaign = payments?.reduce((acc, payment: any) => {
        const campaign = payment.collaborations?.campaigns?.[0]?.title || 'Unknown Campaign'
        acc[campaign] = (acc[campaign] || 0) + (payment.amount || 0)
        return acc
      }, {} as Record<string, number>) || {}

      // Calculate monthly trend (last 6 months)
      const monthlyTrend = []
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date()
        monthStart.setMonth(monthStart.getMonth() - i)
        monthStart.setDate(1)
        monthStart.setHours(0, 0, 0, 0)
        
        const monthEnd = new Date(monthStart)
        monthEnd.setMonth(monthEnd.getMonth() + 1)
        monthEnd.setDate(0)
        monthEnd.setHours(23, 59, 59, 999)

        const monthPayments = payments?.filter(payment => {
          const paymentDate = new Date(payment.payment_date)
          return paymentDate >= monthStart && paymentDate <= monthEnd
        }) || []

        const monthSpent = monthPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
        
        monthlyTrend.push({
          month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          spent: monthSpent,
          count: monthPayments.length
        })
      }

      return NextResponse.json({
        totalSpent,
        periodSpent,
        period: `${period} days`,
        spendingByCampaign,
        monthlyTrend,
        recentPayments: payments?.slice(0, 10) || []
      })
    }

  } catch (error) {
    console.error('Error fetching earnings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 