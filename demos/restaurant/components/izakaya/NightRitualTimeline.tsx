"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    time: "5:00 PM",
    title: "The Gates Open",
    desc: "Welcomed with a warm oshibori towel and a complimentary aperitif as the evening begins.",
    icon: "🏮",
  },
  {
    time: "5:30 PM",
    title: "Kampai!",
    desc: "Raise your glass for the traditional first toast. Choose from our curated sake flight or signature cocktails.",
    icon: "🥂",
  },
  {
    time: "6:00 PM",
    title: "Omakase Begins",
    desc: "The chef's tasting menu commences — twelve courses of seasonal perfection crafted before your eyes.",
    icon: "🍣",
  },
  {
    time: "7:30 PM",
    title: "Robata Fire",
    desc: "The binchotan charcoal grill roars to life. Watch premium cuts sear at over 1,000°C.",
    icon: "🔥",
  },
  {
    time: "9:00 PM",
    title: "Whisky & Stories",
    desc: "Slow down with rare Japanese whisky flights and intimate conversation at the bar.",
    icon: "🥃",
  },
  {
    time: "11:00 PM",
    title: "The Night Fades",
    desc: "A final sweet course and digestif. The city glows outside as another perfect evening draws to a close.",
    icon: "🌙",
  },
];

export default function NightRitualTimeline() {
  return (
    <section
      id="ritual"
      className="py-28 px-4 sm:px-6 lg:px-8 bg-dark relative overflow-hidden scroll-mt-20"
    >
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            A Night at Yoru
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            The Evening Ritual
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical neon line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #0df2f2 10%, #0df2f2 90%, transparent)",
            }}
          />

          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.time}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative flex items-start mb-16 last:mb-0 ${
                  /* Mobile: always right of line. Desktop: alternate */
                  "pl-16 md:pl-0"
                } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Dot on the line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary neon-glow-sm z-10 mt-2" />

                {/* Content card */}
                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                  }`}
                >
                  <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1">
                    {step.time}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 md:gap-3 flex-wrap">
                    <span
                      className={`order-first ${isLeft ? "md:order-last" : ""}`}
                      aria-hidden="true"
                    >
                      {step.icon}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
