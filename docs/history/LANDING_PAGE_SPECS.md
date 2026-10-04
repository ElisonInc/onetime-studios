# OneTime Studios - Landing Page Specifications

## Live Preview
**🔗 https://txuyqgq3lyf2u.ok.kimi.link**

---

## A) Updated Page Copy

### Hero Section
**Headline:** Book studio space in **under 2 minutes**

**Subheadline:** Real availability. Instant confirmation. No back-and-forth.

**Primary CTA:** 🔍 Search by date & time

**Secondary CTA:** ➕ List your studio

**Micro-proof strip:**
- ✓ Instant confirmation
- ✓ No back-and-forth
- ✓ Secure payment hold

**Live indicator:** 🟢 1,240 studios available now

---

### Live Search Simulation
**Fields with sample values:**
- **Location:** Los Angeles, CA
- **Date:** Today
- **Time:** 2:00 PM
- **Session Type:** Recording

**Results preview:** Showing 24 studios near Los Angeles | Sort by: Availability

---

### Featured Studios

| Studio | Location | Price | Rating |
|--------|----------|-------|--------|
| Echo Chamber Studios | Downtown Los Angeles | $65/hr | 4.9★ |
| Golden Hour Studio | Hollywood, CA | $85/hr | 4.8★ |
| Soundcheck Room B | Silver Lake, CA | $45/hr | New |

**Availability Preview (Golden Hour Studio):**
- Available today: 2:00 PM, 4:00 PM, 7:00 PM

---

### How It Works
**3-step flow:**
1. 🔍 Search
2. 📅 Pick a time
3. ✓ Confirm instantly

---

### Trust Layer
**Why artists trust OTS:**
- **Real-time availability** — What you see is what you get. No surprises.
- **Instant booking** — Book in under 2 minutes. Confirmed immediately.
- **Payments held securely** — Your money is safe until your session completes.

---

### Soft Social Proof
> Studios in major creative hubs • Built for artists & creators

---

### Owner Value
**Headline:** Turn unused studio time into revenue

**Body:** We handle scheduling, bookings, and payments. You focus on creating.

**CTA:** List your studio →

**Stats:** $0 to list | 10% fee

---

### FAQ

**Q1: How does payment work?**
> Your payment is securely held by Stripe until your session completes. The studio owner receives payment only after your booking is fulfilled.

**Q2: Can I cancel?**
> Yes. Free cancellation up to 24 hours before your session. Cancellations within 24 hours receive a 50% refund.

**Q3: Is availability real-time?**
> Yes. When you see a time slot, it's actually available. Our system syncs directly with studio calendars to prevent double-booking.

**Q4: What types of spaces are listed?**
> Recording studios, photo studios, rehearsal spaces, video/film studios, podcast rooms, and creative workspaces. Each listing includes equipment details and photos.

---

## B) Component Structure

```
LandingPage
├── Navigation (sticky, z-50)
│   ├── Logo + Brand
│   └── Nav Links (Find Studios, List Your Studio)
│
├── HeroSection
│   ├── LiveIndicator (pulse dot + count)
│   ├── Headline (H1)
│   ├── Subheadline
│   ├── CTAButtons (primary + secondary)
│   └── MicroProofStrip (3 items)
│
├── LiveSearchSection
│   ├── SearchInterface (4 fields in grid)
│   │   ├── LocationInput
│   │   ├── DateInput
│   │   ├── TimeInput
│   │   └── SessionTypeInput
│   ├── SearchButton
│   └── ResultsPreview (count + sort)
│
├── FeaturedStudiosSection
│   └── StudiosGrid (3 cards)
│       ├── StudioCard (image, location, price, rating)
│       └── StudioCardWithAvailability ( Golden Hour)
│           └── TimeSlotButtons (2:00 PM, 4:00 PM, 7:00 PM)
│
├── HowItWorksSection (border-y)
│   └── StepsRow (3 steps with arrows)
│
├── TrustLayerSection
│   └── TrustCards (3 items in grid)
│
├── SocialProofStrip (border-y, gray bg)
│
├── OwnerValueSection
│   └── OwnerCTACard (dark bg)
│       ├── Badge
│       ├── Headline
│       ├── Body
│       ├── CTAButton
│       └── Stats (2 items)
│
├── FAQSection
│   └── Accordion (4 items)
│
└── Footer
    ├── Logo
    └── Copyright + Security Badge
```

