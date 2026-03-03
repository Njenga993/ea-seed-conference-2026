// components/HomeHero.tsx
import "../styles/hero.css";
import heroImage from "../assets/conference-room.webp";


const HomeHero = () => {
  return (
    <section className="home-hero">
      <div className="home-hero-background">
        <img src={heroImage} alt="Conference venue" className="home-hero-image" />
        <div className="home-hero-overlay"></div>
      </div>
      
      <div className="home-hero-container">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            1st Eastern Africa Indigenous Seed Conference
          </h1>
          <h1 className="home-hero-title-highlight">
             EAISC 2026
          </h1>

          <p className="home-hero-theme">
            Building farmer managed seed system community of practise (COP) For a Resilient EAST AFRICA Region.
          </p>

          <div className="home-hero-meta">
            <div className="home-meta-item">
              <span className="home-meta-icon">📅</span>
              <span>17th – 20th November 2026</span>
            </div>
            <div className="home-meta-item">
              <span className="home-meta-icon">📍</span>
              <span>Nairobi, Kenya</span>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default HomeHero;