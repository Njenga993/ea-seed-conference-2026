// components/HomeCallForAbstracts.tsx
import { useEffect, useRef } from "react";
import "../styles/CallForAbstracts.css";

const CallForAbstracts = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const deadlineRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              headerRef.current?.classList.add("abstract-visible");
            }, 200);
            
            setTimeout(() => {
              deadlineRef.current?.classList.add("abstract-visible");
            }, 400);
            
            setTimeout(() => {
              leftPanelRef.current?.classList.add("abstract-visible");
            }, 600);
            
            setTimeout(() => {
              rightPanelRef.current?.classList.add("abstract-visible");
            }, 800);
            
            setTimeout(() => {
              footerRef.current?.classList.add("abstract-visible");
            }, 1000);

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

  return (
    <section className="abstract-section" ref={sectionRef}>
      <div className="abstract-container">
        
        {/* Header */}
        <div className="abstract-header" ref={headerRef}>
          <span className="abstract-tag">Call for Abstracts</span>
          <h2 className="abstract-title">Share Your Research</h2>
          <p className="abstract-subtitle">
            Contribute to the advancement of seed sovereignty in Eastern Africa
          </p>
        </div>

        {/* Deadline Banner */}
        <div className="abstract-deadline" ref={deadlineRef}>
          <div className="deadline-banner">
            <div className="deadline-banner-content">
              <span className="deadline-banner-label">Submission Deadline</span>
              <span className="deadline-banner-date">August 15, 2026</span>
            </div>
            <div className="deadline-banner-remaining">
              <span className="deadline-banner-days">60 days remaining</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="abstract-grid">
          
          {/* Left Column - Guidelines */}
          <div className="abstract-card" ref={leftPanelRef}>
            <h3 className="abstract-card-title">Guidelines</h3>
            
            <div className="guidelines-list">
              <div className="guideline-item">
                <span className="guideline-bullet"></span>
                <div className="guideline-content">
                  <h4>Word Limit</h4>
                  <p>300 words maximum, excluding references</p>
                </div>
              </div>

              <div className="guideline-item">
                <span className="guideline-bullet"></span>
                <div className="guideline-content">
                  <h4>Author Information</h4>
                  <p>Include full names, affiliations, and contact details</p>
                </div>
              </div>

              <div className="guideline-item">
                <span className="guideline-bullet"></span>
                <div className="guideline-content">
                  <h4>Conference Tracks</h4>
                  <p>Specify your preferred presentation track</p>
                </div>
              </div>

              <div className="guideline-item">
                <span className="guideline-bullet"></span>
                <div className="guideline-content">
                  <h4>Format</h4>
                  <p>PDF or Word document, 12pt Times New Roman</p>
                </div>
              </div>

              <div className="guideline-item">
                <span className="guideline-bullet"></span>
                <div className="guideline-content">
                  <h4>Language</h4>
                  <p>English only (presentations can be in local languages)</p>
                </div>
              </div>

              <div className="guideline-item">
                <span className="guideline-bullet"></span>
                <div className="guideline-content">
                  <h4>Review Process</h4>
                  <p>Double-blind peer review by scientific committee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Submission Methods */}
          <div className="abstract-card" ref={rightPanelRef}>
            <h3 className="abstract-card-title">Submit Your Abstract</h3>
            
            <div className="submission-content">
              
              <a href="mailto:abstracts@eaindeigenousseedsconference.org" className="submission-card">
                <div className="submission-card-header">
                  <h4 className="submission-card-title">Email Submission</h4>
                </div>
                <p className="submission-card-description">
                  Send your abstract directly to our editorial team
                </p>
                <div className="submission-card-detail">
                  <span className="submission-card-label">Email:</span>
                  <span className="submission-card-value">abstracts@eaindeigenousseedsconference.org</span>
                </div>
                <span className="submission-card-arrow">→</span>
              </a>
              
              <div className="submission-note">
                <span className="submission-note-icon">•</span>
                <p className="submission-note-text">
                  At least one author must register by October 31, 2026 for inclusion in the program
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Important Dates */}
        <div className="abstract-footer" ref={footerRef}>
          <div className="dates-grid">
            <div className="date-item">
              <span className="date-label">Abstract Submission</span>
              <span className="date-value">Aug 15, 2026</span>
            </div>
            <div className="date-item">
              <span className="date-label">Notification</span>
              <span className="date-value">Sep 15, 2026</span>
            </div>
            <div className="date-item">
              <span className="date-label">Early Bird</span>
              <span className="date-value">Oct 31, 2026</span>
            </div>
            <div className="date-item">
              <span className="date-label">Conference</span>
              <span className="date-value">Nov 17-20, 2026</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CallForAbstracts;