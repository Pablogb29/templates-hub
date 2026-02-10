"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type Template, getDemoIframeSrc } from "@/data/templates";
import {
  ArrowLeft,
  ExternalLink,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react";

interface DemoEmbedProps {
  template: Template;
}

type DeviceView = "desktop" | "mobile";

/**
 * Full-page demo embed with a slim toolbar at the top.
 * The actual template content is loaded via iframe from
 * the demo sub-app running on its own port/domain.
 */
export function DemoEmbed({ template }: DemoEmbedProps) {
  const [device, setDevice] = useState<DeviceView>("desktop");

  const iframeSrc = getDemoIframeSrc(template.slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex h-screen flex-col bg-[var(--color-surface)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-2.5">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            href={`/templates/${template.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Details</span>
          </Link>
          <div className="hidden h-4 w-px bg-[var(--color-border)] sm:block" />
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: template.color }}
            />
            <span className="text-sm font-medium">{template.name}</span>
            {template.tier === "pro" && (
              <span className="rounded bg-[var(--color-primary)]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary-light)]">
                Pro
              </span>
            )}
          </div>
        </div>

        {/* Center: Device toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5">
          <button
            onClick={() => setDevice("desktop")}
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
              device === "desktop"
                ? "bg-[var(--color-surface-hover)] text-white"
                : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"
            }`}
            aria-label="Desktop view"
          >
            <Monitor className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
              device === "mobile"
                ? "bg-[var(--color-surface-hover)] text-white"
                : "text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]"
            }`}
            aria-label="Mobile view"
          >
            <Smartphone className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-white"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="hidden sm:inline">New Tab</span>
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
          >
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">Get This Template</span>
          </Link>
        </div>
      </div>

      {/* iframe */}
      <div className="flex flex-1 items-center justify-center overflow-hidden bg-[#111] p-0">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: device === "mobile" ? "375px" : "100%",
            maxWidth: "100%",
          }}
        >
          {mounted && (
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              className="h-full w-full border-0"
              title={`${template.name} live demo`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
