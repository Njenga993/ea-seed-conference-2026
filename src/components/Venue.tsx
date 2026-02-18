// components/HomeVenue.tsx
import "../styles/Venue.css";

const Venue = () => {
  return (
    <section className="home-venue">
      <div className="home-venue-container">
        <div className="home-venue-grid">
          <div className="home-venue-content">
            <div className="home-venue-header">
              <span className="home-venue-tag">Location</span>
              <h2 className="home-venue-title">Venue & Location</h2>
            </div>

            <p className="home-venue-description">
              The conference will be hosted at a modern academic facility
              designed to support high-level research dialogue and networking.
            </p>

            <div className="home-venue-details">
              <div className="home-detail-item">
                <span className="home-detail-icon"></span>
                <div>
                  <span className="home-detail-label">Venue:</span>
                  <span className="home-detail-value">To be confirmed</span>
                </div>
              </div>

              <div className="home-detail-item">
                <span className="home-detail-icon"></span>
                <div>
                  <span className="home-detail-label">Institution:</span>
                  <span className="home-detail-value"> University</span>
                </div>
              </div>

              <div className="home-detail-item">
                <span className="home-detail-icon"></span>
                <div>
                  <span className="home-detail-label">City:</span>
                  <span className="home-detail-value">Nairobi, Kenya</span>
                </div>
              </div>

              <div className="home-detail-item">
                <span className="home-detail-icon"></span>
                <div>
                  <span className="home-detail-label">Date:</span>
                  <span className="home-detail-value">17–20 November 2026</span>
                </div>
              </div>
            </div>

            <div className="home-venue-actions">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="home-map-btn"
              >
                <span className="home-btn-icon"></span>
                View on Google Maps
              </a>
              <a
                href="/accommodation"
                className="home-accommodation-link"
              >
                Nearby Accommodation →
              </a>
            </div>

            <div className="home-venue-note">
              <p>
                <span className="home-note-icon"></span>
                Detailed venue information and directions will be shared with registered participants.
              </p>
            </div>
          </div>

          <div className="home-venue-image-wrapper">
            <div className="home-venue-image-card">
              <img
                src="../assests/conference-room.webp"
                alt="Conference Hall"
                className="home-venue-image"
              />
              <div className="home-image-caption">
                Main Conference Hall
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;