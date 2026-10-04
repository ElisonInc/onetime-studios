# OneTime Studios - Landing Page Specification

## Live Preview
**🔗 https://txuyqgq3lyf2u.ok.kimi.link**

---

## Updated Page Copy

### Hero Section

**Headline:**
> Book studio space in **under 2 minutes**

**Subheadline:**
> Real availability. Instant confirmation. No back-and-forth. Find recording, photo, and creative studios near you.

**Primary CTA:**
> 🔍 Search by Date & Time

**Secondary CTA:**
> ✨ List Your Studio

**Trust Badge (live indicator):**
> 🟢 1,240 studios available now

**Trust Badges Row:**
| Icon | Label | Sub-label |
|------|-------|-----------|
| Shield | Secure Payments | Stripe Protected |
| Clock | Instant Booking | Under 2 Minutes |
| Star | Verified Studios | Quality Checked |

---

### How It Works Section

**Headline:** How It Works
**Subheadline:** See real availability, book instantly, and get confirmed in seconds.

**3-Step Flow:**

| Step | Title | Description |
|------|-------|-------------|
| 01 | Search by Location | Enter your city and see studios with real-time availability |
| 02 | Pick Your Time | Choose from live calendar slots—what you see is what you get |
| 03 | Book & Confirm | Pay securely and receive instant confirmation + calendar invite |

**Mini UI Preview:** Shows 3 connected cards:
1. Search form (location + date/time)
2. Studio card with rating
3. Time slot picker with "Book" button

---

### Studio Types Section

**Headline:** Find Your Perfect Space
**Subheadline:** Browse studios by type

| Type | Count |
|------|-------|
| Recording | 240+ |
| Photo | 180+ |
| Rehearsal | 120+ |
| Video/Film | 95+ |
| Podcast | 85+ |

---

### Social Proof Section (Dark Background)

| Metric | Value |
|--------|-------|
| Studios Listed | 1,240+ |
| Bookings Completed | 10,000+ |
| Average Rating | 4.8★ |

---

### Owner CTA Section

**Badge:** For Studio Owners

**Headline:** Turn empty hours into revenue

**Body:** List your studio for free. We handle bookings, payments, and scheduling. You just show up and create.

**Stats Grid:**
| Stat | Value |
|------|-------|
| Avg. Utilization | 85% |
| Payout Time | 48h |
| Listing Fee | $0 |
| Platform Fee | 10% |

---

### FAQ Section

**Headline:** Frequently Asked Questions
**Subheadline:** Everything you need to know

**Q1: How do payments work?**
> Your payment is securely held by Stripe until your session is complete. We charge your card when you book, but the studio owner receives payment only after your session ends—protecting both parties.

**Q2: What's the cancellation policy?**
> Free cancellation up to 24 hours before your booking. Cancellations within 24 hours receive a 50% refund. If the studio cancels, you get a full refund plus credit toward your next booking.

**Q3: Is confirmation really instant?**
> Yes. When you complete payment, your booking is immediately confirmed. You'll receive a confirmation email, calendar invite, and studio access instructions within seconds. No waiting for approval.

**Q4: What types of spaces can I book?**
> Recording studios, photo studios, rehearsal spaces, video/film studios, podcast rooms, dance studios, and creative workspaces. Each listing includes equipment details, photos, and studio rules.

---

## Component Tree (shadcn/ui)

