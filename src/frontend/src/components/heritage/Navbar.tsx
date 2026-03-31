import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Culture", href: "#culture" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar-heritage${scrolled ? " scrolled" : ""}`}>
        <button
          type="button"
          className="navbar-brand"
          onClick={() => handleLinkClick("#home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg
            width="32"
            height="32"
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
          <span className="navbar-brand-text">Saroya Heritage Hub</span>
        </button>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.hamburger.toggle"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      <div
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        data-ocid="nav.mobile.dropdown_menu"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href.slice(1) ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link.href);
            }}
            data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
