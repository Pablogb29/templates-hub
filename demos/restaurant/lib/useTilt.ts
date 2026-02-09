"use client";

import { useRef, useCallback } from "react";

interface TiltOptions {
  /** Max rotation in degrees (default 6) */
  maxTilt?: number;
  /** Scale factor on hover (default 1.02) */
  scale?: number;
  /** Perspective in px (default 800) */
  perspective?: number;
  /** Transition speed for reset (default "0.5s") */
  resetSpeed?: string;
}

/**
 * Lightweight 3-D tilt hook.
 *
 * Returns a ref to attach to the card element plus mouse handlers.
 * Works with `will-change-transform` and `transform-style: preserve-3d`
 * for GPU-accelerated compositing.
 *
 * Applies no transform on touch devices (pointer: coarse) to avoid
 * interfering with scrolling.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  maxTilt = 6,
  scale = 1.02,
  perspective = 800,
  resetSpeed = "0.5s",
}: TiltOptions = {}) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      // skip on touch devices
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      el.style.transition = "transform 0.1s ease-out";
      el.style.transform = `perspective(${perspective}px) rotateY(${
        x * maxTilt
      }deg) rotateX(${y * -maxTilt}deg) scale(${scale})`;
    },
    [maxTilt, scale, perspective],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${resetSpeed} cubic-bezier(0.22,1,0.36,1)`;
    el.style.transform = `perspective(${perspective}px) rotateY(0deg) rotateX(0deg) scale(1)`;
  }, [perspective, resetSpeed]);

  return { ref, onMouseMove, onMouseLeave } as const;
}
