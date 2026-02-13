import "../styles/focus.css";

const FocusAreas = () => {
  return (
    <section className="focus">
      <div className="container">
        <div className="focus-header">
          <h2>Theme & Focus Areas</h2>
          <p>
            The conference will explore key thematic areas that strengthen
            indigenous seed systems and advance seed sovereignty across
            Eastern Africa.
          </p>
        </div>

        <div className="focus-grid">
          <div className="focus-card">
            <h3>Seed Sovereignty</h3>
            <p>
              Advancing the rights of farmers to save, exchange, and manage
              indigenous seed systems without external restrictions.
            </p>
          </div>

          <div className="focus-card">
            <h3>Farmer-Managed Seed Systems</h3>
            <p>
              Strengthening community-based seed production, conservation,
              and local knowledge systems.
            </p>
          </div>

          <div className="focus-card">
            <h3>Climate Resilience</h3>
            <p>
              Promoting indigenous seed diversity as a strategy for adapting
              to climate variability and ecological challenges.
            </p>
          </div>

          <div className="focus-card">
            <h3>Policy & Advocacy</h3>
            <p>
              Creating enabling policy environments that protect traditional
              seed systems and farmer rights.
            </p>
          </div>

          <div className="focus-card">
            <h3>Regional Community of Practice</h3>
            <p>
              Building collaborative platforms for knowledge exchange,
              partnerships, and sustained regional engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;