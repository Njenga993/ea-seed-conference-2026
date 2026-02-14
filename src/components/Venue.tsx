import "../styles/Venue.css";

const Venue = () => {
  return (
    <section className="venue">
      <div className="container venue-grid">
        <div className="venue-content">
          <h2>Venue & Location</h2>

          <p className="venue-description">
            The conference will be hosted at a modern academic facility
            designed to support high-level research dialogue and networking.
          </p>

          <div className="venue-details">
            <p><strong>Venue:</strong> Grand Conference Hall</p>
            <p><strong>Institution:</strong> National University Campus</p>
            <p><strong>City:</strong> Kampala, Uganda</p>
            <p><strong>Date:</strong> 12–14 September 2026</p>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
          >
            View on Google Maps
          </a>
        </div>

        <div className="venue-image">
          <img
            src="https://images.unsplash.com/photo-1515169067865-5387ec356754"
            alt="Conference Hall"
          />
        </div>
      </div>
    </section>
  );
};

export default Venue;