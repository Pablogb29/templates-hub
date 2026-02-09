"use client";

import { useRef } from "react";

const reviews = [
  {
    quote:
      "Absolutely the best salon experience I've had. Sarah listened to exactly what I wanted and the results are stunning.",
    initials: "JD",
    name: "Jane Doe",
    service: "Regular Client",
  },
  {
    quote:
      "Marco is a color genius! He fixed a botched dye job from another place and made my hair look healthier than ever.",
    initials: "ML",
    name: "Maria Lopez",
    service: "Balayage Service",
  },
  {
    quote:
      "Love the ambiance and the professionalism. The scalp massage during the wash is heavenly!",
    initials: "AS",
    name: "Alex Smith",
    service: "Modern Cut",
  },
  {
    quote:
      "Elena worked magic on my curls. For the first time in years I left a salon actually loving my hair texture.",
    initials: "TW",
    name: "Taylor Williams",
    service: "Texture Treatment",
  },
];

function Stars() {
  return (
    <div className="mb-4 flex gap-0.5 text-primary" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="material-symbols-outlined !text-lg" aria-hidden="true">
          star
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="border-t border-border bg-bg px-5 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <h2 id="reviews-heading" className="text-3xl font-bold font-serif sm:text-4xl lg:text-5xl">
            Client Love
          </h2>
          <div className="flex gap-2" role="group" aria-label="Carousel controls">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous reviews"
              className="flex size-10 items-center justify-center rounded-full border border-border transition-all hover:border-primary hover:bg-primary hover:text-white"
            >
              <span className="material-symbols-outlined !text-xl" aria-hidden="true">
                arrow_back
              </span>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next reviews"
              className="flex size-10 items-center justify-center rounded-full border border-border transition-all hover:border-primary hover:bg-primary hover:text-white"
            >
              <span className="material-symbols-outlined !text-xl" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          role="region"
          aria-label="Client testimonials"
          className="hide-scrollbar flex snap-x gap-5 overflow-x-auto pb-4 lg:gap-6"
        >
          {reviews.map((r) => (
            <article
              key={r.name}
              className="w-[85vw] min-w-[280px] max-w-[400px] flex-shrink-0 snap-center rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
            >
              <Stars />
              <blockquote className="mb-6 font-serif text-base italic leading-relaxed text-text sm:text-lg">
                <p>&ldquo;{r.quote}&rdquo;</p>
              </blockquote>
              <footer className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-beige text-sm font-bold text-text-muted" aria-hidden="true">
                  {r.initials}
                </span>
                <div>
                  <cite className="not-italic text-sm font-bold">{r.name}</cite>
                  <p className="text-xs text-text-muted">{r.service}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
