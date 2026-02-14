import "../styles/CallForAbstracts.css";

const CallForAbstracts = () => {
  return (
    <section className="abstracts">
      <div className="container abstracts-wrapper">
        <div className="abstracts-content">
          <h2>Call for Abstracts</h2>

          <p className="abstracts-intro">
            Researchers, academics, and practitioners are invited to submit
            abstracts aligned with the conference theme and focus areas.
          </p>

          <div className="deadline-box">
            <span>Submission Deadline:</span>
            <strong>15 August 2026</strong>
          </div>

          <ul className="abstract-guidelines">
            <li>Maximum 300 words</li>
            <li>Include author affiliation and contact details</li>
            <li>Indicate preferred focus area</li>
            <li>Submit in PDF or Word format</li>
          </ul>

          <a
            href="mailto:conference2026@example.com"
            className="abstract-email-btn"
          >
            Submit via Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallForAbstracts;