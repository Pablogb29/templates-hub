"use client";

import { motion } from "framer-motion";
import { type PricingTier } from "@/data/pricing";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

export function PricingCard({ tier, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
        tier.highlight
          ? "border-[var(--color-primary)]/40 bg-[var(--color-surface-card)] glow-primary scale-[1.02]"
          : "border-[var(--color-border)] bg-[var(--color-surface-card)] hover:border-[var(--color-border-hover)]"
      }`}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className={`rounded-full px-4 py-1 text-xs font-semibold ${
              tier.highlight
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]"
            }`}
          >
            {tier.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold">{tier.name}</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight">
            {tier.price}
          </span>
          <span className="text-sm text-[var(--color-text-dim)]">
            {tier.period}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {tier.description}
        </p>
      </div>

      {/* Deliverables */}
      <ul className="mb-8 flex-1 space-y-3">
        {tier.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm">
            <Check
              className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                tier.highlight
                  ? "text-[var(--color-primary-light)]"
                  : "text-[var(--color-text-dim)]"
              }`}
            />
            <span className="text-[var(--color-text-muted)]">{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        href="/contact"
        variant={tier.highlight ? "primary" : "secondary"}
        className="w-full"
      >
        {tier.cta}
      </Button>
    </motion.div>
  );
}
