import { insforgeAdmin } from "@/lib/insforge-server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/signup?error=missing_fields" },
    });
  }

  try {
    const { data, error } = await insforgeAdmin.auth.signUp({
      email,
      password,
      name: name || email,
      autoConfirm: true,
    });

    if (error || !data) {
      console.error("Sign up error:", error);
      const errObj = error as any;
      if (errObj?.error === "AUTH_EMAIL_EXISTS" || errObj?.code === "user_already_exists") {
        return new Response(null, {
          status: 302,
          headers: { Location: "/signup?error=user_exists" },
        });
      }
      return new Response(null, {
        status: 302,
        headers: { Location: "/signup?error=unexpected" },
      });
    }

    // If signUp returns a session immediately, use it
    let accessToken = (data as any).accessToken;

    if (!accessToken) {
      // Small delay to allow auth database to sync if needed
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Fallback: Sign in manually if token wasn't returned in signUp
      const { data: sessionData, error: sessionError } = await insforgeAdmin.auth.signInWithPassword({
        email,
        password,
      });

      if (sessionError || !sessionData) {
        console.error("Auto sign-in failed after signup:", sessionError);
        return new Response(null, {
          status: 302,
          headers: { Location: "/signup?error=confirm_signin_failed" },
        });
      }
      accessToken = sessionData.accessToken;
    }

    const cookieStore = await cookies();
    cookieStore.set("insforge-access-token", accessToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return new Response(null, {
      status: 302,
      headers: { Location: "/salons" },
    });
  } catch {
    return new Response(null, {
      status: 302,
      headers: { Location: "/signup?error=unexpected" },
    });
  }
}