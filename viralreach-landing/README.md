# ViralReach - Landing Page

A modern, mobile-responsive landing page for ViralReach, a performance-based influencer marketing platform connecting skincare brands with authentic creators.

## 🚀 Features

### Landing Page
- **Hero Section**: Netflix-style background with influencer collage
- **Interactive Demo**: Preview of the ViralReach dashboard
- **Waitlist System**: Email collection with personalized quiz
- **Mobile Responsive**: Optimized for all devices
- **Modern UI**: Beautiful gradients and animations

### Creator Page
- **Dedicated Creator Landing**: Showcases benefits for content creators
- **Success Stories**: Real creator testimonials and earnings
- **How It Works**: Step-by-step process explanation
- **FAQ Section**: Common creator questions

### Brand Page
- **Dedicated Brand Landing**: Highlights benefits for skincare brands
- **Creator Showcase**: Featured creators with metrics
- **Performance Metrics**: ROI and engagement statistics
- **Campaign Process**: Clear workflow explanation

### Waitlist Functionality
- **Smart Quiz**: Personalized questions based on user type
- **Email Collection**: Secure email storage
- **Welcome Emails**: Automated email responses
- **Database Integration**: Supabase backend

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase
- **Email**: Resend
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📱 Mobile Compatibility

✅ **Fully Mobile Responsive**
- Responsive navigation with hamburger menu
- Mobile-first design approach
- Touch-friendly interfaces
- Optimized for iPhone, Android, and tablets
- Responsive typography and spacing

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd viralreach-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase and Resend credentials
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key
```

### Supabase Setup

1. Create a Supabase project
2. Set up the following tables:
   - `waitlist_entries`
   - `contact_submissions`
3. Configure RLS policies
4. Add your Supabase URL and anon key to `.env.local`

### Email Setup

1. Create a Resend account
2. Add your API key to `.env.local`
3. Configure email templates in `app/api/send-waitlist-email/email-template.tsx`

## 📁 Project Structure

```
viralreach-landing/
├── app/
│   ├── page.tsx                 # Main landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── creator/page.tsx         # Creator landing page
│   ├── brand/page.tsx           # Brand landing page
│   ├── contact/page.tsx         # Contact page
│   ├── components/              # Reusable components
│   │   ├── Button.tsx
│   │   ├── ContactForm.tsx
│   │   ├── CreatorStoriesCarousel.tsx
│   │   ├── DashboardPreview.tsx
│   │   ├── HeroDemo.tsx
│   │   ├── InteractiveDemo.tsx
│   │   ├── MarketplacePreview.tsx
│   │   ├── OnboardingSuccess.tsx
│   │   ├── PortfolioCarousel.tsx
│   │   └── WaitlistQuiz.tsx
│   └── api/send-waitlist-email/ # Waitlist email API
├── lib/
│   ├── database.ts              # Database functions
│   └── supabase.ts              # Supabase client
├── public/                      # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Colors and Branding
- Primary colors: Pink (`#ec4899`) to Purple (`#8b5cf6`) gradient
- Update colors in `tailwind.config.js` and component files

### Content
- Update text content in respective page files
- Modify images in the `public/` directory
- Customize email templates in `app/api/send-waitlist-email/email-template.tsx`

### Styling
- Global styles in `app/globals.css`
- Component-specific styles using Tailwind classes
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

## 📧 Email Templates

The waitlist system includes automated emails:
- **Welcome Email**: Sent after quiz completion
- **Skip Email**: Sent when users skip the quiz
- **Customizable**: Edit templates in `app/api/send-waitlist-email/email-template.tsx`

## 🔒 Security

- Only public API keys included
- Database access through Supabase RLS policies
- Email validation and sanitization
- No sensitive data in client-side code

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with environment variables
- **AWS Amplify**: Full-stack deployment option

## 📊 Analytics

The landing page is ready for analytics integration:
- Google Analytics
- Facebook Pixel
- Hotjar
- Mixpanel

Add tracking codes to `app/layout.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile and desktop
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support or questions:
- Email: support@viralreach.com
- Contact form: `/contact`
- Documentation: Check this README

---

**ViralReach** - Empowering authentic influence through performance-based marketing. 