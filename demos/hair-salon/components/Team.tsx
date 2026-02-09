import Image from "next/image";

const stylists = [
  {
    name: "Sarah Jenkins",
    role: "Creative Director",
    bio: "Master of precision cuts and transformative styles with over 10 years of experience.",
    img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop&crop=faces",
    verified: true,
  },
  {
    name: "Marco Rossi",
    role: "Senior Colorist",
    bio: "Specializing in balayage, color correction, and vibrant fashion shades.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    verified: false,
  },
  {
    name: "Elena Rodriguez",
    role: "Texture Specialist",
    bio: "Expert in curly hair, silk presses, and restorative keratin treatments.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=faces",
    verified: false,
  },
];

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-bg px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <header className="mb-14 flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-xl">
            <h2 id="team-heading" className="mb-3 text-3xl font-bold font-serif sm:text-4xl lg:text-5xl">
              Meet the Stylists
            </h2>
            <p className="text-text-muted">
              Our talented team of experts is dedicated to making you look and
              feel your absolute best.
            </p>
          </div>
          <a
            href="#"
            className="hidden items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold transition-colors hover:border-primary hover:text-primary md:inline-flex"
          >
            See All Team
          </a>
        </header>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {stylists.map((s) => (
            <article key={s.name} className="group flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="size-48 overflow-hidden rounded-full border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105 sm:size-56 lg:size-64">
                  <Image
                    src={s.img}
                    alt={`Portrait of ${s.name}, ${s.role}`}
                    width={256}
                    height={256}
                    className="size-full object-cover"
                  />
                </div>
                {s.verified && (
                  <span className="absolute bottom-1 right-1 flex size-9 items-center justify-center rounded-full bg-white text-primary shadow-md" title="Verified stylist">
                    <span className="material-symbols-outlined !text-xl" aria-hidden="true">
                      verified
                    </span>
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold font-serif lg:text-2xl">
                {s.name}
              </h3>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                {s.role}
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-text-muted">
                {s.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