---

## C) Layout Order (Top to Bottom)

### Desktop (≥768px)
```
┌─────────────────────────────────────────┐
│ NAVIGATION (sticky)                     │
│ [Logo]              [Find] [List]       │
├─────────────────────────────────────────┤
│ HERO                                    │
│                                         │
│  🟢 1,240 studios available             │
│                                         │
│  Book studio space in under 2 minutes   │
│                                         │
│  [Search by date & time]                │
│  [List your studio]                     │
│                                         │
│  ✓ Instant  ✓ No back-and-forth         │
│  ✓ Secure payment                       │
├─────────────────────────────────────────┤
│ LIVE SEARCH                             │
│                                         │
│  [Location] [Date] [Time] [Type]        │
│                                         │
│  [Search Studios]                       │
│                                         │
│  Showing 24 studios near Los Angeles    │
├─────────────────────────────────────────┤
│ FEATURED STUDIOS (3 columns)            │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Echo    │ │ Golden  │ │ Sound-  │   │
│  │ Chamber │ │ Hour    │ │ check   │   │
│  │ $65/hr  │ │ $85/hr  │ │ $45/hr  │   │
│  │ 4.9★    │ │ 4.8★    │ │ New     │   │
│  │         │ │ [2PM]   │ │         │   │
│  │         │ │ [4PM]   │ │         │   │
│  │         │ │ [7PM]   │ │         │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│ HOW IT WORKS                            │
│                                         │
│  [🔍] Search → [📅] Pick → [✓] Confirm │
├─────────────────────────────────────────┤
│ TRUST LAYER (3 columns)                 │
│                                         │
│  Real-time    Instant    Payments       │
│  availability booking    held securely  │
├─────────────────────────────────────────┤
│ SOCIAL PROOF STRIP                      │
│  Studios in major hubs • Built for artists
├─────────────────────────────────────────┤
│ OWNER VALUE                             │
│  ┌─────────────────────────────────┐    │
│  │ Turn unused time into revenue   │    │
│  │ [List your studio]    $0  10%   │    │
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│ FAQ (accordion)                         │
│  ▼ How does payment work?               │
│  ▼ Can I cancel?                        │
│  ▼ Is availability real-time?           │
│  ▼ What types of spaces?                │
├─────────────────────────────────────────┤
│ FOOTER                                  │
│  [Logo]              © 2024  🔒 Stripe  │
└─────────────────────────────────────────┘
```

