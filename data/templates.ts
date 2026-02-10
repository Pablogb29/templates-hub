export interface TemplateFeature {
  label: string;
  included: boolean;
}

export interface Template {
  slug: string;
  name: string;
  niche: string;
  tagline: string;
  pitch: string;
  description: string;
  features: string[];
  highlights: string[];
  demoUrl: string;
  previewImage: string;
  color: string;
  colorMuted: string;
  flagship?: boolean;
  popular?: boolean;
  tier: "standard" | "pro";
}

export const templates: Template[] = [
  {
    slug: "restaurant",
    name: "Izakaya Pro",
    niche: "Restaurant",
    tagline: "Japanese fine dining, reimagined digitally",
    pitch:
      "A cinematic, dark-themed restaurant website with online reservations, a full interactive menu, and an AI assistant that knows every dish.",
    description:
      "Designed for upscale restaurants that want to make a lasting first impression. Features a cinematic hero with embedded reservation form, animated menu navigator with dietary filters, masonry gallery, and a fully trained AI chatbot that can answer questions about the menu, hours, allergens, and availability.",
    features: [
      "Cinematic hero with embedded reservation form",
      "Interactive menu with dietary filters & allergen info",
      "AI chatbot trained on menu, hours, and events",
      "Masonry photo gallery with lightbox",
      "Animated trust counters",
      "Reviews carousel",
      "FAQ accordion",
      "Location & hours with live status",
      "Mobile & desktop sticky CTAs",
      "Dark neon aesthetic with grain texture",
      "Fully responsive & animated",
      "Performance optimized (Lighthouse 90+)",
    ],
    highlights: [
      "Flagship template",
      "Most popular",
      "Pro motion system",
      "Parallax effects",
    ],
    demoUrl: "/demos/restaurant",
    previewImage: "/previews/restaurant.jpg",
    color: "#0df2f2",
    colorMuted: "#0df2f233",
    flagship: true,
    popular: true,
    tier: "pro",
  },
  {
    slug: "hair-salon",
    name: "Salon Studio",
    niche: "Hair Salon",
    tagline: "Where style meets technology",
    pitch:
      "An elegant, modern salon website with service booking, team showcase, and an AI receptionist that handles inquiries 24/7.",
    description:
      "Built for hair salons, spas, and beauty studios. Features a clean, light design with service navigation, team profiles, gallery, and an AI chatbot that can quote prices, explain services, and check availability.",
    features: [
      "Split hero with booking integration",
      "Service navigator with pricing",
      "Team member profiles",
      "Before & after gallery",
      "AI chatbot for services, pricing & booking",
      "Reviews carousel",
      "FAQ section",
      "Contact form with validation",
      "Mobile sticky booking bar",
      "Light, elegant design",
      "Fully responsive & animated",
      "SEO optimized with sitemap",
    ],
    highlights: ["Clean design", "Booking ready", "AI receptionist"],
    demoUrl: "/demos/hair-salon",
    previewImage: "/previews/salon.jpg",
    color: "#13ecda",
    colorMuted: "#13ecda33",
    tier: "standard",
  },
  {
    slug: "dental-clinic",
    name: "WhitePeak Dental",
    niche: "Dental Clinic",
    tagline: "Trust-building design for healthcare",
    pitch:
      "A professional, trust-focused dental clinic website with appointment booking, treatment navigator, and a medically-aware AI assistant.",
    description:
      "Purpose-built for dental clinics and healthcare providers. Features a trust-first design with doctor profiles, before/after slider, treatment timeline, and an AI chatbot that handles appointment inquiries while respecting medical boundaries.",
    features: [
      "Split hero with appointment booking",
      "Treatment navigator with insurance notes",
      "Before & after comparison slider",
      "Doctor profiles with credentials",
      "How-it-works timeline",
      "AI chatbot with medical awareness",
      "Partner logos & trust indicators",
      "Reviews carousel",
      "Emergency contact section",
      "FAQ accordion",
      "Multi-language support hints",
      "Fully responsive & animated",
    ],
    highlights: [
      "Healthcare focused",
      "Trust-building design",
      "Medical-aware AI",
    ],
    demoUrl: "/demos/dental-clinic",
    previewImage: "/previews/dental.jpg",
    color: "#13ecda",
    colorMuted: "#13ecda33",
    tier: "standard",
  },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return templates.map((t) => t.slug);
}

/**
 * Resolve the iframe URL for a template demo.
 *
 * In development: templates run on separate ports (3001, 3002, 3003).
 * In production: set NEXT_PUBLIC_DEMO_*_URL env vars with deployed URLs.
 *
 * Each template uses `basePath: "/demos/[slug]"` so its content
 * is served at `[origin]/demos/[slug]`.
 */
const DEMO_ORIGINS: Record<string, { envKey: string; devPort: number }> = {
  restaurant: { envKey: "NEXT_PUBLIC_DEMO_RESTAURANT_URL", devPort: 3001 },
  "hair-salon": { envKey: "NEXT_PUBLIC_DEMO_SALON_URL", devPort: 3002 },
  "dental-clinic": { envKey: "NEXT_PUBLIC_DEMO_DENTAL_URL", devPort: 3003 },
};

export function getDemoIframeSrc(slug: string): string {
  const config = DEMO_ORIGINS[slug];
  if (!config) return "";

  const envUrl = process.env[config.envKey];

  const origin = envUrl || `http://localhost:${config.devPort}`;
  return `${origin}/demos/${slug}`;
}
