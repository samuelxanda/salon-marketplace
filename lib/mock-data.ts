import { Salon } from "@/types";

export const mockSalons: Salon[] = [
  {
    id: "1",
    name: "Kigali Hair Studio",
    description: "Premium hair styling and coloring services",
    location: "Kacyiru, Kigali",
    image_url: "https://placehold.co/400x300/e91e63/white?text=Kigali+Hair+Studio",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Downtown Barber",
    description: "Classic cuts and modern styles for men",
    location: "Downtown, Kigali",
    image_url: "https://placehold.co/400x300/3f51b5/white?text=Downtown+Barber",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Glam Nails & Spa",
    description: "Nail care and spa treatments",
    location: "Nyarugenge, Kigali",
    image_url: "https://placehold.co/400x300/9c27b0/white?text=Glam+Nails+%26+Spa",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Men's Grooming Lounge",
    description: "Premium grooming for modern men",
    location: "Kimironko, Kigali",
    image_url: "https://placehold.co/400x300/00796b/white?text=Men%27s+Grooming",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Beauty Bar",
    description: "Full service beauty salon",
    location: "Remera, Kigali",
    image_url: "https://placehold.co/400x300/f44336/white?text=Beauty+Bar",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Hair Masters",
    description: "Professional hair care and styling",
    location: "Gikondo, Kigali",
    image_url: "https://placehold.co/400x300/ff9800/white?text=Hair+Masters",
    created_at: new Date().toISOString(),
  },
];