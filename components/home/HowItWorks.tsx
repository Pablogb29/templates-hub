"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  MousePointerClick,
  FileText,
  Paintbrush,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Choose a Template",
    description:
      "Browse our collection of premium templates designed for specific industries. Each one is responsive, animated, and AI-ready.",
  },
  {
    icon: FileText,
    title: "Share Your Content",
    description:
      "Fill out a simple form with your business details, hours, services, and branding. We handle the rest.",
  },
  {
    icon: Paintbrush,
    title: "We Customize & Train",
    description:
      "We apply your content, configure the AI chatbot with your business data, and fine-tune every detail.",
  },
  {
    icon: Rocket,
    title: "Go Live",
    description:
      "Your site is deployed to a blazing-fast CDN with your custom domain. You're live and taking customers.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32" id="how-it-works">
      {/* Subtle bg */}
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          label="How It Works"
          title="From template to live site in 4 steps"
          subtitle="We've streamlined the process so you can focus on your business, not your website."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-8 transition-all hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)]"
            >
              {/* Step number */}
              <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-xs font-bold text-[var(--color-text-dim)]">
                {i + 1}
              </div>

              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                <step.icon className="h-6 w-6 text-[var(--color-primary-light)]" />
              </div>

              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
