# Memory — SalonBook Complete

Last updated: Sun Jun 07 2026 23:03:22 +02:00

## What was built

**Frontend Foundation:**
- app/layout.tsx — Inter font, Navbar integration, bg-background
- app/page.tsx — Landing page with hero, how-it-works (3 steps), featured salons
- app/salons/page.tsx — Salon listing with search input
- app/salons/[id]/page.tsx — Salon detail with services and booking form
- app/bookings/page.tsx — My bookings with upcoming/past sections

**Components:**
- components/layout/Navbar.tsx — Server component with logo, nav links, sign-in button
- components/salons/SalonCard.tsx — Reusable card with image, name, location, description
- components/booking/BookingForm.tsx — Client form for service/time selection
- components/ui/button.tsx, card.tsx, input.tsx, label.tsx, badge.tsx — shadcn/ui
- components/ui/form.tsx — Manual react-hook-form wrapper (FormItem, FormLabel, FormControl, FormMessage)

**Backend Integration:**
- lib/insforge-client.ts — createBrowserClient with anonKey
- lib/insforge-server.ts — createAdminClient with apiKey
- lib/data-fetching.ts — getSalons(), getServices(), getTimeSlots(), getBookings()
- Database tables: salons (6 records), services, time_slots, bookings, profiles

## Decisions made

- npm over pnpm (pnpm not available)
- Used createAdminClient for server queries (apiKey)
- Used createBrowserClient for client queries (anonKey)
- All pages as Server Components except BookingForm (needs state)
- Mock data removed — all queries go to InsForge
- Inline-styled anchors for navbar instead of Button (asChild issue)

## Problems solved

- apiKey param error → switched to createAdminClient
- Missing --card CSS variable → added to @theme block
- asChild not available on shadcn Button → inline styling
- Image remotePatterns → added Unsplash to next.config.ts
- Duplicate export in app/page.tsx → fixed

## Current state

- Build: passing
- Lint: passing
- Database: 6 salons seeded, services/time_slots tables empty
- Auth: not implemented (bookings uses mock data)

## Next session starts with

Add services to each salon in InsForge database via CLI. Then add time slots. Consider auth flow implementation for bookings.

## Open questions

- Who creates time slots? (salon owners out of scope, auto-generated?)