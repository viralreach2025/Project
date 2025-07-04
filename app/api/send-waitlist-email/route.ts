import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { WaitlistEmailTemplate } from './email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, userType, formData } = body

    if (!email || !userType) {
      return NextResponse.json(
        { error: 'Email and userType are required' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'ViralReach <support@viralreach.ca>',
      to: [email],
      subject: `Welcome to ViralReach! 🚀 ${userType === 'brand' ? 'Your Creator Journey Starts Here' : 'Your Brand Partnership Journey Begins'}`,
      react: WaitlistEmailTemplate({ userType, formData }),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Email API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 