"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80", alt: "Intimate fine dining table with warm candlelight", tall: true },
  { src: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80", alt: "Delicate sashimi platter artfully arranged", tall: false },
  { src: "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=600&q=80", alt: "Steaming ramen bowl with rich tonkotsu broth", tall: false },
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80", alt: "Signature cocktail with dry-ice smoke effect", tall: true },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80", alt: "Charcoal-grilled skewers with golden glaze", tall: false },
  { src: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=600&q=80", alt: "Moody restaurant interior with neon accents", tall: true },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80", alt: "Beautifully plated dessert with edible flowers", tall: false },
  { src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80", alt: "Traditional Japanese lantern-lit corridor", tall: false },
];

export default function GalleryMasonry() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null)),
    [],
  );
  const next = useCallback(
    () => setLightbox((i) => (i !== null ? (i + 1) % PHOTOS.length : null)),
    [],
  );

  /* Keyboard navigation */
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [lightbox, close, prev, next]);

  return (
    <section id="gallery" className="py-28 px-4 sm:px-6 lg:px-8 bg-surface scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            The Vibe
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Gallery
          </h2>
        </div>

        {/* Masonry grid (CSS columns) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {PHOTOS.map((p, i) => (
            <motion.button
              key={p.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onClick={() => setLightbox(i)}
              className="block w-full break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Open photo: ${p.alt}`}
            >
              <div className={p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-dark/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  View
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white hover:text-primary p-2 z-10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary p-2 z-10 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary p-2 z-10 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PHOTOS[lightbox].src.replace("w=600", "w=1400")}
                alt={PHOTOS[lightbox].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Counter */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
              {lightbox + 1} / {PHOTOS.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
