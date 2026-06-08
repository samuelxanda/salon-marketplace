# Progress Tracker

Update after every completed feature. Any AI reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Complete
**Last completed:** InsForge backend integration (tables created, data fetching wired)
**Next:** Seed remaining mock data to InsForge database via script

---

## Progress

### Phase 1 — Foundation
- [x] 01 Project setup (Next.js 15, Tailwind v4, shadcn/ui, npm)
- [x] 02 globals.css — tokens defined in @theme
- [x] 03 Root layout — Inter font, bg-background
- [x] 04 Insforge client — browser and server clients created
- [x] 05 Database schema

### Phase 2 — Base Components
- [x] 06 Button variants
- [x] 07 Input, Label, Form
- [x] 08 Card component
- [x] 09 Badge component
- [x] 10 Navbar

### Phase 3 — Pages
- [x] 11 Landing page
- [x] 12 Salon listing
- [x] 13 Salon detail
- [x] 14 Booking form
- [x] 15 My bookings

### Phase 4 — Polish
- [x] 16 Loading states
- [x] 17 Empty states
- [x] 18 Error states
- [x] 19 Mobile responsiveness
- [x] 20 Final review pass

---

## Decisions Made During Build

_Add decisions here as they are made during /architect sessions._

---

## Decisions Made During Build

- Used npm instead of pnpm (pnpm not available in environment)
- Used `@insforge/sdk` instead of `@insforge/ssr` (correct package name)
- Created CSS variable bridge in globals.css to map custom tokens to shadcn/ui expected variables (`--color-primary`, `--color-secondary`, etc.)
- Used `createBrowserClient` from `@insforge/sdk/ssr` for browser client
- Used `InsForgeClient` directly with `baseUrl` for server client
- Navbar as Server Component without auth state (auth added later)
- Form component created manually (shadcn install failed silently)

---

## Notes

- shadcn/ui components use `@base-ui/react` primitives
- Button component doesn't support `asChild` prop - used inline styling for links
- SalonCard created for featured salons display

- shadcn/ui components use `@base-ui/react` primitives
- Form component requires react-hook-form and @hookform/resolvers - may need manual setup
- Card and Badge components are installed; Form component may need react-hook-form