"use client";

import { useState } from "react";

type Service = {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
};

type TimeSlot = {
  id: string;
  datetime: string;
  is_available: boolean;
};

type BookingFormProps = {
  salonId: string;
  services: Service[];
  timeSlots: TimeSlot[];
};

export function BookingForm({ salonId, services, timeSlots }: BookingFormProps) {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const availableSlots = timeSlots.filter((slot) => slot.is_available);

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <form method="POST" action="/api/bookings" className="bg-surface rounded-2xl border border-border p-6">
      <input type="hidden" name="salon_id" value={salonId} />
      <input type="hidden" name="service_id" value={selectedService} />
      <input type="hidden" name="time_slot_id" value={selectedTime} />

      <h2 className="text-xl font-semibold text-text-primary mb-4">
        Book Appointment
      </h2>

      <div className="mb-4">
        <label className="text-sm font-medium text-text-primary mb-1 block">
          Select Service
        </label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text-primary"
        >
          <option value="">Choose a service...</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - {service.price.toLocaleString()} RWF
            </option>
          ))}
        </select>
      </div>

      {selectedService && (
        <div className="mb-4">
          <label className="text-sm font-medium text-text-primary mb-1 block">
            Select Time
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.is_available}
                onClick={() => setSelectedTime(slot.id)}
                className={`p-2 rounded-md text-sm transition-colors ${
                  selectedTime === slot.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface border border-border hover:bg-accent-muted"
                }`}
              >
                {formatTime(slot.datetime)}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedService && selectedTime && (
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-text-secondary mb-2">
            Total: {selectedServiceData?.price.toLocaleString()} RWF
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-2 text-accent-foreground font-medium hover:bg-accent-dark transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </form>
  );
}