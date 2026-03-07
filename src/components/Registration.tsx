// components/HomeRegistration.tsx
import "../styles/Registration.css";

const Registration = () => {
  const handleRegister = (type: string) => {
    // Handle registration logic
    console.log(`Registering for: ${type}`);
  };

  return (
    <section className="home-registration">
      <div className="home-registration-container">
        <div className="home-registration-header">
          <span className="home-registration-tag">Registration Options</span>
          <h2 className="home-registration-title">Choose Your Participation</h2>
          <p className="home-registration-intro">
            Select the registration type that best suits your needs. Early registration 
            is encouraged due to limited capacity.
          </p>
        </div>

        <div className="home-pricing-grid">
          {/* Card 1: African & International Delegates */}
          <div className="home-pricing-card featured">
            <h3 className="home-pricing-name">African & International Delegates</h3>
            <div className="home-pricing-price">
              <span className="home-price-amount">$200</span>
            </div>
            <ul className="home-pricing-features">
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Access to all conference sessions</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Conference materials & resources</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Lunch & refreshments</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Certificate of participation</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Networking opportunities</span>
              </li>
            </ul>
            <button 
              className="home-register-btn"
              onClick={() => handleRegister('Delegates')}
            >
              Register Now
            </button>
          </div>

          {/* Card 2: Farmers */}
          <div className="home-pricing-card">
            <h3 className="home-pricing-name">Farmers</h3>
            <div className="home-pricing-price">
              <span className="home-price-amount">$150</span>
            </div>
            <ul className="home-pricing-features">
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Access to all conference sessions</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Farm-focused workshops</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Conference materials</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Lunch & refreshments</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Certificate of participation</span>
              </li>
            </ul>
            <button 
              className="home-register-btn"
              onClick={() => handleRegister('Farmers')}
            >
              Register Now
            </button>
          </div>

          {/* Card 3: Virtual Participants */}
          <div className="home-pricing-card">
            <h3 className="home-pricing-name">Virtual Participants</h3>
            <div className="home-pricing-price">
              <span className="home-price-amount">$100</span>
            </div>
            <ul className="home-pricing-features">
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Live streaming of all sessions</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Virtual networking rooms</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Digital conference materials</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Q&A participation</span>
              </li>
              <li className="home-feature-item">
                <span className="home-feature-icon">✓</span>
                <span>Digital certificate</span>
              </li>
            </ul>
            <button 
              className="home-register-btn"
              onClick={() => handleRegister('Virtual')}
            >
              Register Now
            </button>
          </div>

          {/* Card 4: Add-ons */}
          <div className="home-pricing-card add-ons">
            <h3 className="home-pricing-name">Add-ons</h3>
            <div className="home-pricing-price">
              <span className="home-price-amount">Optional</span>
            </div>
            <div className="home-addons-list">
              <div className="home-addon-item">
                <div className="home-addon-info">
                  <h4 className="home-addon-name">Field Excursion</h4>
                  <p className="home-addon-desc">Visit local agricultural projects</p>
                </div>
                <div className="home-addon-price">$50</div>
              </div>
              <div className="home-addon-item">
                <div className="home-addon-info">
                  <h4 className="home-addon-name">Gala Dinner</h4>
                  <p className="home-addon-desc">Formal networking dinner event</p>
                </div>
                <div className="home-addon-price">$100</div>
              </div>
            </div>
            <button 
              className="home-register-btn addon-btn"
              onClick={() => handleRegister('Add-ons')}
            >
              Add to Registration
            </button>
          </div>
        </div>

        <div className="home-registration-footer">
          <div className="home-footer-info">
            <p className="home-registration-note">
              <strong>Note:</strong> The Registarion Buttons are not active! Add-ons can only be purchased with a main registration type.
            </p>
            <p className="home-registration-support">
              Need help with registration? 
              <a href="mailto:registration@eaisc2026.org">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;