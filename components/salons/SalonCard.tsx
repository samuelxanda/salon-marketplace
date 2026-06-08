import Link from "next/link";
import Image from "next/image";
import { Salon } from "@/types";

type SalonCardProps = {
  salon: Salon;
};

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <Link href={`/salons/${salon.id}`} className="block">
      <div className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
        {salon.image_url ? (
          <div className="relative h-48 w-full">
            <Image
              src={salon.image_url}
              alt={salon.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-accent-light flex items-center justify-center">
            <span className="text-accent font-medium">No Image</span>
          </div>
        )}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-text-primary">{salon.name}</h3>
          <p className="text-sm text-text-muted mt-1">{salon.location}</p>
          <p className="text-sm text-text-secondary mt-2 line-clamp-2">{salon.description}</p>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-accent-muted text-accent">
              Hair & Beauty
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}