"use client";

import { motion } from "framer-motion";
import { type PricingTier, type PricingAddon } from "@/data/pricing";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

interface PricingContentProps {
  tiers: PricingTier[];
  addons: PricingAddon[];
}

export function PricingContent({ tiers, addons }: PricingContentProps) {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
            Pricing
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
            One-time payment. No subscriptions, no hidden fees. You own your website.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-24"
        >
          <h2 className="mb-8 text-center text-2xl font-bold">
            Optional Add-ons
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 transition-colors hover:border-[var(--color-border-hover)]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-[var(--color-primary-light)]" />
                  <span className="text-sm font-semibold">{addon.name}</span>
                </div>
                <p className="mb-3 text-xs text-[var(--color-text-muted)]">
                  {addon.description}
                </p>
                <p className="text-lg font-bold text-[var(--color-primary-light)]">
                  {addon.price}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-24 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-10 text-center"
        >
          <h3 className="text-xl font-bold">
            Not sure which plan is right for you?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--color-text-muted)]">
            Book a free 15-minute call and we&apos;ll help you choose the best
            option for your business. No commitment required.
          </p>
          <div className="mt-6">
            <Button href="/contact">Book a Free Call</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
