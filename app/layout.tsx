import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://viralreach.com'),
  title: {
    default: 'ViralReach - Scale Your Brand with Performance-Driven Creators',
    template: '%s | ViralReach'
  },
  description: 'Connect with 50K+ verified creators who genuinely promote your products. Track real metrics, see transparent results, and only pay for verified performance. Join the waitlist today.',
  keywords: [
    'influencer marketing',
    'creator economy', 
    'social media marketing',
    'brand promotion',
    'verified influencers',
    'performance marketing',
    'roi tracking',
    'creator partnerships',
    'authentic promotion',
    'social commerce',
    'influencer platform',
    'marketing automation'
  ],
  authors: [{ name: 'ViralReach Team', url: 'https://viralreach.com' }],
  creator: 'ViralReach',
  publisher: 'ViralReach',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://viralreach.com',
    siteName: 'ViralReach',
    title: 'ViralReach - Scale Your Brand with Performance-Driven Creators',
    description: 'Connect with 50K+ verified creators who genuinely promote your products. Track real metrics and only pay for verified performance.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ViralReach - Influencer Marketing Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@viralreach',
    creator: '@viralreach',
    title: 'ViralReach - Scale Your Brand with Performance-Driven Creators',
    description: 'Connect with 50K+ verified creators who genuinely promote your products. Track real metrics and only pay for verified performance.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://viralreach.com',
    languages: {
      'en-US': 'https://viralreach.com',
      'en-GB': 'https://viralreach.com/en-gb',
      'es-ES': 'https://viralreach.com/es',
      'fr-FR': 'https://viralreach.com/fr',
      'de-DE': 'https://viralreach.com/de',
    },
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: any
}) {
  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ViralReach',
    description: 'Connect with 50K+ verified creators who genuinely promote your products. Track real metrics and only pay for verified performance.',
    url: 'https://viralreach.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://viralreach.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ViralReach',
      url: 'https://viralreach.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://viralreach.com/logo.png'
      }
    }
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ViralReach',
    url: 'https://viralreach.com',
    logo: 'https://viralreach.com/logo.png',
    description: 'Performance-driven influencer marketing platform connecting brands with verified creators',
    sameAs: [
      'https://twitter.com/viralreach',
      'https://linkedin.com/company/viralreach',
      'https://instagram.com/viralreach'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@viralreach.com'
    }
  };

  const productData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ViralReach',
    description: 'Influencer marketing platform for brands and creators',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to join waitlist'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1247'
    }
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
        />
        
        {/* Geo and Language Support */}
        <link rel="alternate" hrefLang="en" href="https://viralreach.com" />
        <link rel="alternate" hrefLang="en-US" href="https://viralreach.com" />
        <link rel="alternate" hrefLang="en-GB" href="https://viralreach.com/en-gb" />
        <link rel="alternate" hrefLang="es" href="https://viralreach.com/es" />
        <link rel="alternate" hrefLang="fr" href="https://viralreach.com/fr" />
        <link rel="alternate" hrefLang="de" href="https://viralreach.com/de" />
        <link rel="alternate" hrefLang="x-default" href="https://viralreach.com" />
        
        {/* Favicon and Touch Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//google-analytics.com" />
        <link rel="dns-prefetch" href="//googletagmanager.com" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        
        {/* Viewport meta for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Geo targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="39.78373;-100.445882" />
        <meta name="ICBM" content="39.78373, -100.445882" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 