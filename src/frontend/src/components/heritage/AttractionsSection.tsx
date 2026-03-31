const attractions = [
  {
    img: "/assets/generated/attraction-temple.dim_600x400.jpg",
    title: "Ancient Shiva Temple",
    desc: "Built in the 14th century, this exquisitely carved sandstone temple is Saroya's spiritual heart.",
  },
  {
    img: "/assets/generated/attraction-stepwell.dim_600x400.jpg",
    title: "Historic Stepwell",
    desc: "A 16th-century vav with intricate geometric patterns — a feat of water-harvesting engineering.",
  },
  {
    img: "/assets/generated/attraction-crafts.dim_600x400.jpg",
    title: "Craft Center",
    desc: "Watch master artisans at work and take home authentic hand-crafted souvenirs made in Saroya.",
  },
  {
    img: "/assets/generated/attraction-trail.dim_600x400.jpg",
    title: "Nature Trail",
    desc: "A 5 km guided trek through sacred groves, ancient ruins, and panoramic ridge views of the valley.",
  },
];

export default function AttractionsSection() {
  return (
    <section id="attractions" className="py-20 section-bg-alt">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Local Attractions</h2>
        <span className="section-heading-underline" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="attractions.tiles.list"
        >
          {attractions.map((a, i) => (
            <div
              key={a.title}
              className="heritage-card group cursor-pointer"
              data-ocid={`attractions.tile.item.${i + 1}`}
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3
                  className="font-display font-bold text-sm mb-1"
                  style={{ color: "oklch(0.31 0.06 50)" }}
                >
                  {a.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.45 0.04 55)" }}
                >
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
