"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type Template, getDemoIframeSrc } from "@/data/templates";
import { Button } from "@/components/ui/Button";
import {
  Check,
  ArrowLeft,
  ExternalLink,
  Bot,
  Star,
  Sparkles,
  Maximize2,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";
import Link from "next/link";

interface TemplateDetailProps {
  template: Template;
}

type PreviewDevice = "desktop" | "mobile";

export function TemplateDetail({ template }: TemplateDetailProps) {
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [fullscreen, setFullscreen] = useState(false);
  const iframeSrc = getDemoIframeSrc(template.slug);

  return (
    <>
      {/* Fullscreen demo overlay */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-black/80 backdrop-blur-sm px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: template.color }}
              />
              <span className="text-sm font-medium text-white">
                {template.name} — Live Demo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={iframeSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ExternalLink className="h-3 w-3" />
                New Tab
              </a>
              <button
                onClick={() => setFullscreen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Exit fullscreen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <iframe
            src={iframeSrc}
            className="h-full w-full border-0 pt-12"
            title={`${template.name} live demo`}
          />
        </div>
      )}

      <section className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/templates"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Templates
            </Link>
          </motion.div>

          <div className="grid gap-16 lg:grid-cols-5">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Badges */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)]">
                    {template.niche}
                  </span>
                  {template.tier === "pro" && (
                    <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary-light)]">
                      Pro
                    </span>
                  )}
                  {template.flagship && (
                    <span className="flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                      <Star className="h-3 w-3" />
                      Flagship
                    </span>
                  )}
                  {template.popular && (
                    <span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {template.name}
                </h1>
                <p className="mt-2 text-lg" style={{ color: template.color }}>
                  {template.tagline}
                </p>

                {/* Description */}
                <p className="mt-6 text-[var(--color-text-muted)] leading-relaxed">
                  {template.description}
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={() => setFullscreen(true)}
                    size="lg"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Full Screen Demo
                  </Button>
                  <Button href="/contact" variant="secondary" size="lg">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get This Website
                  </Button>
                </div>

                {/* AI chatbot note */}
                <div className="mt-8 rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-5 w-5 text-[var(--color-primary-light)]" />
                    <h3 className="font-semibold text-sm">
                      AI Chatbot Included
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    This template comes with a custom AI assistant trained on
                    your business data. It can answer questions about your
                    services, hours, pricing, and more — 24/7. Try it in the
                    live demo!
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: Live Preview + Features */}
            <div className="lg:col-span-3">
              {/* Live Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative mb-12"
              >
                {/* Preview toolbar */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: template.color }}
                    />
                    <span className="text-xs font-medium text-[var(--color-text-dim)]">
                      Live Preview
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Device toggle */}
                    <button
                      onClick={() => setDevice("desktop")}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        device === "desktop"
                          ? "bg-[var(--color-surface-hover)] text-white"
                          : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"
                      }`}
                      aria-label="Desktop preview"
                    >
                      <Monitor className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDevice("mobile")}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        device === "mobile"
                          ? "bg-[var(--color-surface-hover)] text-white"
                          : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"
                      }`}
                      aria-label="Mobile preview"
                    >
                      <Smartphone className="h-4 w-4" />
                    </button>
                    <div className="mx-1 h-4 w-px bg-[var(--color-border)]" />
                    {/* Fullscreen */}
                    <button
                      onClick={() => setFullscreen(true)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-dim)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-white"
                      aria-label="Fullscreen preview"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                    {/* New tab */}
                    <a
                      href={iframeSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-dim)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-white"
                      aria-label="Open in new tab"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* iframe container */}
                <div
                  className="relative mx-auto overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] transition-all duration-500"
                  style={{
                    maxWidth: device === "mobile" ? "375px" : "100%",
                  }}
                >
                  <div
                    className="relative transition-all duration-500"
                    style={{
                      aspectRatio: device === "mobile" ? "9/16" : "16/10",
                      maxHeight: device === "mobile" ? "667px" : "500px",
                    }}
                  >
                    <iframe
                      src={iframeSrc}
                      className="absolute inset-0 h-full w-full border-0"
                      title={`${template.name} live preview`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Highlights */}
              {template.highlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="mb-10 flex flex-wrap gap-3"
                >
                  {template.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border px-4 py-1.5 text-sm font-medium"
                      style={{
                        borderColor: `${template.color}33`,
                        color: template.color,
                        backgroundColor: `${template.color}08`,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="mb-6 text-xl font-bold">
                  What&apos;s Included
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {template.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-4 transition-colors hover:border-[var(--color-border-hover)]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        style={{ color: template.color }}
                      />
                      <span className="text-sm text-[var(--color-text-muted)]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-8 text-center"
              >
                <h3 className="text-xl font-bold">
                  Ready to use this template?
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Get in touch and we&apos;ll have your site live in days.
                </p>
                <div className="mt-6">
                  <Button href="/contact">Get This Website</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
