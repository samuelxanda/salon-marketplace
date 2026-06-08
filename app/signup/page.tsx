import Link from "next/link";

type SignupPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const error = params.error;

  const errorMessages: Record<string, string> = {
    missing_fields: "Email and password are required.",
    confirm_signin_failed: "Account created but could not sign in automatically. Try signing in.",
    user_exists: "An account with this email already exists.",
    auth_required: "Please sign in to book an appointment.",
    unexpected: "Something went wrong. Please try again.",
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <section className="max-w-md mx-auto px-6 md:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Create your account
          </h1>
          <p className="text-text-secondary">Join SalonBook to book appointments</p>
        </div>

        {error && (
          <div className="border border-error rounded-md p-4 mb-6 bg-error-lightest">
            <p className="text-sm text-error">{errorMessages[error] || "An error occurred."}</p>
          </div>
        )}

        <div className="bg-surface rounded-xl border border-border p-6">
          <form method="POST" action="/api/auth/signup" className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Jane Doe"
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent focus:border-accent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text-primary mb-1 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Create a password"
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent focus:border-accent"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-accent-foreground font-medium hover:bg-accent-dark transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}