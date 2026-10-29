// pages/CallForExhibitorsPage.tsx
import { Helmet } from "react-helmet-async";
import "../styles/CallForExhibitorsPage.css";

import heroBackground from "../assets/_MG_0937.webp";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeDE4fsJ0gYg0fTU2DTacRym98RoceBscTIc_i3wWweUT03CA/viewform";

// ── Data ─────────────────────────────────────────────────────────────────────

const exhibitorBenefits = [
  {
    title: "Pan-African Visibility",
    description:
      "Showcase your products, services, or innovations to a curated audience of farmers, researchers, policy-makers, NGOs, and seed custodians drawn from across Eastern Africa and beyond.",
  },
  {
    title: "Direct Networking",
    description:
      "Engage face-to-face with decision-makers, agricultural experts, community leaders, and development partners over four immersive conference days.",
  },
  {
    title: "Brand Exposure",
    description:
      "Your organisation's logo and profile will appear in the official conference programme, on digital signage, and across our website and social media channels.",
  },
  {
    title: "Association with Seed Sovereignty",
    description:
      "Align your brand with one of the most important conversations in African agriculture — indigenous seed systems, food security, and climate resilience.",
  },
  {
    title: "Speaking Opportunities",
    description:
      "Exhibitors may be invited to host a demo session, participate in a panel, or deliver a short talk to the full conference audience.",
  },
  {
    title: "Market Intelligence",
    description:
      "Gain real-time insight into farmer needs, policy developments, and emerging innovations that are shaping the seed sector across the region.",
  },
  {
    title: "Exhibition Awards",
    description:
      "Stand out with the chance to be recognised in the EA-ISC 2026 Exhibition Awards, celebrating the most impactful and innovative exhibits.",
  },
  {
    title: "Media Coverage",
    description:
      "Benefit from dedicated media coverage, photography, and video documentation of the exhibition — extending your reach long after the event.",
  },
];

const exhibitionIncludes = [
  "Dedicated booth space for all 4 conference days",
  "Table, chairs, and access to power",
  "2 exhibitor passes with full conference access",
  "Organisation listing in the official conference programme",
  "Logo displayed on conference digital signage",
  "Access to all plenary and thematic sessions",
  "Networking with 500+ attendees from 20+ countries",
  "Eligibility for the EA-ISC 2026 Exhibition Award",
];

const whoShouldExhibit = [
  "Research Institutions and Universities",
  "Government Agencies and Ministries",
  "NGOs and Development Organisations",
  "AgriTech and Digital Innovation Firms",
  "Farmer Cooperatives and Associations",
  "Organic and Agroecology Enterprises",
  "Publishers and Knowledge Platforms",
];

const faqs = [
  {
    q: "When is the deadline to register as an exhibitor?",
    a: "Applications are accepted on a rolling basis. We recommend registering before 31 August 2026 to secure your preferred booth location and ensure inclusion in the printed conference programme.",
  },
  {
    q: "What does the exhibition space include?",
    a: "Every booth includes a table, chairs, and access to power. Exhibitors are responsible for their own display materials, roll-ups, banners, and product samples.",
  },
  {
    q: "Can I exhibit without being a conference sponsor?",
    a: "Yes. Exhibition and sponsorship are separate tracks. You are welcome to exhibit as a standalone participant. Contact us if you are interested in combining exhibition with a sponsorship package.",
  },
  {
    q: "Is there a reduced rate for community-based organisations?",
    a: "Community and farmer groups are encouraged to apply. Reach out to our exhibition team directly to discuss any support options that may be available.",
  },
  {
    q: "What happens after I submit the registration form?",
    a: "Our exhibition team will review your application and contact you within 5 working days with confirmation, booth allocation details, and payment instructions.",
  },
];

