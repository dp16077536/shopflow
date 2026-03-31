export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-village.dim_1400x700.jpg')",
        paddingTop: "68px",
      }}
    >
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-badge">Welcome to Saroya Village</span>
        <h1 className="hero-title">Saroya Heritage Hub</h1>
        <p className="hero-subtitle">
          A timeless village where every stone holds a story and every tradition
          lives on.
        </p>
        <div className="hero-buttons">
          <button
            type="button"
            className="btn-terracotta"
            onClick={() => scrollTo("about")}
            data-ocid="hero.explore_heritage.button"
          >
            Explore Heritage
          </button>
          <button
            type="button"
            className="btn-outline-white"
            onClick={() => scrollTo("culture")}
            data-ocid="hero.our_community.button"
          >
            Our Community
          </button>
        </div>
      </div>
      <button
        type="button"
        className="scroll-indicator"
        onClick={() => scrollTo("about")}
        aria-label="Scroll down"
        data-ocid="hero.scroll_down.button"
      >
        ↓
      </button>
    </section>
  );
}
