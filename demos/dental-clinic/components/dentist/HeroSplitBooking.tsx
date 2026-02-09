import BookingForm from "./BookingForm";
import ChatCTA from "./ChatCTA";

const avatars = [
  "photo-1438761681033-6461ffad8d80",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1494790108377-be9c29b29330",
];

export default function HeroSplitBooking() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-background-light"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern" aria-hidden="true" />

      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left column — Copy ── */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Now accepting new patients
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-secondary sm:text-5xl lg:text-[3.5rem]">
              Exceptional Dentistry for&nbsp;the{" "}
              <span className="relative text-accent">
                Modern
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2.5 text-primary/40"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 10"
                  aria-hidden="true"
                >
                  <path
                    d="M0 5 Q50 10 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                  />
                </svg>
              </span>{" "}
              Professional
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg sm:leading-relaxed">
              State-of-the-art technology meets spa-like comfort in the heart of
              Luxembourg City. Stress-free dental care you&rsquo;ll look forward
              to.
            </p>

            {/* Feature pills */}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {[
                "English Speaking Staff",
                "Latest 3D Technology",
                "Full Insurance Support",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
                >
                  <span
                    className="material-symbols-outlined text-primary text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-8 sm:gap-6">
              <div className="flex -space-x-2">
                {avatars.map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&q=80`}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                    loading="lazy"
                  />
                ))}
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-secondary text-[10px] font-bold text-white">
                  +2k
                </span>
              </div>

              <div>
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="mt-0.5 text-sm font-medium text-gray-800">
                  4.9 / 5 from 500+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* ── Right column — Booking card ── */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/25 to-accent/25 blur-xl" />

            <div className="relative rounded-2xl glassmorphism p-6 shadow-glass sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-secondary sm:text-xl">
                  Request Consultation
                </h2>
                <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent">
                  Free
                </span>
              </div>

              <BookingForm />

              {/* ── AI Receptionist CTA ── */}
              <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-200/60 pt-4">
                <span className="text-[11px] text-gray-400">or</span>
                <ChatCTA />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
