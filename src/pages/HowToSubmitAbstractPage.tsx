// pages/HowToSubmitAbstractPage.tsx
import { Helmet } from "react-helmet-async";
import "../styles/HowToSubmitAbstractPage.css";

// Import background image (use your own)
import heroBackground from "../assets/_MG_0937.webp";

const HowToSubmitAbstractPage = () => {
  // Steps data for easier maintenance
  const steps = [
    {
      number: "01",
      title: "Log into the Submission System",
      content:
        "The first step is logging into the Ex Ordo submission system. Enter your email address, your first and last name, and a secure password. After which, you will be taken to your dashboard.",
      imagePlaceholder: true,
    },
    {
      number: "02",
      title: "Start Your Submission",
      content:
        "On your dashboard, find your 'Submit' card and select 'Submit Your Abstract' to begin the process. You will then be brought into the workflow where you'll see all steps listed on the left-hand side. Red indicators mean incomplete; green means complete.",
      imagePlaceholder: true,
    },
    {
      number: "03",
      title: "Review Guide for Authors",
      content:
        "Read the conference guidelines carefully. Ensure your submission aligns with one of the six conference themes. If you have questions, contact the conference organizers at info@eaindigenousseedsconference.org. Once ready, click 'Skip: Start Workflow' to proceed.",
      imagePlaceholder: false,
    },
    {
      number: "04",
      title: "Select Presentation Format",
      content:
        "Choose your preferred presentation format if your submission is accepted. Options include: Oral Presentation, Poster Presentation, Panel Session, or Creative Arts/Exhibition. Select the appropriate format and click 'Done: Go to Next Step'.",
      imagePlaceholder: true,
    },
    {
      number: "05",
      title: "Enter Paper Title and Abstract",
      content:
        "Type your submission title and abstract into the provided fields. You may copy and paste, but ensure you adhere to the word limit (300-500 words). Use the text editor for formatting if needed. Click 'Done: Go to Next Step' when finished.",
      imagePlaceholder: true,
    },
    {
      number: "06",
      title: "Add Author Information",
      content:
        "Enter all author details including prefix, first name, surname, email, organization, and country. Identify the corresponding and presenting authors. You can add co-authors and reorder them as needed. If submitting on behalf of another author, use the 'I'm not the author' option. Click 'Done: Go to Next Step' after completing author details and biographies.",
      imagePlaceholder: true,
    },
    {
      number: "07",
      title: "Select Conference Theme",
      content:
        "Choose the theme that best fits your submission from the six thematic areas: Farmer-Managed Seed Systems in Practice; Seeds, Climate Change and Resilience; Gender Equity and Social Inclusion; Market Innovations; Data Sovereignty and Trends; or Policy Solutions for Seed Sovereignty. Click 'Done: Go to Next Step'.",
      imagePlaceholder: false,
    },
    {
      number: "08",
      title: "Submit Additional Information",
      content:
        "If you are a student submitting an abstract, upload your student ID for verification. If you are not a student, you can ignore this section. Click 'Done: Save Submission' to complete the process.",
      imagePlaceholder: false,
    },
    {
      number: "09",
      title: "Confirmation",
      content:
        "After submission, you will be taken to your submission overview page. You and co-authors will receive an email confirmation. Your dashboard will now show a 'My Submissions' card where you can track the status of your abstract.",
      imagePlaceholder: false,
    },
  ];

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Submit an Abstract for the 1st Eastern Africa Indigenous Seed Conference 2026",
    description:
      "Step-by-step guide for submitting abstracts, papers, and presentations to the EA-ISC 2026 conference.",
    totalTime: "PT20M",
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.content,
      position: steps.indexOf(step) + 1,
    })),
  };

  return (
    <>
      <Helmet>
        <title>How to Submit an Abstract | EA-ISC 2026</title>
        <meta
          name="description"
          content="Step-by-step guide for submitting your abstract, paper, or presentation to the 1st Eastern Africa Indigenous Seed Conference 2026. Learn about the submission process, requirements, and key deadlines."
        />
        <meta
          name="keywords"
          content="submit abstract, conference submission, seed conference abstract, EA-ISC 2026 submission, call for papers, abstract guidelines"
        />
        <link
          rel="canonical"
          href="https://eaindigenousseedsconference.org/how-to-submit-an-abstract"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="How to Submit an Abstract | EA-ISC 2026"
        />
        <meta
          property="og:description"
          content="Step-by-step guide for submitting your abstract, paper, or presentation to the 1st Eastern Africa Indigenous Seed Conference 2026."
        />
        <meta
          property="og:url"
          content="https://eaindigenousseedsconference.org/how-to-submit-an-abstract"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How to Submit an Abstract | EA-ISC 2026"
        />
        <meta
          name="twitter:description"
          content="Step-by-step guide for submitting your abstract, paper, or presentation to EA-ISC 2026."
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="submit-abstract-page">
        {/* Hero Section */}
        <section
          className="submit-hero"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <nav className="hero-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">
                Home
              </a>
              <span aria-hidden="true">/</span>
              <span className="current">How to Submit an Abstract</span>
            </nav>
            <div className="hero-content">
              <h1>How to Submit an Abstract</h1>
              <p className="hero-description">
                A comprehensive guide to submitting your abstract, paper, or
                presentation for the 1st Eastern Africa Indigenous Seed
                Conference 2026.
              </p>
              <div className="hero-meta">
                <span className="deadline-badge">
                  Abstract Deadline: <strong>October 31, 2026</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="content-section">
          <div className="container narrow">
            <div className="intro-box">
              <h2>Submission Overview</h2>
              <p className="lead-text">
                All abstracts and papers for the Eastern Africa Indigenous Seed
                Conference 2026 must be submitted through the Ex Ordo submission
                system. Follow this step-by-step guide to ensure your submission
                is complete and meets all requirements.
              </p>
              <div className="info-cards">
                <div className="info-card">
                  <span className="info-number">01</span>
                  <h4>Submission System</h4>
                  <p>Ex Ordo online platform</p>
                </div>
                <div className="info-card">
                  <span className="info-number">02</span>
                  <h4>Deadline</h4>
                  <p>October 31, 2026</p>
                </div>
                <div className="info-card">
                  <span className="info-number">03</span>
                  <h4>Word Limit</h4>
                  <p>300-500 words</p>
                </div>
                <div className="info-card">
                  <span className="info-number">04</span>
                  <h4>Contact</h4>
                  <p>info@eaindigenousseedsconference.org</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Submission Steps</h2>
            <p className="section-subtitle text-center">
              Follow these nine steps to successfully submit your abstract. Each
              step must be completed before proceeding to the next.
            </p>

            <div className="steps-container">
              {steps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number" aria-hidden="true">
                    {step.number}
                  </div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.content}</p>
                    {step.imagePlaceholder && (
                      <div
                        className="step-illustration"
                        aria-label="Step illustration placeholder"
                      >
                        <div className="placeholder-box"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="content-section">
          <div className="container">
            <h2 className="text-center">Abstract Requirements</h2>
            <div className="requirements-grid">
              <div className="requirement-card">
                <h3>Structure</h3>
                <ul>
                  <li>Title (maximum 20 words)</li>
                  <li>Author names and affiliations</li>
                  <li>Background and objectives</li>
                  <li>Methods</li>
                  <li>Results and findings</li>
                  <li>Conclusions and recommendations</li>
                  <li>Keywords (3-5)</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3>Formatting</h3>
                <ul>
                  <li>Word count: 300-500 words</li>
                  <li>Font: Times New Roman or Arial</li>
                  <li>Font size: 12pt</li>
                  <li>Line spacing: 1.5</li>
                  <li>File format: DOC, DOCX, or PDF</li>
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

        {/* Themes Quick Reference */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Conference Themes</h2>
            <p className="section-subtitle text-center">
              Select the theme that best aligns with your submission:
            </p>
            <div className="themes-reference">
              <div className="theme-ref-item">
                <span className="theme-ref-number">01</span>
                <div className="theme-ref-content">
                  <h4>Farmer-Managed Seed Systems in Practice</h4>
                  <p>
                    Indigenous practices, community seed banking, participatory
                    research, and livestock conservation
                  </p>
                </div>
              </div>
              <div className="theme-ref-item">
                <span className="theme-ref-number">02</span>
                <div className="theme-ref-content">
                  <h4>Seeds, Climate Change and Resilience</h4>
                  <p>
                    Climate adaptation, emergency seed response, and resilient
                    livelihoods
                  </p>
                </div>
              </div>
              <div className="theme-ref-item">
                <span className="theme-ref-number">03</span>
                <div className="theme-ref-content">
                  <h4>Gender Equity and Social Inclusion</h4>
                  <p>
                    Women and youth leadership, intergenerational knowledge, and
                    seed literacy
                  </p>
                </div>
              </div>
              <div className="theme-ref-item">
                <span className="theme-ref-number">04</span>
                <div className="theme-ref-content">
                  <h4>Market Innovations</h4>
                  <p>
                    Seed enterprises, local markets, indigenous foods, and value
                    addition
                  </p>
                </div>
              </div>
              <div className="theme-ref-item">
                <span className="theme-ref-number">05</span>
                <div className="theme-ref-content">
                  <h4>Data Sovereignty and Trends</h4>
                  <p>
                    Digital rights, traditional knowledge protection, and
                    biopiracy prevention
                  </p>
                </div>
              </div>
              <div className="theme-ref-item">
                <span className="theme-ref-number">06</span>
                <div className="theme-ref-content">
                  <h4>Policy Solutions for Seed Sovereignty</h4>
                  <p>
                    Farmers' rights, policy frameworks, and regional advocacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="content-section">
          <div className="container narrow">
            <div className="dates-box">
              <h2 className="text-center">Important Dates</h2>
              <div className="dates-list">
                <div className="date-item">
                  <span className="date-label">
                    Abstract Submission Deadline:
                  </span>
                  <span className="date-value">October 31, 2026</span>
                </div>
                <div className="date-item">
                  <span className="date-label">
                    Notification of Acceptance:
                  </span>
                  <span className="date-value">November 15, 2026</span>
                </div>
                <div className="date-item">
                  <span className="date-label">
                    Early Registration Deadline:
                  </span>
                  <span className="date-value">October 31, 2026</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Conference Dates:</span>
                  <span className="date-value">November 17-20, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="cta-section">
          <div className="cta-pattern-overlay"></div>
          <div className="container">
            <h2>Need Assistance?</h2>
            <p className="cta-text">
              If you have questions about the submission process or need
              technical support, please contact our conference secretariat.
            </p>
            <div className="cta-buttons">
              <a
                href="mailto:info@eaindigenousseedsconference.org"
                className="btn btn-primary"
              >
                Email Support
              </a>
              <a href="/registration-abstract" className="btn btn-secondary">
                Begin Submission
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowToSubmitAbstractPage;
