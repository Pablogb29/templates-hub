"use client";

import { useRef, useState, useCallback } from "react";

const AFTER_IMG =
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80";
const BEFORE_IMG =
  "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=1200&q=80";

const benefits = [
  {
    icon: "face",
    title: "Aesthetic Perfection",
    desc: "Matching colour, shape and translucency to your natural teeth.",
  },
  {
    icon: "health_and_safety",
    title: "Long-Lasting Health",
    desc: "Functional improvements for bite alignment and jaw comfort.",
  },
];

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  }, []);

  const start = () => {
    dragging.current = true;
  };
  const stop = () => {
    dragging.current = false;
  };

  return (
    <section id="results" className="py-20 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ── Copy ── */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight mb-4">
              Real Results, Real Smiles
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              See transformations from our patients. We take pride in creating
              natural-looking results that restore both confidence and function.
            </p>

            <ul className="space-y-4">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-3.5">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-primary shrink-0">
                    <span className="material-symbols-outlined">{b.icon}</span>
                  </span>
                  <div>
                    <h4 className="font-bold text-secondary">{b.title}</h4>
                    <p className="text-sm text-gray-500">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button className="mt-8 text-secondary font-bold border-b-2 border-primary hover:text-primary transition-colors pb-0.5">
              View Full Gallery
            </button>
          </div>

          {/* ── Interactive slider ── */}
          <div className="space-y-2">
            <div
              ref={containerRef}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl select-none touch-none cursor-ew-resize"
              onMouseMove={(e) => move(e.clientX)}
              onMouseDown={start}
              onMouseUp={stop}
              onMouseLeave={stop}
              onTouchMove={(e) => move(e.touches[0].clientX)}
              onTouchStart={start}
              onTouchEnd={stop}
            >
              {/* After — base layer */}
              <img
                src={AFTER_IMG}
                alt="After treatment"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <span className="absolute top-3 right-3 bg-primary text-secondary text-[11px] font-bold px-2 py-0.5 rounded z-20">
                AFTER
              </span>

              {/* Before — clipped overlay */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  clipPath: `inset(0 ${100 - pos}% 0 0)`,
                }}
              >
                <img
                  src={BEFORE_IMG}
                  alt="Before treatment"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <span className="absolute top-3 left-3 bg-gray-800 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  BEFORE
                </span>
              </div>

              {/* Divider + handle */}
              <div
                className="absolute inset-y-0 z-30"
                style={{ left: `${pos}%` }}
              >
                <div className="absolute inset-y-0 -translate-x-1/2 w-[3px] bg-white/90" />
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-sm">
                    code
                  </span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">swipe</span>
              Drag to compare
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
