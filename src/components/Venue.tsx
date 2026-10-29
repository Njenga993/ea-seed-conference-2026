// components/Venue.tsx
import "../styles/Venue.css";

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
                  <span className="conf-detail-value">
                    Catholic University of Eastern Africa, Nairobi, Kenya
                  </span>
                </div>
              </div>

              <div className="conf-detail-item">
                <div className="conf-detail-content">
                  <span className="conf-detail-label">Institution</span>
                  <span className="conf-detail-value">
                    Catholic University of Eastern Africa
                  </span>
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
                href="https://www.google.com/maps/place/Catholic+University+of+Eastern+Africa/@-1.3524158,36.7540936,17z/data=!3m1!4b1!4m6!3m5!1s0x182f0539d181204b:0x6e7169577881d08f!8m2!3d-1.3524158!4d36.7566685!16zL20vMGNfbGQ?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="conf-map-btn"
              >
                <span className="conf-btn-icon-map"></span>
                View on Google Maps
              </a>
            </div>

            <div className="conf-venue-note">
              <p>
                Detailed venue information and directions will be shared with
                registered participants.
              </p>
            </div>
          </div>

          <div className="conf-venue-map-wrapper">
            <div className="conf-venue-map-card">
              <div className="conf-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.706900387661!2d36.754093574098455!3d-1.3524158357001452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f0539d181204b%3A0x6e7169577881d08f!2sCatholic%20University%20of%20Eastern%20Africa!5e0!3m2!1sen!2ske!4v1776744359938!5m2!1sen!2ske"
                  className="conf-responsive-iframe"
                  title="Catholic University of Eastern Africa - Conference Venue Location"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="conf-map-caption">
                <div className="conf-map-marker">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="conf-map-info">
                  <h4>Catholic University of Eastern Africa</h4>
                  <p>Lang'ata South Road, Nairobi, Kenya</p>
                </div>
                <button
                  className="conf-expand-map-btn"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/Catholic+University+of+Eastern+Africa/@-1.3524158,36.7540936,17z/",
                      "_blank",
                    )
                  }
                  aria-label="Open map in full screen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                  Expand
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
