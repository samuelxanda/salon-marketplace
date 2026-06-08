export type Salon = {
  id: string;
  name: string;
  description: string;
  location: string;
  image_url: string | null;
  created_at: string;
};

export type Service = {
  id: string;
  salon_id: string;
  name: string;
  duration_minutes: number;
  price: number;
  created_at: string;
};

export type TimeSlot = {
  id: string;
  salon_id: string;
  service_id: string;
  datetime: string;
  is_available: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  client_id: string;
  salon_id: string;
  service_id: string;
  time_slot_id: string;
  status: "confirmed" | "pending" | "cancelled";
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  created_at: string;
};

export type BookingFormData = {
  salonId: string;
  serviceId: string;
  timeSlotId: string;
};