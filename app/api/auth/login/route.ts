import { insforgeAdmin } from "@/lib/insforge-server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login?error=missing_fields" },
    });
  }

  try {
    const { data, error } = await insforgeAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data) {
      console.error("Login error:", error);
      return new Response(null, {
        status: 302,
        headers: { Location: "/login?error=invalid_credentials" },
      });
    }

    const cookieStore = await cookies();
    cookieStore.set("insforge-access-token", data.accessToken, {
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
      headers: { Location: "/login?error=unexpected" },
    });
  }
}