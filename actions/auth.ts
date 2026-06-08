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
      console.error("Login error:", error);
      return { error: "Invalid email or password." };
    }
    
    // We don't return success string here because redirect happens immediately
  } catch (err) {
    console.error("Unexpected login error:", err);
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
    const { data: signUpData, error } = await client.auth.signUp({
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

    // Explicitly confirm the user
    const userId = (signUpData as any).user?.id || (signUpData as any).id;
    if (userId) {
      const admin = createServerClient({
        baseUrl: INSFORGE_URL,
        anonKey: process.env.INSFORGE_SERVICE_ROLE_KEY || "",
        cookies: await cookies(),
      });
      await admin.auth.admin.updateUserById(userId, {
        email_confirm: true,
      });
    }

    // Attempt auto-login
    await new Promise((resolve) => setTimeout(resolve, 800));
    const loginResult = await client.auth.signInWithPassword({ email, password });
    
    if (loginResult.error) {
       return { 
         success: "Account created! Please sign in manually.",
       };
    }

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
