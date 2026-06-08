import { Search } from "lucide-react";
import { SalonCard } from "@/components/salons/SalonCard";
import { getSalons } from "@/lib/data-fetching";

export default async function SalonsPage() {
  const salons = await getSalons();

  return (
    <div className="flex flex-col min-h-full bg-background">
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-text-primary mb-4">
            Find Salons in Kigali
          </h1>
          <form method="GET" action="/salons" className="relative">
            <input
              type="text"
              name="q"
              placeholder="Search by salon name or service..."
              defaultValue=""
              className="w-full md:w-96 bg-surface border border-border rounded-md px-3 py-2 pl-10 text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent focus:border-accent"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          </form>
        </div>

        {salons.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {salons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-muted mb-4">No salons available yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}