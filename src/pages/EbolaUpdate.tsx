// pages/EbolaUpdate.tsx
import { Helmet } from "react-helmet-async";
import "../styles/EbolaUpdate.css";

// Place the PDF in your /public folder with this exact file name
// (or change the path below to match whatever you name it).
const PDF_URL = "/MOH Statement on Ebola.pdf";
const PDF_FILE_NAME = "MoH-Ebola-Update-Day-17-22-October-2026.pdf";

// ── Data (taken from the Ministry of Health press release, 22 Oct 2026) ──────
const keyFigures = [
  {
    number: "9",
    label: "Total confirmed cases",
    note: "Including the index case, who died on 5 October 2026. All belong to a single cluster.",
  },
  {
    number: "0",
    label: "New cases today",
    note: "All 14 samples tested in the last 24 hours were negative for BVD.",
  },
  {
    number: "135",
    label: "Contacts traced",
    note: "100% traced, in Kenya and abroad.",
  },
  {
    number: "709,093",
    label: "Travellers screened",
    note: "At points of entry, including 3,107 in the last 24 hours.",
  },
  {
    number: "461",
    label: "Samples tested",
    note: "Since the start of the outbreak in May 2026.",
  },
  {
    number: "8",
    label: "Patients in treatment",
    note: "Four family members and four health workers. All stable.",
  },
];

const updateSections = [
  {
    heading: "Patients are stable and progressing well",
    body: [
      "The eight patients undergoing treatment in designated isolation facilities, four family members and four health workers who cared for the first case, are stable and responding well to treatment from infectious disease specialists.",
      "The Ministry looks forward to each of them completing treatment, recovering fully, and being discharged home to their families.",
    ],
  },
  {
    heading: "Every contact has been traced, at home and abroad",
    body: [
      "All 135 contacts associated with the first case have been traced (100%), both within Kenya and internationally. The relevant health authorities of the countries concerned have been formally informed in line with the International Health Regulations (2005).",
      "The Ministry thanked national and county contact-tracing teams, families, communities and development partners for this achievement.",
    ],
  },
  {
    heading: "How the infections occurred",
    body: [
      "Epidemiologists have mapped the exposure dates, quarantine dates and symptom onset of every case. Each patient was in close contact with the first case between 3 and 5 October, before entering quarantine, and each fell ill within the known incubation period of Ebola (2 to 21 days).",
      "This pattern is consistent with infection from the first case, and shows that no infection has been traced to transmission within quarantine facilities, where infection prevention and control measures have been strengthened further.",
      "Each contact's 21-day monitoring period is counted from their own last exposure. Anyone exposed to a later confirmed case is monitored from that date.",
    ],
  },
  {
    heading: "Surveillance and testing continue nationwide",
    body: [
      "Enhanced surveillance continues in health facilities and communities across all counties. At points of entry, 709,093 travellers have been screened, including 3,107 in the last 24 hours. A total of 461 samples have been tested since the start of the outbreak in May 2026.",
    ],
  },
];

