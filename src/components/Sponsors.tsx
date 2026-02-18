// components/HomeSponsors.tsx
import "../styles/Sponsors.css";

const Sponsors = () => {
  const sponsors = [
    { 
      name: "Platinum Sponsor", 
      level: "Platinum",
      img: "https://via.placeholder.com/200x100?text=Platinum+Sponsor" 
    },
    { 
      name: "Gold Sponsor", 
      level: "Gold",
      img: "https://via.placeholder.com/180x90?text=Gold+Sponsor" 
    },
    { 
      name: "Gold Sponsor", 
      level: "Gold",
      img: "https://via.placeholder.com/180x90?text=Gold+Sponsor" 
    },
    { 
      name: "Silver Sponsor", 
      level: "Silver",
      img: "https://via.placeholder.com/160x80?text=Silver+Sponsor" 
    },
    { 
      name: "Silver Sponsor", 
      level: "Silver",
      img: "https://via.placeholder.com/160x80?text=Silver+Sponsor" 
    },
    { 
      name: "Supporting Partner", 
      level: "Partner",
      img: "https://via.placeholder.com/140x70?text=Partner" 
    },
  ];

  return (
    <section className="home-sponsors">
      <div className="home-sponsors-container">
        <div className="home-sponsors-header">
          <span className="home-sponsors-tag">Supporters</span>
          <h2 className="home-sponsors-title">Our Sponsors & Partners</h2>
          <p className="home-sponsors-intro">
            We gratefully acknowledge the institutions and organizations
            supporting this conference.
          </p>
        </div>

        <div className="home-sponsors-grid">
          {sponsors.map((sponsor, index) => (
            <div className="home-sponsor-card" key={index}>
              <div className="home-sponsor-image">
                <img src={sponsor.img} alt={sponsor.name} />
              </div>
              <div className="home-sponsor-level">{sponsor.level}</div>
            </div>
          ))}
        </div>

        <div className="home-sponsors-cta">
          <p className="home-sponsors-cta-text">
            Interested in sponsoring this conference?
          </p>
          <a href="/sponsorship" className="home-sponsors-button">
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;