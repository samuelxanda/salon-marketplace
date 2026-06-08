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
  const { data: bookings, error: bookingsError } = await insforgeAdmin.database
    .from("bookings")
    .select("*")
    .eq("client_id", clientId);

  if (bookingsError) {
    console.error("[data-fetching/getBookings]", bookingsError);
    return [];
  }

  if (!bookings || bookings.length === 0) return [];

  // Fetch unique salon and service IDs to minimize queries
  const salonIds = [...new Set(bookings.map((b) => b.salon_id))];
  const serviceIds = [...new Set(bookings.map((b) => b.service_id))];

  const { data: salons } = await insforgeAdmin.database
    .from("salons")
    .select("id, name")
    .in("id", salonIds);

  const { data: services } = await insforgeAdmin.database
    .from("services")
    .select("id, name")
    .in("id", serviceIds);

  // Enrich bookings
  return bookings.map((b) => ({
    ...b,
    salonName: salons?.find((s) => s.id === b.salon_id)?.name || "Unknown Salon",
    serviceName: services?.find((s) => s.id === b.service_id)?.name || "Unknown Service",
  }));
}