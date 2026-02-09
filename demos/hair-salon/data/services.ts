export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  priceFrom: number;        // cents USD
  priceTo?: number;
  duration: string;
  category: string;
  popular?: boolean;
}

export interface ServiceCategory {
  key: string;
  label: string;
  icon: string;
  description: string;
  items: ServiceItem[];
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

export const services: ServiceCategory[] = [
  {
    key: "cuts",
    label: "Cuts & Styling",
    icon: "✂️",
    description: "Precision cuts and styling tailored to your face shape and lifestyle.",
    items: [
      { id: "cu-01", name: "Women's Haircut & Blowout", description: "Consultation, precision cut, shampoo, conditioning treatment, and professional blowout.", priceFrom: 8000, priceTo: 12000, duration: "60 min", category: "cuts", popular: true },
      { id: "cu-02", name: "Men's Haircut & Style", description: "Tailored cut with hot towel, shampoo, and style.", priceFrom: 5500, priceTo: 7500, duration: "30–45 min", category: "cuts" },
      { id: "cu-03", name: "Kids' Haircut (Under 12)", description: "Gentle, fun haircut for children. Includes a treat!", priceFrom: 3500, priceTo: 5000, duration: "30 min", category: "cuts" },
      { id: "cu-04", name: "Bang / Fringe Trim", description: "Quick trim to keep your bangs on point. Complimentary for regular clients.", priceFrom: 1500, duration: "10 min", category: "cuts" },
      { id: "cu-05", name: "Blowout & Style", description: "Shampoo and professional blowout with heat styling. Perfect for events.", priceFrom: 5000, priceTo: 7500, duration: "45 min", category: "cuts", popular: true },
      { id: "cu-06", name: "Updo / Event Styling", description: "Special occasion updo or bridal styling. Includes consultation and trial run.", priceFrom: 10000, priceTo: 18000, duration: "60–90 min", category: "cuts" },
    ],
  },
  {
    key: "color",
    label: "Color",
    icon: "🎨",
    description: "Expert color services from subtle highlights to bold transformations.",
    items: [
      { id: "co-01", name: "Balayage / Ombre", description: "Hand-painted highlights for a sun-kissed, natural gradient. Includes toner and gloss.", priceFrom: 15000, priceTo: 28000, duration: "2–3 hours", category: "color", popular: true },
      { id: "co-02", name: "Full Highlights", description: "Foil highlights for dimensional, all-over brightness. Customised placement.", priceFrom: 15000, priceTo: 25000, duration: "2–2.5 hours", category: "color" },
      { id: "co-03", name: "Partial Highlights", description: "Face-framing or crown highlights for a subtle lift. Great for first-time color.", priceFrom: 10000, priceTo: 17000, duration: "1.5–2 hours", category: "color" },
      { id: "co-04", name: "Single Process Color", description: "All-over color or root touch-up with premium ammonia-free formulas.", priceFrom: 9000, priceTo: 14000, duration: "1.5 hours", category: "color" },
      { id: "co-05", name: "Gloss / Toner", description: "Shine-boosting toner to refresh or adjust tone between colour sessions.", priceFrom: 5000, priceTo: 8000, duration: "30–45 min", category: "color" },
      { id: "co-06", name: "Color Correction", description: "Fix box-dye disasters or transform unwanted tones. Consultation required.", priceFrom: 25000, priceTo: 50000, duration: "3–5 hours", category: "color" },
    ],
  },
  {
    key: "treatments",
    label: "Treatments",
    icon: "💆",
    description: "Repair, hydrate, and protect your hair with salon-grade treatments.",
    items: [
      { id: "tr-01", name: "Keratin Smoothing Treatment", description: "Eliminates frizz and adds shine for up to 3 months. Formaldehyde-free formula.", priceFrom: 25000, priceTo: 40000, duration: "2–3 hours", category: "treatments", popular: true },
      { id: "tr-02", name: "Olaplex Bond Repair", description: "Patented bond-building treatment to reverse damage from heat, colour, or environment.", priceFrom: 6500, priceTo: 9500, duration: "30–45 min", category: "treatments" },
      { id: "tr-03", name: "Deep Conditioning Mask", description: "Intense hydration and repair for dry or damaged hair. Includes steam treatment.", priceFrom: 4500, priceTo: 6500, duration: "30 min", category: "treatments" },
      { id: "tr-04", name: "Scalp Detox Treatment", description: "Exfoliating scalp treatment to remove build-up and promote healthy growth. Includes massage.", priceFrom: 5500, priceTo: 7500, duration: "30 min", category: "treatments" },
    ],
  },
  {
    key: "extensions",
    label: "Extensions",
    icon: "💫",
    description: "Premium hair extensions for length, volume, or both.",
    items: [
      { id: "ex-01", name: "Tape-In Extensions (Full Head)", description: "Seamless, damage-free tape-in extensions. Includes cut and blend.", priceFrom: 40000, priceTo: 70000, duration: "2–3 hours", category: "extensions" },
      { id: "ex-02", name: "Clip-In Set (Custom Color Match)", description: "Reusable clip-in extensions colour-matched to your hair. Perfect for events.", priceFrom: 20000, priceTo: 40000, duration: "1 hour (fitting)", category: "extensions" },
      { id: "ex-03", name: "Extension Maintenance", description: "Move-up and rebond existing tape or bead extensions. Includes wash and style.", priceFrom: 15000, priceTo: 25000, duration: "1.5 hours", category: "extensions" },
    ],
  },
];

export function getServiceById(id: string): ServiceItem | undefined {
  for (const cat of services) {
    const found = cat.items.find((i) => i.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getCategoryByKey(key: string): ServiceCategory | undefined {
  return services.find((c) => c.key === key);
}
