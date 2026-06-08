import { createAdminClient } from "@insforge/sdk";

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL || "https://9x74rdsf.eu-central.insforge.app";
const SERVICE_ROLE_KEY = process.env.INSFORGE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error("INSFORGE_SERVICE_ROLE_KEY is required");
  process.exit(1);
}

const insforgeAdmin = createAdminClient({
  baseUrl: INSFORGE_URL,
  apiKey: SERVICE_ROLE_KEY,
});

const mockSalons = [
  {
    name: "Kigali Hair Studio",
    description: "Premium hair styling and coloring services",
    location: "Kacyiru, Kigali",
    image_url: "https://placehold.co/400x300/e91e63/white?text=Kigali+Hair+Studio&format=png",
  },
  {
    name: "Downtown Barber",
    description: "Classic cuts and modern styles for men",
    location: "Downtown, Kigali",
    image_url: "https://placehold.co/400x300/3f51b5/white?text=Downtown+Barber&format=png",
  },
  {
    name: "Glam Nails & Spa",
    description: "Nail care and spa treatments",
    location: "Nyarugenge, Kigali",
    image_url: "https://placehold.co/400x300/9c27b0/white?text=Glam+Nails+%26+Spa&format=png",
  },
];

const servicesBySalon = {
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

    const now = new Date();
    const timeSlots = [];
    
    for (const service of serviceData || []) {
      for (let i = 1; i <= 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);
        date.setHours(9 + (date.getDate() % 4), 0, 0, 0);
        
        timeSlots.push({
          salon_id: salonId,
          service_id: service.id,
          datetime: date.toISOString(),
          is_available: true,
        });
      }
    }

    if (timeSlots.length > 0) {
      const { error: slotsError } = await insforgeAdmin.database
        .from("time_slots")
        .insert(timeSlots);

      if (slotsError) {
        console.error("Error seeding time slots:", slotsError.message);
      }
    }

    console.log(`Seeded: ${salon.name} with ${services.length} services`);
  }

  console.log("Seeding complete!");
}

seedDatabase();