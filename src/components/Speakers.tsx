import "../styles/speakers.css";

const speakers = [
  {
    name: "Dr. Miriam Njoroge",
    title: "Agroecology Researcher",
    organization: "University of Nairobi",
    country: "Kenya",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mr. Samuel Okello",
    title: "Seed Systems Specialist",
    organization: "Eastern Africa Farmers Alliance",
    country: "Uganda",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Asha Mwinyi",
    title: "Policy & Advocacy Advisor",
    organization: "Tanzania Seed Network",
    country: "Tanzania",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Prof. Daniel Tesfaye",
    title: "Climate Resilience Expert",
    organization: "Addis Ababa University",
    country: "Ethiopia",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const Speakers = () => {
  return (
    <section className="speakers">
      <div className="container">
        <div className="speakers-header">
          <h2>Featured Speakers</h2>
          <p>
            Distinguished regional leaders, researchers, and practitioners
            contributing to advancing indigenous seed systems across Eastern Africa.
          </p>
        </div>

        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <div className="speaker-card" key={index}>
              <div className="speaker-image">
                <img src={speaker.image} alt={speaker.name} />
              </div>

              <h3>{speaker.name}</h3>
              <p className="speaker-title">{speaker.title}</p>
              <p className="speaker-org">{speaker.organization}</p>
              <p className="speaker-country">{speaker.country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;