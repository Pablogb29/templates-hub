export interface ClinicEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  bookingRequired: boolean;
  free?: boolean;
}

export const events: ClinicEvent[] = [
  {
    id: "ev-01",
    title: "Smile Makeover Open Day",
    date: "2026-03-21",
    time: "10:00",
    description: "Free consultations with our cosmetic team. Get a digital smile preview and personalised treatment plan. Light refreshments provided.",
    bookingRequired: true,
    free: true,
  },
  {
    id: "ev-02",
    title: "Kids' Dental Health Workshop",
    date: "2026-04-12",
    time: "14:00",
    description: "Fun, interactive session for children aged 4–10. Learn proper brushing, healthy snacks, and earn a Junior Smile certificate. Parents welcome.",
    bookingRequired: true,
    free: true,
  },
  {
    id: "ev-03",
    title: "Invisalign Information Evening",
    date: "2026-05-08",
    time: "18:30",
    description: "Learn about clear aligner treatment, see before-and-after cases, and get an exclusive 15% discount for attendees who start treatment within 30 days.",
    bookingRequired: true,
    free: true,
  },
  {
    id: "ev-04",
    title: "World Oral Health Day — Free Screenings",
    date: "2026-03-20",
    time: "09:00",
    description: "Complimentary 15-minute dental screenings for the community. No registration needed — walk-ins welcome all day.",
    bookingRequired: false,
    free: true,
  },
  {
    id: "ev-05",
    title: "Senior Dental Health Seminar",
    date: "2026-06-14",
    time: "11:00",
    description: "Tips on implant care, dry mouth management, and maintaining dental health over 60. Q&A with Dr. Müller. Coffee & cake provided.",
    bookingRequired: true,
    free: true,
  },
];

export function upcomingEvents(dateISO?: string): ClinicEvent[] {
  const d = dateISO ?? new Date().toISOString().slice(0, 10);
  return events.filter((e) => e.date >= d).sort((a, b) => a.date.localeCompare(b.date));
}
