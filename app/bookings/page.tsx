import Link from "next/link";
import { getSession } from "@/lib/session";
import { getBookings } from "@/lib/data-fetching";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
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

  const bookings = await getBookings(session.user.id);
  const upcoming = bookings.filter((b) => b.status !== "cancelled");
  const past = bookings.filter((b) => b.status === "cancelled");

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
              {upcoming.map((booking: any) => (
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
                        Service: {booking.serviceName}
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
                  <p className="text-sm text-text-secondary">
                    Booked on: {new Date(booking.created_at).toLocaleDateString()}
                  </p>
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
      </section>
    </div>
  );
}
