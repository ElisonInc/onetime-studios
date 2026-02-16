# OneTime Studios (OTS)

A marketplace + scheduling + payments platform where artists can find studios, see real availability, instantly book, and pay, while studio owners manage listings, calendars, pricing, policies, and payouts.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: Clerk
- **Database**: PostgreSQL (Supabase/Neon) + Drizzle ORM
- **Payments**: Stripe (PaymentIntents + Connect)
- **Maps**: Google Maps / Mapbox (optional)

### Booking Status Lifecycle
```
hold → pending_payment → confirmed → completed
              ↓
        cancelled / refunded / disputed / no_show
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (booker)/           # Booker routes
│   │   │   ├── search/         # Studio search
│   │   │   ├── studios/[slug]/ # Studio detail
│   │   │   ├── checkout/       # Payment checkout
│   │   │   ├── confirmation/   # Booking confirmation
│   │   │   └── bookings/       # My bookings
│   │   ├── (owner)/            # Owner routes
│   │   ├── api/                # API routes
│   │   │   ├── studios/        # Studio CRUD
│   │   │   ├── bookings/       # Booking operations
│   │   │   ├── availability/   # Slot availability
│   │   │   └── webhooks/       # Stripe/Clerk webhooks
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   ├── db/
│   │   ├── schema.ts           # Database schema
│   │   └── index.ts            # DB connection
│   ├── lib/
│   │   ├── auth.ts             # Auth utilities
│   │   ├── availability.ts     # Calendar locking logic
│   │   ├── booking.ts          # Booking lifecycle
│   │   ├── stripe.ts           # Stripe integration
│   │   └── utils.ts            # Utilities
│   ├── types/
│   │   └── booking.ts          # TypeScript types
│   └── middleware.ts           # Clerk middleware
├── drizzle/                    # Database migrations
├── .env.example                # Environment variables
└── package.json
```

## Setup Instructions

### 1. Clone and Install

```bash
cd onetime-studios
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/onetime_studios"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
PLATFORM_FEE_PERCENT="10"
DISPUTE_WINDOW_HOURS="48"
HOLD_EXPIRY_MINUTES="10"
```

### 3. Database Setup

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate
```

### 4. Clerk Setup

1. Create account at [clerk.com](https://clerk.com)
2. Create a new application
3. Add the following webhook endpoint in Clerk Dashboard:
   - URL: `https://your-domain.com/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
4. Copy the webhook signing secret to `CLERK_WEBHOOK_SECRET`

### 5. Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Add webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `account.updated`
4. Enable Stripe Connect (Express accounts)

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features Implemented

### MVP Core
- [x] User authentication with Clerk (booker/owner/admin roles)
- [x] Database schema with Drizzle ORM
- [x] Studio CRUD (owner only)
- [x] Studio search and detail pages
- [x] **Availability + Calendar Locking** (critical path)
  - 10-minute slot holds
  - Optimistic locking with version field
  - Database-level unique constraint to prevent double-booking
- [x] Stripe PaymentIntents integration
- [x] Booking flow with Stripe Elements
- [x] Booking confirmation
- [x] My Bookings page

### Booking Lifecycle
- `hold` → `pending_payment` → `confirmed` → `completed`
- Cancellation with refund calculation
- No-show handling
- Dispute support

### Safety Measures
1. **Double-booking Prevention**:
   - Partial unique index on `(studio_id, room_id, start_datetime)` where `status = 'booked'`
   - Optimistic locking with version field
   - Transaction-based slot updates

2. **Payment Safety**:
   - Manual capture (authorize now, capture later)
   - Webhook idempotency checking
   - Payouts only after dispute window

3. **Data Integrity**:
   - All booking state changes in transactions
   - Cancellation policy snapshot at booking time
   - Audit trail for all operations

## API Routes

### Public
- `GET /api/studios` - Search studios
- `GET /api/studios/[id]` - Studio detail
- `GET /api/availability` - Get available slots

### Protected (Auth Required)
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List my bookings
- `PATCH /api/bookings/[id]` - Cancel/complete booking
- `POST /api/availability/hold` - Hold slots

### Webhooks
- `POST /api/webhooks/clerk` - Clerk user sync
- `POST /api/webhooks/stripe` - Stripe events

## Next Steps (V1)

- [ ] Owner dashboard (calendar, bookings, analytics)
- [ ] Messaging system
- [ ] Reviews (post-booking)
- [ ] Add-ons during checkout
- [ ] Owner analytics
- [ ] Admin moderation panel

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel Dashboard
4. Deploy

### Database

- Use Supabase or Neon for managed PostgreSQL
- Enable PostGIS extension for geospatial queries

## License

MIT