// ── Structured data ───────────────────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "EA-ISC 2026 Exhibition",
  description:
    "Call for Exhibitors at the 1st Eastern Africa Indigenous Seed Conference 2026, Nairobi, Kenya.",
  startDate: "2026-11-17",
  endDate: "2026-11-20",
  location: {
    "@type": "Place",
    name: "Catholic University of Eastern Africa, Nairobi, Kenya",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
const CallForExhibitorsPage = () => {
  return (
    <>
      <Helmet>
        <title>Call for Exhibitors | EA-ISC 2026</title>
        <meta
          name="description"
          content="Exhibit at the 1st Eastern Africa Indigenous Seed Conference 2026. Showcase your products, innovations, and services to a diverse regional and international audience. Exhibition fee: USD 500."
        />
        <link
          rel="canonical"
          href="https://eaindigenousseedconference.org/call-for-exhibitors"
        />
        <meta property="og:title" content="Call for Exhibitors | EA-ISC 2026" />
        <meta
          property="og:description"
          content="Showcase your work at EA-ISC 2026 and reach the people shaping the future of indigenous seed systems in Eastern Africa."
        />
        <meta
          property="og:url"
          content="https://eaindigenousseedconference.org/call-for-exhibitors"
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="exhibitors-page">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="exhibitors-hero"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-container">
            <nav className="hero-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span aria-hidden="true">/</span>
              <span className="current">Call for Exhibitors</span>
            </nav>

            <div className="hero-content">
              <div className="hero-eyebrow">
                EA-ISC 2026 · Catholic University of Eastern Africa, Nairobi, Kenya
              </div>
              <h1>Call for Exhibitors</h1>
              <p className="hero-description">
                Be part of history at the 1st Eastern Africa Indigenous Seed
                Conference. Showcase your products, innovations, and services to
                a diverse regional and international audience passionate about
                indigenous seeds, biodiversity, climate resilience, and
                sustainable agriculture.
              </p>

              <div className="hero-cta-row">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-primary"
                >
                  Register as an Exhibitor
                </a>
                <div className="hero-meta-badges">
                  <span className="meta-badge">Nov 17–20, 2026</span>
                  <span className="meta-badge">Nairobi, Kenya</span>
                  <span className="meta-badge meta-badge-alert">
                    Limited spaces — register early
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Invitation / Why Exhibit ─────────────────────────────────── */}
        <section className="content-section">
          <div className="container narrow">
            <h2>An Invitation to Exhibit</h2>
            <p className="lead-text">
              We are excited to invite organisations, innovators, seed
              custodians, researchers, farmers, development partners, and
              agribusiness stakeholders to exhibit at this landmark event. The
              1st Eastern Africa Indigenous Seed Conference (EA-ISC 2026) takes
              place from <strong>17th – 20th November 2026</strong> at the{" "}
              <strong>
                Catholic University of Eastern Africa, Nairobi, Kenya
              </strong>.
            </p>
            <p className="lead-text">
              Whether you are a research institution, agri-tech
              firm, cooperative, or civil society organisation — the EA-ISC
              exhibition floor is your platform to demonstrate impact, build
              lasting relationships, and help shape the regional conversation on
              indigenous seed systems.
            </p>

            <div className="intro-stats">
              {[
                { number: "500+", label: "Expected Attendees" },
                { number: "20+",  label: "Countries Represented" },
                { number: "4",    label: "Conference Days" },
                { number: "6",    label: "Thematic Tracks" },
              ].map(({ number, label }) => (
                <div className="stat-card" key={label}>
                  <span className="stat-number">{number}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who Should Exhibit ───────────────────────────────────────── */}
        <section className="content-section bg-light">
          <div className="container">
            <h2 className="text-center">Who Should Exhibit?</h2>
            <p className="section-subtitle text-center">
              We welcome exhibitors from every part of the seed and agriculture
              ecosystem — from grassroots farmer groups to international
              research institutions.
            </p>
            <div className="who-grid">
              {whoShouldExhibit.map((label) => (
                <div className="who-card" key={label}>
                  <span className="who-bullet" aria-hidden="true" />
                  <span className="who-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Exhibitor Benefits ───────────────────────────────────────── */}
        <section className="content-section">
          <div className="container">
            <h2 className="text-center">What You Gain as an Exhibitor</h2>
            <p className="section-subtitle text-center">
              Everything you gain by taking your place on the EA-ISC 2026
              exhibition floor.
            </p>
            <div className="benefits-grid">
              {exhibitorBenefits.map(({ title, description }) => (
                <div className="benefit-card" key={title}>
                  <h3 className="benefit-title">{title}</h3>
                  <p className="benefit-desc">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Exhibition Fee ───────────────────────────────────────────── */}
        <section className="content-section bg-light">
          <div className="container narrow">
            <h2 className="text-center">Exhibition Fee</h2>
            <p className="section-subtitle text-center">
              One simple, all-inclusive rate for all exhibitors — everything
              you need to present your work with impact at EA-ISC 2026.
            </p>

            <div className="flat-rate-card">

              {/* Left — price + CTA */}
              <div className="flat-rate-left">
                <span className="flat-rate-label">Exhibition Fee</span>
                <div className="flat-rate-price">
                  <span className="flat-rate-currency">USD</span>
                  <span className="flat-rate-amount">500</span>
                </div>
                <p className="flat-rate-sub">
                  Per exhibitor &middot; All 4 conference days
                </p>
                <p className="flat-rate-note">
                  Limited exhibition spaces are available. Secure your spot
                  early to guarantee inclusion in the printed programme and
                  preferred booth placement.
                </p>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-register-now"
                >
                  Register Now
                </a>
              </div>

              {/* Right — what's included */}
              <div className="flat-rate-right">
                <h4 className="flat-rate-includes-title">What's included</h4>
                <ul className="flat-rate-features">
                  {exhibitionIncludes.map((item) => (
                    <li key={item}>
                      <span className="flat-rate-check" aria-hidden="true">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <p className="tiers-note text-center">
              Need more information before registering? Contact the exhibition
              team at{" "}
              <a href="mailto:exhibits@eaindigenousseedconference.org">
                exhibits@eaindigenousseedconference.org
              </a>
            </p>
          </div>
        </section>

        {/* ── What to Exhibit ──────────────────────────────────────────── */}
        <section className="content-section">
          <div className="container narrow">
            <h2>What Can You Exhibit?</h2>
            <p className="lead-text">
              The EA-ISC 2026 exhibition celebrates the full breadth of
              innovation, knowledge, and practice in the seed sector. We
              encourage creative, interactive, and educational displays.
            </p>

            <div className="what-grid">
              {[
                {
                  heading: "Seed Varieties and Germplasm",
                  body: "Display indigenous, open-pollinated, and improved seed varieties alongside educational materials about their heritage, uses, and conservation methods.",
                },
                {
                  heading: "Tools and Technologies",
                  body: "Showcase seed-processing equipment, storage innovations, digital platforms, and precision agriculture tools tailored to smallholder farmers.",
                },
                {
                  heading: "Research and Publications",
                  body: "Share findings, reports, policy briefs, and books that advance knowledge about farmer-managed seed systems and food sovereignty.",
                },
                {
                  heading: "Products and Value Chains",
                  body: "Present food products, artisanal goods, and market innovations built on indigenous seed varieties and local agricultural knowledge.",
                },
                {
                  heading: "Community Stories and Art",
                  body: "Bring cultural expressions — photography, craft, oral history displays — that honour the farmers and communities who have stewarded seeds for generations.",
                },
                {
                  heading: "Programmes and Services",
                  body: "Highlight training programmes, certification schemes, financial services, and support networks that empower seed custodians and farming households.",
                },
              ].map(({ heading, body }) => (
                <div className="what-card" key={heading}>
                  <h4>{heading}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Important Dates ──────────────────────────────────────────── 
        <section className="content-section bg-light">
          <div className="container narrow">
            <div className="dates-box">
              <h2 className="text-center">Important Dates</h2>
              <div className="dates-list">
                {[
                  ["Exhibitor Registration Opens:", "Now Open"],
                  ["Early Registration Deadline:", "August 31st, 2026"],
                  ["Booth Allocation Confirmed:", "September 30th, 2026"],
                  ["Exhibition Set-Up:", "November 16th, 2026"],
                  ["Conference and Exhibition Dates:", "November 17–20, 2026"],
                  ["Exhibition Dismantling:", "November 20th, 2026"],
                ].map(([label, value]) => (
                  <div className="date-item" key={label}>
                    <span className="date-label">{label}</span>
                    <span
                      className={`date-value ${
                        value === "Now Open" ? "date-open" : ""
                      }`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>*/}

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="content-section">
          <div className="container narrow">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map(({ q, a }) => (
                <div className="faq-item" key={q}>
                  <h4 className="faq-question">{q}</h4>
                  <p className="faq-answer">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="cta-section">
          <div className="cta-pattern-overlay" />
          <div className="container">
            <h2>Ready to Exhibit?</h2>
            <p className="cta-text">
              Secure your space at EA-ISC 2026 and join organisations from
              across the region committed to advancing indigenous seed systems
              and sustainable agriculture in Eastern Africa.
            </p>
            <div className="cta-buttons">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-cta-large"
              >
                Register Now
              </a>
              <a
                href="mailto:exhibits@eaindigenousseedconference.org"
                className="btn btn-secondary"
              >
                Contact the Exhibition Team
              </a>
            </div>
            <p className="cta-sub">
              Questions? Email us at{" "}
              <a
                href="mailto:exhibits@eaindigenousseedconference.org"
                className="cta-email-link"
              >
                exhibits@eaindigenousseedconference.org
              </a>
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default CallForExhibitorsPage;