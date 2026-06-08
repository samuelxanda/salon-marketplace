"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { AuthAlert, FieldError } from "@/components/auth/AuthFeedback";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex flex-col min-h-full bg-background">
      <section className="max-w-md mx-auto px-6 md:px-8 py-12 w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Welcome to SalonBook
          </h1>
          <p className="text-text-secondary">Sign in to book appointments</p>
        </div>

        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
          <AuthAlert error={state?.error} />
          
          <form action={formAction} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent focus:border-accent disabled:opacity-50"
                disabled={isPending}
              />
              <FieldError message={state?.fieldErrors?.email?.[0]} />
            </div>

            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent focus:border-accent disabled:opacity-50"
                disabled={isPending}
              />
              <FieldError message={state?.fieldErrors?.password?.[0]} />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-accent-foreground font-medium hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-accent hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
