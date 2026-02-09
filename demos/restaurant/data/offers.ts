/* ──────────────────────────────────────────────────────────
   data/offers.ts
   Active and upcoming promotions for Tsuki Izakaya
   ────────────────────────────────────────────────────────── */

export interface Offer {
  id: string;
  title: string;
  description: string;
  /** ISO date strings (inclusive) */
  validFrom: string;
  validTo: string;
  /** Optional promo code customers can mention */
  code?: string;
  /** Category the offer belongs to */
  category: "happy-hour" | "seasonal" | "event" | "loyalty" | "general";
  /** If true, only available for dine-in */
  dineInOnly?: boolean;
}

export const offers: Offer[] = [
  /* ── Recurring / long-running ── */
  {
    id: "off-01",
    title: "Golden Hour — Daily Happy Hour",
    description:
      "Half-price house sake, $5 edamame & gyoza, and $8 yakitori flights every day from 5–7 PM. The best way to start your evening at Tsuki.",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    category: "happy-hour",
    dineInOnly: true,
  },
  {
    id: "off-02",
    title: "Omakase Monday",
    description:
      "Our 12-course omakase at a special $95 price (usually $135). Counter seating only, reservation required 48 hours in advance.",
    validFrom: "2026-01-06",
    validTo: "2026-06-29",
    category: "general",
    dineInOnly: true,
  },
  {
    id: "off-03",
    title: "Date Night for Two",
    description:
      "A shared sashimi platter, two robata entrées, a dessert to share, and a bottle of Dassai 45 — all for $140. Available Thu–Sat evenings.",
    validFrom: "2026-02-01",
    validTo: "2026-04-30",
    code: "DATENIGHT",
    category: "general",
    dineInOnly: true,
  },

  /* ── Seasonal ── */
  {
    id: "off-04",
    title: "Spring Sakura Menu",
    description:
      "A limited 5-course menu inspired by cherry-blossom season: sakura shrimp tempura, cherry blossom mochi, rose sake pairing, and more.",
    validFrom: "2026-03-15",
    validTo: "2026-04-15",
    category: "seasonal",
    dineInOnly: true,
  },
  {
    id: "off-05",
    title: "Summer Kakigōri Festival",
    description:
      "Complimentary shaved-ice kakigōri with any entrée purchase during July. Choose from yuzu, matcha, or ume plum syrup.",
    validFrom: "2026-07-01",
    validTo: "2026-07-31",
    category: "seasonal",
    dineInOnly: true,
  },

  /* ── Event tie-ins ── */
  {
    id: "off-06",
    title: "Tanabata Sake Flight",
    description:
      "Celebrate the Star Festival with a curated 4-sake tasting flight paired with light bites — $35 per person.",
    validFrom: "2026-07-05",
    validTo: "2026-07-07",
    category: "event",
    dineInOnly: true,
  },

  /* ── Loyalty ── */
  {
    id: "off-07",
    title: "Tsuki Insiders — 10th Visit Reward",
    description:
      "Dine with us ten times and your 11th visit starts with a complimentary premium sake pour and appetizer. Ask your server to scan your membership card.",
    validFrom: "2026-01-01",
    validTo: "2027-01-01",
    category: "loyalty",
  },
  {
    id: "off-08",
    title: "Birthday Omiyage",
    description:
      "Celebrate your birthday at Tsuki and receive a complimentary dessert and a take-home box of house-made mochi. Valid within 7 days of your birthday; ID required.",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    category: "loyalty",
    dineInOnly: true,
  },
];

/* ── Helpers ── */

export function activeOffers(dateISO?: string): Offer[] {
  const d = dateISO ?? new Date().toISOString().slice(0, 10);
  return offers.filter((o) => o.validFrom <= d && o.validTo >= d);
}

export function upcomingOffers(dateISO?: string): Offer[] {
  const d = dateISO ?? new Date().toISOString().slice(0, 10);
  return offers.filter((o) => o.validFrom > d);
}
