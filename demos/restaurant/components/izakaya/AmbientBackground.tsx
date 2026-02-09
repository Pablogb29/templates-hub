"use client";

import { motion, useReducedMotion } from "framer-motion";
import { blobFloat } from "@/lib/motion";

/* ── Blob descriptor ── */
export interface GlowBlob {
  /** Tailwind-style colour token (primary | secondary | white) */
  color?: "primary" | "secondary" | "white";
  /** Blob diameter in rem */
  size?: number;
  /** CSS top / left positioning */
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  /** Extra animation delay index (offsets phase) */
  phase?: number;
}

/* ── Presets ── */

const HERO_BLOBS: GlowBlob[] = [
  { color: "primary", size: 32, top: "15%", left: "18%", phase: 0 },
  { color: "secondary", size: 28, bottom: "25%", right: "15%", phase: 1 },
  { color: "primary", size: 20, bottom: "10%", left: "40%", phase: 2 },
];

const SECTION_BLOBS: GlowBlob[] = [
  { color: "primary", size: 24, top: "10%", right: "10%", phase: 0 },
  { color: "secondary", size: 18, bottom: "15%", left: "12%", phase: 1 },
];

const SUBTLE_BLOBS: GlowBlob[] = [
  { color: "primary", size: 16, top: "20%", right: "20%", phase: 0 },
];

export const presets = {
  hero: HERO_BLOBS,
  section: SECTION_BLOBS,
  subtle: SUBTLE_BLOBS,
} as const;

/* ── Colour map ── */
const COLOR_MAP: Record<string, string> = {
  primary: "rgba(13, 242, 242, 0.12)",
  secondary: "rgba(242, 13, 207, 0.10)",
  white: "rgba(255, 255, 255, 0.04)",
};

/* ── Component ── */

interface Props {
  /** Use a named preset or supply custom blobs */
  variant?: keyof typeof presets;
  blobs?: GlowBlob[];
  className?: string;
}

export default function AmbientBackground({
  variant,
  blobs,
  className = "",
}: Props) {
  const prefersReduced = useReducedMotion();
  const items = blobs ?? (variant ? presets[variant] : HERO_BLOBS);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {items.map((blob, i) => {
        const size = blob.size ?? 24;
        const bg = COLOR_MAP[blob.color ?? "primary"];

        return (
          <motion.div
            key={i}
            variants={blobFloat}
            initial="initial"
            animate={prefersReduced ? "initial" : "animate"}
            custom={blob.phase ?? i}
            className="absolute rounded-full will-change-transform"
            style={{
              width: `${size}rem`,
              height: `${size}rem`,
              top: blob.top,
              left: blob.left,
              bottom: blob.bottom,
              right: blob.right,
              background: `radial-gradient(circle, ${bg} 0%, transparent 70%)`,
              filter: `blur(${Math.round(size * 3.5)}px)`,
            }}
          />
        );
      })}
    </div>
  );
}
