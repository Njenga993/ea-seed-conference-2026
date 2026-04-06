// components/InfoCards.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "../styles/InfoCards.css";

const InfoCards = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Properly typed ref array for HTMLDivElement
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header first
            if (headerRef.current) {
              setTimeout(() => {
                headerRef.current?.classList.add("info-header-visible");
              }, 200);
            }

            // Animate cards with staggered delays
            setTimeout(() => {
              card1Ref.current?.classList.add("info-card-visible");
            }, 400);

            setTimeout(() => {
              card2Ref.current?.classList.add("info-card-visible");
            }, 600);

            setTimeout(() => {
              card3Ref.current?.classList.add("info-card-visible");
            }, 800);

            setTimeout(() => {
              card4Ref.current?.classList.add("info-card-visible");
            }, 1000);

            setTimeout(() => {
              card5Ref.current?.classList.add("info-card-visible");
            }, 1200);

            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLearnMore = (path: string) => {
    navigate(path);
  };

  return (
    <section className="conf-info-cards-section" ref={sectionRef}>
      <div className="conf-info-cards-container">
        <header className="conf-info-cards-header" ref={headerRef}>
          <span className="conf-info-cards-tag">Important Information</span>
          <h2 className="conf-info-cards-title">Everything You Need to Know</h2>
          <p className="conf-info-cards-subtitle">
            Get detailed information about abstract submission, registration
            process, venue details, sponsorship opportunities, and side events
          </p>
        </header>

        <div className="conf-info-cards-grid">
          {/* Abstract Card */}
          <article className="conf-info-card" ref={card1Ref}>
            <div className="conf-card-content">
              <span className="conf-card-badge">Now Open</span>
              <h3 className="conf-card-title">Abstract Submission</h3>

              <p className="conf-card-description">
                Submit your research abstracts for consideration. Contributions
                are welcome from all relevant fields.
              </p>

              <div className="conf-card-deadline">
                <div className="conf-deadline-label">Submission Deadline</div>
                <div className="conf-deadline-date">September 30, 2026</div>
              </div>

              <ul className="conf-card-features">
                <li>250–500 words limit</li>
                <li>Peer-reviewed process</li>
                <li>Publication opportunities</li>
              </ul>
            </div>

            <button
              className="conf-card-learn-more"
              onClick={() => handleLearnMore("/how-to-submit-abstract")}
            >
              Learn More
              <span className="conf-card-arrow">→</span>
            </button>
          </article>

          {/* Registration Card */}
          <article className="conf-info-card" ref={card2Ref}>
            <div className="conf-card-content">
              <span className="conf-card-badge">Early Bird</span>
              <h3 className="conf-card-title">Registration</h3>

              <p className="conf-card-description">
                Secure your participation in the conference and benefit from
                early registration discounts.
              </p>

              <div className="conf-card-deadline">
                <div className="conf-deadline-label">Early Bird Ends</div>
                <div className="conf-deadline-date">October 31, 2026</div>
              </div>

              <ul className="conf-card-features">
                <li>Multiple registration types</li>
                <li>Group discounts available</li>
                <li>Certificate of attendance</li>
              </ul>
            </div>

            <button
              className="conf-card-learn-more"
              onClick={() => handleLearnMore("/registration-abstract")}
            >
              Learn More
              <span className="conf-card-arrow">→</span>
            </button>
          </article>

          {/* Venue Card */}
          <article className="conf-info-card" ref={card3Ref}>
            <div className="conf-card-content">
              <span className="conf-card-badge">Nairobi, Kenya</span>
              <h3 className="conf-card-title">Venue & Location</h3>

              <p className="conf-card-description">
                The conference will take place in Nairobi, providing a central
                location for regional participants.
              </p>

              <div className="conf-card-deadline">
                <div className="conf-deadline-label">Conference Dates</div>
                <div className="conf-deadline-date">Nov 17 – 20, 2026</div>
              </div>

              <ul className="conf-card-features">
                <li>Modern conference facilities</li>
                <li>Accessible location</li>
                <li>Nearby accommodations</li>
              </ul>
            </div>

            <button
              className="conf-card-learn-more"
              onClick={() => handleLearnMore("/contact")}
            >
              Learn More
              <span className="conf-card-arrow">→</span>
            </button>
          </article>

          {/* Sponsorship Card - NEW */}
          <article
            className="conf-info-card conf-info-card--sponsor"
            ref={card4Ref}
          >
            <div className="conf-card-content">
              <span className="conf-card-badge">Partner With Us</span>
              <h3 className="conf-card-title">Become a Sponsor</h3>

              <p className="conf-card-description">
                Showcase your organization's commitment to indigenous seed
                sovereignty and agricultural biodiversity.
              </p>

              <div className="conf-card-deadline">
                <div className="conf-deadline-label">Sponsorship Deadline</div>
                <div className="conf-deadline-date">October 15, 2026</div>
              </div>

              <ul className="conf-card-features">
                <li> Premium brand visibility</li>
                <li> Network with key stakeholders</li>
                <li> Speaking opportunities</li>
                <li> Featured in all conference materials</li>
                <li> Complimentary registrations</li>
              </ul>
            </div>

            <button
              className="conf-card-learn-more"
              onClick={() => handleLearnMore("/sponsorship")}
            >
              View Packages
              <span className="conf-card-arrow">→</span>
            </button>
          </article>

          {/* Side Events Card - NEW */}
          <article
            className="conf-info-card conf-info-card--sideevent"
            ref={card5Ref}
          >
            <div className="conf-card-content">
              <span className="conf-card-badge">Limited Slots</span>
              <h3 className="conf-card-title">Host a Side Event</h3>

              <p className="conf-card-description">
                Organize workshops, panel discussions, or networking sessions
                alongside the main conference program.
              </p>

              <div className="conf-card-deadline">
                <div className="conf-deadline-label">Application Deadline</div>
                <div className="conf-deadline-date">September 15, 2026</div>
              </div>

              <ul className="conf-card-features">
                <li> 60-90 minute session slots</li>
                <li> Free meeting space</li>
                <li> Promoted in conference program</li>
                <li> 2 Free Delegates Tickets</li>
                <li> 2 Free Farmers Tickets</li>
                <li> Amplify your organization's work</li>
              </ul>
            </div>

            <button
              className="conf-card-learn-more"
              onClick={() => handleLearnMore("/how-to-apply-for-side-events")}
            >
              Apply Now
              <span className="conf-card-arrow">→</span>
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
