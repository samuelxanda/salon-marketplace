import { insforgeAdmin } from "@/lib/insforge-server";

export async function getSalons() {
  const { data, error } = await insforgeAdmin.database
    .from("salons")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[data-fetching/getSalons]", error);
    return [];
  }
  return data || [];
}

export async function getServices(salonId: string) {
  const { data, error } = await insforgeAdmin.database
    .from("services")
    .select("*")
    .eq("salon_id", salonId);
  if (error) {
    console.error("[data-fetching/getServices]", error);
    return [];
  }
  return data || [];
}

export async function getTimeSlots(salonId: string, serviceId?: string) {
  let query = insforgeAdmin.database
    .from("time_slots")
    .select("*")
    .eq("salon_id", salonId)
    .eq("is_available", true);

  if (serviceId) {
    query = query.eq("service_id", serviceId);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[data-fetching/getTimeSlots]", error);
    return [];
  }
  return data || [];
}

export async function getBookings(clientId: string) {
  const { data, error } = await insforgeAdmin.database
    .from("bookings")
    .select("*")
    .eq("client_id", clientId);
  if (error) {
    console.error("[data-fetching/getBookings]", error);
    return [];
  }
  return data || [];
}