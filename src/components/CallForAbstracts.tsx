// components/HomeCallForAbstracts.tsx
import "../styles/CallForAbstracts.css";

const CallForAbstracts = () => {
  return (
    <section className="home-abstracts">
      <div className="home-abstracts-container">
        <div className="home-abstracts-content">
          <div className="home-abstracts-header">
            <span className="home-abstracts-tag">Call for Papers</span>
            <h2 className="home-abstracts-title">Call for Abstracts</h2>
            <p className="home-abstracts-intro">
              Researchers, academics, and practitioners are invited to submit
              abstracts aligned with the conference theme and focus areas.
            </p>
          </div>

          <div className="home-deadline-card">
            <div className="home-deadline-icon"></div>
            <div className="home-deadline-text">
              <span>Submission Deadline</span>
              <strong>15 August 2026</strong>
            </div>
          </div>

          <div className="home-guidelines-card">
            <h3 className="home-guidelines-title">Submission Guidelines</h3>
            <ul className="home-guidelines-list">
              <li className="home-guideline-item">
                <span className="home-guideline-icon">✓</span>
                <span>Maximum 300 words</span>
              </li>
              <li className="home-guideline-item">
                <span className="home-guideline-icon">✓</span>
                <span>Include author affiliation and contact details</span>
              </li>
              <li className="home-guideline-item">
                <span className="home-guideline-icon">✓</span>
                <span>Indicate preferred focus area</span>
              </li>
              <li className="home-guideline-item">
                <span className="home-guideline-icon">✓</span>
                <span>Submit in PDF or Word format</span>
              </li>
            </ul>
          </div>

          <div className="home-submission-actions">
            <a
              href="mailto:conference2026@example.com"
              className="home-email-btn"
            >
              <span className="home-btn-icon"></span>
              Submit via Email
            </a>
            <p className="home-submission-note">
              Or use our online submission system
            </p>
          </div>

          <div className="home-abstracts-footer">
            <p className="home-notification-text">
              <span className="home-notification-icon"></span>
              Notifications of acceptance will be sent by <strong>15 September 2026</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallForAbstracts;