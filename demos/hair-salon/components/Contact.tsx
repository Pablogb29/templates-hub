import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-bg px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ---- Top Card: Map + Info ---- */}
        <div className="grid gap-0 overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl lg:grid-cols-2">
          {/* Map */}
          <div className="min-h-[300px] lg:min-h-0">
            <iframe
              title="Luna Hair Studio Location — 123 Fashion Avenue, SoHo, New York"
              className="h-full w-full"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184126372134!2d-73.98555668459426!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629782531853!5m2!1sen!2sus"
              style={{
                border: 0,
                filter: "grayscale(100%) contrast(1.2) opacity(0.8)",
              }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <h2 id="contact-heading" className="mb-8 text-3xl font-bold font-serif sm:text-4xl">
              Visit Our Studio
            </h2>

            <address className="not-italic space-y-7">
              {/* Address */}
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                  <span className="material-symbols-outlined">location_on</span>
                </span>
                <div>
                  <h3 className="mb-0.5 font-bold">Address</h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    123 Fashion Avenue
                    <br />
                    SoHo, New York, NY 10012
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                  <span className="material-symbols-outlined">schedule</span>
                </span>
                <div>
                  <h3 className="mb-0.5 font-bold">Opening Hours</h3>
                  <ul className="space-y-0.5 text-sm text-text-muted">
                    <li className="flex w-44 justify-between">
                      <span>Mon – Fri</span>
                      <time>9 am – 8 pm</time>
                    </li>
                    <li className="flex w-44 justify-between">
                      <span>Saturday</span>
                      <time>10 am – 6 pm</time>
                    </li>
                    <li className="flex w-44 justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                  <span className="material-symbols-outlined">call</span>
                </span>
                <div>
                  <h3 className="mb-0.5 font-bold">Contact</h3>
                  <p className="mb-3 text-sm text-text-muted">
                    <a href="tel:+15551234567" className="hover:text-primary transition-colors">(555) 123-4567</a>
                    <br />
                    <a href="mailto:hello@lunahairstudio.com" className="hover:text-primary transition-colors">hello@lunahairstudio.com</a>
                  </p>
                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-colors hover:bg-[#20bd5a]"
                  >
                    <span className="material-symbols-outlined !text-xl" aria-hidden="true">
                      chat
                    </span>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* ---- Bottom Card: Contact Form ---- */}
        <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Left: heading + description */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                <span className="material-symbols-outlined !text-2xl">
                  mail
                </span>
              </span>
              <h2 className="mb-3 text-3xl font-bold font-serif sm:text-4xl">
                Send Us a Message
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-text-muted lg:text-base">
                Have a question or want to book a consultation? Fill out the form
                and we&apos;ll get back to you within 24&nbsp;hours.
              </p>

              <ul className="mt-8 hidden space-y-3 lg:block" aria-label="Benefits">
                <li className="flex items-center gap-3 text-sm text-text-muted">
                  <span className="material-symbols-outlined !text-lg text-primary" aria-hidden="true">
                    check_circle
                  </span>
                  Free 15-minute consultations for new clients
                </li>
                <li className="flex items-center gap-3 text-sm text-text-muted">
                  <span className="material-symbols-outlined !text-lg text-primary" aria-hidden="true">
                    check_circle
                  </span>
                  Response within 24 hours guaranteed
                </li>
                <li className="flex items-center gap-3 text-sm text-text-muted">
                  <span className="material-symbols-outlined !text-lg text-primary" aria-hidden="true">
                    check_circle
                  </span>
                  Weekend appointments available
                </li>
              </ul>
            </div>

            {/* Right: form */}
            <div className="border-t border-border p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
