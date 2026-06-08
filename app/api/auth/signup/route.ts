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
      return new Response(null, {
        status: 302,
        headers: { Location: "/signup?error=unexpected" },
      });
    }

    const { data: sessionData, error: sessionError } = await insforgeAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (sessionError || !sessionData) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/signup?error=confirm_signin_failed" },
      });
    }

    const cookieStore = await cookies();
    cookieStore.set("insforge_access_token", sessionData.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
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