const partners = [
  { name: "CNS", color: "text-secondary" },
  { name: "DKV", color: "text-blue-600" },
  { name: "Foyer", color: "text-red-600" },
  { name: "AXA", color: "text-green-600" },
];

export default function PartnersLogos() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-secondary mb-3">
          Insurance Partners
        </h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          We handle the paperwork. Direct billing available with all major
          Luxembourg providers.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-2xl mx-auto opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((p) => (
            <div
              key={p.name}
              className="h-20 bg-background-light rounded-xl flex items-center justify-center border border-gray-100"
            >
              <span className={`text-2xl font-extrabold ${p.color}`}>
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
