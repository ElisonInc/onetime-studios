# OneTime Studios

A modern marketplace for booking studio space instantly. Built with Next.js 14, TypeScript, Tailwind CSS, Clerk, Supabase, and Stripe.

## Features

- 🔍 **Real-time Search** - Find available studios by location, date, and time
- ⚡ **Instant Booking** - Book in under 2 minutes with real-time availability
- 💳 **Secure Payments** - Stripe-powered payments with Connect for owner payouts
- 🎨 **Modern Design** - Dark theme with stunning gradients and smooth animations
- 🔐 **Authentication** - Clerk-powered auth with role-based access
- 📊 **Owner Dashboard** - Manage your studio, bookings, and earnings

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe Connect
- **Deployment**: Vercel

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/onetime-studios/onetime-studios.git
cd onetime-studios
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Clerk (https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase (https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe (https://stripe.com)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### 3. Database Setup

Run the setup SQL in your Supabase SQL Editor:

1. Go to: `https://supabase.com/dashboard/project/[PROJECT_REF]/sql`
2. Copy contents of `supabase/setup.sql`
3. Click "Run"

Or use the full schema in `supabase/schema.sql` for production.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
onetime-studios/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout with providers
│   ├── studios/           # Studio pages
│   ├── dashboard/         # User dashboard
│   └── api/               # API routes
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── supabase/             # Database files
│   ├── schema.sql        # Full schema
│   └── setup.sql         # Quick setup
└── public/               # Static assets
```

## Database Schema

### Core Tables

- **profiles** - User profiles synced from Clerk
- **studios** - Studio listings with pricing and availability
- **rooms** - Individual rooms within studios (optional)
- **bookings** - Booking records with payment status
- **reviews** - User reviews for studios
- **favorites** - User's saved studios

### Key Features

- Row Level Security (RLS) for data protection
- Unique constraints to prevent double-booking
- Indexes for fast queries
- Automatic updated_at timestamps

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
SUPABASE_SERVICE_ROLE_KEY=ey...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional
NEXT_PUBLIC_APP_URL=https://your-domain.com
PLATFORM_FEE_PERCENT=10
```

## Development Roadmap

- [x] Landing page with search
- [x] Database schema
- [x] Auth with Clerk
- [ ] Studio listing pages
- [ ] Booking flow
- [ ] Owner dashboard
- [ ] Stripe payments
- [ ] Real-time availability
- [ ] Reviews system
- [ ] Mobile app (future)

## License

MIT License - see LICENSE file

## Support

For support, email hello@onetime.studio or join our Discord.

---

Built with ❤️ by the OneTime Studios team
