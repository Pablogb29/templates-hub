"use client";

import { useEffect, useRef, useState } from "react";

/* ── Stat config ── */

interface StatConfig {
  icon: string;
  label: string;
  /** Numeric target for the counter animation */
  target?: number;
  /** Decimal places to show (default 0) */
  decimals?: number;
  /** Text appended after the number ("+", etc.) */
  suffix?: string;
  /** Static text instead of animated counter (e.g. "24/7") */
  display?: string;
  /** Use thin-space thousands separator */
  formatSpace?: boolean;
}

const stats: StatConfig[] = [
  {
    icon: "workspace_premium",
    target: 15,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: "groups",
    target: 10000,
    suffix: "+",
    label: "Happy Patients",
    formatSpace: true,
  },
  { icon: "emergency", display: "24/7", label: "Emergency Care" },
  { icon: "star", target: 4.9, decimals: 1, label: "Google Rating" },
];

/* ── Section ── */

export default function TrustStats() {
  return (
    <section
      className="bg-white border-y border-gray-100"
      aria-label="Key statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-gray-100">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center px-4"
            >
              <span
                className="material-symbols-outlined text-primary text-2xl mb-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {s.icon}
              </span>
              <p
                className="text-3xl md:text-4xl font-black text-secondary tracking-tight"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {s.display ?? (
                  <AnimatedCounter
                    target={s.target!}
                    decimals={s.decimals ?? 0}
                    suffix={s.suffix ?? ""}
                    formatSpace={s.formatSpace}
                  />
                )}
              </p>
              <p className="text-sm font-medium text-gray-500 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Animated counter ──
   Each counter self-observes with IntersectionObserver,
   animates via rAF, and respects prefers-reduced-motion. */

function AnimatedCounter({
  target,
  decimals = 0,
  suffix = "",
  formatSpace,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  formatSpace?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          if (reduced) {
            setValue(target);
            return;
          }

          const duration = 1800;
          const t0 = performance.now();

          function tick(now: number) {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
            const raw = eased * target;
            setValue(
              decimals > 0
                ? Math.round(raw * 10 ** decimals) / 10 ** decimals
                : Math.round(raw),
            );
            if (p < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  /* Format: thin space (\u2009) for thousands, fixed decimals */
  const display = formatSpace
    ? String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009")
    : decimals > 0
      ? value.toFixed(decimals)
      : String(Math.round(value));

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {display}
      {suffix}
    </span>
  );
}