```
page.tsx (LandingPage)
├── Navigation (sticky, blur backdrop)
│   ├── Logo (Zap icon + text)
│   ├── Nav Links (Find Studios - desktop only)
│   └── CTAs (Sign In / Get Started)
│
├── HeroSection
│   ├── TrustBadge (pulse dot + live count)
│   ├── Headline (H1 with highlighted text)
│   ├── Subheadline
│   ├── CTAButtons (primary + secondary)
│   └── TrustBadgesRow (4 badges)
│
├── HowItWorksSection (gray bg)
│   ├── SectionHeader
│   ├── StepsGrid (3 steps with icons)
│   └── MiniUIPreview (3 connected cards)
│       ├── SearchCard
│       ├── StudioCard
│       └── TimeSlotsCard
│
├── StudioTypesSection
│   ├── SectionHeader
│   └── TypesGrid (5 type buttons with counts)
│
├── SocialProofSection (violet bg)
│   └── StatsGrid (3 stats)
│
├── OwnerCTASection
│   ├── OwnerCard (dark gradient)
│   │   ├── Badge
│   │   ├── Headline
│   │   ├── Body
│   │   ├── CTAButtons
│   │   └── StatsGrid (4 mini stats)
│
├── FAQSection (gray bg)
│   ├── SectionHeader
│   └── Accordion (4 items)
│
├── FinalCTASection
│   ├── Headline
│   ├── Subheadline
│   └── CTAButton
│
└── Footer
    ├── Logo + Tagline
    ├── Link Columns (For Bookers, For Owners)
    └── Copyright + Security Badge
```

---

## shadcn/ui Components Used

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
```

**Additional Dependencies:**
```bash
npm install @radix-ui/react-accordion
```

---

## Layout Specifications

### Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────┐
│  NAVIGATION (sticky, h-16)                                  │
│  [Logo]                    [Find Studios] [Sign In] [CTA]   │
├─────────────────────────────────────────────────────────────┤
│  HERO (py-24, gradient bg)                                  │
│                                                             │
│              [🟢 1,240 studios available]                   │
│                                                             │
│         Book studio space in under 2 minutes                │
│                                                             │
│     [Search by Date & Time]  [List Your Studio]             │
│                                                             │
│    [Secure] [Instant] [Verified] [10,000+]                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  HOW IT WORKS (py-24, gray bg)                              │
│                                                             │
│     [01 Search] → [02 Pick Time] → [03 Book]                │
│                                                             │
│         ┌─────────┐   ┌─────────┐   ┌─────────┐            │
│         │ Search  │ → │ Studio  │ → │  Slots  │            │
│         │  Card   │   │  Card   │   │  Card   │            │
│         └─────────┘   └─────────┘   └─────────┘            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  STUDIO TYPES                                               │
│  [Recording 240+] [Photo 180+] [Rehearsal 120+] ...         │
├─────────────────────────────────────────────────────────────┤
│  SOCIAL PROOF (violet bg)                                   │
│       1,240+        10,000+        4.8★                     │
│    Studios Listed  Bookings       Average                   │
│                    Completed      Rating                    │
├─────────────────────────────────────────────────────────────┤
│  OWNER CTA (dark card)                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Turn empty hours into revenue                      │   │
│  │                                                     │   │
│  │  [List Your Studio] [Learn More]    85%  48h  $0  │   │
│  │                                     Util Pay List │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  FAQ (accordion)                                            │
│  ▼ How do payments work?                                    │
│  ▼ What's the cancellation policy?                          │
│  ▼ Is confirmation really instant?                          │
│  ▼ What types of spaces can I book?                         │
├─────────────────────────────────────────────────────────────┤
│  FINAL CTA                                                  │
│         Ready to book your next session?                    │
│              [Find Studios Near You]                        │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  [Logo]          For Bookers    For Owners                  │
│  The fastest...  Find Studios   List Your Studio            │
│                  My Bookings    Pricing                     │
│                  Help Center    Resources                   │
│                                                             │
│  © 2024 OneTime Studios        🔒 Secured by Stripe         │
└─────────────────────────────────────────────────────────────┘
```

### Mobile (<640px)

