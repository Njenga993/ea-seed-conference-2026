import "../styles/Sponsors.css";

const Sponsors = () => {
  const sponsors = [
    { name: "Platinum Sponsor", img: "https://via.placeholder.com/180x80?text=Sponsor+1" },
    { name: "Gold Sponsor", img: "https://via.placeholder.com/180x80?text=Sponsor+2" },
    { name: "Gold Sponsor", img: "https://via.placeholder.com/180x80?text=Sponsor+3" },
    { name: "Silver Sponsor", img: "https://via.placeholder.com/180x80?text=Sponsor+4" },
    { name: "Silver Sponsor", img: "https://via.placeholder.com/180x80?text=Sponsor+5" },
  ];

  return (
    <section className="sponsors">
      <div className="container">
        <h2 className="section-title">Our Sponsors & Partners</h2>
        <p className="sponsors-intro">
          We gratefully acknowledge the institutions and organizations
          supporting this conference.
        </p>

        <div className="sponsor-grid">
          {sponsors.map((sponsor, index) => (
            <div className="sponsor-card" key={index}>
              <img src={sponsor.img} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;