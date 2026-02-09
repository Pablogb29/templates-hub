const faqs = [
  {
    q: "How do I book an appointment?",
    a: 'You can book directly through our website by clicking the "Book Now" button, or give us a call at (555) 123-4567. We recommend booking 2 weeks in advance for weekends.',
  },
  {
    q: "What is your cancellation policy?",
    a: "We require 24 hours notice for cancellations. Cancellations made within 24 hours of the appointment time will incur a 50% service fee.",
  },
  {
    q: "Do you offer consultations?",
    a: "Yes! We offer complimentary 15-minute consultations for all color and extension services to ensure we achieve your desired look.",
  },
];

export default function FAQ() {
  return (
    <section aria-labelledby="faq-heading" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="mb-10 text-center text-3xl font-bold font-serif sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <dl className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group overflow-hidden rounded-xl border border-border bg-bg"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-medium sm:p-6 sm:text-lg">
                <dt>{f.q}</dt>
                <span className="shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
                  <span className="material-symbols-outlined">
                    expand_more
                  </span>
                </span>
              </summary>
              <dd className="px-5 pb-5 leading-relaxed text-text-muted sm:px-6 sm:pb-6">
                {f.a}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
