import { ArrowUpRight } from "lucide-react";

const EXPLORE = [
  "Menu",
  "Reservations",
  "Private Events",
  "Gift Cards",
  "Careers",
];

const SOCIALS = [
  { label: "Instagram", abbr: "Ig" },
  { label: "Facebook", abbr: "Fb" },
  { label: "TikTok", abbr: "Tk" },
];

export default function FooterIzakaya() {
  return (
    <footer className="bg-dark pt-20 pb-10 border-t border-white/5 relative">
      {/* Neon bottom line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #0df2f2 30%, #f20dcf 70%, transparent)",
          opacity: 0.4,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* ── Brand ── */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary font-serif text-base select-none">
                夜
              </span>
              <span className="text-white text-xl font-serif font-bold tracking-widest">
                IZAKAYA YORU
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Modern Japanese dining in the heart of the city. Experience the
              taste of Tokyo&apos;s night, every evening.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.abbr}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white text-xs font-bold hover:bg-primary hover:text-dark transition-colors"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>

          {/* ── Explore ── */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">
              Explore
            </h3>
            <ul className="space-y-3">
              {EXPLORE.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {l}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Location ── */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">
              Visit Us
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              123 Neon District Blvd,
              <br />
              Downtown, NY 10012
            </p>
            <a
              href="mailto:hello@izakayayoru.com"
              className="text-gray-400 hover:text-primary transition-colors text-sm block mb-1"
            >
              hello@izakayayoru.com
            </a>
            <a
              href="tel:+15551234567"
              className="text-gray-400 hover:text-primary transition-colors text-sm block"
            >
              +1 (555) 123-4567
            </a>
          </div>

          {/* ── Hours ── */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">
              Hours
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Mon – Thu", "5 PM – 11 PM"],
                ["Fri – Sat", "5 PM – 1 AM"],
                ["Sunday", "4 PM – 10 PM"],
              ].map(([d, h]) => (
                <li key={d} className="flex justify-between text-gray-400">
                  <span>{d}</span>
                  <span className="text-white">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Izakaya Yoru. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
