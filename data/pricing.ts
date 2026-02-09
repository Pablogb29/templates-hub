export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  deliverables: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "€1,200",
    period: "one-time",
    description:
      "A beautiful, responsive website based on one of our templates. Perfect for getting online fast.",
    deliverables: [
      "1 template of your choice",
      "Your branding & content applied",
      "Responsive design (mobile + desktop)",
      "Basic SEO setup",
      "Contact form",
      "Deployed to your domain",
      "1 round of revisions",
      "Delivery in 5 business days",
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    price: "€2,400",
    period: "one-time",
    description:
      "Everything in Starter, plus the AI chatbot and premium animations that make your site stand out.",
    deliverables: [
      "Everything in Starter",
      "AI chatbot trained on your business",
      "Premium animations & transitions",
      "Interactive service/menu navigator",
      "Reviews carousel",
      "Google Maps integration",
      "2 rounds of revisions",
      "Delivery in 7 business days",
    ],
    cta: "Go Pro",
    highlight: true,
    badge: "Most Popular",
  },
  {
    id: "pro-plus",
    name: "Pro+",
    price: "€3,800",
    period: "one-time",
    description:
      "The full package. Custom design, advanced chatbot, and ongoing support to grow your business.",
    deliverables: [
      "Everything in Pro",
      "Custom design modifications",
      "Advanced chatbot with booking integration",
      "Multi-language support",
      "Analytics & conversion tracking",
      "Performance optimization (Lighthouse 90+)",
      "3 rounds of revisions",
      "30 days post-launch support",
      "Delivery in 10 business days",
    ],
    cta: "Go Premium",
    badge: "Full Package",
  },
];

export interface PricingAddon {
  name: string;
  price: string;
  description: string;
}

export const addons: PricingAddon[] = [
  {
    name: "Monthly AI Chatbot Hosting",
    price: "€49/mo",
    description: "OpenAI API usage, monitoring, and chatbot updates",
  },
  {
    name: "Additional Revision Round",
    price: "€200",
    description: "One extra round of design and content changes",
  },
  {
    name: "Content Writing",
    price: "€400",
    description: "Professional copywriting for all website sections",
  },
  {
    name: "Ongoing Maintenance",
    price: "€99/mo",
    description: "Monthly updates, backups, and technical support",
  },
];
