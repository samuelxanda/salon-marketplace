# UI Tokens

Design tokens for SalonBook. All colors, typography, spacing, and component values defined here. Use these exact values throughout the codebase — never hardcode colors or use raw Tailwind color classes.

---

## How to Use

This project uses Tailwind CSS v4. All tokens are defined using `@theme` in `app/globals.css`.

Tailwind v4 auto-generates utility classes from `@theme` variables:
- `--color-accent` → `bg-accent`, `text-accent`, `border-accent`
- `--color-surface` → `bg-surface`

```tsx
// Correct
className="bg-surface text-text-primary border-border"

// Never — hardcoded hex
className="bg-[#F6F7FB]"

// Never — raw Tailwind colors
className="bg-purple-500 text-gray-600"
```

---

## globals.css — Complete Token Definition

```css
@import "tailwindcss";

@theme {
  /* Font */
  --font-sans: "Inter", sans-serif;

  /* Backgrounds */
  --color-background: #F6F7FB;
  --color-surface: #FFFFFF;
  --color-surface-secondary: #F9FAFB;

  /* Borders */
  --color-border: #E7EAF3;
  --color-border-light: #E5E7EB;

  /* Text */
  --color-text-primary: #101828;
  --color-text-secondary: #6A7282;
  --color-text-muted: #99A1AF;
  --color-text-dark: #364153;

  /* Accent — primary brand color */
  --color-accent: #7C5CFC;
  --color-accent-dark: #5E4CFF;
  --color-accent-light: #F3E8FF;
  --color-accent-muted: #FAF5FF;
  --color-accent-foreground: #FFFFFF;

  /* Success */
  --color-success: #10B981;
  --color-success-light: #D0FAE5;
  --color-success-lightest: #ECFDF5;
  --color-success-foreground: #007A55;

  /* Warning */
  --color-warning: #FF8904;
  --color-warning-foreground: #FFFFFF;

  /* Error */
  --color-error: #EF4444;
  --color-error-foreground: #FFFFFF;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

---

## Color Usage Guide

### Page Layout

| Element         | Token                  |
|-----------------|------------------------|
| Page background | `bg-background`        |
| Card / surface  | `bg-surface`           |
| Default border  | `border-border`        |

### Typography

| Element          | Token                           |
|------------------|---------------------------------|
| Headings         | `text-text-primary` (#101828)   |
| Secondary text   | `text-text-secondary` (#6A7282) |
| Muted / labels   | `text-text-muted` (#99A1AF)     |

### Accent (Primary Purple)

Used for: primary buttons, active states, highlights, focus rings.

| Element           | Token                    |
|-------------------|--------------------------|
| Button background | `bg-accent`              |
| Button text       | `text-accent-foreground` |
| Light background  | `bg-accent-light`        |
| Subtle background | `bg-accent-muted`        |

### Status Colors

| Status    | Background             | Text                      |
|-----------|------------------------|---------------------------|
| Confirmed | `bg-success-lightest`  | `text-success-foreground` |
| Pending   | `bg-accent-muted`      | `text-accent`             |
| Cancelled | `bg-surface-secondary` | `text-text-muted`         |

---

## Typography

| Element         | Size  | Weight | Color token           |
|-----------------|-------|--------|-----------------------|
| Page title      | 24px  | 700    | `text-text-primary`   |
| Section heading | 16px  | 600    | `text-text-primary`   |
| Body text       | 14px  | 500    | `text-text-primary`   |
| Secondary text  | 14px  | 400    | `text-text-secondary` |
| Muted / labels  | 12px  | 400    | `text-text-muted`     |

Font: **Inter** — always import via `next/font/google`.

---

## Spacing

| Token       | Value | Usage                  |
|-------------|-------|------------------------|
| `gap-2`     | 8px   | Badge and tag gaps     |
| `gap-4`     | 16px  | Internal section gaps  |
| `gap-6`     | 24px  | Between sections       |
| `p-4`       | 16px  | Card padding (small)   |
| `p-6`       | 24px  | Card padding (large)   |
| `px-4 py-2` | —     | Button padding         |

---

## Component Tokens

### Cards
```
background: bg-surface
border: 1px solid border-border
border-radius: 16px (rounded-2xl)
padding: 24px (p-6)
box-shadow: 0px 1px 3px rgba(0,0,0,0.1)
```

### Buttons

**Primary:**
```
background: bg-accent
text: text-accent-foreground
border-radius: rounded-md
padding: px-4 py-2
font-weight: font-medium
font-size: 14px
```

**Secondary:**
```
background: bg-surface
border: 1px solid border-border
text: text-text-primary
border-radius: rounded-md
padding: px-4 py-2
```

### Input Fields
```
background: bg-surface
border: 1px solid border-border
border-radius: rounded-md
padding: px-3 py-2
font-size: 14px
text: text-text-primary
placeholder: text-text-muted
focus: ring-1 ring-accent border-accent
```

### Badges
```
border-radius: rounded-full
padding: px-2 py-0.5
font-size: 12px
font-weight: 500
```

---

## Invariants

- Never use hex values directly in components — always CSS variables via tokens
- Never use raw Tailwind color classes like `bg-purple-500`
- Font is always Inter — never system fonts
- All borders use `border-border` — never `border-gray-*`
- `--color-accent` (#7C5CFC) is the only purple — never Tailwind's built-in purple scale