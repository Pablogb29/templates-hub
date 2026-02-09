const links = [
  { label: "Treatments", href: "#treatments" },
  { label: "Results", href: "#results" },
  { label: "Our Team", href: "#team" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function NavbarDentist() {
  return (
    <>
      {/* ── Emergency info strip ── */}
      <div className="bg-secondary text-white py-2 px-4 text-center text-sm font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emergency
          </span>
          <span>
            Same-day emergency appointments — Call{" "}
            <a
              href="tel:+352123456789"
              className="underline hover:text-primary transition-colors font-semibold"
            >
              +352 123 456 789
            </a>
          </span>
        </div>
      </div>

      {/* ── Main navigation ── */}
      <header className="sticky top-0 z-50 w-full glassmorphism border-b border-gray-100/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/5 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  dentistry
                </span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-secondary">
                White<span className="text-accent font-normal">Peak</span>
              </span>
            </a>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-7">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-secondary/70 hover:text-primary text-[13px] font-semibold uppercase tracking-wide transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* CTA group */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+352123456789"
                className="flex items-center gap-1.5 text-sm font-semibold text-secondary/80 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
                +352 123 456
              </a>
              <a
                href="#booking"
                className="bg-primary hover:bg-primary-dark text-secondary text-sm font-bold py-2.5 px-5 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-[0.97]"
              >
                Book Online
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -mr-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                menu
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
