"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "experience", label: "Experience" },
  { id: "omakase", label: "Omakase" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "ritual", label: "Evening" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "location", label: "Visit" },
];

export default function NavbarIzakaya() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* active section observer */
  useEffect(() => {
    const els = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = useCallback(
    (id: string) => {
      setOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    [],
  );

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-2xl shadow-black/40"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* ── Logo ── */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            aria-label="Izakaya Yoru – Home"
          >
            <span className="w-9 h-9 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary font-serif text-base select-none">
              夜
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-white text-lg font-bold tracking-[0.15em]">
                IZAKAYA
              </span>
              <span className="text-primary text-[10px] font-bold tracking-[0.35em] mt-0.5">
                YORU
              </span>
            </div>
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-0.5" role="menubar">
            {LINKS.map((l) => (
              <button
                key={l.id}
                role="menuitem"
                onClick={() => go(l.id)}
                className={`relative px-3 py-2 text-[11px] font-bold uppercase tracking-widest rounded-md transition-all duration-300 ${
                  active === l.id
                    ? "text-primary"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* ── CTA ── */}
          <button className="hidden lg:inline-flex bg-primary text-dark font-bold text-xs uppercase tracking-widest py-2.5 px-7 rounded-lg hover:scale-105 active:scale-95 neon-glow-sm transition-all cursor-pointer">
            Reserve
          </button>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setOpen((p) => !p)}
            className="lg:hidden p-2 text-white hover:text-primary transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass border-t border-white/5 px-4 py-4 space-y-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
                active === l.id
                  ? "text-primary bg-primary/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button className="w-full mt-3 bg-primary text-dark font-bold py-3 rounded-lg text-sm uppercase tracking-wider neon-glow-sm cursor-pointer">
            Reserve a Table
          </button>
        </div>
      </div>
    </nav>
  );
}
