// pages/RegistrationPage.tsx

import Registration from "../components/Registration"; 
import AbstractSubmission from "../components/CallForAbstracts";
import "../styles/registrationAbstract.css";

const RegistrationPage = () => {
  return (
    <div className="reg-page">
      {/* Hero Section */}
      <section className="reg-page-hero">
        <div className="reg-page-hero-container">
          <div className="reg-page-hero-content">
            <span className="reg-page-hero-tag">Registration</span>
            <h1 className="reg-page-hero-title">
              Join Us at the 1st Eastern Africa Indigenous Seed Conference 2026
            </h1>
            <p className="reg-page-hero-subtitle">
              Secure your place at the region's premier gathering on seed sovereignty 
              and farmer-managed seed systems.
            </p>
          </div>
        </div>
      </section>

      {/* Import your existing components */}
      <Registration />
      <AbstractSubmission />
    </div>
  );
};

export default RegistrationPage;