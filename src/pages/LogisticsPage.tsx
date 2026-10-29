// pages/LogisticsPage.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Plane,
  Plug,
  Smartphone,
  Syringe,
  CloudSun,
  Sprout,
  BedDouble,
  LifeBuoy,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import "../styles/logisticsPage.css";

// Hero background — swap for a logistics-specific image if you have one.
import heroBackground from "../assets/contact.webp";

// Logistical information PDF — lives in the /public folder.
// Change the file name here if yours is named differently.
const LOGISTICS_PDF_URL =
  "/General Logistical Note for 1st EA Indigenous Seed Conference.docx.pdf";

// Must match the accommodation route in your router / navbar.
const ACCOMMODATION_PATH = "/accommodation";

const SITE_URL = "https://eaindigenousseedconference.org";

// Quick facts pulled from the logistical information note.
const keyFacts = [
  {
    Icon: ShieldCheck,
    title: "Kenya ETA required",
    text: "All visitors must apply for an Electronic Travel Authorisation at etakenya.go.ke, ideally at least 2 weeks before travel.",
  },
  {
    Icon: Plane,
    title: "Airport & hotel transfers",
    text: "Uber, Little Cab and Bolt are available, plus airport taxis. The venue is about 23km from JKIA and 12km from Nairobi CBD.",
  },
  {
    Icon: Plug,
    title: "Power & time zone",
    text: "Kenya uses plug type G at 240V / 50Hz, so bring a travel adapter. Time zone is GMT +3.",
  },
  {
    Icon: Smartphone,
    title: "Connectivity & cash",
    text: "Buy a SIM at the JKIA arrivals hall with your passport. Forex bureaux and ATMs are available at the airport.",
  },
];

