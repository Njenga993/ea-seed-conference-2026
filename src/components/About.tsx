import "../styles/about.css";

const About = () => {
  return (
    <section className="about">
      <div className="container about-grid">
        <div className="about-text">
          <h2>About the Conference</h2>

          <p>
            The 1st Eastern Africa Indigenous Seed Conference 2026 brings
            together farmers, policymakers, researchers, civil society actors,
            and seed advocates from across the region to strengthen farmer-managed
            seed systems and promote seed sovereignty.
          </p>

          <p>
            The conference aims to foster regional collaboration, share knowledge,
            and advance policy frameworks that safeguard indigenous seed systems
            as a foundation for food security, climate resilience, and community
            self-determination.
          </p>

          <p>
            Through dialogue, field experiences, and collaborative learning,
            participants will contribute to building a regional Community of Practice
            focused on realizing the right to food through seed sovereignty.
          </p>
        </div>

        <div className="about-highlight">
          <h3>Key Objectives</h3>
          <ul>
            <li>Strengthen farmer-managed seed systems</li>
            <li>Promote indigenous seed knowledge exchange</li>
            <li>Enhance regional policy dialogue</li>
            <li>Build a Community of Practice (CoP)</li>
            <li>Advance climate-resilient agriculture strategies</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;