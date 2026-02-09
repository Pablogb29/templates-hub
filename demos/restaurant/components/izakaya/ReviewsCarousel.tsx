"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { useTilt } from "@/lib/useTilt";
import { fadeInUp, staggerContainer, staggerItem, sectionViewport } from "@/lib/motion";

const REVIEWS = [
  {
    name: "Sakura M.",
    date: "Jan 2026",
    stars: 5,
    text: "An absolutely transcendent experience. The omakase was unlike anything I've had outside of Tokyo. Every course was a masterpiece.",
    source: "Google",
  },
  {
    name: "James L.",
    date: "Dec 2025",
    stars: 5,
    text: "The atmosphere alone is worth the visit — neon lights, dark wood, and incredible attention to detail. The wagyu tataki melted on my tongue.",
    source: "Yelp",
  },
  {
    name: "Aiko T.",
    date: "Jan 2026",
    stars: 5,
    text: "Best sake selection in the city, hands down. The staff walked us through a tasting flight that perfectly complemented our meal.",
    source: "TripAdvisor",
  },
  {
    name: "Marco D.",
    date: "Feb 2026",
    stars: 4,
    text: "The robata grill section is a must-try. Watching the chef work with the binchotan charcoal was mesmerizing. Book the counter seats!",
    source: "Google",
  },
  {
    name: "Priya K.",
    date: "Nov 2025",
    stars: 5,
    text: "We came for a birthday dinner and the team made it unforgettable. The private dining room is stunning — pure Tokyo-meets-cyberpunk vibes.",
    source: "OpenTable",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count ? "fill-primary text-primary" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Tilt-enabled review card ── */

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>({
    maxTilt: 4,
    scale: 1.01,
  });

  return (
    <motion.article
      variants={staggerItem}
      className="shrink-0 snap-start"
      role="listitem"
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="glass rounded-2xl p-6 md:p-8 min-w-[300px] sm:min-w-[360px] max-w-[400px] flex flex-col h-full will-change-transform hover:border-primary/20 neon-glow-hover transition-shadow"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Quote
          className="w-8 h-8 text-primary/30 mb-4 -scale-x-100"
          aria-hidden="true"
        />
        <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
          &ldquo;{r.text}&rdquo;
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-sm">{r.name}</p>
            <p className="text-gray-500 text-xs">
              {r.date} · {r.source}
            </p>
          </div>
          <Stars count={r.stars} />
        </div>
      </div>
    </motion.article>
  );
}

/* ── Main component ── */

export default function ReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="reviews"
      className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0f0f] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          custom={0}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6"
        >
          <div>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              What They Say
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Guest Reviews
            </h2>
          </div>
          {/* Navigation arrows (desktop) */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel — staggered entrance */}
        <motion.div
          ref={scrollRef}
          onScroll={checkScroll}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4"
          role="list"
          aria-label="Guest reviews"
        >
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} r={r} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
