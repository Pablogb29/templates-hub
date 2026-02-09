const faqs = [
  {
    q: "Do you accept international insurance?",
    a: "Yes, we work with most international providers including DKV, Foyer and AXA. Please contact reception for plan-specific details.",
  },
  {
    q: "How soon can I get an appointment?",
    a: "We typically have openings within 48 hours. For emergencies, same-day appointments are available.",
  },
  {
    q: "Is teeth whitening painful?",
    a: "Our modern whitening techniques minimise sensitivity. Most patients experience little to no discomfort during or after the procedure.",
  },
  {
    q: "Do you offer sedation dentistry?",
    a: "Yes — from mild oral sedation to IV sedation for more complex procedures. Your comfort is our top priority.",
  },
  {
    q: "What payment plans are available?",
    a: "We offer interest-free instalments on treatments over \u20AC500. Speak to our team for tailored financing options.",
  },
];

export default function FAQAccordion() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl bg-background-light border border-gray-100 overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-secondary list-none select-none">
                {faq.q}
                <span className="material-symbols-outlined text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4">
                  expand_more
                </span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed -mt-1">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
