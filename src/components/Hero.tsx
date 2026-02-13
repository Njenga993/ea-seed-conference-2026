import "../styles/hero.css";
import heroImage from "../assets/conference-room.webp";

const Hero = () => {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>
            1st Eastern Africa Indigenous Seed Conference 2026
          </h1>

          <p className="hero-theme">
            Realizing the Right to Food through Seed Sovereignty
          </p>

          <p className="hero-details">
            17th – 20th November 2026 | Nairobi, Kenya
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Register</button>
            <button className="secondary-btn">View Program</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;