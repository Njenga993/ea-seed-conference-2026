// components/HomeAbout.tsx
import { useEffect, useRef } from "react";
import "../styles/about.css";
import heroImage from "../assets/fair.webp";
import heroImage1 from "../assets/maize.webp";
import heroImage2 from "../assets/seeds.webp";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-visible");
            
            // Add delay classes based on data-delay attribute
            const delay = entry.target.getAttribute("data-delay");
            if (delay) {
              entry.target.classList.add(`home-delay-${delay}`);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all elements with animation classes
    const elements = [
      tagRef.current,
      titleRef.current,
      paragraph1Ref.current,
      paragraph2Ref.current,
      ctaRef.current,
      photo1Ref.current,
      photo2Ref.current,
      photo3Ref.current,
    ];

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-about" ref={sectionRef}>
      <div className="home-about-container">
        <div className="home-about-grid">
          <div className="home-about-content">
            <div className="home-about-header">
              <span 
                ref={tagRef} 
                className="home-about-tag home-fade-up"
                data-delay="1"
              >
                About the Conference
              </span>
              <h2 
                ref={titleRef} 
                className="home-about-title home-fade-up"
                data-delay="2"
              >
                1st Eastern Africa Indigenous Seed Conference 2026
              </h2>
            </div>

            <div className="home-about-text">
              <p 
                ref={paragraph1Ref} 
                className="home-about-paragraph home-fade-up"
                data-delay="3"
              >
                A landmark gathering bringing together farmers, policymakers, researchers, 
                and seed advocates from across Eastern Africa to champion seed sovereignty 
                and strengthen farmer-managed seed systems.
              </p>

              <p 
                ref={paragraph2Ref} 
                className="home-about-paragraph home-fade-up"
                data-delay="4"
              >
                Join us in Nairobi for four days of knowledge exchange, regional collaboration, 
                and advancing policies that protect indigenous seed systems as the foundation 
                of food security and climate resilience.
              </p>
            </div>

            <div 
              ref={ctaRef} 
              className="home-about-cta home-fade-up"
              data-delay="5"
            >
              <a href="/about" className="home-learn-more">
                Learn More About Us
                <span className="home-cta-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="home-about-visual">
            <div className="home-photo-collage">
              <div 
                ref={photo1Ref} 
                className="home-photo home-photo-1 home-scale-in"
                data-delay="2"
              >
                <img src={heroImage} alt="Conference participants" />
                <div className="home-photo-overlay"></div>
              </div>
              <div 
                ref={photo2Ref} 
                className="home-photo home-photo-2 home-scale-in"
                data-delay="4"
              >
                <img src={heroImage1} alt="Indigenous seed display" />
                <div className="home-photo-overlay"></div>
              </div>
              <div 
                ref={photo3Ref} 
                className="home-photo home-photo-3 home-scale-in"
                data-delay="6"
              >
                <img src={heroImage2} alt="Farmers with seeds" />
                <div className="home-photo-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;