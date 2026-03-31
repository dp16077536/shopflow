const events = [
  {
    date: "Mar 25",
    year: "2026",
    name: "Holi Festival Celebration",
    desc: "Join the village for a grand Holi with natural colours, folk music, and a communal feast in the village square.",
    location: "Village Chowk",
    color: "oklch(0.72 0.14 50)",
  },
  {
    date: "Apr 10",
    year: "2026",
    name: "Harvest Festival",
    desc: "A thanksgiving celebration marking the rabi harvest with rituals, processions, and a farm-to-table community dinner.",
    location: "Agricultural Grounds",
    color: "oklch(0.38 0.08 152)",
  },
  {
    date: "Apr 22",
    year: "2026",
    name: "Folk Dance Night",
    desc: "An evening of traditional Ghoomar and Kalbelia performances by Saroya's acclaimed folk dance troupe.",
    location: "Community Hall",
    color: "oklch(0.57 0.11 50)",
  },
  {
    date: "May 5",
    year: "2026",
    name: "Artisan Fair",
    desc: "Browse and buy authentic handicrafts directly from Saroya's master artisans — pottery, weaving, jewellery, and more.",
    location: "Craft Center",
    color: "oklch(0.5 0.09 265)",
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="py-20 section-bg">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="section-heading">Community Events</h2>
        <span className="section-heading-underline" />
        <div className="space-y-5" data-ocid="events.list">
          {events.map((event, i) => (
            <div
              key={event.name}
              className="heritage-card flex gap-0 overflow-hidden"
              data-ocid={`events.item.${i + 1}`}
            >
              <div
                className="flex-shrink-0 w-20 md:w-24 flex flex-col items-center justify-center text-white py-6 px-2"
                style={{ backgroundColor: event.color }}
              >
                <span className="font-display font-bold text-lg leading-tight">
                  {event.date}
                </span>
                <span className="text-xs font-medium opacity-80">
                  {event.year}
                </span>
              </div>
              <div className="flex-1 p-5">
                <h3
                  className="font-display font-bold text-base md:text-lg mb-1"
                  style={{ color: "oklch(0.31 0.06 50)" }}
                >
                  {event.name}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-2"
                  style={{ color: "oklch(0.45 0.04 55)" }}
                >
                  {event.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium"
                  style={{ color: "oklch(0.57 0.11 50)" }}
                >
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
