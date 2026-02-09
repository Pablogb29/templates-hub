"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-card)]"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/10 blur-[100px]" />

          <div className="relative px-8 py-20 text-center sm:px-16 lg:px-24">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to launch your{" "}
              <span className="text-gradient">AI-powered website</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-text-muted)]">
              Pick a template, share your business details, and we&apos;ll have you
              live in days. No design skills required.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/templates" size="lg">
                See Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Book a Call
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
