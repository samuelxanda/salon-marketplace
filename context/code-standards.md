# Code Standards

Rules the AI agent must follow in every session without exception. These prevent pattern drift across sessions.

---

## Engineering Mindset

- **Read context files first** — never assume, always verify against architecture.md and project-overview.md
- **Scope is sacred** — only build what the current feature requires
- **Think before implementing** — understand what is being built and why
- **Clean over clever** — simple readable code always preferred
- **One thing at a time** — complete one feature fully before touching the next
- **Every feature must be testable** — if it cannot be verified after implementation, it is incomplete

---

## TypeScript

- Strict mode enabled — no exceptions
- Never use `any` — use `unknown` and narrow the type
- All function parameters and return types must be explicitly typed
- Use `type` for object shapes and unions
- Use `interface` only for extendable component props
- All async functions must have proper error handling
- Use `const` by default — only `let` when reassignment is necessary

---

## Next.js 15 Conventions

- App Router only
- All components are Server Components by default
- Add `"use client"` only when component requires: useState, useEffect, browser APIs, event listeners
- Never add `"use client"` to layout files
- Data fetching in Server Components only
- Route handlers in `app/api/` — no business logic directly in handlers
- Server Actions in `actions/` — never inline in components

---

## File and Folder Naming

- Folders: kebab-case — `salon-detail`, `time-slot-picker`
- Component files: PascalCase — `SalonCard.tsx`, `BookingForm.tsx`
- Utility files: camelCase — `insforge-client.ts`
- Type files: camelCase — `index.ts`
- API route files: always `route.ts`
- One component per file — never export multiple components from one file

---

## Component Structure

```typescript
"use client"; // only if needed

// 1. External imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Internal imports
import { SalonCard } from "@/components/salons/SalonCard";

// 3. Type definitions
type Props = {
  salonId: string;
};

// 4. Component
export function ComponentName({ salonId }: Props) {
  // state
  // derived values
  // handlers
  // return JSX
}
```

- Never use default exports for components — always named exports
- No inline styles — Tailwind only using CSS variables from ui-tokens.md

---

## API Route Handlers

```typescript
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // validate
    // process
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("[route/name]", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

- Every handler has try/catch
- Every handler validates request body before processing
- Always return `{ success: boolean, data?: T, error?: string }`
- Never expose raw error messages to the client

---

## Server Actions

```typescript
"use server";

export async function createBooking(data: BookingData) {
  try {
    // validate
    // write to DB
    revalidatePath("/bookings");
    return { success: true };
  } catch (error) {
    console.error("[actions/bookings]", error);
    return { success: false, error: "Failed to create booking" };
  }
}
```

- Every action has try/catch
- Every action returns `{ success: boolean, error?: string }`
- Always call `revalidatePath` after mutations
- Never throw from Server Actions — always return the error

---

## Error Handling

- Never use empty catch blocks
- Console errors always include context prefix: `[component/function]`
- User-facing errors must be human readable
- Never expose raw Insforge or database errors to the UI

---

## Styling

- Never use raw Tailwind color classes like `bg-purple-500` or `text-gray-600`
- Always use project tokens from ui-tokens.md
- Never hardcode hex values in components
- All tokens defined in `@theme` in globals.css — never in tailwind.config.ts

---

## Import Aliases

Always use `@/` — never relative imports going up more than one level.

```typescript
// Correct
import { Button } from "@/components/ui/button";

// Never
import { Button } from "../../../components/ui/button";
```

---

## Dependencies

Never install a new package without checking:
1. Does shadcn/ui already have this component?
2. Does Next.js already provide this?
3. Is there a simpler native solution?

Approved packages:
- `@insforge/ssr` — Insforge client
- `zod` — schema validation
- `lucide-react` — icons
- `tailwindcss` — styling
- `shadcn/ui` components — UI primitives