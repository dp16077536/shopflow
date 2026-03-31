const currentYear = new Date().getFullYear();
const hostname =
  typeof window !== "undefined"
    ? window.location.hostname
    : "saroyaheritagehub.in";
const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Culture", href: "#culture" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Col 1 — Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Saroya Heritage Hub logo"
              role="img"
            >
              <path
                d="M16 2C16 2 6 8 6 17a10 10 0 0020 0C26 8 16 2 16 2z"
                fill="#B36A3A"
                opacity="0.9"
              />
              <path
                d="M16 8C16 8 10 12.5 10 17a6 6 0 0012 0C22 12.5 16 8 16 8z"
                fill="#2F5B3C"
                opacity="0.8"
              />
              <path
                d="M16 13v12M12 18h8"
                stroke="#F4E9D6"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="footer-logo-text">Saroya Heritage Hub</span>
          </div>
          <p className="footer-tagline">
            Preserving the Past, Inspiring the Future.
            <br />
            <br />A digital home for Saroya village — where every story,
            tradition and face of our community lives on forever.
          </p>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <div className="footer-heading">Quick Links</div>
          <ul className="footer-links">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(l.href);
                  }}
                  data-ocid={`footer.${l.label.toLowerCase()}.link`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact & Social */}
        <div>
          <div className="footer-heading">Contact Us</div>
          <div className="footer-contact-item">
            <span>📍</span>
            <span>Saroya Village, Vidisha, Madhya Pradesh – 464001</span>
          </div>
          <div className="footer-contact-item">
            <span>📞</span>
            <span>+91 98765 43210</span>
          </div>
          <div className="footer-contact-item">
            <span>📧</span>
            <span>contact@saroyaheritagehub.in</span>
          </div>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="Facebook"
              data-ocid="footer.facebook.link"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="Instagram"
              data-ocid="footer.instagram.link"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="YouTube"
              data-ocid="footer.youtube.link"
            >
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {currentYear} Saroya Heritage Hub. All Rights Reserved. Made with ❤️
        for Saroya Village. Built with love using{" "}
        <a href={caffeineUrl} target="_blank" rel="noreferrer">
          caffeine.ai
        </a>
      </div>
    </footer>
  );
}
