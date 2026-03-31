export default function CultureSection() {
  return (
    <section id="culture" className="section-parchment">
      <h2 className="section-title">Culture of Saroya</h2>
      <span className="section-underline" />

      {/* Traditions & Festivals */}
      <div className="about-grid" style={{ marginBottom: "64px" }}>
        <div
          className="img-zoom-wrap"
          style={{ borderRadius: "1rem", height: "340px" }}
        >
          <img
            src="/assets/generated/culture-festival.dim_700x500.jpg"
            alt="Saroya festivals"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="about-text">
          <h3>🎉 Traditions &amp; Festivals</h3>
          <p>
            Saroya's calendar is a tapestry of vibrant celebrations that unite
            the community and honour ancient traditions. Each festival is a
            joyful reaffirmation of the village's cultural identity.
          </p>
          <ul className="festival-list">
            <li>
              <strong>Holi</strong> (March) — Colours of spring paint every
              corner of Saroya in joyful abandon
            </li>
            <li>
              <strong>Diwali</strong> (October) — The village glows with
              thousands of earthen diyas and folk performances
            </li>
            <li>
              <strong>Makar Sankranti</strong> (January) — Kite festivals and
              tilgul ladoos mark the harvest season
            </li>
            <li>
              <strong>Harvest Festival</strong> (April) — Community feast
              celebrating the bounty of the land
            </li>
            <li>
              <strong>Folk Dance Night</strong> (Monthly) — Traditional Raas and
              Garba performances under moonlight
            </li>
          </ul>
        </div>
      </div>

      {/* Traditional Food */}
      <div className="about-grid reverse" style={{ marginBottom: "64px" }}>
        <div className="about-text">
          <h3>🍽️ Traditional Food</h3>
          <p>
            The cuisine of Saroya is a celebration of local ingredients and
            age-old recipes. Cooked on wood fires in earthen vessels, each dish
            carries the flavour of generations.
          </p>
          <ul className="food-list">
            <li>
              <span>🫓</span> <strong>Dal Baati Churma</strong> — The
              quintessential village feast
            </li>
            <li>
              <span>🌾</span> <strong>Bajre ki Roti</strong> — Hearty pearl
              millet flatbread with ghee
            </li>
            <li>
              <span>🍬</span> <strong>Churma Ladoo</strong> — Sweet crumbly
              balls made during festivals
            </li>
            <li>
              <span>🥘</span> <strong>Gatte ki Sabji</strong> — Gram flour
              dumplings in spiced yogurt curry
            </li>
            <li>
              <span>🥛</span> <strong>Lassi</strong> — Thick yogurt drink, the
              summer staple
            </li>
          </ul>
        </div>
        <div
          className="img-zoom-wrap"
          style={{ borderRadius: "1rem", height: "340px" }}
        >
          <img
            src="/assets/generated/culture-food.dim_700x500.jpg"
            alt="Traditional Saroya food"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Cultural Features */}
      <h3
        style={{
          fontFamily: "Merriweather, serif",
          fontSize: "1.4rem",
          textAlign: "center",
          color: "#4A2E1E",
          marginBottom: "8px",
        }}
      >
        Cultural Features
      </h3>
      <div className="culture-features-grid">
        <div className="feature-card" data-ocid="culture.features.card.1">
          <div className="feature-icon">🎵</div>
          <div className="feature-title">Folk Music</div>
          <p className="feature-desc">
            Ancient folk songs — Bhajans, Maand, and Lok Geet — fill the village
            evenings. The dhol, sarangi and harmonium are passed from parent to
            child.
          </p>
        </div>
        <div className="feature-card" data-ocid="culture.features.card.2">
          <div className="feature-icon">🧵</div>
          <div className="feature-title">Handicrafts</div>
          <p className="feature-desc">
            Pottery, block printing, embroidery and cane weaving — Saroya's
            artisans create works that are sold across the country and beyond.
          </p>
        </div>
        <div className="feature-card" data-ocid="culture.features.card.3">
          <div className="feature-icon">📖</div>
          <div className="feature-title">Oral Traditions</div>
          <p className="feature-desc">
            Village elders preserve epics, fables and genealogies through
            storytelling — a living library that predates the written word.
          </p>
        </div>
        <div className="feature-card" data-ocid="culture.features.card.4">
          <div className="feature-icon">🪔</div>
          <div className="feature-title">Sacred Rituals</div>
          <p className="feature-desc">
            Daily puja at the ancient Shiva temple, seasonal yagnas, and the
            sacred thread ceremony mark the spiritual rhythm of village life.
          </p>
        </div>
      </div>
    </section>
  );
}
