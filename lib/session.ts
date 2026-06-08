import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";

export async function getSession() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  console.log("DEBUG: All cookies in request:", JSON.stringify(allCookies, null, 2));

  const token = cookieStore.get("insforge-access-token")?.value;
  console.log("DEBUG: Access token found:", !!token);

  if (!token) return null;

  const client = createServerClient({
    baseUrl: INSFORGE_URL,
    anonKey: ANON_KEY,
    cookies: cookieStore,
  });

  const session = await client.auth.getCurrentUser();
  console.log("DEBUG: Session result (full):", JSON.stringify(session, null, 2));

  if (session.error || !session.data?.user) {
    return null;
  }

  return {
    user: session.data.user,
    accessToken: token,
  };
}