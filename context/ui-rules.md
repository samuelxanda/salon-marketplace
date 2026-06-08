# UI Rules

Rules for building SalonBook UI. Follow these in every session — they keep the UI consistent without making decisions inside the code.

---

## Font

Always import Inter via `next/font/google` in the root layout.

```typescript
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
```

Apply the font variable class to the `<html>` tag. Never use system fonts.

---

## Layout

- Page max-width: 1280px, centered
- Page padding: `px-6` on mobile, `px-8` on desktop
- Gap between page sections: `gap-6` (24px)
- Navbar height: 64px, white background, full width

---

## Navbar

- Logo left, nav links center, auth button right
- Active link: `text-accent`, font-weight 500
- Inactive link: `text-text-dark`, font-weight 500
- No underline — color change only for active state
- Always white background

---

## Cards

Every content section lives in a card.

```
background: bg-surface
border: 1px solid border-border
border-radius: 16px (rounded-2xl)
padding: 24px (p-6)
box-shadow: shadow-sm
```

Never use colored card backgrounds. Color goes inside cards via badges and text — never on the card surface.

---

## Typography Hierarchy

Three levels only — never deviate:

**Section headings** — card titles, page titles
```
font-size: 16px
font-weight: 600
color: text-text-primary
```

**Body text** — main content
```
font-size: 14px
font-weight: 500
color: text-text-primary
```

**Muted text** — labels, timestamps, subtitles
```
font-size: 12px
font-weight: 400
color: text-text-muted
```

---

## Buttons

- Primary button: `bg-accent text-accent-foreground rounded-md px-4 py-2`
- Secondary button: `bg-surface border border-border text-text-primary rounded-md px-4 py-2`
- Never mix button styles in the same section — pick one hierarchy and stick to it

---

## Form Inputs

```
bg-surface border border-border rounded-md px-3 py-2
text-text-primary placeholder:text-text-muted
focus:ring-1 focus:ring-accent focus:border-accent
```

Every input must have a visible label above it. Never rely on placeholder as the label.

---

## Badges

```
rounded-full px-2 py-0.5 text-xs font-medium
```

Use for: booking status, service tags, availability. Never use badges for navigation.

---

## Salon Cards (Listing Page)

```
bg-surface rounded-2xl border border-border overflow-hidden
Image top → content bottom
Salon name: 16px font-semibold text-text-primary
Location: 12px text-text-muted
Service count or price range as badge
```

Hover state: `hover:shadow-md transition-shadow`

---

## Empty States

Every section that can be empty must have one:
- Short text in `text-text-muted`
- Optional icon above
- CTA button if there's a logical next action

---

## Do Nots

- Never use raw Tailwind color classes (`bg-purple-500`, `text-gray-600`)
- Never hardcode colors in components
- Never use more than three font sizes in one page
- Never show raw error messages to users
- Never stack more than two levels of border radius inside each other
- Never use gradients on card backgrounds
- Never skip empty states
- Never use placeholder text as a form label