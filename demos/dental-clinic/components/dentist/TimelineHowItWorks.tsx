import Reveal from "./Reveal";

const steps = [
  {
    title: "Consultation",
    description:
      "Book online or call. We discuss your needs, goals and medical history.",
    active: true,
  },
  {
    title: "Digital Assessment",
    description:
      "3D scans, panoramic X-rays and AI analysis to build a precise treatment plan.",
    active: false,
  },
  {
    title: "Treatment",
    description:
      "Pain-free procedure in our comfort-optimised suites with sedation options.",
    active: false,
  },
  {
    title: "Aftercare",
    description:
      "Follow-up appointments and a personalised care kit for lasting results.",
    active: false,
  },
];

export default function TimelineHowItWorks() {
  return (
    <section className="py-20 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-xl mx-auto lg:mx-0 mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight">
              Your Patient Journey
            </h2>
            <p className="mt-3 text-gray-600">
              From first call to lasting smile — four simple steps.
            </p>
          </div>
        </Reveal>

        <div className="relative pl-8 ml-3 border-l-2 border-gray-200 space-y-10 max-w-2xl">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} direction="left">
              <div className="relative">
                <span
                  className={`absolute -left-[41px] top-0.5 w-5 h-5 rounded-full border-[3px] ${
                    s.active
                      ? "bg-primary border-white shadow"
                      : "bg-white border-gray-200"
                  }`}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-1 block">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-bold text-secondary">{s.title}</h3>
                <p className="text-gray-600 mt-1 text-[15px]">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
