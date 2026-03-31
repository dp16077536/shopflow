export default function ContactSection() {
  return (
    <section id="contact" className="section-white">
      <h2 className="section-title">Get in Touch</h2>
      <span className="section-underline" />
      <div className="contact-grid">
        {/* Contact Info */}
        <div>
          <div className="contact-info-card" data-ocid="contact.address.card">
            <span className="contact-icon">📍</span>
            <div>
              <div className="contact-label">Address</div>
              <div className="contact-value">
                Saroya Village, Tehsil Vidisha,
                <br />
                District Vidisha, Madhya Pradesh – 464001
              </div>
            </div>
          </div>
          <div className="contact-info-card" data-ocid="contact.phone.card">
            <span className="contact-icon">📞</span>
            <div>
              <div className="contact-label">Phone</div>
              <div className="contact-value">
                +91 98765 43210
                <br />
                +91 87654 32109
              </div>
            </div>
          </div>
          <div className="contact-info-card" data-ocid="contact.email.card">
            <span className="contact-icon">📧</span>
            <div>
              <div className="contact-label">Email</div>
              <div className="contact-value">contact@saroyaheritagehub.in</div>
            </div>
          </div>
          <div className="contact-info-card" data-ocid="contact.hours.card">
            <span className="contact-icon">🕐</span>
            <div>
              <div className="contact-label">Office Hours</div>
              <div className="contact-value">
                Mon–Sat: 9:00 AM – 5:00 PM
                <br />
                Sunday: Closed
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115825.76!2d77.7567!3d23.5251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c18bf5f217cf7%3A0x6b1b90e2ac9c3194!2sVidisha%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "16px" }}
            allowFullScreen
            loading="lazy"
            title="Saroya Village Location"
            data-ocid="contact.map.panel"
          />
        </div>
      </div>
    </section>
  );
}
