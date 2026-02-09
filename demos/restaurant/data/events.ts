/* ──────────────────────────────────────────────────────────
   data/events.ts
   Upcoming events & special evenings at Tsuki Izakaya
   ────────────────────────────────────────────────────────── */

export interface RestaurantEvent {
  id: string;
  title: string;
  /** ISO date "YYYY-MM-DD" */
  date: string;
  /** Optional start time "HH:mm" */
  time?: string;
  description: string;
  /** Whether guests must book in advance */
  bookingRequired: boolean;
  /** Per-person ticket price in cents, or null if free / included */
  ticketPrice?: number | null;
  /** Maximum capacity (null = regular seating) */
  capacity?: number | null;
  /** Tags for filtering */
  tags?: string[];
}

export const events: RestaurantEvent[] = [
  {
    id: "ev-01",
    title: "Chef's Table: Spring Omakase Preview",
    date: "2026-03-14",
    time: "19:00",
    description:
      "Join Chef Takeshi for an exclusive 14-course preview of the spring omakase menu. Each course is paired with a sake selected by our sommelier. Counter seating only — an intimate evening limited to 8 guests.",
    bookingRequired: true,
    ticketPrice: 17500,
    capacity: 8,
    tags: ["omakase", "tasting", "exclusive"],
  },
  {
    id: "ev-02",
    title: "Sake 101: Introduction to Japanese Sake",
    date: "2026-03-22",
    time: "17:30",
    description:
      "A guided tasting of six sakes spanning junmai, ginjo, and daiginjo grades. Learn to read labels, pair with food, and find your palate. Includes light bites and a take-home tasting card.",
    bookingRequired: true,
    ticketPrice: 5500,
    capacity: 24,
    tags: ["sake", "workshop", "beginner"],
  },
  {
    id: "ev-03",
    title: "Live Shamisen & Jazz Night",
    date: "2026-04-04",
    time: "20:00",
    description:
      "A fusion performance blending traditional shamisen with modern jazz. No cover charge — enjoy the show with your regular dinner reservation. Complimentary shōchū cocktail for the first 30 guests.",
    bookingRequired: false,
    ticketPrice: null,
    capacity: null,
    tags: ["music", "live", "no-cover"],
  },
  {
    id: "ev-04",
    title: "Ramen Pop-Up: Tsukemen Night",
    date: "2026-04-18",
    time: "18:00",
    description:
      "For one night only, our kitchen transforms into a tsukemen (dipping ramen) bar. Three broths — tonkotsu, yuzu shio, and spicy miso — with thick artisan noodles. Walk-ins welcome, first come first served.",
    bookingRequired: false,
    ticketPrice: null,
    capacity: null,
    tags: ["ramen", "pop-up", "limited"],
  },
  {
    id: "ev-05",
    title: "Mother's Day Kaiseki Dinner",
    date: "2026-05-10",
    time: "18:00",
    description:
      "Treat Mom to a 10-course kaiseki dinner featuring seasonal spring ingredients — sakura-smoked duck, bamboo shoot tempura, and a matcha-strawberry dessert. Complimentary sparkling sake toast. Private tatami room available for parties of 6+.",
    bookingRequired: true,
    ticketPrice: 12500,
    capacity: 40,
    tags: ["kaiseki", "holiday", "family"],
  },
  {
    id: "ev-06",
    title: "Tanabata Star Festival Dinner",
    date: "2026-07-07",
    time: "19:00",
    description:
      "Celebrate Tanabata with a themed 8-course dinner, paper wish-writing, and a curated sake flight under our rooftop string lights. Dress code: yukata welcome.",
    bookingRequired: true,
    ticketPrice: 9500,
    capacity: 50,
    tags: ["festival", "cultural", "seasonal"],
  },
  {
    id: "ev-07",
    title: "Whisky Masterclass: Japanese Single Malts",
    date: "2026-08-15",
    time: "18:30",
    description:
      "Taste five Japanese single malts — Yamazaki, Hakushu, Nikka Yoichi, Nikka Miyagikyo, and a mystery bottling. Our bar director guides you through nose, palate, and finish with paired canapés.",
    bookingRequired: true,
    ticketPrice: 8500,
    capacity: 18,
    tags: ["whisky", "masterclass", "tasting"],
  },
  {
    id: "ev-08",
    title: "Harvest Moon Supper",
    date: "2026-09-25",
    time: "19:00",
    description:
      "An autumn-inspired multi-course dinner celebrating Tsukimi (moon-viewing). Dishes feature matsutake mushroom, sanma (pacific saury), and chestnut. Rooftop seating with moon cakes and hōjicha.",
    bookingRequired: true,
    ticketPrice: 11000,
    capacity: 30,
    tags: ["cultural", "seasonal", "tasting"],
  },
  {
    id: "ev-09",
    title: "New Year's Eve: Toshikoshi Soba Party",
    date: "2026-12-31",
    time: "21:00",
    description:
      "Ring in the New Year the Japanese way. Enjoy hand-cut soba noodles, a sake countdown toast at midnight, and live taiko drumming. Includes a 6-course dinner and free-flow sake from 9 PM to 1 AM.",
    bookingRequired: true,
    ticketPrice: 15000,
    capacity: 60,
    tags: ["holiday", "new-year", "live", "all-inclusive"],
  },
];

/* ── Helpers ── */

export function upcomingEvents(dateISO?: string): RestaurantEvent[] {
  const d = dateISO ?? new Date().toISOString().slice(0, 10);
  return events
    .filter((e) => e.date >= d)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function eventsByTag(tag: string): RestaurantEvent[] {
  return events.filter((e) => e.tags?.includes(tag));
}

export function formatTicketPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
