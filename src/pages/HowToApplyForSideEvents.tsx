// pages/HowToApplyForSideEvents.tsx
import { Helmet } from "react-helmet-async";
import "../styles/HowToApplyForSideEvents.css";

// Import background image (use your own)
import heroBackground from "../assets/_MG_0937.webp";

const HowToApplyForSideEvents = () => {
  // Steps data for side event application
  const steps = [
    {
      number: "01",
      title: "Log into the Submission System",
      content:
        "Access the Ex Ordo submission portal. Enter your email address, first and last name, and a secure password. After successful login, you will be directed to your dashboard.",
    },
    {
      number: "02",
      title: "Start Your Application",
      content:
        "On your dashboard, locate the 'Submit' card and select 'Submit Your Abstract Now' to begin. Note: The application process for side events follows the same workflow as abstract submissions.",
    },
    {
      number: "03",
      title: "Review Guide for Organizers",
      content:
        "Read the side event guidelines carefully. Ensure your event aligns with the conference objectives and one of the six thematic areas. If you have questions, contact the conference secretariat at info@eaindigenousseedsconference.org. Once ready, click 'Skip: Start Workflow' to proceed.",
    },
    {
      number: "04",
      title: "Select Track and Format",
      content:
        "In the Tracks step, select 'Side Events' as your submission type. In the Format step, again choose 'Side Events' to confirm your application type. Click 'Done: Go to Next Step' to continue.",
    },
    {
      number: "05",
      title: "Side Event Details",
      content:
        "Enter the title of your side event. In the introduction box, provide a detailed description including: all organizing partners, the thematic focus, confirmed or invited speakers, and the expected contribution to seed sovereignty discussions. For any abstract fields not applicable, enter 'N/A'. Click 'Done: Go to Next Step' when complete.",
    },
    {
      number: "06",
      title: "Speaker and Organizer Information",
      content:
        "Add details for all speakers and organizers. For each person, include: prefix, first name, surname, email address, organization, and country. You can add multiple entries and reorder them as needed. For the question 'Is this a student submission?', select 'No'. After completing speaker details and organization biography, click 'Done: Go to Next Step'.",
    },
    {
      number: "07",
      title: "Select Conference Theme",
      content:
        "Choose the conference theme that best relates to your side event. Select at least one from the six thematic areas: Farmer-Managed Seed Systems in Practice; Seeds, Climate Change and Resilience; Gender Equity and Social Inclusion; Market Innovations; Data Sovereignty and Trends; or Policy Solutions for Seed Sovereignty. Click 'Done: Go to Next Step'.",
    },
    {
      number: "08",
      title: "Side Event Logistics",
      content: "Complete the side-event specific questions:",
      subItems: [
        "Room capacity required",
        "Preferred date and time (choose from available options during the conference days: November 17-20, 2026)",
        "Equipment and services needed (projector, screen, sound system, flip charts, etc.)",
        "Upload your e-signature in PDF format as confirmation of commitment",
      ],
    },
    {
      number: "09",
      title: "Submit Application",
      content:
        "Review all information for accuracy. Click 'Done: Save Submission' to finalize your application. You and all listed speakers will receive an email confirmation. Your dashboard will show a 'My Submissions' card where you can track the status of your application.",
    },
  ];

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Apply for Side Events at the 1st Eastern Africa Indigenous Seed Conference 2026",
    description:
      "Step-by-step guide for organizations and individuals wishing to host side events at EA-ISC 2026.",
    totalTime: "PT25M",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.content,
      position: index + 1,
    })),
  };

  return (
    <>
      <Helmet>
        <title>How to Apply for Side Events | EA-ISC 2026</title>
        <meta
          name="description"
          content="Step-by-step guide for organizations and individuals wishing to host side events at the 1st Eastern Africa Indigenous Seed Conference 2026. Learn about the application process, requirements, and fees."
        />
        <meta
          name="keywords"
          content="side events, conference side events, EA-ISC 2026 side events, apply for side event, side event application, seed conference side events"
        />
        <link
          rel="canonical"
          href="https://eaindigenousseedsconference.org/how-to-apply-for-side-events"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="How to Apply for Side Events | EA-ISC 2026"
        />
        <meta
          property="og:description"
          content="Step-by-step guide for organizations and individuals wishing to host side events at the 1st Eastern Africa Indigenous Seed Conference 2026."
        />
        <meta
          property="og:url"
          content="https://eaindigenousseedsconference.org/how-to-apply-for-side-events"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How to Apply for Side Events | EA-ISC 2026"
        />
        <meta
          name="twitter:description"
          content="Step-by-step guide for hosting side events at EA-ISC 2026."
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="side-events-page">
        {/* Hero Section */}
        <section
          className="side-events-hero"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-container">
            <nav className="hero-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">
                Home
              </a>
              <span aria-hidden="true">/</span>
              <span className="current">How to Apply for Side Events</span>
            </nav>
            <div className="hero-content">
              <h1>How to Apply for Side Events</h1>
              <p className="hero-description">
                A comprehensive guide for organizations and individuals wishing
                to host side events at the 1st Eastern Africa Indigenous Seed
                Conference 2026.
              </p>
              <div className="hero-meta">
                <span className="deadline-badge">
                  Application Deadline: <strong>October 15, 2026</strong>
                </span>
                <span className="fee-badge">
                  Side Event Fee: <strong>10,000 kes</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="content-section">
          <div className="container narrow">
            <div className="intro-box">
              <h2>Side Events Overview</h2>
              <p className="lead-text">
                Side events provide an opportunity for organizations,
                institutions, and networks to host focused sessions that
                complement the main conference program. These events allow for
                deeper exploration of specific topics, networking, and
                collaborative engagement.
              </p>
              <div className="info-cards">
                <div className="info-card">
                  <span className="info-number">01</span>
                  <h4>Application System</h4>
                  <p>Ex Ordo submission platform</p>
                </div>
                <div className="info-card">
                  <span className="info-number">02</span>
                  <h4>Deadline</h4>
                  <p>October 15, 2026</p>
                </div>
                <div className="info-card">
                  <span className="info-number">03</span>
                  <h4>Duration</h4>
                  <p>90 minutes per side event</p>
                </div>
                <div className="info-card">
                  <span className="info-number">04</span>
                  <h4>Fee</h4>
                  <p>$3,000 USD</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Application Steps</h2>
            <p className="section-subtitle text-center">
              Follow these nine steps to successfully apply for a side event.
              Each step must be completed before proceeding to the next.
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
                    {step.subItems && (
                      <div className="sub-items">
                        <p className="sub-label">Required information:</p>
                        <ul>
                          {step.subItems.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logistics Requirements Section */}
        <section className="content-section">
          <div className="container">
            <h2 className="text-center">Logistics & Requirements</h2>
            <div className="requirements-grid">
              <div className="requirement-card">
                <h3>Room Specifications</h3>
                <ul>
                  <li>Standard room capacity: 50-200 participants</li>
                  <li>Flexible seating arrangements available</li>
                  <li>AV equipment available upon request</li>
                  <li>Wi-Fi connectivity included</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3>Equipment Available</h3>
                <ul>
                  <li>LCD projector and screen</li>
                  <li>Sound system with microphones</li>
                  <li>Flip charts and markers</li>
                  <li>Laser pointer</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3>Additional Services</h3>
                <ul>
                  <li>Catering available upon request (additional cost)</li>
                  <li>Technical support staff</li>
                  <li>Registration desk assistance</li>
                  <li>Virtual participation setup (if hybrid)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Selection Criteria */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Selection Criteria</h2>
            <p className="section-subtitle text-center">
              Side event applications will be evaluated based on the following
              criteria:
            </p>
            <div className="criteria-list">
              <div className="criteria-item">
                <span className="criteria-number">01</span>
                <div className="criteria-content">
                  <h4>Relevance to Conference Themes</h4>
                  <p>
                    Alignment with one or more of the six conference thematic
                    areas and contribution to seed sovereignty discourse.
                  </p>
                </div>
              </div>
              <div className="criteria-item">
                <span className="criteria-number">02</span>
                <div className="criteria-content">
                  <h4>Quality of Proposed Content</h4>
                  <p>
                    Clarity of objectives, strength of speakers, and potential
                    for meaningful engagement.
                  </p>
                </div>
              </div>
              <div className="criteria-item">
                <span className="criteria-number">03</span>
                <div className="criteria-content">
                  <h4>Diversity and Inclusion</h4>
                  <p>
                    Representation of diverse voices including farmers, women,
                    youth, and indigenous communities.
                  </p>
                </div>
              </div>
              <div className="criteria-item">
                <span className="criteria-number">04</span>
                <div className="criteria-content">
                  <h4>Practical Arrangements</h4>
                  <p>
                    Feasibility of proposed logistics and availability of
                    required resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Information */}
        <section className="content-section">
          <div className="container narrow">
            <div className="payment-box">
              <h2 className="text-center">Payment Information</h2>
              <p className="payment-note">
                A fee of <strong>$3,000 USD</strong> is required for each
                approved side event to cover venue costs, basic equipment, and
                technical support. Payment details will be provided upon
                acceptance of your application.
              </p>
              <div className="payment-details">
                <div className="payment-item">
                  <span className="payment-label">Payment Methods:</span>
                  <span className="payment-value">
                    Bank transfer, credit card, or mobile money
                  </span>
                </div>
                <div className="payment-item">
                  <span className="payment-label">Payment Deadline:</span>
                  <span className="payment-value">
                    Upon acceptance and before November 1, 2026
                  </span>
                </div>
                <div className="payment-item">
                  <span className="payment-label">Cancellation Policy:</span>
                  <span className="payment-value">
                    Full refund for cancellations received 30 days prior to the
                    conference
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="content-section bg-light">
          <div className="container narrow">
            <div className="dates-box">
              <h2 className="text-center">Important Dates</h2>
              <div className="dates-list">
                <div className="date-item">
                  <span className="date-label">
                    Side Event Application Deadline:
                  </span>
                  <span className="date-value">October 15, 2026</span>
                </div>
                <div className="date-item">
                  <span className="date-label">
                    Notification of Acceptance:
                  </span>
                  <span className="date-value">October 25, 2026</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Payment Deadline:</span>
                  <span className="date-value">November 1, 2026</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Conference Dates:</span>
                  <span className="date-value">November 17-20, 2026</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Side Event Slots:</span>
                  <span className="date-value">
                    November 17-19, 2026 (afternoons)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="cta-section">
          <div className="cta-pattern-overlay"></div>
          <div className="container">
            <h2>Questions About Side Events?</h2>
            <p className="cta-text">
              Our team is available to assist with any questions regarding side
              event applications, logistics, or requirements.
            </p>
            <div className="cta-buttons">
              <a
                href="mailto:sideevents@eaindigenousseedsconference.org"
                className="btn btn-primary"
              >
                Contact Side Events Team
              </a>
              <a href="/registration-abstract" className="btn btn-secondary">
                Apply for Side Event
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowToApplyForSideEvents;
