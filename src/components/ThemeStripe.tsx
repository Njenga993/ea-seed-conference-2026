// components/ThemeStripe.tsx
import "../styles/themeStripe.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const ThemeStripe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse highlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      sectionRef.current.style.setProperty("--mouse-x", `${x}%`);
      sectionRef.current.style.setProperty("--mouse-y", `${y}%`);
    };

    const section = sectionRef.current;
    if (section) section.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (section) section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Scroll-triggered staggered reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Add visible class to each element with staggered timing
            setTimeout(() => {
              themeRef.current?.classList.add("stripe-item-visible");
            }, 200);
            
            setTimeout(() => {
              datesRef.current?.classList.add("stripe-item-visible");
            }, 350);
            
            setTimeout(() => {
              locationRef.current?.classList.add("stripe-item-visible");
            }, 500);
            
            setTimeout(() => {
              ctaRef.current?.classList.add("stripe-item-visible");
            }, 650);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`theme-stripe sticky-stripe ${
        isVisible ? "stripe-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="theme-stripe-gradient"></div>
      <div className="theme-stripe-pattern"></div>

      <div className="theme-stripe-container">
        <div className="theme-stripe-content">
          {/* THEME */}
          <div 
            ref={themeRef} 
            className="theme-stripe-item theme-stagger-item"
          >
            
            <div className="theme-item-content">
              <span className="theme-stripe-label">Theme</span>
              <h3 className="theme-stripe-value">
                Realizing the Right to Food through Seed Sovereignty
              </h3>
            </div>
          </div>

          <div className="theme-stripe-divider"></div>

          {/* DATES */}
          <div 
            ref={datesRef} 
            className="theme-stripe-item theme-stagger-item"
          >
            
            <div className="theme-item-content">
              <span className="theme-stripe-label">Dates</span>
              <h3 className="theme-stripe-value">
                November 17–20, 2026
              </h3>
              <p className="theme-stripe-subtitle">4 Days of Impact</p>
            </div>
          </div>

          <div className="theme-stripe-divider"></div>

          {/* LOCATION */}
          <div 
            ref={locationRef} 
            className="theme-stripe-item theme-stagger-item"
          >
            
            <div className="theme-item-content">
              <span className="theme-stripe-label">Location</span>
              <h3 className="theme-stripe-value">Nairobi, Kenya</h3>
            </div>
          </div>

          {/* CTA */}
          <div 
            ref={ctaRef} 
            className="theme-stripe-cta-wrapper theme-stagger-item"
          >
            <Link to="/registration-abstract" className="theme-stripe-cta">
              <span>Secure Your Seat</span>
              <span className="theme-cta-arrow">→</span>
            </Link>
            <p className="theme-stripe-cta-note">
              Early bird ends Oct 15
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemeStripe;