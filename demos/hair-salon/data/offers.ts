export interface Offer {
  id: string;
  title: string;
  description: string;
  validFrom: string;
  validTo: string;
  code?: string;
  category: "new-client" | "seasonal" | "loyalty" | "general";
}

export const offers: Offer[] = [
  {
    id: "off-01",
    title: "New Client — 20% Off First Visit",
    description: "Enjoy 20% off any service on your first visit to Luna Hair Studio. Valid for cuts, colour, and treatments.",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    code: "HELLO20",
    category: "new-client",
  },
  {
    id: "off-02",
    title: "Spring Refresh Balayage",
    description: "Full balayage + Olaplex treatment + blowout for $199 (save up to $90). Limited spots available.",
    validFrom: "2026-03-01",
    validTo: "2026-05-31",
    code: "SPRING199",
    category: "seasonal",
  },
  {
    id: "off-03",
    title: "Bring a Friend — Both Get 15% Off",
    description: "Book the same day with a friend and both enjoy 15% off all services. Cannot be combined with other offers.",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    category: "loyalty",
  },
  {
    id: "off-04",
    title: "Loyalty Reward — 5th Visit Free Blowout",
    description: "After 4 paid visits, your 5th blowout is on us! Tracked automatically in our system.",
    validFrom: "2026-01-01",
    validTo: "2027-01-01",
    category: "loyalty",
  },
  {
    id: "off-05",
    title: "Keratin + Color Bundle",
    description: "Book a keratin smoothing treatment with any colour service and save $50 off the total.",
    validFrom: "2026-02-01",
    validTo: "2026-06-30",
    code: "KCOLOR50",
    category: "general",
  },
];

export function activeOffers(dateISO?: string): Offer[] {
  const d = dateISO ?? new Date().toISOString().slice(0, 10);
  return offers.filter((o) => o.validFrom <= d && o.validTo >= d);
}
