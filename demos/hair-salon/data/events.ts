export interface SalonEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  bookingRequired: boolean;
  free?: boolean;
}

export const events: SalonEvent[] = [
  {
    id: "ev-01",
    title: "Spring Hair Refresh Party",
    date: "2026-03-15",
    time: "12:00",
    description: "Join us for an afternoon of complimentary consultations, live styling demos, champagne, and exclusive same-day booking discounts.",
    bookingRequired: false,
    free: true,
  },
  {
    id: "ev-02",
    title: "Balayage Masterclass (Sold Out — Waitlist Open)",
    date: "2026-04-05",
    time: "18:00",
    description: "Watch our senior colourists demonstrate the latest balayage techniques on live models. Q&A included. Light bites and drinks.",
    bookingRequired: true,
    free: true,
  },
  {
    id: "ev-03",
    title: "Bridal Hair Workshop",
    date: "2026-05-17",
    time: "14:00",
    description: "Hands-on workshop for brides-to-be. Learn styling tips, try updos with our team, and get 10% off bridal packages booked on the day.",
    bookingRequired: true,
    free: true,
  },
  {
    id: "ev-04",
    title: "Self-Care Sunday — Scalp & Hair Health",
    date: "2026-06-07",
    time: "11:00",
    description: "Mini scalp analysis, product recommendations, and complimentary deep conditioning treatment with any service booked.",
    bookingRequired: true,
    free: true,
  },
  {
    id: "ev-05",
    title: "Summer Colour Pop — Flash Event",
    date: "2026-07-18",
    time: "10:00",
    description: "One-day-only: any single-process colour or gloss for $75 (walk-ins welcome, first-come first-served). Bring your summer vibe!",
    bookingRequired: false,
    free: false,
  },
];

export function upcomingEvents(dateISO?: string): SalonEvent[] {
  const d = dateISO ?? new Date().toISOString().slice(0, 10);
  return events.filter((e) => e.date >= d).sort((a, b) => a.date.localeCompare(b.date));
}
