import { createAdminClient } from "@insforge/sdk";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const SERVICE_ROLE_KEY = process.env.INSFORGE_SERVICE_ROLE_KEY || "";

export const insforgeAdmin = createAdminClient({
  baseUrl: INSFORGE_URL,
  apiKey: SERVICE_ROLE_KEY,
});