"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Template } from "@/data/templates";
import { ArrowUpRight, Bot, ExternalLink, Star } from "lucide-react";

interface TemplateCardProps {
  template: Template;
  compact?: boolean;
}

export function TemplateCard({ template, compact }: TemplateCardProps) {
  return (
    <div
      className="card-glow relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] transition-all duration-300 hover:bg-[var(--color-surface-hover)]"
      style={{ "--card-color": template.colorMuted } as React.CSSProperties}
    >
      {/* Badges */}
      {(template.flagship || template.popular) && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {template.flagship && (
            <span className="flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
              <Star className="h-3 w-3" />
              Flagship
            </span>
          )}
          {template.popular && !template.flagship && (
            <span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white">
              Popular
            </span>
          )}
        </div>
      )}

      {/* Preview area — links to detail page */}
      <Link href={`/templates/${template.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-surface-raised)]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${template.color}22, transparent 60%)`,
            }}
          />
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div
                className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${template.color}15` }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: template.color }}
                >
                  {template.niche[0]}
                </span>
              </div>
              <p className="text-sm font-medium text-[var(--color-text-dim)]">
                {template.niche} Template
              </p>
            </div>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </motion.div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <Link href={`/templates/${template.slug}`} className="group block">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
              {template.name}
            </h3>
            {template.tier === "pro" && (
              <span className="rounded-md bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary-light)]">
                Pro
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-dim)]">
            {template.niche}
          </p>
        </Link>

        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {template.pitch}
        </p>

        {/* Feature tags */}
        {!compact && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-text-dim)]">
              <Bot className="h-3 w-3" />
              AI Chatbot
            </span>
            {template.features.slice(0, 2).map((f) => (
              <span
                key={f}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-text-dim)]"
              >
                {f.length > 30 ? f.slice(0, 28) + "..." : f}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/demos/${template.slug}`}
            className="btn-shine inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-lg hover:shadow-[var(--color-primary)]/20"
          >
            <ExternalLink className="h-3 w-3" />
            Live Demo
          </Link>
          <Link
            href={`/templates/${template.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-white"
          >
            Details
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
