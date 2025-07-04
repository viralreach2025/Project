# Quick Email Setup Guide

## 1. Get Resend API Key
1. Go to [resend.com](https://resend.com) and create account
2. Get your API key from the dashboard

## 2. Add to Environment Variables
Add to your `.env.local` file:
```
RESEND_API_KEY=re_your_api_key_here
```

## 3. Update Email From Address
In `app/api/send-waitlist-email/route.ts`, change:
```typescript
from: 'ViralReach <hello@yourdomain.com>',
```

## 4. Test
1. Run `npm run dev`
2. Submit waitlist form
3. Check console and email inbox

## Features
- ✅ Personalized emails for brands vs creators
- ✅ Form data integration (goals, budget, platform, etc.)
- ✅ Beautiful responsive email design
- ✅ Error handling (doesn't break signup if email fails)

Read `RESEND_SETUP.md` for full documentation. 