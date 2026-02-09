import { Hero } from "@/components/home/Hero";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TemplateShowcase />
      <HowItWorks />
      <CTASection />
    </>
  );
}
