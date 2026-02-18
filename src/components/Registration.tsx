// components/HomeRegistration.tsx
import "../styles/Registration.css";

const Registration = () => {
  const registrationTypes = [
    {
      id: 1,
      name: "Student",
      price: "$500",
      features: [
        "Access to all sessions",
        "Conference materials",
        "Certificate of participation"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Academic",
      price: "$1200",
      features: [
        "Access to all sessions",
        "Conference materials",
        "Lunch & refreshments",
        "Certificate of participation"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Professional",
      price: "$1500",
      features: [
        "Access to all sessions",
        "Conference materials",
        "Lunch & refreshments",
        "Networking dinner",
        "Certificate of participation"
      ],
      popular: false
    }
  ];

  return (
    <section className="home-registration">
      <div className="home-registration-container">
        <div className="home-registration-header">
          <span className="home-registration-tag">Join Us</span>
          <h2 className="home-registration-title">Registration</h2>
          <p className="home-registration-intro">
            Secure your place at the conference. Early registration is strongly
            encouraged due to limited seating capacity.
          </p>
        </div>

        <div className="home-pricing-grid">
          {registrationTypes.map((type) => (
            <div 
              key={type.id} 
              className={`home-pricing-card ${type.popular ? 'popular' : ''}`}
            >
              {type.popular && (
                <div className="home-popular-badge">Most Popular</div>
              )}
              
              <h3 className="home-pricing-name">{type.name}</h3>
              <div className="home-pricing-price">
                <span className="home-price-amount">{type.price}</span>
                <span className="home-price-period">/person</span>
              </div>
              
              <ul className="home-pricing-features">
                {type.features.map((feature, index) => (
                  <li key={index} className="home-feature-item">
                    <span className="home-feature-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="home-register-btn">Register Now</button>
            </div>
          ))}
        </div>

        <div className="home-registration-footer">
          <p className="home-registration-note">
            Registration confirmation will be sent via email upon successful payment.
          </p>
          <p className="home-registration-support">
            Need help? <a href="mailto:registration@eaisc2026.org">Contact registration support</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;