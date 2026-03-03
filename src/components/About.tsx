// components/HomeAbout.tsx
import "../styles/about.css";
import heroImage from "../assets/conference-room.webp";

const About = () => {
  return (
    <section className="home-about">
      <div className="home-about-container">
        <div className="home-about-grid">
          <div className="home-about-content">
            <div className="home-about-header">
              <span className="home-about-tag">About the Conference</span>
              <h2 className="home-about-title">
                1st Eastern Africa Indigenous Seed Conference 2026
              </h2>
            </div>

            <div className="home-about-text">
              <p className="home-about-paragraph">
                A landmark gathering bringing together farmers, policymakers, researchers, 
                and seed advocates from across Eastern Africa to champion seed sovereignty 
                and strengthen farmer-managed seed systems.
              </p>

              <p className="home-about-paragraph">
                Join us in Nairobi for four days of knowledge exchange, regional collaboration, 
                and advancing policies that protect indigenous seed systems as the foundation 
                of food security and climate resilience.
              </p>
            </div>

            <div className="home-about-cta">
              <a href="/about" className="home-learn-more">
                Learn More About Us
                <span className="home-cta-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="home-about-visual">
            <div className="home-photo-collage">
              <div className="home-photo home-photo-1">
                <img src={heroImage} alt="Conference participants" />
              </div>
              <div className="home-photo home-photo-2">
                <img src={heroImage}alt="Indigenous seed display" />
              </div>
              <div className="home-photo home-photo-3">
                <img src={heroImage} alt="Farmers with seeds" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;