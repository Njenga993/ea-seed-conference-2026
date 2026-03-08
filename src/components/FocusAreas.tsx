// components/HomeFocusAreas.tsx
import "../styles/focus.css";

const FocusAreas = () => {
  const focusAreas = [
    {
      id: 1,
      title: "Seed Sovereignty",
      description: "Advancing the rights of farmers to save, exchange, and manage indigenous seed systems without external restrictions.",
      icon: "",
      category: "Rights & Governance"
    },
    {
      id: 2,
      title: "Farmer-Managed Seed Systems",
      description: "Strengthening community-based seed production, conservation, and local knowledge systems.",
      icon: "",
      category: "Community Practice"
    },
    {
      id: 3,
      title: "Climate Resilience",
      description: "Promoting indigenous seed diversity as a strategy for adapting to climate variability and ecological challenges.",
      icon: "",
      category: "Environment"
    },
    {
      id: 4,
      title: "Policy & Advocacy",
      description: "Creating enabling policy environments that protect traditional seed systems and farmer rights.",
      icon: "",
      category: "Governance"
    },
    {
      id: 5,
      title: "Regional Community of Practice",
      description: "Building collaborative platforms for knowledge exchange, partnerships, and sustained regional engagement.",
      icon: "",
      category: "Collaboration"
    },
    {
      id: 6,
      title: "Indigenous Knowledge",
      description: "Documenting and preserving traditional farming practices and seed conservation methods.",
      icon: "",
      category: "Heritage"
    }
  ];

  return (
    <section className="focus-section">
      <div className="focus-container">
        
        {/* Section Header - WordPress style */}
        <div className="focus-header">
          <span className="focus-header-tag">Conference Themes</span>
          <h2 className="focus-header-title">Theme & Focus Areas</h2>
          <div className="focus-header-decoration">
            <span className="decoration-line"></span>
            <span className="decoration-dot"></span>
            <span className="decoration-line"></span>
          </div>
          <p className="focus-header-description">
            The conference will explore key thematic areas that strengthen
            indigenous seed systems and advance seed sovereignty across
            Eastern Africa.
          </p>
        </div>

        {/* Featured Cards - WordPress block style */}
        <div className="focus-grid">
          {focusAreas.slice(0, 2).map((area) => (
            <article key={area.id} className="focus-card featured">
              <div className="focus-card-media">
                <span className="focus-card-icon">{area.icon}</span>
              </div>
              <div className="focus-card-content">
                <span className="focus-card-category">{area.category}</span>
                <h3 className="focus-card-title">{area.title}</h3>
                <p className="focus-card-description">{area.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Regular Cards Grid - WordPress grid style */}
        <div className="focus-grid-secondary">
          {focusAreas.slice(2).map((area) => (
            <article key={area.id} className="focus-card">
              <div className="focus-card-header">
                <span className="focus-card-icon-small">{area.icon}</span>
                <span className="focus-card-category-small">{area.category}</span>
              </div>
              <h3 className="focus-card-title-small">{area.title}</h3>
              <p className="focus-card-description-small">{area.description}</p>
            </article>
          ))}
        </div>

        {/* Call to Action - WordPress CTA block */}
        <div className="focus-cta">
          <div className="focus-cta-content">
            <h3 className="focus-cta-title">Want to present in one of these themes?</h3>
            <p className="focus-cta-description">
              Submit your abstract and join the conversation on seed sovereignty in Eastern Africa.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FocusAreas;