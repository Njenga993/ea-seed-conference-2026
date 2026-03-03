// components/ThemeStripe.tsx
import "../styles/themeStripe.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const ThemeStripe = () => {
  const sectionRef = useRef<HTMLElement>(null);
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

  // Scroll-triggered reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
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

      <div className="theme-stripe-container">
        <div className="theme-stripe-content">

          {/* THEME */}
          <div className="theme-stripe-item">
            <div>
              <span className="theme-stripe-label">Theme</span>
              <h3 className="theme-stripe-value">
                Realizing the Right to Food through Seed Sovereignty
              </h3>
            </div>
          </div>

          <div className="theme-stripe-divider"></div>

          {/* DATES */}
          <div className="theme-stripe-item">
            <div>
              <span className="theme-stripe-label">Dates</span>
              <h3 className="theme-stripe-value">
                November 17–20, 2026
              </h3>
              <p className="theme-stripe-subtitle">4 Days of Impact</p>
            </div>
          </div>

          <div className="theme-stripe-divider"></div>

          {/* LOCATION */}
          <div className="theme-stripe-item">
            <div>
              <span className="theme-stripe-label">Location</span>
              <h3 className="theme-stripe-value">Nairobi, Kenya</h3>
            </div>
          </div>

          {/* CTA */}
          <div className="theme-stripe-cta-wrapper">
            <Link to="/registration-abstract" className="theme-stripe-cta">
              Secure Your Seat →
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