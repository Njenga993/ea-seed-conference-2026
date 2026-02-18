// components/HomeFocusAreas.tsx
import "../styles/focus.css";

const FocusAreas = () => {
  const focusAreas = [
    {
      id: 1,
      title: "Seed Sovereignty",
      description: "Advancing the rights of farmers to save, exchange, and manage indigenous seed systems without external restrictions.",
      icon: "",
      color: "#1e4a6b"
    },
    {
      id: 2,
      title: "Farmer-Managed Seed Systems",
      description: "Strengthening community-based seed production, conservation, and local knowledge systems.",
      icon: "",
      color: "#c17b3c"
    },
    {
      id: 3,
      title: "Climate Resilience",
      description: "Promoting indigenous seed diversity as a strategy for adapting to climate variability and ecological challenges.",
      icon: "",
      color: "#1e4a6b"
    },
    {
      id: 4,
      title: "Policy & Advocacy",
      description: "Creating enabling policy environments that protect traditional seed systems and farmer rights.",
      icon: "",
      color: "#c17b3c"
    },
    {
      id: 5,
      title: "Regional Community of Practice",
      description: "Building collaborative platforms for knowledge exchange, partnerships, and sustained regional engagement.",
      icon: "",
      color: "#1e4a6b"
    },
    {
      id: 6,
      title: "Indigenous Knowledge",
      description: "Documenting and preserving traditional farming practices and seed conservation methods.",
      icon: "",
      color: "#c17b3c"
    }
  ];

  return (
    <section className="home-focus">
      <div className="home-focus-container">
        <div className="home-focus-header">
          <span className="home-focus-tag">Conference Themes</span>
          <h2 className="home-focus-title">Theme & Focus Areas</h2>
          <p className="home-focus-subtitle">
            The conference will explore key thematic areas that strengthen
            indigenous seed systems and advance seed sovereignty across
            Eastern Africa.
          </p>
        </div>

        <div className="home-focus-grid">
          {focusAreas.map((area) => (
            <div 
              key={area.id} 
              className="home-focus-card"
              style={{ '--card-accent': area.color } as React.CSSProperties}
            >
              <div className="home-card-icon">{area.icon}</div>
              <h3 className="home-card-title">{area.title}</h3>
              <p className="home-card-description">{area.description}</p>
              <div className="home-card-footer">
                <span className="home-card-link">Learn more →</span>
              </div>
            </div>
          ))}
        </div>

        <div className="home-focus-stats">
          <div className="home-stats-row">
            <div className="home-stat-block">
              <span className="home-block-number">6</span>
              <span className="home-block-label">Focus Areas</span>
            </div>
            <div className="home-stat-block">
              <span className="home-block-number">15+</span>
              <span className="home-block-label">Expert Sessions</span>
            </div>
            <div className="home-stat-block">
              <span className="home-block-number">20+</span>
              <span className="home-block-label">Case Studies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;