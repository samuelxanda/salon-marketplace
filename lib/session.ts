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
  const refreshResult = await client.auth.refreshSession({
    refreshToken,
  });
  console.log("DEBUG: Refresh result:", JSON.stringify(refreshResult, null, 2));

  if (refreshResult.error || !refreshResult.data?.user) {
    console.error("DEBUG: Session refresh error:", refreshResult.error);
    return null;
  }

  // Use the user data directly from the refresh result
  return {
    user: refreshResult.data.user,
    accessToken: refreshResult.data.accessToken,
  };
}