```
┌─────────────────────────┐
│  [Logo]           [CTA] │
├─────────────────────────┤
│  [🟢 1,240 studios]    │
│                         │
│  Book studio space      │
│  in under 2 minutes     │
│                         │
│  [Search by Date]       │
│  [List Your Studio]     │
│                         │
│  [Secure] [Instant]     │
│  [Verified]             │
├─────────────────────────┤
│  HOW IT WORKS           │
│                         │
│  [01 Search]            │
│  Enter your city...     │
│                         │
│  [02 Pick Time]         │
│  Choose from live...    │
│                         │
│  [03 Book]              │
│  Pay securely...        │
│                         │
│  ┌─────────┐            │
│  │ Search  │            │
│  │  Card   │            │
│  └─────────┘            │
│  ┌─────────┐            │
│  │ Studio  │            │
│  │  Card   │            │
│  └─────────┘            │
│  ┌─────────┐            │
│  │  Slots  │            │
│  │  Card   │            │
│  └─────────┘            │
├─────────────────────────┤
│  STUDIO TYPES           │
│  [Rec] [Photo] [Reh]    │
│  [Vid] [Pod]            │
├─────────────────────────┤
│  1,240+    10,000+      │
│  Studios   Bookings     │
│                         │
│  4.8★                   │
│  Average Rating         │
├─────────────────────────┤
│  OWNER CTA              │
│  Turn empty hours...    │
│                         │
│  [List Your Studio]     │
│  [Learn More]           │
│                         │
│  85%  48h  $0  10%      │
├─────────────────────────┤
│  FAQ                    │
│  ▼ How do payments...   │
│  ▼ What's the cancel... │
│  ▼ Is confirmation...   │
│  ▼ What types of...     │
├─────────────────────────┤
│  Ready to book?         │
│  [Find Studios]         │
├─────────────────────────┤
│  [Logo]                 │
│  The fastest way...     │
│                         │
│  For Bookers            │
│  Find Studios           │
│  My Bookings            │
│                         │
│  For Owners             │
│  List Your Studio       │
│                         │
│  © 2024  🔒 Stripe      │
└─────────────────────────┘
```

---

## Key Design Decisions

### 1. Trust Signals
- **Live availability counter** with pulsing dot (creates urgency)
- **Stripe security badge** in footer (payment trust)
- **Social proof stats** (1,240+ studios, 10,000+ bookings)
- **Verification badges** (Secure Payments, Instant Booking, Verified Studios)

### 2. Conversion Optimization
- **Single dominant CTA** in hero ("Search by Date & Time")
- **Secondary CTA** for owners ("List Your Studio")
- **Visual How It Works** with UI preview (makes process tangible)
- **FAQ addresses objections** before they become barriers

### 3. Mobile-First
- **Stacked CTAs** on mobile (full width)
- **Vertical How It Works** steps on mobile
- **Collapsible FAQ** (native details/summary)
- **Touch-friendly buttons** (min 44px height)

### 4. Visual Hierarchy
- **Violet (#7c3aed)** as primary brand color
- **Gradient backgrounds** for visual interest
- **Card-based UI preview** shows actual product
- **Dark owner CTA** creates contrast and draws attention

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#7c3aed` (violet-600) | CTAs, icons, highlights |
| Primary Hover | `#6d28d9` (violet-700) | Button hover states |
| Background | `#ffffff` | Main background |
| Background Alt | `#f9fafb` (gray-50) | Section backgrounds |
| Text Primary | `#111827` (gray-900) | Headlines |
| Text Secondary | `#6b7280` (gray-500) | Body text |
| Accent Dark | `#111827` to `#1f2937` | Owner CTA gradient |

---

## Animation Specifications

| Element | Animation | Duration |
|---------|-----------|----------|
| Pulse dot | opacity pulse | 2s infinite |
| Card hover | shadow + border color | 200ms |
| Button hover | background darken | 150ms |
| Accordion | height expand/collapse | 200ms ease-out |
| Step arrows | opacity fade on mobile | static |

---

## Performance Notes

- **Tailwind CDN** for rapid prototyping (switch to build for production)
- **SVG icons** inline (no external requests)
- **Google Fonts** with display=swap
- **Minimal JavaScript** (native details/summary for FAQ)
- **Responsive images** (unsplash placeholders ready for replacement)
