// components/HomeRegistration.tsx
import { useEffect, useRef } from "react";
import "../styles/Registration.css";

const Registration = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header elements
            setTimeout(() => {
              tagRef.current?.classList.add("home-reg-item-visible");
            }, 200);
            
            setTimeout(() => {
              titleRef.current?.classList.add("home-reg-item-visible");
            }, 350);
            
            setTimeout(() => {
              introRef.current?.classList.add("home-reg-item-visible");
            }, 500);

            // Animate cards with staggered delays
            setTimeout(() => {
              card1Ref.current?.classList.add("home-reg-item-visible");
            }, 650);
            
            setTimeout(() => {
              card2Ref.current?.classList.add("home-reg-item-visible");
            }, 800);
            
            setTimeout(() => {
              card3Ref.current?.classList.add("home-reg-item-visible");
            }, 950);
            
            setTimeout(() => {
              card4Ref.current?.classList.add("home-reg-item-visible");
            }, 1100);

            // Animate footer
            setTimeout(() => {
              footerRef.current?.classList.add("home-reg-item-visible");
            }, 1250);

            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleRegister = (type: string) => {
    console.log(`Registering for: ${type}`);
  };

  return (
    <section className="home-registration" ref={sectionRef}>
      <div className="home-registration-container">
        <div className="home-registration-header">
          <span 
            ref={tagRef} 
            className="home-registration-tag home-reg-stagger-item"
          >
            Registration Options
          </span>
          <h2 
            ref={titleRef} 
            className="home-registration-title home-reg-stagger-item"
          >
            Choose Your Participation
          </h2>
          <p 
            ref={introRef} 
            className="home-registration-intro home-reg-stagger-item"
          >
            Select the registration type that best suits your needs. Early registration 
            is encouraged due to limited capacity.
          </p>
        </div>

        <div className="home-pricing-grid">
          {/* Card 1: African & International Delegates */}
          <div 
            ref={card1Ref} 
            className="home-pricing-card featured home-reg-stagger-item"
          >
            <span className="home-card-badge">RECOMMENDED</span>
            <div className="home-card-header">
              <h3 className="home-pricing-name">African & International Delegates</h3>
            </div>
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
              <span>Register Now</span>
              <span className="home-btn-arrow">→</span>
            </button>
          </div>

          {/* Card 2: Farmers */}
          <div 
            ref={card2Ref} 
            className="home-pricing-card home-reg-stagger-item"
          >
            <div className="home-card-header">
              <h3 className="home-pricing-name">Farmers</h3>
            </div>
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
              <span>Register Now</span>
              <span className="home-btn-arrow">→</span>
            </button>
          </div>

          {/* Card 3: Virtual Participants */}
          <div 
            ref={card3Ref} 
            className="home-pricing-card home-reg-stagger-item"
          >
            <div className="home-card-header">
              <h3 className="home-pricing-name">Virtual Participants</h3>
            </div>
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
              <span>Register Now</span>
              <span className="home-btn-arrow">→</span>
            </button>
          </div>

          {/* Card 4: Add-ons */}
          <div 
            ref={card4Ref} 
            className="home-pricing-card add-ons home-reg-stagger-item"
          >
            <div className="home-card-header">
              <h3 className="home-pricing-name">Add-ons</h3>
            </div>
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
              <span>Add to Registration</span>
              <span className="home-btn-arrow">→</span>
            </button>
          </div>
        </div>

        <div 
          ref={footerRef} 
          className="home-registration-footer home-reg-stagger-item"
        >
          <div className="home-footer-info">
            <p className="home-registration-note">
              <strong>Note:</strong> The Registration Buttons are not active! Add-ons can only be purchased with a main registration type.
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