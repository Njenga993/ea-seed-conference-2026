// components/HomeAbout.tsx
import "../styles/about.css";

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
                The <strong>1st Eastern Africa Indigenous Seed Conference 2026</strong> brings
                together farmers, policymakers, researchers, civil society actors,
                and seed advocates from across the region to strengthen farmer-managed
                seed systems and promote seed sovereignty.
              </p>

              <p className="home-about-paragraph">
                The conference aims to foster regional collaboration, share knowledge,
                and advance policy frameworks that safeguard indigenous seed systems
                as a foundation for food security, climate resilience, and community
                self-determination.
              </p>

              <p className="home-about-paragraph">
                Through dialogue, field experiences, and collaborative learning,
                participants will contribute to building a regional Community of Practice
                focused on realizing the right to food through seed sovereignty.
              </p>
            </div>

            <div className="home-about-stats">
              <div className="home-stat-item">
                <span className="home-stat-number">500+</span>
                <span className="home-stat-label">Participants</span>
              </div>
              <div className="home-stat-item">
                <span className="home-stat-number">15+</span>
                <span className="home-stat-label">Countries</span>
              </div>
              <div className="home-stat-item">
                <span className="home-stat-number">50+</span>
                <span className="home-stat-label">Speakers</span>
              </div>
            </div>
          </div>

          <div className="home-about-highlight">
            <div className="home-highlight-card">
              <h3 className="home-highlight-title">Key Objectives</h3>
              <ul className="home-highlight-list">
                <li className="home-highlight-item">
                  <span className="home-highlight-icon"></span>
                  <span>Strengthen farmer-managed seed systems</span>
                </li>
                <li className="home-highlight-item">
                  <span className="home-highlight-icon"></span>
                  <span>Promote indigenous seed knowledge exchange</span>
                </li>
                <li className="home-highlight-item">
                  <span className="home-highlight-icon"></span>
                  <span>Enhance regional policy dialogue</span>
                </li>
                <li className="home-highlight-item">
                  <span className="home-highlight-icon"></span>
                  <span>Build a Community of Practice (CoP)</span>
                </li>
                <li className="home-highlight-item">
                  <span className="home-highlight-icon"></span>
                  <span>Advance climate-resilient agriculture strategies</span>
                </li>
              </ul>
            </div>

            <div className="home-highlight-quote">
              <p className="home-quote-text">
                "Seed sovereignty is the foundation of food sovereignty and 
                the cornerstone of sustainable agricultural development in Africa."
              </p>
              <div className="home-quote-author">
                <span className="home-author-name">— Dr. Vandana Shiva</span>
                <span className="home-author-title">Seed Freedom Advocate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;