### Mobile (<768px)
```
┌─────────────────────────┐
│ NAVIGATION              │
│ [Logo]           [List] │
├─────────────────────────┤
│ HERO                    │
│                         │
│  🟢 1,240 available     │
│                         │
│  Book studio space      │
│  in under 2 minutes     │
│                         │
│  [Search by date]       │
│  [List your studio]     │
│                         │
│  ✓ Instant              │
│  ✓ No back-and-forth    │
│  ✓ Secure payment       │
├─────────────────────────┤
│ LIVE SEARCH             │
│                         │
│  [Location    ]         │
│  [Date  ] [Time ]       │
│  [Session Type]         │
│                         │
│  [Search Studios]       │
│                         │
│  24 studios found       │
├─────────────────────────┤
│ FEATURED STUDIOS        │
│                         │
│  ┌─────────────────┐    │
│  │ Echo Chamber    │    │
│  │ $65/hr  4.9★    │    │
│  └─────────────────┘    │
│  ┌─────────────────┐    │
│  │ Golden Hour     │    │
│  │ $85/hr  4.8★    │    │
│  │                 │    │
│  │ Available:      │    │
│  │ [2PM] [4PM] [7PM]   │
│  └─────────────────┘    │
│  ┌─────────────────┐    │
│  │ Soundcheck      │    │
│  │ $45/hr  New     │    │
│  └─────────────────┘    │
├─────────────────────────┤
│ HOW IT WORKS            │
│                         │
│  [🔍] Search            │
│  [📅] Pick a time       │
│  [✓] Confirm instantly  │
├─────────────────────────┤
│ TRUST LAYER             │
│  Real-time availability │
│  Instant booking        │
│  Payments held securely │
├─────────────────────────┤
│ SOCIAL PROOF            │
│  Studios in major hubs  │
├─────────────────────────┤
│ OWNER VALUE             │
│  Turn unused time...    │
│  [List your studio]     │
├─────────────────────────┤
│ FAQ                     │
│  ▼ How does payment...  │
│  ▼ Can I cancel?        │
│  ▼ Is availability...   │
│  ▼ What types...        │
├─────────────────────────┤
│ FOOTER                  │
│  [Logo]  © 2024  🔒     │
└─────────────────────────┘
```

---

## D) Interaction Notes

### Hover States
| Element | Hover Effect |
|---------|--------------|
| Studio cards | translateY(-4px), shadow increase |
| Time slot buttons | border color change, slight lift |
| CTAs | background darken |
| Nav links | color change |

### Tap States
| Element | Active Effect |
|---------|---------------|
| All buttons | scale(0.98) |
| Time slots | background fill, text white |

### Selectable Time Slots
- Click to select
- Selected state: violet background, white text
- Only one selectable at a time per card

### Expandable "View Availability"
- Currently shows inline for Golden Hour Studio
- Other studios have "View availability →" link

### Loading Shimmer
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```
Applied to: placeholder content areas

### Active Search State
- Search button has press effect
- Fields have focus ring on click (simulated)

---

## E) Mobile Adjustments

### Search Interface
- **Grid:** 2 columns on mobile (Location spans 2, others 1 each)
- **Full-width button:** Search button spans full width
- **Stacked layout:** Fields stack cleanly

### Studio Cards
- **Single column:** Full width cards
- **Time slots:** Wrap to multiple rows if needed
- **Touch targets:** Minimum 44px for buttons

### How It Works
- **Vertical stack:** Steps stack with down arrows
- **Hidden horizontal arrows:** Only show on desktop

### Navigation
- **Simplified:** Only essential links
- **Sticky:** Remains fixed at top

### CTA Accessibility
- **Hero CTAs:** Full width, stacked
- **Owner CTA:** Maintains visibility
- **Footer:** Compact, essential info only

### Typography Scaling
- **Headlines:** 3xl → 2xl on mobile
- **Body:** Base size maintained
- **Spacing:** Reduced padding (py-8 → py-6)

---

## CSS Classes Reference

### Animation Classes
| Class | Effect |
|-------|--------|
| `.pulse-dot` | Pulsing green indicator |
| `.shimmer` | Loading placeholder animation |
| `.time-slot` | Hover lift + selection state |
| `.studio-card` | Hover lift shadow |
| `.btn-press` | Active press scale |

### Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#7c3aed` | CTAs, icons, accents |
| Primary hover | `#6d28d9` | Button hover |
| Success | `#10b981` | Checkmarks, live indicator |
| Background | `#f9fafb` | Section backgrounds |
| Card | `#ffffff` | Cards, inputs |

---

## Perception Checklist

| Goal | Implementation |
|------|----------------|
| ✅ Operational | Live search interface with pre-filled values |
| ✅ Interactive | Clickable time slots, hover states, expandable FAQ |
| ✅ Credible | Trust layer, Stripe badge, real-time indicator |
| ✅ Usable | Clear CTAs, logical flow, mobile-optimized |
| ❌ NOT Conceptual | No "coming soon" or placeholder text |
| ❌ NOT Static | Animations, interactions, state changes |
