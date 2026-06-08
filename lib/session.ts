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

  console.log("DEBUG: Client initialized. Available auth methods:", Object.keys(client.auth));
  console.log("DEBUG: Token manager:", JSON.stringify(client.auth.tokenManager, null, 2));

  // If getCurrentUser is not available, try to get the session from tokenManager
  const session = await (client.auth as any).tokenManager.getSession?.();
  console.log("DEBUG: Session from tokenManager:", JSON.stringify(session, null, 2));

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    accessToken: token,
  };
}