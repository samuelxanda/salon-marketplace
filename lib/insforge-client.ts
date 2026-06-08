import { createBrowserClient } from "@insforge/sdk/ssr";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";

export const insforge = createBrowserClient({
  baseUrl: INSFORGE_URL,
  anonKey: ANON_KEY,
});