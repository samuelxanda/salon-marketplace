import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";
export async function getSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("insforge-refresh-token")?.value;
  console.log("DEBUG: Refresh token found:", !!refreshToken);

  if (!refreshToken) return null;

  const client = createServerClient({
    baseUrl: INSFORGE_URL,
    anonKey: ANON_KEY,
    cookies: cookieStore,
  });

  // Explicitly refresh session to hydrate the SSR client
  const { data: refreshData, error: refreshError } = await client.auth.refreshSession({
    refreshToken,
  });

  if (refreshError) {
    console.error("DEBUG: Session refresh error:", refreshError);
    return null;
  }

  const session = await client.auth.getCurrentUser();
  console.log("DEBUG: Session result (full):", JSON.stringify(session, null, 2));

  if (session.error || !session.data?.user) {
    return null;
  }

  return {
    user: session.data.user,
    accessToken: refreshData.accessToken,
  };
}