
import "../styles/Venue.css";
import CON from "../assets/conference-room.webp";

const Venue = () => {
  return (
    <section className="conf-venue-section">
      <div className="conf-venue-container">
        <div className="conf-venue-grid">
          <div className="conf-venue-content">
            <header className="conf-venue-header">
              <span className="conf-venue-tag">Location</span>
              <h2 className="conf-venue-title">Venue & Location</h2>
            </header>

            <p className="conf-venue-description">
              The conference will be hosted at a modern academic facility
              designed to support high-level research dialogue and networking.
            </p>

            <div className="conf-venue-details">
              <div className="conf-detail-item">
                <div className="conf-detail-content">
                  <span className="conf-detail-label">Venue</span>
                  <span className="conf-detail-value">To be confirmed</span>
                </div>
              </div>

              <div className="conf-detail-item">
                <div className="conf-detail-content">
                  <span className="conf-detail-label">Institution</span>
                  <span className="conf-detail-value">University</span>
                </div>
              </div>

              <div className="conf-detail-item">
                <div className="conf-detail-content">
                  <span className="conf-detail-label">City</span>
                  <span className="conf-detail-value">Nairobi, Kenya</span>
                </div>
              </div>

              <div className="conf-detail-item">
                <div className="conf-detail-content">
                  <span className="conf-detail-label">Date</span>
                  <span className="conf-detail-value">17–20 November 2026</span>
                </div>
              </div>
            </div>

            <div className="conf-venue-actions">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="conf-map-btn"
              >
                <span className="conf-btn-icon-map"></span>
                View on Google Maps
              </a>
              <a
                href="/accommodation"
                className="conf-accommodation-link"
              >
                Nearby Accommodation
                <span className="conf-arrow-icon"></span>
              </a>
            </div>

            <div className="conf-venue-note">
              <p>
                Detailed venue information and directions will be shared with registered participants.
              </p>
            </div>
          </div>

          <div className="conf-venue-image-wrapper">
            <div className="conf-venue-image-card">
              <div className="conf-image-container">
                <img
                  src={CON}
                  alt="Conference Hall"
                  className="conf-venue-image"
                />
                <div className="conf-image-overlay">
                  <span className="conf-overlay-icon"></span>
                </div>
              </div>
              <div className="conf-image-caption">
                <h4>Main Conference Hall</h4>
                <p>Modern facility with state-of-the-art amenities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;