const timeline = [
  {
    date: "3 – 5 Oct 2026",
    title: "Exposure window",
    text: "Each patient was in close contact with the first case before entering quarantine.",
  },
  {
    date: "5 Oct 2026",
    title: "Index case dies",
    text: "The first case died.",
  },
  {
    date: "6 Oct 2026",
    title: "First imported case confirmed",
    text: "Kenya confirmed its first imported case of Ebola (Bundibugyo Virus Disease). This is Day 1 of the response.",
  },
  {
    date: "22 Oct 2026",
    title: "Day 17 update",
    text: "No new cases, all contacts traced, 14 of 14 samples negative.",
  },
  {
    date: "25 Oct 2026",
    title: "First contacts go home",
    text: "Contacts who complete 21 days of monitoring in good health are released from quarantine.",
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
  name: "Ebola (Bundibugyo Virus Disease) Update: Day 17",
  description:
    "Summary of the Kenya Ministry of Health press release of 22 October 2026: no new cases, all contacts traced, and first contacts set to return home.",
  datePublished: "2026-10-22",
};

// ── Component ─────────────────────────────────────────────────────────────────
const EbolaUpdate = () => {
  return (
    <>
      <Helmet>
        <title>Ebola Update: Day 17 | EA-ISC 2026</title>
        <meta
          name="description"
          content="Summary of the Kenya Ministry of Health Ebola (Bundibugyo Virus Disease) update of 22 October 2026: no new cases, all 135 contacts traced, first contacts set to return home. View or download the full press release."
        />
        <link
          rel="canonical"
          href="https://eaindigenousseedconference.org/ebola-update"
        />
        <meta property="og:title" content="Ebola Update: Day 17 | EA-ISC 2026" />
        <meta
          property="og:description"
          content="No new cases, all contacts traced, and first contacts set to return home. Read the summary or download the Ministry of Health press release."
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
              <a href="/" className="eu-breadcrumb-link">Home</a>
              <span aria-hidden="true">/</span>
              <span className="eu-breadcrumb-current">Ebola Update</span>
            </nav>

            <div className="eu-hero-content">
              <div className="eu-eyebrow">
                Ministry of Health, Kenya · Press release · 22 October 2026
              </div>
              <h1>Day 17: No New Cases, All Contacts Traced, and First Contacts Set to Return Home</h1>
              <p className="eu-hero-description">
                Kenya's response to the Ebola (Bundibugyo Virus Disease) outbreak
                continues to make steady progress. Here is a plain summary of the
                Ministry of Health's latest update, with the full press release
                available to view and download.
              </p>

              <div className="eu-hero-actions">
                <a href="#full-document" className="eu-btn eu-btn-accent">
                  View Full Press Release
                </a>
                <a
                  href={PDF_URL}
                  download={PDF_FILE_NAME}
                  className="eu-btn eu-btn-outline-light"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Notice ────────────────────────────────────────────────────── */}
        <div className="eu-notice">
          <div className="eu-container eu-notice-inner">
            <strong>Information as at 22 October 2026.</strong>
            <span>
              Figures come from the Ministry of Health press release of that date
              and may have changed since. Always follow the Ministry of Health for
              the latest guidance.
            </span>
          </div>
        </div>

        {/* ── Key figures ───────────────────────────────────────────────── */}
        <section className="eu-section">
          <div className="eu-container">
            <h2 className="eu-heading eu-center">The Situation at a Glance</h2>
            <p className="eu-subtitle eu-center">
              Today marks Day 17 since Kenya confirmed its first imported case on
              6 October 2026. There is no evidence of community spread.
            </p>

            <div className="eu-stats-grid">
              {keyFigures.map(({ number, label, note }) => (
                <div className="eu-stat-card" key={label}>
                  <span className="eu-stat-number">{number}</span>
                  <span className="eu-stat-label">{label}</span>
                  <p className="eu-stat-note">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Going home banner ─────────────────────────────────────────── */}
        <section className="eu-section eu-bg-light">
          <div className="eu-container eu-narrow">
            <div className="eu-home-card">
              <div className="eu-home-date">
                <span className="eu-home-day">25</span>
                <span className="eu-home-month">Oct</span>
              </div>
              <div className="eu-home-text">
                <h3>Going home this weekend</h3>
                <p>
                  From Sunday, 25 October, the first contacts to complete 21 days
                  of monitoring, and who are in good health, will be released from
                  quarantine and reunited with their families.
                </p>
                <p>
                  They have passed the full monitoring period without falling ill
                  and <strong>cannot pass the infection</strong> to anybody. The
                  Ministry asks neighbours, workplaces and communities to receive
                  them warmly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Detailed update ───────────────────────────────────────────── */}
        <section className="eu-section">
          <div className="eu-container eu-narrow">
            <h2 className="eu-heading">What the Update Says</h2>

            <div className="eu-update-list">
              {updateSections.map(({ heading, body }) => (
                <article className="eu-update-item" key={heading}>
                  <h3>{heading}</h3>
                  {body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ──────────────────────────────────────────────────── */}
        <section className="eu-section eu-bg-light">
          <div className="eu-container eu-narrow">
            <h2 className="eu-heading">Key Dates</h2>
            <ol className="eu-timeline">
              {timeline.map(({ date, title, text }) => (
                <li className="eu-timeline-item" key={date + title}>
                  <span className="eu-timeline-date">{date}</span>
                  <div className="eu-timeline-body">
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── What you should do ────────────────────────────────────────── */}
        <section className="eu-section">
          <div className="eu-container eu-narrow">
            <h2 className="eu-heading">What You Should Do</h2>
            <p className="eu-lead">
              Life in Kenya continues as normal: travel, trade and public
              gatherings are not restricted. Every Kenyan can help bring this
              outbreak to a close by following Ministry of Health guidance and
              cooperating fully with the response teams.
            </p>

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

            <p className="eu-closing">
              Let us stand with our patients, contacts and health workers with
              compassion, not stigma. The end of this outbreak is within reach,
              and together we will get there.
            </p>
          </div>
        </section>

        {/* ── Full document (view + download) ───────────────────────────── */}
        <section className="eu-section eu-bg-light" id="full-document">
          <div className="eu-container eu-narrow">
            <h2 className="eu-heading">The Full Press Release</h2>
            <p className="eu-lead">
              Read the original statement from the Office of the Director General
              for Health, signed by Dr. Patrick Amoth, CBS, Director General.
            </p>

            <div className="eu-doc-actions">
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="eu-btn eu-btn-primary"
              >
                Open in New Tab
              </a>
              <a
                href={PDF_URL}
                download={PDF_FILE_NAME}
                className="eu-btn eu-btn-secondary"
              >
                Download PDF
              </a>
            </div>


            
          </div>
        </section>
      </div>
    </>
  );
};

export default EbolaUpdate;