# Project Overview

## About the Project

SalonBook is a client-facing salon booking web app. A client opens the app, browses available salons in their area, picks one, and books an appointment for a specific service and time. They can then view their upcoming and past bookings in one place.

This is a practice project — built to master spec-driven development, UI token systems, and the full engineering loop. It directly informs the future SalonPro Rwanda platform.

---

## The Problem It Solves

Clients in Kigali have no clean, simple way to discover salons and book appointments online. Everything is done via WhatsApp or walking in. SalonBook gives clients a fast, polished booking experience from their phone or browser.

---

## Target User

A client — someone who wants to find a salon, see available services and times, and book an appointment without calling or messaging anyone.

---

## Pages

```
/                  → Landing page — hero, how it works, featured salons
/salons            → Salon listing — browse and search all salons
/salons/[id]       → Salon detail — services, staff, availability, booking form
/bookings          → My bookings — list of upcoming and past appointments
```

---

## Core User Flow

1. Client lands on homepage
2. Clicks "Find a Salon" → goes to /salons
3. Browses or searches salons by name or service
4. Clicks a salon → goes to /salons/[id]
5. Picks a service, picks a time slot, confirms booking
6. Redirected to /bookings to see their confirmed appointment

---

## Features In Scope

- Landing page with hero section and featured salons
- Salon listing page with search
- Salon detail page with services, time slots, and booking form
- Booking confirmation page showing upcoming and past bookings
- Insforge authentication (client sign up and login)
- Booking stored in database, visible in /bookings

---

## Features Out of Scope

- Salon owner dashboard — clients only in this version
- Payments — booking is free to confirm, no payment flow
- Reviews and ratings
- Notifications (email, SMS, push)
- Map view or location-based filtering
- Staff selection by client
- Cancellation or rescheduling
- Mobile app
- Admin panel