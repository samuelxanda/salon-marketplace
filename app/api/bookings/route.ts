import { insforgeAdmin } from "@/lib/insforge-server";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login?error=auth_required" },
    });
  }

  const formData = await request.formData();
  const salonId = formData.get("salon_id") as string;
  const serviceId = formData.get("service_id") as string;
  const timeSlotId = formData.get("time_slot_id") as string;

  if (!salonId || !serviceId || !timeSlotId) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    const { error } = await insforgeAdmin.database
      .from("bookings")
      .insert([{
        salon_id: salonId,
        service_id: serviceId,
        time_slot_id: timeSlotId,
        client_id: session.user.id,
        status: "confirmed",
      }]);

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 400 }
      );
    }

    return new Response(null, {
      status: 302,
      headers: { Location: "/bookings" },
    });
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Booking failed" }),
      { status: 500 }
    );
  }
}