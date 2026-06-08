import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/actions/auth";

export const dynamic = 'force-dynamic';

export async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className="h-16 bg-surface border-b border-border px-6 md:px-8">
      <nav className="h-full max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-text-primary">
          SalonBook
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/salons"
            className="text-sm font-medium text-text-dark hover:text-accent transition-colors"
          >
            Find Salons
          </Link>
          {user && (
            <Link
              href="/bookings"
              className="text-sm font-medium text-text-dark hover:text-accent transition-colors"
            >
              My Bookings
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-secondary">
                {user.email}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-primary hover:bg-accent-muted transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary hover:bg-accent-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent-dark transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
