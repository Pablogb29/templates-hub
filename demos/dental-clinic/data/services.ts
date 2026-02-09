export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  priceFrom: number;        // cents EUR
  priceTo?: number;         // cents EUR (if range)
  duration: string;         // e.g. "45–60 min"
  category: string;
  popular?: boolean;
  coverageNote?: string;    // insurance info
}

export interface ServiceCategory {
  key: string;
  label: string;
  icon: string;
  description: string;
  items: ServiceItem[];
}

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

export const services: ServiceCategory[] = [
  {
    key: "general",
    label: "General Dentistry",
    icon: "🦷",
    description: "Preventive care and routine treatments to keep your smile healthy.",
    items: [
      { id: "g-01", name: "Comprehensive Exam & Digital X-Rays", description: "Full oral examination with AI-assisted digital panoramic and bitewing X-rays.", priceFrom: 12000, duration: "45 min", category: "general", popular: true, coverageNote: "Covered by most Luxembourg health plans" },
      { id: "g-02", name: "Professional Cleaning (Prophylaxis)", description: "Ultrasonic scaling, polishing, and fluoride treatment. Includes gum health assessment.", priceFrom: 9500, duration: "30–45 min", category: "general", coverageNote: "Covered annually by CNS" },
      { id: "g-03", name: "Composite Filling", description: "Tooth-coloured resin filling matched to your natural shade. Mercury-free and durable.", priceFrom: 15000, priceTo: 25000, duration: "30–45 min", category: "general" },
      { id: "g-04", name: "Root Canal Therapy", description: "Endodontic treatment to save an infected tooth. Performed under local anaesthesia with microscope guidance.", priceFrom: 45000, priceTo: 80000, duration: "60–90 min", category: "general" },
      { id: "g-05", name: "Tooth Extraction (Simple)", description: "Gentle extraction under local anaesthesia with follow-up care instructions.", priceFrom: 15000, priceTo: 25000, duration: "30 min", category: "general" },
      { id: "g-06", name: "Night Guard / Mouth Guard", description: "Custom-moulded guard for bruxism or sports protection. 3D-printed for perfect fit.", priceFrom: 35000, duration: "2 appointments", category: "general" },
    ],
  },
  {
    key: "cosmetic",
    label: "Cosmetic Dentistry",
    icon: "✨",
    description: "Transform your smile with our advanced aesthetic treatments.",
    items: [
      { id: "c-01", name: "Professional Teeth Whitening", description: "In-office Philips Zoom whitening. Up to 8 shades lighter in one visit.", priceFrom: 45000, duration: "75 min", category: "cosmetic", popular: true },
      { id: "c-02", name: "Porcelain Veneers", description: "Ultra-thin ceramic shells custom-crafted to reshape and perfect your smile. Per tooth.", priceFrom: 80000, priceTo: 120000, duration: "2–3 appointments", category: "cosmetic" },
      { id: "c-03", name: "Dental Bonding", description: "Sculpted composite resin to repair chips, gaps, or discolouration. Same-day results.", priceFrom: 20000, priceTo: 40000, duration: "30–60 min", category: "cosmetic" },
      { id: "c-04", name: "Gum Contouring", description: "Laser-assisted reshaping for a balanced, even gum line. Minimal discomfort.", priceFrom: 30000, priceTo: 60000, duration: "45 min", category: "cosmetic" },
      { id: "c-05", name: "Smile Makeover Consultation", description: "Comprehensive digital smile design with mock-ups. Combine multiple treatments for your ideal result.", priceFrom: 0, duration: "60 min", category: "cosmetic", coverageNote: "Free consultation" },
    ],
  },
  {
    key: "orthodontics",
    label: "Orthodontics",
    icon: "😁",
    description: "Straighten your teeth discreetly with modern orthodontic solutions.",
    items: [
      { id: "o-01", name: "Invisalign Clear Aligners", description: "Nearly invisible custom aligners. 3D treatment plan with predictable results.", priceFrom: 350000, priceTo: 550000, duration: "6–18 months", category: "orthodontics", popular: true },
      { id: "o-02", name: "Ceramic Braces", description: "Tooth-coloured brackets for a subtle look with powerful correction.", priceFrom: 400000, priceTo: 550000, duration: "12–24 months", category: "orthodontics" },
      { id: "o-03", name: "Retainers", description: "Custom-fitted retainers to maintain results after orthodontic treatment.", priceFrom: 25000, priceTo: 40000, duration: "1 appointment", category: "orthodontics" },
      { id: "o-04", name: "Orthodontic Consultation", description: "Full assessment with 3D scan and treatment options. Includes digital simulation.", priceFrom: 0, duration: "45 min", category: "orthodontics", coverageNote: "Free initial consultation" },
    ],
  },
  {
    key: "emergency",
    label: "Emergency Care",
    icon: "🚨",
    description: "Same-day emergency appointments for urgent dental issues.",
    items: [
      { id: "e-01", name: "Emergency Exam & Pain Relief", description: "Immediate assessment and pain management. X-rays and diagnosis included.", priceFrom: 15000, duration: "30 min", category: "emergency", popular: true },
      { id: "e-02", name: "Broken / Chipped Tooth Repair", description: "Same-day bonding or temporary crown to restore function and aesthetics.", priceFrom: 20000, priceTo: 45000, duration: "30–60 min", category: "emergency" },
      { id: "e-03", name: "Lost Filling / Crown Recement", description: "Re-bonding or temporary replacement to protect the tooth until definitive treatment.", priceFrom: 10000, priceTo: 20000, duration: "20 min", category: "emergency" },
      { id: "e-04", name: "Abscess / Infection Management", description: "Drainage, antibiotics if indicated, and follow-up plan. Pain relief priority.", priceFrom: 20000, priceTo: 40000, duration: "30–45 min", category: "emergency" },
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
