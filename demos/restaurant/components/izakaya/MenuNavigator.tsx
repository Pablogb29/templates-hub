"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Menu data ── */
interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}

interface Category {
  key: string;
  label: string;
  icon: string;
  items: MenuItem[];
}

const CATEGORIES: Category[] = [
  {
    key: "starters",
    label: "Starters",
    icon: "🥢",
    items: [
      { name: "Truffle Edamame", desc: "Steamed soybeans, truffle oil, maldon salt", price: "$12", tag: "V" },
      { name: "Wagyu Beef Tataki", desc: "Seared A5 wagyu, ponzu, crispy garlic, scallion", price: "$32" },
      { name: "Spicy Tuna Crispy Rice", desc: "Crispy sushi rice, spicy tuna tartare, jalapeño", price: "$18" },
      { name: "Miso Black Cod", desc: "Sustainably sourced cod, sweet miso glaze, hajikami", price: "$28" },
      { name: "Pork Gyoza", desc: "Pan-fried dumplings, spicy ponzu dipping sauce", price: "$12" },
      { name: "Karaage Chicken", desc: "Japanese fried chicken, yuzu kosho mayo, lemon", price: "$14" },
    ],
  },
  {
    key: "sushi",
    label: "Sushi & Raw",
    icon: "🍣",
    items: [
      { name: "Omakase Sashimi Deluxe", desc: "15-piece chef's selection — Otoro, Chutoro, Uni, Scallop", price: "$85", tag: "GF" },
      { name: "Bluefin Tuna Flight", desc: "Akami, Chutoro, Otoro, Negitoro gunkan", price: "$45" },
      { name: "Hamachi Jalapeño", desc: "Yellowtail sashimi, yuzu soy, serrano, cilantro", price: "$24" },
      { name: "Truffle Salmon Roll", desc: "Spicy salmon, cucumber, seared salmon, truffle oil", price: "$22" },
      { name: "A5 Wagyu Uni Nigiri", desc: "Seared Miyazaki A5 wagyu, Hokkaido uni, caviar (2 pc)", price: "$32" },
    ],
  },
  {
    key: "robata",
    label: "Robata Grill",
    icon: "🔥",
    items: [
      { name: "Negima (Chicken Thigh)", desc: "Tare glaze, scallion — 2 skewers", price: "$8" },
      { name: "Tsukune (Meatball)", desc: "Egg yolk dip, sweet soy — 2 skewers", price: "$9" },
      { name: "Lamb Chop", desc: "Korean spice rub, kimchi cucumber", price: "$18" },
      { name: "Miso Black Cod", desc: "Marinated 72 hours in saikyo miso", price: "$36" },
      { name: "King Trumpet Mushroom", desc: "Soy butter, shichimi pepper", price: "$12", tag: "V" },
      { name: "Asparagus Bacon", desc: "Smoked bacon wrapped asparagus — 2 skewers", price: "$7" },
    ],
  },
  {
    key: "drinks",
    label: "Sake & Spirits",
    icon: "🍶",
    items: [
      { name: "Dassai 45 Junmai Daiginjo", desc: "Clean, soft, sweet melon — glass / bottle", price: "$16 / $75" },
      { name: "Kubota Manju", desc: "Complex, floral, refined — glass / bottle", price: "$28 / $140" },
      { name: "Kikusui Perfect Snow", desc: "Nigori unfiltered — rich, sweet, full-bodied", price: "$12 / $55" },
      { name: "Tokyo Mule", desc: "Vodka, yuzu, ginger beer, cucumber", price: "$16" },
      { name: "Lychee Martini", desc: "Gin, lychee liqueur, fresh lime", price: "$17" },
    ],
  },
];

export default function MenuNavigator() {
  const [activeKey, setActiveKey] = useState(CATEGORIES[0].key);
  const activeCat = CATEGORIES.find((c) => c.key === activeKey)!;

  return (
    <section
      id="menu"
      className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-dark scroll-mt-20"
    >
      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            Taste The Night
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Menu Highlights
          </h2>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-14"
          role="tablist"
          aria-label="Menu categories"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={activeKey === c.key}
              aria-controls={`panel-${c.key}`}
              onClick={() => setActiveKey(c.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeKey === c.key
                  ? "bg-primary text-dark neon-glow-sm"
                  : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
              }`}
            >
              <span aria-hidden="true" className="mr-1.5">
                {c.icon}
              </span>
              {c.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            id={`panel-${activeKey}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
          >
            {activeCat.items.map((item) => (
              <div
                key={item.name}
                className="group flex justify-between items-end border-b border-white/5 pb-4 hover:border-primary/20 transition-colors"
              >
                <div className="flex flex-col gap-1 pr-4">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white text-lg font-medium group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    {item.tag && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
                <span className="text-primary font-bold text-lg shrink-0">
                  {item.price}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View full menu link */}
        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white hover:text-primary font-medium transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            View Full Menu
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
