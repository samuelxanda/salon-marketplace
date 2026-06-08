# Architecture

## Stack

- **Frontend:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Backend / Database:** Insforge (auth + database)
- **Language:** TypeScript (strict mode)
- **Deployment:** Vercel

---

## Folder Structure

```
/app
  /page.tsx                  → Landing page
  /salons
    /page.tsx                → Salon listing
    /[id]
      /page.tsx              → Salon detail + booking form
  /bookings
    /page.tsx                → My bookings
  /login
    /page.tsx                → Auth page
  /api                       → Route handlers
  /layout.tsx                → Root layout
  /globals.css               → Tailwind tokens (@theme)

/components
  /ui                        → shadcn primitives
  /layout                    → Navbar, Footer
  /salons                    → SalonCard, SalonList, SearchBar
  /booking                   → BookingForm, TimeSlotPicker, ServiceCard
  /bookings                  → BookingItem, BookingList

/lib
  /insforge-client.ts        → Insforge browser client
  /insforge-server.ts        → Insforge server client
  /utils.ts                  → Shared utilities

/actions
  /bookings.ts               → Server actions for creating bookings

/types
  /index.ts                  → Shared TypeScript types
```

---

## Patterns

- All components are Server Components by default
- Add `"use client"` only for interactivity (forms, state, browser APIs)
- Data fetching happens in Server Components — never in Client Components directly
- All Server Actions live in `/actions/` — never inline in components
- API responses always return `{ success: boolean, data?: T, error?: string }`
- All database access through Insforge client — never raw queries
- Every route handler and server action has try/catch
- Caching is off by default — all data is fresh per request

---

## Database Tables (Insforge)

```
salons
  id, name, description, location, image_url, created_at

services
  id, salon_id, name, duration_minutes, price, created_at

time_slots
  id, salon_id, service_id, datetime, is_available, created_at

bookings
  id, client_id, salon_id, service_id, time_slot_id, status, created_at

profiles
  id, user_id, full_name, phone, created_at
```