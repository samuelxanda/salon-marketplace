"use server";

import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { z } from "zod";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AuthActionResponse = {
  success?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

async function getClient() {
  const cookieStore = await cookies();
  return createServerClient({
    baseUrl: INSFORGE_URL,
    anonKey: ANON_KEY,
    cookies: cookieStore,
  });
}

export async function loginAction(prevState: any, formData: FormData): Promise<AuthActionResponse> {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const client = await getClient();
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errObj = error as any;
      if (errObj?.error === "FORBIDDEN" && errObj?.nextActions?.includes("verify your email")) {
        // Attempt to force confirm if possible
        try {
          const admin = createServerClient({
            baseUrl: INSFORGE_URL,
            anonKey: process.env.INSFORGE_SERVICE_ROLE_KEY || "",
            cookies: await cookies(),
          });
          
          // Note: In a production scenario, you might need to find the user by email first
          // This assumes the admin client can confirm via email directly or you have the ID
          // For now, inform the user clearly
          return { error: "Please verify your email address before logging in." };
        } catch (adminErr) {
          console.error("Admin confirm error:", adminErr);
        }
        return { error: "Please verify your email address before logging in." };
      }
      return { error: "Invalid email or password." };
    }
  } catch (err) {
    console.error("Unexpected login error:", err);
    return { error: "An unexpected error occurred." };
  }

  redirect("/salons");
}

export async function verifyEmailAction(prevState: any, formData: FormData): Promise<AuthActionResponse> {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  if (!email || !code) {
    return { error: "Email and verification code are required." };
  }

  try {
    const client = await getClient();
    const { error } = await client.auth.verifyEmail({
      email,
      otp: code,
    });

    if (error) {
      console.error("Verification error:", error);
      return { error: "Invalid verification code. Please try again." };
    }
  } catch (err) {
    console.error("Unexpected verification error:", err);
    return { error: "An unexpected error occurred." };
  }

  redirect("/salons");
}

export async function signupAction(prevState: any, formData: FormData): Promise<AuthActionResponse> {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = SignupSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const client = await getClient();
    const { error } = await client.auth.signUp({
      email,
      password,
      name,
    });

    if (error) {
      console.error("Sign up error:", error);
      const errObj = error as any;
      if (errObj?.error === "AUTH_EMAIL_EXISTS" || errObj?.code === "user_already_exists") {
        return { error: "An account with this email already exists." };
      }
      return { error: "Could not create account. Please try again." };
    }
    
  } catch (err) {
    console.error("Unexpected signup error:", err);
    return { error: "An unexpected error occurred." };
  }

  // Redirect to verification page
  redirect(`/verify-email?email=${encodeURIComponent(email)}`);
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
