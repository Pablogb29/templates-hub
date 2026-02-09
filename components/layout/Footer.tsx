import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/templates", label: "Templates" },
    { href: "/pricing", label: "Pricing" },
    { href: "/#how-it-works", label: "How It Works" },
  ],
  Company: [
    { href: "/contact", label: "Contact" },
    { href: "/contact", label: "Book a Call" },
  ],
  Templates: [
    { href: "/templates/restaurant", label: "Restaurant" },
    { href: "/templates/hair-salon", label: "Hair Salon" },
    { href: "/templates/dental-clinic", label: "Dental Clinic" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Templates<span className="text-[var(--color-primary-light)]">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              AI-powered websites delivered in days, not months. Premium templates with intelligent chatbots for every business.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-dim)]">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--color-text-dim)]">
            &copy; {new Date().getFullYear()} TemplatesHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
