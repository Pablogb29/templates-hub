/**
 * lib/motion.ts
 * ─────────────
 * Centralised Framer-Motion variants, transitions & helpers
 * for the Izakaya Yoru "Pro" flagship theme.
 *
 * Every component should import from here instead of
 * hand-writing animation props.
 *
 * ✦ PRO enhancements:
 *   - Refined stagger timing (0.08s children delay for snappier reveals)
 *   - New parallax-ready variants (parallaxFadeUp, depthReveal)
 *   - Hover depth variant for cards (hoverLift)
 *   - Smoother spring presets (springGentle for subtle interactions)
 *   - Section-level stagger orchestration helper
 */

import type { Variants, Transition } from "framer-motion";

/* ================================================================
   Transition presets
   ================================================================ */

/** Smooth ease-out curve (default for most reveals) */
export const smooth: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

/** Snappy spring for buttons / interactive elements */
export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 22,
};

/** Gentle spring for hover/depth effects */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 20,
  mass: 0.8,
};

/** Slow cinematic reveal for hero text */
export const cinematic: Transition = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1],
};

/** Extra-slow reveal for parallax layers */
export const parallaxEase: Transition = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94],
};

/* ================================================================
   Reusable variant sets
   ================================================================ */

/** Fade-in + slide up (most common pattern) */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...smooth, delay },
  }),
};

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

/** Scale up from 95 % */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { ...smooth, delay },
  }),
};

/** Slide from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { ...smooth, delay },
  }),
};

/** Slide from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { ...smooth, delay },
  }),
};

/* ── Stagger container / item pair ── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smooth,
  },
};

/* ── PRO: Wide stagger for sections with many children ── */

export const staggerContainerWide: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/* ── PRO: Parallax-aware fade up (deeper initial offset) ── */

export const parallaxFadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...parallaxEase, delay },
  }),
};

/* ── PRO: Depth reveal — scale + blur + fade for layered sections ── */

export const depthReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/* ── PRO: Hover lift for interactive cards ── */

export const hoverLift = {
  y: -6,
  transition: springGentle,
};

export const hoverLiftSubtle = {
  y: -3,
  scale: 1.01,
  transition: springGentle,
};

/* ── Hero-specific cinematic entrance ── */

export const heroText: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...cinematic, delay },
  }),
};

export const heroCTA: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...smooth, delay },
  }),
};

/* ── Glow blob float (for AmbientBackground) ── */

export const blobFloat: Variants = {
  initial: { scale: 1, x: 0, y: 0 },
  animate: (i: number) => ({
    scale: [1, 1.15, 0.95, 1.08, 1],
    x: [0, 30, -20, 15, 0],
    y: [0, -25, 15, -10, 0],
    transition: {
      duration: 18 + i * 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror" as const,
    },
  }),
};

/* ================================================================
   Viewport / scroll-trigger defaults
   ================================================================ */

/** Standard section reveal trigger */
export const sectionViewport = {
  once: true,
  margin: "-80px" as const,
};

/** Tight trigger for cards / smaller elements */
export const cardViewport = {
  once: true,
  margin: "-60px" as const,
};

/** PRO: Early trigger for parallax elements (start animation sooner) */
export const parallaxViewport = {
  once: true,
  margin: "-120px" as const,
};
