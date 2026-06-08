import Link from "next/link";
import { SalonCard } from "@/components/salons/SalonCard";
import { Search } from "lucide-react";
import { getSalons } from "@/lib/data-fetching";

export default async function Home() {
  const salons = await getSalons();
  const featuredSalons = (salons.length > 0 ? salons : []).slice(0, 3);

  return (
    <div className="flex flex-col min-h-full bg-background">
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Book Your Perfect Salon Appointment
          </h1>
          <p className="text-base text-text-secondary mb-8">
            Discover top-rated salons in Kigali. Browse services, check availability,
            and book your appointment in seconds.
          </p>
          <Link
            href="/salons"
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-accent-foreground font-medium hover:bg-accent-dark transition-colors"
          >
            Find a Salon
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-2xl border border-border p-6 text-center">
            <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Search Salons</h3>
            <p className="text-sm text-text-secondary">
              Browse by location, service, or availability
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-border p-6 text-center">
            <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold text-lg">2</span>
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Choose Service</h3>
            <p className="text-sm text-text-secondary">
              Select from available services and time slots
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-border p-6 text-center">
            <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold text-lg">3</span>
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Confirm Booking</h3>
            <p className="text-sm text-text-secondary">
              Get instant confirmation on your appointment
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          Featured Salons
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredSalons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/salons"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-2 text-text-primary font-medium hover:bg-accent-muted transition-colors"
          >
            View All Salons
          </Link>
        </div>
      </section>
    </div>
  );
}