# Resend Email Setup for ViralReach

This guide helps you set up Resend to send beautiful welcome emails to your waitlist signups.

## 1. Create a Resend Account

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## 2. Add Your Domain

1. In your Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `viralreach.ca`)
4. Follow the DNS setup instructions to verify your domain
5. Wait for verification (usually takes a few minutes)

**Note:** For testing, you can use the default domain `resend.dev`, but emails will show "via resend.dev"

## 3. Get Your API Key

1. In your Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "ViralReach Waitlist")
4. Select the appropriate permissions (Send emails)
5. Copy the API key (starts with `re_`)

## 4. Configure Environment Variables

Add your Resend API key to your `.env.local` file:

```bash
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here

# Existing Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Update Email From Address

In `app/api/send-waitlist-email/route.ts`, update the `from` field:

```typescript
from: 'ViralReach <hello@yourdomain.com>',  // Replace with your verified domain
```

## 6. Test the Email Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to your waitlist form and submit it
3. Check the console for email sending logs
4. Check your email inbox for the welcome message

## 7. Email Template Features

The welcome email includes:

### For Brands:
- Personalized greeting with their goals
- Benefits of early access
- Next steps and timeline
- Budget-specific messaging

### For Creators:
- Platform-specific content
- Niche-based personalization
- Creator-focused benefits
- Community welcome

## 8. Customization Options

### Update Email Content
Edit `app/api/send-waitlist-email/email-template.tsx` to:
- Change the email design
- Update messaging
- Add/remove sections
- Modify styling

### Update Subject Lines
Edit `app/api/send-waitlist-email/route.ts` to change:
- Subject line templates
- From address
- Additional email logic

### Add More Personalization
The email uses data from the waitlist form:
- `primaryGoal` (brands)
- `budgetRange` (brands)
- `primaryPlatform` (creators)
- `contentNiche` (creators)
- And more...

## 9. Production Considerations

### Domain Authentication
- Make sure your domain is verified in Resend
- Set up SPF, DKIM, and DMARC records for better deliverability

### Rate Limits
- Free tier: 3,000 emails/month
- Check your usage in the Resend dashboard
- Upgrade plan if needed

### Email Deliverability
- Use a professional from address
- Keep subject lines clear and not spammy
- Include unsubscribe links
- Monitor bounce rates

## 10. Monitoring and Analytics

### In Resend Dashboard:
- View email delivery status
- Track open rates and clicks
- Monitor bounces and complaints
- View sending volume

### In Your App:
- Check browser console for email sending logs
- Monitor API errors
- Track successful vs failed sends

## 11. Advanced Features

### Email Sequences
You can extend this to send:
- Follow-up emails after a few days
- Platform launch notifications
- Educational content series

### Dynamic Content
Add more personalization based on:
- User location
- Signup date
- Form responses
- User behavior

### A/B Testing
Test different:
- Subject lines
- Email designs
- Call-to-action buttons
- Send times

## Troubleshooting

### Common Issues:

**"Invalid API key"**
- Check that your API key is correct in `.env.local`
- Make sure there are no extra spaces
- Restart your development server

**"Domain not verified"**
- Complete domain verification in Resend
- Or use the default `resend.dev` domain for testing

**"Rate limit exceeded"**
- Check your Resend dashboard for usage
- Upgrade your plan if needed
- Implement rate limiting in your app

**Emails not arriving**
- Check spam folder
- Verify recipient email address
- Check Resend dashboard for delivery status

### Support Resources:
- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)

## 12. Next Steps

Once email is working:
1. Set up email analytics and tracking
2. Create additional email templates
3. Implement email preferences
4. Add unsubscribe functionality
5. Set up automated email sequences 