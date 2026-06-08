# UI Registry

Living document. Updated after every component is built using /imprint. Read this before building any new component — match existing patterns before inventing new ones.

---

## How to Use

Before building any component:
1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build following ui-rules.md and ui-tokens.md, then add it here

---

## Components

### SalonCard

File: `components/salons/SalonCard.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-surface                   |
| Border           | border border-border         |
| Border radius    | rounded-2xl                  |
| Text — primary   | text-lg font-semibold text-text-primary |
| Text — secondary | text-sm text-text-muted      |
| Text — tertiary  | text-sm text-text-secondary  |
| Spacing          | p-6 (inner), h-48 (image)   |
| Hover state      | hover:shadow-md transition-shadow |
| Shadow           | none (subtle shadow on hover)|
| Accent usage     | text-accent, bg-accent-light |

**Pattern notes:**
- Card container uses `overflow-hidden` to clip image corners
- Badge uses `rounded-full` with `bg-accent-muted text-accent`
- Image fallback uses `bg-accent-light` with centered text

---

### BookingForm

File: `components/booking/BookingForm.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-surface                   |
| Border           | border border-border         |
| Border radius    | rounded-2xl (outer), rounded-md (inputs) |
| Text — primary   | text-xl font-semibold text-text-primary |
| Text — secondary | text-sm text-text-secondary  |
| Text — label     | text-sm font-medium text-text-primary |
| Spacing          | p-6, mb-4 for sections       |
| Hover state      | hover:bg-accent-dark         |
| Shadow           | none                         |
| Accent usage     | bg-accent, text-accent-foreground, bg-accent-muted |

**Pattern notes:**
- Buttons use `rounded-md` with `transition-colors`
- Selected time slot: `bg-accent text-accent-foreground`
- Unselected time slot: `bg-surface border border-border hover:bg-accent-muted`

---

### BookingCard (inline in bookings page)

File: `app/bookings/page.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-surface                   |
| Border           | border border-border         |
| Border radius    | rounded-xl                   |
| Text — primary   | font-semibold text-text-primary |
| Text — secondary | text-sm text-text-muted      |
| Text — meta      | text-sm text-text-secondary  |
| Spacing          | p-6, mb-4 (header), gap-4 (meta) |

**Pattern notes:**
- Status badges: `rounded-full px-2 py-0.5 text-xs font-medium`
- Past bookings add `opacity-75` for visual distinction

---

### FormInput (inline in login page)

File: `app/login/page.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-surface                   |
| Border           | border border-border           |
| Border radius    | rounded-md                   |
| Text — primary   | text-sm font-medium text-text-primary (labels) |
| Text — placeholder | placeholder:text-text-muted |
| Spacing          | px-3 py-2                    |
| Focus state      | focus:ring-1 focus:ring-accent focus:border-accent |
| Width            | w-full (form), md:w-96 (search) |

**Pattern notes:**
- Inputs have `transition-colors` implicitly via Tailwind base
- Form labels use `block` to break properly

---

### FormContainer

File: `app/login/page.tsx`, `app/signup/page.tsx`
Last updated: 2026-06-08

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-surface                   |
| Border           | border border-border           |
| Border radius    | rounded-xl                   |
| Spacing          | p-6                          |

**Pattern notes:**
- Shared with both login and signup pages
- Uses `space-y-4` for form field spacing

---

### PageHeader

File: `app/page.tsx`, `app/salons/page.tsx`, `app/bookings/page.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Text — hero      | text-2xl md:text-3xl font-bold text-text-primary |
| Text — page title| text-xl font-semibold text-text-primary |
| Text — section   | text-xl font-semibold text-text-primary |
| Text — body      | text-base text-text-secondary  |
| Text — caption   | text-sm text-text-secondary    |
| Text — muted     | text-sm text-text-muted        |

---

### Button Primary

File: Multiple
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-accent                    |
| Text             | text-accent-foreground       |
| Border radius    | rounded-md                   |
| Spacing          | px-4 py-2 (small), px-6 py-3 (large) |
| Weight           | font-medium                  |
| Hover state      | hover:bg-accent-dark transition-colors |

---

### Button Secondary

File: `app/page.tsx`, `app/bookings/page.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-surface                   |
| Border           | border border-border           |
| Text             | text-text-primary            |
| Border radius    | rounded-md                   |
| Spacing          | px-6 py-2                    |
| Hover state      | hover:bg-accent-muted transition-colors |

---

### Navbar

File: `components/layout/Navbar.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-surface                   |
| Border           | border-b border-border         |
| Height           | h-16                         |
| Typography       | text-xl font-semibold text-text-primary |
| Link text        | text-sm font-medium text-text-dark hover:text-accent |
| Spacing          | px-6 md:px-8, gap-6 (nav), gap-4 (actions) |

---

### HeroSection

File: `app/page.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Container        | max-w-3xl mx-auto text-center |
| Text — heading   | text-2xl md:text-3xl font-bold text-text-primary mb-4 |
| Text — body      | text-base text-text-secondary mb-8 |
| Spacing          | py-12 md:py-16               |

---

### HowItWorksItem

File: `app/page.tsx`
Last updated: 2026-06-07

| Property         | Class                        |
| ---------------- | ---------------------------- |
| Background       | bg-surface                   |
| Border           | border border-border         |
| Border radius    | rounded-2xl                  |
| Icon wrapper     | w-12 h-12 bg-accent-light rounded-full |
| Text — heading   | font-semibold text-text-primary mb-2 |
| Text — body      | text-sm text-text-secondary    |
| Spacing          | p-6, mb-4 (icon)           |

**Pattern notes:**
- Icon wrapper uses flex centering
- Grid layout: `md:grid-cols-3 gap-6`