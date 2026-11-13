# OneTime Studios

**Status: experimental prototype. Paused in practice:** the last feature work was in February 2026. Since then, commits have only changed docs and small fixes (most recent October 2026).

OneTime Studios is a marketplace prototype for finding and booking recording studio space. Artists browse studios, check availability and book a time slot. Studio owners list their spaces and manage bookings. It is a product of **Elison Inc.**

## For reviewers

Look at this project as a **two-sided marketplace systems exercise**, not as a finished product. The most useful parts to review are:

- the data model
- how customer and owner workflows are kept separate
- how the database guards against double booking
- the auth boundaries
- the payment flow

## What's in the repo

- **Studio discovery:** studio listing (`/studios`) and studio detail pages (`/studios/[slug]`)
- **Booking flow:** `/book`, with availability API routes (`available-dates`, `available-times`). Times are calculated with `date-fns` / `date-fns-tz`.
- **Payments:** Stripe PaymentIntent creation, booking confirmation and a Stripe webhook route
- **Authentication:** Clerk, with middleware covering app and API routes and modal sign-in/sign-up
- **Owner tooling:** owner dashboard (`/dashboard/owner`), new-studio form (`/studios/new`) and a "List your space" page
- **Image uploads:** a Cloudinary-backed `/api/upload` route
- **Marketing pages:** landing page sections, "How it works" and an FAQ

### Known gaps (as of the last review)

- **Stripe Connect is designed but not built.** Owner payout columns exist in the schema, but the payment route creates a standard PaymentIntent with no transfers to owners.
- **The homepage search results use mock data** (`lib/mockStudios.ts`). The other pages read from Supabase through `lib/data.ts`.
- **The SQL scripts in `supabase/` haven't been consolidated.** Several setup, reset and fix scripts exist side by side. One commit message mentions UTC booking fields (`start_at_utc` / `end_at_utc`), but `schema.sql` uses separate date and time columns. Which script matches the current code is unconfirmed.
- **No automated tests** and no CI configuration.

## Tech stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **UI:** Tailwind CSS, `tailwindcss-animate`, Framer Motion, lucide-react
- **Auth:** Clerk (`@clerk/nextjs`)
- **Database:** Supabase / PostgreSQL
- **Payments:** Stripe
- **Media:** Cloudinary
- **Hosting:** Vercel was the intended host (unconfirmed; the repo has no Vercel config)

## Project structure

```text
app/
  api/            # availability, bookings (payment intent, confirm), stripe-webhook, upload
  book/           # booking flow
  dashboard/      # user dashboard and owner dashboard
  studios/        # listing, detail ([slug]), new studio
  how-it-works/, list-your-space/
components/       # shared UI (Navbar, Footer, SearchBar, StudioCard, FAQ, …)
lib/              # Supabase/Stripe/Cloudinary clients, data access, availability, types
supabase/         # schema, setup/reset scripts, seed data, debug/fix scripts
docs/history/     # archived specs and implementation notes
middleware.ts     # Clerk middleware
```

## Data model

`supabase/schema.sql` defines these tables:

- `profiles` (keyed by Clerk user ID)
- `studios`
- `rooms`
- `availability_slots`
- `bookings`
- `reviews`
- `favorites`

The schema also includes:

- Row Level Security policies
- indexes
- `updated_at` triggers
- a partial unique index that blocks double-booking of confirmed slots

## Running locally

Prerequisites:

- Node.js
- your own Clerk, Supabase and Stripe accounts
- a Cloudinary account (only needed for image uploads)

```bash
git clone https://github.com/ElisonInc/onetime-studios.git
cd onetime-studios
npm install
cp .env.example .env.local   # fill in your own keys
npm run dev
```

Other scripts:

- `npm run build` creates a production build
- `npm start` serves the build
- `npm run lint` runs Next.js lint

**Environment variables:** `.env.example` lists the Clerk, Supabase and Stripe keys. It doesn't include the Cloudinary keys, so add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` yourself if you need uploads.

**Database:** run `supabase/schema.sql` in your Supabase project's SQL editor. Then, if you want sample studios, run `supabase/seed_data.sql`. Check the scripts against the code first (see Known gaps).

## Ownership

OneTime Studios is a product prototype under **Elison Inc.** Elison Morban defined the concept and marketplace workflow, directed the implementation and reviewed the architecture.

## License

No licence file is included in this repository, and `package.json` is marked `private`. Until a licence is added, all rights are reserved.

---

Last reviewed: 2026-11-12
