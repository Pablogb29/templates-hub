const services = [
  "Cosmetic Dentistry",
  "Implantology",
  "Orthodontics",
  "Pediatric",
  "Emergency",
];

const company = ["About Us", "Careers", "Blog", "Privacy Policy"];

export default function FooterDentist() {
  return (
    <footer className="bg-secondary pb-24 pt-16 text-white md:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-primary">
                dentistry
              </span>
              <span className="text-lg font-bold tracking-tight">
                WhitePeak
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
              Elevating dental care standards in Luxembourg with cutting-edge
              technology and genuine compassion.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-300">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {services.map((l) => (
                <li key={l}>
                  <a
                    href="#treatments"
                    className="transition-colors hover:text-primary"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-300">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {company.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-300">
              Newsletter
            </h4>
            <p className="mb-3 text-sm text-gray-400">
              Tips for a healthy smile, delivered monthly.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="rounded-lg border-none bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-secondary transition-colors hover:bg-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} WhitePeak Dental Clinic. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
