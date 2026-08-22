# OneTime Studios

**OneTime Studios** is a marketplace concept for discovering and booking recording studio space with a faster, more transparent booking experience.

This repository represents the product prototype and systems design behind the platform, including marketplace search, authentication, studio inventory, booking architecture, payments, owner tooling, and database security.

## Product Goal

Recording studio booking is often handled through DMs, phone calls, spreadsheets, and manual back-and-forth. OneTime Studios explores a more structured marketplace experience where artists can discover studios, view availability, and move toward booking in one workflow.

## Core Product Areas

- **Studio discovery** — Search and browse studio inventory by location and availability
- **Booking workflows** — Structured booking architecture designed to reduce manual coordination
- **Authentication** — User and studio-owner access through Clerk
- **Marketplace payments** — Stripe Connect architecture for customer payments and owner payouts
- **Owner tooling** — Dashboard concepts for managing studios, bookings, and earnings
- **Data protection** — Supabase/PostgreSQL with Row Level Security and constraints designed to reduce double-booking risk

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Authentication:** Clerk
- **Database:** Supabase / PostgreSQL
- **Payments:** Stripe Connect
- **Deployment:** Vercel

## Architecture

```text
onetime-studios/
├── app/                    # Next.js application routes
│   ├── studios/            # Studio discovery and detail flows
│   ├── dashboard/          # User / owner dashboard concepts
│   └── api/                # Server-side routes
├── components/             # Shared React UI
├── lib/                    # Utilities and service clients
├── supabase/               # Database schema and setup
└── public/                 # Static assets
```

## Database Design

The prototype models the core marketplace entities:

- `profiles`
- `studios`
- `rooms`
- `bookings`
- `reviews`
- `favorites`

The schema includes Row Level Security, indexing, timestamps, and uniqueness constraints intended to support safer multi-user booking workflows.

## Local Development

```bash
git clone https://github.com/ElisonInc/onetime-studios.git
cd onetime-studios
npm install
cp .env.example .env.local
npm run dev
```

Required services include Clerk, Supabase, and Stripe. See `.env.example` for configuration details.

## Project Status

OneTime Studios is an **experimental marketplace prototype**, not a claim that every planned marketplace feature is production-complete. The repository is maintained as part of the ELISON INC product portfolio and documents the product direction, architecture, and implementation work behind the concept.

## About ELISON INC

OneTime Studios is a product project under **ELISON INC**, alongside work in AI systems, automation, music technology, and digital products.

## License

MIT License — see `LICENSE`.
