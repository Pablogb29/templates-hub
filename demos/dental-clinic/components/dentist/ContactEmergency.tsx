import Reveal from "./Reveal";

export default function ContactEmergency() {
  return (
    <section id="contact" className="py-20 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* ── Map + info ── */}
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-black text-secondary">
                Visit Our Clinic
              </h2>

              <div className="relative rounded-2xl overflow-hidden h-64 border border-gray-100 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80"
                  alt="Luxembourg City aerial view"
                  className="w-full h-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      location_on
                    </span>
                    <span className="text-secondary font-bold text-sm">
                      24 Avenue de la Liberté, Luxembourg
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <span className="material-symbols-outlined text-primary mb-1.5 block">
                    schedule
                  </span>
                  <p className="font-bold text-secondary text-sm">
                    Opening Hours
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Mon – Fri: 8 am – 8 pm
                    <br />
                    Sat: 9 am – 4 pm
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <span className="material-symbols-outlined text-primary mb-1.5 block">
                    mail
                  </span>
                  <p className="font-bold text-secondary text-sm">
                    Get in Touch
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    hello@whitepeak.lu
                    <br />
                    +352 123 456 789
                  </p>
                </div>
              </div>
            </div>

            {/* ── Emergency card ── */}
            <div className="flex flex-col justify-center">
              <div className="rounded-2xl bg-secondary p-8 sm:p-10 text-white relative overflow-hidden">
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-2xl"
                  aria-hidden="true"
                />

                <span
                  className="material-symbols-outlined text-primary text-4xl mb-4 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  emergency
                </span>
                <h3 className="text-2xl font-black mb-3">
                  Dental Emergency?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
                  Broken tooth, severe pain or swelling? Our emergency line is
                  open 7 days a week. Don&rsquo;t wait — call us now.
                </p>
                <a
                  href="tel:+352123456789"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-secondary font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.97]"
                >
                  <span className="material-symbols-outlined text-lg">
                    call
                  </span>
                  +352 123 456 789
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
