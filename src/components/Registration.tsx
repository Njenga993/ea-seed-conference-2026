import "../styles/Registration.css";

const Registration = () => {
  return (
    <section className="registration">
      <div className="container">
        <h2 className="section-title">Registration</h2>
        <p className="registration-intro">
          Secure your place at the conference. Early registration is strongly
          encouraged due to limited seating capacity.
        </p>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Student</h3>
            <p className="price">$500</p>
            <ul>
              <li>Access to all sessions</li>
              <li>Conference materials</li>
              <li>Certificate of participation</li>
            </ul>
            <button className="register-btn">Register Now</button>
          </div>

          <div className="pricing-card featured">
            <div className="badge">Most Popular</div>
            <h3>Academic</h3>
            <p className="price">$1200</p>
            <ul>
              <li>Access to all sessions</li>
              <li>Conference materials</li>
              <li>Lunch & refreshments</li>
              <li>Certificate of participation</li>
            </ul>
            <button className="register-btn">Register Now</button>
          </div>

          <div className="pricing-card">
            <h3>Professional</h3>
            <p className="price">$1500</p>
            <ul>
              <li>Access to all sessions</li>
              <li>Conference materials</li>
              <li>Lunch & refreshments</li>
              <li>Networking dinner</li>
              <li>Certificate of participation</li>
            </ul>
            <button className="register-btn">Register Now</button>
          </div>
        </div>

        <p className="registration-note">
          Registration confirmation will be sent via email upon successful
          payment.
        </p>
      </div>
    </section>
  );
};

export default Registration;