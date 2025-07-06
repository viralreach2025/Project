import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userType = searchParams.get('userType') // 'creator' or 'brand'
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '10')

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    if (userType === 'creator') {
      // Get creator recent activity
      const [
        { data: applications },
        { data: collaborations },
        { data: payments }
      ] = await Promise.all([
        supabase
          .from('applications')
          .select(`
            id,
            status,
            created_at,
            campaigns(
              title
            )
          `)
          .eq('creator_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit),
        supabase
          .from('collaborations')
          .select(`
            id,
            status,
            created_at,
            campaigns(
              title
            )
          `)
          .eq('creator_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit),
        supabase
          .from('payments')
          .select(`
            id,
            amount,
            status,
            payment_date,
            collaborations!inner(
              creator_id,
              campaigns(
                title
              )
            )
          `)
          .eq('collaborations.creator_id', userId)
          .order('payment_date', { ascending: false })
          .limit(limit)
      ])

              // Combine and format activities
        const activities = [
          ...(applications || []).map(app => ({
            id: app.id,
            type: 'application',
            title: 'Application Submitted',
            description: 'Applied to a campaign',
            time: app.created_at,
            status: app.status
          })),
          ...(collaborations || []).map(collab => ({
            id: collab.id,
            type: 'collaboration',
            title: 'Collaboration Started',
            description: 'Started working on a campaign',
            time: collab.created_at,
            status: collab.status
          })),
          ...(payments || []).map(payment => ({
            id: payment.id,
            type: 'payment',
            title: 'Payment Received',
            description: `$${payment.amount} received`,
            time: payment.payment_date,
            status: payment.status,
            amount: payment.amount
          }))
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, limit)

      return NextResponse.json({ activities })

    } else {
      // Get brand recent activity
      const [
        { data: campaigns },
        { data: applications },
        { data: payments }
      ] = await Promise.all([
        supabase
          .from('campaigns')
          .select(`
            id,
            title,
            status,
            created_at
          `)
          .eq('brand_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit),
        supabase
          .from('applications')
          .select(`
            id,
            status,
            created_at,
            campaigns!inner(
              title,
              brand_id
            )
          `)
          .eq('campaigns.brand_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit),
        supabase
          .from('payments')
          .select(`
            id,
            amount,
            status,
            payment_date,
            collaborations!inner(
              brand_id,
              campaigns(
                title
              )
            )
          `)
          .eq('collaborations.brand_id', userId)
          .order('payment_date', { ascending: false })
          .limit(limit)
      ])

              // Combine and format activities
        const activities = [
          ...(campaigns || []).map(campaign => ({
            id: campaign.id,
            type: 'campaign',
            title: 'Campaign Created',
            description: campaign.title,
            time: campaign.created_at,
            status: campaign.status
          })),
          ...(applications || []).map(app => ({
            id: app.id,
            type: 'application',
            title: 'Application Received',
            description: 'Creator applied to a campaign',
            time: app.created_at,
            status: app.status
          })),
          ...(payments || []).map(payment => ({
            id: payment.id,
            type: 'payment',
            title: 'Payment Sent',
            description: `$${payment.amount} sent to creator`,
            time: payment.payment_date,
            status: payment.status,
            amount: payment.amount
          }))
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, limit)

      return NextResponse.json({ activities })
    }

  } catch (error) {
    console.error('Error fetching recent activity:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 