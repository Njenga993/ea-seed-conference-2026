// components/HomeHero.tsx
import "../styles/hero.css";
import heroImage from "../assets/conference-room.webp";
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <section className="home-hero home-hero-responsive">
      <div className="home-hero-background">
        <img src={heroImage} alt="Conference venue" className="home-hero-image" />
        <div className="home-hero-overlay"></div>
      </div>
      
      <div className="home-hero-container home-hero-container-responsive">
        <div className="home-hero-content home-hero-content-responsive">
          
          <h1 className="home-hero-title home-hero-title-responsive">
            1st Eastern Africa Indigenous Seed Conference
          </h1>

          <p className="home-hero-theme home-hero-theme-responsive">
            Realizing the Right to Food through Seed Sovereignty
          </p>

          <div className="home-hero-meta home-hero-meta-responsive">
            <div className="home-meta-item home-meta-item-responsive">
              <span className="home-meta-icon"></span>
              <span>17th – 20th November 2026</span>
            </div>
            <div className="home-meta-item home-meta-item-responsive">
              <span className="home-meta-icon"></span>
              <span>Nairobi, Kenya</span>
            </div>
          </div>

          <div className="home-hero-buttons home-hero-buttons-responsive">
            <Link to="/registration-abstract" className="home-btn home-btn-primary home-btn-responsive">
              Register Now
            </Link>
            <Link to="/program" className="home-btn home-btn-secondary home-btn-responsive">
              View Program
            </Link>
          </div>

          <div className="home-hero-stats home-hero-stats-responsive">
            <div className="home-stat home-stat-responsive">
              <span className="home-stat-value home-stat-value-responsive">500+</span>
              <span className="home-stat-label home-stat-label-responsive">Attendees</span>
            </div>
            <div className="home-stat home-stat-responsive">
              <span className="home-stat-value home-stat-value-responsive">40+</span>
              <span className="home-stat-label home-stat-label-responsive">Countries</span>
            </div>
            <div className="home-stat home-stat-responsive">
              <span className="home-stat-value home-stat-value-responsive">60+</span>
              <span className="home-stat-label home-stat-label-responsive">Sessions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="home-hero-scroll home-hero-scroll-responsive">
        <span className="home-scroll-text">Scroll</span>
        <div className="home-scroll-line"></div>
      </div>
    </section>
  );
};

export default HomeHero;