# Memory — SalonBook Auth & Booking System

Last updated: 2026-06-08T01:09

## What was built

- `/app/login/page.tsx` — Sign-in form with error display (POST to `/api/auth/login`)
- `/app/signup/page.tsx` — Sign-up form with error display (POST to `/api/auth/signup`)
- `/app/api/auth/login/route.ts` — Auth sign-in with cookie storage, redirects with error params
- `/app/api/auth/signup/route.ts` — Auth sign-up with auto sign-in, `autoConfirm: true`
- `/app/api/auth/logout/route.ts` — Sign-out with cookie deletion
- `/app/api/bookings/route.ts` — Creates booking records in InsForge database
- `/components/booking/BookingForm.tsx` — Client form component (service + time selection)
- `/components/layout/Navbar.tsx` — Auth-aware navbar (shows user email + signout when logged in)
- `/lib/session.ts` — Server-side session helper using `createServerClient`
- `/app/bookings/page.tsx` — Protected route (shows sign-in prompt when unauthenticated)
- `scripts/seed.js` — Working seed script for salons/services/time_slots

## Decisions made

- Next.js route handlers (not Server Actions) for auth endpoints
- `cookies().set()` directly for session persistence (avoided `setAuthCookies` type issues)
- Form-based POST submission for bookings with redirect flow
- Navbar as Server Component with async session check
- Error display using `bg-error-lightest` background for visibility
- `autoConfirm: true` on signUp to skip email verification

## Problems solved

- `setAuthCookies` type mismatch with Response headers — used `cookies().set()` directly
- Error handling now redirects to login/signup with user-friendly messages
- Seed script now works with `node scripts/seed.js` command

## Current state

- Build passes ✓
- Lint passes ✓
- Dev server running on http://localhost:3000
- 6 salons seeded with services and time slots
- Auth flow fully wired (sign up → sign in → book → view bookings → sign out)
- Booking form shows services and time slots correctly
- `/bookings` page protected and requires authentication

## Next session starts with

Verify end-to-end auth flow:
1. Visit http://localhost:3000/signup
2. Sign up with a new email
3. Should redirect to `/salons` and show signed-in state in navbar
4. Click a salon → select service → select time → confirm booking
5. Visit `/bookings` → should show confirmation
6. Click Sign Out → session should clear