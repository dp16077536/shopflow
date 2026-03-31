import { useEffect, useState } from "react";

const galleryImages = [
  {
    src: "/assets/generated/hero-village.dim_1400x700.jpg",
    caption: "Saroya Village — Aerial View",
  },
  {
    src: "/assets/generated/gallery-1.dim_600x400.jpg",
    caption: "Village Landscape",
  },
  {
    src: "/assets/generated/gallery-2.dim_600x400.jpg",
    caption: "Women at the Well",
  },
  {
    src: "/assets/generated/gallery-3.dim_600x400.jpg",
    caption: "Children at Play",
  },
  {
    src: "/assets/generated/gallery-4.dim_600x400.jpg",
    caption: "Pottery Artisan",
  },
  {
    src: "/assets/generated/attraction-temple.dim_600x400.jpg",
    caption: "Ancient Temple",
  },
  {
    src: "/assets/generated/culture-festival.dim_700x500.jpg",
    caption: "Festival Celebrations",
  },
  {
    src: "/assets/generated/about-people.dim_700x500.jpg",
    caption: "People of Saroya",
  },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => ((i ?? 0) + 1) % galleryImages.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex(
          (i) => ((i ?? 0) - 1 + galleryImages.length) % galleryImages.length,
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  const prev = () =>
    setLightboxIndex(
      (i) => ((i ?? 0) - 1 + galleryImages.length) % galleryImages.length,
    );
  const next = () =>
    setLightboxIndex((i) => ((i ?? 0) + 1) % galleryImages.length);

  return (
    <section id="gallery" className="section-white">
      <h2 className="section-title">Village Gallery</h2>
      <span className="section-underline" />

      <div className="gallery-grid">
        {galleryImages.map((img, idx) => (
          <button
            type="button"
            key={img.src}
            className="gallery-item"
            onClick={() => setLightboxIndex(idx)}
            data-ocid={`gallery.item.${idx + 1}`}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "block",
              width: "100%",
            }}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
            <div className="gallery-overlay">
              <span className="gallery-caption">{img.caption}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
          onKeyDown={(e) => e.key === "Escape" && setLightboxIndex(null)}
          data-ocid="gallery.lightbox.modal"
        >
          <div className="lightbox-content">
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxIndex(null)}
              data-ocid="gallery.lightbox.close_button"
            >
              ✕
            </button>
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].caption}
            />
            <p className="lightbox-caption">
              {galleryImages[lightboxIndex].caption}
            </p>
          </div>
          <button
            type="button"
            className="lightbox-prev"
            onClick={prev}
            data-ocid="gallery.lightbox.pagination_prev"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-next"
            onClick={next}
            data-ocid="gallery.lightbox.pagination_next"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
