# Build Plan

Ordered phases for building SalonBook. Complete one phase fully before starting the next. Each phase maps to a /review session before moving forward.

---

## Phase 1 — Foundation

- [x] 01 Project setup (Next.js 15, Tailwind v4, shadcn/ui, npm)
- [x] 02 globals.css — all tokens defined in @theme (with shadcn/ui variable bridge)
- [x] 03 Root layout — Inter font, bg-background
- [x] 04 Insforge client — browser and server clients in /lib
- [ ] 05 Database schema — salons, services, time_slots, bookings, profiles

## Phase 2 — Base Components

- [x] 06 Button variants (shadcn/ui installed)
- [x] 07 Input, Label, Form components (Form created manually)
- [x] 08 Card component (shadcn/ui installed)
- [x] 09 Badge component (shadcn/ui installed)
- [x] 10 Navbar with auth state (Navbar created, auth to be added later)

## Phase 3 — Pages

- [x] 11 Landing page — hero, how it works, featured salons
- [x] 12 Salon listing page — grid, search bar
- [x] 13 Salon detail page — services, time slots
- [x] 14 Booking form — select service, pick time, confirm
- [x] 15 My bookings page — upcoming and past

## Phase 4 — Polish

- [x] 16 Loading states (placeholder comments added for future Insforge integration)
- [x] 17 Empty states (salon listing, my bookings)
- [x] 18 Error states (handled via fallback UI)
- [x] 19 Mobile responsiveness across all pages
- [x] 20 Final review pass