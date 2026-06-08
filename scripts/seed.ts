import { createAdminClient } from "@insforge/sdk";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const SERVICE_ROLE_KEY = process.env.INSFORGE_SERVICE_ROLE_KEY || "";

const insforgeAdmin = createAdminClient({
  baseUrl: INSFORGE_URL,
  apiKey: SERVICE_ROLE_KEY,
});

const mockSalons = [
  {
    name: "Kigali Hair Studio",
    description: "Premium hair styling and coloring services",
    location: "Kacyiru, Kigali",
    image_url: "https://placehold.co/400x300/e91e63/white?text=Kigali+Hair+Studio",
  },
  {
    name: "Downtown Barber",
    description: "Classic cuts and modern styles for men",
    location: "Downtown, Kigali",
    image_url: "https://placehold.co/400x300/3f51b5/white?text=Downtown+Barber",
  },
  {
    name: "Glam Nails & Spa",
    description: "Nail care and spa treatments",
    location: "Nyarugenge, Kigali",
    image_url: "https://placehold.co/400x300/9c27b0/white?text=Glam+Nails+%26+Spa",
  },
  {
    name: "Men's Grooming Lounge",
    description: "Premium grooming for modern men",
    location: "Kimironko, Kigali",
    image_url: "https://placehold.co/400x300/00796b/white?text=Men%27s+Grooming",
  },
  {
    name: "Beauty Bar",
    description: "Full service beauty salon",
    location: "Remera, Kigali",
    image_url: "https://placehold.co/400x300/f44336/white?text=Beauty+Bar",
  },
  {
    name: "Hair Masters",
    description: "Professional hair care and styling",
    location: "Gikondo, Kigali",
    image_url: "https://placehold.co/400x300/ff9800/white?text=Hair+Masters",
  },
];

const servicesBySalon: Record<string, { name: string; duration_minutes: number; price: number }[]> = {
  "Kigali Hair Studio": [
    { name: "Haircut", duration_minutes: 30, price: 15000 },
    { name: "Hair Color", duration_minutes: 90, price: 35000 },
    { name: "Blowout", duration_minutes: 45, price: 20000 },
  ],
  "Downtown Barber": [
    { name: "Haircut", duration_minutes: 30, price: 12000 },
    { name: "Beard Trim", duration_minutes: 20, price: 8000 },
    { name: "Hot Towel Shave", duration_minutes: 45, price: 15000 },
  ],
  "Glam Nails & Spa": [
    { name: "Manicure", duration_minutes: 45, price: 10000 },
    { name: "Pedicure", duration_minutes: 60, price: 12000 },
    { name: "Nail Art", duration_minutes: 90, price: 18000 },
  ],
};

async function seedDatabase() {
  console.log("Seeding database...");

  const createdSalonIds: Record<string, string> = {};

  for (const salon of mockSalons) {
    const { data: salonData, error: salonError } = await insforgeAdmin.database
      .from("salons")
      .insert(salon)
      .select();

    if (salonError) {
      console.error("Error seeding salon:", salonError.message);
      continue;
    }

    const salonId = salonData?.[0]?.id;
    if (!salonId) continue;
    createdSalonIds[salon.name] = salonId;

    const services = servicesBySalon[salon.name] || [
      { name: "Haircut", duration_minutes: 30, price: 15000 },
    ];

    const { data: serviceData, error: servicesError } = await insforgeAdmin.database
      .from("services")
      .insert(services.map((s) => ({ ...s, salon_id: salonId })))
      .select();

    if (servicesError) {
      console.error("Error seeding services for", salon.name);
      continue;
    }

    for (const service of serviceData || []) {
      const timeSlots = [];
      const now = new Date();
      for (let i = 1; i <= 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);
        date.setHours(9 + Math.floor(Math.random() * 4), 0, 0, 0);
        
        timeSlots.push({
          salon_id: salonId,
          service_id: service.id,
          datetime: date.toISOString(),
          is_available: true,
        });
        
        date.setHours(14 + Math.floor(Math.random() * 3), 0, 0, 0);
        timeSlots.push({
          salon_id: salonId,
          service_id: service.id,
          datetime: date.toISOString(),
          is_available: true,
        });
      }

      const { error: slotsError } = await insforgeAdmin.database
        .from("time_slots")
        .insert(timeSlots);

      if (slotsError) {
        console.error("Error seeding time slots:", slotsError.message);
      }
    }

    console.log(`Seeded: ${salon.name} with ${services.length} services and time slots`);
  }

  console.log("Seeding complete!");
}

(async () => seedDatabase())();