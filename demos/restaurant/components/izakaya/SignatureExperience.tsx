"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import AmbientBackground from "@/components/izakaya/AmbientBackground";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  sectionViewport,
  cardViewport,
} from "@/lib/motion";

const TILES = [
  {
    title: "Master Sushi",
    desc: "Expertly crafted nigiri and sashimi using the freshest seasonal fish flown in daily from Toyosu Market.",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    alt: "Close-up of fresh sashimi platter with tuna and salmon",
    icon: "🍣",
  },
  {
    title: "Authentic Izakaya",
    desc: "Small plates designed for sharing — wagyu skewers, tempura, and robata-grilled items over binchotan charcoal.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    alt: "Yakitori skewers grilling over charcoal with golden crust",
    icon: "🔥",
  },
  {
    title: "Premium Sake",
    desc: "A vast selection of rare sakes, shochu, and Japanese whiskies curated to complement every course.",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    alt: "Elegant cocktail being poured in a dimly lit bar",
    icon: "🍶",
  },
];

function TiltCard({
  tile,
}: {
  tile: (typeof TILES)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) scale(1.02)`;
  };

  const handleLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(800px) rotateY(0) rotateX(0) scale(1)";
  };

  return (
    <motion.div variants={staggerItem}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative rounded-2xl overflow-hidden cursor-pointer bg-surface border border-white/5 hover:border-primary/30 neon-glow-hover transition-all duration-500 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden relative">
          <Image
            src={tile.img}
            alt={tile.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              {tile.title}
            </h3>
            <span
              className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            >
              {tile.icon}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{tile.desc}</p>
        </div>

        {/* Hover glow border */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-primary/20 transition-all pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function SignatureExperience() {
  return (
    <section
      id="experience"
      className="py-28 px-4 sm:px-6 lg:px-8 relative bg-dark scroll-mt-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <AmbientBackground variant="section" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          custom={0}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div className="max-w-xl">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              Our Craft
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-medium">
              Signature Offerings
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm leading-relaxed">
            Curated selections from the Toyosu Market to your plate. Our chefs
            blend traditional techniques with modern flavor profiles.
          </p>
        </motion.div>

        {/* Cards — staggered entrance */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={cardViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TILES.map((t) => (
            <TiltCard key={t.title} tile={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