// Topics that are covered in full inside the PDF.
const guideTopics = [
  {
    Icon: Syringe,
    title: "Yellow fever certificate",
    text: "Health entry requirements to check before you travel.",
  },
  {
    Icon: CloudSun,
    title: "Weather & clothing",
    text: "What to expect in Nairobi and what to pack.",
  },
  {
    Icon: Sprout,
    title: "Field visits",
    text: "Practical notes for the conference field visits.",
  },
  {
    Icon: BedDouble,
    title: "Accommodation near CUEA",
    text: "Places to stay close to the venue.",
    link: { to: ACCOMMODATION_PATH, label: "See accommodation options" },
  },
  {
    Icon: LifeBuoy,
    title: "Help contacts",
    text: "Who to call if you need assistance during your stay.",
  },
];

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const LogisticsPage = () => {
  const pageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Logistical Information | EA-ISC 2026",
    description:
      "Travel and logistics guide for the 1st Eastern Africa Indigenous Seed Conference 2026 at the Catholic University of Eastern Africa (CUEA), Nairobi, Kenya.",
    url: `${SITE_URL}/logistics`,
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Logistical Information",
        item: `${SITE_URL}/logistics`,
      },
    ],
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Logistics Page",
        page_location: window.location.href,
      });
    }
  }, []);

  const trackLogisticsClick = (action: "download" | "view") => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "logistics_pdf_" + action, {
        file_name: LOGISTICS_PDF_URL,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Logistical Information | EA-ISC 2026</title>
        <meta
          name="description"
          content="Plan your journey to the 1st Eastern Africa Indigenous Seed Conference 2026 in Nairobi. Visa and ETA, airport transfers, power, connectivity, weather, accommodation and help contacts, with a downloadable PDF guide."
        />
        <link rel="canonical" href={`${SITE_URL}/logistics`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/logistics`} />
        <meta property="og:title" content="Logistical Information | EA-ISC 2026" />
        <meta
          property="og:description"
          content="Everything you need to plan your trip to Nairobi for EA-ISC 2026, from visas and arrival to power, weather and help contacts."
        />
        <meta property="og:site_name" content="EA-ISC 2026" />
        <script type="application/ld+json">{JSON.stringify(pageData)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="lg-page">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="lg-hero"
          aria-label="Logistical information hero"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="lg-hero-overlay" />
          <div className="lg-container lg-hero-inner">
            <nav className="lg-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="lg-breadcrumb-link">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="lg-breadcrumb-current">Logistics</span>
            </nav>

            <div className="lg-badge">
              <FileText size={16} aria-hidden="true" />
              <span>Travel Guide · PDF</span>
            </div>
            <h1>Logistical Information</h1>
            <p className="lg-hero-lead">
              Everything you need to plan your journey to Nairobi for the 1st
              Eastern Africa Indigenous Seed Conference at the Catholic
              University of Eastern Africa (CUEA) — from visa and arrival to
              power, weather and who to call if you need help.
            </p>

            <div className="lg-actions">
              <a
                href={LOGISTICS_PDF_URL}
                download
                className="lg-btn lg-btn-primary"
                onClick={() => trackLogisticsClick("download")}
              >
                <Download size={18} aria-hidden="true" />
                Download PDF
              </a>
              <a
                href={LOGISTICS_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="lg-btn lg-btn-light"
                onClick={() => trackLogisticsClick("view")}
              >
                <ExternalLink size={18} aria-hidden="true" />
                View Online
              </a>
            </div>

            <ul className="lg-hero-meta">
              <li>
                <MapPin size={16} aria-hidden="true" />
                CUEA, Lang'ata, Nairobi
              </li>
              <li>
                <Clock size={16} aria-hidden="true" />
                Time zone GMT +3
              </li>
              <li>
                <FileText size={16} aria-hidden="true" />3 pages
              </li>
            </ul>
          </div>
        </section>

        {/* ── Key facts ─────────────────────────────────────────────────── */}
        <section className="lg-section" aria-labelledby="lg-facts-heading">
          <div className="lg-container">
            <h2 id="lg-facts-heading" className="lg-heading">
              Key Facts at a Glance
            </h2>
            <p className="lg-subheading">
              A quick look at what to sort out before you travel. The full
              details are in the PDF guide.
            </p>

            <div className="lg-facts-grid">
              {keyFacts.map(({ Icon, title, text }) => (
                <article className="lg-fact-card" key={title}>
                  <span className="lg-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Also covered ──────────────────────────────────────────────── */}
        <section
          className="lg-section lg-section-alt"
          aria-labelledby="lg-topics-heading"
        >
          <div className="lg-container">
            <h2 id="lg-topics-heading" className="lg-heading">
              Also Covered in the Guide
            </h2>
            <p className="lg-subheading">
              Open the PDF for the complete notes on each of these topics.
            </p>

            <div className="lg-topics-grid">
              {guideTopics.map(({ Icon, title, text, link }) => (
                <article className="lg-topic-card" key={title}>
                  <span className="lg-icon lg-icon-green" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {link && (
                    <Link to={link.to} className="lg-topic-link">
                      {link.label} →
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Help band ─────────────────────────────────────────────────── */}
        <section className="lg-help" aria-labelledby="lg-help-heading">
          <div className="lg-container lg-help-inner">
            <div className="lg-help-text">
              <h2 id="lg-help-heading">Need help planning your trip?</h2>
              <p>
                Our team can help with travel questions before you arrive and
                while you are in Nairobi.
              </p>
              <ul className="lg-help-contacts">
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <a href="mailto:info@eaindigenousseedconference.org">
                    info@eaindigenousseedconference.org
                  </a>
                </li>
                <li>
                  <Phone size={18} aria-hidden="true" />
                  <a href="tel:+254712451777">+254 712 451 777</a>
                </li>
              </ul>
            </div>

            <div className="lg-help-actions">
              <Link to="/contact" className="lg-btn lg-btn-primary">
                Contact the Team
              </Link>
              <Link to={ACCOMMODATION_PATH} className="lg-btn lg-btn-outline">
                Browse Accommodation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LogisticsPage;