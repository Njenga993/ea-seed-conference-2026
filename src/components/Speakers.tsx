// components/HomeSpeakers.tsx
import "../styles/speakers.css";

const speakers = [
  {
    name: "Dr. Miriam Njoroge",
    title: "Agroecology Researcher",
    organization: "University of Nairobi",
    country: "Kenya",
    expertise: ["Seed Systems", "Agroecology"],
    image: "", // Placeholder - replace with actual images
  },
  {
    name: "Mr. Samuel Okello",
    title: "Seed Systems Specialist",
    organization: "Eastern Africa Farmers Alliance",
    country: "Uganda",
    expertise: ["Farmer-Managed Seeds", "Policy"],
    image: "",
  },
  {
    name: "Dr. Asha Mwinyi",
    title: "Policy & Advocacy Advisor",
    organization: "Tanzania Seed Network",
    country: "Tanzania",
    expertise: ["Policy Advocacy", "Seed Rights"],
    image: "",
  },
  {
    name: "Prof. Daniel Tesfaye",
    title: "Climate Resilience Expert",
    organization: "Addis Ababa University",
    country: "Ethiopia",
    expertise: ["Climate Adaptation", "Seed Diversity"],
    image: "",
  },
];

const Speakers = () => {
  return (
    <section className="home-speakers">
      <div className="home-speakers-container">
        <div className="home-speakers-header">
          <span className="home-speakers-tag">Meet the Experts</span>
          <h2 className="home-speakers-title">Featured Speakers</h2>
          <p className="home-speakers-subtitle">
            Distinguished regional leaders, researchers, and practitioners
            contributing to advancing indigenous seed systems across Eastern Africa.
          </p>
        </div>

        <div className="home-speakers-grid">
          {speakers.map((speaker, index) => (
            <div className="home-speaker-card" key={index}>
              <div className="home-speaker-image">
                <img src={speaker.image} alt={speaker.name} />
              </div>

              <div className="home-speaker-content">
                <h3 className="home-speaker-name">{speaker.name}</h3>
                <p className="home-speaker-title">{speaker.title}</p>
                <p className="home-speaker-org">{speaker.organization}</p>
                
                <div className="home-speaker-expertise">
                  {speaker.expertise.map((exp, i) => (
                    <span key={i} className="home-expertise-tag">{exp}</span>
                  ))}
                </div>
              
              </div>
            </div>
          ))}
        </div>

        <div className="home-speakers-cta">
          <button className="home-speakers-button">View All Speakers</button>
        </div>
      </div>
    </section>
  );
};

export default Speakers;