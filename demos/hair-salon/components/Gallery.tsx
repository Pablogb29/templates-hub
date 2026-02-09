import Image from "next/image";

const items = [
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop",
    alt: "Long wavy blonde hair — back view showing texture and highlights",
    label: "Blonde Ambition",
  },
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=750&fit=crop",
    alt: "Close-up of an intricate braided hairstyle",
    label: "Intricate Braids",
  },
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=700&fit=crop",
    alt: "Man getting a clean fade haircut at a barber chair",
    label: "Classic Fade",
  },
  {
    src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=850&fit=crop",
    alt: "Woman showcasing vibrant pink hair color",
    label: "Vivid Colors",
  },
  {
    src: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=600&h=750&fit=crop",
    alt: "Portrait of a woman with natural curly hair",
    label: "Natural Curls",
  },
  {
    src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=800&fit=crop",
    alt: "Elegant bridal updo hairstyle with flowers",
    label: "Bridal Elegance",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-surface px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <h2 id="gallery-heading" className="mb-3 text-3xl font-bold font-serif sm:text-4xl lg:text-5xl">
            Our Work
          </h2>
          <p className="text-text-muted">
            A showcase of our latest transformations.
          </p>
        </header>

        {/* Masonry */}
        <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 lg:gap-6 lg:space-y-6">
          {items.map((item) => (
            <figure
              key={item.label}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={800}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-serif text-lg italic text-white sm:text-xl">
                  {item.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
