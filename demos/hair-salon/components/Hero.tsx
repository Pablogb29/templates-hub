import Image from "next/image";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative flex min-h-[85vh] items-center overflow-hidden px-5 py-16 lg:min-h-[90vh] lg:px-8 lg:py-0">
      {/* gradient bg */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg via-[#f5f1e4] to-[#ebe5d3]" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="order-2 flex flex-col gap-6 text-center lg:order-1 lg:text-left">
          <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary lg:mx-0">
            <span className="material-symbols-outlined !text-sm" aria-hidden="true">star</span>
            Premium Hair Styling
          </span>

          <h1 id="hero-heading" className="text-4xl font-black leading-[1.1] font-serif sm:text-5xl md:text-6xl lg:text-7xl">
            Redefining <br />
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Your Style
            </span>
          </h1>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-text-muted sm:text-lg lg:mx-0 lg:text-xl">
            Experience luxury hair care in a modern, relaxing atmosphere.
            Expert&nbsp;cuts, bespoke color, and treatments tailored exclusively
            to&nbsp;you.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start" role="group" aria-label="Call to action">
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-bg-dark shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-8 text-base font-semibold transition-all hover:-translate-y-0.5 hover:bg-beige"
            >
              View Services
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 pt-2 text-sm text-text-muted lg:justify-start">
            <div className="flex -space-x-2" aria-hidden="true">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p>Loved by <strong>500+</strong> clients</p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="order-1 lg:order-2">
          <figure className="group relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-75" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl lg:aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop"
                alt="Elegant woman with styled hair in a modern salon"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Floating card */}
              <figcaption className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/90 p-3.5 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-text-muted sm:text-xs">
                      Current Trend
                    </p>
                    <p className="font-serif text-base font-bold sm:text-lg">
                      Silk Press &amp; Bob
                    </p>
                  </div>
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary text-bg-dark sm:size-10" aria-hidden="true">
                    <span className="material-symbols-outlined !text-xl">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
