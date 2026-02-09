const services = [
  {
    icon: "content_cut",
    title: "Modern Cut & Style",
    desc: "Precision cutting tailored to your face shape and lifestyle, finished with a signature blowout.",
    price: "$80+",
    popular: false,
  },
  {
    icon: "palette",
    title: "Balayage & Color",
    desc: "Hand-painted highlights for a natural, sun-kissed look, or vibrant creative coloring.",
    price: "$150+",
    popular: true,
  },
  {
    icon: "spa",
    title: "Treatments",
    desc: "Deep conditioning, keratin smoothing, and scalp treatments to restore health and shine.",
    price: "$65+",
    popular: false,
  },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <header className="mx-auto mb-14 max-w-2xl text-center">
          <h2 id="services-heading" className="mb-3 text-3xl font-bold font-serif sm:text-4xl lg:text-5xl">
            Our Signature Services
          </h2>
          <p className="text-text-muted">
            Tailored experiences designed to rejuvenate your look and spirit.
          </p>
        </header>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" role="list">
          {services.map((s) => (
            <article
              key={s.title}
              role="listitem"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 lg:p-8"
            >
              {s.popular && (
                <span className="absolute right-0 top-0 rounded-bl-xl bg-primary px-3 py-1 text-xs font-bold text-bg-dark">
                  POPULAR
                </span>
              )}

              <div className="mb-5 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-bg-dark" aria-hidden="true">
                <span className="material-symbols-outlined !text-3xl">
                  {s.icon}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-bold font-serif lg:text-2xl">
                {s.title}
              </h3>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-text-muted lg:text-base">
                {s.desc}
              </p>

              <div className="flex items-end justify-between border-t border-border pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">
                    Starting at
                  </p>
                  <p className="text-2xl font-bold text-primary" aria-label={`Starting at ${s.price}`}>
                    {s.price}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="text-sm font-bold underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
                >
                  Book Now
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-primary"
          >
            View Full Menu
            <span className="material-symbols-outlined !text-base" aria-hidden="true">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
