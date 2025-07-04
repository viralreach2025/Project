import { Html, Head, Body, Container, Section, Text, Heading, Hr, Link, Img } from '@react-email/components'

interface WaitlistEmailTemplateProps {
  userType: 'brand' | 'creator'
  formData?: any
}

export function WaitlistEmailTemplate({ userType, formData }: WaitlistEmailTemplateProps) {
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