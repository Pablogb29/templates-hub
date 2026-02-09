"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Extra classes forwarded to the wrapper div */
  className?: string;
  /** Delay in ms before the transition starts */
  delay?: number;
  /** Direction the element slides in from */
  direction?: "up" | "left" | "right" | "none";
}

const OFFSETS: Record<string, string> = {
  up: "translate3d(0,24px,0)",
  left: "translate3d(-24px,0,0)",
  right: "translate3d(24px,0,0)",
  none: "none",
};

/**
 * Lightweight scroll-reveal wrapper.
 *
 * - Uses IntersectionObserver (fires once)
 * - Animates only `opacity` + `transform` → no layout shift
 * - Respects `prefers-reduced-motion`
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : OFFSETS[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
