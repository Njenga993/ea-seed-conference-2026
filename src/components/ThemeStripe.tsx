// components/ThemeStripe.tsx (no changes needed)
import "../styles/themeStripe.css";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const ThemeStripe = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      sectionRef.current.style.setProperty('--mouse-x', `${x}%`);
      sectionRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section className="theme-stripe" ref={sectionRef}>
      <div className="theme-stripe-gradient"></div>
      <div className="theme-stripe-pattern"></div>
      
      <div className="theme-stripe-container">
        <div className="theme-stripe-content">
          <div className="theme-stripe-item theme-stripe-item-theme">
            <div className="theme-stripe-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="theme-stripe-text">
              <span className="theme-stripe-label">Theme</span>
              <h3 className="theme-stripe-value">Seed Sovereignty</h3>
              <p className="theme-stripe-subtitle">Realizing the Right to Food</p>
            </div>
          </div>

          <div className="theme-stripe-divider">
            <span className="theme-stripe-divider-dot"></span>
            <span className="theme-stripe-divider-line"></span>
            <span className="theme-stripe-divider-dot"></span>
          </div>
          
          <div className="theme-stripe-item theme-stripe-item-dates">
            <div className="theme-stripe-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="15" r="1" fill="currentColor"/>
                <circle cx="16" cy="15" r="1" fill="currentColor"/>
                <circle cx="8" cy="15" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div className="theme-stripe-text">
              <span className="theme-stripe-label">Dates</span>
              <h3 className="theme-stripe-value">November 17-20, 2026</h3>
              <p className="theme-stripe-subtitle">4 Days of Impact</p>
            </div>
          </div>

          <div className="theme-stripe-divider">
            <span className="theme-stripe-divider-dot"></span>
            <span className="theme-stripe-divider-line"></span>
            <span className="theme-stripe-divider-dot"></span>
          </div>
          
          <div className="theme-stripe-item theme-stripe-item-location">
            <div className="theme-stripe-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 16 20 10C20 5 16 2 12 2C8 2 4 5 4 10C4 16 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="theme-stripe-text">
              <span className="theme-stripe-label">Location</span>
              <h3 className="theme-stripe-value">Nairobi, Kenya</h3>
              <p className="theme-stripe-subtitle">Kenyatta International Conference Centre</p>
            </div>
          </div>
          
          <div className="theme-stripe-cta-wrapper">
            <Link to="/registration-abstract" className="theme-stripe-cta">
              <span className="theme-stripe-cta-text">Secure Your Seat</span>
              <span className="theme-stripe-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="theme-stripe-cta-shine"></span>
            </Link>
            <p className="theme-stripe-cta-note">Early bird ends Oct 15</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeStripe;