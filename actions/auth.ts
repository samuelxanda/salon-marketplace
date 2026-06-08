"use server";

import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";

async function getClient() {
  const cookieStore = await cookies();
  return createServerClient({
    baseUrl: INSFORGE_URL,
    anonKey: ANON_KEY,
    cookies: cookieStore,
  });
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const client = await getClient();
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      return { error: "Invalid email or password." };
    }
  } catch (err) {
    console.error("Unexpected login error:", err);
    return { error: "An unexpected error occurred." };
  }

  redirect("/salons");
}

export async function signupAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "All fields are required." };
  }

  try {
    const client = await getClient();
    const { data, error } = await client.auth.signUp({
      email,
      password,
      name,
      autoConfirm: true,
    });

    if (error) {
      console.error("Sign up error:", error);
      const errObj = error as any;
      if (errObj?.error === "AUTH_EMAIL_EXISTS" || errObj?.code === "user_already_exists") {
        return { error: "An account with this email already exists." };
      }
      return { error: "Could not create account. Please try again." };
    }

    // Attempt auto-login
    await new Promise((resolve) => setTimeout(resolve, 800));
    await client.auth.signInWithPassword({ email, password });

  } catch (err) {
    console.error("Unexpected signup error:", err);
    return { error: "An unexpected error occurred." };
  }

  redirect("/salons");
}

export async function logoutAction() {
  try {
    const client = await getClient();
    await client.auth.signOut();
  } catch (err) {
    console.error("Logout error:", err);
  }
  redirect("/");
}
