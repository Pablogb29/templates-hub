"use client";

import { useEffect, useState } from "react";

/**
 * Desktop-only floating "Book" pill that fades in once the user
 * scrolls past the hero booking section.
 *
 * - Hidden on mobile / tablet (StickyCTA handles that)
 * - Uses IntersectionObserver for zero-scroll-event overhead
 * - Positioned bottom-left to avoid overlap with the Botpress FAB (bottom-right)
 */
export default function StickyBookCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("booking");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`hidden lg:flex fixed bottom-6 left-6 z-40 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <a
        href="#booking"
        className="group flex items-center gap-2 bg-secondary text-white text-sm font-bold py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-[0.97] ring-1 ring-white/10"
      >
        <span className="material-symbols-outlined text-primary text-[18px]">
          calendar_month
        </span>
        Book Free Consultation
        <span className="material-symbols-outlined text-primary/60 text-[16px] transition-transform group-hover:translate-x-0.5">
          arrow_forward
        </span>
      </a>
    </div>
  );
}
