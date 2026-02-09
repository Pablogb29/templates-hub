"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = () => setOpen(false);

  return (
    <header
      role="banner"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-bg/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
        {/* Logo */}
        <a href="#" aria-label="Luna Hair Studio — Home" className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-primary !text-3xl" aria-hidden="true">
            content_cut
          </span>
          <span className="text-lg font-bold tracking-tight font-serif lg:text-xl">
            Luna Hair Studio
          </span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-bg-dark shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95 lg:inline-flex"
        >
          Book Now
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-50 flex size-10 items-center justify-center rounded-lg lg:hidden"
        >
          <span className="material-symbols-outlined !text-[28px]" aria-hidden="true">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-bg transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col items-center justify-center gap-8 pt-24">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleNav}
              className="text-2xl font-semibold transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNav}
            className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-primary px-10 text-base font-bold text-bg-dark shadow-lg shadow-primary/20"
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  );
}
