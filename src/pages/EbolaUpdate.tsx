// pages/EbolaUpdate.tsx
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "../styles/EbolaUpdate.css";

// ── Update this block whenever the Ministry of Health announces something new ─
const LAST_UPDATED = "4 November 2026";
const LAST_UPDATED_ISO = "2026-11-04";

// ── Video (YouTube) ──────────────────────────────────────────────────────────
const VIDEO_ID = "lMFjQKsWc30";
const VIDEO_TITLE = "Five Ebola patients discharged from hospital after completing treatment";
const VIDEO_SOURCE = "Citizen TV Kenya, 3 November 2026";

const figures = [
  {
    number: "0",
    label: "New cases since 19 Oct",
    note: "All nine confirmed cases were linked to a single imported case.",
  },
  {
    number: "5",
    label: "Patients discharged",
    note: "Five patients recovered and left hospital on 3 November. Two remain in care.",
  },
  {
    number: "66",
    label: "Contacts released",
    note: "20 on 26 October and 46 on 3 November, each after 21 days without symptoms.",
  },
  {
    number: "52",
    label: "Contacts still monitored",
    note: "Expected to complete their 21 days and go home by 11 November.",
  },
];

const points = [
  {
    heading: "People who have been released pose no risk to others",
    text: "Contacts are released only after 21 days without symptoms and a final health check. The Ministry of Health says they pose no risk of infection to anyone, and asks communities to welcome them home warmly and without stigma.",
  },
  {
    heading: "No evidence of community spread",
    text: "The Ministry reports no evidence of community transmission. Kenya remains open, with no restrictions on travel, trade or public gatherings.",
  },
  {
    heading: "The outbreak is not yet officially over",
    text: "Kenya will start a 42-day countdown once the final patient has recovered. The outbreak can be declared over only if no new case appears during that period. Surveillance and screening continue in the meantime.",
  },
];

const symptoms = [
  "Fever",
  "Unusual tiredness",
  "Muscle or joint pains",
  "Sore throat",
  "Vomiting",
  "Diarrhoea",
  "Unexplained bleeding",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Ebola Update: Kenya",
  description: `Where things stand as at ${LAST_UPDATED}: no new cases since 19 October, patients discharged and contacts released after 21 days without symptoms.`,
  datePublished: "2026-10-22",
  dateModified: LAST_UPDATED_ISO,
};

// ── Component ────────────────────────────────────────────────────────────────
const EbolaUpdate = () => {
  return (
    <>
      <Helmet>
        <title>Ebola Update: Kenya | EA-ISC 2026</title>
        <meta
          name="description"
          content={`Ebola update for Kenya as at ${LAST_UPDATED}: no new cases since 19 October, patients discharged and contacts released after 21 days without symptoms.`}
        />
        <link
          rel="canonical"
          href="https://eaindigenousseedconference.org/ebola-update"
        />
        <meta property="og:title" content="Ebola Update: Kenya | EA-ISC 2026" />
        <meta
          property="og:description"
          content="No new cases since 19 October. Patients are recovering and contacts are going home after 21 days without symptoms."
        />
        <meta
          property="og:url"
          content="https://eaindigenousseedconference.org/ebola-update"
        />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="eu-page">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="eu-hero">
          <div className="eu-container">
            <nav className="eu-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="eu-breadcrumb-link">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="eu-breadcrumb-current">Ebola Update</span>
            </nav>

            <div className="eu-hero-content">
              <div className="eu-eyebrow">
                Ministry of Health, Kenya · Updated {LAST_UPDATED}
              </div>
              <h1>Ebola Update: Kenya Has Been Declared Ebola-Free</h1>
              <p className="eu-hero-description">
                According to the Ministry of Health's statement of 3 November
                2026, five patients have been discharged, 46 more contacts have
                been released from quarantine after 21 days without symptoms,
                and no new case has been recorded since 19 October.
              </p>
            </div>
          </div>
        </section>

        {/* ── Notice ────────────────────────────────────────────────────── */}
        <div className="eu-notice">
          <div className="eu-container eu-notice-inner">
            <strong>Information as at {LAST_UPDATED}.</strong>
            <span>
              Figures come from Ministry of Health announcements and may change.
              Always follow the Ministry of Health for the latest guidance.
            </span>
          </div>
        </div>

        {/* ── Video (straight after the hero) ───────────────────────────── */}
        <section className="eu-section eu-bg-light">
          <div className="eu-container eu-narrow">
            <h2 className="eu-heading">Watch the Report</h2>

            <div className="eu-video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
                title={VIDEO_TITLE}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <p className="eu-video-caption">
              {VIDEO_SOURCE}: {VIDEO_TITLE}.{" "}
              <a
                href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </p>
          </div>
        </section>

        {/* ── Where things stand ────────────────────────────────────────── */}
        <section className="eu-section">
          <div className="eu-container">
            <h2 className="eu-heading eu-center">Where Things Stand</h2>
            <p className="eu-subtitle eu-center">
              Kenya has recorded nine confirmed cases in total, all linked to one
              imported case that was confirmed on 6 October 2026.
            </p>

            <div className="eu-stats-grid">
              {figures.map(({ number, label, note }) => (
                <div className="eu-stat-card" key={label}>
                  <span className="eu-stat-number">{number}</span>
                  <span className="eu-stat-label">{label}</span>
                  <p className="eu-stat-note">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What this means ───────────────────────────────────────────── */}
        <section className="eu-section eu-bg-light">
          <div className="eu-container eu-narrow">
            <h2 className="eu-heading">What This Means</h2>

            <div className="eu-point-list">
              {points.map(({ heading, text }) => (
                <article className="eu-point" key={heading}>
                  <h3>{heading}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Help and travel ───────────────────────────────────────────── */}
        <section className="eu-section">
          <div className="eu-container eu-narrow">
            <h2 className="eu-heading">If You Feel Unwell</h2>

            <div className="eu-help-grid">
              <div className="eu-help-card">
                <h3>Seek help immediately if you have</h3>
                <ul className="eu-symptom-list">
                  {symptoms.map((symptom) => (
                    <li key={symptom}>{symptom}</li>
                  ))}
                </ul>
                <p className="eu-help-note">
                  Go to the nearest health facility, or use the contacts on the
                  right.
                </p>
              </div>

              <div className="eu-help-card eu-help-card-contact">
                <h3>How to reach help</h3>

                <div className="eu-contact-row">
                  <span className="eu-contact-label">Toll-free hotline</span>
                  <a href="tel:719" className="eu-contact-value">719</a>
                  <span className="eu-contact-sub">Free of charge</span>
                </div>

                <div className="eu-contact-row">
                  <span className="eu-contact-label">Jali, WhatsApp chatbot</span>
                  <a
                    href="https://wa.me/254700719719"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eu-contact-value"
                  >
                    0700 719 719
                  </a>
                  <span className="eu-contact-sub">Ministry of Health</span>
                </div>
              </div>
            </div>

            <p className="eu-travel-note">
              <strong>Travelling to or from Kenya?</strong> Some countries have
              introduced travel restrictions or quarantine rules for people who
              have recently been in Kenya. Check your own government's current
              guidance before you travel.
            </p>

            <p className="eu-closing">
              Let us stand with our patients, contacts and health workers with
              compassion, not stigma.
            </p>

            <p className="eu-source-note">
              Source: Kenya Ministry of Health announcements of 26 October and 3
              November 2026. Latest updates are published on the{" "}
              <a
                href="https://www.health.go.ke"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministry of Health website
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default EbolaUpdate;