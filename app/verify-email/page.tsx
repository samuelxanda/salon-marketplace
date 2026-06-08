"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmailAction } from "@/actions/auth";
import { AuthAlert, FieldError } from "@/components/auth/AuthFeedback";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [state, formAction, isPending] = useActionState(verifyEmailAction, null);

  return (
    <div className="flex flex-col min-h-full bg-background">
      <section className="max-w-md mx-auto px-6 md:px-8 py-12 w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Verify your email
          </h1>
          <p className="text-text-secondary">
            We sent a verification code to <strong>{email}</strong>
          </p>
        </div>

        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
          <AuthAlert error={state?.error} />
          
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="email" value={email} />
            
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Verification Code
              </label>
              <input
                type="text"
                name="code"
                required
                placeholder="123456"
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent focus:border-accent disabled:opacity-50 tracking-widest text-center"
                disabled={isPending}
              />
              <FieldError message={state?.fieldErrors?.code?.[0]} />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-accent-foreground font-medium hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Verifying..." : "Verify Account"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
