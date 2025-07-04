import { Html, Head, Body, Container, Section, Text, Heading, Hr, Link, Img } from '@react-email/components'

interface WaitlistEmailTemplateProps {
  userType: 'brand' | 'creator'
  formData?: any
  template?: string
  data?: any
}

export function WaitlistEmailTemplate({ userType, formData, template, data }: WaitlistEmailTemplateProps) {
  // If it's a skincare quiz, use the skincare template
  if (template === 'skincare-quiz') {
    return <SkincareQuizEmailTemplate data={data} />
  }

  const isCreator = userType === 'creator'
  
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <div style={logo}>
              <Text style={logoText}>VR</Text>
            </div>
            <Heading style={title}>ViralReach</Heading>
          </Section>

          {/* Welcome Message */}
          <Section style={content}>
            <Heading style={h1}>
              🎉 Welcome to ViralReach!
            </Heading>
            
            <Text style={text}>
              {isCreator 
                ? `Hi there! We're thrilled you've joined our creator community. You're now part of an exclusive network of talented creators who are reshaping influencer marketing.`
                : `Hello! Welcome to ViralReach. We're excited you've joined our platform where brands connect with authentic creators for performance-driven campaigns.`
              }
            </Text>

            {/* Personalized Content Based on User Type */}
            {isCreator ? (
              <>
                <Heading style={h2}>🌟 What's Next for You as a Creator?</Heading>
                <Text style={text}>
                  As a creator{formData?.primaryPlatform ? ` specializing in ${formData.primaryPlatform}` : ''}, you'll get:
                </Text>
                <ul style={list}>
                  <li style={listItem}>🎯 Access to exclusive brand partnership opportunities</li>
                  <li style={listItem}>💰 Fair compensation for your authentic content</li>
                  <li style={listItem}>📊 Transparent performance tracking and analytics</li>
                  <li style={listItem}>🤝 Direct communication with brand partners</li>
                  <li style={listItem}>🚀 Tools to grow your influence and earnings</li>
                </ul>
                
                {formData?.contentNiche && (
                  <Text style={text}>
                    We noticed you create <strong>{formData.contentNiche}</strong> content - we already have brands looking for creators in your niche!
                  </Text>
                )}
              </>
            ) : (
              <>
                <Heading style={h2}>🚀 What's Next for Your Brand?</Heading>
                <Text style={text}>
                  {formData?.primaryGoal ? `With your goal to ${formData.primaryGoal.toLowerCase()}, ` : ''}You'll get early access to:
                </Text>
                <ul style={list}>
                  <li style={listItem}>🎯 50K+ verified creators across all niches</li>
                  <li style={listItem}>📈 Performance-based campaign tracking</li>
                  <li style={listItem}>💡 AI-powered creator matching</li>
                  <li style={listItem}>📊 Real-time ROI analytics</li>
                  <li style={listItem}>🛡️ Built-in fraud protection</li>
                </ul>

                {formData?.budgetRange && (
                  <Text style={text}>
                    Based on your <strong>{formData.budgetRange}</strong> budget range, we'll ensure you get maximum value from every campaign.
                  </Text>
                )}
              </>
            )}

            <Hr style={hr} />

            {/* Early Access Benefits */}
            <Heading style={h2}>🌟 Your Early Access Benefits</Heading>
            <Text style={text}>
              As one of our first {isCreator ? 'creators' : 'brands'}, you'll enjoy:
            </Text>
            <ul style={list}>
              <li style={listItem}>✅ <strong>Priority Access:</strong> Be first to use the platform when we launch</li>
              <li style={listItem}>✅ <strong>Special Pricing:</strong> Exclusive early adopter discounts</li>
              <li style={listItem}>✅ <strong>Direct Support:</strong> Personal onboarding and dedicated support</li>
              <li style={listItem}>✅ <strong>Shape the Product:</strong> Your feedback directly influences our features</li>
              <li style={listItem}>✅ <strong>Exclusive Content:</strong> Industry insights and tips sent directly to your inbox</li>
            </ul>

            {/* Timeline */}
            <Section style={timeline}>
              <Heading style={h2}>📅 What Happens Next?</Heading>
              <Text style={text}>
                <strong>Week 1-2:</strong> We'll send you exclusive industry insights and platform updates
              </Text>
              <Text style={text}>
                <strong>Week 3-4:</strong> Get early preview access to test core features
              </Text>
              <Text style={text}>
                <strong>Launch Day:</strong> Full platform access with your early adopter benefits
              </Text>
            </Section>

            <Hr style={hr} />



            <Text style={text}>
              Have questions? Just reply to this email - we read every message and would love to hear from you!
            </Text>

            <Text style={signature}>
              Cheers,<br />
              <strong>The ViralReach Team</strong><br />
              <Link href="https://viralreach.ca" style={link}>viralreach.ca</Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You received this email because you joined the ViralReach waitlist.
            </Text>
            <Text style={footerText}>
              ViralReach • Toronto, Canada<br />
              <Link href="mailto:support@viralreach.ca" style={link}>support@viralreach.ca</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Skincare Quiz Email Template
function SkincareQuizEmailTemplate({ data }: { data: any }) {
  const isCreator = data?.userType?.includes('creator')
  const isBrand = data?.userType?.includes('brand')
  const isAgency = data?.userType?.includes('agency')

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={skincareHeader}>
            <div style={skincareLogo}>
              <Text style={skincareLogoText}>💧</Text>
            </div>
            <Heading style={skincareTitle}>SkinConnect</Heading>
            <Text style={skincareSubtitle}>Authentic Beauty, Real Results</Text>
          </Section>

          {/* Welcome Message */}
          <Section style={content}>
            <Heading style={h1}>
              🎉 Welcome to the Authentic Beauty Movement!
            </Heading>
            
            <Text style={text}>
              Hi {data?.name || 'there'}! Thank you for completing our detailed assessment. We've analyzed your needs and are excited to help you eliminate fake reviews in the skincare industry.
            </Text>

            {/* Quiz Summary */}
            <Section style={quizSummary}>
              <Heading style={h2}>📋 Your Assessment Summary</Heading>
              
              <div style={summaryGrid}>
                <div style={summaryItem}>
                  <Text style={summaryLabel}>Role</Text>
                  <Text style={summaryValue}>{data?.userType || 'Not specified'}</Text>
                </div>
                
                {data?.platform && (
                  <div style={summaryItem}>
                    <Text style={summaryLabel}>Platform</Text>
                    <Text style={summaryValue}>{data.platform}</Text>
                  </div>
                )}
                
                {data?.followers && (
                  <div style={summaryItem}>
                    <Text style={summaryLabel}>Reach</Text>
                    <Text style={summaryValue}>{data.followers}</Text>
                  </div>
                )}
                
                {data?.skinType && (
                  <div style={summaryItem}>
                    <Text style={summaryLabel}>Focus</Text>
                    <Text style={summaryValue}>{data.skinType}</Text>
                  </div>
                )}
                
                {data?.budget && (
                  <div style={summaryItem}>
                    <Text style={summaryLabel}>Budget</Text>
                    <Text style={summaryValue}>{data.budget}</Text>
                  </div>
                )}
                
                {data?.timeline && (
                  <div style={summaryItem}>
                    <Text style={summaryLabel}>Timeline</Text>
                    <Text style={summaryValue}>{data.timeline}</Text>
                  </div>
                )}
              </div>

              {data?.goals && data.goals.length > 0 && (
                <div style={goalsSection}>
                  <Text style={summaryLabel}>Your Goals:</Text>
                  <ul style={list}>
                    {data.goals.map((goal: string, index: number) => (
                      <li key={index} style={listItem}>✅ {goal}</li>
                    ))}
                  </ul>
                </div>
              )}

              {data?.painPoints && data.painPoints.length > 0 && (
                <div style={goalsSection}>
                  <Text style={summaryLabel}>Your Challenges:</Text>
                  <ul style={list}>
                    {data.painPoints.map((pain: string, index: number) => (
                      <li key={index} style={listItem}>🔧 {pain}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            {/* Personalized Solutions */}
            <Heading style={h2}>🎯 Your Personalized Solution</Heading>
            
            {isCreator && (
              <>
                <Text style={text}>
                  As a <strong>{data?.role || 'content creator'}</strong> with {data?.followers || 'your audience'}, here's how we'll help you:
                </Text>
                <ul style={list}>
                  <li style={listItem}>💎 <strong>Authentic Partnerships:</strong> Work only with brands that value real results</li>
                  <li style={listItem}>💰 <strong>Premium Compensation:</strong> Earn $2K-$15K for 90-day authentic campaigns</li>
                  <li style={listItem}>📈 <strong>Audience Growth:</strong> Build genuine trust through real transformation stories</li>
                  <li style={listItem}>🤝 <strong>Long-term Relationships:</strong> Create lasting partnerships with premium brands</li>
                  <li style={listItem}>📊 <strong>Performance Tracking:</strong> See your real impact with detailed analytics</li>
                </ul>
              </>
            )}

            {isBrand && (
              <>
                <Text style={text}>
                  As a <strong>{data?.role || 'skincare brand'}</strong> with a {data?.budget || 'budget'} for campaigns, here's how we'll help you:
                </Text>
                <ul style={list}>
                  <li style={listItem}>🎯 <strong>Perfect Creator Matching:</strong> 98% accuracy in audience alignment</li>
                  <li style={listItem}>📊 <strong>Real ROI Tracking:</strong> See exactly what's working and what's not</li>
                  <li style={listItem}>✅ <strong>Verified Creators:</strong> Only work with creators who have real audiences</li>
                  <li style={listItem}>⏱️ <strong>90-Day Testing:</strong> Authentic product testing with real results</li>
                  <li style={listItem}>🛡️ <strong>Fraud Protection:</strong> Built-in safeguards against fake engagement</li>
                </ul>
              </>
            )}

            {isAgency && (
              <>
                <Text style={text}>
                  As a <strong>marketing agency</strong> managing influencer campaigns, here's how we'll help you:
                </Text>
                <ul style={list}>
                  <li style={listItem}>📈 <strong>Better Results:</strong> Deliver authentic campaigns that actually convert</li>
                  <li style={listItem}>💰 <strong>Client Satisfaction:</strong> Transparent reporting and real ROI</li>
                  <li style={listItem}>🎯 <strong>Perfect Matching:</strong> AI-powered creator selection for optimal results</li>
                  <li style={listItem}>⏱️ <strong>Time Savings:</strong> Automated processes and verified creators</li>
                  <li style={listItem}>📊 <strong>Detailed Analytics:</strong> Comprehensive reporting for your clients</li>
                </ul>
              </>
            )}

            <Hr style={hr} />

            {/* Next Steps */}
            <Section style={timeline}>
              <Heading style={h2}>🚀 What Happens Next?</Heading>
              <Text style={text}>
                <strong>Within 24 hours:</strong> You'll receive a personalized strategy call invitation
              </Text>
              <Text style={text}>
                <strong>Week 1:</strong> Exclusive platform access and creator/brand matching</Text>
              <Text style={text}>
                <strong>Week 2:</strong> Your first authentic collaboration setup
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={text}>
              Ready to eliminate fake reviews and create authentic beauty connections? Reply to this email to schedule your strategy call!
            </Text>

            <Text style={signature}>
              Cheers,<br />
              <strong>The SkinConnect Team</strong><br />
              <Link href="https://skinconnect.com" style={link}>skinconnect.com</Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You received this email because you completed the SkinConnect assessment.
            </Text>
            <Text style={footerText}>
              SkinConnect • Authentic Beauty, Real Results<br />
              <Link href="mailto:support@skinconnect.com" style={link}>support@skinconnect.com</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}

const header = {
  backgroundColor: '#6366f1',
  padding: '40px 30px',
  textAlign: 'center' as const,
}

const logo = {
  display: 'inline-block',
  width: '50px',
  height: '50px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  marginBottom: '16px',
  textAlign: 'center' as const,
  paddingTop: '12px',
}

const logoText = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '1.2',
}

const title = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '1.2',
}

// Skincare-specific styles
const skincareHeader = {
  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  padding: '40px 30px',
  textAlign: 'center' as const,
}

const skincareLogo = {
  display: 'inline-block',
  width: '60px',
  height: '60px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  marginBottom: '16px',
  textAlign: 'center' as const,
  paddingTop: '16px',
}

const skincareLogoText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '1.2',
}

const skincareTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  lineHeight: '1.2',
}

const skincareSubtitle = {
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '16px',
  margin: '0',
  lineHeight: '1.2',
}

const content = {
  padding: '40px 30px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  margin: '0 0 20px 0',
}

const h2 = {
  color: '#1a1a1a',
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  margin: '30px 0 15px 0',
}

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 15px 0',
}

const list = {
  margin: '0 0 20px 0',
  paddingLeft: '0',
}

const listItem = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 8px 0',
  listStyleType: 'none',
  paddingLeft: '0',
}

const timeline = {
  backgroundColor: '#f8fafc',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
}

const quizSummary = {
  backgroundColor: '#fef7ff',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #e9d5ff',
  margin: '20px 0',
}

const summaryGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '16px',
  margin: '16px 0',
}

const summaryItem = {
  backgroundColor: '#ffffff',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #f3e8ff',
}

const summaryLabel = {
  color: '#7c3aed',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px 0',
  letterSpacing: '0.5px',
}

const summaryValue = {
  color: '#1a1a1a',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
}

const goalsSection = {
  margin: '16px 0',
}

const signature = {
  margin: '30px 0 0 0',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#525252',
}

const link = {
  color: '#6366f1',
  textDecoration: 'none',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '30px 0',
}

const footer = {
  backgroundColor: '#f8fafc',
  padding: '30px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '1.4',
  margin: '0 0 5px 0',
} 