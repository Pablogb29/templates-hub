"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { CalendarCheck, ChevronUp } from "lucide-react";

/**
 * PRO: Sticky desktop mini-CTA "Reserve" pill.
 *
 * ✦ Slides in after scrolling past the hero (≈ 100 vh)
 * ✦ Smooth spring entrance with subtle glow pulse
 * ✦ Hover shows expanded state with "Reserve a Table" text
 * ✦ Respects prefers-reduced-motion
 * ✦ Hidden on mobile where StickyCTA covers the same function
 */
export default function StickyDesktopReserve() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = globalThis.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > globalThis.innerHeight);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
            mass: 0.8,
          }}
          className="fixed bottom-8 right-8 z-40 hidden lg:flex flex-col items-end gap-3"
        >
          {/* Reserve button */}
          <motion.a
            href="#reserve"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={
              reducedMotion
                ? {}
                : {
                    scale: 1.04,
                    boxShadow:
                      "0 0 30px rgba(13, 242, 242, 0.35), 0 0 80px rgba(13, 242, 242, 0.12)",
                  }
            }
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2.5 glass rounded-full pl-5 pr-6 py-3 border border-primary/20 hover:border-primary/50 neon-glow-sm transition-all shadow-2xl shadow-black/50 cursor-pointer"
            aria-label="Reserve a table"
          >
            <span className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
              <CalendarCheck className="w-4 h-4 text-primary" />
            </span>
            <span className="text-white text-sm font-bold uppercase tracking-wider group-hover:text-primary transition-colors">
              Reserve
            </span>
          </motion.a>

          {/* PRO: Back to top micro-button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            className="flex h-8 w-8 items-center justify-center rounded-full glass border border-white/10 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 text-white" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
