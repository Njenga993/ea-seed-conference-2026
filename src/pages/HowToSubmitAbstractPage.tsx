// pages/HowToSubmitAbstractPage.tsx
import { Helmet } from "react-helmet-async";
import "../styles/HowToSubmitAbstractPage.css";

import heroBackground from "../assets/_MG_0937.webp";

// ============================================================
// CONSTANTS
// ============================================================

const FARMER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc33-NGOCKxuN1AOT99gOs4wfsy3EKLuIP8TINPM7r-ZMorHg/viewform";

const ACADEMIA_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdurrPpJVew14dZJNb23D90XSA5r_BzJiU3PUmT8kAx848aqQ/viewform?usp=publish-editor";

// Flip this back to false if a late-submission window ever opens.
const SUBMISSIONS_CLOSED = true;

// ============================================================
// COMPONENT
// ============================================================

const HowToSubmitAbstractPage = () => {
  const handleCardClick = (type: "academia" | "farmer") => {
    if (SUBMISSIONS_CLOSED) return;
    window.open(type === "academia" ? ACADEMIA_FORM_URL : FARMER_FORM_URL, "_blank", "noopener,noreferrer");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Submit an Abstract for the 1st Eastern Africa Indigenous Seed Conference 2026",
    description: "Step-by-step guide for submitting abstracts to the EA-ISC 2026 conference.",
    totalTime: "PT20M",
  };

  return (
    <>
      <Helmet>
        <title>Submit an Abstract | EA-ISC 2026</title>
        <meta name="description" content="Submit your abstract for the 1st Eastern Africa Indigenous Seed Conference 2026." />
        <link rel="canonical" href="https://eaindigenousseedconference.org/how-to-submit-an-abstract" />
        <meta property="og:title" content="Submit an Abstract | EA-ISC 2026" />
        <meta property="og:description" content="Submit your abstract to EA-ISC 2026." />
        <meta property="og:url" content="https://eaindigenousseedconference.org/how-to-submit-an-abstract" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="submit-abstract-page">
        {/* ── Hero ── */}
        <section className="submit-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="hero-overlay" />
          <div className="hero-container">
            <nav className="hero-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span aria-hidden="true">/</span>
              <span className="current">Submit an Abstract</span>
            </nav>
            <div className="hero-content">
              <h1>Submit Your Abstract</h1>
              <p className="hero-description">
                {SUBMISSIONS_CLOSED
                  ? "Abstract submissions for EA-ISC 2026 are now closed. Thank you to everyone who submitted."
                  : "Choose your submission path below. We welcome contributions from academia, researchers, practitioners, and farmers."}
              </p>
              <div className="hero-meta">
                {SUBMISSIONS_CLOSED ? (
                  <span className="deadline-badge deadline-badge-closed">
                    Submissions Closed — Deadline was <strong>August 31st, 2026</strong>
                  </span>
                ) : (
                  <span className="deadline-badge">
                    Abstract Deadline: <strong>August 31st, 2026</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Selection Cards ── */}
        <section className="content-section">
          <div className="container narrow">
            <h2 className="text-center">Select Your Submission Type</h2>

            {SUBMISSIONS_CLOSED ? (
              <div className="submissions-closed-banner" role="status">
                <div className="submissions-closed-icon" aria-hidden="true">✕</div>
                <h3>Abstract Submissions Are Closed</h3>
                <p>
                  The submission deadline of <strong>August 31st, 2026</strong> has passed and we are
                  no longer accepting new abstracts. If you have questions about a submission you
                  already made, please contact the abstracts team below.
                </p>
              </div>
            ) : (
              <p className="section-subtitle text-center">
                Choose the option that best describes you to begin your submission. You will be redirected to a Google Form.
              </p>
            )}

            <div className="selection-cards">
              <div
                className={`selection-card ${SUBMISSIONS_CLOSED ? "disabled" : ""}`}
                onClick={() => handleCardClick("academia")}
                role="button"
                tabIndex={SUBMISSIONS_CLOSED ? -1 : 0}
                aria-disabled={SUBMISSIONS_CLOSED}
                onKeyDown={(e) => {
                  if (SUBMISSIONS_CLOSED) return;
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCardClick("academia"); }
                }}
                aria-label={
                  SUBMISSIONS_CLOSED
                    ? "Academia submissions are closed"
                    : "Open Academia, Students, Practitioners and Researchers submission form"
                }
              >
                <div className="selection-card-icon"></div>
                <h3>Academia, Students, Practitioners & Researchers</h3>
                <p>For researchers, academics, students, and practitioners submitting formal abstracts aligned with conference themes.</p>
                <span className="selection-card-badge">
                  {SUBMISSIONS_CLOSED ? "Closed" : "Academia Submission"}
                </span>
              </div>
              <div
                className={`selection-card ${SUBMISSIONS_CLOSED ? "disabled" : ""}`}
                onClick={() => handleCardClick("farmer")}
                role="button"
                tabIndex={SUBMISSIONS_CLOSED ? -1 : 0}
                aria-disabled={SUBMISSIONS_CLOSED}
                onKeyDown={(e) => {
                  if (SUBMISSIONS_CLOSED) return;
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCardClick("farmer"); }
                }}
                aria-label={
                  SUBMISSIONS_CLOSED
                    ? "Farmer submissions are closed"
                    : "Open Farmers and Seed Custodians submission form"
                }
              >
                <div className="selection-card-icon"></div>
                <h3>Farmers & Seed Custodians</h3>
                <p>For farmers and Seed Custodians sharing practical experiences, traditional knowledge, and on-the-ground insights.</p>
                <span className={`selection-card-badge ${SUBMISSIONS_CLOSED ? "" : "farmer-badge"}`}>
                  {SUBMISSIONS_CLOSED ? "Closed" : "Farmers Submission"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Abstract Requirements ── */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Abstract Requirements</h2>
            <div className="requirements-grid">
              <div className="requirement-card">
                <h3>Structure</h3>
                <ul>
                  <li>Title (maximum 200 characters)</li>
                  <li>Background and objectives</li>
                  <li>Methods</li>
                  <li>Results and findings</li>
                  <li>Conclusions and recommendations</li>
                  <li>Keywords (3–5)</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3>Word Count</h3>
                <ul>
                  <li>Minimum: 50 words</li>
                  <li>Maximum: 500 words</li>
                  <li>Recommended: 300–400 words</li>
                  <li>Title: separate field (max 200 characters)</li>
                  <li>Co-authors listed separately</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3>Selection Criteria</h3>
                <ul>
                  <li>Relevance to conference themes</li>
                  <li>Originality and significance</li>
                  <li>Methodological rigor</li>
                  <li>Clarity of presentation</li>
                  <li>Contribution to seed sovereignty</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Conference Themes ── */}
        <section className="content-section">
          <div className="container">
            <h2 className="text-center">Conference Themes</h2>
            <p className="section-subtitle text-center">Select the theme that best aligns with your submission:</p>
            <div className="themes-reference">
              {[
                { n: "01", title: "Farmer-Managed Seed Systems in Practice", desc: "Indigenous practices, community seed banking, participatory research, and livestock conservation" },
                { n: "02", title: "Seeds, Climate Change and Resilience", desc: "Climate adaptation, emergency seed response, and resilient livelihoods" },
                { n: "03", title: "Gender Equity and Social Inclusion", desc: "Women and youth leadership, intergenerational knowledge, and seed literacy" },
                { n: "04", title: "Market Innovations", desc: "Seed enterprises, local markets, indigenous foods, and value addition" },
                { n: "05", title: "Data Sovereignty and Trends", desc: "Digital rights, traditional knowledge protection, and biopiracy prevention" },
                { n: "06", title: "Policy Solutions for Seed Sovereignty", desc: "Farmers' rights, policy frameworks, and regional advocacy" },
              ].map(({ n, title, desc }) => (
                <div className="theme-ref-item" key={n}>
                  <span className="theme-ref-number">{n}</span>
                  <div className="theme-ref-content">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Important Dates ── 
        <section className="content-section bg-light">
          <div className="container narrow">
            <div className="dates-box">
              <h2 className="text-center">Important Dates</h2>
              <div className="dates-list">
                {[
                  ["Abstract Submission Deadline:", "August 31st, 2026"],
                  ["Notification of Acceptance:", "September 30th, 2026"],
                  ["Early Registration Deadline:", "September 30th, 2026"],
                  ["Conference Dates:", "November 17–20, 2026"],
                ].map(([label, value]) => (
                  <div className="date-item" key={label}>
                    <span className="date-label">{label}</span>
                    <span className="date-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>*/}

        {/* ── CTA ── */}
        <section className="cta-section">
          <div className="cta-pattern-overlay" />
          <div className="container">
            <h2>Need Assistance?</h2>
            <p className="cta-text">
              {SUBMISSIONS_CLOSED
                ? "If you have questions about a submission you already made, please contact our abstracts team."
                : "If you have questions about the submission process, please contact our abstracts team."}
            </p>
            <div className="cta-buttons">
              <a href="mailto:abstracts@eaindigenousseedconference.org" className="btn btn-primary">Email the Abstracts Team</a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn btn-secondary">Back to Top</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowToSubmitAbstractPage;