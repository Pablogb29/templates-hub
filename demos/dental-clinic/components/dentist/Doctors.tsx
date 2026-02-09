import Reveal from "./Reveal";

const team = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Chief Orthodontist",
    bio: "Specialising in Invisalign and complex corrections with 12 + years of experience.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Marc Weber",
    role: "Cosmetic Specialist",
    bio: "Expert in veneers and full smile makeovers. Transforming smiles since 2010.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Emily Chen",
    role: "Periodontist & Implantologist",
    bio: "Dedicated to gum health and restorative implant surgery for long-term results.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Doctors() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-black text-secondary text-center mb-12">
            Meet Our Specialists
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((d, i) => (
            <Reveal key={d.name} delay={i * 120}>
              <div className="group flex flex-col items-center text-center">
                <div className="w-56 h-64 rounded-2xl overflow-hidden mb-5 relative">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-xl font-bold text-secondary">{d.name}</h3>
                <p className="text-primary font-medium text-sm mb-1.5">
                  {d.role}
                </p>
                <p className="text-gray-500 text-sm max-w-[260px]">{d.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
