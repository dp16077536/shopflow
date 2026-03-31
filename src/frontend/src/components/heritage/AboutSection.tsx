export default function AboutSection() {
  return (
    <section id="about" className="section-white">
      <h2 className="section-title">About Saroya</h2>
      <span className="section-underline" />

      {/* Our History */}
      <div className="about-grid">
        <div className="about-text">
          <h3>🏛️ Our History</h3>
          <p>
            Saroya is a village steeped in over 500 years of rich history,
            nestled along an ancient trade route in the heart of Madhya Pradesh.
            Founded in the early 16th century, the village flourished as a
            cultural and commercial hub during the Rajput era.
          </p>
          <p>
            The village bears the imprints of Rajput heritage — from intricately
            carved stone gateways to the ancient stepwell that once served as
            the lifeblood of the community. Every lane whispers tales of valor,
            devotion, and centuries of resilience.
          </p>
          <p>
            Through Mughal invasions, colonial rule, and modern transformations,
            Saroya has preserved its distinct identity — a living testament to
            the enduring spirit of its people.
          </p>
        </div>
        <div
          className="img-zoom-wrap"
          style={{ borderRadius: "1rem", height: "340px" }}
        >
          <img
            src="/assets/generated/about-lifestyle.dim_700x500.jpg"
            alt="Saroya village lifestyle"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Village Lifestyle */}
      <div className="about-grid reverse">
        <div className="about-text">
          <h3>🌾 Village Lifestyle</h3>
          <p>
            Life in Saroya follows the gentle rhythm of the seasons. Agriculture
            forms the backbone of the village economy — fields of wheat, bajra,
            and mustard stretch as far as the eye can see, tended by hands that
            have farmed this land for generations.
          </p>
          <p>
            Beyond farming, Saroya is renowned for its vibrant craft tradition.
            Potters, weavers, and woodcarvers practice skills passed down
            through centuries. The village market buzzes with color and commerce
            every Tuesday, drawing visitors from surrounding villages.
          </p>
          <p>
            Community gatherings — from evening satsangs at the temple to
            festive preparations under the old banyan tree — form the social
            fabric that binds Saroya together.
          </p>
        </div>
        <div
          className="img-zoom-wrap"
          style={{ borderRadius: "1rem", height: "340px" }}
        >
          <img
            src="/assets/generated/about-lifestyle.dim_700x500.jpg"
            alt="Village lifestyle"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* People of Saroya */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h3
          style={{
            fontFamily: "Merriweather, serif",
            fontSize: "1.6rem",
            color: "#4A2E1E",
          }}
        >
          👥 People of Saroya
        </h3>
        <p
          style={{
            color: "#3B2A1A",
            maxWidth: "600px",
            margin: "12px auto",
            lineHeight: 1.7,
          }}
        >
          The soul of Saroya lives in its people — their warmth, wisdom, and
          unwavering spirit form the true heritage of this village.
        </p>
      </div>

      <div
        className="img-zoom-wrap"
        style={{ borderRadius: "1rem", height: "280px", marginBottom: "32px" }}
      >
        <img
          src="/assets/generated/about-people.dim_700x500.jpg"
          alt="People of Saroya"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="profile-cards">
        <div className="profile-card" data-ocid="about.people.card.1">
          <div className="profile-avatar">👴</div>
          <div className="profile-name">Ramesh Ji</div>
          <div className="profile-role">Village Elder, 78 years</div>
          <p className="profile-bio">
            A guardian of Saroya's oral traditions, Ramesh Ji has chronicled the
            village's history through stories passed down from his grandfather.
            His wisdom guides the panchayat.
          </p>
        </div>
        <div className="profile-card" data-ocid="about.people.card.2">
          <div className="profile-avatar">👩</div>
          <div className="profile-name">Meena Devi</div>
          <div className="profile-role">Master Artisan</div>
          <p className="profile-bio">
            Meena Devi's pottery has won national recognition. She trains 30+
            women in the traditional craft, ensuring the ancient art form
            thrives for future generations.
          </p>
        </div>
        <div className="profile-card" data-ocid="about.people.card.3">
          <div className="profile-avatar">👦</div>
          <div className="profile-name">Arjun Singh</div>
          <div className="profile-role">Youth Leader</div>
          <p className="profile-bio">
            At 24, Arjun spearheads the village's digital literacy program and
            manages Saroya's social media presence, bridging the gap between
            tradition and modernity.
          </p>
        </div>
      </div>
    </section>
  );
}
