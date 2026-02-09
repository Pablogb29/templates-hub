export interface Offer {
  id: string;
  title: string;
  description: string;
  validFrom: string;
  validTo: string;
  code?: string;
  category: "new-patient" | "seasonal" | "loyalty" | "general";
}

export const offers: Offer[] = [
  {
    id: "off-01",
    title: "New Patient Welcome Package",
    description: "Comprehensive exam, digital X-rays, professional cleaning, and a personalised treatment plan — all for €99 (normally €215). First visit only.",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    code: "WELCOME99",
    category: "new-patient",
  },
  {
    id: "off-02",
    title: "Free Orthodontic Consultation",
    description: "Complimentary Invisalign or braces consultation with 3D digital smile simulation. No obligation.",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    category: "general",
  },
  {
    id: "off-03",
    title: "Spring Whitening Special",
    description: "Professional Zoom whitening for €349 (save €100). Includes take-home touch-up kit.",
    validFrom: "2026-03-01",
    validTo: "2026-05-31",
    code: "SPRING349",
    category: "seasonal",
  },
  {
    id: "off-04",
    title: "Family Plan — 10% Off",
    description: "Register 3+ family members and receive 10% off all preventive treatments for the household.",
    validFrom: "2026-01-01",
    validTo: "2026-12-31",
    category: "loyalty",
  },
  {
    id: "off-05",
    title: "Refer a Friend",
    description: "When your referral completes their first appointment, you both receive a €50 credit toward any treatment.",
    validFrom: "2026-01-01",
    validTo: "2027-01-01",
    category: "loyalty",
  },
];

export function activeOffers(dateISO?: string): Offer[] {
  const d = dateISO ?? new Date().toISOString().slice(0, 10);
  return offers.filter((o) => o.validFrom <= d && o.validTo >= d);
}
