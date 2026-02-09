"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Zap, Globe, Bot } from "lucide-react";

const stats = [
  { value: "3+", label: "Templates" },
  { value: "<7", label: "Days to Launch" },
  { value: "24/7", label: "AI Assistant" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh grid-pattern" />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[var(--color-primary)]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[var(--color-accent)]/6 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-medium text-[var(--color-primary-light)]">
              <Zap className="h-3.5 w-3.5" />
              AI-Powered Business Websites
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Beautiful websites with{" "}
            <span className="text-gradient">AI built in</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)] sm:text-xl"
          >
            Premium website templates with intelligent chatbots. Your business online
            in days, not months. Each site is responsive, animated, and powered by
            a custom AI assistant.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href="/templates" size="lg">
              Browse Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Book a Demo
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Globe, text: "Responsive & Fast" },
              { icon: Bot, text: "AI Chatbot Included" },
              { icon: Zap, text: "Deploy in Days" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-2 text-sm text-[var(--color-text-muted)]"
              >
                <Icon className="h-4 w-4 text-[var(--color-primary-light)]" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 flex items-center justify-center gap-12 sm:gap-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gradient sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-[var(--color-text-dim)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
