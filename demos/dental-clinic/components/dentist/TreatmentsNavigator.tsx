"use client";

import { useState } from "react";
import Reveal from "./Reveal";

/* ── types ── */
type Category = "all" | "cosmetic" | "general" | "orthodontics";

const chips: { key: Category; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: "cosmetic", label: "Cosmetic" },
  { key: "general", label: "General" },
  { key: "orthodontics", label: "Orthodontics" },
];

const treatments: {
  category: Category;
  title: string;
  description: string;
  image: string;
}[] = [
  {
    category: "cosmetic",
    title: "Porcelain Veneers",
    description:
      "Transform your smile with custom-made veneers that look and feel completely natural.",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "general",
    title: "Dental Implants",
    description:
      "Permanent, biocompatible solution for missing teeth — restore function and aesthetics.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "orthodontics",
    title: "Invisalign®",
    description:
      "Straighten your teeth discreetly with clear aligners. No metal braces required.",
    image:
      "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "cosmetic",
    title: "Teeth Whitening",
    description:
      "Professional-grade whitening for a brighter, more confident smile in one visit.",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "general",
    title: "Root Canal Therapy",
    description:
      "Painless endodontic treatment to save damaged teeth using modern rotary instruments.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "orthodontics",
    title: "Ceramic Braces",
    description:
      "Tooth-coloured brackets for effective alignment with a subtle, refined look.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TreatmentsNavigator() {
  const [active, setActive] = useState<Category>("all");

  const visible =
    active === "all"
      ? treatments
      : treatments.filter((t) => t.category === active);

  return (
    <section id="treatments" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight">
              Comprehensive Treatments
            </h2>
            <p className="mt-3 text-gray-500">
              From routine check-ups to advanced cosmetic procedures — every
              angle covered.
            </p>
          </div>
        </Reveal>

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {chips.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === c.key
                  ? "bg-secondary text-white shadow-md ring-2 ring-secondary ring-offset-2"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((t) => (
            <article
              key={t.title}
              className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/0 transition-colors z-10" />
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur text-[11px] font-bold px-2.5 py-1 rounded text-secondary capitalize">
                  {t.category}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 bg-white">
                <h3 className="text-lg font-bold text-secondary mb-1.5">
                  {t.title}
                </h3>
                <p className="text-sm text-gray-500 flex-1 mb-3">
                  {t.description}
                </p>
                <span className="inline-flex items-center text-accent text-sm font-bold group-hover:translate-x-1 transition-transform">
                  Learn More
                  <span className="material-symbols-outlined text-base ml-1">
                    arrow_forward
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
