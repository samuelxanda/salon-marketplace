import Image from "next/image";
import Link from "next/link";
import { getSalons, getServices, getTimeSlots } from "@/lib/data-fetching";
import { BookingForm } from "@/components/booking/BookingForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SalonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const salons = await getSalons();
  const salon = salons.find((s) => s.id === id) || salons[0];
  const services = salon ? await getServices(salon.id) : [];
  const timeSlots = salon ? await getTimeSlots(salon.id) : [];

  if (!salon) {
    return (
      <div className="flex flex-col min-h-full bg-background">
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <p className="text-text-muted">Salon not found</p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-background">
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="mb-8">
          <Link href="/salons" className="text-sm text-accent mb-4 inline-block">
            ← Back to Salons
          </Link>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            {salon.name}
          </h1>
          <p className="text-text-muted">{salon.location}</p>
          <p className="text-sm text-text-secondary mt-4">{salon.description}</p>
        </div>

        {salon.image_url && (
          <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8">
            <Image
              src={salon.image_url}
              alt={salon.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Services
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-surface rounded-xl border border-border p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-text-primary">{service.name}</h3>
                  <p className="text-sm text-text-muted">
                    {service.duration_minutes} min
                  </p>
                </div>
                <span className="font-semibold text-accent">
                  {service.price.toLocaleString()} RWF
                </span>
              </div>
            ))}
          </div>
        </div>

        <BookingForm salonId={salon.id} services={services} timeSlots={timeSlots} />
      </section>
    </div>
  );
}