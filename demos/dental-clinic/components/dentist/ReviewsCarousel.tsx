"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Marie Dubois",
    role: "Veneers Patient",
    text: "I was terrified of dentists until I found WhitePeak. The team is incredibly gentle, and the results are absolutely stunning. I can\u2019t stop smiling!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Thomas Müller",
    role: "Implant Patient",
    text: "Professional from start to finish. The digital scanning was impressive and the implant procedure was completely painless. Highly recommend.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Sophie Laurent",
    role: "Invisalign Patient",
    text: "Dr. Jenkins made the whole Invisalign journey seamless. My teeth are perfectly aligned now and nobody even knew I was wearing aligners!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
];

export default function ReviewsCarousel() {
  const [idx, setIdx] = useState(0);
  const r = reviews[idx];

  return (
    <section
      id="reviews"
      className="relative py-24 bg-secondary text-white overflow-hidden"
    >
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(#13ecda 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <span className="material-symbols-outlined text-5xl text-primary mb-4 block">
          format_quote
        </span>

        <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-8 min-h-[120px]">
          &ldquo;{r.text}&rdquo;
        </p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src={r.avatar}
            alt={r.name}
            className="w-11 h-11 rounded-full border-2 border-primary object-cover"
            loading="lazy"
          />
          <div className="text-left">
            <p className="font-bold text-sm">{r.name}</p>
            <p className="text-xs text-gray-400">{r.role}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === idx ? "bg-primary" : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
