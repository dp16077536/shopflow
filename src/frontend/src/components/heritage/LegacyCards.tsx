const cards = [
  {
    icon: "📜",
    title: "Village History",
    desc: "Explore 500+ years of Saroya's rich past — from its founding as a trade route settlement to its vibrant present-day community.",
  },
  {
    icon: "🎭",
    title: "Cultural Traditions",
    desc: "Discover our living traditions — from exuberant folk dances and harvest festivals to sacred rituals that bind generations together.",
  },
  {
    icon: "🏺",
    title: "Local Crafts",
    desc: "Meet the master artisans of Saroya whose pottery, weaving, and metalwork carry forward ancient techniques prized across the region.",
  },
];

export default function LegacyCards() {
  return (
    <section className="py-20 section-bg" id="legacy">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-heading">Discover Saroya's Legacy</h2>
        <span className="section-heading-underline" />
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          data-ocid="legacy.cards.list"
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="heritage-card p-8 text-center"
              data-ocid={`legacy.card.item.${i + 1}`}
            >
              <div className="text-5xl mb-4">{card.icon}</div>
              <h3
                className="font-display text-xl font-bold mb-3"
                style={{ color: "oklch(0.31 0.06 50)" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.45 0.04 55)" }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
