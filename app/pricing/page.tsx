import type { Metadata } from "next";
import { pricingTiers, addons } from "@/data/pricing";
import { PricingContent } from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing | TemplatesHub",
  description:
    "Transparent pricing for AI-powered websites. Choose Starter, Pro, or Pro+ to get your business online fast.",
};

export default function PricingPage() {
  return <PricingContent tiers={pricingTiers} addons={addons} />;
}
