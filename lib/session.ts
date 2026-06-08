import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";
export async function getSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("insforge-refresh-token")?.value;

  if (!refreshToken) return null;

  const client = createServerClient({
    baseUrl: INSFORGE_URL,
    anonKey: ANON_KEY,
    cookies: cookieStore,
  });

  const refreshResult = await client.auth.refreshSession({
    refreshToken,
  });

  if (refreshResult.error || !refreshResult.data?.user) {
    return null;
  }

  return {
    user: refreshResult.data.user,
    accessToken: refreshResult.data.accessToken,
  };
}