// components/HomeCallForAbstracts.tsx
import "../styles/CallForAbstracts.css";

const CallForAbstracts = () => {
  return (
    <section className="home-abstracts">
      <div className="home-abstracts-container">
        <div className="home-abstracts-content">
          <div className="home-abstracts-header">
            <span className="home-abstracts-tag"> Call for Papers</span>
            <h2 className="home-abstracts-title">Submit Your Abstract</h2>
            <p className="home-abstracts-intro">
              We invite researchers, academics, and practitioners to share their 
              innovative work and contribute to the advancement of agricultural science.
            </p>
          </div>

          <div className="home-deadline-section">
            <div className="home-deadline-card">
              <div className="home-deadline-content">
                <span className="home-deadline-label">Submission Deadline</span>
                <div className="home-deadline-date">
                  <strong>15 August 2026</strong>
                  <span className="home-deadline-days">60 days remaining</span>
                </div>
              </div>
            </div>
          </div>

          <div className="home-guidelines-section">
            <div className="home-guidelines-card">
              <div className="home-guidelines-header">
                <h3 className="home-guidelines-title"> Submission Guidelines</h3>
                <p className="home-guidelines-subtitle">Please ensure your abstract meets the following requirements</p>
              </div>
              
              <div className="home-guidelines-grid">
                <div className="home-guideline-item">
                  <div className="home-guideline-content">
                    <strong>Word Limit</strong>
                    <p>Maximum 300 words excluding references</p>
                  </div>
                </div>
                
                <div className="home-guideline-item">
                  <div className="home-guideline-content">
                    <strong>Author Details</strong>
                    <p>Include affiliation and contact information</p>
                  </div>
                </div>
                
                <div className="home-guideline-item">
                  <div className="home-guideline-content">
                    <strong>Focus Area</strong>
                    <p>Indicate your preferred conference track</p>
                  </div>
                </div>
                
                <div className="home-guideline-item">
                  <div className="home-guideline-content">
                    <strong>File Format</strong>
                    <p>Submit in PDF or Microsoft Word format</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="home-submission-section">
            <div className="home-submission-card">
              <h3 className="home-submission-title">Choose Your Submission Method</h3>
              
              <div className="home-submission-options">
                <a
                  href="mailto:conference2026@example.com"
                  className="home-submission-option primary"
                >
                  <div className="home-option-content">
                    <strong>Email Submission</strong>
                    <p>Send your abstract directly to our team</p>
                  </div>
                  <div className="home-option-arrow">→</div>
                </a>
                
                <a
                  href="#"
                  className="home-submission-option secondary"
                >
                  <div className="home-option-content">
                    <strong>Online Portal</strong>
                    <p>Use our secure submission system</p>
                  </div>
                  <div className="home-option-arrow">→</div>
                </a>
              </div>
            </div>
          </div>

          <div className="home-abstracts-footer">
            <div className="home-notification-card">
              <div className="home-notification-content">
                <p className="home-notification-text">
                  Acceptance notifications will be sent by 
                  <strong> 15 September 2026</strong>
                </p>
                <p className="home-notification-subtitle">
                  All submitted abstracts undergo peer review
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallForAbstracts;