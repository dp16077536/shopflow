const services = [
  {
    icon: "🏫",
    title: "Saroya Primary School",
    img: "/assets/generated/services-school.dim_600x400.jpg",
    desc: "Established 1952. 450 students enrolled. Classes I–XII with science labs and library.",
    details: [
      "Timings: 8AM – 2PM",
      "Sports ground & playground",
      "Mid-day meal programme",
    ],
    ocid: "services.school.card",
  },
  {
    icon: "🏥",
    title: "Community Health Center",
    img: "/assets/generated/services-hospital.dim_600x400.jpg",
    desc: "24/7 emergency services. 3 resident doctors, 8 nurses. Free treatment for BPL families.",
    details: [
      "OPD: 9AM – 5PM daily",
      "Ambulance service available",
      "Monthly vaccination camps",
    ],
    ocid: "services.hospital.card",
  },
  {
    icon: "🚌",
    title: "Transport Facilities",
    img: "/assets/generated/services-transport.dim_600x400.jpg",
    desc: "Regular bus service to district HQ. Auto-rickshaws available. Road connectivity to 5 nearby villages.",
    details: [
      "Bus service: 6AM – 9PM",
      "Auto stand near market",
      "Nearest railway: 12km",
    ],
    ocid: "services.transport.card",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-parchment">
      <h2 className="section-title">Village Services</h2>
      <span className="section-underline" />
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.ocid} className="service-card" data-ocid={s.ocid}>
            <div
              className="img-zoom-wrap"
              style={{ borderRadius: 0, height: "200px" }}
            >
              <img
                src={s.img}
                alt={s.title}
                className="service-card-img"
                style={{ borderRadius: 0 }}
              />
            </div>
            <div className="service-card-body">
              <div className="service-card-title">
                <span>{s.icon}</span> {s.title}
              </div>
              <p className="service-card-desc">{s.desc}</p>
              <ul className="service-details">
                {s.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
