import Link from "next/link";
import { getSession } from "@/lib/session";

type Booking = {
  id: string;
  salonName: string;
  serviceName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
};

const mockBookings: Booking[] = [
  {
    id: "b1",
    salonName: "Kigali Hair Studio",
    serviceName: "Haircut",
    date: "June 10, 2026",
    time: "9:00 AM",
    status: "confirmed",
  },
  {
    id: "b2",
    salonName: "Downtown Barber",
    serviceName: "Beard Trim",
    date: "June 15, 2026",
    time: "2:30 PM",
    status: "pending",
  },
  {
    id: "b3",
    salonName: "Glam Nails & Spa",
    serviceName: "Manicure",
    date: "May 28, 2026",
    time: "11:00 AM",
    status: "cancelled",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-success-lightest text-success-foreground";
    case "pending":
      return "bg-accent-muted text-accent";
    case "cancelled":
      return "bg-surface-secondary text-text-muted";
    default:
      return "bg-surface-secondary text-text-muted";
  }
};

export default async function BookingsPage() {
  const session = await getSession();

  if (!session?.user) {
    return (
      <div className="flex flex-col min-h-full bg-background">
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="bg-surface rounded-xl border border-border p-12 text-center">
            <h1 className="text-2xl font-semibold text-text-primary mb-4">
              My Bookings
            </h1>
            <p className="text-text-secondary mb-6">
              Sign in to view your appointments
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-2 text-accent-foreground font-medium hover:bg-accent-dark transition-colors"
            >
              Sign In
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const upcoming = mockBookings.filter((b) => b.status !== "cancelled");
  const past = mockBookings.filter((b) => b.status === "cancelled");

  return (
    <div className="flex flex-col min-h-full bg-background">
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <h1 className="text-2xl font-semibold text-text-primary mb-8">
          My Bookings
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Upcoming Appointments
          </h2>
          {upcoming.length > 0 ? (
            <div className="grid gap-4">
              {upcoming.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-surface rounded-xl border border-border p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {booking.salonName}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {booking.serviceName}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-text-secondary">{booking.date}</span>
                    <span className="text-text-secondary">{booking.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface rounded-xl border border-border p-6 text-center">
              <p className="text-text-muted mb-4">
                No upcoming appointments scheduled.
              </p>
              <Link
                href="/salons"
                className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-accent-foreground text-sm font-medium hover:bg-accent-dark transition-colors"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Past Appointments
          </h2>
          {past.length > 0 ? (
            <div className="grid gap-4">
              {past.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-surface rounded-xl border border-border p-6 opacity-75"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {booking.salonName}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {booking.serviceName}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-text-secondary">{booking.date}</span>
                    <span className="text-text-secondary">{booking.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted">No past appointments.</p>
          )}
        </div>
      </section>
    </div>
  );
}