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

    // Explicitly confirm the user since autoConfirm might not be enough for immediate sign-in in some configs
    const userId = (data as any).user?.id || (data as any).id;
    if (userId) {
      await insforgeAdmin.auth.admin.updateUserById(userId, {
        email_confirm: true,
      });
    }

    // If signUp returns a session immediately, use it
    let accessToken = (data as any).accessToken;

    if (!accessToken) {
      // Small delay to allow auth database to sync
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Fallback: Sign in manually
      const { data: sessionData, error: sessionError } = await insforgeAdmin.auth.signInWithPassword({
        email,
        password,
      });

      if (sessionError || !sessionData) {
        console.error("Auto sign-in failed after signup:", sessionError);
        const errObj = sessionError as any;
        if (errObj?.nextActions?.includes("verify your email") || errObj?.error === "FORBIDDEN") {
          return new Response(null, {
            status: 302,
            headers: { Location: "/signup?error=verification_required" },
          });
        }
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